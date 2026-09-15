import { getChatGPTUser } from "../../../chatgpt-auth";
import { getRawDb } from "../../../../db";
import { SIMULATION_INSERT, simulations, simulationValues } from "../../../../db/inquiry-simulations";

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user || !["henrygong.tw@gmail.com", "robiagent@robichip.com"].includes(user.email.toLowerCase())) {
    return Response.json({ error: "Staff access is required." }, { status: 403 });
  }
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json({ error: "Please use the simulation button in the inquiry workspace." }, { status: 403 });
  }
  try {
    const db = getRawDb();
    await db.batch(simulations.map((row) => db.prepare(SIMULATION_INSERT).bind(...simulationValues(row))));
    return new Response(null, { status: 303, headers: { Location: "/admin/inquiries", "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Could not load inquiry simulations", error);
    return Response.json({ error: "Simulation data could not be saved. Return to the workspace and retry; duplicates are prevented." }, { status: 503 });
  }
}
