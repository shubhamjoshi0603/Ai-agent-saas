"use client";
import { useState } from "react";

type Appointment = { id: number; patient: string; doctor: string; date: string; time: string; status: string; reason: string };
const initial: Appointment[] = [
  { id: 1001, patient: "Aarav Sharma", doctor: "Dr. Meera Kapoor", date: "2026-10-23", time: "09:30 AM", status: "Confirmed", reason: "General consultation" },
  { id: 1002, patient: "Ananya Verma", doctor: "Dr. Rahul Mehta", date: "2026-10-23", time: "10:15 AM", status: "Pending", reason: "Follow-up" },
  { id: 1003, patient: "Rohan Gupta", doctor: "Dr. Meera Kapoor", date: "2026-10-24", time: "11:00 AM", status: "Confirmed", reason: "Routine check-up" }
];
const nav = ["Overview", "Appointments", "Patients", "Doctors", "AI Call Agent", "Billing"];
export default function Home() {
  const [tab, setTab] = useState("Overview");
  const [appointments, setAppointments] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("Dr. Meera Kapoor");
  const [date, setDate] = useState("2026-10-25");
  const [search, setSearch] = useState("");
  function addAppointment(e: React.FormEvent) {
    e.preventDefault();
    if (!patient.trim()) return;
    setAppointments(prev => [{ id: Date.now(), patient: patient.trim(), doctor, date, time: "To be confirmed", status: "Pending", reason: "New appointment" }, ...prev]);
    setPatient(""); setShowForm(false); setTab("Appointments");
  }
  const visible = appointments.filter(a => (a.patient + a.doctor + a.status).toLowerCase().includes(search.toLowerCase()));
  return <main style={{ maxWidth: 1240, margin: "0 auto", padding: 24 }}>
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
      <div><div style={{ color: "#147d72", fontWeight: 800, fontSize: 13, letterSpacing: 2 }}>CAREFLOW AI</div><h1 style={{ margin: "8px 0", fontSize: 30 }}>Clinic operations</h1><p style={{ margin: 0, color: "#657184" }}>Manage appointments and your AI call assistant.</p></div>
      <button onClick={() => setShowForm(true)} style={primary}>＋ New appointment</button>
    </header>
    <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>{nav.map(n => <button key={n} onClick={() => setTab(n)} style={{ ...navButton, background: tab === n ? "#dff5f0" : "#fff", color: tab === n ? "#087f70" : "#526071", borderColor: tab === n ? "#b8e6dc" : "#e4e9ef" }}>{n}</button>)}</nav>
    {tab === "Overview" && <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14, marginBottom: 24 }}>{[[ "Appointments", appointments.length, "Scheduled in demo data" ],["Patients","248","Sample dashboard metric"],["AI calls","36","Sample dashboard metric"],["Booking rate","82%","Sample dashboard metric"]].map(([label,value,note]) => <section key={String(label)} style={card}><div style={{ color: "#687588", fontSize: 14 }}>{label}</div><div style={{ fontSize: 30, fontWeight: 750, margin: "10px 0" }}>{value}</div><div style={{ color: "#8490a0", fontSize: 12 }}>{note}</div></section>)}</div>
      <section style={card}><h2 style={h2}>Upcoming appointments</h2><AppointmentTable items={appointments.slice(0,4)} /></section>
      <section style={{ ...card, marginTop: 16, background: "#eaf8f5" }}><h2 style={h2}>AI Call Agent</h2><p style={{ color: "#526071", lineHeight: 1.6 }}>Connect a voice provider such as Vapi to handle inbound calls and appointment requests. This dashboard is currently a demo; real calls are not enabled yet.</p><button style={primary} onClick={() => setTab("AI Call Agent")}>Configure agent →</button></section>
    </>}
    {tab === "Appointments" && <section style={card}><div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}><h2 style={h2}>Appointments</h2><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patient, doctor, status…" style={inputStyle} /></div><AppointmentTable items={visible} /></section>}
    {tab === "Patients" && <section style={card}><h2 style={h2}>Patients</h2><p style={{ color: "#687588" }}>Patient directory is a placeholder. Connect authenticated Supabase queries before using real patient records.</p><ul><li>Aarav Sharma</li><li>Ananya Verma</li><li>Rohan Gupta</li></ul></section>}
    {tab === "Doctors" && <section style={card}><h2 style={h2}>Doctors</h2><p>Dr. Meera Kapoor · General Medicine</p><p>Dr. Rahul Mehta · Cardiology</p></section>}
    {tab === "AI Call Agent" && <section style={card}><h2 style={h2}>AI Call Agent setup</h2><p style={{ color: "#687588", lineHeight: 1.7 }}>Planned provider: Vapi. To enable real telephone calls, configure a provider account, phone number, assistant, server-side API key, and signature-verified webhook. This screen does not place calls yet.</p><label>Provider<br/><input value="Vapi (planned)" readOnly style={inputStyle}/></label><p><span style={pill}>Not connected</span></p></section>}
    {tab === "Billing" && <section style={card}><h2 style={h2}>Billing & subscriptions</h2><p style={{ color: "#687588" }}>Stripe subscription checkout is scaffolded in the API. Configure test-mode Stripe credentials and implement verified webhooks before accepting payments.</p><span style={pill}>Test setup required</span></section>}
    {showForm && <div style={overlay}><form onSubmit={addAppointment} style={modal}><button type="button" onClick={() => setShowForm(false)} style={{ float: "right", border: 0, background: "transparent", fontSize: 20 }}>×</button><h2 style={h2}>Create appointment</h2><label>Patient name<input required value={patient} onChange={e => setPatient(e.target.value)} style={inputStyle}/></label><label>Doctor<select value={doctor} onChange={e => setDoctor(e.target.value)} style={inputStyle}><option>Dr. Meera Kapoor</option><option>Dr. Rahul Mehta</option></select></label><label>Date<input required type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle}/></label><button type="submit" style={{ ...primary, width: "100%", marginTop: 12 }}>Save demo appointment</button><p style={{ color: "#7b8797", fontSize: 12 }}>Saved in browser memory only; not persisted to a database.</p></form></div>}
    <footer style={{ color: "#8490a0", fontSize: 12, marginTop: 28 }}>Starter MVP · Demo data only · Not for real patient information</footer>
  </main>;
}
function AppointmentTable({ items }: { items: Appointment[] }) {
  return <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}><thead><tr>{["Patient","Doctor","Date","Time","Status"].map(x => <th key={x} style={th}>{x}</th>)}</tr></thead><tbody>{items.map(a => <tr key={a.id}>{[a.patient,a.doctor,a.date,a.time].map((v,i) => <td key={i} style={td}>{v}</td>)}<td style={td}><span style={pill}>{a.status}</span></td></tr>)}</tbody></table>{items.length === 0 && <p>No appointments match your search.</p>}</div>;
}
const card: React.CSSProperties = { background: "#fff", border: "1px solid #e7ebf1", borderRadius: 18, padding: 22, boxShadow: "0 5px 18px #192b3c08" };
const h2: React.CSSProperties = { fontSize: 19, margin: "0 0 18px" };
const primary: React.CSSProperties = { background: "#087f70", color: "#fff", border: 0, borderRadius: 10, padding: "12px 16px", fontWeight: 700 };
const navButton: React.CSSProperties = { border: "1px solid", borderRadius: 10, padding: "10px 14px" };
const th: React.CSSProperties = { color: "#7a8798", fontSize: 12, padding: "12px 10px", borderBottom: "1px solid #e8edf2" };
const td: React.CSSProperties = { padding: "14px 10px", borderBottom: "1px solid #eef1f5", fontSize: 14 };
const inputStyle: React.CSSProperties = { display: "block", width: "100%", padding: 11, margin: "8px 0 14px", border: "1px solid #dce3eb", borderRadius: 9, background: "#fff" };
const pill: React.CSSProperties = { display: "inline-block", borderRadius: 99, padding: "5px 9px", background: "#edf7f4", color: "#087f70", fontSize: 12 };
const overlay: React.CSSProperties = { position: "fixed", inset: 0, background: "#18223088", display: "grid", placeItems: "center", padding: 16, zIndex: 10 };
const modal: React.CSSProperties = { background: "#fff", padding: 24, borderRadius: 18, width: "min(100%,460px)", boxShadow: "0 20px 70px #0002" };
