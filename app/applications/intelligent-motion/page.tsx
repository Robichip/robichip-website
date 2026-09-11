import type { Metadata } from "next";
import ApplicationDetail from "../../application-detail";
import { applicationBySlug } from "../../official-data";
export const metadata: Metadata = { title: "Intelligent Motion Platform | RobiChip", description: "A reusable Power SoC architecture for multiple power classes and product variants." };
export default function Page() { return <ApplicationDetail application={applicationBySlug["intelligent-motion"]} />; }

