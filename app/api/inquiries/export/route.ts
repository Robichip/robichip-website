import { desc } from "drizzle-orm";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { getDb } from "../../../../db";
import { inquiries } from "../../../../db/schema";

const STAFF_EMAILS = new Set(["henrygong.tw@gmail.com", "robiagent@robichip.com"]);

function csvCell(value: unknown) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user || !STAFF_EMAILS.has(user.email.toLowerCase())) {
    return Response.json({ error: "Staff access is required." }, { status: 403 });
  }

  try {
    const rows = await getDb()
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt), desc(inquiries.id))
      .limit(5000);
    const columns = [
      "id", "createdAt", "status", "owner", "intent", "fullName", "email",
      "company", "jobTitle", "phone", "region", "application", "projectStage",
      "preferredWindow", "timeZone", "quantity", "targetTiming", "details",
      "consent", "consentAt", "followUpNote", "sourcePath",
    ] as const;
    const csv = [
      columns.join(","),
      ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(",")),
    ].join("\n");
    const date = new Date().toISOString().slice(0, 10);

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
