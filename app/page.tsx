"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1, // Réduit de 0.3 à 0.1 pour mobile
        rootMargin: "0px 0px -10% 0px", // Réduit de -20% à -10%
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "about", label: "À Propos" },
    { id: "experience", label: "Expériences" },
    { id: "projects", label: "Projets" },
    { id: "gallery", label: "Galerie" },
    { id: "community", label: "Communautés" },
    { id: "skills", label: "Compétences" },
    { id: "thoughts", label: "Publications" },
    { id: "connect", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-8 right-8 z-20 group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
        aria-label="Changer le thème"
      >
        {isDark ? (
          <svg
            className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <div key={section.id} className="relative group">
              <button
                onClick={() =>
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`w-2 h-8 rounded-full transition-all duration-500 ${
                  activeSection === section.id
                    ? "bg-foreground"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Naviguer vers ${section.label}`}
              />
              {(hoveredSection === section.id ||
                activeSection === section.id) && (
                <div className="absolute left-6 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-foreground text-background text-sm rounded whitespace-nowrap shadow-lg animate-fade-in">
                  {section.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => {
            const index = sections.findIndex((s) => s.id === "intro");
            if (index !== -1) sectionsRef.current[index] = el;
          }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">
                  PORTFOLIO / 2025
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Andritiana
                  <br />
                  <span className="text-muted-foreground">Steve</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Développeur fullstack guidé par la curiosité et le souci du
                  détail, transformant des idées complexes en applications
                  <span className="text-foreground"> fluides</span>,
                  <span className="text-foreground"> rapides</span> et
                  <span className="text-foreground"> fiables</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Disponible pour de nouveaux projets
                  </div>
                  <div>Antananarivo, Madagascar</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  ACTUELLEMENT
                </div>
                <div className="space-y-2">
                  <div className="text-foreground">Développeur Fullstack</div>
                  <div className="text-muted-foreground">À Teratany</div>
                  <div className="text-xs text-muted-foreground">
                    2022 — Aujourd'hui
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  EXPERTISE
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "TypeScript",
                    "Next.js",
                    "NestJS",
                    "PostgreSQL",
                    "React",
                    "Integration IA",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/CV-Andritiana-Steve-Rakotonimanana.pdf"
                download
                className="cursor-pointer"
              >
                <Button variant="ghost" className="cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Télécharger le CV
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <section
          id="about"
          ref={(el) => {
            const index = sections.findIndex((s) => s.id === "about");
            if (index !== -1) sectionsRef.current[index] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">À Propos</h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Armé de TypeScript, Next.js, NestJS et d'un solide background
                  DevOps, je construis des solutions prêtes à évoluer, quelle
                  que soit l'échelle.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Mon objectif est simple : créer des produits qui fonctionnent,
                  qui durent, et qui donnent envie d'aller plus loin.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground font-mono">
                    FORMATION
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-foreground font-medium">
                        Master II en Informatique
                      </div>
                      <div className="text-sm text-muted-foreground">
                        IMTICIA - ISPM
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2023 — 2025
                      </div>
                    </div>
                    <div>
                      <div className="text-foreground font-medium">
                        Licence en Informatique
                      </div>
                      <div className="text-sm text-muted-foreground">
                        IMTICIA - ISPM
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2019 — 2022
                      </div>
                    </div>
                    <div>
                      <div className="text-foreground font-medium">
                        Baccalauréat Série D
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Le Petit Nid Soavimbahoaka
                      </div>
                      <div className="text-xs text-muted-foreground">2018</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground font-mono">
                    CONTACT
                  </div>
                  <div className="space-y-2">
                    <Link
                      target="_blank"
                      href="mailto:andritianasteve@gmail.com"
                      className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
                    >
                      <span>andritianasteve@gmail.com</span>
                    </Link>
                    <div className="text-muted-foreground">0386231963</div>
                    <div className="text-muted-foreground text-sm">
                      Lot 141 A Ikianja Ambohimangakely
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={(el) => {
            const index = sections.findIndex((s) => s.id === "experience");
            if (index !== -1) sectionsRef.current[index] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">
                Expériences Professionnelles
              </h2>
              <div className="text-sm text-muted-foreground font-mono">
                2022 — Maintenant (4ans)
              </div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2022 — Présent",
                  role: "Développeur Fullstack",
                  company: "Teratany",
                  location: "Antananarivo",
                  description:
                    "Développeur Fullstack et DevOPS à Teratany. Création du réseau social Teratany dédié aux ODD et de Hevitro.mg, plateforme citoyenne centralisant idées et doléances pour Madagascar.",
                  tech: [
                    "Next.js",
                    "TypeScript",
                    "PostgreSQL",
                    "Kubernetes",
                    "Docker",
                    "Shadcn",
                    "Leaflet",
                  ],
                },
                {
                  year: "2022 — Présent",
                  role: "Développeur Fullstack Freelance",
                  company: "ComeUp",
                  location: "Distantiel",
                  description:
                    "Freelance développeur fullstack avec une trentaine de clients satisfaits et autant de projets réalisés sur diverses technologies.",
                  tech: [
                    "Node.js",
                    "React",
                    "Next.js",
                    "MongoDB",
                    "PostgreSQL",
                  ],
                },
                {
                  year: "2025",
                  role: "Développeur Freelance",
                  company: "Tiakaly",
                  location: "Antananarivo",
                  description:
                    "Développement du site internet avec carte interactive pour présenter les spots recommandés aux abonnés Instagram.",
                  tech: ["Next.js", "Shadcn", "PostgreSQL", "Leaflet"],
                },
                {
                  year: "2024 — 2025",
                  role: "Développeur Fullstack",
                  company: "Pandorra.ai",
                  location: "Distantiel (Canada)",
                  description:
                    "Plateforme créative alimentée par l'IA, transformant des idées en vidéos, images, textes et voix en quelques clics.",
                  tech: [
                    "Next.js",
                    "TypeScript",
                    "OpenAI",
                    "Runway ML",
                    "ElevenLabs",
                  ],
                },
                {
                  year: "2023 — 2024",
                  role: "Consultant Développeur Front",
                  company: "Sowell",
                  location: "Antananarivo",
                  description:
                    "Solution d'amélioration de la qualité des patrimoines et enrichissement de la communication entre équipes de proximité.",
                  tech: [
                    "Vue",
                    "TypeScript",
                    "Cypress",
                    "Playwright",
                    "Linear",
                  ],
                },
                {
                  year: "2023",
                  role: "Développeur bénévole",
                  company: "Institut Supérieur Polytechnique de Madagascar",
                  location: "Antananarivo",
                  description:
                    "Mise en place d'un tableau de score en temps réel, plateforme de suivi des statistiques des joueurs et statistiques en temps réel des meilleurs spectateurs.",
                  tech: ["Socket.io", "NodeJS", "React", "MongoDB", "Redis"],
                },
                {
                  year: "2022",
                  role: "Stagiaire Développeur Fullstack",
                  company: "Le Petit Nid",
                  location: "Antananarivo",
                  description:
                    "Stage de fin d'études en développement fullstack pour l'obtention du diplôme de Licence en Informatique.",
                  tech: ["Node.js", "Three.js", "Vue.js", "MongoDB"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-3">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-9 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">
                        {job.role}
                      </h3>
                      <div className="text-muted-foreground">{job.company}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {job.location}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2 gap-y-1 mt-2 lg:mt-0">
                      {job.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:text-foreground transition-colors duration-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => {
            const index = sections.findIndex((s) => s.id === "projects");
            if (index !== -1) sectionsRef.current[index] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">
              Projets Réalisés
            </h2>

            <div className="grid gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Hevitro.mg",
                  description:
                    "Plateforme citoyenne centralisant les idées et doléances pour Madagascar avec système de vote et KYC.",
                  image: "/hevitro.png",
                  tech: ["Next.js", "PostgreSQL", "TypeScript"],
                  link: "https://hevitro.mg",
                },
                {
                  title: "Teratany",
                  description:
                    "Réseau social dédié aux Objectifs de Développement Durable connectant jeunes et organisations.",
                  image: "/teratany.png",
                  tech: ["Next.js", "MongoDB", "Kubernetes"],
                  link: "https://network.teratany.org",
                },
                {
                  title: "Pandorra.ai",
                  description:
                    "Plateforme créative IA transformant idées en contenus multimédias (vidéo, image, texte, voix).",
                  image: "/pandorra.png",
                  tech: ["Next.js", "OpenAI", "RunwayML"],
                  link: "https://pandorra.ai",
                },
                {
                  title: "Tiakaly",
                  description:
                    "Site avec carte interactive présentant les spots recommandés, lié au profil Instagram.",
                  image: "/tiakaly.png",
                  tech: ["Next.js", "Leaflet", "PostgreSQL"],
                  link: "https://tiakaly.com",
                },
                {
                  title: "Mibala",
                  description:
                    "Tableau de score en temps réel avec statistiques des joueurs pour l'ISPM et statistiques des meilleurs supporters.",
                  image: "/mibala.png",
                  tech: ["Socket.io", "React", "MongoDB"],
                  link: "#",
                },
                {
                  title: "Sowell",
                  description:
                    "Solution d'amélioration de la qualité des patrimoines et communication entre équipes.",
                  image: "/sowell.png",
                  tech: ["Vue", "TypeScript", "Cypress"],
                  link: "https://sowell.app",
                },
              ].map((project, index) => (
                <article
                  key={index}
                  className="group border border-border rounded-lg overflow-hidden hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 object-cover"
                      width={1200}
                      height={500}
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs border border-border rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.link && project.link !== "#" && (
                      <Link
                        target="_blank"
                        href={project.link}
                        className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      >
                        <span>Voir le projet</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="gallery"
          ref={(el) => {
            const index = sections.findIndex((s) => s.id === "gallery");
            if (index !== -1) sectionsRef.current[index] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Galerie</h2>

            <div className="flex flex-wrap lg:flex-nowrap gap-4">
              {(() => {
                const photos = [
                  { src: "/galerie/3.jpg", alt: "Sortie de promotion" },
                  {
                    src: "/galerie/2.jpg",
                    alt: "Prise de parole lors de l'info session GDSC ISPM",
                  },
                  {
                    src: "/galerie/4.jpg",
                    alt: "Mon Setup",
                  },
                  {
                    src: "/galerie/5.jpg",
                    alt: "Workshop sur le thème du DevOps",
                  },
                ];

                const column1 = photos.filter((_, i) => i % 2 === 0);
                const column2 = photos.filter((_, i) => i % 2 !== 0);

                return (
                  <>
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                      {column1.map((photo, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-500"
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={1200} // Example width, adjust as needed
                            height={800} // Example height, adjust as needed to maintain aspect ratio
                            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="text-sm text-foreground">
                              {photo.alt}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                      {column2.map((photo, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-500"
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={1200} // Example width, adjust as needed
                            height={800} // Example height, adjust as needed to maintain aspect ratio
                            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="text-sm text-foreground">
                              {photo.alt}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </section>
        <section
          id="community"
          ref={(el) => {
            const index = sections.findIndex((s) => s.id === "community");
            if (index !== -1) sectionsRef.current[index] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">
              Communautés & Réalisations
            </h2>

            <div className="space-y-8">
              {[
                {
                  year: "2023 — Présent",
                  role: "Membre",
                  organization: "Google Developer Group Antananarivo",
                  description:
                    "Engagé au sein du GDG Antananarivo, contribution aux activités de la communauté et veille technologique.",
                },
                {
                  year: "2023 — 2024",
                  role: "Leader",
                  organization: "Google Developer Students Club ISPM",
                  description:
                    "Leader du GDSC à l'ISPM. Organisation de plusieurs ateliers et compétitions (Weekly December, Hackathon, Robots Battle, tournoi HackerRank).",
                },
                {
                  year: "2023",
                  role: "Organisateur",
                  organization: "DevFest 2023 - Coding The Future",
                  description:
                    "Organisation du DevFest 2023 à Axian University avec coordination de la couverture photographique.",
                },
                {
                  year: "2023",
                  role: "Responsable Communication",
                  organization: "ITEAM ISPM",
                  description:
                    "Responsable de la communication de l'association des étudiants en Informatique de l'ISPM.",
                },
                {
                  year: "2019 — 2021",
                  role: "Vice-président",
                  organization: "All For Christ ISPM",
                  description:
                    "Vice-président de l'Association Chrétienne de l'ISPM. Organisation des événements et activités de la chorale.",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-3">
                    <div className="text-lg font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {activity.year}
                    </div>
                  </div>

                  <div className="lg:col-span-9 space-y-2">
                    <div>
                      <h3 className="text-lg font-medium">{activity.role}</h3>
                      <div className="text-muted-foreground">
                        {activity.organization}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="skills"
          ref={(el) => {
            const index = sections.findIndex((s) => s.id === "skills");
            if (index !== -1) sectionsRef.current[index] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">
              Compétences Techniques
            </h2>

            <div className="grid gap-8 lg:grid-cols-2">
              {[
                {
                  title: "LANGAGES & FRAMEWORKS",
                  skills: [
                    {
                      name: "JavaScript",
                      iconUrl:
                        "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
                    },
                    {
                      name: "TypeScript",
                      iconUrl:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png",
                    },
                    {
                      name: "Express",
                      iconUrl:
                        "https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png",
                    },
                    {
                      name: "NestJS",
                      iconUrl: "https://cdn.simpleicons.org/nestjs",
                    },
                    {
                      name: "React.js",
                      iconUrl: "https://cdn.simpleicons.org/react",
                    },
                    {
                      name: "Next.js",
                      iconUrl:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV9uzErWz9EXqZDxZ5lP9aYpMz8eK6rr5X3w&s",
                    },
                    {
                      name: "Vue.js",
                      iconUrl:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/330px-Vue.js_Logo_2.svg.png",
                    },
                    {
                      name: "TailwindCSS",
                      iconUrl: "https://cdn.simpleicons.org/tailwindcss",
                    },
                    {
                      name: "Shadcn",
                      iconUrl:
                        "https://avatars.githubusercontent.com/u/139895814?v=4",
                    },
                    {
                      name: "Golang",
                      iconUrl: "https://cdn.simpleicons.org/go",
                    },
                    {
                      name: "Python",
                      iconUrl:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png",
                    },
                  ],
                },
                {
                  title: "BASES DE DONNÉES & BACKEND",
                  skills: [
                    {
                      name: "MongoDB",
                      iconUrl: "https://cdn.simpleicons.org/mongodb",
                    },
                    {
                      name: "PostgreSQL",
                      iconUrl:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png",
                    },
                    {
                      name: "Firebase",
                      iconUrl: "https://cdn.simpleicons.org/firebase",
                    },
                    {
                      name: "Supabase",
                      iconUrl: "https://cdn.simpleicons.org/supabase",
                    },
                    {
                      name: "Node.js",
                      iconUrl: "https://cdn.simpleicons.org/nodedotjs",
                    },
                    {
                      name: "Bun",
                      iconUrl:
                        "https://cdn.worldvectorlogo.com/logos/bun-1.svg",
                    },
                  ],
                },
                {
                  title: "DEVOPS & GESTION DE VERSIONS",
                  skills: [
                    { name: "Git", iconUrl: "https://cdn.simpleicons.org/git" },
                    {
                      name: "GitHub",
                      iconUrl:
                        "https://cdn.worldvectorlogo.com/logos/github-icon-2.svg",
                    },
                    {
                      name: "Linux",
                      iconUrl:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1012px-Tux.svg.png",
                    },
                    {
                      name: "Docker",
                      iconUrl: "https://cdn.simpleicons.org/docker",
                    },
                    {
                      name: "Kubernetes",
                      iconUrl: "https://cdn.simpleicons.org/kubernetes",
                    },
                    {
                      name: "Jenkins",
                      iconUrl: "https://cdn.simpleicons.org/jenkins",
                    },
                  ],
                },
                {
                  title: "INTELLIGENCE ARTIFICIELLE",
                  skills: [
                    {
                      name: "OpenAI API",
                      iconUrl: "https://cdn.simpleicons.org/openai",
                    },
                    {
                      name: "Cursor",
                      iconUrl:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQ_CU3a6muH84mLfoP6xmM4ZJ9Z6RAXMmdA&s",
                    },
                    {
                      name: "Google Antigravity",
                      iconUrl:
                        "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/google-antigravity-logo-icon.png",
                    },
                    { name: "v0", iconUrl: "/logo/v0.png" },
                    {
                      name: "CodeRabbit",
                      iconUrl: "https://cdn.simpleicons.org/coderabbit",
                    },
                    {
                      name: "Trunk Code Quality",
                      iconUrl:
                        "https://trunk.gallerycdn.vsassets.io/extensions/trunk/io/3.21.1/1758614980446/Microsoft.VisualStudio.Services.Icons.Default",
                    },
                  ],
                },
                {
                  title: "OUTILS DE PRODUCTIVITÉ",
                  skills: [
                    {
                      name: "Notion",
                      iconUrl: "https://cdn.simpleicons.org/notion",
                    },
                    {
                      name: "Obsidian",
                      iconUrl: "https://cdn.simpleicons.org/obsidian",
                    },
                    {
                      name: "GitHub",
                      iconUrl:
                        "https://cdn.worldvectorlogo.com/logos/github-icon-2.svg",
                    },
                    {
                      name: "Teams",
                      iconUrl:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Microsoft_Office_Teams_%282019%E2%80%932025%29.svg/1200px-Microsoft_Office_Teams_%282019%E2%80%932025%29.svg.png",
                    },
                    {
                      name: "Slack",
                      iconUrl:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1200px-Slack_icon_2019.svg.png",
                    },
                    {
                      name: "Linear",
                      iconUrl: "https://cdn.simpleicons.org/linear",
                    },
                    {
                      name: "Trello",
                      iconUrl: "https://cdn.simpleicons.org/trello",
                    },
                    {
                      name: "Figma",
                      iconUrl:
                        "https://brandlogos.net/wp-content/uploads/2022/05/figma-logo_brandlogos.net_6n1pb-512x512.png",
                    },
                  ],
                },
                {
                  title: "QUALITÉS",
                  skills: [
                    { name: "Compréhensif", iconUrl: "" },
                    { name: "Responsable", iconUrl: "" },
                    { name: "Adaptatif", iconUrl: "" },
                    { name: "Autonome", iconUrl: "" },
                    { name: "Sociable", iconUrl: "" },
                    { name: "Esprit collectif", iconUrl: "" },
                    { name: "Organisé", iconUrl: "" },
                  ],
                },
              ].map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-6">
                  <div>
                    <h3 className="text-sm text-muted-foreground font-mono mb-4">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className={`group px-3 py-1.5 text-sm border border-border rounded-full hover:border-muted-foreground/50 transition-all duration-300 flex items-center gap-2 ${
                            category.title === "QUALITÉS" ? "bg-muted/50" : ""
                          }`}
                        >
                          {skill.iconUrl && (
                            <img
                              src={skill.iconUrl}
                              alt={skill.name}
                              className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                            />
                          )}
                          <span>{skill.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => {
            const index = sections.findIndex((s) => s.id === "thoughts");
            if (index !== -1) sectionsRef.current[index] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">
              Publications Récentes
            </h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Et si la voix du peuple trouvait enfin un écho ?",
                  excerpt:
                    "Ces dernières semaines, en suivant l'actualité à Madagascar, j'ai vu défiler des centaines de publications sur Facebook.",
                  date: "Nov 2025",
                  readTime: "6 min",
                  link: "https://www.linkedin.com/posts/andritianaa_et-si-la-voix-du-peuple-trouvait-enfin-un-activity-7386314531519635457-luf-?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADbVk1EBBk2SvEk4TXe8TR0DC0u8PsnZFPQ",
                },
                {
                  title: "4 règles pour retrouver la vraie concentration",
                  excerpt:
                    "En septembre, je partageais mon envie de reprendre le contrôle sur mon attention, j'ai donc commencé Deep Work de Cal Newport.",
                  date: "Nov 2025",
                  readTime: "2 min",
                  link: "https://www.linkedin.com/posts/andritianaa_il-y-a-2-mois-je-partageais-mon-envie-de-activity-7379602328456437760-rdwk?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADbVk1EBBk2SvEk4TXe8TR0DC0u8PsnZFPQ",
                },
                {
                  title: "Je construis ma propre boilerplate fullstack.",
                  excerpt:
                    "Depuis quelque temps, je travaille sur un projet que j'aurais voulu avoir depuis longtemps...",
                  date: "Oct 2025",
                  readTime: "5 min",
                  link: "https://www.linkedin.com/posts/andritianaa_je-construis-ma-propre-boilerplate-fullstack-activity-7382364377145909248-con4?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADbVk1EBBk2SvEk4TXe8TR0DC0u8PsnZFPQ",
                },
                {
                  title: "Comment je reprends le contrôle",
                  excerpt:
                    "4 à 5 heures par jour. C'est le temps que je passe, parfois sans m'en rendre compte, sur mon téléphone.",
                  date: "Sept 2025",
                  readTime: "3 min",
                  link: "https://www.linkedin.com/posts/andritianaa_4-%C3%A0-5-heures-par-jour-cest-le-temps-que-activity-7354050343325835264-Ki7G?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADbVk1EBBk2SvEk4TXe8TR0DC0u8PsnZFPQ",
                },
              ].map((post, index) => (
                <Link
                  key={index}
                  href={post.link}
                  target="_blank"
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer block"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Lire plus</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="connect"
          ref={(el) => {
            const index = sections.findIndex((s) => s.id === "connect");
            if (index !== -1) sectionsRef.current[index] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">
                Restons en Contact
              </h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Toujours intéressé par de nouvelles opportunités,
                  collaborations et conversations autour de la technologie.
                </p>

                <div className="space-y-4">
                  <Link
                    target="_blank"
                    href="mailto:andritianasteve@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">
                      andritianasteve@gmail.com
                    </span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <div className="text-muted-foreground">0386231963</div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">
                RÉSEAUX SOCIAUX
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "GitHub",
                    handle: "@andritianaa",
                    url: "https://github.com/andritianaa",
                  },
                  {
                    name: "LinkedIn",
                    handle: "andritiana",
                    url: "https://www.linkedin.com/in/andritianaa/",
                  },
                  {
                    name: "ComeUp",
                    handle: "@andritiana-steve",
                    url: "https://comeup.com/fr/@andritiana-steve",
                  },
                  {
                    name: "Whatsapp",
                    handle: "+261 32 67 082 11",
                    url: "https://wa.me/261326708211",
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {social.handle}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                © 2025 Andritiana Steve Rakotonimanana. Tous droits réservés.
              </div>
              <div className="text-xs text-muted-foreground">
                Développé avec passion à Madagascar
              </div>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
