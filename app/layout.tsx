import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import content from "./content.json";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Améliore le chargement des polices
});

export const metadata: Metadata = {
  title: `${content.hero.firstName} ${content.hero.lastName} - ${content.hero.current.domain} | Portfolio`,
  description: `${content.hero.tagline} ${content.hero.highlights.join(", ")}. Basé à ${content.hero.location}. ${content.hero.availability}.`,
  keywords: [
    ...content.hero.expertise,
    "développeur fullstack",
    "développeur web Madagascar",
    "portfolio développeur",
    "intégration IA",
  ],
  authors: [{ name: `${content.hero.firstName} ${content.hero.lastName}` }],
  creator: `${content.hero.firstName} ${content.hero.lastName}`,
  publisher: `${content.hero.firstName} ${content.hero.lastName}`,
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
    title: `${content.hero.firstName} ${content.hero.lastName} - ${content.hero.current.domain}`,
    description: `${content.hero.tagline} ${content.hero.highlights.join(", ")}. Basé à ${content.hero.location}. ${content.hero.availability}.`,
    url: "https://andritiana.tech",
    siteName: `${content.hero.firstName} ${content.hero.lastName} Portfolio`,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Créer une image 1200x630px
        width: 1200,
        height: 630,
        alt: `${content.hero.firstName} ${content.hero.lastName} - ${content.hero.current.domain}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.hero.firstName} ${content.hero.lastName} - ${content.hero.current.domain}`,
    description: `${content.hero.tagline} ${content.hero.highlights.join(", ")}.`,
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
