import type { Metadata } from "next";
import Link from "next/link";
import "./tairos.css";

export const metadata: Metadata = {
  title: "TAIROS 2026 Recap | RobiChip",
  description:
    "TAIROS 2026 post-show recap: RobiChip at Swancor Q210 and maxon K012, with a direct route to Design-in, RobiAgent and SEMICON Taiwan.",
};

const speechDeck = "/virtual-booth/robichip-automation-taipei-2026-booth-speech-v4-1.pdf";
const maxonFolder =
  "https://drive.google.com/drive/folders/1tozZDkIG1tX-zqCvB0AhL1FkRLKBrPba?usp=sharing";
const maxonVideo = "https://drive.google.com/file/d/1vlhOWG7RjF_TUMyOQ8LD2ytHGDAjohDU/preview";
const robithrustDemo = "/semicon-2026/robithrust-loop.mp4";
const robithrustDm = "https://drive.google.com/file/d/10BOInGapopQsnDckJQ2LtScVh_e_bbbs/view?usp=drivesdk";
const designInUrl = "https://dev.robichip.com";
const robiAgentUrl = "https://robiagent.robichip.com";

const roles = [
  {
    index: "01",
    name: "Swancor 上緯投控",
    role: "Materials · packaging · thermal",
    copy: "上游合作角色：以先進封裝材料與熱管理能力，協助 RobiSoC 縮短熱路徑並推進高功率密度系統可靠度。",
  },
  {
    index: "02",
    name: "SWRobot 上緯智聯",
    role: "Robotics applications · market gateway",
    copy: "下游合作角色：串接機器人與機器狗應用場景，作為智慧動力方案驗證、落地及走向國際市場的出口。",
  },
  {
    index: "03",
    name: "maxon",
    role: "RobiThrust · UAV propulsion",
    copy: "推力合作線：以 maxon 馬達搭配羅比芯智慧驅動與 RobiThrust，驗證 UAV 推力、效率與溫升；共同展出於 K012。",
  },
  {
    index: "04",
    name: "Fukuta 富田",
    role: "RobiTorque · robotic joints",
    copy: "扭力合作線：以富田馬達與羅比芯控制平台推進 RobiTorque 關節扭力驗證；屬技術合作路徑，不是第三個羅比芯聯合攤位。",
  },
];

const proofPoints = [
  {
    label: "MATERIALS + CONTROL",
    title: "Swancor inside × RobiChip",
    copy: "Q210 的實體 panel，呈現先進封裝散熱材料與 RobiChip Power SoC 的整合證據。",
    state: "Q210 · physical panel",
  },
  {
    label: "THRUST PARTNER TRACK",
    title: "RobiThrust × maxon",
    copy: "K012 的 UAV 推進驗證展示，連接 maxon 馬達、羅比芯智慧驅動與 RobiThrust。",
    state: "K012 · propulsion demo",
  },
  {
    label: "TORQUE PARTNER TRACK",
    title: "RobiTorque × Fukuta V1.5",
    copy: "Q210 的富田整合驗證展示，面向機器狗與機器人關節；與 maxon 推力合作線分開呈現。",
    state: "Q210 · joint validation",
  },
];

