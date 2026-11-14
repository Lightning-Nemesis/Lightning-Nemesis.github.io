import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/profile';

// Temporary: tune --radius (cards and thumbnails) live. Not linked from the nav; open #/radius.
// The value applies to the whole page while you're here; bake the one you like into --radius in App.css.
const PRESETS = [0, 2, 4, 6, 8, 10, 12, 16, 20, 24];
const START = 10;

export default function RadiusPage() {
  const [r, setR] = useState(START);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--radius', `${r}px`);
    return () => root.style.removeProperty('--radius');
  }, [r]);

  return (
    <main className="proj-page radius-page">
      <header className="radius-bar">
        <p className="pb-lbl">Radius · {r}px</p>
        <input type="range" min="0" max="32" step="1" value={r} onChange={(e) => setR(Number(e.target.value))} aria-label="Corner radius" />
        <div className="chips">
          {PRESETS.map((v) => (
            <button key={v} className="chip" aria-pressed={r === v} onClick={() => setR(v)}>
              {v}
            </button>
          ))}
        </div>
      </header>

      <p className="radius-note">Project cards</p>
      <section className="proj-grid">
        {projects.slice(0, 3).map((p) => (
          <ProjectCard project={p} key={p.id} />
        ))}
      </section>
    </main>
  );
}
