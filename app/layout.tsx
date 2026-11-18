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

        {/* Thème appliqué avant le premier rendu : sombre par défaut, sinon le
            dernier choix du visiteur. La page ne clignote donc jamais. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t?t==="dark":true)}catch(e){document.documentElement.classList.add("dark")}`,
          }}
        />

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
