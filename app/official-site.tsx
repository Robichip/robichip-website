import type { ReactNode } from "react";
import Link from "next/link";

export function OfficialHeader() {
  return (
    <>
      <div className="os-ribbon">
        <Link href="/taiwan-tech-startup-connect">UP NEXT · OCT 21 · Taiwan Tech Startup Connect <span>↗</span></Link>
        <Link href="/news-events">Evidence &amp; events · 實證與活動</Link>
      </div>
      <header className="os-header">
        <div className="os-shell os-header-inner">
          <Link className="os-brand" href="/" aria-label="RobiChip home">
            <img src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" />
          </Link>
          <nav className="os-nav" aria-label="Main navigation">
            <Link href="/applications">Applications <small>應用</small></Link>
            <Link href="/platform">Platform <small>平台</small></Link>
            <Link href="/evidence">Evidence <small>實證</small></Link>
            <Link href="/resources">Resources <small>資源</small></Link>
            <Link href="/company">Company <small>公司</small></Link>
          </nav>
          <a className="os-button os-button-primary os-header-cta" href="https://dev.robichip.com">Start Design-in <span>↗</span></a>
          <details className="os-mobile-menu">
            <summary aria-label="Open navigation">Menu</summary>
            <div>
              <Link href="/applications">Applications · 應用</Link>
              <Link href="/platform">Platform · 平台</Link>
              <Link href="/evidence">Evidence · 實證</Link>
              <Link href="/resources">Resources · 資源</Link>
              <Link href="/company">Company · 公司</Link>
              <a href="https://dev.robichip.com">Start Design-in ↗</a>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}

export function OfficialFooter() {
  return (
    <footer className="os-footer">
      <div className="os-shell os-footer-grid">
        <div className="os-footer-brand">
          <Link className="os-brand" href="/"><img src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" /></Link>
          <p>Power SoC Platform for Intelligent Machines<br />智慧機器的 Power SoC 平台</p>
          <a className="os-incubated" href="https://www.lighthouse-lmc.com" target="_blank" rel="noreferrer"><strong>Incubated by LMC ↗</strong><span>由 Lighthouse Management Co., Ltd. 孵化支持</span></a>
        </div>
        <div><h3>Explore · 探索</h3><Link href="/applications">Applications</Link><Link href="/platform">Platform</Link><Link href="/evidence">Evidence</Link><Link href="/resources">Resources</Link></div>
        <div><h3>Company · 公司</h3><Link href="/company">About RobiChip</Link><Link href="/partnership">Partnership</Link><Link href="/news-events">News &amp; Events</Link><a href="https://profile.104.com.tw/company/1a2x6bnk3q">Careers ↗</a></div>
        <div><h3>Connect · 聯絡</h3><a href="https://dev.robichip.com">Start Design-in ↗</a><Link href="/contact?intent=meeting">Book a Meeting</Link><a href="https://www.linkedin.com/company/robichip/?viewAsMember=true" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.youtube.com/channel/UCqp-CDSVPCX8TfYT_aVScpg" target="_blank" rel="noreferrer">YouTube ↗</a></div>
      </div>
      <div className="os-shell os-footer-bottom"><span>© 2026 RobiChip Technology Co., Ltd.</span><span>Application-led · Evidence-backed · Design-in ready</span></div>
    </footer>
  );
}

export function OfficialLayout({ children }: { children: ReactNode }) {
  return <main className="official-site"><OfficialHeader />{children}<OfficialFooter /></main>;
}

export function PageHero({ eyebrow, title, titleZh, copy, copyZh, aside }: { eyebrow: string; title: string; titleZh: string; copy: string; copyZh: string; aside?: ReactNode }) {
  return (
    <section className="os-page-hero">
      <div className="os-shell os-page-hero-grid">
        <div><p className="os-eyebrow">{eyebrow}</p><h1>{title}<span>{titleZh}</span></h1><p className="os-lead">{copy}<span>{copyZh}</span></p></div>
        {aside && <aside>{aside}</aside>}
      </div>
    </section>
  );
}

export function DesignInCta({ title = "Bring the application. Define the next gate.", titleZh = "帶著應用需求，界定下一個決策關卡。" }: { title?: string; titleZh?: string }) {
  return (
    <section className="os-final-cta">
      <div className="os-shell"><p className="os-eyebrow">START A DESIGN-IN CONVERSATION · 開始設計導入</p><h2>{title}<span>{titleZh}</span></h2><p>Start with the system, constraint or validation question. RobiChip will help identify the useful scope before a case is opened.<span>從系統、限制條件或驗證問題開始；案件啟動前，先界定最有效的合作範圍。</span></p><div className="os-actions"><a className="os-button os-button-primary" href="https://dev.robichip.com">Choose the scope <span>↗</span></a><Link className="os-button os-button-ghost" href="/contact?intent=meeting">Book a meeting</Link></div></div>
    </section>
  );
}

