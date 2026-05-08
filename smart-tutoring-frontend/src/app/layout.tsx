import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SmartTutoring | Find the Best Tutors Online",
  description: "Connect with expert tutors for personalized 1-on-1 learning in any subject.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="container" style={{ marginTop: '5rem', paddingBottom: '3rem', borderTop: '1px solid var(--border)', paddingTop: '3rem', textAlign: 'center', opacity: 0.7 }}>
          <p>&copy; 2026 SmartTutoring. Built for excellence.</p>
        </footer>
      </body>
    </html>
  );
}
