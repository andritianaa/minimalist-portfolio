"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import content from "./content.json";

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
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      },
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
              {content.skills.map((category, categoryIndex) => (
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
                            category.title === "QUALITÉS" ||
                            category.title === "ARCHITECTURE & PATTERNS"
                              ? "bg-muted/50"
                              : ""
                          }`}
                        >
                          {skill.iconUrl && (
                            <Image
                              src={skill.iconUrl}
                              alt={skill.name}
                              className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                              width={16}
                              height={16}
                              unoptimized
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
              {content.publications.map((post, index) => (
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
                {content.socials.map((social) => (
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
