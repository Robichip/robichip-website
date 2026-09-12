import { getDb } from "../../../db";
import { inquiries } from "../../../db/schema";

const intents = new Set(["evaluation", "quotation", "meeting", "partnership"]);

type InquiryPayload = Record<string, unknown>;

function text(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function routeError(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  if (message.includes("no such table")) {
    return "The inquiry database is still being prepared. Please try again in a moment.";
  }
  return "We could not save your request. Please try again or email bd@robichip.com.";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InquiryPayload;
    const honey = text(payload._honey, 200);
    if (honey) return Response.json({ ok: true }, { status: 201 });

    const intent = text(payload.intent, 40);
    const fullName = text(payload.fullName, 100);
    const email = text(payload.email, 160).toLowerCase();
    const company = text(payload.company, 160);
    const application = text(payload.application, 160);
    const details = text(payload.details, 4000);
    const consent = payload.consent === "yes" || payload.consent === true;
    const preferredWindow = text(payload.preferredWindow, 160);
    const timeZone = text(payload.timeZone, 80);

    if (
      !intents.has(intent) ||
      !fullName ||
      !email ||
      !email.includes("@") ||
      !company ||
      !application ||
      !details ||
      !consent
    ) {
      return Response.json(
        { error: "Please complete all required fields before sending your request." },
        { status: 400 },
      );
    }

    if (intent === "meeting" && (!preferredWindow || !timeZone)) {
      return Response.json(
        { error: "Please add your preferred meeting window and time zone." },
        { status: 400 },
      );
    }

    const db = getDb();
    const [inquiry] = await db
      .insert(inquiries)
      .values({
        intent,
        fullName,
        email,
        company,
        jobTitle: text(payload.jobTitle, 120),
        phone: text(payload.phone, 60),
        region: text(payload.region, 100),
        application,
        projectStage: text(payload.projectStage, 120),
        preferredWindow,
        timeZone,
        quantity: text(payload.quantity, 120),
        targetTiming: text(payload.targetTiming, 120),
        details,
        consent,
        sourcePath: "/contact",
      })
      .returning({ id: inquiries.id });

    return Response.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    return Response.json({ error: routeError(error) }, { status: 500 });
  }
}
