import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Trophy } from "lucide-react";
import { Section } from "./Section";
import { profile } from "@/data/portfolio";
import { Skeleton } from "@/components/ui/skeleton";

type ChessStats = {
  chess_rapid?: { last?: { rating: number; date: number }; best?: { rating: number }; record?: { win: number; loss: number; draw: number } };
  chess_blitz?: { last?: { rating: number; date: number }; best?: { rating: number }; record?: { win: number; loss: number; draw: number } };
  chess_bullet?: { last?: { rating: number; date: number }; best?: { rating: number }; record?: { win: number; loss: number; draw: number } };
};

const fetchStats = async (): Promise<ChessStats> => {
  const res = await fetch(`https://api.chess.com/pub/player/${profile.chessUsername}/stats`);
  if (!res.ok) throw new Error("Failed to load Chess.com stats");
  return res.json();
};

const formats = [
  { key: "chess_rapid", label: "Rapid" },
  { key: "chess_blitz", label: "Blitz" },
  { key: "chess_bullet", label: "Bullet" },
] as const;

const formatDate = (ts?: number) =>
  ts ? new Date(ts * 1000).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "—";

const Donut = ({ win, loss, draw }: { win: number; loss: number; draw: number }) => {
  const total = Math.max(1, win + loss + draw);
  const r = 36;
  const c = 2 * Math.PI * r;
  const seg = (v: number) => (v / total) * c;
  const winLen = seg(win);
  const drawLen = seg(draw);
  const lossLen = seg(loss);
  return (
    <div className="relative grid h-28 w-28 place-items-center">
      <svg viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="hsl(var(--accent))" strokeWidth="10"
          strokeDasharray={`${winLen} ${c - winLen}`}
        />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="hsl(var(--muted-foreground))" strokeWidth="10"
          strokeDasharray={`${drawLen} ${c - drawLen}`}
          strokeDashoffset={-winLen}
        />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="hsl(var(--destructive))" strokeWidth="10"
          strokeDasharray={`${lossLen} ${c - lossLen}`}
          strokeDashoffset={-(winLen + drawLen)}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-mono text-lg font-bold">{Math.round((win / total) * 100)}%</p>
        <p className="font-mono text-[10px] text-muted-foreground">win</p>
      </div>
    </div>
  );
};

export const Chess = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chess-stats", profile.chessUsername],
    queryFn: fetchStats,
    staleTime: 60_000,
    retry: 1,
  });

  // Pick the format with the most games for the donut
  const topFormat = data
    ? formats
        .map((f) => ({ ...f, rec: data[f.key]?.record }))
        .filter((f) => f.rec)
        .sort((a, b) => {
          const sa = (a.rec!.win + a.rec!.loss + a.rec!.draw);
          const sb = (b.rec!.win + b.rec!.loss + b.rec!.draw);
          return sb - sa;
        })[0]
    : null;

  return (
    <Section
      id="beyond"
      eyebrow="cat beyond_work.md"
      title="Beyond Work — ♟ Chess"
      subtitle="When I'm not training models, I'm losing rating points on Chess.com. Live stats below."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {formats.map((f) => {
          const s = data?.[f.key];
          return (
            <div
              key={f.key}
              className="rounded-lg border border-border bg-card p-5 glow-hover"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-wider text-primary">{f.label}</p>
                <Trophy className="h-4 w-4 text-accent" />
              </div>
              {isLoading ? (
                <div className="mt-3 space-y-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ) : isError || !s?.last ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  {isError ? "Couldn't reach Chess.com." : "No games yet."}
                </p>
              ) : (
                <>
                  <p className="mt-3 font-mono text-3xl font-bold text-foreground">{s.last.rating}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    Best {s.best?.rating ?? "—"} · Last played {formatDate(s.last.date)}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {topFormat?.rec && (
        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            Why chess?
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            The same skills that make a good chess player — pattern recognition, evaluating
            tradeoffs, and recovering from a bad position — are the ones I bring to ML systems.
          </p>
          <a
            href={`https://www.chess.com/member/${profile.chessUsername}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
          >
            View profile <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}
    </Section>
  );
};
