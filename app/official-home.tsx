import Link from "next/link";
import { applications, platforms } from "./official-data";
import { DesignInCta, OfficialLayout } from "./official-site";

export default function OfficialHome() {
  return (
    <OfficialLayout>
      <section className="os-home-hero">
        <div className="os-shell os-home-hero-grid">
          <div className="os-hero-copy">
            <p className="os-eyebrow">SEMICONDUCTOR INFRASTRUCTURE FOR PHYSICAL AI</p>
            <h1>From AI decisions to physical execution.<span>從 AI 決策，到可靠的實體運動。</span></h1>
            <p className="os-lead">Power SoC platforms for UAV propulsion, robotic actuation and intelligent motion systems.<span>服務 UAV 推進、機器人致動與智慧運動系統的 Power SoC 平台。</span></p>
            <div className="os-actions"><Link className="os-button os-button-primary" href="/applications">Choose your application <span>↓</span></Link><a className="os-button os-button-ghost" href="https://dev.robichip.com">Start Design-in <span>↗</span></a></div>
          </div>
          <div className="os-system-selector">
            <div className="os-selector-head"><span>CHOOSE YOUR SYSTEM · 選擇應用</span><strong>01—03</strong></div>
            {applications.map((item, index) => <Link key={item.slug} href={`/applications/${item.slug}`}><span>0{index + 1}</span><div><strong>{item.title}</strong><small>{item.titleZh}</small></div><i>↗</i></Link>)}
            <figure><img src="/semicon-2026/robisoc-board.png" alt="RobiChip compact Power SoC hardware" /><figcaption>One platform logic. Multiple routes into motion.<span>同一平台邏輯，多條運動系統導入路徑。</span></figcaption></figure>
          </div>
        </div>
      </section>

      <section className="os-proof-strip"><div className="os-shell">{[
        ["UP TO 700 W", "Prototype evidence · 原型實證"],
        ["TARGET 1 kW", "Architecture target · 架構目標"],
        ["TAIROS 2026", "System validation · 系統驗證"],
        ["SEMICON 2026", "Silicon story · 半導體敘事"],
      ].map(([metric, label]) => <div key={metric}><strong>{metric}</strong><span>{label}</span></div>)}</div></section>

      <section className="os-section os-applications">
        <div className="os-shell"><div className="os-section-head"><div><p className="os-eyebrow">APPLICATIONS FIRST · 從應用開始</p><h2>What are you building?<span>您正在打造什麼？</span></h2></div><p>Choose the system challenge first. Product, evidence and engagement scope follow from that decision.<span>先選擇系統挑戰，再進入產品、實證與合作範圍。</span></p></div>
          <div className="os-application-grid">{applications.map((item, index) => <article key={item.slug}><div className="os-card-index">0{index + 1}</div><p className="os-card-kicker">{item.eyebrow}</p><h3>{item.title}<span>{item.titleZh}</span></h3><p>{item.summary}<span>{item.summaryZh}</span></p><Link href={`/applications/${item.slug}`}>Explore application <span>↗</span></Link></article>)}</div>
        </div>
      </section>

      <section className="os-section os-platform-section">
        <div className="os-shell"><div className="os-section-head os-section-head-light"><div><p className="os-eyebrow">ONE GOVERNED PLATFORM · 一套受控平台</p><h2>Use the right layer for today’s decision.<span>用正確層級，處理當前決策。</span></h2></div><Link className="os-inline-link" href="/platform">View platform map ↗</Link></div>
          <div className="os-platform-grid">{platforms.map((item, index) => <Link key={item.slug} href={`/${item.slug}`}><div><span>0{index + 1}</span><small>{item.status}</small></div><h3>{item.title}<span>{item.titleZh}</span></h3><p>{item.role}<span>{item.roleZh}</span></p><i>↗</i></Link>)}</div>
        </div>
      </section>

      <section className="os-section os-evidence-home">
        <div className="os-shell"><div className="os-section-head"><div><p className="os-eyebrow">EVIDENCE BEFORE CLAIMS · 先有實證</p><h2>Built to be measured.<span>為可量測而打造。</span></h2></div><p>Review performance in context: operating point, test method, thermal path and maturity boundary.<span>以工作點、測試方法、熱路徑與成熟度邊界檢視效能。</span></p></div>
          <div className="os-evidence-feature">
            <figure><img src="/semicon-2026/robithrust-bench.png" alt="RobiThrust bench validation" /><figcaption>RobiThrust · Bench / EVT</figcaption></figure>
            <div><p className="os-eyebrow">MEASURED PROPULSION EVIDENCE</p><h3>Performance, with the test boundary visible.<span>效能與測試邊界，同時呈現。</span></h3><div className="os-metric-grid"><div><strong>11.17</strong><span>gf/W average<br />平均效率</span></div><div><strong>+6.3%</strong><span>vs. baseline<br />相較基準</span></div><div><strong>1.6 kgf</strong><span>@ 240 W<br />台架結果</span></div><div><strong>47°C</strong><span>measured T1<br />T1 實測</span></div></div><p className="os-scope-note">Bench and EVT evidence only—not endurance, qualification or mass-production claims.<span>僅為台架與 EVT 證據，非耐久、認證或量產聲明。</span></p><Link className="os-inline-link" href="/evidence">Review evidence paths ↗</Link></div>
          </div>
        </div>
      </section>

      <section className="os-section os-engagement">
        <div className="os-shell"><div className="os-section-head"><div><p className="os-eyebrow">DESIGN-IN PATH · 設計導入路徑</p><h2>Choose the scope before we open the case.<span>先選擇合作範圍，再進入案件審查。</span></h2></div><p>Applications and platform maturity determine the right starting gate.<span>依應用與平台成熟度，決定正確起點。</span></p></div>
          <ol>{["Access review · 初步評估", "Technical intake · 技術需求", "Feasibility review · 可行性審查", "NDA & data room · 保密與資料室", "Sample validation · 樣品驗證", "Design-in · 設計導入"].map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol>
          <a className="os-button os-button-dark" href="https://dev.robichip.com">Open Design-in Workspace <span>↗</span></a>
        </div>
      </section>

      <section className="os-section os-two-up">
        <div className="os-shell os-two-up-grid">
          <article className="os-event-panel"><p className="os-eyebrow">UP NEXT · OCT 21, 2026</p><h2>Taiwan Tech Startup Connect<span>臺科育成新創交流</span></h2><p>Enterprise showcase and investor exchange at Taiwan Tech Gallery, International Building 1F.<span>企業專屬攤位展示與投資交流，地點為臺科大國際大樓一樓 Taiwan Tech Gallery。</span></p><Link href="/taiwan-tech-startup-connect">View event page ↗</Link></article>
          <article className="os-company-panel"><p className="os-eyebrow">COMPANY · 公司</p><h2>Semiconductor infrastructure for intelligent machines.<span>服務智慧機器的半導體基礎設施。</span></h2><p>RobiChip brings silicon, packaging, thermal engineering and system evidence into one Design-in conversation.<span>羅比芯將晶片、封裝、熱工程與系統實證整合為一條 Design-in 路徑。</span></p><Link href="/company">Meet RobiChip ↗</Link></article>
        </div>
      </section>
      <DesignInCta />
    </OfficialLayout>
  );
}

