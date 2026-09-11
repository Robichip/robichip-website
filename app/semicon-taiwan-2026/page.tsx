import type { Metadata } from "next";
import Link from "next/link";
import "./semicon.css";

export const metadata: Metadata = {
  title: "RobiChip at SEMICON Taiwan 2026 | Post-Show Report",
  description:
    "RobiChip's SEMICON Taiwan 2026 post-show report: Silicon Startups Stage, SEMI Venture Day, Semiconductor-Defined Motion, RobiSoC, and Gen. 3 RobiThrust.",
};

function Zh({ children }: { children: string }) {
  return <span className="zh-translation">{children}</span>;
}

const stack = [
  ["Control", "控制"],
  ["Gate drive", "閘極驅動"],
  ["Power stage", "功率級"],
  ["Current sensing", "電流感測"],
  ["Protection", "保護機制"],
  ["Package / substrate", "封裝／基板"],
  ["Heat path / structure", "熱路徑／結構"],
];

const paths = [
  {
    name: "RobiThrust",
    state: "Measured now",
    stateZh: "已完成實測",
    tone: "ready",
    copy: "UAV propulsion evidence across thrust, efficiency, temperature, and motor–propeller matching.",
    copyZh: "針對推力、效率、溫度與馬達－槳葉匹配完成無人機推進系統實證。",
  },
  {
    name: "RobiTorque",
    state: "Planned path",
    stateZh: "規劃驗證路徑",
    tone: "planned",
    copy: "A robotics validation path for joints and actuators—presented as a roadmap, not an equivalent maturity claim.",
    copyZh: "面向機器人關節與致動器的驗證路徑；此為產品路線圖，並非同等成熟度宣稱。",
  },
  {
    name: "RobiAgent",
    state: "Workflow prototype",
    stateZh: "工作流程原型",
    tone: "prototype",
    copy: "Structured electrical, thermal, validation, and design-in decisions with engineering review at every gate.",
    copyZh: "以結構化流程整合電性、熱設計、驗證與 Design-in 決策，並於每個關卡進行工程審查。",
  },
];

const designIn = [
  ["01", "Evaluate", "評估", "Generate measured use-case data with RobiDev and application validation.", "以 RobiDev 與應用驗證建立量測化的使用情境數據。"],
  ["02", "Co-develop", "共同開發", "Lock electrical, thermal, control, package, and mechanical requirements.", "確認電性、熱、控制、封裝及機構需求。"],
  ["03", "Pilot", "試點導入", "Prepare DFM, EOL test, process windows, and qualification planning.", "準備 DFM、EOL 測試、製程窗口及認證規劃。"],
  ["04", "Scale", "量產擴展", "Capture recurring chip and module value through validated customer design-ins.", "藉由通過驗證的客戶 Design-in，建立持續性的晶片與模組價值。"],
];

