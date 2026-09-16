import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OfficialLayout } from "../../official-site";
import articles from "../archive.json";
import "../../editorial.css";

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  return { title: article ? `${article.title} | RobiChip` : "News | RobiChip", description: article?.titleZh };
}
export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  return <OfficialLayout><section className="os-content"><div className="os-shell">
    <Link className="os-inline-link" href="/news-events">← News &amp; Events · 新聞與活動</Link>
    <header className="os-news-article-head"><p className="os-eyebrow"><time dateTime={article.date}>{article.date}</time> · {article.category}</p><h1>{article.title}<span>{article.titleZh}</span></h1></header>
    {article.recap && <div className="os-note">Historical pre-show announcement. The event has concluded; timing and product status below reflect the original publication.<span>以下保留原始展前公告；活動已結束，時程及產品狀態反映當時發布內容。</span><Link className="os-inline-link" href={article.recap}>Latest virtual booth &amp; recap · 最新展後虛擬展間 ↗</Link></div>}
    <div className="os-archive-body" dangerouslySetInnerHTML={{ __html: article.html }} />
    <div className="os-actions"><Link className="os-button os-button-dark" href="/news-events">Back to all news · 返回新聞總覽</Link><Link className="os-button os-button-dark" href="/contact?intent=partnership">Discuss collaboration · 洽談合作 ↗</Link></div>
  </div></section></OfficialLayout>;
}
