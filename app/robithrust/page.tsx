import type { Metadata } from "next"; import PlatformDetail from "../platform-detail"; import { platformBySlug } from "../official-data";
export const metadata: Metadata = { title: "RobiThrust | RobiChip", description: "Measured UAV propulsion evidence across thrust, power, matching and thermal behavior." };
export default function Page(){ return <PlatformDetail platform={platformBySlug.robithrust} />; }

