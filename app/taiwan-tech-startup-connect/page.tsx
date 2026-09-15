import type { Metadata } from "next";
import Link from "next/link";
import "./startup-connect.css";

export const metadata: Metadata = {
  title: "2026 Taiwan Tech Startup Connect | RobiChip",
  description: "2026 Taiwan Tech Startup Connect 將於 10 月 21 日在國際大樓 1F 舉行，以企業專屬攤位展示與投資交流，串連投資人、產業夥伴及企業代表。",
};

const connections = [
  { number: "01", english: "DISCOVER", title: "認識企業與產品", copy: "走進企業專屬攤位，在精緻而集中的展示空間裡，快速掌握團隊、技術、產品與品牌。" },
  { number: "02", english: "CONNECT", title: "遇見產業夥伴", copy: "與投資人、產業夥伴及企業代表自由交流，從近況分享開始，找到值得繼續的對話。" },
  { number: "03", english: "CREATE", title: "開啟合作可能", copy: "讓產品需求、技術能力與市場機會在現場交會，建立後續合作、投資與資源串連的起點。" },
];

export default function TaiwanTechStartupConnectPage() {
  return (
    <main className="connect-page" id="top">
      <header className="connect-header">
        <Link href="/" className="connect-brand" aria-label="回到 RobiChip 首頁">
          <img src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" />
        </Link>
        <nav aria-label="活動頁面導覽">
          <a href="#about"><span>01</span> 活動介紹</a>
          <a href="#format"><span>02</span> 交流形式</a>
          <a href="#venue"><span>03</span> 活動資訊</a>
        </nav>
        <a className="connect-header-cta" href="#venue">10.21 見</a>
      </header>

      <section className="connect-hero" aria-labelledby="event-title">
        <div className="connect-grid" aria-hidden="true" />
        <div className="connect-ring ring-one" aria-hidden="true" />
        <div className="connect-ring ring-two" aria-hidden="true" />
        <div className="connect-hero-main">
          <div className="connect-year" aria-hidden="true">2026</div>
          <p className="connect-overline">TAIWAN TECH · STARTUP · INDUSTRY · INVESTMENT</p>
          <h1 id="event-title"><span>TAIWAN TECH</span><span>STARTUP</span><span className="connect-outline">CONNECT</span></h1>
          <div className="connect-hero-bottom">
            <p className="connect-lead">今年，讓好產品<br />遇見對的人。</p>
            <div className="connect-date-lockup"><span>OCT</span><strong>21</strong><small>WED · 2026</small></div>
          </div>
        </div>
        <div className="connect-marquee" aria-label="活動形式"><div>
          <span>企業專屬攤位展示</span><i>✦</i><span>投資交流</span><i>✦</i><span>產品與品牌曝光</span><i>✦</i><span>產業夥伴串連</span><i>✦</i>
          <span>企業專屬攤位展示</span><i>✦</i><span>投資交流</span><i>✦</i><span>產品與品牌曝光</span><i>✦</i><span>產業夥伴串連</span><i>✦</i>
        </div></div>
      </section>

      <section className="connect-intro" id="about">
        <div className="connect-section-no">01</div>
        <div className="connect-intro-copy">
          <p className="connect-eyebrow">THE MAIN EVENT OF THE YEAR · 本年度盛大活動</p>
          <h2>原 Demo Day，<br />今年重新連結。</h2>
          <p className="connect-statement">「2026 Taiwan Tech Startup Connect」將於 10 月 21 日登場。今年活動以全新形式展開：企業專屬攤位展示，加上自在、直接的投資交流。</p>
        </div>
        <aside className="connect-intro-note"><span>DEMO DAY → STARTUP CONNECT</span><p>從台上發表走向場內相遇，讓每一次交流都更靠近產品、需求與下一步。</p></aside>
      </section>

      <section className="connect-format" id="format">
        <div className="connect-format-heading">
          <div><p className="connect-eyebrow light">A ROOM MADE FOR CONNECTION</p><h2>自由走動。<br />自在交談。<br /><em>讓機會發生。</em></h2></div>
          <p>現場將邀請投資人、產業夥伴及其他企業代表參與。沒有制式的距離，參與者能在輕鬆的氛圍中認識彼此、分享產品與近況。</p>
        </div>
        <div className="connect-cards">
          {connections.map((item) => <article key={item.number}>
            <div className="connect-card-top"><span>{item.number}</span><small>{item.english}</small></div>
            <div className="connect-card-symbol" aria-hidden="true">↗</div><h3>{item.title}</h3><p>{item.copy}</p>
          </article>)}
        </div>
      </section>

      <section className="connect-booth">
        <div className="connect-booth-title"><span>BOOTH / 展示</span><h2>一個精緻攤位，<br />一場深入認識。</h2></div>
        <div className="connect-booth-visual" aria-hidden="true"><span className="booth-label">B 區<br />台科藝廊</span><span className="booth-dot dot-one" /><span className="booth-dot dot-two" /><span className="booth-dot dot-three" /></div>
        <div className="connect-booth-copy">
          <p>攤位設於 B 區台科藝廊。空間精緻集中，以企業介紹、產品展示及品牌曝光為主，讓來賓可以快速看見亮點，也能停下來好好聊。</p>
          <ul><li><span>01</span>企業介紹</li><li><span>02</span>產品展示</li><li><span>03</span>品牌曝光</li></ul>
        </div>
      </section>

      <section className="connect-venue" id="venue">
        <div className="connect-venue-top"><p className="connect-eyebrow">SAVE THE DATE · 把這天留給新的可能</p><span className="connect-section-no">03</span></div>
        <div className="connect-date-band"><div><span>2026</span><strong>10</strong><small>OCTOBER</small></div><i>/</i><div><strong>21</strong><small>WEDNESDAY</small></div></div>
        <div className="connect-location"><span>活動地點</span><h2>國際大樓 1F<br />A、B 區台科藝廊</h2><p>企業攤位位於 B 區台科藝廊</p></div>
        <div className="connect-final-copy"><p>認識潛在合作夥伴、拓展人脈，並創造更多合作與投資交流的機會。</p><a href="https://dev.robichip.com/contact?intent=meeting">與 RobiChip 預約交流 <span aria-hidden="true">↗</span></a></div>
      </section>

      <footer className="connect-footer">
        <Link href="/" aria-label="RobiChip 首頁"><img src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" /></Link>
        <p>2026 TAIWAN TECH STARTUP CONNECT</p><a href="#top">TOP ↑</a>
      </footer>
    </main>
  );
}
