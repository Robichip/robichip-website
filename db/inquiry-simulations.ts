// Fictional staff training fixtures. Never sent through the public email form.
export const SIMULATION_SOURCE = "/simulation/2026-09-15";
export const SIMULATION_INSERT = `INSERT INTO inquiries
  (intent, full_name, email, company, job_title, region, application,
   project_stage, preferred_window, time_zone, quantity, target_timing,
   details, consent, status, owner, follow_up_note, source_path)
  SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  WHERE NOT EXISTS (SELECT 1 FROM inquiries WHERE source_path = ? AND email = ?)`;

export const simulations = [
  { code: "01", name: "Alex Demo", company: "Demo UAV Lab", intent: "evaluation", application: "UAV / Drone propulsion", region: "Taiwan", stage: "Prototype / EVT", status: "new", details: "評估 UAV 推進控制器：48 V、700 W 目標，請比較 RobiSoC + RobiDev 導入方式。此為虛構需求，非產品保證或客戶承諾。", quantity: "10 prototype units", timing: "Q4 2026", window: "", zone: "", note: "待安排需求確認（模擬）。" },
  { code: "02", name: "Jamie Demo", company: "Demo Robotics Lab", intent: "quotation", application: "Robotics actuator / joint", region: "Japan", stage: "Pilot / design-in", status: "reviewing", details: "機器狗關節專案，模擬詢價 RC50 功率平台及共用控制板整合；請區分 NRE、樣品及批量價格。", quantity: "20 prototypes; 1200 units/year", timing: "Pilot in Q1 2027", window: "", zone: "", note: "待技術澄清後報價（模擬）。" },
  { code: "03", name: "Morgan Demo", company: "Demo Motion Systems", intent: "meeting", application: "Motor drive", region: "Germany", stage: "Concept / architecture", status: "contacted", details: "工業馬達系列化開發，保留上層軟體與通訊介面，希望讨论不同功率板共用控制架構。", quantity: "", timing: "", window: "2026-10-06, 14:00–15:00 Taipei (simulation only)", zone: "UTC+8 / Taipei", note: "已聯繫、待確認會議（僅模擬，未發送邀請）。" },
  { code: "04", name: "Taylor Demo", company: "Demo Channel Partners", intent: "partnership", application: "Technology / channel partnership", region: "USA", stage: "Concept / architecture", status: "qualified", details: "模擬北美通路合作：評估 robotics 與 UAV 客戶共同開發、技術支援分工及展示套件。", quantity: "", timing: "Q1 2027", window: "", zone: "", note: "合作需求初步符合，待內部評估（模擬）。" },
  { code: "05", name: "Casey Demo", company: "Demo Thermal Lab", intent: "evaluation", application: "Thermal or validation service", region: "Taiwan", stage: "Validation / DVT", status: "reviewing", details: "熱驗證服務模擬案：比較自然對流與風冷，需先確認環境溫度、連續負載及量測方式。", quantity: "3 test assemblies", timing: "October 2026", window: "", zone: "", note: "待補充測試條件（模擬）。" },
  { code: "06", name: "Riley Demo", company: "Demo Power Modules", intent: "quotation", application: "Power module / Power SoC", region: "Singapore", stage: "Prototype / EVT", status: "closed", details: "功率模組詢價模擬案，專案因虛構時程調整暫緩，用於測試結案資料查詢與 Excel 匯出。", quantity: "50 samples", timing: "Deferred (simulation)", window: "", zone: "", note: "模擬結案：時程延後，沒有真實商機或營收。" },
] as const;

export function simulationValues(row: typeof simulations[number]) {
  const email = `robichip-sim-${row.code}@example.com`;
  return [row.intent, `[TEST ${row.code}] ${row.name}`, email,
    `[TEST／模擬] ${row.company}`, "Demo Project Lead", row.region,
    row.application, row.stage, row.window, row.zone, row.quantity, row.timing,
    `[TEST／模擬資料；非真實客戶] ${row.details}`, 0, row.status, "Demo BD",
    row.note, SIMULATION_SOURCE, SIMULATION_SOURCE, email];
}
