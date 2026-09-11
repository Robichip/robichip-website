import type { Metadata } from "next";
import OfficialHome from "./official-home";

export const metadata: Metadata = {
  title: "RobiChip | Semiconductor Infrastructure for Physical AI",
  description:
    "Application-led Power SoC platforms for UAV propulsion, robotic actuation and intelligent motion systems.",
};

export default function Home() {
  return <OfficialHome />;
}
