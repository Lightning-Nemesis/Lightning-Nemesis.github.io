import { useEffect, useState } from 'react';
import { awards, certifications, skillGroups } from '../data/profile';

const CHESS_USER = 'LightningNemesis';
const CHESS_MODES = [
  ['chess_rapid', 'Rapid'],
  ['chess_blitz', 'Blitz'],
  ['chess_bullet', 'Bullet'],
];

// Ratings come live from Chess.com's public API: undefined while loading, null if it can't be reached.
function useChessStats() {
  const [stats, setStats] = useState();
  useEffect(() => {
    let alive = true;
    fetch(`https://api.chess.com/pub/player/${CHESS_USER.toLowerCase()}/stats`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((data) => alive && setStats(data))
      .catch(() => alive && setStats(null));
    return () => {
      alive = false;
    };
  }, []);
  return stats;
}

export default function SkillsPage() {
  const chess = useChessStats();
  return (
    <div className="pb-grid">
      <main>
        <h1 className="pb-h1">Skills</h1>
        <p className="pb-dek">The full stack I reach for across data science, ML engineering, and Gen AI work.</p>

        <section className="pb-sec">
          <h2>Stack</h2>
          <div>
            {Object.entries(skillGroups).map(([group, items]) => (
              <div className="pb-item" key={group}>
                <div className="pb-hd">
                  <span className="t">{group}</span>
                </div>
                <div className="skill-list">
                  {items.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-sec">
          <h2>Awards &amp; Certifications</h2>
          <div>
            <p className="pb-lbl pb-grp">Awards</p>
            {awards.map((a) => (
              <div className="pb-item" key={a.title}>
                <div className="pb-hd">
                  <span className="t">{a.title}</span>
                  <span className="y">{a.date}</span>
                </div>
                <p>{a.detail}</p>
              </div>
            ))}
            <p className="pb-lbl pb-grp">Certifications</p>
            {certifications.map((c) => (
              <div className="pb-item" key={c.title}>
                <div className="pb-hd">
                  <span className="t">{c.title}</span>
                  <span className="y">{c.date}</span>
                </div>
                <p>
                  {c.issuer} · ID {c.id}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-sec">
          <h2>Chess</h2>
          <div>
            <p className="chess-intro">
              When I'm not training models, I'm losing rating points on Chess.com. Live stats below.
            </p>
            <div className="chess-stats">
              {CHESS_MODES.map(([key, label]) => {
                const mode = chess?.[key];
                const waiting = chess === undefined;
                return (
                  <div className="chess-stat" key={key}>
                    <p className="pb-lbl">{label}</p>
                    <p className="chess-rating">{mode ? mode.last.rating : waiting ? '…' : '–'}</p>
                    <p className="chess-meta">
                      {mode ? `Best ${mode.best.rating}` : waiting ? 'Loading' : 'Unavailable right now'}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="pb-item">
              <div className="pb-hd">
                <span className="t">Why chess?</span>
              </div>
              <p>
                Chess taught me to look for patterns, think a few moves ahead, and stay calm when a game goes wrong.
                I use all three when I build ML systems.
              </p>
            </div>
            <p className="pb-older">
              <a href={`https://www.chess.com/play/online/new?opponent=${CHESS_USER}`} target="_blank" rel="noreferrer">
                Challenge me to a game
              </a>
              {' · '}
              <a href={`https://www.chess.com/member/${CHESS_USER}`} target="_blank" rel="noreferrer">
                View profile
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
