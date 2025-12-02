import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next";
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Andritiana Steve Rakotonimanana - Développeur fullstack",
  description: "Développeur fullstack de Madagascar avec 4 ans d'expérience.",
  creator: "Andritiana Steve Rakotonimanana",
  publisher: "Andritiana Steve Rakotonimanana",
  keywords: [
    "développeur fullstack",
    "Madagascar",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "développement web",
    "portfolio",
  ],
  authors: [{ name: "Andritiana Steve Rakotonimanana" }],
  openGraph: {
    images: "/og.png",
    title: "Andritiana Steve Rakotonimanana - Développeur fullstack",
    description: "Développeur fullstack de Madagascar avec 4 ans d'expérience.",
    url: "http://andritiana.tech/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andritiana Steve Rakotonimanana - Développeur fullstack",
    description: "Développeur fullstack de Madagascar avec 4 ans d'expérience.",
    creator: "@AndritianaSteve", // Replace with actual Twitter handle if available
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <Analytics />
      <SpeedInsights />
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
