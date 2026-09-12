import type { Metadata } from "next"; import PlatformDetail from "../platform-detail"; import { platformBySlug } from "../official-data";
export const metadata: Metadata = { title: "RobiDev | RobiChip", description: "Motor-drive evaluation platform for architecture and Design-in decisions." };
export default function Page(){ return <PlatformDetail platform={platformBySlug.robidev} />; }

