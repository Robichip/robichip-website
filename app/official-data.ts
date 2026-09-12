export type ApplicationRecord = {
  slug: string;
  title: string;
  titleZh: string;
  eyebrow: string;
  summary: string;
  summaryZh: string;
  challenge: string;
  challengeZh: string;
  image: string;
  imageAlt: string;
  steps: Array<{ title: string; titleZh: string; copy: string; copyZh: string }>;
  links: Array<{ label: string; href: string }>;
};

export type PlatformRecord = {
  slug: string;
  title: string;
  titleZh: string;
  status: string;
  role: string;
  roleZh: string;
  summary: string;
  summaryZh: string;
  image: string;
  imageAlt: string;
  capabilities: Array<{ title: string; titleZh: string; copy: string; copyZh: string }>;
  note: string;
  noteZh: string;
};

export const applications: ApplicationRecord[] = [
  {
    slug: "uav-propulsion",
    title: "UAV Propulsion",
    titleZh: "無人機推進",
    eyebrow: "THRUST · EFFICIENCY · THERMAL",
    summary: "Move from controller selection to a measured, high-thrust-density propulsion path.",
    summaryZh: "從控制器選型走向可量測的高推力密度推進路徑。",
    challenge: "Propulsion performance depends on the motor, controller, propeller, thermal path and operating point working as one system.",
    challengeZh: "推進效能取決於馬達、控制器、螺旋槳、熱路徑與工作點能否協同運作。",
    image: "/semicon-2026/robithrust-bench.png",
    imageAlt: "RobiThrust UAV propulsion validation bench",
    steps: [
      { title: "Controller Design-in", titleZh: "控制器導入", copy: "Define control, power, protection and thermal boundaries before the propulsion architecture is locked.", copyZh: "在推進架構定版前，先界定控制、功率、保護與熱邊界。" },
      { title: "Motor–Controller Co-design", titleZh: "馬達—控制器協同設計", copy: "Match electrical behavior and system constraints, then measure thrust, efficiency and temperature.", copyZh: "匹配電性與系統限制，再量測推力、效率與溫度。" },
      { title: "Flight-system Validation", titleZh: "飛行系統驗證", copy: "Bring controller, motor and propeller interfaces into a repeatable validation path.", copyZh: "將控制器、馬達與螺旋槳介面納入可重複的驗證路徑。" },
    ],
    links: [
      { label: "Explore RobiThrust", href: "/robithrust" },
      { label: "Start UAV Design-in", href: "https://dev.robichip.com" },
    ],
  },
  {
    slug: "robotics-actuation",
    title: "Robotics Actuation",
    titleZh: "機器人關節與致動",
    eyebrow: "TORQUE · CONTROL · INTEGRATION",
    summary: "Structure the path from power stage to motor–driver co-design and complete actuator integration.",
    summaryZh: "建立從功率級、馬達—驅動協同設計到完整致動器整合的路徑。",
    challenge: "A compact joint must balance torque, thermal behavior, sensing, mechanics and upper-level control without multiplying interfaces.",
    challengeZh: "緊湊關節必須同時平衡扭矩、熱、感測、機構與上層控制，並避免介面持續增加。",
    image: "/virtual-booth/robitorque-fukuta.png",
    imageAlt: "RobiTorque and motor integration exhibit",
    steps: [
      { title: "Driver / Power Stage", titleZh: "驅動器／功率級", copy: "Start with the voltage, current, switching, sensing and protection envelope.", copyZh: "先界定電壓、電流、開關、感測與保護範圍。" },
      { title: "Motor + Driver + Encoder", titleZh: "馬達＋驅動＋編碼器", copy: "Co-design the electrical and control interfaces around the target joint behavior.", copyZh: "依目標關節行為協同設計電性與控制介面。" },
      { title: "Joint / Actuator Subsystem", titleZh: "關節／致動器子系統", copy: "Validate the complete motion module as a system-level path, not a collection of parts.", copyZh: "以系統層級驗證完整運動模組，而非僅驗證零件集合。" },
    ],
    links: [
      { label: "Explore RobiTorque", href: "/robitorque" },
      { label: "Start Robotics Design-in", href: "https://dev.robichip.com" },
    ],
  },
  {
    slug: "intelligent-motion",
    title: "Intelligent Motion Platform",
    titleZh: "智慧運動平台",
    eyebrow: "PLATFORM · VARIANTS · SCALE",
    summary: "Reuse one governed control architecture across multiple power classes and product variants.",
    summaryZh: "以同一套受控架構，支援不同功率級與產品變體。",
    challenge: "Industrial teams often share MCU and communication logic while carrying too many low-volume power-board variants.",
    challengeZh: "工業團隊常共用 MCU 與通訊邏輯，卻必須維護過多低量、多樣的功率板版本。",
    image: "/semicon-2026/robisoc-board.png",
    imageAlt: "RobiChip compact Power SoC board",
    steps: [
      { title: "Configured Platform", titleZh: "平台配置", copy: "Select the power class and interfaces while preserving a common platform logic.", copyZh: "選擇功率級與介面，同時保留共通平台邏輯。" },
      { title: "Semi-custom Module", titleZh: "半客製模組", copy: "Adapt mechanics, thermal design and customer-side control interfaces.", copyZh: "調整機構、熱設計與客戶端控制介面。" },
      { title: "Custom SoC / Package", titleZh: "客製 SoC／封裝", copy: "Move into customer-specific silicon only after the system boundaries are supported by evidence.", copyZh: "待系統邊界具備實證後，再進入客戶專屬晶片。" },
    ],
    links: [
      { label: "Explore RobiSoC", href: "/robisoc" },
      { label: "Start Platform Discussion", href: "https://dev.robichip.com" },
    ],
  },
];

