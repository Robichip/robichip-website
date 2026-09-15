import { desc, type InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import { getChatGPTUser, requireChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { inquiries } from "../../../db/schema";
import { SIMULATION_SOURCE } from "../../../db/inquiry-simulations";
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
  const simulationCount = rows.filter((row) => row.sourcePath === SIMULATION_SOURCE).length;

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
        <section style={{ padding: "24px", marginTop: "24px", background: "#fff", border: "1px solid #cbd3cf", fontSize: "16px", lineHeight: 1.6 }}>
          <h2 style={{ marginTop: 0, fontSize: "22px" }}>Simulation workspace · 模擬資料</h2>
          <p>Six fictional cases cover evaluation, quotation, meetings and partnership. Each is marked TEST and uses example.com contact details. No emails or meeting invitations are sent.</p>
          <p>六筆虛構案例，涵蓋評估、詢價、會議與合作。僅供後台與匯出測試，勿列入正式商機統計。重複點擊不會重複建立。</p>
          <form action="/api/inquiries/simulations" method="POST">
            <button className="admin-export" type="submit" disabled={unavailable || simulationCount === 6} style={{ border: 0, cursor: "pointer", whiteSpace: "normal" }}>
              {simulationCount === 6 ? "6 TEST cases loaded · 已載入六筆" : "Load 6 TEST cases · 載入模擬資料"}
            </button>
          </form>
          <p>{simulationCount} simulation cases in the recent list · 近期清單中的模擬資料：{simulationCount} 筆。下方統計包含模擬資料。</p>
        </section>
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
                      <td>{row.application}<details style={{ marginTop: "12px" }}><summary>View details · 查看內容</summary><p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{row.details}</p><p>{row.quantity} {row.targetTiming}</p><p>{row.preferredWindow} {row.timeZone}</p><p>{row.followUpNote}</p></details></td>
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
