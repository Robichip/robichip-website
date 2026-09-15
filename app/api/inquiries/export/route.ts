import { desc } from "drizzle-orm";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { getDb } from "../../../../db";
import { inquiries } from "../../../../db/schema";
import { buildInquiryWorkbook } from "../../../../db/inquiry-workbook";

const STAFF_EMAILS = new Set(["henrygong.tw@gmail.com", "robiagent@robichip.com"]);

function csvCell(value: unknown) {
  const raw = value === null || value === undefined ? "" : String(value);
  const text = /^[\s]*[=+@-]/.test(raw) ? `'${raw}` : raw;
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: Request) {
  const user = await getChatGPTUser();
  if (!user || !STAFF_EMAILS.has(user.email.toLowerCase())) {
    return Response.json({ error: "Staff access is required." }, { status: 403 });
  }

  try {
    const excel = new URL(request.url).searchParams.get("format") === "xlsx";
    const rows = await getDb()
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt), desc(inquiries.id))
      .limit(excel ? 1001 : 5000);
    const date = new Date().toISOString().slice(0, 10);
    if (excel) {
      if (rows.length > 1000) return Response.json({ error: "Excel contact cards support up to 1,000 records per export. Please use CSV for this larger data set." }, { status: 413 });
      return new Response(buildInquiryWorkbook(rows), { headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=robichip-customer-contacts-${date}.xlsx`,
        "Cache-Control": "no-store",
      } });
    }
    const columns = [
      "id", "fullName", "company", "jobTitle", "email", "phone", "region",
      "createdAt", "status", "owner", "intent", "application", "projectStage",
      "preferredWindow", "timeZone", "quantity", "targetTiming", "details",
      "consent", "consentAt", "followUpNote", "sourcePath",
    ] as const;
    const csv = [
      columns.join(","),
      ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(",")),
    ].join("\n");

    return new Response(`\uFEFF${csv}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename=robichip-inquiries-${date}.csv`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.json(
      { error: "The inquiry database is not available yet. Please try again shortly." },
      { status: 503 },
    );
  }
}