export const platforms: PlatformRecord[] = [
  {
    slug: "robisoc", title: "RobiSoC", titleZh: "Power SoC 平台", status: "ENGINEERING SAMPLE",
    role: "The compact power-intelligence core.", roleZh: "緊湊的動力智慧核心。",
    summary: "RobiSoC connects motor control, three-phase power, sensing, protection, packaging and thermal design as one governed platform.",
    summaryZh: "RobiSoC 將馬達控制、三相功率、感測、保護、封裝與熱設計整合為受控平台。",
    image: "/semicon-2026/robisoc-architecture.png", imageAlt: "RobiSoC integrated package architecture",
    capabilities: [
      { title: "Prototype up to 700 W", titleZh: "原型最高 700 W", copy: "Output demonstrated under documented prototype test conditions.", copyZh: "於文件化原型測試條件下展示的輸出。" },
      { title: "Target 1 kW", titleZh: "目標 1 kW", copy: "Architecture target pending engineering validation—not a production rating.", copyZh: "尚待工程驗證的架構目標，並非量產額定值。" },
      { title: "Power + control + thermal", titleZh: "功率＋控制＋熱", copy: "Treat package and heat extraction as part of the semiconductor conversation.", copyZh: "將封裝與散熱視為半導體設計的一部分。" },
    ],
    note: "Architecture targets, prototype results and final qualification limits are stated separately.",
    noteZh: "架構目標、原型結果與最終認證限制分別陳述。",
  },
  {
    slug: "robidev", title: "RobiDev", titleZh: "評估與開發平台", status: "AVAILABLE NOW",
    role: "Evaluate before custom design becomes expensive.", roleZh: "在客製成本放大前完成評估。",
    summary: "RobiDev provides a practical motor-drive evaluation layer for architecture, firmware, interface and Design-in decisions.",
    summaryZh: "RobiDev 提供馬達驅動評估層，支援架構、韌體、介面與 Design-in 決策。",
    image: "/semicon-2026/robisoc-board.png", imageAlt: "RobiDev evaluation board",
    capabilities: [
      { title: "Developer Evaluation", titleZh: "開發者評估", copy: "Bring the motor, load and operating requirement into a controlled test path.", copyZh: "將馬達、負載與操作需求帶入受控測試路徑。" },
      { title: "Architecture Decisions", titleZh: "架構決策", copy: "Compare interfaces and power classes before freezing the customer design.", copyZh: "在客戶設計定版前比較介面與功率級。" },
      { title: "Partner Enablement", titleZh: "夥伴賦能", copy: "Create a shared evidence base across system, motor and semiconductor teams.", copyZh: "在系統、馬達與半導體團隊間建立共通證據。" },
    ],
    note: "Evaluation availability does not imply that every custom configuration is production-qualified.",
    noteZh: "可評估不代表所有客製配置皆已完成量產認證。",
  },
  {
    slug: "robithrust", title: "RobiThrust", titleZh: "UAV 推進驗證平台", status: "BENCH / EVT EVIDENCE",
    role: "Measure propulsion before locking the flight system.", roleZh: "飛行系統定版前，先量測推進表現。",
    summary: "RobiThrust connects motor, controller, propeller, load and thermal behavior into a reviewable UAV propulsion dataset.",
    summaryZh: "RobiThrust 將馬達、控制器、螺旋槳、負載與熱行為串成可檢視的 UAV 推進資料。",
    image: "/semicon-2026/robithrust-bench.png", imageAlt: "RobiThrust propulsion validation system",
    capabilities: [
      { title: "Thrust / power", titleZh: "推力／功率", copy: "Review useful operating bands instead of relying on a single headline rating.", copyZh: "檢視實用工作區間，而非只看單一峰值規格。" },
      { title: "Motor–propeller matching", titleZh: "馬達—槳葉匹配", copy: "Compare combinations under the relevant electrical and mechanical load.", copyZh: "在相關電性與機械負載下比較組合。" },
      { title: "Thermal observation", titleZh: "熱觀察", copy: "Connect temperature behavior to the operating point and cooling path.", copyZh: "將溫度行為連結到工作點與冷卻路徑。" },
    ],
    note: "Bench and EVT results are test-condition evidence—not endurance, qualification or mass-production claims.",
    noteZh: "台架與 EVT 結果為特定測試條件證據，非耐久、認證或量產聲明。",
  },
  {
    slug: "robitorque", title: "RobiTorque", titleZh: "機器人關節驗證路徑", status: "VALIDATION PATH",
    role: "Bring actuator decisions into one system conversation.", roleZh: "將致動器決策整合為一個系統議題。",
    summary: "RobiTorque structures the path from driver and power stage to motor, encoder, reducer and complete joint integration.",
    summaryZh: "RobiTorque 建立從驅動與功率級，到馬達、編碼器、減速機與完整關節整合的路徑。",
    image: "/virtual-booth/robitorque-fukuta.png", imageAlt: "RobiTorque joint and motor integration platform",
    capabilities: [
      { title: "Electrical envelope", titleZh: "電性範圍", copy: "Align voltage, current, sensing, protection and switching behavior.", copyZh: "對齊電壓、電流、感測、保護與開關行為。" },
      { title: "Motion interfaces", titleZh: "運動介面", copy: "Coordinate motor, encoder, reducer and upper-level control requirements.", copyZh: "協調馬達、編碼器、減速機與上層控制需求。" },
      { title: "Joint roadmap", titleZh: "關節路線圖", copy: "Progress from evaluation to a controlled subsystem Design-in.", copyZh: "由評估逐步進入受控的子系統 Design-in。" },
    ],
    note: "RobiTorque is presented as a validation and co-design path, not as an equivalent maturity claim to RobiThrust.",
    noteZh: "RobiTorque 定位為驗證與協同設計路徑，不宣稱與 RobiThrust 具相同成熟度。",
  },
  {
    slug: "robilab", title: "RobiLab", titleZh: "工程量測服務", status: "ENGINEERING SERVICE",
    role: "Turn an engineering question into evidence.", roleZh: "將工程問題轉化為證據。",
    summary: "RobiLab scopes propulsion, motion, electrical and thermal questions into a measured review package for the next decision gate.",
    summaryZh: "RobiLab 將推進、運動、電性與熱問題整理為可量測、可審查的決策資料。",
    image: "/virtual-booth/robithrust-validation-rigs.png", imageAlt: "RobiChip engineering validation rigs",
    capabilities: [
      { title: "Test definition", titleZh: "測試定義", copy: "Define the operating conditions, instrumentation and comparison baseline.", copyZh: "定義操作條件、量測工具與比較基準。" },
      { title: "Measured dataset", titleZh: "量測資料", copy: "Capture the data needed for the specific architecture decision.", copyZh: "取得特定架構決策所需的資料。" },
      { title: "Engineering review", titleZh: "工程審查", copy: "Interpret results with the application and Design-in boundary visible.", copyZh: "在應用與 Design-in 邊界清楚的前提下解讀結果。" },
    ],
    note: "Scope, method and deliverables are defined per engagement.",
    noteZh: "合作範圍、方法與交付內容依個案定義。",
  },
];

export const platformBySlug = Object.fromEntries(platforms.map((item) => [item.slug, item]));
export const applicationBySlug = Object.fromEntries(applications.map((item) => [item.slug, item]));