const news = [
  {
    source: "CHINA TIMES · 2026.08.21",
    title: "攜手羅比芯科技、富田 上緯控股開發次世代動力模組",
    copy: "上緯、羅比芯與富田以材料、晶片與動力模組協作，推進次世代高效能動力系統。",
    href: "https://www.chinatimes.com/newspapers/20260821000406-260206?chdtv",
  },
  {
    source: "ECONOMIC DAILY NEWS · 2026.08.21",
    title: "材料＋晶片＋馬達 上緯攜手羅比芯、富田打造AI機器人動力解決方案",
    copy: "從先進材料、Power SoC 到馬達模組，呈現 AI 機器人動力解決方案的協作脈絡。",
    href: "https://money.udn.com/money/story/5635/9703638",
  },
  {
    source: "WEALTH MAGAZINE · 2026.08.21",
    title: "上緯搶攻AI機器人新局　台灣自主研發「台灣土狗」即將誕生 串聯10餘家夥伴 台灣AI機器人生態系首度亮相",
    copy: "上緯智聯／TaiiBot 生態系串聯十餘家合作夥伴，RobiChip 以智慧動力核心參與其中。",
    href: "https://www.wealth.com.tw/articles/77cafe3b-0871-4406-9186-3a6ae32cb100",
  },
  {
    source: "CNA · 2026.08.06",
    title: "自動化工業大展 8/19 登場，富田電機展示機器人關節模組",
    copy: "報導富田在 S906 的自有展示，並另提與上緯、羅比芯的合作方向；羅比芯聯合參展位置仍以 Q210 與 K012 為準。",
    href: "https://www.cna.com.tw/news/afe/202608060159.aspx",
  },
  {
    source: "AUTOMATION TAIPEI · 2026.08.06",
    title: "富田電機聚焦機器人關節動力核心技術",
    copy: "官方展會新聞說明富田在 S906 的自有展出，以及與羅比芯、上緯的技術合作；S906 不列為羅比芯聯合參展攤位。",
    href: "https://automationtaipei.chanchao.com.tw/VisitorExNews/Detail?no=21825",
  },
  {
    source: "SWANCOR · 2026.05.15",
    title: "上緯投控與羅比芯啟動戰略合作",
    copy: "雙方以先進封裝材料與異質晶片系統整合為主軸，推進高功率密度動力系統的創新應用。",
    href: "https://www.swancor.com/tw/news/detail/%E4%B8%8A%E7%B7%AF%E6%8A%95%E6%8E%A7%E8%88%87%E7%BE%85%E6%AF%94%E8%8A%AF%E7%A7%91%E6%8A%80%E5%95%9F%E5%8B%95%E6%88%B0%E7%95%A5%E5%90%88%E4%BD%9C-%E5%8A%A0%E9%80%9F%E5%85%88%E9%80%B2%E5%B0%81%E8%A3%9D%E6%9D%90%E6%96%99%E6%96%BC%E9%AB%98%E5%8A%9F%E7%8E%87%E5%AF%86%E5%BA%A6%E5%8B%95%E5%8A%9B%E7%B3%BB%E7%B5%B1%E4%B9%8B%E5%89%B5%E6%96%B0%E6%87%89%E7%94%A8",
  },
];

const fieldPhotos = [
  {
    booth: "MAXON K012 · HALL 1",
    title: "RobiThrust live product display",
    copy: "maxon booth 現場展示 RobiThrust 推進驗證相關產品、DM 與影片播放，對應 UAV propulsion validation 合作線。",
    image: "/virtual-booth/tairos-day3-maxon-booth.jpg",
    alt: "RobiThrust product display at the maxon K012 booth during TAIROS 2026",
  },
  {
    booth: "SWANCOR Q210 · HALL 2",
    title: "Swancor inside, RobiThrust Heavy and RobiTorque",
    copy: "Swancor booth 現場集中展示 Swancor Inside panel、RobiThrust Heavy 與 RobiTorque × Fukuta，清楚呈現材料、推力與扭力三條證據。",
    image: "/virtual-booth/tairos-day3-swancor-booth.jpg",
    alt: "RobiChip product display at the Swancor Q210 booth during TAIROS 2026",
  },
];

