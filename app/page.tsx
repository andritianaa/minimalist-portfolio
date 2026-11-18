"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import content from "./content.json";

// Attributs d'un élément qui apparaît au défilement, décalé de son rang pour
// que les éléments d'une même liste montent l'un après l'autre.
const reveal = (index = 0, step = 80) => ({
  "data-reveal": "",
  style: { "--reveal-delay": `${Math.min(index, 6) * step}ms` } as CSSProperties,
});

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  // Entrée de chaque section et de ses éléments, une seule fois.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add(
            el.hasAttribute("data-reveal") ? "is-revealed" : "animate-fade-in-up",
          );
          observer.unobserve(el);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // La section active est celle qui passe la ligne des 40 % de l'écran : un
  // seul résultat à chaque instant, ce qui fait glisser le marqueur proprement.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = sectionsRef.current.filter(
        (s): s is HTMLElement => s !== null,
      );
      if (sections.length === 0) return;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const line = window.innerHeight * 0.4;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section;
      }
      setActiveSection(atBottom ? sections[sections.length - 1].id : current.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Fin de section : quand on s'arrête de descendre et que la section suivante
  // occupe déjà le bas de l'écran, la page glisse jusqu'à son début. Au milieu
  // d'une longue section (projets, galerie), rien ne bouge. Le scroll-snap CSS
  // a été écarté : en mode « proximity », plusieurs petits crans de molette
  // ramenaient la page au début de la section.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let settledY = window.scrollY;
    let timer = 0;
    let gliding = false;

    const onScrollEnd = () => {
      const y = window.scrollY;
      const goingDown = y > settledY + 4;
      settledY = y;
      if (gliding) {
        gliding = false;
        return;
      }
      if (!goingDown) return;

      const next = sectionsRef.current.find((section) => {
        if (!section) return false;
        const top = section.getBoundingClientRect().top;
        return top > 4 && top < window.innerHeight * 0.55;
      });
      if (!next) return;

      gliding = true;
      next.scrollIntoView({ behavior: "smooth" });
    };

    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(onScrollEnd, 140);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Même geste que maka.araylab.com : le nouveau thème s'ouvre en cercle
  // depuis le bouton, là où le navigateur connaît les View Transitions.
  const toggleTheme = () => {
    const root = document.documentElement;
    const apply = () => {
      const dark = root.classList.toggle("dark");
      try {
        localStorage.setItem("theme", dark ? "dark" : "light");
      } catch {}
    };
    const doc = document as ViewTransitionDocument;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const button = themeButtonRef.current;
    if (!doc.startViewTransition || reduced || !button) return apply();

    const b = button.getBoundingClientRect();
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    doc.startViewTransition(apply).ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${r}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
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
        ref={themeButtonRef}
        onClick={toggleTheme}
        className="theme-toggle fixed top-8 right-8 z-20"
        aria-label="Changer le thème"
      >
        <svg
          className="sun"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <svg
          className="moon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.6 6.6 0 0 0 10.7 10.7z" />
        </svg>
      </button>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="relative flex flex-col gap-4">
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
                className="block w-2 h-8 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/60 transition-colors duration-500"
                aria-label={`Naviguer vers ${section.label}`}
                aria-current={activeSection === section.id ? "true" : undefined}
              />
              {hoveredSection === section.id &&
                activeSection !== section.id && (
                  <div className="nav-marker-label absolute left-6 top-1/2 px-3 py-1.5 bg-muted text-foreground text-sm rounded whitespace-nowrap shadow-lg pointer-events-none">
                    {section.label}
                  </div>
                )}
            </div>
          ))}

          {/* Le marqueur : une seule pastille qui glisse vers la section
              active (pas de 3rem = hauteur d'un trait + écart). */}
          {(() => {
            const index = sections.findIndex((s) => s.id === activeSection);
            if (index === -1) return null;
            return (
              <div
                className="nav-marker absolute left-0 top-0 w-2 h-8 rounded-full bg-foreground pointer-events-none"
                style={{ "--i": index } as CSSProperties}
                aria-hidden="true"
              >
                <div
                  key={activeSection}
                  className="nav-marker-label absolute left-6 top-1/2 px-3 py-1.5 bg-foreground text-background text-sm rounded whitespace-nowrap shadow-lg"
                >
                  {sections[index].label}
                </div>
              </div>
            );
          })()}
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
                  PORTFOLIO / {content.meta.year}
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  {content.hero.firstName}
                  <br />
                  <span className="text-muted-foreground">
                    {content.hero.lastName}
                  </span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {content.hero.tagline}
                  <span className="text-foreground">
                    {" "}
                    {content.hero.highlights[0]}
                  </span>
                  ,
                  <span className="text-foreground">
                    {" "}
                    {content.hero.highlights[1]}
                  </span>{" "}
                  et
                  <span className="text-foreground">
                    {" "}
                    {content.hero.highlights[2]}
                  </span>
                  .
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {content.hero.availability}
                  </div>
                  <div>{content.hero.location}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-start space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  ACTUELLEMENT
                </div>
                <div className="space-y-2">
                  <div className="text-foreground">
                    {content.hero.current.status}
                  </div>
                  <div className="text-muted-foreground">
                    {content.hero.current.domain}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {content.hero.current.experience}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  EXPERTISE
                </div>
                <div className="flex flex-wrap gap-2">
                  {content.hero.expertise.map((skill) => (
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
                href={content.hero.cvPath}
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
                {content.about.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground font-mono">
                    FORMATION
                  </div>
                  <div className="space-y-3">
                    {content.about.education.map((edu, index) => (
                      <div key={index}>
                        <div className="text-foreground font-medium">
                          {edu.degree}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {edu.school}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {edu.period}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground font-mono">
                    CONTACT
                  </div>
                  <div className="space-y-2">
                    <Link
                      target="_blank"
                      href={`mailto:${content.about.contact.email}`}
                      className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
                    >
                      <span>{content.about.contact.email}</span>
                    </Link>
                    <div className="text-muted-foreground">
                      {content.about.contact.phone}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {content.about.contact.address}
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
                {content.experience.period}
              </div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {content.experience.jobs.map((job, index) => (
                <div
                  key={index}
                  {...reveal(index)}
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
              {content.projects.map((project, index) => (
                <article
                  key={index}
                  {...reveal(index % 2, 120)}
                  className="group border border-border rounded-lg overflow-hidden hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 object-cover"
                      width={1200}
                      height={500}
                      loading={index < 2 ? "eager" : "lazy"}
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      quality={85}
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
                const photos = content.gallery;
                const column1 = photos.filter((_, i) => i % 2 === 0);
                const column2 = photos.filter((_, i) => i % 2 !== 0);
                return (
                  <>
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                      {column1.map((photo, index) => (
                        <div
                          key={index}
                          {...reveal(index * 2)}
                          className="group relative overflow-hidden rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-500"
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={1200}
                            height={800}
                            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            quality={80}
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
                          {...reveal(index * 2 + 1)}
                          className="group relative overflow-hidden rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-500"
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={1200}
                            height={800}
                            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            quality={80}
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
              {content.community.map((activity, index) => (
                <div
                  key={index}
                  {...reveal(index)}
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

            {/* Les outils, avec leur logo, en cartes ; les savoir-faire sans
                logo (architecture, qualités) en étiquettes, à part. */}
            <div className="grid gap-6 lg:grid-cols-2">
              {content.skills
                .filter((category) => category.skills.some((s) => s.iconUrl))
                .map((category, categoryIndex) => (
                  <div
                    key={category.title}
                    {...reveal(categoryIndex % 2, 120)}
                    className="p-5 sm:p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-500 space-y-5"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-sm text-muted-foreground font-mono">
                        {category.title}
                      </h3>
                      <span className="text-xs text-muted-foreground/60 font-mono">
                        {String(category.skills.length).padStart(2, "0")}
                      </span>
                    </div>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-1.5">
                      {category.skills.map((skill) => (
                        <li
                          key={skill.name}
                          className="group flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted/60 transition-colors duration-300"
                        >
                          <span className="grid place-items-center w-9 h-9 shrink-0 rounded-md bg-muted/50 group-hover:bg-background transition-colors duration-300">
                            {skill.iconUrl && (
                              <Image
                                src={skill.iconUrl}
                                alt=""
                                className={`w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-300 ${
                                  "mono" in skill && skill.mono ? "icon-mono" : ""
                                }`}
                                loading="lazy"
                                width={20}
                                height={20}
                                unoptimized
                              />
                            )}
                          </span>
                          <span className="min-w-0 text-sm leading-snug">
                            {skill.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
              {content.skills
                .filter((category) => !category.skills.some((s) => s.iconUrl))
                .map((category, categoryIndex) => (
                  <div
                    key={category.title}
                    {...reveal(categoryIndex % 2, 120)}
                    className="space-y-4"
                  >
                    <h3 className="text-sm text-muted-foreground font-mono">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-3 py-1.5 text-sm border border-border rounded-full bg-muted/50 hover:border-muted-foreground/50 transition-colors duration-300"
                        >
                          {skill.name}
                        </span>
                      ))}
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
              {content.publications.map((post, index) => (
                <Link
                  key={index}
                  {...reveal(index % 2, 120)}
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
                  Toujours ouvert pour échanger autour de belles problématiques
                  d'architecture, de nouveaux défis backend ou d'opportunités de
                  collaboration.
                </p>
                <div className="space-y-4">
                  <Link
                    target="_blank"
                    href={`mailto:${content.about.contact.email}`}
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">
                      {content.about.contact.email}
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
                  <div className="text-muted-foreground">
                    {content.about.contact.phone}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">
                RÉSEAUX SOCIAUX
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.socials.map((social, index) => (
                  <Link
                    key={social.name}
                    {...reveal(index)}
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
                {content.meta.copyright}
              </div>
              <div className="text-xs text-muted-foreground">
                {content.meta.madeIn}
              </div>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
