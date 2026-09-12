"use client";

import { useState } from "react";
import Link from "next/link";

type Application = {
  name: string;
  chineseName: string;
  icon: string;
  journey: string[];
  copy: string;
  chineseCopy: string;
};

const applications: Application[] = [
  {
    name: "RobiThrust",
    chineseName: "UAV 推進系統",
    icon: "RT",
    journey: ["Core · Controller Design-in", "Co-design · Motor–Controller", "Subsystem · Motor + Controller + Propeller"],
    copy: "From controller to a complete high-thrust-density propulsion subsystem.",
    chineseCopy: "從控制器到完整高推力密度推進子系統。",
  },
  {
    name: "RobiTorque",
    chineseName: "機器人關節與致動",
    icon: "RQ",
    journey: ["Core · Driver / Power Stage", "Co-design · Motor + Driver + Encoder", "Subsystem · Complete Joint / Actuator"],
    copy: "The same inside-out path, applied to a controlled motion or joint module.",
    chineseCopy: "以相同的由內到外邏輯，打造運動或關節模組。",
  },
  {
    name: "Custom RobiSoC",
    chineseName: "客製 SoC 平台",
    icon: "RS",
    journey: ["Configured Platform", "Semi-custom Module", "Custom SoC / Package"],
    copy: "A governed path from platform configuration to customer-specific silicon.",
    chineseCopy: "從平台配置走向客戶專屬晶片的受控合作路徑。",
  },
  {
    name: "RobiDev Ecosystem",
    chineseName: "教育與開發生態",
    icon: "RD",
    journey: ["Developer Evaluation", "Education / Research Program", "Partner Enablement"],
    copy: "A practical entry point for developers, laboratories and enablement partners.",
    chineseCopy: "為開發者、實驗室與合作夥伴設計的實作入口。",
  },
];

const platforms = [
  {
    name: "RobiSoC",
    status: "Engineering Sample",
    tone: "sample",
    overline: "POWER SOC",
    description: "Production and revenue layer for compact intelligent-machine power control.",
    chineseDescription: "面向小型化智慧機器動力控制的量產與營收核心。",
    visual: "soc",
  },
  {
    name: "RobiDev",
    status: "Available Now",
    tone: "available",
    overline: "EVALUATION",
    description: "Motor-drive evaluation platform for architecture and design-in decisions.",
    chineseDescription: "支援架構評估與設計導入決策的馬達驅動評估平台。",
    visual: "board",
  },
  {
    name: "RobiThrust",
    status: "Available Now",
    tone: "available",
    overline: "UAV VALIDATION",
    description: "Propulsion validation platform connecting motor, drive, load, and evidence.",
    chineseDescription: "串聯馬達、驅動、負載與數據證據的推進驗證平台。",
    visual: "prop",
  },
  {
    name: "RobiTorque",
    status: "Validation Platform",
    tone: "validation",
    overline: "ROBOTICS",
    description: "Actuator validation platform for robotic joint and motion-system evaluation.",
    chineseDescription: "用於機器人關節與運動系統評估的致動器驗證平台。",
    visual: "torque",
  },
  {
    name: "RobiLab",
    status: "Engineering Service",
    tone: "service",
    overline: "MEASUREMENT",
    description: "Measurement and engineering services that convert questions into evidence.",
    chineseDescription: "將工程問題轉化為可檢視證據的量測與工程服務。",
    visual: "lab",
  },
];

const evidence = [
  {
    index: "01",
    title: "Propulsion Validation",
    chineseTitle: "推進驗證",
    metric: "Verified thrust / power dataset",
    interpretation:
      "Connect propulsion behavior to the motor, drive, and operating point under review.",
    chineseInterpretation: "將推進表現連結到馬達、驅動器與實際操作條件。",
    graphic: "propulsion",
  },
  {
    index: "02",
    title: "Dynamic Load Testing",
    chineseTitle: "動態負載測試",
    metric: "Verified torque-speed / temperature dataset",
    interpretation:
      "Compare transient and sustained behavior before committing to a motor-drive match.",
    chineseInterpretation: "在確認馬達與驅動器搭配前，比較瞬態與持續運轉行為。",
    graphic: "load",
  },
  {
    index: "03",
    title: "Thermal Path Validation",
    chineseTitle: "熱路徑驗證",
    metric: "Verified thermal-rise / heat-path dataset",
    interpretation:
      "Locate thermal constraints across device, package, substrate, and system interfaces.",
    chineseInterpretation: "定位元件、封裝、基板與系統介面中的熱限制。",
    graphic: "thermal",
  },
];

