import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Flame, Sparkles, Trophy, ArrowRight } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

/** Live preview backed by the existing browser storage key via useProgress. */
export function JourneyPulse() {
  const { progress, loaded } = useProgress();
  const [displayXP, setDisplayXP] = useState(0);
  const xp = progress.journey_xp + progress.academy_xp;
  const level = Math.floor(xp / 500) + 1;
  const inLevel = xp % 500;
  useEffect(() => {
    if (!loaded) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDisplayXP(xp); return; }
    let frame = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      setDisplayXP(Math.round(xp * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [xp, loaded]);
  return <section aria-label="Seu progresso demonstrativo" className="journey-pulse rounded-3xl p-5 sm:p-7">
    <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[.2em] text-brand"><Sparkles className="mr-2 inline size-4"/> Meu painel de evolução</span><span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">Demonstração interativa</span></div>
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3"><div><p className="text-xs text-mist">Nível</p><p className="font-display text-4xl font-black text-white" aria-label={`Nível ${level}`}>{level}</p></div><div><p className="text-xs text-mist">XP conquistado</p><p className="font-display text-4xl font-black text-brand" aria-live="polite">{displayXP.toLocaleString("pt-BR")}</p></div><div className="col-span-2 flex items-center gap-2 sm:col-span-1"><Flame className="size-7 text-orange-400"/><div><p className="text-xs text-mist">Sequência</p><p className="text-sm font-semibold">Evolua com constância</p><p className="text-xs text-mist">Sem prazo artificial</p></div></div></div>
    <div className="mt-5 flex justify-between text-xs text-mist"><span>Próximo nível</span><span>{inLevel} / 500 XP</span></div>
    <div role="progressbar" aria-valuemin={0} aria-valuemax={500} aria-valuenow={inLevel} aria-label="Progresso até o próximo nível" className="mt-2 h-3 overflow-hidden rounded-full bg-white/10"><div className="xp-progress h-full rounded-full" style={{width: `${inLevel / 5}%`}}/></div>
    <div className="mt-5 flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-sm text-amber-200"><Trophy className="size-4"/> Evolução por aprendizado</span><Link to="/journey" className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline">Ver missões <ArrowRight className="size-4"/></Link></div>
  </section>;
}