const pressPhotos = [
  {
    label: "PRESS PHOTO · SWANCOR × FUKUTA × ROBICHIP",
    title: "Next-Gen Power Module press photo",
    copy: "新聞稿現場照片呈現上緯、富田與羅比芯合作脈絡，對應 Q210 的材料、封裝熱管理與 RobiTorque 技術展示。",
    image: "/virtual-booth/tairos-press-chairmen-photo.jpg",
    alt: "Press photo with Swancor, Fukuta and RobiChip representatives in front of the Next-Gen Power Module display",
  },
  {
    label: "PRESS PHOTO · SWROBOT ECOSYSTEM",
    title: "Robotics ecosystem group photo",
    copy: "上緯智聯／TaiiBot 生態系合照，說明 Q210 是上緯主場，RobiChip 是合作夥伴之一並提供智慧動力核心。",
    image: "/virtual-booth/tairos-press-ecosystem-photo.jpg",
    alt: "Swancor and SWRobot ecosystem group photo at the TAIROS booth",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function RobiThrustDemo({ booth }: { booth: "Q210" | "K012" }) {
  return (
    <article className="shared-demo" aria-label={`RobiThrust demo shown at ${booth}`}>
      <div className="shared-demo-copy">
        <p className="section-kicker acid">{booth} · SHARED ROBITHRUST DEMO</p>
        <h3>從現場展品延伸到同一份 RobiThrust 驗證影片</h3>
        <p>Q210 與 K012 都可由不同合作脈絡觀看 RobiThrust 推進驗證影片；實體展示則依 booth 區分，讓材料、關節扭力與 UAV 推進三條故事保持清楚。</p>
      </div>
      <video controls muted playsInline preload="metadata" poster="/semicon-2026/robithrust-bench.png" aria-label="RobiThrust UAV propulsion demonstration video">
        <source src={robithrustDemo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </article>
  );
}

export default function Tairos2026Page() {
  return (
    <main className="tairos-page">
      <header className="tairos-nav">
        <Link href="/" className="tairos-brand" aria-label="RobiChip home">
          <img src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" />
        </Link>
        <nav aria-label="TAIROS page navigation">
          <a href="#virtual-booth">Virtual Booth · 虛擬展間</a>
          <a href="#schedule">Schedule · 活動時程</a>
          <a href="#booths">Booths · 展位導覽</a>
          <a href="#collaboration">Partner Map · 合作地圖</a>
          <a href="#media">Media · 媒體報導</a>
        </nav>
        <Link className="tairos-nav-cta" href="/contact?intent=meeting">
          Book a meeting · 預約會議 <Arrow />
        </Link>
      </header>

      <section className="tairos-hero" id="top">
        <div className="hero-noise" aria-hidden="true" />
        <div className="tairos-shell hero-layout">
          <div className="hero-copy">
            <p className="hero-kicker">TAIROS 2026 · POST-SHOW RECAP · 展後成果</p>
            <h1>Thank you for meeting RobiChip.<br /><span>See where the conversation goes next.</span></h1>
            <p className="hero-subtitle">感謝您在 TAIROS 與羅比芯相見；現在，讓技術對話繼續前進。</p>
            <p className="hero-summary">
              TAIROS connected the package, power, propulsion and joint-validation conversations across Swancor Q210 and maxon K012. The next step is to turn the right exhibit evidence into a focused Design-in or partner discussion.<br /><span className="bilingual-copy">TAIROS 串聯了上緯 Q210 與 maxon K012 的材料、功率、推進與關節驗證故事；下一步，將現場證據轉化為具體的 Design-in 或合作洽談。</span>
            </p>
            <div className="hero-actions">
              <a className="tairos-button primary" href="#post-show-next">Continue to Design-in · 前往下一步</a>
              <Link className="tairos-button secondary" href="/semicon-taiwan-2026">Next stop: SEMICON Taiwan · 下一站 SEMICON <Arrow /></Link>
            </div>
            <div className="hero-meta">
              <span>19–22 AUG 2026</span>
              <span>TAIPEI NANGANG</span>
              <span>2 JOINT BOOTHS · Q210 + K012</span>
            </div>
          </div>

          <aside className="speech-card" aria-label="RobiChip booth speech details">
            <div className="speech-card-head"><span>EVENT ARCHIVE</span><b>TAIROS · AUG 19</b></div>
            <time dateTime="2026-08-19T13:30:00+08:00">
              <span>AUG</span><strong>19</strong><small>WEDNESDAY</small>
            </time>
            <div className="speech-time">13:30–13:55 · ARCHIVED</div>
            <h2>從 Power SoC 到<br />Next-Gen Power Module</h2>
            <dl>
              <div><dt>Stage</dt><dd>Swancor main stage</dd></div>
              <div><dt>Booth</dt><dd>Q210 · TaiNEX 2 · 1F</dd></div>
              <div><dt>Format</dt><dd>25-minute booth speech</dd></div>
            </dl>
            <a href={speechDeck} target="_blank" rel="noreferrer">Open 8/19 speech deck · 開啟演講簡報 <Arrow /></a>
          </aside>
        </div>
        <div className="power-chain" aria-label="RobiChip joint exhibition footprint">
          <div><span>01</span><strong>Q210</strong><small>Swancor · Hall 2, 1F</small></div>
          <i aria-hidden="true">→</i>
          <div><span>02</span><strong>K012</strong><small>maxon · Hall 1, 1F</small></div>
          <i aria-hidden="true">→</i>
          <div><span>03</span><strong>ROBISOC</strong><small>shared control core</small></div>
          <i aria-hidden="true">→</i>
          <div><span>04</span><strong>TWO PATHS</strong><small>thrust + torque</small></div>
        </div>
      </section>

      <section className="tairos-thank-section" id="post-show-next">
        <div className="tairos-shell">
          <div className="thank-heading">
            <div><p className="section-kicker acid">THANK YOU · WHAT&apos;S NEXT · 展後下一步</p><h2>The exhibit ends. The design-in starts.<span className="bilingual-cn">展覽落幕，Design-in 現在開始。</span></h2></div>
            <p>Thank you to every visitor, partner and media contact who made the two-booth story tangible. Choose the next step that matches your technical or commercial conversation.<span className="bilingual-copy">感謝每位訪客、合作夥伴與媒體朋友，讓兩個合作展位的故事成真；請依您的技術或商務議題，選擇下一步。</span></p>
          </div>
          <div className="thank-route-grid">
            <article><span>01 · TECHNICAL CASE</span><h3>Continue a measured design-in case.</h3><p>Bring your controller, thermal, propulsion or joint requirement into a focused engineering discussion.</p><a href={designInUrl} target="_blank" rel="noreferrer">Open Design-in service <Arrow /></a></article>
            <article><span>02 · PARTNER INTEGRATION</span><h3>Connect the right integration lane.</h3><p>For motor, reducer, packaging, materials, equipment, test and manufacturing partners—start with the relevant system interface.</p><Link href="/contact?intent=partnership">Arrange a partner meeting <Arrow /></Link></article>
            <article><span>03 · ROBIAGENT</span><h3>Structure the next engineering question.</h3><p>Use RobiAgent to frame electrical, thermal, validation and Design-in decisions before the next meeting.</p><a href={robiAgentUrl} target="_blank" rel="noreferrer">Open RobiAgent <Arrow /></a></article>
          </div>
          <div className="thank-next-stop"><div><span>NEXT STOP · SEMICON TAIWAN · SEP 04</span><strong>11:20 Silicon Startups Stage · 14:00 SEMI Venture Day</strong><small>Venture Day is an invitation-only investor session. The Silicon Startups Stage is at Booth T9404, TaiNEX 2 · 7F.</small></div><div><Link className="tairos-button primary" href="/semicon-taiwan-2026">Explore SEMICON virtual booth <Arrow /></Link><a className="tairos-button secondary" href="https://semicontaiwan.org/zh/startups_stage2026_Robichip" target="_blank" rel="noreferrer">Official SEMICON profile <Arrow /></a></div></div>
        </div>
      </section>

      <section className="virtual-booth-section" id="virtual-booth">
        <div className="tairos-shell">
          <div className="section-head virtual-head">
            <div><p className="section-kicker">VIRTUAL BOOTH · 虛擬展間 · REAL EXHIBITS · 實體展品</p><h2>Walk the two RobiChip stops before you arrive.<span className="bilingual-cn">展前先走訪羅比芯兩個合作展位。</span></h2></div>
            <p>以現場攤位與實際展品為導覽。Q210 集中材料、RobiThrust Heavy 與 RobiTorque；K012 是 RobiThrust 的 UAV 推進驗證站。</p>
          </div>
          <section className="field-update" aria-label="TAIROS day three field update">
            <div className="field-update-head">
              <p className="section-kicker acid">DAY 3 FIELD UPDATE · AUG 21</p>
              <h3>Two booths, now backed by live exhibit photos and cumulative media coverage.<span className="bilingual-cn">兩個合作展位，現場實景與累計媒體報導同步呈現。</span></h3>
              <p>新聞稿中的董事長合照先以原文連結承接；頁面主視覺則使用 RobiChip 自有現場照片，利於公開轉載與商務導流。</p>
            </div>
            <div className="field-photo-grid">
              {fieldPhotos.map((photo) => (
                <article key={photo.booth}>
                  <img src={photo.image} alt={photo.alt} />
                  <div>
                    <p>{photo.booth}</p>
                    <h4>{photo.title}</h4>
                    <p>{photo.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <div className="virtual-map-grid">
            <figure className="virtual-map">
              <img src="/virtual-booth/tairos-q210-booth.jpg" alt="Swancor and TaiiBot Q210 booth layout at TAIROS" />
              <figcaption><span>STOP 01</span><strong>Swancor · Q210 · Hall 2, 1F</strong><small>Materials, advanced packaging and robotics ecosystem</small></figcaption>
            </figure>
            <div className="virtual-stops" aria-label="TAIROS virtual booth stops">
              <a href="#q210-exhibits"><span>01</span><strong>Q210 exhibition floor · Q210 展區</strong><small>Materials, RobiThrust Heavy and RobiTorque · 材料、重推力與扭力驗證</small><Arrow /></a>
              <a href="#q210-evidence"><span>02</span><strong>Three physical proofs · 三項實體證據</strong><small>See the exact Q210 exhibits · 查看 Q210 現場展品</small><Arrow /></a>
              <a href="#k012"><span>03</span><strong>maxon K012 · maxon K012 展區</strong><small>RobiThrust UAV propulsion validation · 無人機推進驗證</small><Arrow /></a>
              <Link href="/contact?intent=meeting"><span>04</span><strong>Book a guided briefing · 預約專人導覽</strong><small>Talk with the RobiChip BD team · 與羅比芯 BD 團隊洽談</small><Arrow /></Link>
            </div>
          </div>

          <section className="q210-evidence" id="q210-exhibits" aria-label="Q210 live exhibits">
            <div className="q210-evidence-head"><p className="section-kicker acid">Q210 · THREE PHYSICAL PROOFS · 三項實體證據</p><h3>Materials, heavy propulsion and joint torque — in one exhibit path.<span className="bilingual-cn">材料、重推力與關節扭力，於同一展位完整呈現。</span></h3></div>
            <div className="q210-evidence-grid" id="q210-evidence">
              <article>
                <div className="evidence-image"><img src="/virtual-booth/swancor-inside-panel.png" alt="Swancor inside and RobiChip physical panel" /></div>
                <div><p>01 · SWANCOR INSIDE PANEL</p><h3>Materials × Power SoC</h3><p>實體 panel 呈現上緯先進封裝散熱材料導入 RobiChip Power SoC 的整合方向。</p></div>
              </article>
              <article>
                <div className="evidence-image"><img src="/virtual-booth/robithrust-heavy-swancor.png" alt="RobiThrust Heavy propulsion validation platform" /></div>
                <div><p>02 · ROBITHRUST HEAVY</p><h3>Heavy UAV validation</h3><p>高負載推進驗證平台，作為 Q210 現場展示的動力系統證據。</p></div>
              </article>
              <article>
                <div className="evidence-image"><img src="/virtual-booth/robitorque-fukuta.png" alt="RobiTorque and Fukuta motor integration platform" /></div>
                <div><p>03 · ROBITORQUE × FUKUTA</p><h3>Joint torque validation</h3><p>富田馬達與 RobiChip 控制平台的關節扭力整合驗證；這是合作技術展示，不是第三個聯合 booth。</p></div>
              </article>
            </div>
          </section>

          <RobiThrustDemo booth="Q210" />

          <article className="maxon-virtual" id="k012">
            <div><p className="section-kicker acid">STOP 03 · MAXON K012 · 第三站</p><h3>RobiThrust has its own propulsion validation lane.<span className="bilingual-cn">RobiThrust 擁有獨立的無人機推進驗證路線。</span></h3><p>At maxon K012, the RobiThrust UAV propulsion display connects high-performance motors, RobiChip’s smart drive and a measurable propulsion-validation story. It remains separate from the RobiTorque collaboration path with Fukuta.<br /><span className="bilingual-copy">maxon K012 將高性能馬達、羅比芯智慧驅動與可量測的推進驗證串聯；此路線與富田 RobiTorque 合作獨立呈現。</span></p><div className="maxon-actions"><a className="tairos-button primary" href={maxonFolder} target="_blank" rel="noreferrer">Open joint media · 開啟聯合素材 <Arrow /></a><a className="tairos-button secondary" href={robithrustDm} target="_blank" rel="noreferrer" aria-label="Open or download the RobiThrust product data sheet PDF">RobiThrust product DM · 產品型錄 PDF <Arrow /></a></div></div>
            <img className="maxon-product-image" src="/virtual-booth/robithrust-maxon.png" alt="RobiThrust UAV propulsion validation platform at maxon K012" />
          </article>

          <RobiThrustDemo booth="K012" />

          <section className="uav-stack" id="uav-platform" aria-label="RobiThrust UAV product framework">
            <div className="uav-stack-head">
              <div>
                <p className="section-kicker acid">AUG 19 · 13:30 ANNOUNCEMENT</p>
                <h3>RobiThrust × RobiSoC: from controller design-in to high-thrust flight systems.<span className="bilingual-cn">從控制器 Design-in 到高推力飛行系統。</span></h3>
              </div>
              <p>VIP.robichip.com brings the physical proofs online. The next step is a guided UAV design-in service and RobiAgent workflow for teams moving from a bench question to a system decision.</p>
            </div>

            <div className="uav-layer-grid">
              <article><span>01</span><p>CONTROLLER DESIGN-IN</p><h4>Start at the RobiSoC control layer.</h4><p>Map the controller, power, thermal and validation requirements before a propulsion architecture is locked.</p></article>
              <article><span>02</span><p>MOTOR–CONTROLLER CO-DESIGN</p><h4>Validate partner-specific motion lanes.</h4><p>maxon anchors the UAV thrust lane; Fukuta provides the RobiTorque joint reference. They demonstrate the same co-design method, not one combined product.</p></article>
              <article><span>03</span><p>3-IN-1 HIGH-THRUST-DENSITY SYSTEM</p><h4>Bring drive, motor and propeller interfaces together.</h4><p>RobiThrust packages the system conversation around measurable thrust, efficiency, heat and integration density.</p></article>
            </div>

            <div className="propeller-ecosystem">
              <div className="propeller-heading"><div><p className="section-kicker acid">PROPELLER INTERFACE ECOSYSTEM</p><h3>Small propellers to 30-inch class: a complete high-thrust system view.</h3></div><p>Propeller partners extend the UAV system interface beyond motor and drive selection. The two references below are presented by application scale, with their own materials and integration roles.</p></div>
              <div className="propeller-grid">
                <article className="propeller-card nanya-card"><div className="propeller-media"><img src="/virtual-booth/nanya-propeller-range.png" alt="Nanya Plastics small and medium UAV propellers" /></div><div><p>SMALL-PROPELLER REFERENCE</p><h4>Nanya Plastics</h4><p>Composite-material and small-propeller application reference for UAV architectures where light weight, stiffness and manufacturability affect the system trade-off.</p><img className="propeller-support-card" src="/virtual-booth/nanya-uav-materials-card.png" alt="Nanya Plastics UAV composite materials information card" /></div></article>
                <article className="propeller-card aero-card"><div className="aero-scale"><span>30</span><small>IN CLASS</small><i aria-hidden="true" /></div><div><p>LARGE-PROPELLER INTEGRATION TRACK</p><h4>艾若颯航太科技</h4><p>Large-propeller integration for the high-thrust UAV lane. The visual below is a composite-capability reference card; it is not presented as a 30-inch propeller product image.</p><img className="propeller-support-card" src="/virtual-booth/aerospace-composite-reference-card.png" alt="艾若颯航太科技 advanced composite capability reference card" /></div></article>
              </div>
            </div>

            <div className="uav-launch-actions"><div><p>DESIGN-IN + GUIDED WORKFLOW</p><strong>Turn the booth visit into an engineering next step.</strong></div><a className="tairos-button primary" href={designInUrl} target="_blank" rel="noreferrer">Start UAV design-in <Arrow /></a><a className="tairos-button secondary" href={robiAgentUrl} target="_blank" rel="noreferrer">Meet RobiAgent <Arrow /></a></div>
          </section>
        </div>
      </section>

      <section className="tairos-section day-section" id="schedule">
        <div className="tairos-shell">
          <div className="section-head">
            <div><p className="section-kicker">EVENT ARCHIVE · AUGUST 19 · 展會紀錄</p><h2>One day, two distinct roles.<span className="bilingual-cn">同一天，兩個清楚的角色。</span></h2></div>
            <p>這是 8/19 開展首日的活動紀錄：上午為上緯投控主場記者會；下午第一場由羅比芯完整說明智慧動力鏈。</p>
          </div>
          <div className="day-grid">
            <article className="day-card host-event">
              <div className="day-time"><span>11:00</span><small>— 11:25</small></div>
              <div>
                <p className="event-role">SWANCOR-HOSTED · PRESS CONFERENCE</p>
                <h3>上緯投控現場記者會</h3>
                <p>由上緯投控主辦，羅比芯以合作夥伴之一的身分參與。此段落聚焦上緯生態系與展會合作，不標示為羅比芯主辦。</p>
              </div>
            </article>
            <article className="day-card featured-event">
              <div className="day-time"><span>13:30</span><small>— 13:55</small></div>
              <div>
                <p className="event-role">ROBICHIP BOOTH SPEECH · FIRST AFTERNOON SESSION</p>
                <h3>AI 機器人不只需要算力，也需要動力</h3>
                <p>從市場痛點、Power SoC、上緯材料合作到 Next-Gen Power Module，並說明機器人與無人載具的獨立合作路徑。</p>
              </div>
              <a href={speechDeck} target="_blank" rel="noreferrer" aria-label="Open RobiChip booth speech deck"><Arrow /></a>
            </article>
          </div>
          <p className="schedule-note">Archived program source: Swancor main-stage program · 8/19.</p>
        </div>
      </section>

      <section className="tairos-section booth-section" id="booths">
        <div className="tairos-shell">
          <div className="section-head">
            <div><p className="section-kicker">OFFICIAL ROBICHIP FOOTPRINT · 羅比芯正式展出據點</p><h2>Two booths. Two clear stories.<span className="bilingual-cn">兩個展位，兩條清楚的合作故事。</span></h2></div>
            <p>羅比芯此次只在兩個合作夥伴攤位聯合參展：上緯 Q210 與 maxon K012。</p>
          </div>
          <div className="official-booths">
            <article>
              <div className="booth-badge">HALL 2 · 1F · Q210</div>
              <p>ADVANCED PACKAGING + ROBOTICS ECOSYSTEM</p>
              <h3>Swancor Booth</h3>
              <strong>材料、封裝熱管理與 Next-Gen Power Module</strong>
              <ul>
                <li>上緯投控：先進材料與熱管理</li>
                <li>SWRobot（上緯智聯）：機器人／機器狗應用與市場出口</li>
                <li>現場實體證據：Swancor Inside Panel、RobiThrust Heavy、RobiTorque × Fukuta</li>
                <li>RobiChip：Power SoC 與 8/19 13:30 演講</li>
              </ul>
            </article>
            <article>
              <div className="booth-badge">HALL 1 · 1F · K012</div>
              <p>UAV PROPULSION VALIDATION</p>
              <h3>maxon Booth</h3>
              <strong>RobiThrust 智慧推進驗證</strong>
              <ul>
                <li>maxon：高性能馬達</li>
                <li>RobiChip：智慧驅動與 RobiThrust 推進驗證展示</li>
                <li>聯合行銷影片與 UAV 推進系統驗證展示</li>
              </ul>
            </article>
          </div>
          <p className="footprint-note"><strong>Scope note:</strong> Fukuta S906 is Fukuta&apos;s own booth. RobiChip × Fukuta is presented as the RobiTorque technology partnership—not as a third RobiChip joint booth.</p>
        </div>
      </section>

      <section className="tairos-section collaboration-section" id="collaboration">
        <div className="tairos-shell">
          <div className="section-head light-head">
            <div><p className="section-kicker acid">PARTNER ROLE MAP · 夥伴角色地圖</p><h2>One platform. Four distinct roles.<span className="bilingual-cn">一個平台，四個明確角色。</span></h2></div>
            <p>上緯集團負責材料與下游應用出口；maxon與富田則分屬推力、扭力兩條獨立合作線。</p>
          </div>
          <div className="partner-grid">
            {roles.map((partner) => (
              <article key={partner.name}>
                <div className="partner-index">{partner.index}</div>
                <p>{partner.role}</p>
                <h3>{partner.name}</h3>
                <div className="partner-line" aria-hidden="true" />
                <p>{partner.copy}</p>
              </article>
            ))}
          </div>
          <div className="integration-statement">
            <span>SEPARATE PARTNER TRACKS</span>
            <div className="integration-routes">
              <strong>maxon → RobiThrust</strong><i aria-hidden="true" /> <strong>Fukuta → RobiTorque</strong>
            </div>
            <p>兩條路線共享 RobiChip 智慧動力底座，但不描述為 maxon、富田與羅比芯的共同產品聯盟。</p>
          </div>
        </div>
      </section>

      <section className="tairos-section proof-section">
        <div className="tairos-shell">
          <div className="section-head">
            <div><p className="section-kicker">TECHNOLOGY PATHS · 技術路線</p><h2>One core. Two application lanes.<span className="bilingual-cn">一個控制核心，兩條應用路線。</span></h2></div>
            <p>RobiSoC 是共通控制核心；Q210 以材料、Heavy 推進與扭力證據呈現，K012 專注 RobiThrust 推進合作。</p>
          </div>
          <div className="proof-grid">
            {proofPoints.map((item, index) => (
              <article key={item.title}>
                <div className={`proof-visual visual-${index + 1}`} aria-hidden="true">
                  <span className="visual-ring" /><span className="visual-core">RC</span><i /><b />
                </div>
                <div className="proof-copy">
                  <p>{item.label}</p><h3>{item.title}</h3><span>{item.state}</span><p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="booth-strip two-booths">
            <div><span>Q210</span><strong>Swancor · Hall 2 · 1F</strong><small>Swancor Inside Panel + RobiThrust Heavy + RobiTorque × Fukuta</small></div>
            <div><span>K012</span><strong>maxon · Hall 1 · 1F</strong><small>RobiThrust UAV propulsion validation + collaboration film</small></div>
          </div>
        </div>
      </section>

      <section className="tairos-section video-section">
        <div className="tairos-shell video-grid">
          <div className="video-copy">
            <p className="section-kicker acid">ROBICHIP × MAXON</p>
            <h2>RobiThrust, shown where motion engineers meet.<span className="bilingual-cn">在運動控制工程師聚集之處，展示 RobiThrust。</span></h2>
            <p>聯合行銷影片將於 maxon 展位播放，呈現從高性能馬達、智慧驅動到 RobiThrust 推進驗證的合作敘事。</p>
            <ul>
              <li>90-second collaboration story</li>
              <li>RobiThrust propulsion validation</li>
              <li>Motor + drive + propeller system view</li>
            </ul>
            <a className="tairos-button primary" href={maxonFolder}>Open media folder · 開啟媒體資料夾 <Arrow /></a>
          </div>
          <div className="video-frame">
            <iframe src={maxonVideo} title="RobiChip and maxon collaboration video" allow="autoplay" allowFullScreen />
            <div><span>COLLABORATION FILM</span><small>Video_Ver.3 · final selection</small></div>
          </div>
        </div>
      </section>

      <section className="tairos-section media-section" id="media">
        <div className="tairos-shell">
          <div className="section-head">
            <div><p className="section-kicker">MEDIA & RELEASES · 媒體與新聞稿</p><h2>The story is already moving.<span className="bilingual-cn">展會現場的故事，正在持續擴散。</span></h2></div>
            <p>以可擴充的新聞牆呈現；後續報導可直接新增，不需要重做整頁。</p>
          </div>
          <div className="press-photo-grid" aria-label="TAIROS press photos">
            {pressPhotos.map((photo) => (
              <figure key={photo.image}>
                <img src={photo.image} alt={photo.alt} />
                <figcaption>
                  <span>{photo.label}</span>
                  <strong>{photo.title}</strong>
                  <small>{photo.copy}</small>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="news-grid">
            {news.map((item) => (
              <article key={item.href}>
                <p>{item.source}</p><h3>{item.title}</h3><p>{item.copy}</p>
                <a href={item.href} target="_blank" rel="noreferrer">Read source · 閱讀原文 <Arrow /></a>
              </article>
            ))}
            <article className="news-coming">
              <p>MORE COVERAGE</p><h3>後續新聞稿將陸續加入</h3><p>預留同一套新聞卡片版型，展前、展中與展後可持續更新媒體露出與現場成果。</p>
              <span>COMING SOON</span>
            </article>
          </div>
        </div>
      </section>

      <section className="tairos-cta">
        <div className="tairos-shell cta-layout">
          <div>
            <p className="section-kicker acid">POST-SHOW FOLLOW-UP · 展後聯繫</p>
            <h2>Choose the right collaboration path.<span className="bilingual-cn">選擇最適合您的合作路線。</span></h2>
            <p>延續材料、封裝、馬達、關節、UAV 推進或 RobiThrust 的現場對話，讓展後回覆直接進入對應的技術與商務節點。</p>
          </div>
          <div className="cta-card">
            <time>TAIROS 2026 · POST-SHOW</time>
            <strong>Design-in next step</strong>
            <span>TECHNICAL CASE · PARTNER INTEGRATION · ROBIAGENT</span>
            <Link className="tairos-button primary" href="/contact?intent=meeting">Book a design-in meeting · 預約 Design-in 會議 <Arrow /></Link>
          </div>
        </div>
      </section>

      <footer className="tairos-footer">
        <div className="tairos-shell footer-main">
          <Link href="/" className="tairos-brand" aria-label="RobiChip home">
            <img src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" />
          </Link>
          <div><strong>POWER + AI + ROBOTICS</strong><span>Semiconductor-defined motion for intelligent machines.</span></div>
          <nav><a href={speechDeck} target="_blank" rel="noreferrer">8/19 speech deck</a><a href={maxonFolder}>Media kit</a><Link href="/contact?intent=meeting">Book a meeting</Link><a href="https://tairos.chanchao.com.tw/">Event site</a></nav>
        </div>
        <div className="tairos-shell footer-bottom"><span>© 2026 ROBICHIP TECHNOLOGY CO., LTD.</span><span>TAIPEI · TAIWAN</span></div>
      </footer>
    </main>
  );
}
