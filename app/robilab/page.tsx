import type { Metadata } from "next";
import Link from "next/link";
import { OfficialLayout, PageHero, DesignInCta } from "../official-site";
import "../editorial.css";

export const metadata: Metadata = { title: "RobiLab | Measurement, Thermal & System Validation", description: "Motor-drive measurement, propulsion and actuator validation, thermal review and engineering reports for Design-in. 量測、熱分析與系統驗證服務。" };
const packages = [
  ["RobiLab Basic", "馬達驅動基本驗證", "Voltage, current, RPM, load behavior, board temperature rise and early bring-up review. Supports RobiDev Gen.1 evaluation.", "電壓、電流、轉速、負載行為、板級溫升與初期啟動檢視，支援 RobiDev Gen.1 評估。", "/robidev"],
  ["RobiLab Propulsion", "推進系統驗證", "Thrust, RPM, input power, gf/W, motor–driver–propeller matching and thermal observation. Supports RobiThrust validation.", "推力、轉速、輸入功率、gf/W、馬達與驅動器及螺旋槳匹配、熱觀察，支援 RobiThrust 驗證。", "/robithrust"],
  ["RobiLab Actuator", "致動器驗證", "Dynamic load, T–N / torque–speed curves, thermal response and control-interface review. Supports RobiTorque pilots.", "動態負載、T–N 轉矩—轉速曲線、熱響應與控制介面檢視，支援 RobiTorque pilot 驗證。", "/robitorque"],
  ["RobiLab Thermal", "熱路徑與系統散熱檢視", "Temperature rise, hotspots, cooling conditions and package-to-system thermal review, with RobiFlux / RobiAgent workflow linkage.", "溫升、熱點、冷卻條件與封裝至系統熱路徑檢視，銜接 RobiFlux／RobiAgent 工程流程。", "/#robiagent"],
];
const workflow = [
  ["Requirement", "需求定義", "Motor, load, voltage, target and constraints.", "馬達、負載、電壓、目標與限制。"],
  ["Test setup", "測試建置", "Fixture, RobiDev, sensors and power source.", "治具、RobiDev、感測器與電源。"],
  ["Data capture", "資料擷取", "Current, voltage, RPM, thrust and torque.", "電流、電壓、轉速、推力與轉矩。"],
  ["Thermal review", "熱行為檢視", "Temperature rise, hotspots and cooling conditions.", "溫升、熱點與冷卻條件。"],
  ["Engineering report", "工程報告", "Test conditions, observations, data and limits.", "測試條件、觀察、數據與限制。"],
  ["Recommendation", "導入建議", "Next tests, design changes and RobiSoC mapping.", "後續測試、設計調整與 RobiSoC 導入對應。"],
];
export default function RobiLabPage() {
  return <OfficialLayout>
    <PageHero eyebrow="ROBILAB · MEASUREMENT & SYSTEM VALIDATION" title="Measure the system. Make the next decision." titleZh="量測真實系統，推進下一個決策。" copy="Engineering validation for motor drives, UAV propulsion, robotic actuators and thermal paths." copyZh="支援馬達驅動、無人機推進、機器人致動與熱路徑的工程驗證。" aside={<>RobiDev → RobiThrust / RobiTorque → RobiSoC<br /><br />One measurement layer connects evaluation, pilot validation and Design-in.<br />以共通量測驗證層串起評估、pilot 驗證與設計導入。</>} />
    <section className="os-content os-lab-intro"><div className="os-shell">
      <figure className="os-lab-photo"><img src="/robilab-measurement-bench.png" alt="RobiLab 實測平台：馬達、轉矩量測、負載裝置與溫度量測設備" width="1280" height="1026" fetchPriority="high" /><figcaption>RobiLab measurement bench · 馬達驅動與熱行為實測平台</figcaption></figure>
      <div className="os-section-head"><div><p className="os-eyebrow">FROM ASSUMPTION TO EVIDENCE · 從假設到實證</p><h2>The measurement layer of RobiChip.<span>羅比芯平台的量測驗證層。</span></h2></div><p>Capture voltage, current, speed, thrust, torque and temperature under defined conditions. Relate board behavior to the complete system, then turn the findings into a reviewable engineering report.<span>在明確條件下量測電壓、電流、轉速、推力、轉矩與溫度；將板級行為對照系統表現，再轉化為可審查的工程報告。</span></p></div>
      <div className="os-actions"><Link className="os-button os-button-dark" href="/contact?intent=evaluation">Request validation support · 洽詢驗證服務 ↗</Link><Link className="os-button os-button-dark" href="/robidev">Start with RobiDev · 從評估開始 ↗</Link></div>
    </div></section>
    <section className="os-content os-editorial-tint" id="services"><div className="os-shell"><p className="os-eyebrow">FOUR SERVICE PACKAGES · 四項驗證服務</p><h2>Choose the question to validate.<span>從要驗證的工程問題開始。</span></h2><p className="os-content-lead">Each engagement defines the test objective, sample preparation and expected evidence before work begins.<span>每次合作先定義測試目標、樣品準備與預期證據，再進行量測。</span></p><div className="os-editorial-grid">{packages.map(([name, zh, copy, copyZh, href], index) => <article className="os-editorial-card" key={name}><p className="os-eyebrow">0{index + 1} · VALIDATION</p><h3>{name}<span>{zh}</span></h3><p>{copy}<span>{copyZh}</span></p><Link href={href}>Explore the platform · 查看對應平台 ↗</Link></article>)}</div></div></section>
    <section className="os-content"><div className="os-shell"><p className="os-eyebrow">ROBIAGENT → ROBILAB → DESIGN-IN</p><h2>Prepare, measure, review.<span>整理需求、實體量測、工程審查。</span></h2><p className="os-content-lead">RobiAgent supports technical questions, thermal pre-checks and layout review. RobiLab tests the assumptions; measured evidence then supports RobiDev evaluation, RobiThrust validation, RobiTorque pilots and RobiSoC Design-in.<span>RobiAgent 協助技術問題整理、熱預評估與 layout 檢視；RobiLab 實測工程假設，將證據回饋至 RobiDev、RobiThrust、RobiTorque 與 RobiSoC。</span></p><ol className="os-lab-workflow">{workflow.map(([name, zh, copy, copyZh], index) => <li key={name}><span className="os-eyebrow">0{index + 1}</span><h3>{name}<span>{zh}</span></h3><p>{copy}<span>{copyZh}</span></p></li>)}</ol></div></section>
    <section className="os-content os-editorial-tint"><div className="os-shell"><p className="os-eyebrow">REPORT DELIVERABLES · 報告交付</p><h2>Data with its context intact.<span>數據與測試脈絡，一併交付。</span></h2><div className="os-editorial-grid">{[
      ["Setup definition", "測試條件", "Motor / propeller / actuator, voltage, load profile, fixture, sensors, cooling and objective.", "馬達／螺旋槳／致動器、電壓、負載曲線、治具、感測器、冷卻條件與測試目標。"],
      ["Captured results", "量測結果", "Voltage, current, RPM, thrust, torque, power, temperature, efficiency indicators and time-domain observations.", "電壓、電流、轉速、推力、轉矩、功率、溫度、效率指標與時域觀察。"],
      ["Engineering findings", "工程發現", "Thermal behavior, load response, operating limits, motor–driver matching, system trade-offs and risk items.", "熱行為、負載響應、操作限制、馬達驅動匹配、系統取捨與風險項目。"],
      ["Next-step actions", "後續行動", "Follow-up tests, cooling or layout changes, RobiAgent pre-checks, RobiSoC mapping and pilot planning.", "後續測試、冷卻或佈局調整、RobiAgent 預評估、RobiSoC 導入與 pilot 規劃。"],
    ].map(([title, zh, copy, copyZh]) => <article className="os-editorial-card" key={title}><h3>{title}<span>{zh}</span></h3><p>{copy}<span>{copyZh}</span></p></article>)}</div><p className="os-note">Engineering validation and Design-in support. Results apply to the agreed test conditions; certification, production qualification and field performance require their own validation scope.<span>定位為工程驗證與設計導入支援；結果適用於約定測試條件，正式認證、量產資格與場域表現須另訂驗證範圍。</span></p></div></section>
    <section className="os-content"><div className="os-shell"><p className="os-eyebrow">CALIBRATION-AWARE VALIDATION · ROADMAP</p><h2>Bring simulation closer to measurement.<span>縮小模擬與實測之間的落差。</span></h2><p className="os-content-lead">Structured measurements can inform simulation boundary conditions, thermal-path assumptions, contact resistance, convection, power loss and load profiles. The direction is to support customer CAE / DOE workflows with application-specific validation data.<span>結構化量測資料可協助檢視模擬邊界、熱路徑假設、接觸熱阻、對流、功率損耗與負載曲線，以應用驗證資料支援客戶既有 CAE／DOE 流程。</span></p><p className="os-note">Simulation-to-measurement correlation is a project-based roadmap direction, not a standard online service or a claim of certified third-party CAE integration.<span>模擬與量測校準屬專案型路線規劃，目前並非標準線上服務，亦不代表取得第三方 CAE 官方整合或認證。</span></p></div></section>
    <DesignInCta title="Define your next validation question." titleZh="界定下一個需要實測的問題。" />
  </OfficialLayout>;
}
