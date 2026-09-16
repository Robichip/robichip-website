import Link from "next/link";
import { applications, platforms } from "./official-data";
import { DesignInCta, OfficialLayout } from "./official-site";

const designInPaths = [
  { title: "RobiThrust", zh: "UAV 推進系統", subject: "RobiThrust", steps: ["Controller Design-in · 控制器導入", "Motor–Controller Co-design · 馬達與控制器協同設計", "Motor + Controller + Propeller · 三合一推進子系統"] },
  { title: "RobiTorque", zh: "機器人關節與致動", subject: "RobiTorque", steps: ["Driver / Power Stage · 驅動器／功率級", "Motor + Driver + Encoder · 馬達、驅動與編碼器", "Complete Joint / Actuator · 完整關節／致動模組"] },
  { title: "Custom RobiSoC", zh: "客製 SoC 平台", subject: "Custom%2520RobiSoC", steps: ["Configured Platform · 平台配置", "Semi-custom Module · 半客製模組", "Custom SoC / Package · 客製 SoC／封裝"] },
  { title: "RobiDev Ecosystem", zh: "教育與開發生態", subject: "RobiDev%2520Ecosystem", steps: ["Developer Evaluation · 開發者評估", "Education / Research Program · 教育／研究計畫", "Partner Enablement · 合作夥伴賦能"] },
];

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
      ].map(([metric, label]) => <div key={metric}><strong>{metric}</strong><span>{label}</span></div>)}
        <Link className="os-booth-button" href="/2026-TAIROS"><strong>TAIROS 2026 <i aria-hidden="true">↗</i></strong><span>Virtual booth &amp; recap<br />虛擬展間與展後實證</span></Link>
        <Link className="os-booth-button" href="/semicon-taiwan-2026"><strong>SEMICON 2026 <i aria-hidden="true">↗</i></strong><span>Virtual booth &amp; recap<br />虛擬展間與展後報告</span></Link>
      </div></section>

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
          <div className="os-path-grid">{designInPaths.map((path, index) => <article className="os-path-card" key={path.title}><span className="os-path-number">0{index + 1}</span><h3>{path.title}<span>{path.zh}</span></h3><ul>{path.steps.map(step => <li key={step}>{step}</li>)}</ul><a href={`https://dev.robichip.com/signin-with-chatgpt?return_to=%2Fapply%3Fsubject%3D${path.subject}`}>Select this path · 選擇此路徑 <span aria-hidden="true">↗</span></a></article>)}</div>
          <div className="os-ecosystem-note"><div><h3>RobiDev: a shared starting point.<span>開發者、研究團隊與夥伴的共同起點。</span></h3><p>Evaluate motor-drive architectures, scope an education or research project, or define a partner enablement plan.<span>從馬達驅動架構評估、教育與研究專案，到合作夥伴導入計畫，依目的選擇合作路徑。</span></p></div><Link className="os-button os-button-dark" href="/robidev">Explore RobiDev · 探索生態 <span>↗</span></Link></div>
        </div>
      </section>

      <section className="os-section os-agent" id="robiagent">
        <div className="os-shell">
          <div className="os-section-head"><div><p className="os-eyebrow">ROBIAGENT · AI-ASSISTED ENGINEERING WORKFLOW</p><h2>Turn requirements into a reviewed next step.<span>讓需求成為可審查、可追蹤的下一步。</span></h2></div><p>RobiAgent connects technical questions, thermal pre-checks, layout review and validation evidence with Design-in decisions. Its workspace brings requirements, review records and next actions into one controlled case.<span>RobiAgent 串接技術查詢、熱預評估、layout 檢視與驗證證據；透過工作區整合需求、審查紀錄與後續行動，推進 Design-in 決策。</span></p></div>
          <ol className="os-agent-workflow">{["Access review · 存取審查", "Technical intake · 技術需求", "Feasibility review · 可行性審查", "NDA & data room · 保密與資料室", "Sample validation · 樣品驗證", "Design-in · 設計導入"].map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol>
          <p className="os-agent-note">Workspace access requires invitation and manual approval. Project information is shared according to approved access levels.<span>工作區須經邀請與人工審核開通；專案資料依核准權限分享。</span></p>
          <div className="os-actions"><a className="os-button os-button-primary" href="https://dev.robichip.com">Open RobiAgent · 進入工作區 <span>↗</span></a><a className="os-button os-button-ghost" href="https://www.robichip.com/robiagent">About RobiAgent · 工程流程 <span>↗</span></a></div>
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
