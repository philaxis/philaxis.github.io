import Image from "next/image";
import Guestbook from "@/components/Guestbook";

const projects = [
  {
    name: "Markdown Lens",
    description: "Rendered context at the cursor for Obsidian Source mode.",
    language: "CSS",
    url: "https://github.com/philaxis/markdown-lens",
  },
  {
    name: "Rel Search",
    description: "Search Markdown and Canvas by content, structure, and relations.",
    language: "CSS",
    url: "https://github.com/philaxis/rel-search",
  },
  {
    name: "Fold PDF",
    description: "A private, browser-based workspace for editing PDF page layouts.",
    language: "TypeScript",
    url: "https://github.com/philaxis/pdf-layout-editor",
  },
  {
    name: "Topology Map",
    description: "A compact, interactive overview for connected Obsidian Canvas nodes.",
    language: "TypeScript",
    url: "https://github.com/philaxis/topology-map",
  },
  {
    name: "Minimal Timer",
    description: "Run multiple timers and stopwatches in one quiet interface.",
    language: "JavaScript",
    url: "https://github.com/philaxis/minimal-timer",
  },
];

export default function Home() {
  return (
    <div className="page">
      <header>
        <a className="mark" href="#top" aria-label="Back to top">
          <Image
            src="https://avatars.githubusercontent.com/u/91249027?v=4"
            width={32}
            height={32}
            alt=""
          />
          Juhyeok Kim
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#guestbook">Guestbook</a>
          <a href="https://github.com/philaxis">GitHub</a>
        </nav>
      </header>

      <main id="top">
        <p className="eyebrow">Juhyeok Kim · Seoul</p>
        <h1>This could be simpler.</h1>
        <p className="intro">
          That&apos;s usually where I start. I turn small everyday friction into focused software.
        </p>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="section-head">
            <h2 id="work-title">Things I&apos;ve made</h2>
            <a href="https://github.com/philaxis?tab=repositories">All projects ↗</a>
          </div>
          <ol className="projects">
            {projects.map((project, index) => (
              <li key={project.name}>
                <a href={project.url}>
                  <span className="number">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="project-name">{project.name}</span>
                    <span className="project-description">{project.description}</span>
                  </span>
                  <span className="language">{project.language}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <Guestbook />
      </main>

      <footer>
        <a className="contact" href="mailto:philaxis.dev@gmail.com">Say hello ↗</a>
        <div className="place">Juhyeok Kim<br />Seoul · 2026</div>
      </footer>
    </div>
  );
}