export default function SemiconTaiwan2026Page() {
  return (
    <main className="semicon-page">
      <header className="semicon-nav">
        <Link className="semicon-brand" href="/" aria-label="RobiChip home">
          <img
            className="semicon-brand-logo"
            src="/brand/robichip-logo-transparent.png"
            alt="RobiChip"
            width="2048"
            height="380"
          />
          <span className="semicon-brand-local">羅比芯科技</span>
        </Link>
        <nav aria-label="SEMICON Taiwan page navigation">
          <a href="#post-show">Post-show · 展後成果</a>
          <a href="#platform">Platform · 平台</a>
          <a href="#evidence">Evidence · 實證</a>
          <a href="#design-in">Design-in · 導入</a>
        </nav>
        <a className="semicon-nav-cta" href="https://dev.robichip.com">Start a design-in · 開始導入 <span aria-hidden="true">↗</span></a>
      </header>

      <section className="semicon-thank-you" aria-labelledby="thank-you-title">
        <div className="semicon-shell thank-you-grid">
          <p className="semicon-eyebrow acid">A NOTE TO OUR VISITORS · 致來賓</p>
          <div>
            <h2 id="thank-you-title">Thank you for joining RobiChip at SEMICON Taiwan 2026.<Zh>感謝您蒞臨 RobiChip 於 SEMICON Taiwan 2026 的發表。</Zh></h2>
            <p>To everyone who visited the Silicon Startups Stage and the SEMI Venture Day Startup Pitch Showcase: thank you for the questions, technical exchange, and investment conversations. The exhibition has ended; the work now moves into Design-in.<Zh>感謝每一位參與 Silicon Startups Stage 與 SEMI Venture Day Startup Pitch Showcase 的來賓。您提出的問題、技術交流與投資對話，讓我們更堅定地走向下一步：展覽已結束，工作正進入 Design-in 階段。</Zh></p>
          </div>
        </div>
      </section>

      <section className="semicon-hero" id="top">
        <div className="semicon-mesh mesh-one" aria-hidden="true" />
        <div className="semicon-mesh mesh-two" aria-hidden="true" />
        <div className="semicon-hero-inner">
          <div className="semicon-event-label">
            <span>SEMICON TAIWAN 2026</span>
            <span>POST-SHOW REPORT · 展後報告</span>
          </div>
          <div className="semicon-hero-grid">
            <div className="semicon-hero-copy">
              <p className="semicon-kicker">FROM COMPUTE TO MOTION · 從算力到動力</p>
              <h1>Semiconductor-Defined Motion<Zh>半導體定義的動力</Zh></h1>
              <p className="semicon-deck-title">
                RobiSoC to Gen. 3 RobiThrust<Zh>RobiSoC 至第三代 RobiThrust</Zh>
              </p>
              <p className="semicon-summary">
                SEMICON Taiwan confirmed the next motion layer: semiconductor architecture that turns compute into controllable torque and thrust.
              </p>
              <p className="semicon-summary-zh">
                從 RobiSoC 到 Gen. 3 RobiThrust，將算力轉為可控制的動力；整合功率、控制、熱管理與系統驗證。
              </p>
              <div className="semicon-actions">
                <a className="semicon-button primary" href="#post-show">View post-show report · 查看展後報告</a>
                <a className="semicon-button ghost" href="https://dev.robichip.com">Start a design-in · 開始導入</a>
              </div>
            </div>

            <aside className="event-ticket" id="event-details" aria-label="Presentation details">
              <div className="ticket-top">
                <span>SHOW COMPLETE · 展覽完成</span>
                <b>2 SEMI SELECTIONS · 兩項入選</b>
              </div>
              <time dateTime="2026-09-04">
                <strong>SEP 04</strong>
                <span>2026 · FRI</span>
              </time>
              <div className="ticket-time">TOP <small>40 + 10</small></div>
              <dl>
                <div><dt>Stage · 舞台</dt><dd>Top 40 · Silicon Startups · 前 40 強</dd></div>
                <div><dt>Venture · 創投</dt><dd>Top 10 · SEMI Venture Day · 前 10 強</dd></div>
                <div><dt>Message · 主張</dt><dd>Semiconductor-Defined Motion · 半導體定義的動力</dd></div>
                <div><dt>Next step · 下一步</dt><dd>Digital Design-in · 數位化導入</dd></div>
              </dl>
              <a href="#design-in">Move from evidence to design-in · 從實證進入導入 <span aria-hidden="true">↗</span></a>
            </aside>
          </div>
        </div>
        <div className="semicon-hero-footer">
          <span>SEPTEMBER 2–4, 2026</span>
          <span>TAIPEI · TAIWAN</span>
          <span>POST-SHOW ARCHIVE · 展後檔案</span>
        </div>
      </section>

      <section className="semicon-virtual-booth" id="post-show">
        <div className="semicon-shell">
          <div className="semicon-section-head virtual-semicon-head">
            <div><p className="semicon-eyebrow acid">POST-SHOW · SEMI RECOGNITION · 展後成果</p><h2>Two stages. One motion thesis.<Zh>兩個舞台，同一個動力主張。</Zh></h2></div>
            <p>More than an event archive, this is a public record of RobiChip advancing Semiconductor-Defined Motion from a technology thesis into industry, investment, and design-in conversations.<Zh>這不只是展後活動紀錄，而是 RobiChip 將 Semiconductor-Defined Motion 從技術主張推進至產業、投資與 Design-in 對話的公開成果。</Zh></p>
          </div>
          <div className="recognition-grid">
            <article className="recognition-card"><span className="recognition-index">01</span><p>SEMICON TAIWAN · SEP 04 · 11:20–11:30</p><strong>Silicon Startups Stage<Zh>Silicon Startups 新創舞台</Zh></strong><b>Top 40 · 前 40 強</b><small>RobiChip was selected for the Silicon Startups Stage cohort, presenting Semiconductor-Defined Motion for robotics and UAV power systems.<Zh>RobiChip 獲選 Silicon Startups Stage，發表面向機器人與無人機動力系統的 Semiconductor-Defined Motion。</Zh></small><a href="https://semicontaiwan.org/en/special-features/Silicon_Startups_Stage">Official program · 官方議程 <span aria-hidden="true">↗</span></a></article>
            <article className="recognition-card"><span className="recognition-index">02</span><p>SEMI VENTURE DAY · SEP 04 · 14:30–14:40</p><strong>Startup Pitch Showcase<Zh>新創投資簡報會</Zh></strong><b>Top 10 · 前 10 強</b><small>RobiChip was selected for the invitation-only Venture Day startup showcase, connecting the motion platform with strategic and investment audiences.<Zh>RobiChip 獲選 invitation-only Venture Day 新創簡報會，將動力平台帶入策略合作與投資人對話。</Zh></small><a href="https://semicontaiwan.org/en/SEMI_VentureDay2026">Official program · 官方議程 <span aria-hidden="true">↗</span></a></article>
          </div>
          <div className="postshow-links">
            <a href="https://youtu.be/3bYFHR020K0"><span>WATCH · 觀看</span><strong>Silicon Startups Stage presentation<Zh>Silicon Startups Stage 簡報</Zh></strong><i aria-hidden="true">↗</i></a>
            <a href="https://techsoda.substack.com/p/op-ed-what-semicon-taiwan-taught"><span>READ · 閱讀</span><strong>Senior industry perspective on SEMICON Taiwan<Zh>資深產業觀點：SEMICON Taiwan</Zh></strong><i aria-hidden="true">↗</i></a>
            <a href="https://dev.robichip.com"><span>NEXT · 下一步</span><strong>Start a motion-system design-in<Zh>啟動動力系統 Design-in</Zh></strong><i aria-hidden="true">↗</i></a>
          </div>
          <div className="postshow-gallery" aria-label="SEMICON Taiwan 2026 event photos">
            <figure><img src="/semicon-2026/postshow/silicon-startups-stage.jpg" alt="RobiChip presenting Semiconductor-Defined Motion at the Silicon Startups Stage" /><figcaption>Silicon Startups Stage · Semiconductor-Defined Motion<Zh>Silicon Startups Stage · 半導體定義的動力</Zh></figcaption></figure>
            <figure><img src="/semicon-2026/postshow/venture-day-pitch.jpg" alt="RobiChip presenting at SEMI Venture Day" /><figcaption>SEMI Venture Day · Top 10 Startup Pitch<Zh>SEMI Venture Day · 前 10 強新創簡報</Zh></figcaption></figure>
            <figure><img src="/semicon-2026/postshow/venture-day-team.jpg" alt="RobiChip team at SEMI Venture Day" /><figcaption>RobiChip team · turning exposure into Design-in<Zh>RobiChip 團隊 · 將曝光轉為 Design-in</Zh></figcaption></figure>
          </div>
          <div className="virtual-booth-note"><span>POST-SHOW NOTE · 展後註記</span><p>Technical claims remain tied to documented test conditions. The next objective is to turn qualified post-show conversations into application evidence, evaluation projects, and validated design-ins.<Zh>技術主張仍以既有測試條件為準；下一步是將展後的有效對話轉化為應用實證、評估專案與通過驗證的 Design-in。</Zh></p><a href="https://dev.robichip.com">Begin a Design-in intake · 開始導入需求 <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>

      <section className="motion-manifesto">
        <div className="semicon-shell manifesto-grid">
          <p className="section-number">01 / THE ANNOUNCEMENT · 宣告</p>
          <div>
            <h2>Compute decides.<br /><span>RobiSoC makes it move.</span><Zh>算力負責決策；RobiSoC 讓它化為動力。</Zh></h2>
            <p>
              The Semiconductor-Defined Motion era begins where AI decisions become safe, efficient, repeatable torque and thrust. RobiSoC is the semiconductor layer that connects control, power, sensing, protection, and the thermal path.
            </p>
            <p className="zh-copy">AI 負責看見、規劃與決策；RobiSoC 把算力轉為安全、高效率且可驗證的動力。</p>
          </div>
        </div>
      </section>

      <section className="fragmented-section">
        <div className="semicon-shell fragmented-grid">
          <div className="fragmented-copy">
            <p className="semicon-eyebrow">WHY THE MOTION STACK BREAKS · 為何動力堆疊失效</p>
            <h2>A good collection of components can still create a poor manufacturing system.<Zh>即使元件各自優秀，仍可能形成不良的製造系統。</Zh></h2>
            <p>
              Separate optimization increases interfaces, BOM count, thermal handoffs, validation cycles, and process variability. The problem is architectural—not a search for one more component with a bigger headline rating.
              <Zh>分別最佳化會增加介面、BOM、熱傳交接、驗證週期與製程變異。問題在架構，而非再找一個規格更大的單一元件。</Zh>
            </p>
          </div>
          <div className="stack-map" aria-label="Fragmented motion stack transformed into the RobiChip platform">
            <div className="stack-list">
              <span className="stack-caption">TODAY · SEPARATED STACK · 現況：分離式堆疊</span>
              {stack.map(([english, chinese]) => <span key={english}>{english}<Zh>{chinese}</Zh></span>)}
            </div>
            <div className="stack-arrow" aria-hidden="true">→</div>
            <div className="integrated-card">
              <span>ROBICHIP</span>
              <strong>Integrated power-driving platform<Zh>整合式功率驅動平台</Zh></strong>
              <p>One package-level architecture from electronics to the heat path.<Zh>從電子到熱路徑的一體化封裝架構。</Zh></p>
              <ul>
                <li>Lower BOM · 降低 BOM</li>
                <li>Fewer thermal interfaces · 減少熱介面</li>
                <li>Faster design-in evidence · 加速導入實證</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="platform-section" id="platform">
        <div className="semicon-shell">
          <div className="semicon-section-head">
            <div>
              <p className="semicon-eyebrow acid">THE PLATFORM · 平台</p>
              <h2>RobiSoC defines the motion stack.<Zh>RobiSoC 定義動力堆疊。</Zh></h2>
            </div>
            <p>A compact Power SoC architecture that connects control, three-phase GaN power, sensing, protection, and thermal design.<Zh>緊湊型 Power SoC 架構，整合控制、三相 GaN 功率、感測、保護與熱設計。</Zh></p>
          </div>

          <div className="platform-showcase">
            <div className="architecture-visual">
              <img src="/semicon-2026/robisoc-architecture.png" alt="RobiSoC integrated package architecture" />
            </div>
            <div className="platform-facts">
              <article><span>01</span><strong>12–54 V</strong><p>Platform architecture design envelope<Zh>平台架構設計範圍</Zh></p></article>
              <article><span>02</span><strong>18.5 × 22.5 mm</strong><p>Compact module form factor<Zh>緊湊型模組尺寸</Zh></p></article>
              <article><span>03</span><strong>16–48 V</strong><p>Prototype testing range<Zh>原型測試電壓範圍</Zh></p></article>
              <article><span>04</span><strong>Up to 520 W</strong><p>Prototype output under documented test conditions<Zh>於文件化測試條件下的原型輸出</Zh></p></article>
            </div>
          </div>
          <p className="evidence-note">Architecture targets and prototype results are stated separately. Final electrical limits and qualification specifications remain subject to engineering verification.<Zh>架構目標與原型結果分別陳述；最終電性極限與認證規格仍須經工程驗證。</Zh></p>
        </div>
      </section>

      <section className="proof-section" id="evidence">
        <div className="semicon-shell">
          <div className="semicon-section-head dark-head">
            <div><p className="semicon-eyebrow acid">ONE PLATFORM · MULTIPLE PROOF PATHS · 多元實證路徑</p><h2>Evidence before claims.<Zh>先有實證，再談主張。</Zh></h2></div>
            <p>Application data feeds the semiconductor, package, and thermal decisions—then returns as a more credible design-in.<Zh>應用數據回饋至半導體、封裝與熱設計決策，進而形成更具說服力的 Design-in。</Zh></p>
          </div>
          <div className="proof-grid">
            {paths.map((item, index) => (
              <article key={item.name}>
                <div className="proof-index">0{index + 1}</div>
                <span className={`proof-state ${item.tone}`}>{item.state} · {item.stateZh}</span>
                <h3>{item.name}</h3>
                <p>{item.copy}<Zh>{item.copyZh}</Zh></p>
              </article>
            ))}
          </div>

          <div className="bench-evidence">
            <div className="bench-media">
              <video autoPlay muted loop playsInline poster="/semicon-2026/robithrust-bench.png" aria-label="RobiThrust bench validation clip">
                <source src="/semicon-2026/robithrust-loop.mp4" type="video/mp4" />
              </video>
              <span>ROBITHRUST · BENCH / EVT · 台架／工程驗證</span>
            </div>
            <div className="bench-copy">
              <p className="semicon-eyebrow acid">GEN. 3 · SEMICONDUCTOR-DEFINED HIGH-THRUST SYSTEM · 第三代高推力系統</p>
              <h2>RobiThrust turns the stack into propulsion evidence.<Zh>RobiThrust 將架構化為推進系統實證。</Zh></h2>
              <div className="metric-grid">
                <div><strong>11.17</strong><span>gf/W average · 平均效率</span><small>Light-UAV useful band · 輕型無人機有效區間</small></div>
                <div><strong>+6.3%</strong><span>vs. baseline · 相較基準</span><small>70-A-class ESC comparison · 70A 級 ESC 比較</small></div>
                <div><strong>1.6 kgf</strong><span>@ 240 W</span><small>Premium Type-I bench · Type-I 台架</small></div>
                <div><strong>47°C</strong><span>measured T1 · 實測 T1</span><small>Bench test condition · 台架測試條件</small></div>
              </div>
              <p className="bench-caveat">Bench and EVT results only—not endurance, qualification, or mass-production claims.<Zh>僅為台架與工程驗證結果；不代表耐久、認證或量產宣稱。</Zh></p>
              <a className="inline-link" href="/robithrust">Explore RobiThrust evidence · 查看 RobiThrust 實證 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="designin-section" id="design-in">
        <div className="semicon-shell">
          <div className="semicon-section-head">
            <div><p className="semicon-eyebrow">COMMERCIALIZATION · 商業化</p><h2>Design-in is the business model.<Zh>Design-in 是商業模式。</Zh></h2></div>
            <p>Evaluation services create the entry point. A validated design-in creates recurring semiconductor and module value.<Zh>評估服務創造導入入口；完成驗證的 Design-in 形成持續性的半導體與模組價值。</Zh></p>
          </div>
          <div className="designin-flow">
            {designIn.map(([index, title, titleZh, copy, copyZh]) => (
              <article key={title}>
                <span>{index}</span>
                <h3>{title}<Zh>{titleZh}</Zh></h3>
                <p>{copy}<Zh>{copyZh}</Zh></p>
              </article>
            ))}
          </div>
          <div className="designin-intake">
            <div><p className="semicon-eyebrow acid">DIGITAL DESIGN-IN INTAKE · 數位化導入需求</p><h3>Bring the application, not a generic RFQ.<Zh>帶著應用需求來，而不是一份制式 RFQ。</Zh></h3><p>Start at dev.robichip.com with voltage, power, motor or actuator, thermal envelope, mechanical constraints, target timeline, and the evidence you need to de-risk.<Zh>請於 dev.robichip.com 提供電壓、功率、馬達或致動器、熱環境、機構限制、目標時程，以及您希望降低風險的實證需求。</Zh></p></div>
            <a className="semicon-button primary" href="https://dev.robichip.com">Start at dev.robichip.com · 開始導入 <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="moat-section">
        <div className="semicon-shell moat-grid">
          <div className="moat-copy">
            <p className="semicon-eyebrow acid">SILICON TO HEAT PATH · 從晶片到熱路徑</p>
            <h2>The moat is system architecture.<Zh>競爭護城河是系統架構。</Zh></h2>
            <p>
              RobiChip connects power integration, thermal-domain separation, package-to-structure heat extraction, and field validation into one learning loop.
              <Zh>RobiChip 將功率整合、熱域分離、封裝至結構的散熱，以及場域驗證串成單一學習迴路。</Zh>
            </p>
            <ol>
              <li><span>01</span><div><strong>Architecture<Zh>架構</Zh></strong><p>Power SoC integration and thermal-aware component placement.<Zh>Power SoC 整合與熱感知元件佈局。</Zh></p></div></li>
              <li><span>02</span><div><strong>Thermal path<Zh>熱路徑</Zh></strong><p>Fewer interfaces across substrate, spreader, and system structure.<Zh>減少基板、擴散板與系統結構之間的介面。</Zh></p></div></li>
              <li><span>03</span><div><strong>Execution loop<Zh>執行迴路</Zh></strong><p>Application data feeds package rules, test vehicles, and customer design-ins.<Zh>應用數據回饋封裝規則、測試載具與客戶 Design-in。</Zh></p></div></li>
            </ol>
          </div>
          <div className="moat-visuals">
            <figure className="motion-figure"><img src="/semicon-2026/motion-stack.png" alt="Conceptual semiconductor-defined propulsion stack" /><figcaption>Semiconductor-defined motion stack<Zh>半導體定義的動力堆疊</Zh></figcaption></figure>
            <div className="thermal-pair">
              <figure><img src="/semicon-2026/thermal-active.png" alt="Active cooling thermal observation" /><figcaption>Active cooling · 41.6°C<Zh>主動冷卻</Zh></figcaption></figure>
              <figure><img src="/semicon-2026/thermal-passive.png" alt="Passive cooling thermal observation" /><figcaption>Passive cooling · 87°C<Zh>被動冷卻</Zh></figcaption></figure>
            </div>
          </div>
        </div>
      </section>

      <section className="semicon-cta">
        <div className="semicon-shell cta-grid">
          <div>
            <p className="semicon-eyebrow acid">AFTER SEMICON TAIWAN · SEMICON TAIWAN 展後</p>
            <h2>Turn post-show interest into a validated design-in.<Zh>將展後興趣轉化為通過驗證的 Design-in。</Zh></h2>
            <p>We are now opening structured technical intake for robotics, UAV propulsion, motors, advanced packaging, manufacturing qualification, and pilot-system partners.<Zh>我們現正開放機器人、無人機推進、馬達、先進封裝、製造認證與試點系統合作夥伴的結構化技術需求導入。</Zh></p>
            <p className="zh-copy">展後的下一步，是將技術交流導入明確的設計規格、評估計畫與 Design-in 驗證。</p>
          </div>
          <div className="cta-ticket">
            <span>DESIGN-IN · NEXT STEP · 導入下一步</span>
            <strong>DEV</strong>
            <p>Application intake · 應用需求導入<br />Evidence-led technical evaluation · 實證導向技術評估</p>
            <a className="semicon-button primary" href="https://dev.robichip.com">Start a design-in · 開始導入</a>
          </div>
        </div>
      </section>

      <footer className="semicon-footer">
        <div className="semicon-shell">
          <Link className="semicon-brand" href="/" aria-label="RobiChip home">
            <img
              className="semicon-brand-logo"
              src="/brand/robichip-logo-transparent.png"
              alt="RobiChip"
              width="2048"
              height="380"
            />
          </Link>
          <p>Power SoC Platform for Intelligent Machines<Zh>智慧機器的 Power SoC 平台</Zh></p>
          <div><a href="/robisoc">RobiSoC</a><a href="/robithrust">RobiThrust</a><a href="https://dev.robichip.com">RobiAgent</a><a href="https://dev.robichip.com">Design-in · 導入</a></div>
          <small>© 2026 RobiChip Technology Co., Ltd. · Bench evidence is subject to stated test conditions.<Zh>台架實證以所載測試條件為準。</Zh></small>
        </div>
      </footer>
    </main>
  );
}