const insights = [
  {
    time: "5 MIN READ",
    reader: "SYSTEM ARCHITECTS",
    title: "Why Power Density Matters",
    chineseTitle: "為何功率密度至關重要",
    takeaway:
      "Power density is a system constraint spanning electronics, packaging, thermal paths, and mechanics.",
    chineseTakeaway: "功率密度是橫跨電子、封裝、熱路徑與機構設計的系統限制。",
    product: "Related: RobiSoC",
  },
  {
    time: "6 MIN READ",
    reader: "MOTOR ENGINEERS",
    title: "From RobiDev to Design-in",
    chineseTitle: "從 RobiDev 到 Design-in",
    takeaway:
      "A disciplined evaluation path reduces uncertainty before a custom design becomes expensive.",
    chineseTakeaway: "有紀律的評估流程，能在客製設計成本升高前降低不確定性。",
    product: "Related: RobiDev",
  },
  {
    time: "4 MIN READ",
    reader: "UAV TEAMS",
    title: "Propulsion Validation as a Design-in Entry",
    chineseTitle: "以推進驗證作為 Design-in 的起點",
    takeaway:
      "Start with measurable propulsion behavior, then trace the evidence back to the power platform.",
    chineseTakeaway: "由可量測的推進表現出發，再回溯至動力平台的設計證據。",
    product: "Related: RobiThrust",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function PlatformGraphic({ type }: { type: string }) {
  return (
    <div className={`platform-graphic ${type}`} aria-hidden="true">
      <span className="graphic-ring ring-one" />
      <span className="graphic-ring ring-two" />
      <span className="graphic-core">RC</span>
      <span className="graphic-line line-one" />
      <span className="graphic-line line-two" />
    </div>
  );
}

export default function HomeClient() {
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const current = applications[selected];

  return (
    <main>
      <div className="utility-bar">
        <div className="utility-inner">
          <a className="utility-announcement" href="/taiwan-tech-startup-connect">
            UP NEXT · OCT 21 · Taiwan Tech Startup Connect <span aria-hidden="true">↗</span>
          </a>
          <nav aria-label="Utility navigation">
            <a href="/taiwan-tech-startup-connect">Up next · OCT 21</a>
            <a href="/semicon-taiwan-2026">SEMICON Post-show · 展後成果</a>
            <a className="desktop-only" href="/2026-TAIROS">TAIROS Recap · 展後成果</a>
            <a className="desktop-only" href="/contact?intent=meeting">Book a Meeting · 預約會議</a>
            <a className="desktop-only" href="https://www.linkedin.com/company/robichip/?viewAsMember=true" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="desktop-only" href="https://www.facebook.com/robichipTW" target="_blank" rel="noreferrer">Facebook</a>
            <a className="desktop-only" href="https://www.youtube.com/channel/UCqp-CDSVPCX8TfYT_aVScpg" target="_blank" rel="noreferrer">YouTube</a>
            <a className="desktop-only" href="https://profile.104.com.tw/company/1a2x6bnk3q">104 Careers</a>
          </nav>
        </div>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="RobiChip home">
            <img
              className="brand-logo"
              src="/brand/robichip-logo-transparent.png"
              alt="RobiChip"
              width="2048"
              height="380"
            />
          </Link>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
          </button>
          <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
            <a href="/taiwan-tech-startup-connect" onClick={() => setMenuOpen(false)}>Next Event · 下一場活動</a>
            <a href="#virtual-booths" onClick={() => setMenuOpen(false)}>Virtual Booth · 虛擬展間</a>
            <a href="#applications" onClick={() => setMenuOpen(false)}>Applications · 應用</a>
            <a href="#platform" onClick={() => setMenuOpen(false)}>Platform · 平台</a>
            <a href="#validation" onClick={() => setMenuOpen(false)}>Validation · 驗證</a>
            <a href="#insights" onClick={() => setMenuOpen(false)}>Insights · 技術洞察</a>
            <a href="#partnership" onClick={() => setMenuOpen(false)}>Partnership · 合作夥伴</a>
          </nav>
          <a className="header-cta" href="https://dev.robichip.com">Start Design-in · 開始導入</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">Power + AI + Robotics · 動力 + AI + 機器人</p>
            <h1>Power SoC Platform for Intelligent Machines<span className="bilingual-heading">智慧機器的 Power SoC 平台</span></h1>
            <p className="hero-support desktop-copy">
              RobiChip integrates high-power-density motor control, advanced packaging, thermal engineering, and system validation for robotics and unmanned systems.
              <span className="bilingual-copy">羅比芯整合高功率密度馬達控制、先進封裝、熱工程與系統驗證，服務機器人與無人系統。</span>
            </p>
            <p className="hero-support mobile-copy">
              Integrated motor control, packaging, thermal engineering, and validation for intelligent machines.
              <span className="bilingual-copy">整合馬達控制、封裝、熱工程與驗證，服務智慧機器。</span>
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#virtual-booths">Enter Virtual Booth · 進入虛擬展間</a>
              <a className="button secondary" href="https://dev.robichip.com">Start Design-in · 開始導入</a>
            </div>
            <a className="media-link" href="#validation"><span className="play">▶</span> Watch RobiThrust in Action · 觀看 RobiThrust 實際運作</a>
          </div>
          <div className="hero-stage" aria-label="RobiSoC and RobiThrust product visualization">
            <div className="stage-label label-soc"><span>01</span> RobiSoC<small>Power intelligence · 動力智慧</small></div>
            <div className="stage-label label-thrust"><span>02</span> RobiThrust<small>System validation · 系統驗證</small></div>
            <div className="soc-object">
              <div className="soc-face"><span>ROBISOC</span><strong>Power + AI</strong></div>
              <i className="pins pins-a" /><i className="pins pins-b" />
            </div>
            <div className="thrust-object">
              <span className="rotor rotor-a" /><span className="rotor rotor-b" />
              <span className="hub">RT</span>
            </div>
            <div className="stage-axis axis-a" />
            <div className="stage-axis axis-b" />
          </div>
        </div>
        <div className="shell hero-foot">
          <span>01 — PLATFORM · 平台</span><span>ENGINEERED FOR DESIGN-IN · 為 Design-in 打造</span><span>TAIPEI, TAIWAN · 台灣台北</span>
        </div>
      </section>

      <section className="virtual-booth-hub" id="virtual-booths">
        <div className="shell">
          <div className="virtual-booth-heading">
            <div>
              <p className="eyebrow light">Post-show archive · virtual booth · 展後檔案 · 虛擬展間</p>
              <h2>Review the show floor. Continue the Design-in conversation.<span className="bilingual-heading">回顧展場成果，延續 Design-in 對話。</span></h2>
            </div>
            <p>SEMICON Taiwan has concluded. Explore the post-show report and TAIROS recap, then move the relevant product evidence into your next Design-in conversation.<span className="bilingual-copy">SEMICON Taiwan 已圓滿結束；瀏覽展後報告與 TAIROS 回顧，再將相關產品實證帶入下一步 Design-in 對話。</span></p>
          </div>
          <article className="next-event-card" id="next-event">
            <div className="next-event-date"><span>UP NEXT · NEXT SHOWCASE</span><strong>OCT 21</strong><small>2026 · Expected 13:00–17:00</small></div>
            <div className="next-event-copy"><p>NTUST INCUBATION · TAIWAN TECH STARTUP CONNECT</p><h3>Enterprise showcase. Investor exchange.<span className="bilingual-heading">企業展示，投資交流。</span></h3><p>Meet RobiChip at Taiwan Tech Startup Connect, hosted by NTUST Incubation. The format brings enterprise booths, product demonstrations and conversations with investors and industry partners together in one afternoon.<span className="bilingual-copy">臺科育成主辦的 Taiwan Tech Startup Connect，將以企業攤位、產品展示及投資與產業交流為主，集中在同一個下午完成對話與曝光。</span></p></div>
            <div className="next-event-meta"><span>International Building 1F<br />Taiwan Tech Gallery · Zone B</span><small>Programme details are subject to organiser confirmation.<br />活動最終流程以主辦單位公告為準。</small><Link href="/taiwan-tech-startup-connect">Explore the event page <Arrow /></Link></div>
          </article>
          <div className="virtual-booth-cards">
            <Link className="virtual-booth-card semicon-booth" href="/semicon-taiwan-2026">
              <div className="booth-card-top"><span>01 · SEMICON TAIWAN · POST-SHOW</span><b>TOP 40 + TOP 10</b></div>
              <div className="booth-card-core"><span className="booth-orb">SoC</span><p>SEMICON Taiwan 2026 · 展後成果</p><h3>Two stages. Now, the next Design-in.<span className="bilingual-heading">兩個舞台，下一步進入 Design-in。</span></h3><small>Silicon Startups Stage · Top 40 selected<br />SEMI Venture Day · Top 10 startup pitch<br />Silicon Startups Stage 前 40 強；SEMI Venture Day 前 10 強新創簡報。</small></div>
              <strong>View SEMICON Post-show Report · 查看 SEMICON 展後報告 <Arrow /></strong>
            </Link>
            <Link className="virtual-booth-card tairos-booth" href="/2026-TAIROS">
              <div className="booth-card-top"><span>02 · TAIROS RECAP</span><b>19–22 AUG</b></div>
              <div className="booth-card-core"><span className="booth-orb">RC</span><p>Automation Taipei 2026 · 展後成果</p><h3>Two booths. Four product proofs.<span className="bilingual-heading">兩個展位，四項產品證據。</span></h3><small>Q210: Swancor Inside Panel, RobiThrust Heavy and RobiTorque × Fukuta · K012: RobiThrust UAV validation<br />Q210：Swancor Inside Panel、RobiThrust Heavy 與 RobiTorque × Fukuta；K012：RobiThrust 無人機推進驗證。</small></div>
              <strong>Explore TAIROS Recap · 瀏覽 TAIROS 展後成果 <Arrow /></strong>
            </Link>
          </div>
        </div>
      </section>

      <section className="section applications" id="applications">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">Design-in paths · 設計導入路徑</p><h2>Choose the scope before we open the case.<span className="bilingual-heading">先選擇合作範圍，再進入案件審查。</span></h2></div>
            <p>Choose the subject and engagement layer first. RobiChip then reviews strategic fit, engineering scope and the appropriate case owner before access is granted.<span className="bilingual-copy">先選擇合作主題與層級，再由 RobiChip 審查策略適配性、工程範圍與適當的案件負責人。</span></p>
          </div>
          <div className="application-tabs" role="tablist" aria-label="Application selector">
            {applications.map((app, index) => (
              <button
                key={app.name}
                className={selected === index ? "application-tab active" : "application-tab"}
                onClick={() => setSelected(index)}
                role="tab"
                aria-selected={selected === index}
              >
                <span className="app-icon">{app.icon}</span>
                <span>{app.name}<small className="tab-chinese">{app.chineseName}</small></span>
                <b>0{index + 1}</b>
              </button>
            ))}
          </div>
          <div className="journey-panel" role="tabpanel" aria-live="polite">
            <div className="journey-intro">
              <p className="eyebrow">Engagement layers · 合作層級</p>
              <h3>{current.name}<span className="bilingual-heading">{current.chineseName}</span></h3>
              <p>{current.copy}<span className="bilingual-copy">{current.chineseCopy}</span></p>
            </div>
            <div className="journey-steps">
              {current.journey.map((step, index) => (
                <div className="journey-step" key={step}>
                  <span>0{index + 1}</span><strong>{step}</strong>
                  {index < current.journey.length - 1 && <i aria-hidden="true">→</i>}
                </div>
              ))}
            </div>
            <a className="circle-link" href="https://dev.robichip.com" aria-label="Open RobiChip Design-in Workspace">↗</a>
          </div>
        </div>
      </section>

      <section className="section platform" id="platform">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">A staged platform · 分階段平台</p><h2>From Evaluation to Production<span className="bilingual-heading">從評估到量產</span></h2></div>
            <p>Use the right layer for today&apos;s engineering question—and preserve a credible path toward product integration.<span className="bilingual-copy">用正確的平台層次回答當前工程問題，並保留通往產品整合的可信路徑。</span></p>
          </div>
          <div className="platform-grid">
            {platforms.map((item, index) => (
              <article className={`platform-card card-${index + 1}`} key={item.name}>
                <div className="platform-card-top"><span>{item.overline}</span><b className={`status ${item.tone}`}>{item.status}</b></div>
                <PlatformGraphic type={item.visual} />
                <div className="platform-card-copy">
                  <p>0{index + 1}</p><h3>{item.name}</h3><p>{item.description}<span className="bilingual-copy">{item.chineseDescription}</span></p>
                  <a href={`https://www.robichip.com/${item.name.toLowerCase()}`}>Explore {item.name} · 查看平台 <Arrow /></a>
                </div>
              </article>
            ))}
          </div>
          <article className="agent-layer">
            <div className="agent-orb" aria-hidden="true"><span>AI</span></div>
            <div><p className="eyebrow light">AI-assisted design-in layer · AI 輔助設計導入層</p><h3>RobiAgent</h3><p>Connect engineering context, measured evidence, and guided design-in decisions.<span className="bilingual-copy">串聯工程情境、量測證據與引導式 Design-in 決策。</span></p></div>
            <a className="agent-launch" href="https://robiagent.robichip.com" target="_blank" rel="noreferrer">Open RobiAgent · 開啟 RobiAgent <Arrow /></a>
          </article>
        </div>
      </section>

      <section className="section evidence" id="validation">
        <div className="shell">
          <div className="section-heading evidence-heading">
            <p className="eyebrow light">Validation evidence · 驗證證據</p>
            <h2>Built to Be Measured<span className="bilingual-heading">為可量測而打造</span></h2>
            <p>Engineering claims become useful when the method, operating context, and data can be reviewed.<span className="bilingual-copy">工程宣稱必須讓方法、操作情境與數據能被檢視，才有實際價值。</span></p>
          </div>
          <div className="evidence-grid">
            {evidence.map((item) => (
              <article className="evidence-card" key={item.title}>
                <div className={`evidence-media ${item.graphic}`}>
                  <div className="media-grid" aria-hidden="true" />
                  <div className="evidence-trace" aria-hidden="true"><i /><i /><i /><i /><i /></div>
                  <span className="media-needed">Engineering media slot — asset required</span>
                  <b>{item.index}</b>
                </div>
                <div className="evidence-copy">
                  <h3>{item.title}<span className="bilingual-heading">{item.chineseTitle}</span></h3>
                  <div className="metric-placeholder"><span>QUANTITATIVE EVIDENCE · 量化證據</span><strong>{item.metric}</strong><small>Pending approved test data · 等待核准測試數據</small></div>
                  <p>{item.interpretation}<span className="bilingual-copy">{item.chineseInterpretation}</span></p>
                  <a href="/contact?intent=evaluation">View Test Details · 查看測試細節 <Arrow /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section insights" id="insights">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">Technology insights · 技術洞察</p><h2>Engineering Context for Better Decisions<span className="bilingual-heading">以工程脈絡，做出更好的決策</span></h2></div>
            <a className="text-link" href="https://www.robichip.com/technology-insights">View all insights · 查看全部洞察 <Arrow /></a>
          </div>
          <div className="insights-grid">
            {insights.map((article, index) => (
              <article className="insight-card" key={article.title}>
                <div className="article-meta"><span>{article.time}</span><span>{article.reader}</span></div>
                <span className="article-number">0{index + 1}</span>
                <h3>{article.title}<span className="bilingual-heading">{article.chineseTitle}</span></h3>
                <p>{article.takeaway}<span className="bilingual-copy">{article.chineseTakeaway}</span></p>
                <a href="https://www.robichip.com/technology-insights">{article.product} · 相關平台 <Arrow /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section partnership" id="partnership">
        <div className="shell partnership-grid">
          <div className="partnership-copy">
            <p className="eyebrow">Co-development network · 共同開發網絡</p>
            <h2>Built with an Ecosystem<span className="bilingual-heading">由生態系共同打造</span></h2>
            <p>RobiChip works across systems, semiconductors, packaging, and education to close the gaps that single-component thinking leaves behind.<span className="bilingual-copy">羅比芯串聯系統、半導體、封裝與教育資源，補齊單一元件思維無法解決的整合缺口。</span></p>
            <div className="swancor-note"><span>PUBLIC COLLABORATION · 公開合作</span><p>Strategic collaboration with Swancor focuses on advanced packaging materials and high-power-density intelligent-machine platforms.<span className="bilingual-copy">與上緯投控的策略合作聚焦先進封裝材料與高功率密度智慧機器平台。</span></p><a href="https://www.swancor.com/tw/news/detail/%E4%B8%8A%E7%B7%AF%E6%8A%95%E6%8E%A7%E8%88%87%E7%BE%85%E6%AF%94%E8%8A%AF%E7%A7%91%E6%8A%80%E5%95%9F%E5%8B%95%E6%88%B0%E7%95%A5%E5%90%88%E4%BD%9C-%E5%8A%A0%E9%80%9F%E5%85%88%E9%80%B2%E5%B0%81%E8%A3%9D%E6%9D%90%E6%96%99%E6%96%BC%E9%AB%98%E5%8A%9F%E7%8E%87%E5%AF%86%E5%BA%A6%E5%8B%95%E5%8A%9B%E7%B3%BB%E7%B5%B1%E4%B9%8B%E5%89%B5%E6%96%B0%E6%87%89%E7%94%A8">Read the public announcement · 閱讀公告 <Arrow /></a></div>
          </div>
          <div className="track-list">
            {[["System Partner", "系統夥伴"], ["MCU Partner", "MCU 夥伴"], ["Packaging Partner", "封裝夥伴"], ["Education Partner", "教育夥伴"]].map(([track, chineseTrack], index) => (
              <a href="/contact?intent=partnership" key={track}><span>0{index + 1}</span><strong>{track}<small className="track-chinese">{chineseTrack}</small></strong><i>↗</i></a>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" id="contact">
        <div className="shell cta-inner">
          <p className="eyebrow light">Start a design-in conversation · 開始 Design-in 對話</p>
          <h2>Tell Us What You Are Building<span className="bilingual-heading">告訴我們您正在打造什麼</span></h2>
          <p>Bring the application, constraints, or validation question. We&apos;ll help identify the most useful next step.<span className="bilingual-copy">帶著您的應用、限制條件或驗證問題前來；我們協助找出最有效的下一步。</span></p>
          <div className="cta-actions">
            <a className="button primary" href="https://dev.robichip.com">Start a Design-in Request · 提出設計導入需求</a>
            <a className="button secondary" href="/contact?intent=quotation">Request a Quotation · 索取報價</a>
            <a className="button ghost" href="/contact?intent=meeting">Book a Meeting · 預約會議</a>
          </div>
        </div>
      </section>

      <footer id="footer-social">
        <div className="shell footer-grid">
          <div className="footer-brand"><Link className="brand" href="/" aria-label="RobiChip home"><img className="brand-logo" src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" /></Link><p>Power SoC Platform for Intelligent Machines<br />智慧機器的 Power SoC 平台</p><strong>Power + AI + Robotics · 動力 + AI + 機器人</strong><a className="incubated-by" href="https://www.lighthouse-lmc.com" target="_blank" rel="noreferrer"><span>Incubated by LMC ↗</span><small>由 Lighthouse Management Co., Ltd. 孵化支持</small></a></div>
          <div><h3>Platform · 平台</h3><a href="https://www.robichip.com/robisoc">RobiSoC</a><a href="https://www.robichip.com/robidev">RobiDev</a><a href="https://www.robichip.com/robithrust">RobiThrust</a><a href="https://www.robichip.com/robitorque">RobiTorque</a><a href="https://www.robichip.com/robilab">RobiLab</a></div>
          <div><h3>Company · 公司</h3><a href="https://www.robichip.com/technology-insights">Technology Insights · 技術洞察</a><a href="https://www.robichip.com/news-events">News &amp; Events · 新聞與活動</a><a href="https://www.robichip.com/partnership">Partnership · 合作夥伴</a><a href="https://profile.104.com.tw/company/1a2x6bnk3q">Join Us · 加入我們</a></div>
          <div><h3>Connect · 社群</h3><a href="https://www.linkedin.com/company/robichip/?viewAsMember=true" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.facebook.com/robichipTW" target="_blank" rel="noreferrer">Facebook ↗</a><a href="https://www.youtube.com/channel/UCqp-CDSVPCX8TfYT_aVScpg" target="_blank" rel="noreferrer">YouTube ↗</a></div>
        </div>
        <div className="shell footer-bottom"><span>© 2026 RobiChip Technology Co., Ltd.</span><a href="#footer-social">Privacy statement · draft required</a><span>EN / 繁中 — Ready</span></div>
      </footer>
    </main>
  );
}
