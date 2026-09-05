(() => {
  'use strict';

  const ORIGIN = 'https://www.robichip.com';
  const CONTACT = 'mailto:contact@robichip.com';
  const BD = 'mailto:bd@robichip.com';
  const BASE_PATH = location.hostname.endsWith('.github.io') ? '/robichip-website' : '';

  const normalizePath = (value) => {
    let path = value || '/';
    if (BASE_PATH && path.startsWith(BASE_PATH)) {
      path = path.slice(BASE_PATH.length) || '/';
    }
    try { path = decodeURIComponent(path); } catch (_) {}
    path = path.replace(/\/index\.html$/i, '').replace(/\/+$/, '') || '/';
    return path;
  };

  const path = normalizePath(window.location.pathname);
  const site = document.getElementById('site');

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[char]);

  const link = (href, label, className = 'link') => `<a class="${className}" href="${href}">${label}</a>`;

  const cards = (items, columns = 'three') => `
    <div class="grid ${columns}">
      ${items.map((item) => `
        <article class="card">
          ${item.tag ? `<span class="tag">${item.tag}</span>` : ''}
          <h3>${item.title}</h3>
          ${item.power ? `<span class="power">${item.power}</span>` : ''}
          ${item.text ? `<p>${item.text}</p>` : ''}
          ${item.href ? link(item.href, item.link || 'Learn more') : ''}
        </article>`).join('')}
    </div>`;

  const section = (eyebrow, title, text, body, classes = '') => `
    <section class="section ${classes}">
      <div class="wrap">
        <div class="section-head">
          ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
          <h2>${title}</h2>
          ${text ? `<p>${text}</p>` : ''}
        </div>
        ${body || ''}
      </div>
    </section>`;

  const flow = (items) => `<div class="flow">${items.map((item) => `<div class="flow-step">${item}</div>`).join('')}</div>`;

  const mediaPlaceholder = (title, note) => `
    <div class="media-placeholder" data-migration-placeholder="true">
      <div><strong>${title}</strong><span>${note}</span></div>
    </div>`;

  // Each frozen Google-Sites page is copied as its original custom-HTML
  // blocks in a static asset, keeping the shared renderer compact.
  const sourceRoute = (source, layout = '') => `<div class="google-source-route" data-source-route="${source}" data-source-layout="${layout}"></div>`;
  // The frozen Technology Insights pages are Google Drive previews. Keeping
  // their original viewer is closer to the source than re-authoring articles.
  const documentReferencePage = (src, title, height) => '<section class="drive-reference" style="--reference-height:' + height + 'px"><iframe src="' + src + '" title="' + esc(title) + '" loading="eager"></iframe></section>';
  const sourceMissingPage = () => '<section class="google-missing-page"><h1>404</h1><p>The page you have entered does not exist</p><a href="/">Go to site home</a></section>';
  const sourceBlankPage = () => '<div class="source-blank-page" aria-label="Frozen empty source page"></div>';
  const hero = ({ eyebrow, title, zh, lead, sublead, image, caption, actions = [], metrics = [] }) => `
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <span class="eyebrow">${eyebrow}</span>
          <h1>${title}</h1>
          ${zh ? `<p class="zh-title">${zh}</p>` : ''}
          ${lead ? `<p class="lead">${lead}</p>` : ''}
          ${sublead ? `<p class="sublead">${sublead}</p>` : ''}
          ${actions.length ? `<div class="actions">${actions.map((action, index) => link(action.href, action.label, `btn${index === 0 ? ' primary' : ''}`)).join('')}</div>` : ''}
        </div>
        ${image ? `
          <div class="visual-card product-visual">
            <img src="${image}" alt="${esc(caption || title)}">
            ${caption ? `<div class="image-caption">${caption}</div>` : ''}
          </div>` : `
          <div class="visual-card" aria-label="Power SoC platform illustration">
            <div class="chip" aria-hidden="true"></div>
            <div class="metric-row">
              ${(metrics.length ? metrics : [['250–1000 W', 'Product family'], ['18.5 × 22.5 mm', 'RobiSoC module'], ['Power + AI', 'Platform direction']]).map(([value, label]) => `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`).join('')}
            </div>
          </div>`}
      </div>
    </section>`;

  const utilityBar = () => `
    <aside class="utility-bar" aria-label="RobiChip event and contact links">
      <div class="wrap utility-links">
        <a href="https://robichip-homepage.robichip-ai-8830.chatgpt.site/2026-TAIROS#schedule">TAIROS Virtual Booth · AUG 19 · 13:30 <span aria-hidden="true">↗</span></a>
        <a href="https://robichip-homepage.robichip-ai-8830.chatgpt.site/semicon-taiwan-2026">SILICON STARTUPS PITCH</a>
        <a href="https://VIP.robichip.com">VIP Room</a>
        <a href="https://robichip-homepage.robichip-ai-8830.chatgpt.site/contact?intent=meeting">BOOK A MEETING</a>
        <a href="https://www.linkedin.com/company/robichip/?viewAsMember=true">LINKEDIN</a>
        <a href="https://www.facebook.com/robichipTW">FACEBOOK</a>
        <a href="https://www.youtube.com/channel/UCqp-CDSVPCX8TfYT_aVScpg">YOUTUBE</a>
        <a href="https://www.104.com.tw/company/1a2x6bnk3q#info06">104 CAREERS</a>
      </div>
    </aside>`;

  const cta = (title = 'Build the Next Generation of Intelligent Machines with RobiChip', text = '與羅比芯共同打造次世代智慧機器動力平台。從技術對焦、驗證計畫到 design-in 與 pilot partnership。') => `
    <section class="section tight">
      <div class="wrap">
        <div class="cta-band">
          <h2>${title}</h2>
          <p>${text}</p>
          <div class="actions">
            ${link(BD, 'Discuss a partnership', 'btn primary')}
            ${link(CONTACT, 'Technical discussion', 'btn')}
          </div>
        </div>
      </div>
    </section>`;

  const homePage = () => `
    ${utilityBar()}
    ${hero({
      eyebrow: 'Power + AI + Robotics',
      title: 'Power SoC Platform for Intelligent Machines',
      zh: '為智慧機器打造高功率密度 Power SoC 平台',
      lead: 'RobiChip builds high-power-density Power SoC, developer platforms, and AI-assisted engineering tools for robotics, UAVs, and intelligent motion systems.',
      sublead: '羅比芯整合 Power SoC、先進封裝熱管理、RobiDev 驗證平台與 RobiAgent 設計代理人，協助客戶從 prototype validation 走向 design-in、DFM 與 pilot production。',
      actions: [
        {href: '/robisoc', label: '了解 RobiSoC'},
        {href: '/technology-insights', label: '閱讀技術洞察'},
        {href: '/partnership', label: '洽談策略合作'}
      ]
    })}
    ${section('2026 Technology Showcase Series', 'From Live Validation to Semiconductor-Defined Motion', '從實機驗證走向半導體定義的智慧動力。Aug. 19–22 展示技術如何運作；Sep. 2–4 說明如何透過半導體平台規模化。', cards([
      {tag: 'Aug 19–22 · Taipei', title: 'Automation Taipei / TAIROS 2026', text: 'Live demo at Swancor booth Q210, TaiNEX 2 and Maxon booth K012, TaiNEX 1.', href: '/news-events/2026-TAIROS', link: 'Event details'},
      {tag: 'Sep 2–4 · Taipei', title: 'SEMICON Taiwan 2026', text: 'Accepted speaker and showcase at booth T9404, 7F TaiNEX 2. Presentation: Sep 4, 14:00.', href: '/news-events/semicon-taiwan-2026', link: 'Event details'}
    ]), 'tint')}
    ${section('RobiThrust Focus', 'From Power SoC to Propulsion Validation', '從 Power SoC 到無人機推進驗證平台：把電力轉換、馬達驅動、熱路徑與量測資料放進同一條工程流程。', `
      <div class="split">
        <div class="visual-card product-visual"><img src="/assets/images/robithrust-platform.png" alt="RobiThrust UAV propulsion validation platform"><div class="image-caption">RobiThrust propulsion validation platform</div></div>
        <div>
          ${cards([
            {tag:'Application', title:'證明應用需求', text:'Translate thrust, RPM, load, and efficiency targets into measurable engineering requirements.'},
            {tag:'Thermal', title:'觀察真實熱路徑', text:'Connect package, PCB, structure, airflow, and operating profile in one validation context.'},
            {tag:'Design-in', title:'加速客戶導入', text:'Turn test evidence into a practical design-in package for customer pilot projects.'}
          ], 'three')}
          <div style="margin-top:18px">${flow(['Power SoC', 'Motor Drive', 'Thermal Path', 'Validation', 'Design-in'])}</div>
        </div>
      </div>`)}
    ${section("Latest News & Events", "最新消息與活動", "Three current milestones. Full stories and the complete archive are available in News & Events.<br>首頁僅保留三則近期重點；完整內容與歷史紀錄請前往活動消息總頁。", cards([
      {tag:"2026.07.31 · Accepted Speaker", title:"RobiChip Selected to Speak at SEMICON Taiwan 2026", text:"Presenting semiconductor-defined motion for high-power-density robotics and UAV motor drives.<br><br>分享半導體定義動力平台，連結高功率密度馬達驅動、機器人與無人機應用。", href:"/news-events/semicon-taiwan-2026", link:"View Event Details"},
      {tag:"2026.08.19–22 · Live Showcase", title:"Automation Taipei / TAIROS 2026", text:"Live RobiTorque and RobiThrust demonstrations with ecosystem partners.<br><br>攜手生態系夥伴展示 RobiTorque 與 RobiThrust 實機驗證。", href:"/news-events/2026-TAIROS", link:"Explore the Showcase"},
      {tag:"2026.04.25 · Recognition", title:"2026 Best AI Awards", text:"Recognition for RobiChip Power SoC platform for intelligent motion systems.<br><br>羅比芯智慧動力 Power SoC 平台獲 IC 設計類別肯定。", href:"/news-events/news-events-best-AI-Awards", link:"Read Award Story"}
    ]), "tint")}
    ${section('Platform Overview', 'One Platform, Multiple Entry Points', '從 Power SoC、驗證平台到 AI-assisted design-in，依照客戶所處階段選擇最直接的合作入口。', cards([
      {tag:'Power SoC', title:'RobiSoC', text:'Power SoC + hybrid-substrate product family from 250 W to 1000 W class.', href:'/robisoc'},
      {tag:'Evaluation', title:'RobiDev', text:'Developer and evaluation platforms for electrical, firmware, and thermal validation.', href:'/robidev'},
      {tag:'UAV', title:'RobiThrust', text:'UAV propulsion validation from compact motors to heavy-load test benches.', href:'/robithrust'},
      {tag:'Robotics', title:'RobiTorque', text:'Robotics actuator and joint-motor validation direction.', href:'/robitorque'},
      {tag:'AI Workflow', title:'RobiAgent', text:'AI-assisted technical query, pre-check, layout review, and design-in decisions.', href:'/robiagent'},
      {tag:'Lab', title:'RobiLab', text:'Measurement, thermal, reliability, and system-validation base.', href:'/robilab'}
    ]), 'tint')}
    ${section('Technical Insights', 'Engineering Notes for High-Power-Density Motion', '高功率密度智慧動力平台的技術洞察與驗證筆記。', cards([
      {tag:'Published Note', title:'RobiThrust ECX-32 Test Observation', text:'From motor-driver matching to endurance optimization: G2 showed +6.3% average gf/W advantage at 3100–5600 rpm.', href:'/technology-insights/robithrust-ecx32-test-observation', link:'Read note'},
      {tag:'Fundamentals', title:'Why Power Density Matters in Intelligent Machines', text:'How compact power conversion affects payload, thermal design, reliability, and motion performance.', href:'/technology-insights/why-power-density-matters', link:'Read insight'},
      {tag:'Workflow', title:'From RobiDev to Design-in Workflow', text:'How evaluation evidence becomes a customer-specific design-in package.', href:'/technology-insights/robidev-to-design-in', link:'Read workflow'}
    ]), 'tint')}
    ${section('Scale', 'From Validation to Ecosystem Expansion', '從技術驗證到產業鏈擴張：一條路徑深化量產能力，另一條路徑擴張應用平台。', `
      <div class="grid two">
        <div class="callout"><span class="tag">Scale Up</span><h3>DFM · Reliability · Pilot Sample</h3><p>Turn verified prototypes into manufacturable and reliability-aware pilot programs.</p></div>
        <div class="callout"><span class="tag">Scale Out</span><h3>UAV · Robotics · Industrial Motion</h3><p>Reuse the platform across propulsion, actuator, and high-density motion applications.</p></div>
      </div>
      <div style="margin-top:22px">${flow(['Prototype Validation', 'DFM & Reliability', 'Pilot Sample', 'Design-in', 'Platform Scale'])}</div>`)}
    ${section("Partnership CTA", "Build the Next Generation of Intelligent Machines with RobiChip", "與羅比芯共同打造次世代智慧機器動力平台。<br>RobiChip welcomes robotics, UAV, industrial motion, advanced packaging, thermal materials, and strategic investment partners.<br><br>我們歡迎機器人、無人機、工業運動控制、先進封裝、散熱材料與策略投資夥伴，共同推進高功率密度 Power SoC 與智慧動力系統。", cards([
      {tag:"Robotics / UAV", title:"System Partners", text:"For robotics, UAV, AMR / AGV, and actuator system companies seeking compact, high-efficiency motion platforms.<br><br>適合需要高效率、小型化、高功率密度動力平台的機器人、無人機與致動器系統廠。"},
      {tag:"Packaging / Materials", title:"Technology Partners", text:"For advanced packaging, substrate, thermal interface, and materials partners interested in Power SoC co-development.<br><br>適合先進封裝、載板、散熱介面材料與高功率模組夥伴共同開發。"},
      {tag:"Design-in", title:"Engineering Collaboration", text:"Explore RobiDev, RobiThrust, validation workflows, thermal evaluation, and early design-in discussion.<br><br>透過 RobiDev、RobiThrust、熱評估與實測流程，展開早期規格收斂與設計導入。"},
      {tag:"Strategic Capital", title:"Investment Partners", text:"For strategic investors who can support DFM, reliability validation, pilot production, and market access.<br><br>歡迎能支持 DFM、可靠度驗證、pilot production 與國際市場導入的策略投資夥伴。"}
    ], "four") + `<h3 class="subsection-title">Collaboration Path｜合作流程</h3>${flow(["Initial Discussion<br><small>需求與應用場景盤點</small>", "Technical Alignment<br><small>規格、熱路徑與驗證條件</small>", "Validation Plan<br><small>RobiDev / RobiThrust 測試規劃</small>", "Design-in Package<br><small>導入方案與工程資料</small>", "Pilot / Partnership<br><small>試作、合作或策略投資</small>"])}<div class="actions">${link("/partnership", "洽談合作 Partnership", "btn primary")}${link("/robithrust", "了解 RobiThrust", "btn")}${link("/technology-insights", "閱讀技術洞察", "btn")}</div><p class="public-note">Detailed technical specifications, raw validation data, design files, and partner-only materials are shared through official discussion, NDA, or designated partner access.<br>詳細規格、原始驗證資料、設計檔案與 partner-only 技術資料，將透過正式洽談、NDA 或指定夥伴授權提供。</p>`, "tint")}`;

  const robisocPage = () => `
    ${hero({
      eyebrow:'RobiSoC Product Family',
      title:'Scalable Power SoC Modules for Intelligent Machines',
      zh:'面向智慧機器的可擴展高功率密度 Power SoC 產品線',
      lead:'RobiSoC is RobiChip’s scalable Power SoC product family for robotics, UAV propulsion, and high-power-density motion systems, offered as RC25 / RC50 / RC75 / RC100 modules from 250 W to 1000 W class.',
      sublead:'RobiSoC 是羅比芯面向機器人、無人機推進與高功率密度動力系統的可擴展 Power SoC 產品線，提供 RC25 / RC50 / RC75 / RC100，涵蓋 250 W 到 1000 W class。',
      actions:[{href:"/partnership",label:"Discuss Design-in"},{href:"/robidev",label:"Explore RobiDev"}],
      metrics:[['250–1000 W','RC25–RC100'],['22 × 18 mm','Preliminary RC100 footprint'],['M1/M2 · G1/G2','Configuration logic']]
    })}
    ${section('Product Line', 'RC25 / RC50 / RC75 / RC100', 'A scalable product family organized by power class and application direction.', cards([
      {tag:'Market Baseline', title:'RC25', power:'250 W Class', text:'Lightweight motor control for compact actuators, education kits, mobility nodes, and edge-motion platforms.'},
      {tag:'2× Direction', title:'RC50', power:'500 W Class', text:'Compact actuator and servo module for mid-power robotics, AMR/AGV, gimbals, and automation.'},
      {tag:'3× Direction', title:'RC75', power:'750 W Class', text:'High-power compact actuation for robotics joints, industrial automation, and high-dynamic motion.'},
      {tag:'Indicator Product', title:'RC100', power:'1000 W Class', text:'1000 W-class flagship for power-dense designs with clear thermal and validation boundaries.'}
    ], 'four'), 'tint')}
    ${section("Technical Documentation", "RC100 Detailed Datasheet", "RC100 三相 BLDC／PMSM 馬達驅動器詳細規格書<br>Download the detailed technical datasheet for the RC100 motor-drive Power SoC, including architecture, interfaces, operating conditions, protection functions, package information, ordering options, and RobiDev design-in support.<br><br>下載 RC100 馬達驅動 Power SoC 詳細規格書，查看功能架構、控制介面、操作條件、保護功能、封裝資訊、訂購組態與 RobiDev Design-in 支援。", `
      <div class="datasheet-layout">
        <div>
          <div class="badge-row"><span class="tag">Version 0.9</span><span class="tag">Three-Phase BLDC / PMSM</span><span class="tag">Integrated GaN Power Stage</span><span class="tag">RobiSoC Platform</span></div>
          <h3>RC100 Three-Phase BLDC/PMSM Motor Driver</h3><p class="secondary-heading">RobiSoC Motor-Drive Power SoC</p>
          <p>RC100 combines an STM32G4-series motor-control MCU, a three-phase GaN power stage, current sensing, protection functions, and multiple control interfaces in a preliminary 22 mm × 18 mm footprint.</p>
          <p>RC100 在初步 22 mm × 18 mm 的精巧尺寸中，整合 STM32G4 系列馬達控制 MCU、三相 GaN 功率級、電流感測、保護功能與多種控制介面。</p>
          <div class="spec-grid">
            <div class="spec-item"><span>Main Supply</span><strong>12–60 V</strong><small>24–60 V robotic bus</small></div>
            <div class="spec-item"><span>Output Current</span><strong>20 A continuous</strong><small>140 A peak @ 25°C / 300 µs</small></div>
            <div class="spec-item"><span>Form Factor</span><strong>22 × 18 mm</strong><small>Preliminary RobiSoC footprint</small></div>
            <div class="spec-item"><span>PWM Frequency</span><strong>10–100 kHz</strong><small>Recommended operating range</small></div>
            <div class="spec-item"><span>Controller</span><strong>STM32G4 Series</strong><small>Motor-control MCU in package</small></div>
            <div class="spec-item"><span>Power Stage</span><strong>Three-Phase GaN</strong><small>Configurable G1 / G2 options</small></div>
            <div class="spec-item"><span>Interfaces</span><strong>PWM / SPI / UART</strong><small>Encoder and POT support</small></div>
          </div>
        </div>
        <aside class="document-panel">
          <span class="document-icon">PDF</span><span class="document-pages">11 PAGES</span>
          <h3>RC100 BLDC/PMSM Motor Driver Datasheet</h3>
          <dl><div><dt>Document</dt><dd>RC100-DS-0717</dd></div><div><dt>Version</dt><dd>0.9 (draft)</dd></div><div><dt>Released</dt><dd>2026-07-29</dd></div><div><dt>Part No.</dt><dd>Robi-DRV-RC100B</dd></div><div><dt>Language</dt><dd>English</dd></div></dl>
          <div class="actions"><a class="btn primary" href="https://drive.google.com/file/d/14MMWa4HdldpVRfPoB2D2_pjUSVBwh5M8/view?usp=sharing">Download RC100 Datasheet</a><a class="btn" href="https://drive.google.com/file/d/14MMWa4HdldpVRfPoB2D2_pjUSVBwh5M8/view?usp=sharing">View Datasheet Online</a></div>
        </aside>
      </div>
      <div class="detail-grid">
        <div><span>Architecture</span><strong>Functional Block Diagram</strong><small>MCU、GaN 功率級、感測與控制架構</small></div><div><span>Electrical</span><strong>Ratings & Operating Conditions</strong><small>電壓、溫度與 PWM 操作範圍</small></div><div><span>Interfaces</span><strong>Control & Feedback</strong><small>PWM、SPI、UART、Encoder 與 POT</small></div><div><span>Protection</span><strong>OCP / OVP / UVLO / OTP</strong><small>過流、過壓、欠壓與過溫保護</small></div><div><span>Mechanical</span><strong>Package & Footprint</strong><small>封裝尺寸、焊墊與 IC footprint</small></div><div><span>Thermal</span><strong>Thermal & Reliability Data</strong><small>熱阻、接面溫度與 ESD 資訊</small></div><div><span>Configuration</span><strong>M1 / M2 · G1 / G2 Options</strong><small>控制器與 GaN 功率級組態</small></div><div><span>Design-in</span><strong>RobiDev Development Support</strong><small>High-Density 與 Discrete 評估平台</small></div>
      </div>
      <div class="notice"><strong>Preliminary document notice｜初步文件說明：</strong> Specifications, configuration options, package codes, electrical limits, availability, and production part numbers remain subject to validation, formal quotation, engineering review, and final product release.<br>規格、組態選項、封裝代碼、電氣限制、供貨狀態及正式量產料號，仍應以驗證、工程審查、正式報價及最終產品發布文件為準。</div>
    `, "tint")}
    ${section('SKU Logic', 'RCxx + M / G Defines the RobiSoC Product Configuration', '以 RCxx + M / G 定義 RobiSoC 產品組態：RobiSoC-RCxx-MxGx。', `
      <div class="table-wrap"><table>
        <thead><tr><th>Code</th><th>Meaning</th><th>Public positioning</th></tr></thead>
        <tbody>
          <tr><td>RC25 / 50 / 75 / 100</td><td>250 / 500 / 750 / 1000 W class</td><td>Scalable power-class family</td></tr>
          <tr><td>M1</td><td>STM32G4x motor-control MCU baseline</td><td>170 MHz-class reference platform</td></tr>
          <tr><td>M2</td><td>Custom controller / firmware integration</td><td>Partner-specific option</td></tr>
          <tr><td>G1</td><td>Integrated 100 V GaN half-bridge</td><td>Integrated power-stage direction</td></tr>
          <tr><td>G2</td><td>100 V enhancement-mode GaN reference</td><td>Discrete/reference transistor direction</td></tr>
          <tr><td>T1 / T2</td><td>Compact RC thermal-model options</td><td>Thermal-path modeling options</td></tr>
        </tbody>
      </table></div>
      <div class="notice">Pin maps, package drawings, order codes, and final electrical/thermal ratings are subject to the official datasheet and partner discussion. M2 positioning is application- and partner-specific.</div>`)}
    ${section('Partner Configuration', 'From Reference Platform to Customer-Specific Power Silicon', '合作內容可依控制、介面、韌體、驗證與製造需求進行組態。', cards([
      {title:'Toolchain & Firmware Alignment', text:'Align the partner MCU, SDK, firmware structure, debug tools, production programming, and validation documentation.'},
      {title:'Application-specific I/O', text:'Define CAN bus, RS485, UART, SPI, PWM, encoder, sensor signals, cable direction, and control-interface logic.'},
      {title:'Co-developed Evaluation Platform', text:'Co-develop evaluation boards, developer kits, reference designs, and validation workflows around the target application.'},
      {title:'Power Platform Without MCU Lock-in', text:'Jointly select power stages, thermal paths, protection logic, and system limits while retaining adaptable control choices.'}
    ], 'four'), 'tint')}
    ${section("Validation Loop", "From RobiDev to RobiLab to Application Proof", "從 RobiDev、RobiLab 到應用驗證<br>RobiChip builds a validation loop from module samples and driver boards to dynamic-load measurement, thermal validation, UAV propulsion testing, and robotics actuator scenarios.<br><br>羅比芯建立從模組樣品、驅動板、動態負載量測、熱驗證、無人機推進測試到機器人致動器場景的驗證閉環。", cards([
      {tag:"RobiDev", title:"Design-in Front Door", text:"Supports electrical interface checks, driver-board validation, firmware bring-up, and early customer-facing evaluation.<br><br>客戶導入前門"},
      {tag:"RobiLab", title:"Measurement Validation", text:"Supports dynamic load, thermal management, T-N curve, system measurement, and validation workflow design.<br><br>量測與驗證"},
      {tag:"RobiThrust", title:"UAV Propulsion Proof", text:"Connects RobiSoC development to motor-driver matching, thrust efficiency, thermal path, and propulsion validation.<br><br>無人機推進驗證"},
      {tag:"RobiAgent", title:"AI-assisted Engineering", text:"Supports thermal and power evaluation, technical explanation, and FAE / design-in acceleration workflows.<br><br>AI 輔助工程導入"}
    ], "four") + `<h3 class="subsection-title">RobiSoC Development Path｜RobiSoC 發展路徑</h3>${flow(["Prototype Validation<br><small>architecture, module, measurement</small>", "DFM Review<br><small>layout rules, thermal interface</small>", "Reliability Build<br><small>thermal, power, mechanical stress</small>", "Pilot Samples<br><small>sample lot, yield learning</small>", "Design-in Readiness<br><small>customer validation, roadmap alignment</small>"])}<p class="public-note">Public website content is intended for platform communication and early design-in education. Detailed specifications, raw validation data, design files, DFM materials, MCU partner details, and partner-only documents are provided through official technical discussion or NDA-controlled access.<br>本頁內容用於平台溝通與早期 design-in 教育。詳細規格、原始驗證資料、設計檔案、DFM 資料、MCU 夥伴細節與 partner-only 文件，將透過正式技術洽談或 NDA 管制方式提供。</p><div class="actions">${link("/partnership", "Start Technical Discussion", "btn primary")}${link(BD, "bd@robichip.com", "btn")}${link(CONTACT, "contact@robichip.com", "btn")}</div>`, "tint")}`;

  const robidevPage = () => `
    ${hero({
      eyebrow:"RobiDev High-Density",
      title:"RobiSoC Evaluation & High-Density Motor-Drive Design-in Platform",
      zh:"RobiDev High-Density 支援 RC100 / RobiSoC 評估、熱路徑檢視與高密度馬達驅動導入。",
      lead:"RobiDev High-Density supports RC100 / RobiSoC evaluation, thermal-path review, and high-density motor-drive design-in.",
      sublead:"Diameter 30 mm · up to 500 W",
      image:"/assets/images/robidev-platform.png",
      caption:"RobiDev High-Density evaluation and design-in platform",
      actions:[{href:"/partnership",label:"Discuss Design-in"},{href:"/robisoc",label:"Explore RobiSoC"}]
    })}
    ${section("Platform Overview", "What is RobiDev?", "RobiDev 是什麼？<br>RobiDev is the board-level platform that bridges RobiSoC device technology with system-level validation, motor integration, thermal review, and customer design-in.<br><br>RobiDev 是承接 RobiSoC 與系統驗證之間的 board-level 平台，用來完成馬達整合、熱檢視、控制介面驗證與客戶導入前評估。", cards([
      {title:"Evaluation",text:"Supports early feasibility review, motor-control evaluation, electrical interface testing, and firmware bring-up."},
      {title:"Validation",text:"Supports thermal-path review, dynamic-load testing, measurement correlation, and board-to-system validation."},
      {title:"Design-in",text:"Shortens the path from concept to customer design-in, especially for robotics, UAV, actuator, and motion-system developers."}
    ]), "tint")}
    ${section("Product Family", "RobiDev Discrete & High-Density", "從分離式參考驗證到高功率密度 Design-in<br>RobiDev is offered through two function-based platform configurations. RobiDev Discrete supports early motor-control development and reference validation, while RobiDev High-Density supports RobiSoC evaluation, compact integration, thermal review, and customer design-in.<br><br>RobiDev 採用兩種功能型平台配置。RobiDev Discrete 支援早期馬達控制開發與參考驗證；RobiDev High-Density 則支援 RobiSoC 評估、高功率密度整合、熱路徑檢視與客戶 Design-in。", cards([
      {tag:"Reference & Validation",title:"RobiDev Discrete",text:"6-Layer Discrete Reference & Validation Platform｜六層分離式參考與驗證平台<br><br>A total-discrete implementation for early BLDC / PMSM evaluation, firmware bring-up, controller development, motor integration, engineering education, and architecture comparison.<br><br>採用 total-discrete 架構，適用於 BLDC／PMSM 早期評估、韌體 bring-up、控制器開發、馬達整合、工程教育與架構比較。",href:"mailto:bd@robichip.com?subject=RobiDev%20Discrete%20Platform%20Quote",link:"Request Discrete Platform Quote"},
      {tag:"Evaluation & Design-in",title:"RobiDev High-Density",text:"RobiSoC Evaluation & High-Density Motor-Drive Design-in Platform｜RobiSoC 高功率密度評估與 Design-in 平台<br><br>A higher-density evaluation path for RobiSoC and RC100, supporting compact motor-drive integration, M1 / G1 configuration evaluation, thermal-path review, protection integration, and customer-specific design-in.<br><br>面向 RobiSoC 與 RC100 的高功率密度評估路徑，支援小型化馬達驅動整合、M1／G1 組態評估、熱路徑檢視、保護機制整合與客戶專案導入。",href:"mailto:bd@robichip.com?subject=RobiDev%20High-Density%20Review",link:"Request High-Density Review"},
      {tag:"System Configuration",title:"RobiDev + RobiThrust Integration Bundle",text:"Integrate motor-driver and propeller matching, thrust, input power, efficiency, and thermal observation into one validation package for UAV propulsion design-in.<br><br>整合馬達驅動與槳匹配、推力、輸入功率、效率與熱觀察，形成無人機推進 Design-in 的驗證套件。",href:"mailto:bd@robichip.com?subject=RobiDev%20RobiThrust%20Integration%20Bundle",link:"Configure Integration Bundle"}
    ], "three") + `${flow(["RobiDev Discrete<br><small>Reference implementation and early engineering validation<br>分離式參考實作與早期工程驗證</small>", "RobiDev High-Density<br><small>RobiSoC evaluation and customer design-in<br>RobiSoC 高功率密度評估與客戶導入</small>", "RobiThrust<br><small>Application-level propulsion and system validation<br>推進系統與應用層驗證</small>"])}` + `<div class="notice"><strong>Terminology note｜名詞說明：</strong> RobiDev uses function-based product names rather than generation numbers. RobiDev Discrete and RobiDev High-Density describe different evaluation and design-in configurations; they do not correspond to Propulsion Gen.1, Gen.2, or Gen.3.<br>RobiDev 採用功能型產品名稱，不再以世代數字區分。RobiDev Discrete 與 RobiDev High-Density 代表不同的評估與 Design-in 配置，並非 Propulsion Gen.1、Gen.2 或 Gen.3 的無人機推進架構世代。</div>`, "tint")}
    ${section("Platform Comparison", "RobiDev Discrete vs High-Density", "不同評估任務，不同導入路徑<br>RobiDev Discrete provides a transparent reference implementation for early motor-control development and engineering validation. RobiDev High-Density extends the platform toward RobiSoC evaluation, compact integration, thermal review, and customer design-in.<br><br>RobiDev Discrete 提供便於觀察與比較的分離式參考實作；RobiDev High-Density 則將平台延伸至 RobiSoC 評估、高功率密度整合、熱路徑檢視與客戶 Design-in。", `
      <div class="table-wrap"><table><thead><tr><th>Comparison Item</th><th>RobiDev Discrete<br>Reference & Validation Platform</th><th>RobiDev High-Density<br>RobiSoC Evaluation & Design-in Platform</th></tr></thead><tbody>
      <tr><td>Positioning</td><td>Six-layer discrete reference and engineering-validation platform.</td><td>High-density RobiSoC / RC100 evaluation and customer design-in platform.</td></tr>
      <tr><td>Architecture</td><td>Total-discrete motor-drive implementation providing a visible and accessible reference baseline for architecture comparison.</td><td>Compact RobiSoC-based motor-drive architecture supporting higher integration density, interface review, protection, and thermal-path engineering.</td></tr>
      <tr><td>Best Use</td><td>Early BLDC / PMSM validation, firmware bring-up, controller development, engineering education, motor integration, and feasibility testing.</td><td>RC100 evaluation, compact power-stage integration, thermal review, M1 / G1 configuration assessment, and customer-specific design-in.</td></tr>
      <tr><td>Typical User</td><td>Universities, laboratories, MCU partners, firmware teams, engineering educators, and early-stage system developers.</td><td>Robotics, UAV, actuator, industrial-motion, and system-integration teams preparing for RobiSoC evaluation or design-in.</td></tr>
      <tr><td>Engineering Focus</td><td>Functional bring-up, signal observation, control development, parameter verification, and architecture learning.</td><td>Power density, board-space reduction, thermal path, protection integration, interfaces, and application-specific system constraints.</td></tr>
      <tr><td>Commercial Role</td><td>Entry reference platform for evaluation, education, engineering onboarding, and ecosystem development.</td><td>Engineering-reviewed evaluation platform supporting higher-value customer design-in and RobiSoC adoption.</td></tr>
      </tbody></table></div>
      <div class="grid two" style="margin-top:18px"><div class="callout"><span class="tag">Choose RobiDev Discrete When</span><p><strong>You need an accessible reference implementation for development, learning, comparison, or early validation.</strong><br>適合需要可觀察、可調整且便於工程比較的分離式參考平台。</p></div><div class="callout"><span class="tag">Choose RobiDev High-Density When</span><p><strong>You are evaluating RobiSoC or preparing a compact, thermally reviewed, customer-specific motor-drive design.</strong><br>適合準備導入 RobiSoC、小型化功率級與客戶專案 Design-in 的團隊。</p></div></div>
    `, "tint")}
    ${section("Why RobiDev", "From Development Board to Design-in Package", "從開發板走向可導入客戶的驗證平台", cards([
      {title:"Motor Integration",text:"Supports BLDC / PMSM drive evaluation and early application matching for robotics, UAV, actuator, and motion-control systems."},
      {title:"Thermal Review",text:"Helps correlate power stage, thermal path, and system behavior, reducing the gap between simulation and real hardware validation."},
      {title:"Control Flexibility",text:"Supports controller evaluation, interface review, firmware bring-up, and M1 / G1 related validation paths."},
      {title:"Design-in Readiness",text:"Provides a concrete entry point for customers and partners to move from concept discussion to measurable platform evaluation."}
    ], "four"))}
    ${section("Workflow", "Validation Workflow", "建議驗證流程", flow(["1. Bring-up<br><small>power-on, interface check, firmware start-up</small>", "2. Motor Match<br><small>BLDC / PMSM integration and control tuning</small>", "3. Thermal Review<br><small>temperature rise, hotspot, thermal-path observation</small>", "4. Dynamic Load<br><small>dynamic test, measurement correlation, system behavior</small>", "5. Design-in Report<br><small>evaluation summary and next-step recommendation</small>"]), "tint")}
    ${section("Target Users", "Who Should Use RobiDev?", "誰適合使用 RobiDev？", cards([
      {title:"System Customers",text:"Robotics, UAV, AMR / AGV, actuator, and motion-system teams evaluating motor-drive solutions before formal design-in."},
      {title:"MCU / Control Partners",text:"MCU ecosystem partners and control-board teams exploring validation, reference design, and application-specific collaboration."},
      {title:"Universities & Labs",text:"Ideal for power-electronics labs, education kits, motor-control research, and board-to-system measurement studies."},
      {title:"Developers & Integrators",text:"Useful for developers who need a practical evaluation platform before committing to a customer-specific system design."}
    ], "four"))}
    ${section("RobiDev + RobiLab", "From Platform to Measurable Validation", "從平台走向可量測驗證", `<div class="callout"><p>RobiDev becomes more valuable when combined with RobiLab measurement capability. Customers and partners can move from board evaluation to temperature-rise review, dynamic-load observation, and design-in recommendation.<br><br>RobiDev 與 RobiLab 搭配時，價值更完整。客戶與夥伴可從 board evaluation，延伸到溫升檢視、動態負載觀察與 design-in 建議。</p><p><strong>Recommended packaging:</strong> evaluation board + measurement support + application review. This is especially useful for early-stage system customers, MCU partners, education programs, and robotics / UAV validation projects.<br>建議對外包裝方式：evaluation board + measurement support + application review，特別適合早期系統客戶、MCU 夥伴、教育計畫與機器人 / 無人機驗證專案。</p></div>`, "tint")}
    ${section("Start Your Evaluation", "Start Your RobiDev Evaluation", "開始您的 RobiDev 採購與技術評估<br>Tell us about your application, motor, operating voltage, target power, control interface, expected quantity, and schedule. RobiChip will review whether a standard kit or custom configuration is more appropriate.<br><br>請提供應用情境、馬達型號、操作電壓、目標功率、控制介面、預計數量與期望交期。羅比芯將協助判斷適合標準套件或客製組態。", `<div class="field-list">${["Application","Motor Model","DC Bus Voltage","Target Power","Control Interface","Quantity","Required Schedule"].map((item)=>`<span>${item}</span>`).join("")}</div><div class="actions">${link("mailto:bd@robichip.com?subject=RobiDev%20Purchase%20and%20Evaluation%20Request","Request a Quote","btn primary")}${link("mailto:bd@robichip.com?subject=RobiDev%20Custom%20Configuration%20Discussion","Discuss Custom Configuration","btn")}${link("mailto:contact@robichip.com?subject=RobiDev%20Technical%20Inquiry","Ask a Technical Question","btn")}</div><div class="notice">Current commercial process: requirement submission → engineering review → configuration confirmation → formal quotation → PO / payment → build, validation, and delivery.<br>目前流程：提交需求 → 工程初審 → 確認組態 → 正式報價 → PO／付款 → 製作、驗證與交付。</div>`, "tint")}`;

  const robithrustPage = () => `
    ${hero({
      eyebrow:"RobiThrust",
      title:"UAV Propulsion Validation Platform",
      zh:"無人機高推力密度推進系統驗證平台",
      lead:"RobiThrust integrates RobiDev, motor, propeller, fixture, thrust measurement, and thermal observation into a practical UAV propulsion validation platform for early motor-drive evaluation and customer pilot projects.",
      sublead:"RobiThrust 整合 RobiDev、馬達、槳、測試治具、推力量測與熱觀察，形成可用於早期馬達驅動評估與客戶 pilot 專案的無人機推進系統驗證平台。",
      image:"/assets/images/robithrust-platform.png",
      caption:"RobiThrust UAV propulsion validation platform",
      actions:[{href:"/partnership",label:"Plan a validation project"},{href:"/technology-insights/robithrust-ecx32-test-observation",label:"Read ECX-32 note"}]
    })}
    ${section("RobiThrust-Heavy", "Heavy UAV Propulsion Test Platform with Dynamometer", "RobiThrust-Heavy 在 RobiThrust 推進驗證平台上加入動力計 / 扭力負載模組，可支援較重負載的無人機推進測試、扭力－電流－溫度對應，以及未來 XL Series 的驗證路線。<br><br>RobiThrust-Heavy extends the RobiThrust validation platform with a dynamometer / torque-load module, enabling heavier-load UAV propulsion testing, torque-current-temperature mapping, and future XL Series validation.", `<div class="callout"><span class="tag">Heavy / XL validation path</span><h3>From thrust-only benches to torque-load system evidence</h3><p>RobiThrust-Heavy adds a practical route for heavier-load UAV propulsion, torque-current-temperature mapping, and application-level validation planning.</p></div>`, "tint")}
    ${section("Architecture Evolution", "Evolution of UAV Propulsion Architecture", "無人機推進架構的世代演進<br>RobiChip framework illustrates the transition from discrete ESC, motor, and propeller configurations to integrated modules, and toward semiconductor-defined propulsion.<br><br>羅比芯提出無人機推進架構的三代演進框架：從 ESC、馬達與螺旋槳分離的傳統架構，逐步走向整合模組與半導體定義推進系統。", cards([
      {tag:"Gen.1",title:"Discrete ESC, Motor & Propeller",text:"ESC, motor, and propeller are selected, connected, and validated separately. This accessible baseline keeps the electrical and thermal path long, and requires more wiring and integration effort."},
      {tag:"Gen.2",title:"Integrated Module",text:"Drive electronics and motor move into a more compact modular architecture, reducing size and wiring while retaining only partial electrical and mechanical integration."},
      {tag:"Gen.3",title:"Semiconductor-Defined Propulsion",text:"A Power SoC-centered architecture connects power, sensing, control, protection, thermal design, motor, and propeller in one measurable, repeatable validation platform.<br><br>以 Power SoC 為功率智慧核心，串接功率、感測、控制、保護、熱管理、馬達與螺旋槳，形成可量測且可重複驗證的推進平台。"}
    ]), "tint")}
    ${section("Bench Evidence", "RobiThrust-X Test Bench Video", "RobiThrust 推進測試影片<br>EVT bench validation with RobiDev Discrete for thrust, RPM, input power, and thermal observation. 使用 RobiDev Discrete 進行推力、RPM、輸入功率與熱觀察的 EVT 台架驗證。", `<div class="video-frame"><iframe src="https://www.youtube.com/embed/x4YBwamLpcc" title="RobiThrust-X Test Bench Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`, "tint")}
    ${section("Validation Platforms", "RobiThrust Product Family", "RobiThrust-miniE(ECX-32) · RobiThrust-P(ECX-42) · RobiThrust-X(RUM3848)", cards([
      {tag:"mini-E",title:"RobiThrust-miniE (ECX-32)",text:"Light-UAV propulsion validation path and ECX-32 technical-insight reference.",href:"/technology-insights/robithrust-ecx32-test-observation",link:"Read Technical Insight"},
      {tag:"P Series",title:"RobiThrust-P (ECX-42)",text:"Maxon ECX-42 Flat based propulsion validation direction and report track."},
      {tag:"X Series",title:"RobiThrust-X (RUM3848)",text:"EVT bench validation for thrust, RPM, input power, and thermal observation."},
      {tag:"Heavy / XL",title:"RobiThrust-Heavy",text:"Dynamometer and torque-load direction for heavier UAV propulsion and future XL validation."}
    ], "four"))}
    ${section("Validation Packages", "Choose Your RobiThrust Validation Platform", "Select the validation entry point that matches your motor, propeller, power range, and engineering decision.", cards([
      {tag:"Base Validation Kit",title:"Early Propulsion Evaluation",text:"For universities, UAV startups, engineering teams, and early propulsion evaluation. Establish a measurable baseline for motor, propeller, drive, and operating condition.",href:"mailto:bd@robichip.com?subject=RobiThrust%20Base%20Validation%20Kit",link:"Request Base Validation Kit"},
      {tag:"Integration Bundle",title:"RobiDev / RobiSoC Design-in",text:"For motor-driver architecture, drive matching, and customer design-in. Combine RobiThrust with RobiDev or RobiSoC to review power, interface, thermal path, and application constraints.",href:"mailto:bd@robichip.com?subject=RobiThrust%20Integration%20Bundle",link:"Configure Integration Bundle"},
      {tag:"Heavy Development Platform",title:"X / XL Validation",text:"For larger propellers, higher power, and torque-heavy UAV feasibility. Extend thrust-only testing with heavy-load and dynamometer planning.",href:"mailto:bd@robichip.com?subject=RobiThrust%20Heavy%20Development%20Platform",link:"Plan Heavy Development Platform"}
    ], "three"), "tint")}
    ${section("Product Resources", "Product Introduction Deck & Validation Reports", "Product Introduction Deck｜RobiThrust 產品介紹簡報<br>無人機三合一高推力密度系統 RobiThrust -E/P/X/XL", cards([
      {title:"mini-E Series Technical Insight",text:"Maxon ECX-32 technology insight / validation note.",href:"/technology-insights/robithrust-ecx32-test-observation",link:"Read note"},
      {title:"P Series Validation Report",text:"RTrst_Exp002_Thrust Test_Maxon ECX42-Flat. Detailed report access is handled through technical discussion."},
      {title:"Design-in Discussion",text:"Discuss a propulsion target, motor, propeller, bus voltage, test condition, or application requirement.",href:"/partnership",link:"Discuss RobiThrust"}
    ]), "tint")}`;

  const robitorquePage = () => `
    ${hero({
      eyebrow:"RobiTorque",
      title:"Robotics Actuator Validation Platform",
      zh:"機器人致動器驗證平台",
      lead:"RobiTorque is RobiChip’s planned robotics actuator validation platform for joint motors, servo modules, and high-torque-density smart motion systems.",
      sublead:"RobiTorque 是羅比芯規劃中的機器人致動器驗證平台，面向關節馬達、伺服模組與高扭力密度智慧動力系統。",
      metrics:[["Joint Motor","Servo Module"],["Torque Density","Thermal Path"],["RobiDev","RobiLab"]],
      actions:[{href:BD,label:"Discuss Actuator Pilot"},{href:"/robidev",label:"Start with RobiDev"}]
    })}
    ${section("Why RobiTorque", "Torque Density Becomes the Next System Bottleneck", "扭力密度是機器人致動器的下一個瓶頸<br>Robotics actuators are constrained by torque density, module volume, thermal path, control integration, and reliability under dynamic load.<br><br>機器人致動器的瓶頸不只在馬達或控制演算法，而在扭力密度、模組體積、熱路徑、控制整合與動態負載下的可靠度。", cards([
      {tag:"Torque Density",title:"Higher Torque in Smaller Modules",text:"更小體積中的更高扭力<br><br>Robotics joints and servo modules need compact high-power-density drive solutions to reduce actuator size and integration friction."},
      {tag:"Thermal Path",title:"Package-to-Structure Heat Flow",text:"從封裝到結構的熱路徑<br><br>Heat must move from power stage and package into the mechanical structure without compromising reliability or control behavior."},
      {tag:"Control Layer",title:"FOC / Encoder / CANBus / RS-485",text:"控制介面與韌體整合<br><br>Actuator systems require configurable control interfaces, position feedback, current sensing, and application-specific control firmware."},
      {tag:"Validation",title:"Dynamic Load and T-N Curve",text:"動態負載與扭力轉速曲線<br><br>RobiTorque should move actuator discussion from datasheet assumptions to measurable dynamic-load and thermal validation."}
    ], "four"), "tint")}
    ${section("RobiTorque Demo Kits", "Elbow and Knee Actuator Demonstration Platforms", "肘關節與膝關節性能展示平台<br>RobiTorque demo-kit panels illustrate actuator structure, test modes, monitored parameters, dimensions, and interchangeable components for elbow and knee validation concepts.<br><br>RobiTorque 展示面板呈現肘關節與膝關節驗證概念的致動器結構、測試模式、即時監控參數、尺寸與可更換配件。", `<div class="demo-kit-gallery"><figure class="demo-kit-card"><img src="assets/images/robitorque-elbow-demo-kit.png" alt="RobiTorque-Elbow Demo Kit performance and validation panel" loading="lazy"><figcaption><strong>RobiTorque-Elbow Demo Kit</strong><span>肘關節性能展示平台</span></figcaption></figure><figure class="demo-kit-card"><img src="assets/images/robitorque-knee-demo-kit.png" alt="RobiTorque-Knee Demo Kit performance and validation panel" loading="lazy"><figcaption><strong>RobiTorque-Knee Demo Kit</strong><span>膝關節性能展示平台</span></figcaption></figure></div>`, "tint")}
    ${section("Validation Tracks", "Robotics Actuator Validation Tracks", "機器人致動器驗證方向<br>RobiTorque can be organized into validation tracks for joint actuators, servo modules, compact motion systems, and future dexterous-hand actuation.<br><br>RobiTorque 可依驗證方向整理為關節致動器、伺服模組、緊湊型運動系統，以及未來靈巧手致動方向。", cards([
      {tag:"RobiTorque-J",title:"Joint Actuator Validation",text:"關節致動器驗證<br><br>For robot joints, humanoid joints, robot dogs, and compact actuator modules requiring torque density, thermal-path review, and control integration."},
      {tag:"RobiTorque-S",title:"Servo Module Validation",text:"伺服模組驗證<br><br>For industrial servo, AMR / AGV motion, gimbal, and automation nodes requiring compact drive electronics and measurable system behavior."},
      {tag:"RobiTorque-G",title:"Gimbal / Compact Motion",text:"雲台與小型運動控制<br><br>For gimbal, pan-tilt, camera-stabilization, and compact robotic motion systems where smooth control and thermal stability are critical."},
      {tag:"RobiGrip Roadmap",title:"Dexterous Hand Actuation",text:"靈巧手與緊湊致動路線<br><br>Future compact actuation roadmap for dexterous-hand or small-form-factor robotic motion, linked to RobiGrip and lower-power RobiSoC directions."}
    ], "four") + `<p class="public-note">Public positioning: RobiTorque is currently a planned actuator validation platform and pilot collaboration track. Detailed configurations will depend on motor type, gear ratio, torque range, control interface, encoder feedback, mechanical structure, and thermal requirements.<br><br>對外定位：RobiTorque 目前為規劃中的致動器驗證平台與 pilot 合作方向。詳細組態將依馬達類型、減速比、扭力範圍、控制介面、encoder feedback、機構結構與熱需求而定。</p>`)}
    ${section("RobiDev + RobiLab", "From Motor Drive Evaluation to Actuator Validation", "從馬達驅動評估到致動器驗證<br>RobiDev provides the early motor-drive evaluation platform, while RobiLab supports dynamic-load, T-N curve, temperature-rise, and board-to-system validation.<br><br>RobiDev 提供早期馬達驅動評估平台，RobiLab 則支援動態負載、T-N curve、溫升與 board-to-system validation。", `<h3 class="subsection-title">RobiTorque Validation Flow｜RobiTorque 驗證流程</h3>${flow(["1. Requirement<br><small>torque, speed, voltage, interface</small>","2. Motor Drive<br><small>RobiDev bring-up and control review</small>","3. Dynamic Load<br><small>T-N curve, load profile, torque behavior</small>","4. Thermal Review<br><small>driver, motor, structure heat path</small>","5. Design-in Path<br><small>RobiSoC RC25 / RC50 / RC75 / RC100 mapping</small>"])}<p class="public-note">Recommended first pilot: use RobiDev Gen.1 and RobiLab measurement to validate motor-drive behavior, torque-speed behavior, thermal response, and control interface before committing to RobiSoC customization.<br><br>建議第一個 pilot：先使用 RobiDev Gen.1 與 RobiLab 量測能力，驗證馬達驅動行為、扭力轉速行為、熱反應與控制介面，再進一步評估 RobiSoC 客製化導入。</p>`, "tint")}
    ${section("Design-in Path", "From Actuator Pilot to RobiSoC Design-in", "從致動器 pilot 走向 RobiSoC design-in<br>RobiTorque is designed to help customers validate actuator requirements first, then map the system into the appropriate RobiSoC power class and control-layer strategy.<br><br>RobiTorque 的目標是先協助客戶驗證致動器需求，再將系統映射到合適的 RobiSoC 功率等級與控制層策略。", cards([
      {tag:"RC25",title:"Compact Actuation",text:"小型致動與教育平台<br><br>Suitable for compact motion, small actuators, education kits, and lower-power robotic modules."},
      {tag:"RC50",title:"Mid-power Servo",text:"中功率伺服與關節模組<br><br>Suitable for servo modules, AMR / AGV motion, gimbal, and mid-power robotic actuation."},
      {tag:"RC75",title:"High-dynamic Actuator",text:"高動態致動器<br><br>Suitable for high-dynamic joints, industrial motion, and higher torque-density robotic modules."},
      {tag:"RC100",title:"1000 W-class Indicator",text:"高功率密度指標模組<br><br>Suitable for high-power-density joint actuator validation, advanced thermal-path review, and RobiSoC design-in discussion."}
    ], "four"), "tint")}
    ${section("Start a Pilot Discussion", "Validate Your Next Robotics Actuator", "開始你的下一個機器人致動器驗證<br>RobiTorque is available for pilot discussion, actuator validation planning, MCU / control-board collaboration, and RobiSoC design-in alignment.<br><br>RobiTorque 可用於 pilot 討論、致動器驗證規劃、MCU / 控制板合作，以及 RobiSoC design-in 對位。", `<div class="actions">${link(BD,"bd@robichip.com","btn primary")}${link(CONTACT,"contact@robichip.com","btn")}${link("/robidev","RobiDev","btn")}${link("/robisoc","RobiSoC","btn")}${link("/partnership","Partnership","btn")}</div><p class="public-note">Detailed actuator configuration, torque range, gear ratio, control interface, mechanical structure, and validation support require technical discussion before pilot definition.<br><br>詳細致動器組態、扭力範圍、減速比、控制介面、機構結構與驗證支援，需在 pilot 定義前先進行技術討論。</p>`, "tint")}`;


  const robiagentPage = () => `
    ${hero({
      eyebrow:"RobiAgent",
      title:"AI-assisted Engineering Workflow",
      zh:"AI 輔助工程導入流程",
      lead:"RobiAgent helps customers move from technical questions to thermal pre-check, layout support, validation data review, and RobiSoC / RobiDev design-in decisions.",
      sublead:"RobiAgent 協助客戶從技術問題查詢，進一步走向熱預評估、layout 支援、驗證資料檢視，以及 RobiSoC / RobiDev 的 design-in 決策。",
      metrics:[["RobiGPT","Guided Q&A"],["RobiFlux","Thermal Pre-check"],["RobiLayout","Engineer-reviewed"]],
      actions:[{href:BD,label:"Request Engineering Review"},{href:"https://robigpt-webapp-26642801715.asia-east1.run.app/",label:"Try RobiGPT (early access)"},{href:"/robidev",label:"Start with RobiDev"}]
    })}
    ${section("Early Access Notice", "Available by Pilot Discussion & Engineering Review", "RobiAgent services are currently provided on a <strong>pilot / engineering-review basis</strong>. Please contact RobiChip to discuss project scope, data requirements, NDA needs, review depth, and expected deliverables.<br><br>RobiAgent 目前採 <strong>pilot / engineering-review</strong> 方式提供服務。請與羅比芯聯繫，以確認專案範圍、資料需求、NDA 需求、審查深度與交付內容。", `<div class="actions">${link(BD,"Request Pilot Discussion","btn primary")}${link(CONTACT,"General Inquiry","btn")}</div>`, "tint")}
    ${section("What RobiAgent Does", "From Query to Engineering Decision", "從技術查詢走向工程決策<br>RobiAgent is not just a chatbot. It is RobiChip’s AI-assisted engineering workflow that connects technical query, thermal pre-check, layout support, validation data, and design-in recommendations.<br><br>RobiAgent 不只是聊天機器人，而是羅比芯的 AI 輔助工程流程，串接技術查詢、熱預評估、layout 支援、驗證資料與 design-in 建議。", `<h3 class="subsection-title">RobiAgent Engineering Path｜RobiAgent 工程導入路徑</h3>${flow(["1. Technical Query<br><small>RobiGPT guided Q&A</small>","2. Thermal Pre-check<br><small>RobiFlux power / heat path review</small>","3. Layout Support<br><small>RobiLayout board-level review</small>","4. Design-in Decision<br><small>report, recommendation, next action</small>"])}`, "tint")}
    ${section("Service Modules", "RobiGPT / RobiFlux / RobiLayout", "三個 AI 輔助工程服務模組<br>RobiAgent starts with three engineering service modules: knowledge query, thermal and power pre-check, and aluminum substrate re-layout support.<br><br>RobiAgent 先以三個工程服務模組啟動：知識查詢、熱與功率預評估，以及單層鋁基板 re-layout 支援。", cards([
      {tag:"RobiGPT",title:"Engineering Knowledge Query",text:"工程知識查詢與文件導覽<br><br>RobiGPT provides guided engineering Q&A for RobiSoC, RobiDev, RobiThrust, RobiTorque, thermal path, validation workflow, and design-in preparation.<br><br>Technical Q&A · Document-assisted engineering support · Design-in preparation · Product navigation and explanation"},
      {tag:"RobiFlux",title:"Thermal & Power Pre-check",text:"熱與功率預評估<br><br>RobiFlux supports early thermal and power feasibility review, helping customers understand heat path, package-to-board behavior, board-level constraints, and system-level cooling direction.<br><br>Thermal path pre-check · Power density review · Board-level constraint discussion · System cooling direction"},
      {tag:"RobiLayout",title:"Aluminum Substrate Re-layout Support",text:"單層鋁基板 re-layout 支援<br><br>RobiLayout supports RobiDev single-layer aluminum substrate re-layout review, including component placement, power path, thermal path, connector position, and manufacturability-oriented design guidance.<br><br>Single-layer aluminum substrate review · Component placement guidance · Power path and thermal path review · Engineer-reviewed layout support"}
    ]), "tint")}
    ${section("Platform Support", "RobiAgent Supports the Full RobiChip Platform", "RobiAgent 支援羅比芯完整平台導入<br>RobiAgent connects technical intake across RobiDev, RobiThrust, RobiTorque, RobiSoC, and partnership discussions.<br><br>RobiAgent 串接 RobiDev、RobiThrust、RobiTorque、RobiSoC 與合作洽談中的 technical intake。", cards([
      {tag:"RobiDev",title:"Layout and Bring-up Support",text:"Supports RobiDev Gen.1 aluminum substrate re-layout review, interface questions, bring-up preparation, and design-in documentation.<br><br>layout 與 bring-up 支援"},
      {tag:"RobiThrust",title:"Propulsion Validation Review",text:"Supports product-family interpretation, test report review, thermal observation, and propulsion validation package discussion.<br><br>推進驗證資料檢視"},
      {tag:"RobiTorque",title:"Actuator Pilot Planning",text:"Supports actuator requirement intake, torque-speed discussion, thermal-path planning, control-interface review, and pilot scope definition.<br><br>致動器 pilot 規劃"},
      {tag:"RobiSoC",title:"Design-in Pre-check",text:"Supports RC25 / RC50 / RC75 / RC100 mapping, M1 / M2 discussion, thermal feasibility, and early design-in recommendations.<br><br>Power SoC 導入預評估"}
    ], "four"))}
    ${section("Engineering Workflow", "From Technical Intake to Design-in Recommendation", "從技術需求收斂到 design-in 建議", flow(["1. Technical Inquiry<br><small>question, product, use case, constraint</small>","2. Data Intake<br><small>voltage, current, board, motor, thermal condition</small>","3. RobiGPT Query<br><small>document-assisted engineering Q&A</small>","4. RobiFlux Review<br><small>thermal / power feasibility pre-check</small>","5. RobiLayout Support<br><small>aluminum substrate re-layout review</small>","6. Engineering Output<br><small>summary, note, recommendation, next action</small>"]) + `<p class="public-note">RobiAgent is intended to accelerate technical discussion and engineering decision-making. It does not replace engineer review, DFM review, validation testing, or customer approval.<br>RobiAgent 用於加速技術討論與工程決策，不取代工程師審查、DFM review、驗證測試或客戶核准。</p>`, "tint")}
    ${section("Deliverables & Boundary", "Clear Outputs, Engineer-reviewed Boundary", "清楚產出，工程師審查邊界<br>RobiAgent delivers engineering summaries, pre-check notes, layout review notes, and design-in recommendations. Final decisions remain engineer-reviewed.<br><br>RobiAgent 產出工程摘要、預評估筆記、layout 檢視建議與 design-in 建議。最終決策仍需工程師審查。", cards([
      {tag:"RobiGPT Output",title:"Q&A Summary",text:"技術問答摘要<br><br>Structured response for product selection, technical questions, validation workflow, and design-in preparation."},
      {tag:"RobiFlux Output",title:"Thermal Pre-check Note",text:"熱預評估筆記<br><br>Early review of power density, heat path, thermal constraints, board behavior, and cooling direction."},
      {tag:"RobiLayout Output",title:"Layout Review Note",text:"layout 檢視建議<br><br>Review of aluminum substrate layout direction, component placement, power path, thermal path, and connector arrangement."},
      {tag:"Design-in Output",title:"Next-step Recommendation",text:"下一步導入建議<br><br>Suggested next action for RobiDev evaluation, RobiFlux review, RobiLayout support, RobiLab validation, or RobiSoC design-in."}
    ], "four") + `<div class="notice"><strong>Service boundary｜服務邊界：</strong> RobiAgent provides AI-assisted review and engineering support. Final layout release, thermal validation, DFM review, safety review, and customer approval remain subject to engineer review and project-specific agreement.<br>RobiAgent 提供 AI 輔助檢視與工程支援。最終 layout release、熱驗證、DFM review、安全檢視與客戶核准，仍需依工程師審查與專案協議執行。</div>`, "tint")}
    ${section("Start an Engineering Review", "Move Faster from Question to Design-in", "從問題查詢更快走向 design-in<br>Use RobiAgent to start a guided engineering review for RobiDev, RobiThrust, RobiTorque, RobiSoC, thermal feasibility, or aluminum substrate re-layout support.<br><br>你可以透過 RobiAgent 啟動 RobiDev、RobiThrust、RobiTorque、RobiSoC、熱可行性或單層鋁基板 re-layout 的工程檢視。", `<div class="actions">${link(BD,"bd@robichip.com","btn primary")}${link(CONTACT,"contact@robichip.com","btn")}${link("/robidev","RobiDev","btn")}${link("/robisoc","RobiSoC","btn")}${link("/partnership","Partnership","btn")}</div><p class="public-note">RobiAgent service scope, data requirements, NDA needs, engineering review depth, and deliverables will be defined by project.</p>`, "tint")}`;

  const robilabPage = () => `
    ${hero({
      eyebrow:'Measurement, Thermal & System Validation',
      title:'Measurement & System Validation Service',
      zh:'量測與系統驗證服務',
      lead:'RobiLab turns RobiDev, RobiThrust, RobiTorque, and RobiSoC validation into measurable data, engineering reports, and design-in decisions.',
      sublead:'RobiLab 將 RobiDev、RobiThrust、RobiTorque 與 RobiSoC 驗證轉化為可量測資料、工程報告與 design-in 決策。',
      image:'/assets/images/robilab-validation.png',
      caption:'RobiLab measurement and validation environment',
      actions:[{href:'mailto:bd@robichip.com?subject=RobiLab%20Validation%20Support',label:'Request Validation Support'},{href:'/robidev',label:'Start with RobiDev'}]
    })}
    ${section('Measurement Layer', 'The Measurement Layer of the RobiChip Platform', 'RobiLab is the physical measurement and validation service layer that connects early engineering assumptions, real data, and design-in recommendations.<br><br>RobiLab 是連接早期工程假設、真實量測資料與 design-in 建議的實體量測與驗證服務層。', cards([
      {title:'Electrical Measurement', text:'Voltage, current, input power, switching behavior, protection behavior, and efficiency under defined operating conditions.'},
      {title:'Motion & Load Measurement', text:'RPM, thrust, torque, dynamic load, duty cycle, and system behavior under representative conditions.'},
      {title:'Thermal & Dynamic Observation', text:'Temperature rise, dynamic-load response, torque-speed (T-N) curves, and board-to-system correlation.'},
      {title:'Engineering Evidence', text:'Reports that summarize test conditions, data, observations, limitations, and recommended next steps.'}
    ], 'four'), 'tint')}
    ${section('Service Packages', 'Measurement Packages, Not Generic Lab Rental', 'RobiLab packages measurement around an engineering decision, rather than offering an unstructured test-bench rental service.<br><br>RobiLab 以工程決策為核心規劃量測套件，而非提供沒有結構的通用實驗室租用。', cards([
      {tag:'Motor-drive Basic', title:'Bring-up & Board Behavior', text:'Voltage, current, RPM, temperature rise, board behavior, and bring-up observations for early motor-drive validation.'},
      {tag:'Propulsion', title:'Thrust & Efficiency', text:'Thrust, RPM, input power, gf/W, motor-driver matching, and thermal behavior for RobiThrust-style propulsion work.'},
      {tag:'Actuator', title:'Dynamic Load & T-N Curve', text:'Dynamic load, torque-speed behavior, temperature rise, and control-interface review for actuator and servo projects.'},
      {tag:'Thermal', title:'Physical Thermal Pre-check', text:'Hotspot observation, cooling direction, package-to-board contact, and board-to-system thermal behavior before deeper simulation or design release.'}
    ], 'four'))}
    ${section('Platform Support', 'Full RobiChip Platform Support', 'The same measurement language can follow a project from platform bring-up to customer pilot.', cards([
      {tag:'RobiDev', title:'Gen.1 Evaluation & Motor-drive Bring-up', text:'Electrical interface checks, motor-drive bring-up, current and temperature observation, and board-level validation.'},
      {tag:'RobiThrust', title:'Propulsion Measurement', text:'Static thrust, RPM, input power, efficiency, motor-driver matching, and propulsion thermal observation.'},
      {tag:'RobiTorque', title:'Actuator Pilot Validation', text:'Dynamic-load, torque-speed, thermal, and control-interface evidence for actuator pilot planning.'},
      {tag:'RobiAgent', title:'Pre-check to Measurement', text:'Use RobiAgent for technical intake and assumptions, then use RobiLab to measure the real operating condition.'}
    ], 'four'), 'tint')}
    ${section('Simulation to Measurement', 'Close the Loop Between Assumptions and Physical Evidence', 'RobiLab data supports boundary conditions, thermal assumptions, load profiles, and design optimization decisions. It does not replace CAE; it helps make CAE and design reviews more representative.<br><br>RobiLab 資料可支援邊界條件、熱假設、負載輪廓與設計最佳化決策；它不取代 CAE，而是讓 CAE 與設計審查更貼近真實條件。', `
      <div class="grid two">
        <div class="callout"><span class="tag">Measurement Data</span><h3>Organize the real operating point</h3><p>Structure voltage, current, RPM, thrust, torque, temperature, airflow, and load data around the defined test condition.</p></div>
        <div class="callout"><span class="tag">Engineering Review</span><h3>Refine the next design decision</h3><p>Review thermal contact resistance, convection assumptions, losses, cooling direction, and the DOE needed for design optimization.</p></div>
      </div>
      <div style="margin-top:22px">${flow(['Assumption & Target', 'RobiDev / System Bring-up', 'RobiLab Measurement', 'Data & Report', 'Design-in Decision'])}</div>
      <p class="public-note">A useful RobiLab engagement begins with a clear decision, a representative operating condition, and agreed evidence. Detailed test setups, raw data, and customer-specific findings are provided through project discussion and, where needed, NDA-controlled access.</p>
      <div class="actions">${link('mailto:bd@robichip.com?subject=RobiLab%20Measurement%20Plan','Request Validation Support','btn primary')}${link('/robidev','Start with RobiDev','btn')}${link('/partnership','Discuss Collaboration','btn')}</div>
    `, 'tint')}`;

  const insightsPage = () => `
    ${hero({
      eyebrow:"Technology Insights",
      title:"Engineering Notes for High-Power-Density Motion",
      zh:"高功率密度智慧動力平台的工程筆記",
      lead:"RobiChip Technology Insights shares public engineering notes on RobiThrust validation, Power SoC, RobiDev design-in workflows, motor-driver matching, thermal path, and advanced packaging considerations for intelligent machines.",
      sublead:"羅比芯技術洞察分享 RobiThrust 實測、Power SoC、RobiDev 導入流程、馬達與驅動匹配、熱路徑與先進封裝相關的公開工程筆記。",
      metrics:[["RobiThrust","Validation"],["Power SoC","Platform"],["Thermal Path","Engineering"]],
      actions:[{href:"/technology-insights/robithrust-ecx32-test-observation",label:"Read featured note"},{href:"/partnership",label:"Discuss Technical Collaboration"}]
    })}
    ${section("Featured Insight", "Published Engineering Note", "代表性技術實測文章<br>Featured Insight highlights one representative engineering note. This section does not need to be updated for every new article.<br><br>Featured Insight 建議只放一篇代表性文章，不需要每次新增文章都更動。日常更新請放在下方文章列表。", `<div class="callout"><span class="tag">Featured｜代表文章</span><h3>RobiThrust ECX-32 Test Observation</h3><p class="secondary-heading">從 Motor-Driver Matching 到續航力優化</p><p>This note uses maxon ECX32-Flat-UAV motor, APC 10x4.5MR propeller, and 16.8V input to evaluate thrust efficiency, current-to-thrust behavior, propulsion weight, thermal management, and endurance sensitivity.<br><br>本文以 maxon ECX32-Flat-UAV 馬達、APC 10x4.5MR 螺旋槳與 16.8V 輸入條件，評估推力效率、current-to-thrust、推進系統重量、熱管理與續航力敏感度。</p><div class="metric-row static-metrics"><div class="metric"><strong>+6.3%</strong><span>G2 average gf/W advantage in 3100 to 5600 rpm useful operating band</span></div><div class="metric"><strong>+7.8%</strong><span>G2 average gf/W advantage in 3100 to 4500 rpm low-speed band</span></div><div class="metric"><strong>ECX-32</strong><span>Light UAV motor-prop validation setup</span></div><div class="metric"><strong>A/B Flight</strong><span>Next validation step for real endurance comparison</span></div></div><div class="actions">${link("/technology-insights/robithrust-ecx32-test-observation","Read Full Report","btn primary")}${link("/robithrust","Explore RobiThrust","btn")}</div></div>`, "tint")}
    ${section("Insight Series", "Four Technical Tracks", "四個技術系列<br>Technology Insights is organized into technical tracks so readers can follow RobiChip platform logic from validation, Power SoC fundamentals, RobiDev design-in, to thermal path and packaging.<br><br>技術洞察將以系列方式整理，讓讀者從實測驗證、Power SoC 基礎、RobiDev 導入，逐步理解熱路徑與先進封裝的工程脈絡。", cards([
      {tag:"Validation Notes",title:"RobiThrust Validation Notes",text:"推進系統實測筆記<br><br>Bench testing, motor-driver matching, propeller selection, thrust efficiency, current-to-thrust behavior, and UAV propulsion validation."},
      {tag:"Power SoC",title:"Power SoC Fundamentals",text:"Power SoC 基礎觀點<br><br>Public engineering perspectives on high-power-density drive architecture, power integration, hybrid substrate, and silicon-to-system design."},
      {tag:"Design-in",title:"RobiDev Design-in Notes",text:"RobiDev 導入筆記<br><br>Evaluation workflow, electrical interface checks, firmware bring-up, thermal evaluation, dynamic load validation, and customer design-in preparation."},
      {tag:"Thermal Path",title:"Thermal Path & Packaging",text:"熱路徑與先進封裝<br><br>Notes on package-to-board, board-to-structure, airflow, thermal interface, reliability, and advanced packaging considerations."}
    ], "four"))}
    ${section("Latest Articles", "Latest Articles｜最新文章", "Published｜RobiThrust Validation Notes", cards([
      {tag:"Published",title:"RobiThrust ECX-32 Test Observation",text:"A bench-test observation using maxon ECX32-Flat-UAV motor, APC 10x4.5MR propeller, and 16.8V input to compare RobiDev G2, RobiDev G1, and a 70A-class commercial ESC baseline.<br><br>本文以 maxon ECX32-Flat-UAV 馬達、APC 10x4.5MR 螺旋槳與 16.8V 輸入條件，觀察 RobiDev G2、RobiDev G1 與 70A-class commercial ESC baseline 在 light UAV 工作區間的推力效率差異。",href:"/technology-insights/robithrust-ecx32-test-observation",link:"Read full report"},
      {tag:"Fundamentals",title:"Why Power Density Matters in Intelligent Machines",text:"How compact power conversion affects payload, thermal design, reliability, and motion performance.",href:"/technology-insights/why-power-density-matters",link:"View Insight"},
      {tag:"Workflow",title:"From RobiDev to Design-in Workflow",text:"How evaluation evidence becomes a customer-specific design-in package.",href:"/technology-insights/robidev-to-design-in",link:"View Insight"},
      {tag:"Validation",title:"Propulsion Validation as a Design-in Entry",text:"Validation as an entry path to propulsion, application evidence, and customer design-in.",href:"/technology-insights/propulsion-validation",link:"View Insight"}
    ], "four"), "tint")}
    ${section("Technical Access Policy", "Public Notes, Partner Discussion, NDA Materials", "公開筆記、夥伴討論與 NDA 技術資料分級<br>RobiChip shares public engineering perspectives through Technology Insights, while detailed specifications, raw data, design files, and partner-only materials are handled through official discussion and controlled access.<br><br>羅比芯透過 Technology Insights 分享公開工程觀點；詳細規格、原始測試資料、設計檔案與 partner-only 技術資料，則透過正式洽談與授權機制提供。", cards([
      {tag:"Public Notes",title:"Public Engineering Notes",text:"公開技術洞察<br><br>Public articles, validation observations, engineering perspectives, and application-level explanations."},
      {tag:"Partner Discussion",title:"Technical Alignment",text:"夥伴技術討論<br><br>Application requirements, test conditions, design-in direction, thermal path discussion, and feasibility review."},
      {tag:"NDA / Partner-only",title:"Controlled Materials",text:"NDA 或指定夥伴資料<br><br>Detailed specifications, raw validation data, design files, DFM or reliability discussion, and partner-only documents."}
    ]) + `<p class="public-note">Technology Insights is intended for public technical communication and early design-in education. It does not replace official datasheets, partner documents, engineering change notices, or NDA-controlled materials.<br>Technology Insights 用於公開技術溝通與早期 design-in 教育，不取代正式 datasheet、partner 文件、工程變更通知或 NDA 管制資料。</p><div class="actions">${link("/partnership","Discuss Technical Collaboration","btn primary")}${link("/robithrust","Explore RobiThrust","btn")}${link("/robidev","Explore RobiDev","btn")}</div>`, "tint")}`;

  const articles = {
    '/technology-insights/robithrust-ecx32-test-observation': {
      title:'From Motor-Driver Matching to Endurance Optimization',
      zh:'從 Motor-Driver Matching 到續航力優化：RobiThrust ECX-32 實測觀察',
      lead:'A RobiThrust engineering note comparing propulsion efficiency across a representative ECX-32 operating range.',
      sublead:'本文將量測結果視為工程觀察，用於理解馬達—驅動匹配、轉速區間與續航力優化方向。',
      metrics:[['+6.3%','G2 avg. gf/W'],['+7.8%','3100–4500 rpm'],['3100–5600','Observed rpm range']],
      body:`
        <span class="tag">RobiThrust Validation Note</span>
        <h2>Test Observation</h2>
        <p>The referenced RobiThrust ECX-32 dataset compares propulsion efficiency using grams-force per watt (gf/W) across a representative 3100–5600 rpm range. In this dataset, the G2 direction showed a +6.3% average gf/W advantage across the full range.</p>
        <div class="data-note"><strong>Observed result</strong><p>G2 average gf/W advantage: +6.3% at 3100–5600 rpm; +7.8% at 3100–4500 rpm.</p></div>
        <h2>Why Matching Matters</h2>
        <p>Propulsion efficiency is a system result. Motor winding, driver switching behavior, control tuning, propeller load, thermal state, voltage, and operating point all affect the final thrust-per-watt result.</p>
        <h2>Engineering Interpretation</h2>
        <p>The result suggests that driver choice and operating-range matching can influence endurance even when the motor and propeller are held constant. The lower-rpm range deserves special attention because many endurance-oriented missions spend substantial time below peak speed.</p>
        <h2>Validation Boundary</h2>
        <p>This is an engineering observation from a defined test configuration, not a universal product guarantee. Re-validation is required when motor, propeller, voltage, cooling, fixture, control settings, or duty cycle changes.</p>
        ${mediaPlaceholder('Original test plots placeholder', 'Export the ECX-32 charts from Google Sites and replace this block while retaining the stated test conditions and legends.')}`
    },
    '/technology-insights/why-power-density-matters': {
      title:'Why Power Density Matters in Intelligent Machines',
      zh:'為什麼智慧機器需要更高功率密度？',
      lead:'Power density changes more than board size. It affects payload, thermal architecture, wiring, motion performance, and the freedom to design the machine.',
      sublead:'高功率密度不是單一元件規格，而是智慧機器在體積、重量、散熱與可靠度限制下的系統能力。',
      metrics:[['W / volume','Density'],['Heat path','Constraint'],['System','Outcome']],
      body:`
        <h2>Power Electronics Occupy System Volume</h2>
        <p>In a UAV, robot joint, gimbal, AMR, or compact industrial-motion node, every gram and cubic centimeter competes with payload, battery, sensors, mechanics, and thermal structure.</p>
        <h2>Integration Changes the Thermal Problem</h2>
        <p>Higher integration shortens electrical paths and reduces board area, but it also concentrates loss. Package, substrate, PCB, interface material, structure, and airflow must be considered as one heat-flow path.</p>
        <h2>Power Density Enables Architecture Choices</h2>
        <p>When the power platform becomes smaller and more predictable, designers gain freedom to place electronics closer to the motor, simplify wiring, improve sensing, and create more modular machines.</p>
        <h2>Measurement Keeps Density Useful</h2>
        <p>Density without validation can move risk into temperature, reliability, EMI, or mechanical integration. RobiChip connects Power SoC development with RobiDev, RobiThrust, RobiTorque, and RobiLab evidence.</p>`
    },
    '/technology-insights/robidev-to-design-in': {
      title:'From RobiDev to Design-in Workflow',
      zh:'從 RobiDev 驗證到客戶導入流程',
      lead:'A design-in starts when evaluation evidence is organized around a customer decision, not when a demo board first spins a motor.',
      sublead:'RobiDev 將技術展示轉化為可追蹤的需求、量測、風險與客戶導入工作包。',
      metrics:[['1','Requirement map'],['2','Validation'],['3','Design-in']],
      body:`
        <h2>1. Define the Decision</h2><p>Clarify the target motor, voltage, current, duty cycle, control interface, environment, mechanical boundary, and the decision the test must support.</p>
        <h2>2. Establish the Baseline</h2><p>Use RobiDev to bring up the electrical path, control behavior, protection, interfaces, and representative operating points.</p>
        <h2>3. Observe the Thermal Path</h2><p>Measure the package-to-board-to-structure path under realistic duty cycles and document assumptions that affect repeatability.</p>
        <h2>4. Convert Results into a Package</h2><p>Summarize measured evidence, limitations, open risks, recommended configuration, layout/thermal guidance, and the next pilot milestone.</p>
        <div class="data-note"><strong>Design-in output</strong><p>A useful package makes the next engineering decision easier for the customer, RobiChip, and manufacturing partners.</p></div>`
    },
    '/technology-insights/propulsion-validation': {
      title:'Propulsion Validation as a Design-in Entry',
      zh:'以推進系統驗證作為 design-in 的起點',
      lead:'An application-level propulsion question can reveal the electrical, control, thermal, and packaging requirements that matter for semiconductor design-in.',
      sublead:'從可量測的推力、效率、溫升與動態負載問題出發，建立 Power SoC 導入的共同語言。',
      metrics:[['Thrust','Application'],['Data','Evidence'],['SoC','Design-in']],
      body:`
        <h2>Start with the Application</h2><p>Payload, endurance, thrust, motor and propeller choices provide a concrete system boundary that multiple engineering teams can discuss.</p>
        <h2>Measure the Cross-domain Effects</h2><p>RobiThrust connects input power, driver behavior, RPM, thrust, torque, efficiency, and temperature. The resulting map identifies where power silicon and packaging choices change system behavior.</p>
        <h2>Translate Evidence into Semiconductor Requirements</h2><p>The validation result can guide power class, device configuration, control integration, package/thermal requirements, and the scope of a customer-specific evaluation platform.</p>
        <h2>Move to Design-in</h2><p>RobiDev and RobiLab then deepen the evidence required for layout, firmware, DFM, reliability, pilot samples, and customer qualification.</p>`
    }
  };

  const articlePage = (article) => `
    ${hero({
      eyebrow:'Technology Insights',
      title:article.title,
      zh:article.zh,
      lead:article.lead,
      sublead:article.sublead,
      metrics:article.metrics,
      actions:[{href:'/technology-insights',label:'All Technology Insights'},{href:'/partnership',label:'Discuss Technical Collaboration'}]
    })}
    <section class="section tint"><div class="wrap article">${article.body}<div class="actions">${link('/robithrust','Explore RobiThrust','btn primary')}${link('/robidev','Explore RobiDev','btn')}${link('/partnership','Discuss Collaboration','btn')}</div><p class="public-note">This public engineering note is intended for technical communication and early design-in education. Detailed specifications, raw data, and project-specific recommendations require formal technical discussion or NDA-controlled access.</p></div></section>`;

  const newsPage = () => `
    ${hero({
      eyebrow:"News & Events",
      title:"RobiChip Updates, Milestones, and Industry Engagements",
      zh:"羅比芯活動消息、里程碑與產業交流",
      lead:"Follow RobiChip latest company updates, public showcases, technology milestones, industry forums, awards, and partnership activities across robotics, UAVs, Power SoC, and high-power-density motion systems.",
      sublead:"追蹤羅比芯在智慧機器人、無人機、Power SoC、高功率密度動力系統相關的公司動態、公開展示、技術里程碑、產業論壇、獎項與合作活動。",
      metrics:[["Company Updates","Milestones"],["Events","Showcases"],["Awards","Recognition"]],
      actions:[{href:"/news-events/2026-TAIROS",label:"View TAIROS 2026"},{href:"/partnership",label:"Discuss Partnership"}]
    })}
    ${section("Featured Event", "Upcoming Showcase", "近期重點展示活動<br>Featured Event highlights one representative public activity. General news updates are available in the latest news list below.<br><br>Featured Event 建議只放一個近期重點活動；一般活動消息請維護在下方活動消息列表。", `<div class="callout"><span class="tag">Upcoming｜近期活動</span><h3>TAIROS 2026 Showcase</h3><p class="secondary-heading">2026 台灣機器人與智慧自動化展</p><p>RobiChip plans to showcase its next-generation intelligent motion platform direction, connecting Power SoC, high-power-density drive validation, and robotics / UAV application scenarios.<br><br>羅比芯將展示次世代智慧動力平台方向，連結 Power SoC、高功率密度驅動驗證，以及機器人與無人機應用情境。</p><div class="metric-row static-metrics"><div class="metric"><strong>Power SoC</strong><span>High-power-density intelligent motion platform</span></div><div class="metric"><strong>RobiThrust</strong><span>UAV propulsion and motor-driver validation</span></div><div class="metric"><strong>Robotics</strong><span>Motion control and actuator system opportunities</span></div><div class="metric"><strong>Partners</strong><span>System, packaging, material, and application partners</span></div></div><div class="actions">${link("/news-events/2026-TAIROS","Read Event Update","btn primary")}${link("/partnership","Discuss Partnership","btn")}</div></div>`, "tint")}
    ${section("News Categories", "What We Share", "活動消息分類<br>News & Events is organized around RobiChip external milestones: exhibitions, technology partnerships, awards, public talks, and company updates.<br><br>活動消息頁面聚焦羅比芯對外里程碑：展會展示、技術合作、獎項肯定、公開演講與公司更新。", cards([
      {tag:"Showcase",title:"Exhibitions & Demo",text:"展會與技術展示<br><br>Public showcases of RobiSoC, RobiThrust, RobiDev, and intelligent motion platform demos."},
      {tag:"Partnership",title:"Strategic Collaboration",text:"策略合作與 MOU<br><br>Partnership updates with material, packaging, system, robotics, UAV, and industrial partners."},
      {tag:"Recognition",title:"Awards & Programs",text:"獎項與計畫參與<br><br>Awards, innovation programs, startup showcases, and public recognition related to RobiChip platform."},
      {tag:"Forum",title:"Talks & Industry Forums",text:"演講與產業論壇<br><br>Public talks and forum participation on Physical AI, robotics, UAVs, and high-power-density motion."}
    ], "four"))}
    ${section("Newsroom", "Latest News & Events", "最新活動消息<br>Follow RobiChip company updates, public showcases, technology milestones, strategic partnerships, and industry engagements.<br><br>掌握羅比芯的公司動態、公開展示、技術里程碑、策略合作與產業交流。", cards([
      {tag:"2026 AUG 19 · Upcoming · Exhibition · Taipei",title:"TAIROS 2026",text:"台灣機器人與智慧自動化展<br><br>RobiChip will showcase its next-generation intelligent-motion platform direction for robotics, UAVs, and high-power-density drive applications.<br><br>羅比芯將展示面向機器人、無人機與高功率密度驅動應用的下一代智慧動力平台方向。",href:"/news-events/2026-TAIROS",link:"View Event Details"},
      {tag:"2026 JUL 31 · Accepted Speaker · SEMICON Taiwan",title:"RobiChip Selected to Speak at SEMICON Taiwan 2026",text:"羅比芯獲選為 SEMICON Taiwan 2026 Silicon Startups Stage 講者<br><br>RobiChip will present Semiconductor-Defined Motion: High-Power-Density Motor Drive Modules for Robotics and UAVs at the Silicon Startups Stage.<br><br>羅比芯將於 Silicon Startups Stage 分享半導體定義動力平台，連結高功率密度馬達驅動、機器人與無人機應用。",href:"/news-events/semicon-taiwan-2026",link:"View Event Details"},
      {tag:"2026.07.02 · Forum",title:"Leading 2026",text:"臺中無人載具產業與海外商機論壇<br><br>RobiChip joined the forum to share perspectives on Physical AI, UAV propulsion, and high-power-density motion platforms.<br><br>羅比芯於論壇中分享 Physical AI、無人機推進與高功率密度智慧動力平台的產業觀點。",href:"/news-events/taichung-unmanned-vehicle-forum",link:"Read Forum Highlights"},
      {tag:"2026.06.02 · Showcase",title:"COMPUTEX InnoVEX 2026",text:"InnoVEX 新創展示牆<br><br>RobiChip was selected for the InnoVEX showcase wall, presenting RobiSoC, RobiThrust, and its intelligent-power platform roadmap.<br><br>羅比芯入選 COMPUTEX InnoVEX 展示牆，展示 RobiSoC、RobiThrust 與智慧動力平台發展方向。",href:"/news-events/2026-computex-innovex",link:"View Showcase"},
      {tag:"2026.05.14 · Partnership",title:"Swancor × RobiChip",text:"策略技術合作備忘錄簽署<br><br>RobiChip and Swancor Holding signed a strategic technology MOU focused on advanced packaging materials, thermal engineering, robotics, and high-power-density motion systems.<br><br>羅比芯與上緯投控啟動策略合作，聚焦先進封裝材料、熱管理、機器人與高功率密度動力系統。",href:"/news-events/swancor-tech-mou",link:"Explore the Partnership"},
      {tag:"2026.04.25 · Award",title:"2026 Best AI Awards",text:"IC 設計新創及中小企業組佳作<br><br>RobiChip received recognition for its high-power-density Power SoC platform for intelligent robotics and UAV motion-control applications.<br><br>羅比芯以智慧機器人與無人機動力控制 Power SoC 平台，獲得 IC 設計類別肯定。",href:"/news-events/news-events-best-AI-Awards",link:"Read Award Story"}
    ], "three") + `<p class="public-note">RobiChip news and event pages document public activities, technology milestones, partnerships, and industry engagement. 羅比芯活動頁面記錄公開展示、技術進展、合作里程碑與產業交流。</p>`, "tint")}
    ${section("Media & Partnership", "Connect with RobiChip", "媒體、活動與合作洽詢<br>For media inquiries, event invitations, technical collaboration, or partnership discussions, please contact RobiChip through the official partnership channel.<br><br>若有媒體採訪、活動邀約、技術合作或策略夥伴洽談需求，歡迎透過官方合作管道與羅比芯聯繫。", `<div class="actions">${link("/partnership","Partnership Inquiry","btn primary")}${link(BD,"bd@robichip.com","btn")}${link(CONTACT,"contact@robichip.com","btn")}</div><p class="public-note">Public website content is for general information only. Detailed technical specifications, raw validation data, and partner-only materials may require official discussion or NDA.</p>`, "tint")}`;

  const events = {
    '/news-events/2026-TAIROS': {
      title:'Automation Taipei / TAIROS 2026', zh:'智慧自動化與機器人展現場驗證展示',
      lead:'See RobiChip’s Power SoC and intelligent-motion validation direction with ecosystem partners in Taipei.',
      sublead:'現場交流 Power SoC、RobiThrust 推進驗證、RobiTorque 致動器方向與 design-in workflow。',
      tag:'2026 Technology Showcase', metrics:[['Aug 19–22','2026'],['Q210','TaiNEX 2'],['K012','TaiNEX 1']],
      meta:['Aug 19–22, 2026','Swancor booth Q210 · 1F TaiNEX 2','Maxon booth K012 · 1F TaiNEX 1'],
      body:'<h2>Live Validation</h2><p>RobiChip will present its semiconductor-defined intelligent-motion direction through practical platform and partner demonstrations.</p><h2>What to Discuss</h2><p>Power density, UAV propulsion validation, robot actuator integration, thermal-path design, developer platforms, and customer design-in.</p>',
      placeholder:'TAIROS exhibition photo placeholder'
    },
    '/news-events/semicon-taiwan-2026': {
      title:'SEMICON Taiwan 2026', zh:'從功率半導體到智慧機器平台的技術發表',
      lead:'RobiChip is an accepted speaker and exhibitor at SEMICON Taiwan 2026.',
      sublead:'以 Power SoC、先進封裝熱管理與智慧運動驗證連結半導體與機器人應用。',
      tag:'Accepted Speaker', metrics:[['Sep 2–4','2026'],['T9404','7F TaiNEX 2'],['Sep 4 · 14:00','Presentation']],
      meta:['Sep 2–4, 2026','Booth T9404 · 7F TaiNEX 2','Presentation · Sep 4, 14:00'],
      body:'<h2>Semiconductor-Defined Motion</h2><p>The presentation and showcase connect high-power-density Power SoC, packaging and thermal paths, evaluation platforms, and application-level validation.</p><h2>Meet the Team</h2><p>Discuss semiconductor, packaging, materials, thermal, robotics, UAV, manufacturing, and investment collaboration.</p>',
      placeholder:'SEMICON Taiwan speaker / booth image placeholder'
    },
    '/news-events/news-events-best-AI-Awards': {
      title:'2026 Best AI Awards', zh:'羅比芯 2026 Best AI Awards 動態',
      lead:'RobiChip’s AI-assisted engineering and intelligent-machine platform direction was recognized in the 2026 program.',
      sublead:'RobiAgent 串接平台知識、熱預評估、layout review、驗證資料與 design-in 決策。',
      tag:'Award', metrics:[['Apr 25','2026'],['AI + Power','Platform'],['RobiAgent','Workflow']],
      meta:['April 25, 2026','Best AI Awards'],
      body:'<h2>AI-Assisted Engineering</h2><p>RobiChip applies AI as an engineering workflow layer around Power SoC platform knowledge and measurable validation evidence.</p>',
      placeholder:'Best AI Awards image placeholder'
    },
    '/news-events/swancor-tech-mou': {
      title:'Swancor × RobiChip Strategic Collaboration', zh:'上緯投控 × 羅比芯策略合作',
      lead:'Public record of the May 14 strategic collaboration event between Swancor Holding and RobiChip Technology.',
      sublead:'5 月 14 日上緯投控與羅比芯科技策略合作活動公開影片紀錄。',
      tag:'Strategic Collaboration', metrics:[['May 14','2026'],['MOU','Partnership'],['Ecosystem','Scale']],
      meta:['May 14, 2026','Strategic collaboration event'],
      body:'<h2>From Technology Validation to Ecosystem Scale</h2><p>The collaboration connects intelligent-machine power platforms with materials, manufacturing, market, and ecosystem capabilities.</p>',
      video:'https://www.youtube.com/embed/RFt6A4kOUUs'
    },
    '/news-events/2026-computex-innovex': {
      title:'COMPUTEX InnoVEX 2026', zh:'羅比芯新創與智慧機器平台展示',
      lead:'RobiChip presents its Power SoC and intelligent-machine platform direction to the global technology and startup ecosystem.',
      sublead:'以半導體定義智慧動力連結新創、產業夥伴與國際市場。',
      tag:'Technology Showcase', metrics:[['2026','Taipei'],['InnoVEX','Startup'],['Power SoC','Platform']],
      body:'<h2>Platform Story</h2><p>RobiSoC, RobiDev, RobiThrust, RobiTorque, RobiAgent, and RobiLab form a connected path from component innovation to application validation.</p>',
      placeholder:'COMPUTEX InnoVEX image placeholder'
    },
    '/news-events/taichung-unmanned-vehicle-forum': {
      title:'Taichung Unmanned Vehicle Industry Forum', zh:'臺中無人載具產業論壇',
      lead:'Industry dialogue around unmanned systems, propulsion, power electronics, validation, and ecosystem collaboration.',
      sublead:'聚焦無人載具、推進系統、功率電子、驗證與產業鏈合作。',
      tag:'Industry Forum', metrics:[['2026','Taichung'],['UAV','Industry'],['Validation','Dialogue']],
      body:'<h2>Engineering Meets the Ecosystem</h2><p>RobiChip shares how measurable propulsion and power-platform validation can create a practical entry point for unmanned-vehicle collaboration.</p>',
      placeholder:'Forum event image placeholder'
    }
  };

  const eventPage = (event) => `
    ${hero({
      eyebrow:event.tag || 'News & Events',
      title:event.title,
      zh:event.zh,
      lead:event.lead,
      sublead:event.sublead,
      metrics:event.metrics,
      actions:[{href:'/news-events',label:'All News & Events'},{href:'/partnership',label:'Discuss Partnership'}]
    })}
    ${section('Event Details', event.title, event.meta ? event.meta.join(' · ') : '', `<div class="article">${event.body || ''}${event.video ? `<div class="video-frame"><iframe src="${event.video}" title="${esc(event.title)} video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>` : ''}${event.placeholder ? mediaPlaceholder(event.placeholder, 'Source event media remains to be supplied from the Google Sites archive.') : ''}<div class="actions">${link('/news-events','All News & Events','btn primary')}${link('/partnership','Discuss Collaboration','btn')}</div></div>`, 'tint')}`;

  const partnershipPage = () => `
    ${hero({
      eyebrow:"Partnership",
      title:"Build the Smart Motion Platform Together",
      zh:"與羅比芯共同打造智慧動力平台",
      lead:"RobiChip partners with system companies, MCU and control-board vendors, packaging and material partners, universities, and developer ecosystems to accelerate high-power-density smart motion platforms from validation to design-in readiness.",
      sublead:"羅比芯與系統廠、MCU 與控制板夥伴、封裝材料夥伴、學研單位與開發者生態合作，將高功率密度智慧動力平台從驗證推進到客戶導入準備。",
      metrics:[["RobiSoC","Custom Control"],["RobiDev","RobiLab"],["RobiThrust","Packaging / Materials"]],
      actions:[{href:BD,label:"Start Partnership Discussion"},{href:"/robisoc",label:"Explore RobiSoC"}]
    })}
    ${section("Ecosystem Partner Tracks", "Four Ecosystem Collaboration Tracks", "四種生態系合作模式<br>RobiChip ecosystem partnerships are organized around four complementary layers: system and application validation, configurable control, packaging and thermal engineering, and developer ecosystem expansion.<br><br>羅比芯的生態系合作聚焦四個互補層次：系統與應用驗證、可配置控制層、封裝與熱工程，以及教育與開發者生態。", cards([
      {tag:"System & Application Partners",title:"Robotics / UAV / Motion Systems",text:"機器人、無人機與智慧運動系統廠<br><br>For robotics, UAV, AMR / AGV, gimbal, actuator, industrial automation, and intelligent-machine companies evaluating compact, high-power-density motor-drive and propulsion platforms.<br><br><strong>Recommended first step:</strong> Start with RobiDev Discrete or High-Density for motor-drive evaluation, or combine RobiDev with RobiThrust for propulsion and application-level validation.",href:"/robidev",link:"Explore RobiDev Platforms"},
      {tag:"MCU & Control Partners",title:"MCU & Control Board Collaboration",text:"MCU、控制器與控制板合作<br><br>For MCU vendors, motor-control IC companies, embedded-control partners, firmware teams, and controller suppliers exploring configurable control-layer or co-developed board solutions.<br><br><strong>Recommended first step:</strong> Use RobiDev Discrete as a transparent reference baseline, then move toward customer-specific controller integration or RobiDev High-Density co-development.",href:"mailto:bd@robichip.com?subject=MCU%20and%20Control%20Board%20Collaboration",link:"Discuss Control Collaboration"},
      {tag:"Packaging & Thermal Partners",title:"Packaging / Materials / Thermal",text:"封裝、材料、散熱與可靠度夥伴<br><br>For OSAT, substrate, high-power module, thermal-material, cooling, and reliability partners supporting DFM, qualification, pilot production, thermal-path optimization, and manufacturing scale-up.<br><br><strong>Recommended first step:</strong> Use RobiDev High-Density, RobiSoC samples, and RobiThrust system evidence to align electrical, thermal, mechanical, and package-to-system requirements.",href:"mailto:bd@robichip.com?subject=Packaging%20Materials%20and%20Thermal%20Collaboration",link:"Discuss Packaging Collaboration"},
      {tag:"Education & Developer Partners",title:"Education & Developer Ecosystem",text:"教育、研究與開發者生態<br><br>For universities, laboratories, research teams, developer communities, and education platforms building motor-control, power-electronics, robotics, and UAV validation courses or workshops.<br><br><strong>Recommended first step:</strong> Use RobiDev Discrete as an accessible reference and engineering-validation platform for teaching, firmware development, and laboratory exercises.",href:"mailto:contact@robichip.com?subject=RobiDev%20Education%20and%20Developer%20Ecosystem%20Inquiry",link:"Education Partnership Inquiry"}
    ], "four") + `<div class="notice"><strong>Recommended entry path｜建議導入路徑：</strong> RobiDev Discrete can serve as the reference baseline for early motor-control development. RobiDev High-Density supports RobiSoC evaluation and design-in, while the RobiThrust + RobiDev Integration Bundle extends validation to UAV propulsion and application-level performance.<br>RobiDev Discrete 可作為早期馬達控制開發的參考基準；RobiDev High-Density 支援 RobiSoC 評估與 Design-in；RobiThrust + RobiDev Integration Bundle 則進一步延伸至無人機推進與應用層性能驗證。</div>`, "tint")}
    ${section("Strategic Customer Program", "Turn Your Control Know-How into Customer-Specific Silicon", "將控制技術與應用 know-how 轉化為客戶專屬的動力半導體平台<br>RobiChip works with robotics, industrial automation, servo and motion-control, and intelligent-machine companies to integrate proprietary control intelligence into a customer-specific RobiSoC or RobiSoC-based module.<br><br>羅比芯可與機器人、工業自動化、伺服與運動控制及智慧設備廠商合作，將客戶自有的控制演算法、韌體、通訊介面、保護邏輯與應用經驗，整合至客戶專屬的 RobiSoC 或 RobiSoC-based module。", cards([
      {tag:"01",title:"Customer IP Integration",text:"客戶控制技術與專屬 IP 整合<br><br>Control algorithms and firmware · Proprietary communication interfaces · Sensing and protection logic · Application-specific control behavior"},
      {tag:"02",title:"Custom RobiSoC Architecture",text:"客戶專屬 RobiSoC 與模組架構<br><br>MCU and controller configuration · Power-stage and voltage-current range · Custom interfaces and I/O · Package and thermal architecture"},
      {tag:"03",title:"Confidential Engineering Validation",text:"NDA 下的工程樣品與驗證<br><br>RobiDev engineering evaluation · Motor and actuator matching · Power and thermal validation · Application-level test environment"},
      {tag:"04",title:"NRE to Production Supply",text:"從客製開發到後續產品供應<br><br>Feasibility and architecture review · NRE and engineering development · Pilot samples and qualification · Future SoC or module production supply"}
    ], "four") + `<h3 class="subsection-title">IP & Collaboration Framework</h3><p class="public-note">Protect each party technology while defining how joint improvements can be commercialized.<br>合作初期即透過 NDA、技術範圍與 IP 邊界確認，清楚區分客戶既有技術、羅比芯平台技術及共同開發成果。</p>${flow(["Confidential Discussion","NDA & IP Boundary","Feasibility Review","Architecture & NRE","Engineering Sample","Pilot & Production"])}<div class="actions">${link("mailto:bd@robichip.com?subject=Confidential%20Custom%20RobiSoC%20Feasibility%20Review","Request Confidential Feasibility Review","btn primary")}${link("mailto:bd@robichip.com?subject=Custom%20RobiSoC%20Co-Development%20Discussion","Discuss a Custom RobiSoC","btn")}</div>`, "tint")}
    ${section("Public Collaboration Evidence", "Swancor × RobiChip Strategic Collaboration", "上緯投控 × 羅比芯公開策略合作案例<br>RobiChip has publicly initiated a strategic collaboration with Swancor Holding, focusing on advanced packaging materials, thermal solutions, and high-power-density motion systems for next-generation intelligent machines.<br><br>羅比芯已與上緯投控公開啟動策略合作，聚焦先進封裝材料、散熱解決方案，以及面向次世代智慧機器的高功率密度動力系統。", `<div class="grid two"><div class="callout"><span class="tag">Public MOU｜公開合作紀錄</span><h3>Advanced Packaging Materials for High-Power-Density Motion</h3><p>此合作連結上緯在材料與散熱解決方案上的優勢，以及羅比芯在 Power SoC、Hybrid Substrate、系統驗證與智慧動力平台上的技術方向。</p><div class="actions">${link("/news-events/swancor-tech-mou","View News & Events","btn primary")}${link("/robisoc","Explore RobiSoC","btn")}</div></div><div class="video-frame"><iframe src="https://www.youtube.com/embed/RFt6A4kOUUs" title="Swancor and RobiChip strategic collaboration video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></div><p class="public-note">This public collaboration reference is intended to show RobiChip packaging and material partnership direction. It should not be interpreted as an exclusive production agreement, final product qualification, or completed volume manufacturing commitment.<br>本公開合作案例用於說明羅比芯的封裝與材料合作方向；不應解讀為排他性量產協議、最終產品認證或已完成量產承諾。</p>`, "tint")}
    ${section("M2 Custom Control Layer", "MCU & Control Board Collaboration", "MCU 與控制板客製化合作<br>RobiSoC supports a configurable control-layer strategy. The M1 baseline uses an STM32G4x-series motor-control MCU for early validation, while M2 enables project-based custom controller and firmware integration for MCU partners, system customers, education platforms, and application-specific reference designs.<br><br>RobiSoC 支援可配置控制層策略。M1 baseline 採用 STM32G4x-series 馬達控制 MCU 進行早期驗證；M2 則支援專案型客製化控制器與韌體整合。", cards([{tag:"M1 Baseline",title:"Standard Validation Path",text:"標準驗證路徑：early validation, firmware bring-up, motor-control evaluation, and RobiDev / RobiLab measurement workflow."},{tag:"M2 Custom",title:"Custom Controller Option",text:"客製化控制器選項：MCU partner evaluation, custom control-board variants, firmware integration, toolchain alignment, and reference design collaboration."},{tag:"Interface",title:"Application-specific I/O",text:"應用別控制介面：CANBus, RS-485, UART, SPI, PWM, encoder feedback, current sensing, and host-control integration."},{tag:"Reference Design",title:"Co-developed Demo Platform",text:"共同開發示範平台：education kits, actuator reference designs, UAV / gimbal motor-control demos, or selected customer design-in pilots."}], "four"), "tint")}
    ${section("Packaging & Materials Partners", "From Prototype Validation to Manufacturable Packaging Platform", "從原型驗證走向可製造的封裝平台<br>RobiChip seeks packaging, substrate, material, and thermal partners to support RobiSoC DFM, reliability validation, pilot samples, and future volume-readiness.<br><br>羅比芯尋求封裝、基板、材料與散熱夥伴，共同推進 RobiSoC 的 DFM、可靠度驗證、pilot sample 與未來量產準備。", cards([{tag:"DFM",title:"Design for Manufacturing",text:"Hybrid substrate process rules, thermal interface specification, die attach, interconnect, and layout manufacturability."},{tag:"Reliability",title:"Reliability Validation",text:"Thermal cycling, power cycling, mechanical stress, vibration, failure analysis, and package-to-system validation."},{tag:"Pilot",title:"Pilot Production",text:"Sample lots, process window, yield learning, qualification planning, and production-readiness review."},{tag:"Scale-up",title:"Future Volume Readiness",text:"Preferred production framework, cost reduction, capacity alignment, and high-power-density packaging standardization."}], "four") + `<p class="public-note">Partnership positioning: RobiChip is not looking for a vendor-only relationship. We seek co-development partners who can help define the packaging and thermal path for robotics and UAV high-power-density Power SoC modules.<br>合作定位：羅比芯不是只尋找代工報價，而是尋找能共同定義機器人與無人機高功率密度 Power SoC 封裝與熱路徑的 co-development partner。</p>`, "tint")}
    ${section("Collaboration Path", "From First Discussion to Joint Validation", "從初步討論到共同驗證<br>Partnership should move through clear, verifiable outputs rather than staying at slide exchange. Each stage should define scope, owner, validation method, and next decision point.<br><br>合作不應停留在交換簡報，而應逐步形成可驗證產出。每個階段都應定義 scope、owner、validation method 與下一個決策點。", `${flow(["Mutual Understanding<br><small>company / roadmap exchange</small>","Technical Alignment<br><small>interface, power stage, thermal path</small>","Pilot Definition<br><small>kit, actuator, UAV, packaging scope</small>","Joint Validation<br><small>RobiLab measurement, thermal test</small>","Go-to-market Option<br><small>demo, co-branding, design-in</small>"])}<div class="grid three" style="margin-top:20px"><div class="callout"><h3>Public Materials</h3><p>Website pages, public technology notes, high-level product descriptions, public event materials, and non-confidential partnership introduction.</p></div><div class="callout"><h3>NDA Materials</h3><p>Detailed datasheets, raw validation data, design files, DFM discussions, pilot planning, partner-specific technical reviews, and sample exchange details.</p></div><div class="callout"><h3>Joint Improvements</h3><p>DFM rules, control-board variants, package improvements, process windows, reference designs, field-of-use, ownership, license, and publication terms should be defined under JDA / SCA / pilot MOU.</p></div></div>`, "tint")}
    ${section("Start a Discussion", "Let’s Define the First Pilot Together", "讓我們一起定義第一個合作 pilot<br>Whether you are a system company, MCU partner, packaging / material partner, university lab, or developer ecosystem partner, the best next step is to define one clear technical pilot with scope, owner, validation method, and timeline.<br><br>無論你是系統廠、MCU 夥伴、封裝材料夥伴、學研實驗室或開發者生態夥伴，最好的下一步是定義一個清楚的 technical pilot：scope、owner、驗證方法與時程。", `<div class="actions">${link(BD,"bd@robichip.com","btn primary")}${link(CONTACT,"contact@robichip.com","btn")}${link("/robisoc","RobiSoC","btn")}${link("/technology-insights","Technology Insights","btn")}</div><p class="public-note">Detailed technical materials, sample exchange, DFM review, and partner-specific discussions may require NDA.</p>`, "tint")}`;

  const legacyJoinPage = () => `
    ${hero({eyebrow:"Join RobiChip",title:"Build the Power Platform for Intelligent Machines",zh:"加入羅比芯，一起打造智慧機器的動力平台",lead:"RobiChip is building a high-power-density smart motion platform for robotics, drones, actuators, and next-generation intelligent machines.",sublead:"羅比芯正在打造面向機器人、無人機、致動器與下一代智慧機器的高功率密度智慧動力平台。",metrics:[["Power SoC","Robotics"],["UAV","Thermal Architecture"],["RobiLab","RobiAgent"]],actions:[{href:CONTACT,label:"Contact RobiChip"},{href:BD,label:"Project / Partnership Inquiry"}]})}
    ${section("Why Join RobiChip","Work on the Hardest Part of Intelligent Machines","投入智慧機器最難、也最關鍵的動力瓶頸<br>The next bottleneck in robotics and UAV systems is not only control algorithm. It is power integration, thermal path, packaging, validation, and manufacturability.<br><br>機器人與無人機的下一個瓶頸，不只是控制演算法，而是功率整合、熱路徑、封裝、驗證與可製造性。",cards([{tag:"Deep Tech",title:"Power SoC + Thermal Architecture",text:"功率晶片與熱架構：high-power-density integration across chip, board, package, and system heat path."},{tag:"Real Machines",title:"Robotics and UAV Applications",text:"機器人與無人機應用：technology connecting drones, actuators, robot joints, servo modules, and smart motion systems."},{tag:"Validation",title:"Measure, Calibrate, Improve",text:"量測、校準、改善：turn engineering assumptions into measured data through RobiDev, RobiLab, RobiThrust, and RobiTorque workflows."},{tag:"Startup",title:"Build from 0 to 1",text:"從 0 到 1 建構平台：a small team where architecture, product, validation, customer feedback, and partnerships are tightly connected."}],"four"),"tint")}
    ${section("Who We Are Looking For","Builders Across Chip, Power, Thermal, AI, and Systems","尋找能跨晶片、電力、熱、AI 與系統的人才<br>We welcome full-time candidates, senior advisors, project collaborators, research partners, and students who want to work on real power-system challenges.<br><br>我們歡迎全職候選人、資深顧問、專案合作夥伴、研究合作單位，以及想投入真實動力系統問題的學生。",cards([{tag:"Engineering Core",title:"IC / Power Electronics / Motor Drive",text:"晶片、電力電子與馬達驅動<br><br>Power IC / power electronics · BLDC / PMSM control · Gate driver / sensing / protection · PCB / module design and bring-up"},{tag:"Thermal & Validation",title:"Thermal / Packaging / RobiLab",text:"熱管理、封裝與量測驗證<br><br>Thermal architecture · Packaging / DFM / reliability · Dynamic load and T-N curve · Measurement and report workflow"},{tag:"System & AI",title:"Robotics / UAV / RobiAgent",text:"機器人、無人機與 AI 輔助工程<br><br>Robotics actuator / UAV propulsion · AI-assisted engineering workflow · Simulation / CAE / DOE · Customer pilot and field feedback"}]),"tint")}
    ${section("Open Collaboration Tracks","Multiple Ways to Work with RobiChip","多種方式與羅比芯一起合作<br>We are building a focused team and ecosystem. Some roles may be full-time, while others may begin as advisor, project, internship, or research collaboration.<br><br>我們正在建立精實團隊與生態系。有些角色會是全職，有些則可能從顧問、專案、實習或研究合作開始。",cards([{title:"Full-time Core Team",text:"全職核心團隊：RobiSoC, RobiDev, RobiLab, RobiAgent, RobiThrust, and RobiTorque roadmap."},{title:"Technical Advisor",text:"技術顧問：power electronics, packaging, robotics, UAV, thermal simulation, DFM, reliability, or manufacturing."},{title:"Project Collaboration",text:"專案型合作：validation, layout, RobiAgent, RobiLab, RobiThrust, RobiTorque, or customer pilot projects."},{title:"Internship / Student Project",text:"實習與學生專題：motor control, thermal measurement, robotics validation, AI tools, or engineering documentation."},{title:"Research / Lab Collaboration",text:"研究與實驗室合作：power electronics, thermal management, UAV propulsion, or robotic actuators."}],"three")+`<div class="notice"><strong>Current status｜目前狀態：</strong> RobiChip is open to talent discussions, project-based collaboration, internship proposals, and advisor conversations. Specific openings, compensation, scope, NDA, and schedule will be discussed case by case.<br>羅比芯開放人才洽談、專案合作、實習提案與顧問討論。具體職缺、報酬、合作範圍、NDA 與時程，將依個案討論。</div>`,"tint")}
    ${section("What You Will Build","From Architecture to Real Machine Validation","從架構設計走到真實機器驗證",`${flow(["RobiSoC<br><small>Power SoC + hybrid substrate platform</small>","RobiDev<br><small>driver board and design-in support</small>","RobiLab<br><small>measurement, thermal and system validation</small>","RobiAgent<br><small>AI-assisted engineering workflow</small>","RobiThrust<br><small>UAV propulsion validation platform</small>","RobiTorque<br><small>robotics actuator validation roadmap</small>"])}<p class="public-note">RobiChip is building a platform where chip design, thermal path, motor drive, measurement data, AI-assisted engineering, and customer design-in are connected in one execution loop.<br>羅比芯正在建立一個平台，將晶片設計、熱路徑、馬達驅動、量測資料、AI 輔助工程與客戶導入串成同一個執行閉環。</p>`,"tint")}
    ${section("How We Work","Small Team, Real Data, Fast Learning","小團隊、真實數據、快速學習<br>RobiChip is a deep-tech startup. We value people who can move between theory, implementation, measurement, customer feedback, and business reality.<br><br>羅比芯是 deep-tech 新創。我們重視能在理論、實作、量測、客戶回饋與商業現實之間快速切換的人。",cards([{tag:"Evidence-first",title:"Measure Before Overclaiming",text:"先量測，再主張：real test data, clear assumptions, and engineering reports over vague claims."},{tag:"System Thinking",title:"Chip to System",text:"從晶片到系統：connect silicon, package, board, thermal path, motor, fixture, and customer use case."},{tag:"Ownership",title:"Build and Close the Loop",text:"主動推進並完成閉環：define a problem, run experiments, document results, and drive next actions."},{tag:"Integrity",title:"Clear Boundary, Clear Promise",text:"清楚邊界，清楚承諾：careful about claims, IP boundaries, customer confidentiality, and partner commitments."}],"four"))}
    ${section("Students & Young Engineers","Learn by Building Real Power Systems","用真實動力系統學習工程<br>RobiChip welcomes students and young engineers who want to learn from real measurement, motor control, thermal validation, AI-assisted engineering, and customer-facing product development.<br><br>羅比芯歡迎想從真實量測、馬達控制、熱驗證、AI 輔助工程與客戶導向產品開發中學習的學生與年輕工程師。",cards([{tag:"Power Electronics",title:"Motor Drive & Measurement",text:"馬達驅動與量測：voltage, current, RPM, thrust, torque, temperature, and system-level measurement through RobiDev and RobiLab."},{tag:"AI Engineering",title:"RobiAgent Workflow",text:"AI 輔助工程流程：engineering knowledge, technical documents, thermal pre-checks, layout review notes, and design-in workflows."},{tag:"Robotics / UAV",title:"Application Validation",text:"應用驗證：RobiThrust, RobiTorque, robotics actuator, UAV propulsion, and smart motion validation projects."}],"three"),"tint")}
    ${section("Join Us","Apply, Collaborate, or Start a Talent Conversation","投遞職缺、提出合作，或開啟人才洽談<br>Official job openings are listed on 104 Job Bank. For advisor, project collaboration, internship, research collaboration, or roles not listed on 104, please contact RobiChip directly.<br><br>正式職缺請以 104 人力銀行公告為準。若您有技術顧問、專案合作、實習、研究合作，或目前 104 尚未列出的合作想法，歡迎直接與羅比芯聯繫。",`<div class="actions">${link("https://www.104.com.tw/company/1a2x6bnk3q#info06","Apply via 104","btn primary")}${link(CONTACT,"Send Profile by Email","btn")}${link(BD,"Project / Advisor Inquiry","btn")}${link("/robisoc","RobiSoC","btn")}${link("/robilab","RobiLab","btn")}</div><p class="public-note"><strong>Suggested email subject：</strong> Join RobiChip｜Full-time / Advisor / Project / Internship / Research Collaboration. Please include your resume or profile, portfolio or project links if available, and a short note on your area of interest.<br><strong>建議信件主旨：</strong> Join RobiChip｜全職 / 顧問 / 專案 / 實習 / 研究合作。請附上履歷或個人簡介、作品集或專案連結，並簡短說明感興趣的方向。</p>`,"tint")}`;

  const joinPage = () => sourceRoute('/assets/source/join-us.html?v=frozen-reference-v5');

  const privacyPage = () => `
    ${hero({eyebrow:'Privacy',title:'Privacy Policy',zh:'隱私權政策',lead:'This page is retained from the Google Sites information architecture as a migration-ready policy location.',sublead:'正式上線前請由羅比芯確認最終隱私權條款、資料處理範圍與第三方服務揭露。',actions:[{href:CONTACT,label:'Privacy inquiry'}]})}
    <section class="section tint"><div class="wrap article">
      <div class="notice">Migration placeholder: this policy must be reviewed and approved before the GitHub-hosted site becomes the production website.</div>
      <h2>Website Data</h2><p>The website may process basic technical request data, analytics data, and information voluntarily submitted through contact or embedded third-party tools.</p>
      <h2>Third-party Services</h2><p>The site includes Google Analytics and an Elfsight AI chatbot widget. Their operation may be governed by their respective terms and privacy policies.</p>
      <h2>Contact</h2><p>Questions may be directed to <a href="mailto:contact@robichip.com">contact@robichip.com</a>.</p>
    </div></section>`;

  const legacyPage = () => `
    ${hero({eyebrow:'Migration Archive',title:'Legacy Draft Page',zh:'Google Sites 隱藏草稿頁面',lead:'This URL existed as a hidden draft or working page in the Google Sites editor.',sublead:'It is intentionally excluded from navigation and search indexing until its original purpose and content are reviewed.',actions:[{href:'/',label:'Return home'}]})}`;

  const notFoundPage = () => `
    ${hero({eyebrow:'404',title:'Page Not Found',zh:'找不到此頁面',lead:'The requested page is not part of the migrated public website.',sublead:'Please use the navigation or return to the homepage.',actions:[{href:'/',label:'Return home'},{href:CONTACT,label:'Contact RobiChip'}]})}`;

  const routeTable = {
    '/': {title:'Power SoC Platform for Intelligent Machines', render:() => sourceRoute('/assets/source/home.html?v=frozen-reference-v1', 'home'), reference:true},
    '/首頁': {title:'Power SoC Platform for Intelligent Machines', render:() => sourceRoute('/assets/source/home.html?v=frozen-reference-v1', 'home'), reference:true},
    '/robisoc': {title:'RobiSoC', render:() => sourceRoute('/assets/source/robisoc.html?v=frozen-reference-v7', 'robisoc'), reference:true},
    '/robidev': {title:'RobiDev', render:() => sourceRoute('/assets/source/robidev.html?v=frozen-reference-v1', 'robidev'), reference:true},
    '/robithrust': {title:'RobiThrust', render:() => sourceRoute('/assets/source/robithrust.html?v=frozen-reference-v1', 'robithrust'), reference:true},
    '/robitorque': {title:'RobiTorque', render:() => sourceRoute('/assets/source/robitorque.html?v=frozen-reference-v1', 'robitorque'), reference:true},
    '/technology-insights': {title:'Technology Insights', render:() => sourceRoute('/assets/source/technology-insights.html?v=frozen-reference-v1'), reference:true},
    '/robiagent': {title:'RobiAgent', render:() => sourceRoute('/assets/source/robiagent.html?v=frozen-reference-v1', 'robiagent'), reference:true},
    '/robilab': {title:'RobiLab', render:() => sourceRoute('/assets/source/robilab.html?v=frozen-reference-v1', 'robilab'), reference:true},
    '/news-events': {title:'News & Events', render:() => sourceRoute('/assets/source/news-events.html?v=frozen-reference-v1'), reference:true},
    '/partnership': {title:'Partnership', render:() => sourceRoute('/assets/source/partnership.html?v=frozen-reference-v1'), reference:true},
    '/join-us': {title:'Join Us', render:joinPage, reference:true},
    '/privacy-policy': {title:'Page Not Found', render:sourceMissingPage, reference:true, noindex:true},
    '/private-policy': {title:'Private Policy', render:() => sourceRoute('/assets/source/private-policy.html?v=frozen-reference-v1'), reference:true, noindex:true}
  };

  Object.entries(articles).forEach(([route, article]) => {
    routeTable[route] = {title:article.title, render:() => articlePage(article)};
  });
  const documentReferences = {
    '/technology-insights/robithrust-ecx32-test-observation': {title:'從 Motor-Driver Matching 到續航⼒優化：RobiThrust ECX-32實測觀察', src:'https://drive.google.com/file/d/1EeVqOKub3fkCKRCAmzmA1yTm2LrVKl0x/preview', height:966},
    '/technology-insights/why-power-density-matters': {title:'Why Power Density Matters in Intelligent Machines', src:'https://drive.google.com/file/d/1vSJq93IdNxjGVCWNFRzujY9O09rrRxva/preview', height:1041},
    '/technology-insights/robidev-to-design-in': {title:'From RobiDev to Design-in Workflow', src:'https://drive.google.com/file/d/1LlMheDAlChFpM9BfL1ZnFtQwwERDsCKQ/preview', height:1034},
    '/technology-insights/propulsion-validation': {title:'Propulsion Validation as a Design-in Entry', src:'https://drive.google.com/file/d/1nZAuE8sv3D6H071XOdnupYjx-et-aElD/preview', height:1031}
  };
  Object.entries(documentReferences).forEach(([route, reference]) => {
    routeTable[route] = {title:reference.title, render:() => documentReferencePage(reference.src, reference.title, reference.height), reference:true};
  });
  Object.entries(events).forEach(([route, event]) => {
    routeTable[route] = {title:event.title, render:() => eventPage(event)};
  });
  routeTable['/news-events/2026-TAIROS'] = {title:events['/news-events/2026-TAIROS'].title, render:() => sourceRoute('/assets/source/news-2026-tairos.html?v=frozen-reference-v1', 'event-tairos'), reference:true};
  routeTable['/news-events/news-events-TaiChung-UAV'] = {title:'Taichung UAV Forum', render:() => sourceRoute('/assets/source/news-taichung-uav.html?v=frozen-reference-v1', 'event-taichung'), reference:true};
  routeTable['/news-events/news-events-best-AI-Awards'] = {title:events['/news-events/news-events-best-AI-Awards'].title, render:() => sourceRoute('/assets/source/news-best-ai-awards.html?v=frozen-reference-v1', 'event-awards'), reference:true};
  routeTable['/news-events/news-events-computex-InnoVEX'] = {title:'COMPUTEX InnoVEX', render:() => sourceRoute('/assets/source/news-computex-innovex.html?v=frozen-reference-v1', 'event-computex'), reference:true};
  routeTable['/news-events/news-events-swancor-MOU'] = {title:'Swancor × RobiChip', render:() => sourceRoute('/assets/source/news-swancor-mou.html?v=frozen-reference-v1', 'event-swancor'), reference:true};
  routeTable['/news-events/semicon-taiwan-2026'] = {title:'SEMICON Taiwan 2026', render:() => sourceRoute('/assets/source/news-semicon-taiwan-2026.html?v=frozen-reference-v1'), reference:true};
  ['/news-events/swancor-tech-mou','/news-events/2026-computex-innovex','/news-events/taichung-unmanned-vehicle-forum','/robigrip'].forEach((route) => {
    routeTable[route] = {title:'Page Not Found', render:sourceMissingPage, reference:true, noindex:true};
  });
  routeTable['/work'] = {title:'work', render:sourceBlankPage, reference:true, noindex:true};
  routeTable['/v1'] = {title:'v1', render:() => sourceRoute('/assets/source/v1.html?v=frozen-reference-v1'), reference:true, noindex:true};
  routeTable['/v2'] = {title:'V2', render:() => sourceRoute('/assets/source/v2.html?v=frozen-reference-v1'), reference:true, noindex:true};
  routeTable['/v3'] = {title:'v3', render:() => sourceRoute('/assets/source/v3.html?v=frozen-reference-v1'), reference:true, noindex:true};
  routeTable['/temp'] = {title:'temp', render:() => sourceRoute('/assets/source/temp.html?v=frozen-reference-v1'), reference:true, noindex:true};

  const nav = () => {
    const active = (route) => path === route || (route !== '/' && path.startsWith(`${route}/`)) ? ' active' : '';
    return `<header class="site-header">
      <div class="nav-shell">
        <a class="brand" href="/" aria-label="RobiChip home">
          <img src="/assets/images/robichip-logo.png" alt="RobiChip logo">
          <span>RobiChip<small>羅比芯科技</small></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation">☰</button>
        <nav class="nav-links" id="primary-nav" aria-label="Primary navigation">
          <a class="${active('/')}" href="/">首頁</a>
          <a class="${active('/robisoc')}" href="/robisoc">RobiSoC</a>
          <a class="${active('/robidev')}" href="/robidev">RobiDev</a>
          <a class="${active('/robithrust')}" href="/robithrust">RobiThrust 無人機</a>
          <a class="${active('/robitorque')}" href="/robitorque">RobiTorque 機器人</a>
          <details>
            <summary class="${active('/technology-insights')}">Technology Insights</summary>
            <div class="menu-panel">
              <a href="/technology-insights">All Technology Insights</a>
              <a href="/technology-insights/robithrust-ecx32-test-observation">RobiThrust ECX-32 Test Observation</a>
              <a href="/technology-insights/why-power-density-matters">Why Power Density Matters</a>
              <a href="/technology-insights/robidev-to-design-in">From RobiDev to Design-in</a>
              <a href="/technology-insights/propulsion-validation">Propulsion Validation as an Entry</a>
            </div>
          </details>
          <a class="${active('/robiagent')}" href="/robiagent">RobiAgent</a>
          <details>
            <summary>More</summary>
            <div class="menu-panel">
              <a href="/robilab">RobiLab</a>
              <a href="/news-events">News & Events</a>
              <a href="/partnership">Partnership</a>
              <a href="/join-us">Join Us</a>
            </div>
          </details>
        </nav>
      </div>
    </header>`;
  };

  const footer = () => `<footer class="site-footer">
    <div class="wrap footer-main">
      <div class="footer-brand">
        <h3>RobiChip Technology Co., Ltd.</h3>
        <p>羅比芯科技股份有限公司</p>
        <p>Power SoC platform for intelligent machines. RobiChip integrates Power SoC, RobiDev, RobiThrust, RobiAgent, and validation workflows for robotics, UAVs, and high-power-density motion systems.<br>羅比芯聚焦 Power + AI + Robotics，建構從 Power SoC、開發驗證、無人機推進平台到 AI-assisted design-in 的智慧動力半導體平台。</p>
        <p>National Taiwan University of Science and Technology, International Building 11F, Room 1105<br>No. 43, Sec. 4, Keelung Rd., Da’an Dist., Taipei City, Taiwan</p>
        <p>台北市大安區基隆路四段 43 號<br>國立臺灣科技大學 國際大樓 11F 1105 室</p>
      </div>
      <div><h3>Platforms</h3><div class="footer-list"><a href="/robisoc">RobiSoC</a><a href="/robidev">RobiDev</a><a href="/robithrust">RobiThrust</a><a href="/robitorque">RobiTorque</a><a href="/robiagent">RobiAgent</a></div></div>
      <div><h3>Resources</h3><div class="footer-list"><a href="/technology-insights">Technology Insights</a><a href="/news-events">News & Events</a><a href="/robilab">RobiLab Validation</a><a href="https://www.youtube.com/channel/UCqp-CDSVPCX8TfYT_aVScpg">YouTube</a></div></div>
      <div><h3>Contact</h3><div class="footer-list"><a href="/partnership">Partnership</a><a href="/partnership">Technical Discussion</a><a href="mailto:contact@robichip.com">contact@robichip.com</a><a href="mailto:bd@robichip.com">bd@robichip.com</a><a href="tel:+886277015728">+886-2-7701-5728</a><a href="/join-us">Join Us</a><a href="/privacy-policy">Privacy Policy</a></div></div>
    </div>
    <div class="wrap footer-bottom">
      <p>© 2026 RobiChip Technology Co., Ltd. All rights reserved.</p>
      <p>Public website content is for general information only. Product specifications, availability, and collaboration scope are subject to official release, NDA, and partner discussion.</p>
    </div>
  </footer>`;

  const route = routeTable[path];
  const page = route || {title:'Page Not Found', render:notFoundPage, noindex:true};
  document.title = `${page.title}｜RobiChip 羅比芯科技`;

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = ORIGIN + (path === '/首頁' ? '/' : path);
  if (page.noindex) {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
  }

  const structuredData = {
    '@context':'https://schema.org',
    '@type':'Organization',
    name:'RobiChip Technology Co., Ltd.',
    alternateName:'羅比芯科技股份有限公司',
    url:ORIGIN,
    email:'contact@robichip.com',
    telephone:'+886-2-7701-5728',
    address:{'@type':'PostalAddress',streetAddress:'No. 43, Sec. 4, Keelung Rd., International Building 11F, Room 1105',addressLocality:'Taipei City',addressCountry:'TW'}
  };
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify(structuredData);
  document.head.appendChild(ld);

  document.body.classList.toggle('google-reference', Boolean(page.reference));
  site.innerHTML = `${nav()}<main id="main" class="page${page.reference ? ' reference-page' : ''}">${page.render()}</main>${page.reference ? '' : footer()}`;

  if (BASE_PATH) {
    site.querySelectorAll('[href^="/"], [src^="/"]').forEach((element) => {
      const attribute = element.hasAttribute('href') ? 'href' : 'src';
      const value = element.getAttribute(attribute);
      if (value && !value.startsWith(`${BASE_PATH}/`)) {
        element.setAttribute(attribute, `${BASE_PATH}${value}`);
      }
    });
  }

  const sourceMount = site.querySelector('[data-source-route]');
  if (sourceMount) {
    const source = sourceMount.getAttribute('data-source-route');
    const url = BASE_PATH && source?.startsWith('/') ? `${BASE_PATH}${source}` : source;
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${source}`);
        return response.text();
      })
      .then((html) => {
        sourceMount.innerHTML = html;
        [...sourceMount.children].forEach((block) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'google-source-block';
          wrapper.style.containerType = 'inline-size';
          block.querySelectorAll('style').forEach((style) => {
            style.textContent = style.textContent
              .replace(/@media\s*\(\s*max-width\s*:\s*(\d+(?:\.\d+)?)px\s*\)/g, '@container (max-width: $1px)')
              .replace(/(\d+(?:\.\d+)?)vw\b/g, '$1cqw');
          });
          block.before(wrapper);
          wrapper.append(block);
        });
        if (sourceMount.dataset.sourceLayout === 'robisoc') {
          const hero = sourceMount.querySelector('.google-source-block');
          const layout = document.createElement('div');
          layout.className = 'google-source-block robisoc-source-hero';
          hero.before(layout);
          layout.append(hero);
          layout.insertAdjacentHTML('beforeend', `
            <aside class="robisoc-hero-media" aria-label="RobiSoC and RobiDev reference images">
              <figure><img src="${BASE_PATH}/assets/images/robisoc-power-soc-reference.jpg" alt="RobiSoC Power SoC module"><figcaption>RobiSoC = 18.5mm X 22.5mm</figcaption></figure>
              <figure><img src="${BASE_PATH}/assets/images/robidev-reference.jpg" alt="RobiDev reference platform"><figcaption>RobiDev diameter = 35mm</figcaption></figure>
            </aside>`);
        }
        if (sourceMount.dataset.sourceLayout === 'robidev') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const social = document.createElement('section');
          social.className = 'robidev-source-social';
          social.innerHTML = '<img src="' + BASE_PATH + '/assets/images/robidev-social-links-reference.jpg" alt="RobiChip YouTube, Facebook, and LinkedIn">';
          blocks[0]?.before(social);
          const highDensity = document.createElement('section');
          highDensity.className = 'robidev-legacy-row robidev-high-density';
          highDensity.innerHTML = '<figure><img src="' + BASE_PATH + '/assets/images/robidev-high-density-reference.jpg" alt="RobiDev High-Density"></figure><div class="robidev-legacy-copy"><h1>RobiDev High-Density</h1><h2>RobiSoC Evaluation &amp; High-Density Motor-Drive Design-in Platform</h2><p>RobiDev-High-density supports RC100 / RobiSoC evaluation, thermal-path review, and high-density motor-drive design-in.</p><p>RobiDev-High-density 支援 RC100 / RobiSoC 評估、熱路徑檢視與高密度馬達驅動導入。</p></div>';
          const discrete = document.createElement('section');
          discrete.className = 'robidev-legacy-row robidev-discrete';
          discrete.innerHTML = '<figure><img src="' + BASE_PATH + '/assets/images/robidev-discrete-reference.jpg" alt="RobiDev Discrete"><figcaption>Diameter=30mm, up to 500W</figcaption></figure><div class="robidev-legacy-copy"><h1>RobiDev Discrete</h1><h2>6-Layer Discrete Reference &amp; Validation Platform</h2><p>RobiDev-Discrete is a 6-layer total discrete validation model, corresponding to the RobiSoC M1/G1 SKU architecture in discrete implementation.</p><p>RobiDev-Discrete 為六層板 total discrete 驗證平台，可視為 RobiSoC 之 M1/G1 SKU 架構的分離式實作版本。</p></div>';
          blocks[1]?.before(highDensity);
          blocks[2]?.before(discrete);
        }
        if (sourceMount.dataset.sourceLayout === 'robithrust') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const gallery = document.createElement('section');
          gallery.className = 'robithrust-legacy-gallery';
          gallery.innerHTML = '<figure><img src="' + BASE_PATH + '/assets/images/robithrust-platform-reference-1.jpg" alt="RobiThrust UAV propulsion validation platform"></figure><figure><img src="' + BASE_PATH + '/assets/images/robithrust-platform-reference-2.jpg" alt="RobiThrust Heavy UAV propulsion test platform"></figure>';
          blocks[1]?.before(gallery);
          const architecture = document.createElement('section');
          architecture.className = 'robithrust-native-architecture';
          architecture.innerHTML = '<article><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQUK2tpFvOfI-Ixlpxq4JSvif1d5m6fmXJDEEs0G3J2BXZEmPn-ZfFs3bQMW1Dr_p5JQ72f0UTsBr7jo2L6rah5NnFZj2WJ4m0DES4INPrE4bvSRWo7flnhQ8t4uJ--MC-8NM_TlEQ8Lj2R80eJwSnbn6HhbrDGN24uJMJzSWi0dYtlRtj6AqEsu-mkI726S0_kp9KC0x4YQqei2Fz2-6wO2oeJJ7U93kIQ7shdD=w1280" alt="Evolution of UAV Propulsion Architecture"><h3>Evolution of UAV Propulsion Architecture</h3><h3>無人機推進架構的世代演進</h3><p>RobiChip’s framework illustrates the transition from discrete ESC, motor, and propeller configurations to integrated modules, and toward semiconductor-defined propulsion.</p><p>羅比芯提出無人機推進架構的三代演進框架：從 ESC、馬達與螺旋槳分離的傳統架構，逐步走向整合模組與半導體定義推進系統。</p></article><article><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQWbhVVEBQA1mbJL41err48TMcxO9C1AglPiY62ey_O44ii2sHWOjYrMAymJqModLILdrYSN2uJc_4tZWuGa3j8-5afgPoSkrVL3aeTH0V4ZZ2YOkS1p3ZOGoF_hjvJWDVO9Rt5Erj6dkddV8qCMJAbEEMYSap4ZWIt-89ZcLBrAP9RuDXYRRb-aNhKFjG8X86tojPJ_gFVz-mT8nypM7UvI92z07KFM-rEe1jhI=w1280" alt="Propulsion Gen.3 Concept Architecture"><h3>Propulsion Gen.3 Concept Architecture</h3><h3>Propulsion Gen.3 半導體定義推進概念架構</h3><p>A Power SoC-centered architecture connecting power control, sensing, protection, thermal design, motor, and propeller within a more integrated propulsion platform.</p><p>以 Power SoC 為功率智慧核心，整合驅動控制、感測、保護、熱管理、馬達與螺旋槳，形成更緊湊且可驗證的推進平台。</p></article>';
          blocks[2]?.before(architecture);
          const series = document.createElement('section');
          series.className = 'robithrust-native-series';
          series.innerHTML = '<article><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQV8SUTr67EnxgSXLxCS61CBPAxvUl8BnArOZxNqcPvgYKp2cYFNyh1khXprNTfCCnrn4wuZJJ1P4gOe2jPOuwSDTVwmN5pE-w_E1CmVoEjE-V7dXFEof6-yivz7mALLhPs3Ki6YSmW-mz6WJvfA2jZ4BAVwCWb7S-amOUxtfcX-X6DnBK4lJ6RDj_kjgksoW6IfBIo_AUjOicKc_ajncSHUjUbDjPoSstjo_zwi=w1280" alt="RobiThrust miniE ECX-32"><h2>RobiThrust-miniE(ECX-32)</h2></article><article><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQXE2k20ULTKCNEDwBAuHO3ahkASSvOqSdKL69odDMWYPquAztSh-T6SQHHlDeQ0z_E_mHzKHyJ_VLszXoiBIim7IgAtcbj7rHS_6hxtw7wc_U4iOgUV2MYoxoWb8PnPvVVd_lqk19efYKIU6K2coePOr3xNw2Q5Rv70J7447SWaxK_G02EXDPAgJWRSo9N11fpqZGh8VRc4M5RLyU-4hTcWbAQIaXKfnDG1tif4pNs=w1280" alt="RobiThrust P ECX-42"><h2>RobiThrust-P(ECX-42)</h2></article><article><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQUkq_6ThnpIZRMHqJ9mSXgjYov1VONg_nWhcKsz3p59j0hYTeVzXGEKnbU01goNO-pHxQzNbcd5YgjHqWu6HtFBi1rK9fZwgNweRRXFdAjxoj6XU1WNDrsbSTatWqVMAXYHtp498SfThLHslYfn96liurbiHb7w1hjzjUfU7kP0o7GaN9AUFJVA3pSTACH4bLs52WsTahj7Z4Vq0m2s5ya3SXaUFbvm_NY_BLhksQo=w1280" alt="RobiThrust X RUM3848"><h2>RobiThrust-X(RUM3848)</h2></article>';
          blocks[4]?.before(series);
        }
        if (sourceMount.dataset.sourceLayout === 'event-tairos') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const booth = document.createElement('section');
          booth.className = 'event-source-row tairos-booth';
          booth.innerHTML = '<figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQV9C4Ik2vSTpFproT28kcgGevxpnrDsZdBAPbPOygGrmA9ptHyio6obZBTLyoF-JN5rvyQnleG8hbM7eHxfSI3br5PSZBu9kdKFQyJz9Ox6aBm3l0-8BXr_Ut-BbFjjRe_69poC4jQjvJM3-aZ85cRro-tkYJQM7yqepJF-9-QTbGbsC-QrdDaChEL6i4qX11WxWBcPxD6g8JwnltRhePCdSfvqpjx_jUxEfmyMUWc=w1280" alt="TAIROS 2026 RobiChip booth"></figure><figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQWgUAm5B5X6YRFNPB2nuPZbteYRX0yi4_W19hkRXIDsjRDxmz7_2e9G4SHl3VFOa9Uq4VOnyi6w5XiDIngFxwU0R9HfSKCagB8N6_1oO73n3HhMirGnC3_bY5h4t1y4LFMjt1AvSwVtMBhQdlIRlNwO2FsLdZucghXulij_-yN0jXMN6lY8MvSf3Ijdfj8dWMusPKSafra5i2N22vAtxVX0nGoYeGWsCXnzVxqg=w1280" alt="TAIROS 2026 event visual"></figure><div class="event-source-copy"><h2>RobiChip at TAIROS 2026｜</h2><h2>Swancor Booth Hall-2 + Maxon Booth Hall-1</h2><p>RobiChip will present its high-power-density Power SoC platform direction through advanced packaging / thermal collaboration and UAV propulsion validation.</p></div>';
          blocks[1]?.before(booth);
          const showcase = document.createElement('section');
          showcase.className = 'event-source-row event-two';
          showcase.innerHTML = '<figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQWXzifP9JFSQNQW54OxAK6N8b_RWoCKjjoCmwjhWRRmzPm7etLbRp1orGBuQPv_-UBgzk6NiIjVAEddByWHkDtnt6apgYvafAMEhO0VWT6CWn87Ejv9luDryfqn4WGwt27N2Wa9GnXOrFhLdnR6r9S5TfhVIobtYBf9nzuhgQiixcvg5LWW8-1EBhFOgGZB23q5Q2_BlD0Jwu8WAV5o_rlYaeVQNbzeFEuYbgDlSu8=w1280" alt="TAIROS exhibition showcase"></figure><figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQVvmCyZS8WCIIkiQsGxVCHSdCjohiA7F41jlZW1BJlkTuRo5MSbZr3aQx3xPZseZYzkaEJZUNKM2WyknoRdWifS8yQtDbrBeYDY4EyupnOagvNoNwO2dDJSxmCLZ7tVdqF8t0QZczht6nlBnH91XmbhRk9oB_tG9kE7AU19SPdBue21hvgKjyPgwn6ps031_Xi7pGgOZYW-33CN3UcewlJRmTZL4DX9SRZJ75ClTBM=w1280" alt="TAIROS exhibition showcase"></figure>';
          blocks[2]?.before(showcase);
        }
        if (sourceMount.dataset.sourceLayout === 'event-taichung') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const poster = document.createElement('section');
          poster.className = 'event-source-row event-single';
          poster.innerHTML = '<h2>Event poster｜Leading 2026｜Taichung UAV Industry and Overseas Business Opportunities Forum</h2><h2>活動海報｜領航 2026｜臺中無人載具產業與海外商機論壇</h2><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQXFapg252u5IezJ2WQRh_gDoaKCr1zMxUjBjsQ9EjsJ0BG29crz-EVMijwHsfw9fScb2Elk0q8-1KhoFMf301iR4ypDOeWcDsMIIoVqmrmDwgOUCNLlryEM-G8lAOHlkO5tS1P35RpCVttGF7hdLkqe522QX1tLtbGWjpFkSR7DsaAyawxqAQbbKtDwYwjMU-Y5Xa0kX_pO_1jAv6fNUjjqoD5XjwRcjzu3fx_Dd3I=w1280" alt="Taichung UAV Forum event poster">';
          blocks[1]?.before(poster);
          const deck = document.createElement('section');
          deck.className = 'event-source-row event-deck';
          deck.innerHTML = '<h2>“English Reference Deck available for international partners”</h2><h3>Henry Gong, Founder &amp; CEO of RobiChip, presented RobiChip’s view on Physical AI, UAV propulsion, and Power SoC at the Taichung UAV forum.</h3><h3>羅比芯創辦人暨執行長 Henry Gong 於臺中無人載具論壇分享 Physical AI、無人機推進與 Power SoC 平台觀點。</h3><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQXqDEwNZXFkZEwNfUZIFipmBujqR-vtNyUzIDpaSmyL1iachYTRodGvz9egMMikN75P8p2V4lWH0JMWGMIwks_LeB5IaHKowV-aMfpS7C5cZKd-2UE37-WuOSwgRxNv-QBcHO4mjL7zbUGkBOpEUXfHDGcRmpz3u5nb_ogI1cFqcI-qhKNjiFa4uodzPVhbL0lnK8_31oXuPE4TkcbxATEI5tiJcJ7XXfABrCba=w1280" alt="Taichung UAV Forum presentation">';
          blocks[2]?.before(deck);
        }
        if (sourceMount.dataset.sourceLayout === 'event-awards') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const evidence = document.createElement('section');
          evidence.className = 'event-source-row event-evidence';
          evidence.innerHTML = '<h2>Official 2026 Best AI Awards Certificate<br>2026 智慧創新大賞正式佳作獎狀</h2><p>RobiChip received Honorable Mention in the IC Design Startup &amp; SME Group for the project “Robochips High-Power-Density Power SoC Platform for Intelligent Machines.”</p><p>羅比芯科技以「Robochips 高功率密度智慧機器人與無人機動力控制 Power SoC 晶片平台」，榮獲 2026 智慧創新大賞 IC 設計類新創及中小企業組佳作。</p><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQX6gI2Hhc2odCZ7ZE1vWm8MSTkDlPUiilcp1nvvF8pKfbLrTVr9-SrUQHTLEnGqNxm1nC0OGh5EMTHa2b_mW2kV7Jzi-VxcNRCEub9KjzBlxapSTd3ensQFUa__AabwvQPZOfzSxL28z5kEo5RzajSrHycloxaabeaYEVEfXrKZkM3DvkAuEUrmO1ZElqTF5RsMF6Y2PqcQ26cHBNiIsSd2q5dKy18lHyMgggGKXQ4=w1280" alt="2026 Best AI Awards certificate"><h2>Application-Side Finalist Recognition<br>下游系統應用入圍 AI 應用類決賽</h2><p>A system-company partner using RobiChip’s high-density propulsion solution advanced to the AI Application finals.</p><p>採用 RobiChip 高功率密度動力方案的系統廠合作夥伴進入 AI 應用類企業公開組決賽。</p><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQWY5EPeRpRhhZEMP5LpcK3UDbXi82038czOI_FDsg0KyIngmuSp9TZJ9xO6gnLshH-ukvrF9-ki7G7rL44YNk5IuzvHBOxZxE8dtpdw7QIU9_Ex3HiwpQLUL2Hb52PojZx1altM3qJqsWj9T4WcPoIcdOTWzuWWSJFwdJkJSuLcxv2XZdTQMT4UTkL8y8ub1Uh9bxu1KarOQmEIPniCMaXT03tXadBet2IYWLtHgiM=w1280" alt="AI Application finalist recognition">';
          blocks[4]?.before(evidence);
          const gallery = document.createElement('section');
          gallery.className = 'event-source-row event-three';
          gallery.innerHTML = '<figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQU6XlMuFH0DlyVnLt-Plwt-JO9mQ_hMZE0f_-0-CNzt7jYWBAb8B0g0qSkTSHTLp870UTVS08RCbivLFvYoEs_3Oo9rOZDAAhewKiX3fRWN6t_yXccaaLiNhtUrFZ956ngcb6lt2dh0FvCOVIPDxHh6Zz2D6A366OH3TL0Tpq2QNvJqXcu6yniTGHbl-azqWbT4DPFqYeCFz-GM6xomuqDoU9YxkuPi8e4URL3zAv8=w1280" alt="RobiChip Team at the 2026 Best AI Awards"><figcaption>RobiChip Team at the 2026 Best AI Awards</figcaption></figure><figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQXGEQCAikmNcpp9k9Q4bzqYTEvzDO_i1t9AF-jn5Zim10-WWBcPlG0Xho52gGZtgCyeK63jPIx_yM_4lE8Gs5GyoCan83CMMgY0y6-2gz2WPu0MJ0ndHL4WTJ2WxCZhI4BD7ojnnHMABqZmmlGISd7obw8Qmj3sUhTW7RwA24kUn77zTtD9a15RKMhy2nZEkMSSby58esLdMNy_ZQte4sy-QjkGClji9xxi26Xq5sk=w1280" alt="Official Award Announcement"><figcaption>Official Award Announcement — IC Design Honorable Mention</figcaption></figure><figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQUpXJyMbmn2VyuJokDbSkTqTQK1SUL188FJ3ZJ4_NGJdDVlTe3YpcZykzEr8iEgwCXMB2KiGYsMpiEdlFQR5V3oirRRUSMQJdxGHMwUAm4Z7tID4ePiUKlSf-lqXOFSGpuV-u6GdJzZ-CQ0STQvtsHYxyqPNjWDqa_lm61geGL1Bj3wVAjKWwSojxPjIb39nHLR_tyUUXzcXLt7pDrqyKP0CguPy5UEnUXskoUP6aA=w1280" alt="RobiThrust System-Level Propulsion Validation"><figcaption>RobiThrust System-Level Propulsion Validation</figcaption></figure>';
          blocks[5]?.before(gallery);
        }
        if (sourceMount.dataset.sourceLayout === 'event-computex') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const gallery = document.createElement('section');
          gallery.className = 'event-source-row event-three';
          gallery.innerHTML = '<figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQXGlxwQkw-mWb5p4m0DF6kw636pDf7DP-HaTQzgOrl4W2tgjjeYHxe5BnKTQjuP6EPFh4NvvvAsJvYsZ5XxBIp6ZBvUQL6ha44iA9SZoFhFkz2xQ892nRbSM8V_oQTQO2zomkcsTqlebVYiWr4Os71lTFiL318U1h1Su0xhQ1Wo2vtH9hzybvuy0mGBotnAYIy09Hl3z8kmK-bHf3c5cEsm-8dfEfsLW5d6vRtIAgA=w1280" alt="RobiChip at the InnoVEX Product Wall"><figcaption>RobiChip at the InnoVEX Product Wall</figcaption></figure><figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQX1gUktHykbMi3i4ZZ4db87ETxrNuaJITJJOxsmmk4-Yjg2uRGWfbcud7IrO9HZQcQwRL-djfsajtGXscxzvlim_0E67nP7vMcft1BY_3HWY9twGZOloOczNuI3qPzWzjYLQXUyL8vmGeEbmaCjayV2lChac2_oKHty5uNUN43bgnLWzppGkMIMSA0mAsvx2Pe3LxXo04Ce8du0NgYCxXSCBFfpcSlnsrVQVaVDhYc=w1280" alt="Power SoC Platform for Intelligent Machines"><figcaption>Power SoC Platform for Intelligent Machines</figcaption></figure><figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQXFmAOelqdSq4fQpHoW1c75REu0j-y6-DvZ1L22lLNZC1XMIcj2HqlelIa0vXMsFLr3dyrF8VxprInlKSznm80LgRaNKjyO7bKciI-sIdJKaLFiBHTvTBNbYou0QzetOKW9oqnVzvZM0tihU_oMSfVwE_xA_39fvNv2B9YPQeK0_8H6VU32LKnUxq3G0wKH-eCcqqzcczcfRPjV2ScRARW0kGYhYFo0HECVIlFi=w1280" alt="From Recognition to Ecosystem Visibility"><figcaption>From Recognition to Ecosystem Visibility</figcaption></figure>';
          blocks[2]?.before(gallery);
        }
        if (sourceMount.dataset.sourceLayout === 'event-swancor') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const collaboration = document.createElement('section');
          collaboration.className = 'event-source-row event-swancor';
          collaboration.innerHTML = '<img class="event-hero-image" src="https://lh3.googleusercontent.com/sitesv/AG8ngQWKbe8C-s_iereyt6XDx2EY0j5m-uEt5TnpwyOSBe8Sl1kIIyNUuGfIJEa5A2umnqhexWnrmxT3NbtddL_WE84zchTxcmM0SnMnGLvirKY-nBZ5XGlY6yIoTGfbMAFJICrAmvyAJQ09lTIz_a1Vd9rJqXml7altwEvJi3Z1P_mUmhfoD74AZsSb-id1Y1c09Wzj55sG-gthaEZcu3OyDkX1SF8St5vYRuJIDIvJy2E=w1280" alt="Swancor and RobiChip strategic collaboration signing ceremony"><h1>PARTNERSHIP IN ACTION</h1><h2>Strategic Collaboration Signing Ceremony</h2><h2>次世代高負載機器人關鍵技術戰略合作簽署</h2><p>Representatives of Swancor and RobiChip formalized their strategic collaboration, connecting advanced materials, Power SoC, thermal engineering, and intelligent-machine applications.</p><p>上緯投控與羅比芯科技正式啟動戰略合作，結合先進材料、Power SoC、熱管理與智慧機器應用，加速次世代高功率密度動力系統落地。</p><h2>Event Highlights &amp; Technology Showcases</h2><h2>活動紀錄與技術展示</h2><div class="event-grid-two"><figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQW7GervT54KJEuquaSgdiu3DTiEk06hlHraoIru5nFxHj6zdP6kYRy_P4RMMaowW94QZv54kV5q6dFV90tpwyp3KZjFoisnp4VHL6EfK1SRqiaJcaQQ2QVE6J9Ff1EamPar4ie5umgFQZ6mq9Z7UlNjZUgshz71zOoB5behrKfvgbrfVSmeDVeMiDcOvx5idBg2sVArQfxf3yTl0A_d_x52orEpwpiaj6ifZFNQ1Sk=w1280" alt="Cross-Industry Collaboration"><figcaption>Cross-Industry Collaboration 跨產業合作交流</figcaption></figure><figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQX7h6TXnF-SthstCGRgj9iSyCjvyMwK75CdBiNeNXkiR1tV_E_rvdF5iZBaPsM_eXEtnAD2p2Wl2vUV8lgl3QNASq8i86yxpoj8GUphdylS2hEe2HElRn3Kg45uJ8pkN-AeOKMYznTfkv3H1bK5e7wLSFZNs6sLcbl4w9Pgy_lEhTNxGikgr4lxjXvA_FScHdg2GCNlAh7zYpwii36wFniyMEaFFaEAh9yacVcy=w1280" alt="Power SoC Platform Presentation"><figcaption>Power SoC Platform Presentation 高功率密度 Power SoC 平台分享</figcaption></figure></div><div class="event-grid-two event-small-gallery"><figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQVDtF0BtvqPBwHfOcA_JcmgMJP3g1vCL0DQLj2Z_xvyMUblfyZZFENqM0N80vUyeI1cBeVpHV3_iy7wTGK2lFgS11n3opGYDtusqT_mJmbmHEM1DRWrkNS9IXcmbf0XwquzQ4IrNNRKuYSr16gymbo9kmViHG8KACFOdDQOmrFA0rjhYSjaFitLKE0AmajYovj-vFgAOXROWajPQfBRLBgRteZK1mIAoU41uNyVAhk=w1280" alt="RobiChip Technology Platform Showcase"><figcaption>RobiChip Technology Platform Showcase</figcaption></figure><figure><img src="https://lh3.googleusercontent.com/sitesv/AG8ngQU-JQkN-fZ9WQ_gQfKVvtIHyRegcCm4Od1qWyxoWKVjqdtERpWkI2_Db88N_969aJ4XuGtP1_jpaFzS2ljeVj8SACL32SbKcaIaOPYvPqO5_QWQ6YTuHxti0928HK1sQqH0BrcWmFgezVYVGHEqRLjjVA1iXuOylhmtK9SPDy3EFNAajwYJT82-lmAA4CnzNJlD-egWmWiZRAQPDG8rC_dQ37T97PO6m9SgUQYd=w1280" alt="Swancor Materials and Application Showcase"><figcaption>Swancor Materials &amp; Application Showcase</figcaption></figure></div>';
          blocks[3]?.before(collaboration);
        }
        if (sourceMount.dataset.sourceLayout === 'robiagent') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const intro = document.createElement('section');
          intro.className = 'google-source-block robiagent-source-intro';
          intro.innerHTML = '<div class="robiagent-standard-copy"><h1>RobiAgent | AI-assisted Engineering Workflow</h1><p>RobiAgent connects technical query, thermal pre-check, layout review, validation data, and design-in decisions. RobiAgent 串接技術查詢、熱預評估、layout 檢視、驗證資料與 design-in 決策。</p><img src="' + BASE_PATH + '/assets/images/robiagent-workflow-reference.jpg" alt="RobiGPT AI-assisted engineering workflow"></div>';
          blocks[1]?.before(intro);
          intro.append(blocks[1]);
        }
        if (sourceMount.dataset.sourceLayout === 'robilab') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const intro = document.createElement('section');
          intro.className = 'robilab-source-intro';
          intro.innerHTML = '<h1>RobiLab | Measurement, Thermal &amp; System Validation</h1><p>RobiLab connects RobiDev evaluation, RobiThrust propulsion validation, RobiTorque actuator pilot, and RobiSoC design-in through measurable engineering data.</p><p>RobiLab 透過可量測的工程數據，連接 RobiDev 評估、RobiThrust 推進驗證、RobiTorque 致動器 pilot 與 RobiSoC design-in。</p><img src="' + BASE_PATH + '/assets/images/robilab-validation.png" alt="RobiLab measurement and validation environment">';
          blocks[1]?.before(intro);
        }
        if (sourceMount.dataset.sourceLayout === 'robitorque') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const intro = document.createElement('section');
          intro.className = 'robitorque-source-intro';
          intro.innerHTML = '<h1>RobiTorque | Robotics Actuator Validation Direction</h1><p>RobiTorque extends Robichip’s Power SoC, motor-drive, and thermal-path validation logic from UAV propulsion to robotics actuators, joint motors, and servo modules.</p><p>RobiTorque 將羅比芯在 Power SoC、馬達驅動與熱路徑驗證上的能力，從無人機推進延伸至機器人致動器、關節馬達與伺服模組。</p><img src="' + BASE_PATH + '/assets/images/robitorque-elbow-demo-kit.png" alt="RobiTorque Elbow Demo Kit"><img src="' + BASE_PATH + '/assets/images/robitorque-knee-demo-kit.png" alt="RobiTorque Knee Demo Kit">';
          blocks[1]?.before(intro);
        }
        if (sourceMount.dataset.sourceLayout === 'home') {
          const blocks = sourceMount.querySelectorAll(':scope > .google-source-block');
          const hero = blocks[1];
          const layout = document.createElement('div');
          layout.className = 'google-source-block home-source-hero';
          hero?.before(layout);
          if (hero) layout.append(hero);
          layout.insertAdjacentHTML('beforeend', '<aside class="home-source-media"><img src="' + BASE_PATH + '/assets/images/home-hero-reference.jpg" alt="RobiThrust propulsion validation platform"></aside>');
        }
        if (BASE_PATH) {
          sourceMount.querySelectorAll('[href]').forEach((element) => {
            const href = element.getAttribute('href');
            if (href?.startsWith(ORIGIN)) {
              const target = new URL(href);
              element.setAttribute('href', `${BASE_PATH}${target.pathname}${target.search}${target.hash}`);
            }
          });
        }
      })
      .catch(() => { sourceMount.innerHTML = '<p class="source-load-error">Source content is temporarily unavailable.</p>'; });
  }

  const toggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  toggle?.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.nav-links a').forEach((item) => item.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
})();
