import Link from "next/link";
import type { ApplicationRecord } from "./official-data";
import { DesignInCta, OfficialLayout, PageHero } from "./official-site";

export default function ApplicationDetail({ application }: { application: ApplicationRecord }) {
  return (
    <OfficialLayout>
      <PageHero eyebrow={application.eyebrow} title={application.title} titleZh={application.titleZh} copy={application.summary} copyZh={application.summaryZh} aside={<><strong>APPLICATION QUESTION · 應用問題</strong><br />{application.challenge}<br /><br />{application.challengeZh}</>} />
      <section className="os-content">
        <div className="os-shell os-detail-grid">
          <figure className="os-detail-media"><img src={application.image} alt={application.imageAlt} /><figcaption>Application evidence and system context · 應用實證與系統情境</figcaption></figure>
          <div><p className="os-eyebrow">FROM QUESTION TO SYSTEM · 從問題到系統</p><h2>Three layers into the application.<span>三個層級，進入應用。</span></h2><p className="os-content-lead">Start at the layer that matches today’s engineering uncertainty. Preserve a path toward deeper integration without overstating maturity.<span>從當前工程不確定性所在的層級開始，保留深化整合的路徑，同時維持成熟度邊界。</span></p>
            <div className="os-step-list">{application.steps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><div><h3>{step.title}<span>{step.titleZh}</span></h3><p>{step.copy}<span>{step.copyZh}</span></p></div></article>)}</div>
            <div className="os-actions">{application.links.map((link, index) => link.href.startsWith("http") ? <a key={link.href} className={`os-button ${index === 0 ? "os-button-dark" : "os-button-primary"}`} href={link.href}>{link.label} ↗</a> : <Link key={link.href} className={`os-button ${index === 0 ? "os-button-dark" : "os-button-primary"}`} href={link.href}>{link.label} ↗</Link>)}</div>
          </div>
        </div>
      </section>
      <DesignInCta title={`Build the ${application.title} case around evidence.`} titleZh={`以實證建立${application.titleZh}案件。`} />
    </OfficialLayout>
  );
}

