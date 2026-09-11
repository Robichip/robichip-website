import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Taiwan Tech Startup Connect 2026 | RobiChip",
  description:
    "Meet RobiChip at Taiwan Tech Startup Connect on 21 October 2026, hosted by NTUST Incubation.",
};

const showcase = [
  {
    number: "01",
    title: "RobiSoC",
    chinese: "高功率密度馬達驅動 Power SoC",
    copy: "A compact power-control platform for intelligent machines, integrating motor control, protection, thermal engineering and advanced packaging.",
    href: "/robisoc",
  },
  {
    number: "02",
    title: "RobiTorque",
    chinese: "機器人關節與致動器驗證",
    copy: "A validation path for robotic joint systems—connecting the motor, driver, encoder, mechanical interface and evidence required for design-in decisions.",
    href: "/robitorque",
  },
  {
    number: "03",
    title: "RobiThrust",
    chinese: "無人系統推進驗證",
    copy: "A propulsion validation platform that connects motor, drive, propeller and operating data for UAV and unmanned-system applications.",
    href: "/robithrust",
  },
];

export default function TaiwanTechStartupConnectPage() {
  return (
    <main className="ttsc-page">
      <header className="ttsc-header">
        <div className="ttsc-shell ttsc-header-inner">
          <Link href="/" className="ttsc-brand" aria-label="Return to RobiChip VIP home">
            <img src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" />
          </Link>
          <nav aria-label="Event navigation">
            <a href="#showcase">RobiChip Showcase</a>
            <a href="#visit">Visit / Arrange a Meeting</a>
          </nav>
        </div>
      </header>

      <section className="ttsc-hero">
        <div className="ttsc-orbit ttsc-orbit-one" aria-hidden="true" />
        <div className="ttsc-orbit ttsc-orbit-two" aria-hidden="true" />
        <div className="ttsc-shell ttsc-hero-grid">
          <div>
            <p className="ttsc-kicker">NTUST INCUBATION · INVESTOR &amp; INDUSTRY EXCHANGE</p>
            <p className="ttsc-event-name">2026 Taiwan Tech Startup Connect</p>
            <h1>Meet RobiChip at Taiwan Tech.</h1>
            <p className="ttsc-hero-cn">10 月 21 日，與投資人、產業夥伴及技術決策者，面對面探索智慧機器的動力半導體平台。</p>
            <p className="ttsc-hero-copy">RobiChip will present its Power SoC platform and system-validation approach for robotics and unmanned systems—turning motor-drive integration into a clear, credible design-in path.</p>
            <div className="ttsc-actions">
              <a className="ttsc-button primary" href="#visit">Plan Your Visit <span aria-hidden="true">↗</span></a>
              <a className="ttsc-button secondary" href="https://dev.robichip.com/contact?intent=meeting">Arrange a Meeting <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <aside className="ttsc-facts" aria-label="Event details">
            <div className="ttsc-date"><span>WEDNESDAY</span><strong>10.21</strong><small>2026 · 13:00–17:00</small></div>
            <dl>
              <div><dt>Venue</dt><dd>International Building 1F<br />Taiwan Tech Gallery · Zone B</dd></div>
              <div><dt>Format</dt><dd>Enterprise Showcase<br />Investor &amp; Industry Exchange</dd></div>
              <div><dt>Hosted by</dt><dd>NTUST Business Incubation Center<br />國立臺灣科技大學創新育成中心</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="ttsc-intro">
        <div className="ttsc-shell ttsc-intro-grid">
          <p className="ttsc-section-label">WHY THIS CONNECT</p>
          <div>
            <h2>A focused room for the next technical and investment conversation.</h2>
            <p>Startup Connect brings enterprise booths, product demonstrations and informal discussion into one afternoon. Meet the RobiChip team to discuss applications, system requirements and the practical route from evaluation to design-in.</p>
            <p className="ttsc-cn-copy">本活動以企業專屬攤位展示與投資交流為核心。歡迎現場討論應用需求、系統規格，以及從評估、驗證到設計導入的下一步。</p>
          </div>
        </div>
      </section>

      <section className="ttsc-showcase" id="showcase">
        <div className="ttsc-shell">
          <p className="ttsc-section-label light">AT THE ROBICHIP BOOTH</p>
          <h2>Three connected layers. One Power SoC platform.</h2>
          <div className="ttsc-showcase-grid">
            {showcase.map((item) => (
              <article className="ttsc-showcase-card" key={item.title}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p className="ttsc-card-cn">{item.chinese}</p>
                <p>{item.copy}</p>
                <a href={item.href}>Explore platform <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ttsc-visit" id="visit">
        <div className="ttsc-shell ttsc-visit-grid">
          <div>
            <p className="ttsc-section-label">VISIT ROBICHIP</p>
            <h2>Come by the booth—or set the conversation in advance.</h2>
            <p>Walk-ins are welcome during the event. For a focused discussion with the right technical or business owner, use the Design-in workspace to leave your contact and topic in advance.</p>
            <p className="ttsc-note">The organiser&apos;s final programme and on-site arrangements remain subject to confirmation.</p>
          </div>
          <div className="ttsc-visit-actions">
            <a className="ttsc-button primary" href="https://dev.robichip.com/contact?intent=meeting">Arrange a Meeting <span aria-hidden="true">↗</span></a>
            <a className="ttsc-button text" href="https://vip.robichip.com">Return to RobiChip VIP <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <footer className="ttsc-footer">
        <div className="ttsc-shell"><span>ROBICHIP TECHNOLOGY CO., LTD.</span><span>Power SoC Platform for Intelligent Machines</span></div>
      </footer>
    </main>
  );
}
