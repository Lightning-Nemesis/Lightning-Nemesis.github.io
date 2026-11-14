import { useEffect, useRef } from 'react';
import AsciiPortrait from './AsciiPortrait';
import AsciiFigure from './AsciiFigure';
import TwinPanel from './TwinPanel';
import useTwinChat from '../agent/useTwinChat';
import { GridTunnel, Motes, StarField, useParallax } from './CyberFx';
import { DEFAULTS, extrudeShadow, lookFrom, sceneVars, triplet } from './sceneConfig';
import { person } from '../data/profile';

// Candidate home layouts. LabPage shows them side by side; HomePage renders the chosen one.
const TWIN = `${process.env.PUBLIC_URL}/twin`;
const media = { video: `${TWIN}/idle.mp4`, poster: `${TWIN}/portrait.png` };
const LABEL = `ASCII portrait of ${person.name.split(' ')[0]}`;

// light directions (where the light comes from, screen space) per scene
const FROM_HORIZON = [0, 1];
const FROM_MOON = [-0.6, -0.8];

// The ask panel at the foot of a full-screen scene. Before the first question it sits at the bottom of the
// screen. Once the conversation fills in, the scene grows by the conversation's height (--grow), so the
// panel's top edge stays put and the page gets longer (as on matthewpetersen.ca) instead of the panel
// climbing over the figure. While the visitor follows along, the page scrolls to keep the input in view.
function Dock({ chat }) {
  const ref = useRef(null);
  useEffect(() => {
    const dock = ref.current;
    const scene = dock.parentElement;
    const smooth = !window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    let last = dock.offsetHeight;
    const ro = new ResizeObserver(() => {
      const panel = dock.querySelector('.tw-panel');
      const talk = dock.querySelector('.tw-exchange');
      const grow = talk ? talk.offsetHeight + parseFloat(getComputedStyle(panel).rowGap || 0) : 0;
      scene.style.setProperty('--grow', `${grow}px`);
      const h = dock.offsetHeight;
      const bottom = panel.getBoundingClientRect().bottom + 12;
      // follow only if the panel's foot was on screen before it grew, so a visitor who scrolled up stays put
      if (h > last && bottom > window.innerHeight && bottom - (h - last) <= window.innerHeight + 120) {
        window.scrollTo({ top: window.scrollY + bottom - window.innerHeight, behavior: smooth ? 'smooth' : 'auto' });
      }
      last = h;
    });
    ro.observe(dock);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="cx-dock">
      <TwinPanel chat={chat} />
    </div>
  );
}

function Figure({ chat, light, className = '' }) {
  return (
    <div className={`fig-wrap ${className}`}>
      <AsciiFigure {...media} look={lookFrom(DEFAULTS, light)} talking={chat.talking} label={LABEL} />
    </div>
  );
}

// 0. Current: the name on one line over the portrait, then the answer and the ask panel.
export function LayoutPetersen() {
  const chat = useTwinChat();
  return (
    <div className="hl hl-petersen">
      <h1 className="tw-name">
        <span className="tw-name-line">{person.name}</span>
      </h1>
      <div className="tw-portrait">
        <AsciiPortrait {...media} cols={120} aspect={1.6} zoom={1.25} focusY={0.45} talking={chat.talking} label={LABEL} />
      </div>
      <TwinPanel chat={chat} />
    </div>
  );
}

// A. Descent: a grid floor and ceiling run into a vanishing point at his feet; the glow there rim-lights
// him from below and the name is extruded toward it. Only the space moves with the pointer: he is a 2D
// video, so he stays put, and the glyphs near the pointer scramble instead. Every knob is in `cfg`
// (sceneConfig.js); #/playground edits it live.
export function LayoutDescent({ cfg = DEFAULTS }) {
  const chat = useTwinChat();
  const [ref, pos] = useParallax();
  const c = cfg.colors;
  return (
    <div ref={ref} className="hl cx cx-descent" style={sceneVars(cfg)}>
      <GridTunnel
        pos={pos}
        horizon={cfg.horizon}
        ceiling={cfg.ceiling}
        strength={cfg.gridStrength}
        dust={cfg.dust}
        sway={cfg.parallax}
        color={triplet(c.grid)}
        glowColor={triplet(c.glow)}
        dustColor={triplet(c.high)}
      />
      <div className="cx-vignette" aria-hidden="true" />
      <div className={`fig-stage${cfg.reflect ? ' reflect' : ''}`}>
        <AsciiFigure {...media} font={cfg.asciiFont} look={lookFrom(cfg, FROM_HORIZON)} talking={chat.talking} label={LABEL} />
      </div>
      <h1 className="tw-name cx-depth" style={{ '--z': 1.6 }}>
        <span className="tw-name-line extrude" style={{ textShadow: extrudeShadow(cfg) }}>
          {person.name}
        </span>
      </h1>
      {cfg.kicker && (
        <p className="cx-kicker cx-depth" style={{ '--z': 1.2 }}>
          Data scientist · building ML &amp; GenAI that ships
        </p>
      )}
      <Dock chat={chat} />
      <div className="cx-texture" aria-hidden="true" />
    </div>
  );
}

// E. Dreamfield (A + D): D's night sky and haze over A's floor, which runs into fog instead of a hard
// horizon. He stands on it, moonlit from the upper left, with motes drifting past at three depths.
export function LayoutDreamfield() {
  const chat = useTwinChat();
  const [ref, pos] = useParallax();
  return (
    <div ref={ref} className="hl cx cx-dream">
      <StarField />
      <div className="nebula" aria-hidden="true" />
      <GridTunnel pos={pos} horizon={0.7} ceiling={false} strength={0.55} dust={0} />
      <div className="fog" aria-hidden="true" />
      <h1 className="tw-name dream-name cx-depth" style={{ '--z': 1.2 }}>
        <span className="tw-name-line">{person.name}</span>
      </h1>
      <p className="cx-kicker cx-depth" style={{ '--z': 1 }}>
        Data scientist · building ML &amp; GenAI that ships
      </p>
      <Figure chat={chat} light={FROM_MOON} className="reflect grounded" />
      <Motes pos={pos} />
      <Dock chat={chat} />
    </div>
  );
}

const ORBIT = ['Data scientist', 'M.S. CS · ASU', 'GenAI', 'RAG', 'MLOps', 'GPA 4.0'];

// F. Nebula (D without the projector): he floats in deep space, dissolving into mist below, moonlit
// from the upper left; tags orbit him in 3D and the stars sit at three depths.
export function LayoutNebula() {
  const chat = useTwinChat();
  const [ref, pos] = useParallax();
  return (
    <div ref={ref} className="hl cx cx-nebula">
      <StarField />
      <div className="nebula" aria-hidden="true" />
      <h1 className="tw-name dream-name">
        <span className="tw-name-line">{person.name}</span>
      </h1>
      <div className="orbit-stage">
        <div className="orbit-body">
          <Figure chat={chat} light={FROM_MOON} className="floating" />
          <div className="orbit" aria-hidden="true">
            {ORBIT.map((t, i) => (
              <span key={t} className="orbit-tag" style={{ '--a': `${(i * 360) / ORBIT.length}deg`, '--y': `${((i % 3) - 1) * 70}px` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Motes pos={pos} count={30} />
      <Dock chat={chat} />
    </div>
  );
}

export const layouts = [
  { id: 'current', name: '0 · Current', note: 'The current home page, for comparison.', Component: LayoutPetersen },
  {
    id: 'descent',
    name: 'A · Descent',
    note: 'The portrait is fitted to its outline instead of cropped to a fixed strip; light from the vanishing point rim-lights the figure in cyan from below; three depth layers that move with the pointer.',
    Component: LayoutDescent,
  },
  {
    id: 'dreamfield',
    name: 'E · Dreamfield (A + D)',
    note: "D's stars and fog with A's floor grid (floor only, fading into the fog). The figure stands on the floor, moonlit from the upper left, with out-of-focus motes drifting past up close.",
    Component: LayoutDreamfield,
  },
  {
    id: 'nebula',
    name: 'F · Nebula (D without the projector)',
    note: 'No base or light cone: the figure floats in the nebula and dissolves into mist below, tags orbit in 3D, and the stars sit at three depths.',
    Component: LayoutNebula,
  },
];
