import { desc, type InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import { getChatGPTUser, requireChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { inquiries } from "../../../db/schema";
import "../../contact/contact.css";

const STAFF_EMAILS = new Set(["henrygong.tw@gmail.com", "robiagent@robichip.com"]);
type Inquiry = InferSelectModel<typeof inquiries>;

function formatDate(value: string) {
  const date = new Date(value.endsWith("Z") ? value : `${value.replace(" ", "T")}Z`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

export const dynamic = "force-dynamic";

export default async function InquiryAdminPage() {
  await requireChatGPTUser("/admin/inquiries");
  const user = await getChatGPTUser();
  if (!user || !STAFF_EMAILS.has(user.email.toLowerCase())) {
    return (
      <main className="contact-page admin-page">
        <section className="admin-shell admin-empty">
          <p className="contact-eyebrow dark">RobiChip internal</p>
          <h1>Staff access required.</h1>
          <p>This inquiry workspace is available only to the assigned RobiChip team.</p>
        </section>
      </main>
    );
  }

  let rows: Inquiry[] = [];
  let unavailable = false;
  try {
    rows = await getDb().select().from(inquiries).orderBy(desc(inquiries.createdAt), desc(inquiries.id)).limit(200);
  } catch {
    unavailable = true;
  }

  const newCount = rows.filter((row) => row.status === "new").length;
  const meetingCount = rows.filter((row) => row.intent === "meeting").length;

  return (
    <main className="contact-page admin-page">
      <header className="contact-header">
        <Link href="/" className="contact-brand" aria-label="RobiChip home">
          <img src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" />
        </Link>
        <Link href="/" className="contact-home-link">Back to Home <span aria-hidden="true">↗</span></Link>
      </header>
      <section className="admin-shell">
        <div className="admin-head">
          <div>
            <p className="contact-eyebrow dark">RobiChip internal</p>
            <h1>Design-in inquiries</h1>
            <p>Recent submissions from the official website contact form. Export the full data set as a CSV file for Excel analysis.</p>
          </div>
          <a className="admin-export" href="/api/inquiries/export">Export CSV for Excel ↗</a>
        </div>
        {unavailable ? (
          <div className="form-alert error">The database is still being prepared. Refresh this page shortly.</div>
        ) : (
          <>
            <div className="admin-stats">
              <article><strong>{rows.length}</strong><span>Recent requests shown</span></article>
              <article><strong>{newCount}</strong><span>New / unassigned</span></article>
              <article><strong>{meetingCount}</strong><span>Meeting requests</span></article>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Received</th><th>Contact</th><th>Request</th><th>Application</th><th>Status</th></tr></thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{formatDate(row.createdAt)}</td>
                      <td><strong>{row.fullName}</strong><span>{row.company}<br />{row.email}</span></td>
                      <td><strong>{row.intent}</strong><span>{row.projectStage || "Project stage not specified"}</span></td>
                      <td>{row.application}</td>
                      <td><span className="admin-status">{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
