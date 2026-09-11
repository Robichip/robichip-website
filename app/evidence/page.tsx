import type { Metadata } from "next";
import Link from "next/link";
import { DesignInCta, OfficialLayout, PageHero } from "../official-site";

export const metadata: Metadata = { title: "Evidence | RobiChip", description: "Measured propulsion, thermal and field-validation evidence with visible test and maturity boundaries." };

export default function EvidencePage() {
  return <OfficialLayout>
    <PageHero eyebrow="EVIDENCE · 實證" title="Engineering claims need context." titleZh="工程主張，需要完整脈絡。" copy="Review the operating point, method, thermal path and maturity boundary behind each result." copyZh="檢視每項結果背後的工作點、方法、熱路徑與成熟度邊界。" aside={<>Bench evidence answers a defined engineering question. It does not automatically become an endurance, qualification or production claim.<br /><br />台架證據回答特定工程問題，不會自動等同耐久、認證或量產聲明。</>} />
    <section className="os-content"><div className="os-shell"><p className="os-eyebrow">PROPULSION · 推進</p><h2>Measured on the bench.<span>在台架上量測。</span></h2><p className="os-content-lead">RobiThrust connects motor, controller, propeller and thermal behavior at a documented operating point.<span>RobiThrust 在文件化工作點下，串聯馬達、控制器、螺旋槳與熱行為。</span></p>
      <div className="os-evidence-feature" style={{marginTop: 42}}><figure><img src="/semicon-2026/robithrust-bench.png" alt="RobiThrust propulsion validation bench" /><figcaption>RobiThrust · Bench / EVT evidence</figcaption></figure><div><p className="os-eyebrow">SELECTED BENCH OBSERVATIONS</p><h3>Evidence before architecture lock.<span>架構定版前，先建立證據。</span></h3><div className="os-metric-grid"><div><strong>11.17</strong><span>gf/W average<br />平均效率</span></div><div><strong>+6.3%</strong><span>vs. baseline<br />相較基準</span></div><div><strong>1.6 kgf</strong><span>@ 240 W<br />台架結果</span></div><div><strong>47°C</strong><span>measured T1<br />T1 實測</span></div></div><p className="os-scope-note">Results shown are tied to their stated bench conditions. Request the relevant test context before comparison.<span>所示結果皆綁定其台架條件；比較前請先取得相關測試脈絡。</span></p><Link className="os-inline-link" href="/robithrust">Explore RobiThrust ↗</Link></div></div>
    </div></section>
    <section className="os-content" style={{background: "#e7eff4"}}><div className="os-shell"><p className="os-eyebrow">SILICON TO HEAT PATH · 晶片至熱路徑</p><h2>Thermal behavior is architectural.<span>熱表現是架構問題。</span></h2><p className="os-content-lead">The public multi-path principle combines a thermally coupled conduction route with a guided-fluid convection route. Patent status and final claim scope remain subject to prosecution.<span>公開的 multi-path 原則結合熱耦合傳導路徑與導引流體對流路徑；專利狀態與最終權利範圍仍以審查程序為準。</span></p><div className="os-overview-grid">
      <article className="os-overview-card"><img src="/semicon-2026/thermal-active.png" alt="Fan-cooled thermal observation" /><p className="os-eyebrow">FAN COOLING</p><h3>41.6°C<span>有風扇冷卻</span></h3><p>Observed under the displayed test configuration; not a universal thermal rating.</p></article>
      <article className="os-overview-card"><img src="/semicon-2026/thermal-passive.png" alt="No-fan thermal observation" /><p className="os-eyebrow">NO FAN</p><h3>87°C<span>無風扇</span></h3><p>Comparison observation under its stated configuration and measurement context.</p></article>
      <article className="os-overview-card"><img src="/virtual-booth/swancor-inside-panel.png" alt="Swancor Inside Power SoC exhibit" /><p className="os-eyebrow">FIELD VALIDATION</p><h3>Swancor Inside<span>材料導入實證</span></h3><p>Physical exhibit connecting advanced material, package and high-power-density system conversations.</p></article>
    </div></div></section>
    <section className="os-content"><div className="os-shell"><p className="os-eyebrow">FIELD EVIDENCE · 公開場域</p><h2>From exhibit to next decision.<span>從展示走向下一個決策。</span></h2><div className="os-resource-list"><article><h3>TAIROS 2026</h3><p>Two partner booths connected materials, motion, joint torque and UAV propulsion validation.</p><Link href="/2026-TAIROS">View TAIROS recap ↗</Link></article><article><h3>SEMICON Taiwan 2026</h3><p>Semiconductor-defined motion presented through technical and investor-facing sessions.</p><Link href="/semicon-taiwan-2026">View SEMICON post-show ↗</Link></article></div></div></section>
    <DesignInCta title="Use evidence to define the next engineering gate." titleZh="用實證界定下一個工程關卡。" />
  </OfficialLayout>;
}

