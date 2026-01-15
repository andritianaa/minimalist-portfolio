import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Améliore le chargement des polices
});

export const metadata: Metadata = {
  title: "Andritiana Steve - Développeur Fullstack | Portfolio",
  description: "Développeur fullstack passionné avec 4 ans d'expérience. Expert en TypeScript, Next.js, NestJS et PostgreSQL. Basé à Antananarivo, Madagascar. Disponible pour de nouveaux projets.",
  keywords: [
    "développeur fullstack",
    "TypeScript",
    "Next.js",
    "NestJS",
    "PostgreSQL",
    "React",
    "développeur web Madagascar",
    "Antananarivo",
    "portfolio développeur",
    "intégration IA",
  ],
  authors: [{ name: "Andritiana Steve Rakotonimanana" }],
  creator: "Andritiana Steve Rakotonimanana",
  publisher: "Andritiana Steve Rakotonimanana",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://andritiana.tech"), // Remplacer par votre domaine
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Andritiana Steve - Développeur Fullstack",
    description: "Développeur fullstack avec 4 ans d'expérience. Expert en TypeScript, Next.js, NestJS. Disponible pour de nouveaux projets.",
    url: "https://andritiana.tech",
    siteName: "Andritiana Steve Portfolio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Créer une image 1200x630px
        width: 1200,
        height: 630,
        alt: "Andritiana Steve - Développeur Fullstack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andritiana Steve - Développeur Fullstack",
    description: "Développeur fullstack avec 4 ans d'expérience. Expert en TypeScript, Next.js, NestJS.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "votre-code-google-search-console", // Ajouter votre code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preconnect pour les domaines externes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.simpleicons.org" />
        <link rel="preconnect" href="https://upload.wikimedia.org" />
        
        {/* DNS Prefetch pour d'autres domaines */}
        <link rel="dns-prefetch" href="https://cdn.worldvectorlogo.com" />
        <link rel="dns-prefetch" href="https://w7.pngwing.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}