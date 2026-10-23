import { NextRequest, NextResponse } from "next/server";
type Appointment = { id: number; patient: string; doctor: string; date: string; status: string };
const appointments: Appointment[] = [];
export async function GET() {
  return NextResponse.json({ mode: "demo", appointments });
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  const patient = String(body.patient ?? "").trim();
  const doctor = String(body.doctor ?? "").trim();
  const date = String(body.date ?? "").trim();
  if (!patient || !doctor || !date) return NextResponse.json({ error: "patient, doctor and date are required" }, { status: 400 });
  const appointment = { id: Date.now(), patient, doctor, date, status: "Pending" };
  appointments.push(appointment);
  return NextResponse.json({ mode: "demo", appointment }, { status: 201 });
}
