import type { Metadata } from "next";
import Link from "next/link";
import { applications } from "../official-data";
import { DesignInCta, OfficialLayout, PageHero } from "../official-site";

export const metadata: Metadata = { title: "Applications | RobiChip", description: "Application-led paths for UAV propulsion, robotics actuation and intelligent motion." };

export default function ApplicationsPage() {
  return <OfficialLayout><PageHero eyebrow="APPLICATIONS · 應用" title="Start with the machine." titleZh="從智慧機器開始。" copy="Select the application challenge before selecting the platform layer." copyZh="先選擇應用挑戰，再選擇平台層級。" aside={<>The same Power SoC logic enters each market through a different system question.<br /><br />同一套 Power SoC 邏輯，透過不同系統問題進入各應用市場。</>} /><section className="os-content"><div className="os-shell"><p className="os-eyebrow">THREE ENTRY POINTS · 三個入口</p><h2>Choose the closest system challenge.<span>選擇最接近的系統挑戰。</span></h2><div className="os-overview-grid">{applications.map((item) => <article className="os-overview-card" key={item.slug}><img src={item.image} alt={item.imageAlt} /><p className="os-eyebrow">{item.eyebrow}</p><h3>{item.title}<span>{item.titleZh}</span></h3><p>{item.summary}<br /><br />{item.summaryZh}</p><Link href={`/applications/${item.slug}`}>Explore application ↗</Link></article>)}</div></div></section><DesignInCta /></OfficialLayout>;
}

