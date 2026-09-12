import { DesignInCta, OfficialLayout, PageHero } from "./official-site";
import type { PlatformRecord } from "./official-data";

export default function PlatformDetail({ platform }: { platform: PlatformRecord }) {
  return (
    <OfficialLayout>
      <PageHero eyebrow={`PLATFORM · ${platform.status}`} title={platform.title} titleZh={platform.titleZh} copy={platform.role} copyZh={platform.roleZh} aside={<>{platform.summary}<br /><br />{platform.summaryZh}</>} />
      <section className="os-content">
        <div className="os-shell os-detail-grid">
          <figure className="os-detail-media"><img src={platform.image} alt={platform.imageAlt} /><figcaption>{platform.title} · application and Design-in context</figcaption></figure>
          <div><span className="os-status-pill">{platform.status}</span><h2>A platform layer with a clear job.<span>每一層平台，都有明確任務。</span></h2><p className="os-content-lead">{platform.summary}<span>{platform.summaryZh}</span></p>
            <div className="os-step-list">{platform.capabilities.map((capability, index) => <article key={capability.title}><span>0{index + 1}</span><div><h3>{capability.title}<span>{capability.titleZh}</span></h3><p>{capability.copy}<span>{capability.copyZh}</span></p></div></article>)}</div>
            <p className="os-note">{platform.note}<span>{platform.noteZh}</span></p>
          </div>
        </div>
      </section>
      <DesignInCta title={`Evaluate where ${platform.title} enters the system.`} titleZh={`確認 ${platform.title} 應從系統哪一層導入。`} />
    </OfficialLayout>
  );
}

