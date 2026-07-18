import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "@/components/Extra/LayoutWrapper";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parikshitsinh Champavat | AI & Python Developer",
  description:
    "Portfolio of Parikshitsinh Champavat — AI Developer, Python Developer, and Full Stack Developer from Ahmedabad. Specialising in RAG systems, LangChain, FastAPI, and Machine Learning.",
  keywords: [
    "Parikshitsinh Champavat",
    "AI Developer",
    "Python Developer",
    "FastAPI",
    "RAG",
    "LangChain",
    "Machine Learning",
    "Ahmedabad",
    "Full Stack Developer",
    "Developer Portfolio",
  ],
  authors: [{ name: "Parikshitsinh Champavat" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/parikshitsinh0228",
    title: "Parikshitsinh Champavat | AI & Python Developer",
    description:
      "AI Developer, Python Developer, and Full Stack Developer from Ahmedabad specialising in RAG, FastAPI, and ML.",
    siteName: "Parikshitsinh Champavat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parikshitsinh Champavat | AI & Python Developer",
    description:
      "AI Developer, Python Developer, and Full Stack Developer from Ahmedabad.",
  },
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#F5F4F1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ background: "#F5F4F1" }}
    >
      <body
        style={{
          background: "#F5F4F1",
          color: "#1A1917",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
