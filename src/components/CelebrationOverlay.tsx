import { Trophy, Sparkles, Star } from "lucide-react";
import { useEffect } from "react";

type CelebrationOverlayProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  xp?: number;
  onClose: () => void;
};

export function CelebrationOverlay({ open, title, subtitle, xp, onClose }: CelebrationOverlayProps) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(onClose, 2600);
    return () => window.clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
      <div className="xp-celebration pointer-events-none relative w-full max-w-md overflow-hidden rounded-[28px] border border-brand/35 bg-[#171717]/95 p-6 text-center text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,199,0,.22),transparent_45%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-80" />
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="xp-confetti-piece" style={{ left: `${(i * 7) % 100}%`, animationDelay: `${(i % 6) * 90}ms` }} />
        ))}
        <div className="relative z-10">
          <div className="mx-auto flex size-18 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/25 shadow-[0_0_50px_rgba(255,199,0,.18)]">
            <Trophy className="text-brand" size={34} />
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            <Sparkles size={14} /> recompensa liberada
          </div>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">{title}</h3>
          {subtitle ? <p className="mt-2 text-sm leading-relaxed text-white/78">{subtitle}</p> : null}
          <div className="mt-5 flex items-center justify-center gap-3">
            {typeof xp === "number" ? (
              <div className="rounded-2xl border border-brand/30 bg-brand/12 px-4 py-3 shadow-[0_0_35px_rgba(255,199,0,.12)]">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/65">XP recebido</div>
                <div className="mt-1 font-display text-2xl font-semibold text-brand">+{xp} XP</div>
              </div>
            ) : null}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/65">Status</div>
              <div className="mt-1 flex items-center gap-2 font-semibold text-white"><Star size={16} className="text-gold" /> Conquista registrada</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
