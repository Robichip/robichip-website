import type { Metadata } from "next"; import PlatformDetail from "../platform-detail"; import { platformBySlug } from "../official-data";
export const metadata: Metadata = { title: "RobiTorque | RobiChip", description: "A validation and co-design path for robotic joints and actuation systems." };
export default function Page(){ return <PlatformDetail platform={platformBySlug.robitorque} />; }

