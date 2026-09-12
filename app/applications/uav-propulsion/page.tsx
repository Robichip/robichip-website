import type { Metadata } from "next";
import ApplicationDetail from "../../application-detail";
import { applicationBySlug } from "../../official-data";
export const metadata: Metadata = { title: "UAV Propulsion | RobiChip", description: "Measured propulsion and controller Design-in paths for next-generation UAV systems." };
export default function Page() { return <ApplicationDetail application={applicationBySlug["uav-propulsion"]} />; }

