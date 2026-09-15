import { desc, type InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import { getChatGPTUser, requireChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { inquiries } from "../../../db/schema";
import { SIMULATION_SOURCE } from "../../../db/inquiry-simulations";
import "../../contact/contact.css";
import "./inquiries.css";

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
            <h1>Customer contacts</h1>
            <p>客戶聯絡與商機跟進 · 查看聯絡人、公司及聯繫方式，再檢視產品需求。Excel 包含聯絡清單、逐筆聯絡卡與技術需求三個工作表。</p>
          </div>
          <div className="inquiry-export-actions"><a className="admin-export" href="/api/inquiries/export?format=xlsx">Excel · 匯出客戶聯絡卡 ↗</a><a href="/api/inquiries/export">Download CSV · 下載清單</a><small>Excel：每次最多 1,000 筆；CSV：最多 5,000 筆。</small></div>
        </div>
        <details className="inquiry-simulation-tools">
          <summary>Simulation workspace · 模擬資料（{simulationCount} 筆）</summary>
          <p>Six fictional cases cover evaluation, quotation, meetings and partnership. Each is marked TEST and uses example.com contact details. No emails or meeting invitations are sent.</p>
          <p>六筆虛構案例，涵蓋評估、詢價、會議與合作。僅供後台與匯出測試，勿列入正式商機統計。重複點擊不會重複建立。</p>
          <form action="/api/inquiries/simulations" method="POST">
            <button className="admin-export" type="submit" disabled={unavailable || simulationCount === 6} style={{ border: 0, cursor: "pointer", whiteSpace: "normal" }}>
              {simulationCount === 6 ? "6 TEST cases loaded · 已載入六筆" : "Load 6 TEST cases · 載入模擬資料"}
            </button>
          </form>
          <p>{simulationCount} simulation cases in the recent list · 近期清單中的模擬資料：{simulationCount} 筆。下方統計包含模擬資料。</p>
        </details>
        {unavailable ? (
          <div className="form-alert error">The database is still being prepared. Refresh this page shortly.</div>
        ) : (
          <>
            <div className="admin-stats">
              <article><strong>{rows.length}</strong><span>Recent contacts · 近期聯絡紀錄</span></article>
              <article><strong>{newCount}</strong><span>New requests · 新詢問</span></article>
              <article><strong>{meetingCount}</strong><span>Meeting requests · 會議需求</span></article>
            </div>
            {simulationCount > 0 && <p className="inquiry-test-note">清單與統計包含 {simulationCount} 筆 TEST／模擬案例。模擬聯絡資訊不可用於實際聯繫；未填欄位會標示「未提供」。</p>}
            <div className="inquiry-contact-list">
              {rows.length === 0 && <p>No customer contacts yet · 尚無客戶聯絡紀錄。</p>}
              {rows.map((row) => {
                const isTest = row.sourcePath.startsWith("/simulation/");
                const emailHref = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email) ? `mailto:${encodeURIComponent(row.email)}` : null;
                const phoneNumber = row.phone.replace(/[^\d+]/g, "");
                return (
                  <article className="inquiry-contact-card" key={row.id}>
                    <header>
                      <div><p className="inquiry-record-id">Contact #{row.id} · {formatDate(row.createdAt)} UTC{isTest && " · TEST／模擬"}</p><h2>{row.fullName || "Name not provided · 姓名未提供"}</h2><p className="inquiry-company">{row.company || "Company not provided · 公司未提供"}</p></div>
                      <span className="admin-status">{row.status}</span>
                    </header>
                    <dl className="inquiry-contact-fields">
                      <div><dt>Email · 電子郵件</dt><dd>{!isTest && emailHref ? <a href={emailHref}>{row.email}</a> : row.email || "Not provided · 未提供"}</dd></div>
                      <div><dt>Phone · 聯絡電話</dt><dd>{!isTest && phoneNumber ? <a href={`tel:${phoneNumber}`}>{row.phone}</a> : row.phone || "Not provided · 未提供"}</dd></div>
                      <div><dt>Job title · 職稱</dt><dd>{row.jobTitle || "Not provided · 未提供"}</dd></div>
                      <div><dt>Country / region · 國家／地區</dt><dd>{row.region || "Not provided · 未提供"}</dd></div>
                    </dl>
                    <div className="inquiry-followup"><p><strong>BD owner · 跟進窗口：</strong>{row.owner || "Unassigned · 待指派"}</p><p><strong>Meeting window · 聯繫／會議時段：</strong>{row.preferredWindow || "Not specified · 未指定"}{row.timeZone && ` (${row.timeZone})`}</p>{row.followUpNote && <p><strong>Follow-up · 跟進紀錄：</strong>{row.followUpNote}</p>}</div>
                    <details className="inquiry-project-details"><summary>Project request · 產品／技術需求 — {row.intent}</summary><dl><div><dt>Application · 應用</dt><dd>{row.application}</dd></div><div><dt>Project stage · 階段</dt><dd>{row.projectStage || "未提供"}</dd></div><div><dt>Quantity · 數量</dt><dd>{row.quantity || "未提供"}</dd></div><div><dt>Target timing · 時程</dt><dd>{row.targetTiming || "未提供"}</dd></div></dl><p>{row.details}</p></details>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
