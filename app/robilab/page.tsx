import type { Metadata } from "next"; import PlatformDetail from "../platform-detail"; import { platformBySlug } from "../official-data";
export const metadata: Metadata = { title: "RobiLab | RobiChip", description: "Engineering measurement services for propulsion, motion, electrical and thermal decisions." };
export default function Page(){ return <PlatformDetail platform={platformBySlug.robilab} />; }

