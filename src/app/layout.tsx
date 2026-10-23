import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "CareFlow AI | Clinic Operations",
  description: "Clinic appointments and AI call agent management dashboard"
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
