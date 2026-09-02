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
    ${section('2026 Technology Showcase Series', 'From Live Validation to Semiconductor-Defined Motion', '從現場驗證到半導體定義運動平台：在 2026 展會現場看見 Power SoC 如何連結推進、散熱與智慧控制。', cards([
      {tag: 'Aug 19–22 · Taipei', title: 'Automation Taipei / TAIROS 2026', text: 'Live demo at Swancor booth Q210, TaiNEX 2 and Maxon booth K012, TaiNEX 1.', href: '/news-events/2026-TAIROS', link: 'Event details'},
      {tag: 'Sep 2–4 · Taipei', title: 'SEMICON Taiwan 2026', text: 'Accepted speaker and showcase at booth T9404, 7F TaiNEX 2. Presentation: Sep 4, 14:00.', href: '/news-events/semicon-taiwan-2026', link: 'Event details'},
      {tag: 'Validation', title: 'Live Engineering Discussion', text: 'Bring your motor, thermal-path, control, or design-in requirements to the RobiChip team.', href: '/partnership', link: 'Start a discussion'}
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
    ${section('Platform Overview', 'One Platform, Multiple Entry Points', '從 Power SoC、驗證平台到 AI-assisted design-in，依照客戶所處階段選擇最直接的合作入口。', cards([
      {tag:'Power SoC', title:'RobiSoC', text:'Power SoC + hybrid-substrate product family from 250 W to 1000 W class.', href:'/robisoc'},
      {tag:'Evaluation', title:'RobiDev', text:'Developer and evaluation platforms for electrical, firmware, and thermal validation.', href:'/robidev'},
      {tag:'UAV', title:'RobiThrust', text:'UAV propulsion validation from compact motors to heavy-load test benches.', href:'/robithrust'},
      {tag:'Robotics', title:'RobiTorque', text:'Robotics actuator and joint-motor validation direction.', href:'/robitorque'},
      {tag:'AI Workflow', title:'RobiAgent', text:'AI-assisted technical query, pre-check, layout review, and design-in decisions.', href:'/robiagent'},
      {tag:'Lab', title:'RobiLab', text:'Measurement, thermal, reliability, and system-validation base.', href:'/robilab'}
    ]), 'tint')}
    ${section('Growth Pipeline', 'From Prototype Validation to Production Scale', 'A stage-gated path that keeps technical evidence, manufacturing decisions, and partner alignment connected.', flow(['Prototype Validation', 'Design-in Package', 'DFM & Reliability', 'Pilot Sample', 'Production Scale']))}
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
    ${cta()}`;

  const robisocPage = () => `
    ${hero({
      eyebrow:'RobiSoC Product Family',
      title:'Scalable Power SoC Modules for Intelligent Machines',
      zh:'面向智慧機器的可擴展高功率密度 Power SoC 產品線',
      lead:'RobiSoC is RobiChip’s scalable Power SoC product family for robotics, UAV propulsion, and high-power-density motion systems, offered as RC25 / RC50 / RC75 / RC100 modules from 250 W to 1000 W class.',
      sublead:'RobiSoC 是羅比芯面向機器人、無人機推進與高功率密度動力系統的可擴展 Power SoC 產品線，提供 RC25 / RC50 / RC75 / RC100，涵蓋 250 W 到 1000 W class。',
      actions:[{href:BD,label:'Discuss Design-in'},{href:'/robidev',label:'Explore RobiDev'}],
      metrics:[['250–1000 W','RC25–RC100'],['18.5 × 22.5 mm','Module footprint'],['M1/M2 · G1/G2','Configuration logic']]
    })}
    ${section('Product Line', 'RC25 / RC50 / RC75 / RC100', 'A scalable product family organized by power class and application direction.', cards([
      {tag:'Market Baseline', title:'RC25', power:'250 W Class', text:'Lightweight actuators, education kits, mobility nodes, and edge motion.'},
      {tag:'2× Direction', title:'RC50', power:'500 W Class', text:'Mid-power robotics, AMR/AGV, gimbal, and automation systems.'},
      {tag:'3× Direction', title:'RC75', power:'750 W Class', text:'Robotics joints, industrial automation, and high-dynamic motion.'},
      {tag:'Indicator Product', title:'RC100', power:'1000 W Class', text:'Flagship high-power-density platform and design-in indicator product.'}
    ], 'four'), 'tint')}
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
      {title:'Toolchain & Firmware Alignment', text:'Align motor-control workflow, MCU toolchain, and validation firmware.'},
      {title:'Application-specific I/O', text:'Review sensors, protection, communication, and system interfaces.'},
      {title:'Co-developed Evaluation Platform', text:'Build a measurable reference platform around the target application.'},
      {title:'Power Platform Without MCU Lock-in', text:'Keep the power-platform direction adaptable to customer control choices.'}
    ], 'four'), 'tint')}
    ${cta('Move from Power-Class Selection to Design-in', 'Select the target power class, controller direction, GaN configuration, and validation track with the RobiChip engineering team.')}`;

  const robidevPage = () => `
    ${hero({
      eyebrow:'Developer & Evaluation Platforms',
      title:'RobiDev Evaluation and Design-in Platforms',
      zh:'從分離式驗證到高密度 RobiSoC 導入',
      lead:'RobiDev connects power-stage evaluation, motor-control development, thermal-path review, and customer design-in.',
      sublead:'RobiDev 將功率級評估、馬達控制開發、熱路徑檢視與客戶 design-in 串接成可量測、可比較的工程流程。',
      image:'/assets/images/robidev-platform.png',
      caption:'RobiDev developer and evaluation platform',
      actions:[{href:CONTACT,label:'Discuss a validation plan'},{href:'/robisoc',label:'View RobiSoC'}]
    })}
    ${section('Platform Options', 'Choose the Validation Depth You Need', '依照功率密度、板級架構與 design-in 階段選擇對應平台。', cards([
      {tag:'High Density', title:'RobiDev High-Density', power:'Ø 30 mm · up to 500 W', text:'Supports RC100 / RobiSoC evaluation, thermal-path review, and high-density motor-drive design-in.'},
      {tag:'Discrete Reference', title:'RobiDev Discrete', power:'6-Layer', text:'Total-discrete validation model corresponding to the RobiSoC M1/G1 SKU architecture.'}
    ], 'two'), 'tint')}
    ${section('Design-in Workflow', 'Make Every Evaluation Step Produce Reusable Evidence', 'RobiDev is not only a demo board. It is a transition layer between architecture choice and customer implementation.', flow(['Requirement Mapping', 'Electrical Bring-up', 'Motor-control Tuning', 'Thermal Review', 'Design-in Package']))}
    ${section('Validation Outputs', 'Evidence for the Next Engineering Decision', '', cards([
      {title:'Electrical Baseline', text:'Voltage, current, switching behavior, protection, and operating envelope.'},
      {title:'Control Alignment', text:'FOC, sensing, interface, firmware, and application-specific behavior.'},
      {title:'Thermal Path', text:'Package-to-PCB-to-structure heat flow under representative duty cycles.'},
      {title:'Customer Package', text:'Measured results, risks, design guidance, and the next pilot milestone.'}
    ], 'four'), 'tint')}
    ${cta('Start with RobiDev, Finish with a Design-in Package', 'Bring a motor, actuator, propulsion requirement, or power-density target. RobiChip will help define the validation path.')}`;

  const robithrustPage = () => `
    ${hero({
      eyebrow:'UAV Propulsion Validation Platform',
      title:'RobiThrust',
      zh:'無人機高推力密度推進系統驗證平台',
      lead:'RobiThrust integrates RobiDev, motor, propeller, fixture, thrust measurement, and thermal observation into a practical UAV propulsion validation platform.',
      sublead:'RobiThrust 整合 RobiDev、馬達、槳、測試治具、推力量測與熱觀察，形成可用於早期馬達驅動評估與客戶 pilot 專案的無人機推進系統驗證平台。',
      image:'/assets/images/robithrust-platform.png',
      caption:'RobiThrust propulsion test and validation platform',
      actions:[{href:CONTACT,label:'Plan a propulsion test'},{href:'/technology-insights/robithrust-ecx32-test-observation',label:'Read ECX-32 note'}]
    })}
    ${section('Architecture Evolution', 'Evolution of UAV Propulsion Architecture', '無人機推進架構的世代演進：從分離式 ESC、馬達與槳，走向半導體定義推進系統。', cards([
      {tag:'Gen.1', title:'Discrete Architecture', text:'Traditional separated ESC, motor, propeller, sensing, and mechanical structure.'},
      {tag:'Gen.2', title:'Integrated Module', text:'Baseline integration improves compactness but still leaves cross-domain optimization fragmented.'},
      {tag:'Gen.3', title:'Semiconductor-Defined Propulsion', text:'A Power SoC-centered architecture connects control, sensing, protection, thermal design, motor, and propeller.'}
    ]), 'tint')}
    ${section('Validation Platforms', 'Choose Your RobiThrust Validation Platform', '從基礎推進量測到 Heavy UAV 實驗平台。', cards([
      {tag:'mini-E', title:'RobiThrust-miniE', text:'Compact validation track based on the Maxon ECX-32 class.'},
      {tag:'P Series', title:'RobiThrust-P', text:'Propulsion validation direction based on the Maxon ECX-42 Flat class.'},
      {tag:'X Series', title:'RobiThrust-X', text:'EVT bench validation for thrust, RPM, input power, and thermal observation.'},
      {tag:'Heavy / XL', title:'RobiThrust-Heavy', text:'Adds dynamometer / torque-load capability for heavier-load UAV propulsion and future XL validation.'}
    ], 'four'))}
    ${section('Bench Evidence', 'Measure the System, Not Only the Motor Driver', 'RobiThrust maps thrust, RPM, torque, input power, efficiency, and temperature across a representative operating range.', `
      <div class="grid two">
        <div>${flow(['Propeller & Motor', 'Driver', 'Power SoC', 'Sensors', 'Engineering Data'])}</div>
        ${mediaPlaceholder('RobiThrust test-bench video placeholder', 'Original Google Sites media should be exported and placed here during the media-completion pass.')}
      </div>`,'tint')}
    ${cta('Turn a Propulsion Requirement into a Validation Plan', 'Share your motor, propeller, voltage, thrust, payload, or endurance target with the RobiChip engineering team.')}`;

  const robitorquePage = () => `
    ${hero({
      eyebrow:'Robotics Actuator Validation Platform',
      title:'RobiTorque',
      zh:'機器人致動器驗證平台',
      lead:'RobiTorque extends RobiChip’s Power SoC, motor-drive, and thermal-path validation logic from UAV propulsion to robotics actuators, joint motors, and servo modules.',
      sublead:'RobiTorque 將羅比芯在 Power SoC、馬達驅動與熱路徑驗證上的能力，從無人機推進延伸至機器人致動器、關節馬達與伺服模組。',
      actions:[{href:CONTACT,label:'Discuss an actuator pilot'},{href:'/robisoc',label:'Explore RobiSoC'}],
      metrics:[['Torque density','System target'],['FOC + Encoder','Control layer'],['T–N Curve','Validation output']]
    })}
    ${section('System Bottleneck', 'Torque Density Becomes the Next System Bottleneck', '扭力密度是機器人致動器的下一個瓶頸。功率電子、散熱、控制與機構必須在同一個體積限制中共同優化。', cards([
      {title:'Higher Torque in Smaller Modules', text:'更小體積中的更高扭力，提升關節與末端執行器的可用性能。'},
      {title:'Package-to-Structure Heat Flow', text:'從封裝到 PCB、外殼與機構的完整熱路徑。'},
      {title:'FOC / Encoder / CANBus / RS-485', text:'控制介面、感測與韌體整合，對齊實際機器人平台。'},
      {title:'Dynamic Load and T–N Curve', text:'以動態負載、扭力—轉速曲線與溫升建立 design-in 證據。'}
    ], 'four'), 'tint')}
    ${section('Validation Tracks', 'Robotics Actuator Validation Tracks', '機器人致動器驗證方向。', flow(['Motor & Gearbox', 'Power Stage', 'Control & Sensing', 'Thermal Structure', 'Dynamic Load']))}
    ${section('Pilot Scope', 'From Bench Characterization to Robot Integration', '', `<div class="grid two">${mediaPlaceholder('Actuator fixture image placeholder', 'Replace with the source Google Site image or current RobiTorque hardware photograph.')}<div class="callout"><h3>Typical pilot outputs</h3><p>Operating envelope, torque-current-temperature map, communication interface, control tuning observations, thermal risks, and recommended next design-in step.</p></div></div>`, 'tint')}
    ${cta('Validate the Actuator as a Complete System', 'Bring your joint-motor, servo, mobile-robot, humanoid, or industrial-motion requirement to RobiChip.')}`;

  const robiagentPage = () => `
    ${hero({
      eyebrow:'AI-assisted Engineering Workflow',
      title:'RobiAgent',
      zh:'以 AI 串接技術查詢、驗證資料與 design-in 決策',
      lead:'RobiAgent connects technical query, thermal pre-check, layout review, validation data, and design-in decisions.',
      sublead:'RobiAgent 串接技術查詢、熱預評估、layout 檢視、驗證資料與 design-in 決策。',
      actions:[{href:'https://VIP.robichip.com',label:'Open RobiChip VIP'},{href:CONTACT,label:'Discuss the workflow'}],
      metrics:[['Query','Technical context'],['Pre-check','Thermal & layout'],['Decision','Design-in evidence']]
    })}
    ${section('Workflow', 'An Engineering Copilot Grounded in Platform Evidence', 'The goal is not a generic chatbot. RobiAgent organizes the engineering context required to move from a question to a reviewable decision.', flow(['Technical Query', 'Requirement Context', 'Thermal Pre-check', 'Layout Review', 'Design-in Decision']), 'tint')}
    ${section('Use Cases', 'Connect Knowledge, Measurements, and Decisions', '', cards([
      {title:'Technical Query', text:'Find the relevant platform concept, specification context, or validation note.'},
      {title:'Thermal Pre-check', text:'Organize power loss, package, PCB, structure, airflow, and duty-cycle assumptions.'},
      {title:'Layout Review', text:'Capture high-current, switching, sensing, protection, and thermal-path review points.'},
      {title:'Validation Context', text:'Connect RobiDev, RobiThrust, RobiTorque, and RobiLab measurements.'},
      {title:'Design-in Decision', text:'Summarize evidence, risks, open questions, and recommended next actions.'},
      {title:'Partner Workflow', text:'Create a shared technical language across customer, component, and manufacturing teams.'}
    ]), 'tint')}
    ${cta('Bring AI into the Engineering Workflow', 'RobiAgent is positioned as an AI-assisted layer around RobiChip platform knowledge and validation evidence.')}`;

  const robilabPage = () => `
    ${hero({
      eyebrow:'Measurement, Thermal & System Validation',
      title:'RobiLab',
      zh:'連接評估平台、系統驗證與 design-in 的工程量測基地',
      lead:'RobiLab connects RobiDev evaluation, RobiThrust propulsion validation, RobiTorque actuator pilots, and RobiSoC design-in through measurable engineering data.',
      sublead:'RobiLab 透過可量測的工程數據，連接 RobiDev 評估、RobiThrust 推進驗證、RobiTorque 致動器 pilot 與 RobiSoC design-in。',
      image:'/assets/images/robilab-validation.png',
      caption:'RobiLab measurement and validation environment',
      actions:[{href:CONTACT,label:'Plan a validation session'},{href:'/partnership',label:'Collaboration options'}]
    })}
    ${section('Validation Base', 'One Measurement Context Across the Platform', '以一致的資料語境連接元件、板級、機電系統與客戶應用。', cards([
      {title:'Electrical Characterization', text:'Input/output power, current, switching behavior, protection, and efficiency.'},
      {title:'Thermal Observation', text:'Package, PCB, structure, airflow, and transient/steady-state temperature.'},
      {title:'Motion & Load', text:'RPM, thrust, torque, dynamic load, duty cycle, and application response.'},
      {title:'Design-in Evidence', text:'Comparable plots, observations, limitations, and recommended next steps.'}
    ], 'four'), 'tint')}
    ${section('Connected Platforms', 'From RobiDev to Customer Pilot', '', flow(['RobiDev Evaluation', 'RobiThrust / RobiTorque', 'RobiLab Measurement', 'RobiSoC Design-in', 'Customer Pilot']))}
    ${cta('Define a Measurable Validation Question', 'The best RobiLab engagement starts with a clear decision, a representative operating condition, and agreed evidence.')}`;

  const insightsPage = () => `
    ${hero({
      eyebrow:'Technology Insights',
      title:'Engineering Notes for High-Power-Density Motion',
      zh:'高功率密度智慧動力平台的工程筆記',
      lead:'Validation observations, platform fundamentals, and design-in workflows from RobiChip engineering.',
      sublead:'聚焦推進實測、Power SoC 基礎觀點、RobiDev 導入流程與半導體定義智慧運動。',
      actions:[{href:'/technology-insights/robithrust-ecx32-test-observation',label:'Read the published note'},{href:CONTACT,label:'Technical discussion'}]
    })}
    ${section('Published Engineering Note', 'RobiThrust ECX-32 Test Observation', '從 Motor-Driver Matching 到續航力優化：以實測資料觀察馬達—驅動匹配與系統效率。', cards([
      {tag:'Published', title:'G2 Average gf/W Advantage', power:'+6.3%', text:'Observed across the 3100–5600 rpm range in the referenced validation dataset.', href:'/technology-insights/robithrust-ecx32-test-observation', link:'Read full note'},
      {tag:'Lower RPM Range', title:'3100–4500 rpm', power:'+7.8%', text:'Observed average gf/W advantage in the lower operating range.'}
    ], 'two'), 'tint')}
    ${section('Four Technical Tracks', 'Browse by Engineering Question', '四個技術系列。', cards([
      {tag:'Validation Notes', title:'RobiThrust Validation Notes', text:'推進系統實測筆記與 motor-driver matching 觀察。', href:'/technology-insights/robithrust-ecx32-test-observation'},
      {tag:'Fundamentals', title:'Power SoC Fundamentals', text:'Power density, integration, thermal path, and intelligent-machine architecture.', href:'/technology-insights/why-power-density-matters'},
      {tag:'Design-in Notes', title:'RobiDev Design-in Notes', text:'從開發平台、量測證據到客戶 design-in package。', href:'/technology-insights/robidev-to-design-in'},
      {tag:'Entry Strategy', title:'Propulsion Validation as a Design-in Entry', text:'Use an application-level validation question to begin the semiconductor design-in process.', href:'/technology-insights/propulsion-validation'}
    ], 'four'))}
    ${cta('Discuss the Engineering Question Behind the Data', 'RobiChip can help translate an application target into a validation plan and design-in decision.')}`;

  const articlePage = (article) => `
    ${hero({eyebrow:article.eyebrow || 'Engineering Note', title:article.title, zh:article.zh, lead:article.lead, sublead:article.sublead, actions:[{href:'/technology-insights',label:'All Technology Insights'},{href:CONTACT,label:'Technical discussion'}], metrics:article.metrics})}
    <section class="section tint"><div class="wrap article">${article.body}</div></section>
    ${cta('Continue the Technical Discussion', 'Contact RobiChip to review the assumptions, operating conditions, and next validation step for your application.')}`;

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

  const newsPage = () => `
    ${hero({
      eyebrow:'News & Events',
      title:'RobiChip in the Intelligent-Machine Ecosystem',
      zh:'展會、獎項、技術發表與產業合作',
      lead:'Follow RobiChip’s public technology showcases, engineering events, awards, and ecosystem partnerships.',
      sublead:'追蹤羅比芯的公開技術展示、工程活動、獎項與產業合作。',
      actions:[{href:'/news-events/2026-TAIROS',label:'TAIROS 2026'},{href:'/news-events/semicon-taiwan-2026',label:'SEMICON Taiwan 2026'}]
    })}
    ${section('Latest', '2026 News & Events', '', cards([
      {tag:'2026.09.02–04', title:'SEMICON Taiwan 2026', text:'Accepted speaker and booth showcase at TaiNEX 2.', href:'/news-events/semicon-taiwan-2026', link:'Details'},
      {tag:'2026.08.19–22', title:'Automation Taipei / TAIROS 2026', text:'RobiChip live validation showcase with ecosystem partners.', href:'/news-events/2026-TAIROS', link:'Details'},
      {tag:'2026.04.25', title:'2026 Best AI Awards', text:'RobiChip recognition in the 2026 Best AI Awards program.', href:'/news-events/news-events-best-AI-Awards', link:'Details'},
      {tag:'2026.05.14', title:'Swancor × RobiChip MOU', text:'Strategic collaboration event and public video record.', href:'/news-events/swancor-tech-mou', link:'Details'},
      {tag:'2026', title:'COMPUTEX InnoVEX', text:'RobiChip startup and intelligent-machine technology showcase.', href:'/news-events/2026-computex-innovex', link:'Details'},
      {tag:'2026', title:'Taichung Unmanned Vehicle Forum', text:'Industry forum participation focused on unmanned systems.', href:'/news-events/taichung-unmanned-vehicle-forum', link:'Details'}
    ]), 'tint')}
    ${cta('Meet RobiChip at an Event', 'Contact the team to arrange a technical discussion, validation review, or partner meeting.')}`;

  const eventPage = (event) => `
    ${hero({eyebrow:event.eyebrow || 'News & Events', title:event.title, zh:event.zh, lead:event.lead, sublead:event.sublead, actions:[{href:'/news-events',label:'All News & Events'},{href:BD,label:'Arrange a meeting'}], metrics:event.metrics})}
    <section class="section tint"><div class="wrap">
      <div class="grid two">
        <article class="article">
          <span class="tag">${event.tag || '2026 Event'}</span>
          ${event.meta ? `<div class="event-meta">${event.meta.map((x) => `<span>${x}</span>`).join('')}</div>` : ''}
          ${event.body}
        </article>
        ${event.video ? `<div><div class="visual-card product-visual"><iframe width="100%" height="455" src="${event.video}" title="${esc(event.title)} video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></div>` : mediaPlaceholder(event.placeholder || 'Event media placeholder', 'Replace with the original event image or video exported from Google Sites.')}
      </div>
    </div></section>
    ${cta('Connect with RobiChip', 'Arrange a technical, partnership, or design-in discussion with the team.')}`;

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

  const partnershipPage = () => `
    ${hero({
      eyebrow:'Partnership', title:'Build the Smart Motion Platform Together', zh:'與羅比芯共同打造智慧動力平台',
      lead:'RobiChip works with system companies, controller partners, packaging and material specialists, universities, developers, and investors.',
      sublead:'以應用需求與量測證據為起點，從技術對焦走向 validation plan、design-in package 與 pilot partnership。',
      actions:[{href:BD,label:'Discuss a partnership'},{href:CONTACT,label:'Technical discussion'}]
    })}
    ${section('Ecosystem', 'Four Ecosystem Collaboration Tracks', '四種生態系合作模式。', cards([
      {tag:'System Partners', title:'Robotics / UAV / Motion Systems', text:'機器人、無人機與智慧運動系統廠：以真實應用需求定義 Power SoC 與驗證平台。'},
      {tag:'Control Partners', title:'MCU & Control Board Collaboration', text:'MCU、控制器與控制板合作：將控制 know-how 對齊功率平台與客戶導入。'},
      {tag:'Technology Partners', title:'Packaging / Materials / Thermal', text:'封裝、材料、散熱與可靠度夥伴：共同建立高功率密度的可製造路徑。'},
      {tag:'Ecosystem', title:'Education & Developer Ecosystem', text:'教育、研究與開發者生態：透過 RobiDev、RobiLab 與開發內容擴張應用。'}
    ], 'four'), 'tint')}
    ${section('Co-development', 'Turn Your Control Know-How into Customer-Specific Silicon', '將控制技術與應用 know-how 轉化為客戶專屬的動力半導體平台。', `
      <div class="split">
        <div>${flow(['Initial Discussion', 'Technical Alignment', 'Validation Plan', 'Design-in Package', 'Pilot / Partnership'])}</div>
        <div class="callout"><h3>Collaboration inputs</h3><p>Application requirements, motor/control knowledge, packaging and thermal capabilities, manufacturing readiness, market access, validation resources, or strategic capital.</p></div>
      </div>`)}
    ${section('Strategic Collaboration', 'Swancor × RobiChip', 'Public recording of the May 14 strategic collaboration event.', `<div class="visual-card product-visual"><iframe width="100%" height="455" src="https://www.youtube.com/embed/RFt6A4kOUUs" title="Swancor and RobiChip strategic collaboration video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`, 'tint')}
    ${cta()}`;

  const joinPage = () => `
    ${hero({
      eyebrow:'Join Us', title:'Build Semiconductor-Defined Intelligent Machines', zh:'加入羅比芯，從 Power SoC 到機器人與無人機平台',
      lead:'Join a cross-domain team working across power semiconductors, motor control, advanced packaging, thermal design, robotics, UAVs, validation, and AI-assisted engineering.',
      sublead:'我們正在建立從元件、封裝、板級設計到機電系統驗證的完整工程路徑。',
      actions:[{href:'https://www.104.com.tw/company/1a2x6bmrw9',label:'View openings on 104'},{href:'mailto:contact@robichip.com?subject=Career%20at%20RobiChip',label:'Contact the team'}]
    })}
    ${section('Work at RobiChip', 'Cross-domain Problems, Measurable Results', 'We value engineers and collaborators who can connect a deep specialty to the complete intelligent-machine system.', cards([
      {title:'Power Electronics & GaN', text:'Power-stage architecture, device evaluation, switching, protection, and high-density design.'},
      {title:'Motor Control & Firmware', text:'FOC, sensing, embedded software, interfaces, tuning, and application behavior.'},
      {title:'Packaging & Thermal', text:'Hybrid substrate, package integration, heat flow, materials, reliability, and DFM.'},
      {title:'Robotics & UAV Validation', text:'Fixtures, instrumentation, thrust/torque/load testing, data analysis, and system integration.'},
      {title:'AI-assisted Engineering', text:'Knowledge systems, engineering agents, evaluation workflows, and human-in-the-loop review.'},
      {title:'Business & Ecosystem', text:'Customer discovery, technical partnerships, platform strategy, and international collaboration.'}
    ]), 'tint')}
    ${section('How We Work', 'From Question to Evidence to Platform', '', flow(['Define the Question', 'Build the Test', 'Measure the System', 'Make the Decision', 'Scale the Platform']))}
    ${cta('Interested in Building with RobiChip?', 'Visit the current openings page or contact the team with the role, project, or collaboration direction you would like to explore.')}`;

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
    '/': {title:'Power SoC Platform for Intelligent Machines', render:homePage},
    '/首頁': {title:'Power SoC Platform for Intelligent Machines', render:homePage},
    '/robisoc': {title:'RobiSoC', render:robisocPage},
    '/robidev': {title:'RobiDev', render:robidevPage},
    '/robithrust': {title:'RobiThrust', render:robithrustPage},
    '/robitorque': {title:'RobiTorque', render:robitorquePage},
    '/technology-insights': {title:'Technology Insights', render:insightsPage},
    '/robiagent': {title:'RobiAgent', render:robiagentPage},
    '/robilab': {title:'RobiLab', render:robilabPage},
    '/news-events': {title:'News & Events', render:newsPage},
    '/partnership': {title:'Partnership', render:partnershipPage},
    '/join-us': {title:'Join Us', render:joinPage},
    '/privacy-policy': {title:'Privacy Policy', render:privacyPage},
    '/private-policy': {title:'Private Policy', render:privacyPage, noindex:true}
  };

  Object.entries(articles).forEach(([route, article]) => {
    routeTable[route] = {title:article.title, render:() => articlePage(article)};
  });
  Object.entries(events).forEach(([route, event]) => {
    routeTable[route] = {title:event.title, render:() => eventPage(event)};
  });
  ['/work','/v1','/v2','/v3','/temp','/robigrip'].forEach((route) => {
    routeTable[route] = {title:'Legacy Draft Page', render:legacyPage, noindex:true};
  });

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
        <p>National Taiwan University of Science and Technology, International Building 11F, Room 1105<br>No. 43, Sec. 4, Keelung Rd., Da’an Dist., Taipei City, Taiwan</p>
        <p>台北市大安區基隆路四段 43 號<br>國立臺灣科技大學 國際大樓 11F 1105 室</p>
      </div>
      <div><h3>Platforms</h3><div class="footer-list"><a href="/robisoc">RobiSoC</a><a href="/robidev">RobiDev</a><a href="/robithrust">RobiThrust</a><a href="/robitorque">RobiTorque</a><a href="/robiagent">RobiAgent</a></div></div>
      <div><h3>Resources</h3><div class="footer-list"><a href="/technology-insights">Technology Insights</a><a href="/news-events">News & Events</a><a href="/robilab">RobiLab Validation</a><a href="https://www.youtube.com/channel/UCqp-CDSVPCX8TfYT_aVScpg">YouTube</a></div></div>
      <div><h3>Contact</h3><div class="footer-list"><a href="/partnership">Partnership</a><a href="mailto:contact@robichip.com">contact@robichip.com</a><a href="mailto:bd@robichip.com">bd@robichip.com</a><a href="tel:+886277015728">+886-2-7701-5728</a><a href="/join-us">Join Us</a><a href="/privacy-policy">Privacy Policy</a></div></div>
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

  site.innerHTML = `${nav()}<main id="main" class="page">${page.render()}</main>${footer()}`;

  if (BASE_PATH) {
    site.querySelectorAll('[href^="/"], [src^="/"]').forEach((element) => {
      const attribute = element.hasAttribute('href') ? 'href' : 'src';
      const value = element.getAttribute(attribute);
      if (value && !value.startsWith(`${BASE_PATH}/`)) {
        element.setAttribute(attribute, `${BASE_PATH}${value}`);
      }
    });
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
