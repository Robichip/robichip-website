import type { Metadata } from "next"; import PlatformDetail from "../platform-detail"; import { platformBySlug } from "../official-data";
export const metadata: Metadata = { title: "RobiSoC | RobiChip", description: "Compact Power SoC architecture for intelligent-machine motor control." };
export default function Page(){ return <PlatformDetail platform={platformBySlug.robisoc} />; }

