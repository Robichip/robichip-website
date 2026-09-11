import type { Metadata } from "next";
import ApplicationDetail from "../../application-detail";
import { applicationBySlug } from "../../official-data";
export const metadata: Metadata = { title: "Robotics Actuation | RobiChip", description: "Power-stage, motor-driver and complete actuator co-design paths." };
export default function Page() { return <ApplicationDetail application={applicationBySlug["robotics-actuation"]} />; }

