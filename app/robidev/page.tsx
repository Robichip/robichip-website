import type { Metadata } from "next"; import PlatformDetail from "../platform-detail"; import { platformBySlug } from "../official-data";
export const metadata: Metadata = { title: "RobiDev Ecosystem | RobiChip", description: "Developer evaluation, education and research, and partner enablement for motor-drive Design-in. 開發者評估、教育研究與合作夥伴生態。" };
export default function Page(){ return <PlatformDetail platform={platformBySlug.robidev} />; }
