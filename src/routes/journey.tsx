import { ProgressMilestones } from "@/components/ProgressMilestones";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LockKeyhole, Sparkles, Trophy, CircleCheck, GraduationCap } from "lucide-react";
import { PageShell, SaveNotice } from "@/components/SiteNav";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "XP Journey — Missões, XP e níveis" },
      {
        name: "description",
        content:
          "Simulação do XP Journey: complete missões, ganhe XP, suba de nível e desbloqueie badges. Veja como a jornada funciona na prática.",
      },
      { property: "og:title", content: "XP Journey — Missões, XP e níveis" },
      {
        property: "og:description",
        content:
          "Complete missões, ganhe XP e suba de nível. Simulação interativa do XP Journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JourneyPage,
});

type Mission = {
  id: number;
  title: string;
  tag: string;
  xp: number;
  steps: number;
};

const MISSIONS: Mission[] = [
  { id: 1, title: "Concluir a trilha Fundamentos", tag: "Academy · Educação", xp: 100, steps: 1 },
  { id: 2, title: "Fazer o primeiro aporte de R$ 30", tag: "Journey · CDB liquidez diária", xp: 200, steps: 2 },
  { id: 3, title: "3 aportes mensais de R$ 120 seguidos", tag: "Journey · Consistência", xp: 150, steps: 3 },
  { id: 4, title: "Manter a reserva por 6 meses", tag: "Journey · Disciplina", xp: 250, steps: 3 },
];

const XP_PER_LEVEL = 500;

function JourneyPage() {
  const { progress: saved, update } = useProgress();
  const xp = saved.journey_xp;
  const progress = saved.mission_progress as Record<number, number>;
  const done = saved.mission_done as Record<number, boolean>;
  const academyValidatedCount = [0, 1, 2, 3].filter((i) => saved.lessons_completed[`verified-v2-fundamentos-${i}`]).length;
  const academyFundamentosComplete = academyValidatedCount === 4;
  const [celebration, setCelebration] = useState<{ title: string; subtitle: string; xp: number } | null>(null);

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const levelTitle = level >= 8 ? "Investidor" : level >= 5 ? "Estrategista" : level >= 3 ? "Explorador" : "Iniciante";
  const levelXp = xp % XP_PER_LEVEL;
  const pct = Math.round((levelXp / XP_PER_LEVEL) * 100);

  function triggerCelebration(title: string, subtitle: string, gainXp: number) {
    setCelebration({ title, subtitle, xp: gainXp });
  }

  function advance(m: Mission) {
    if (done[m.id]) return;
    if (m.id === 1 && !academyFundamentosComplete) {
      toast.error("Missão bloqueada", {
        description: "Conclua e valide as quatro aulas de Fundamentos na XP Academy para liberar esta missão.",
      });
      return;
    }
    const current = progress[m.id] ?? 0;
    const next = current + 1;
    if (next >= m.steps) {
      update((p) => ({
        mission_done: { ...p.mission_done, [m.id]: true },
        mission_progress: { ...p.mission_progress, [m.id]: m.steps },
        journey_xp: p.journey_xp + m.xp,
      }));
      toast.success("Missão concluída", { description: `+${m.xp} XP adicionados ao seu Journey.` });
      triggerCelebration("Missão concluída!", `${m.title} liberou uma nova conquista na sua jornada.`, m.xp);
    } else {
      update((p) => ({ mission_progress: { ...p.mission_progress, [m.id]: next } }));
      toast(`Etapa registrada`, { description: `${m.title}: ${next}/${m.steps}` });
    }
  }

  return (
    <PageShell>
      <CelebrationOverlay
        open={!!celebration}
        title={celebration?.title ?? ""}
        subtitle={celebration?.subtitle}
        xp={celebration?.xp}
        onClose={() => setCelebration(null)}
      />

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">XP Journey · simulação</span>
          <h1 className="mt-3 max-w-[20ch] font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Sua jornada, <span className="text-brand">ao vivo</span>
          </h1>
          <p className="mt-4 max-w-[52ch] text-pretty text-mist">
            Evolua com educação financeira, missões e conquistas. O XP reflete aprendizagem validada e progresso na jornada; operações financeiras apresentadas aqui são simulações.
          </p>
          <SaveNotice />
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 pb-16 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="sticky top-6 rounded-3xl bg-card p-6 ring-1 ring-line xp-finance-glow">
              <div className="flex items-center justify-between">
                <span className="text-xs text-mist">Seu nível</span>
                <span className="rounded-full bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand">Nível {level} · {levelTitle}</span>
              </div>
              <div className="mt-5 flex items-center gap-5">
                <div className="relative size-28 shrink-0">
                  <div
                    className="size-28 rounded-full transition-all duration-500"
                    style={{
                      background: `conic-gradient(var(--color-brand) 0deg, var(--color-brand2) ${pct * 3.6}deg, var(--color-line) ${pct * 3.6}deg 360deg)`,
                    }}
                  />
                  <div className="absolute inset-[10px] grid place-items-center rounded-full bg-ink2">
                    <div className="text-center">
                      <div className="font-display text-2xl font-semibold">{pct}%</div>
                      <div className="text-[10px] text-mist">do nível</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl font-semibold">{xp.toLocaleString("pt-BR")} XP</div>
                  <div className="mt-1 text-xs text-mist">Faltam {XP_PER_LEVEL - levelXp} XP para o nível {level + 1}</div>
                </div>
              </div>
              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="xp-progress-fill h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-mist">Próximo desbloqueio</div>
                <div className="mt-2 font-semibold">{level < 3 ? "Cashback básico demonstrativo no XP Pass" : level < 5 ? "Taxa reduzida demonstrativa no XP Pass" : "Novas conquistas e badges"}</div>
                <div className="mt-1 text-xs text-mist">Continue concluindo missões e validando aulas para avançar.</div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-card p-3 ring-1 ring-line"><div className="font-display text-lg font-semibold">{Object.values(done).filter(Boolean).length}</div><div className="text-[10px] text-mist">missões</div></div>
                <div className="rounded-xl bg-card p-3 ring-1 ring-line"><div className="font-display text-lg font-semibold">{level}</div><div className="text-[10px] text-mist">nível</div></div>
                <div className="rounded-xl bg-card p-3 ring-1 ring-line"><div className="font-display text-lg font-semibold text-gold">{Object.values(done).filter(Boolean).length >= 2 ? "2" : "1"}</div><div className="text-[10px] text-mist">badges</div></div>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-8">
            <div className="xp-mission-card overflow-hidden rounded-3xl p-5 text-sm text-white shadow-[0_14px_50px_rgba(255,199,0,.08)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/18 text-brand ring-1 ring-brand/30"><LockKeyhole size={24} /></div>
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand"><GraduationCap size={14} /> missão guiada pela Academy</div>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">Desbloqueie Fundamentos na Academy</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/82">A missão Fundamentos é liberada após a aprovação nas quatro avaliações da XP Academy. As missões de aportes e reserva são experiências demonstrativas, sem registro de movimentações bancárias.</p>
                  </div>
                </div>
                <Link to="/academy" className="xp-cta-pulse inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[0_0_30px_rgba(255,199,0,.14)] hover:bg-brand2"><Sparkles size={16} /> Abrir Academy</Link>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="xp-mission-chip rounded-2xl p-4"><div className="text-[11px] uppercase tracking-[0.18em] text-white/60">avaliações validadas</div><div className="mt-2 font-display text-3xl font-semibold text-brand">{academyValidatedCount}/4</div></div>
                <div className="xp-mission-chip rounded-2xl p-4"><div className="text-[11px] uppercase tracking-[0.18em] text-white/60">critério de desbloqueio</div><div className="mt-2 flex items-center gap-2 font-semibold"><CircleCheck size={16} className="text-emerald-300" /> Acertar as 4 avaliações</div></div>
                <div className="xp-mission-chip rounded-2xl p-4"><div className="text-[11px] uppercase tracking-[0.18em] text-white/60">lógica da recompensa</div><div className="mt-2 flex items-center gap-2 font-semibold"><Trophy size={16} className="text-gold" /> Disciplina, não sorte</div></div>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-black/20"><div className="xp-progress-fill h-full rounded-full bg-brand" style={{ width: `${academyValidatedCount * 25}%` }} /></div>
            </div>

            {MISSIONS.map((m) => {
              const p = progress[m.id] ?? 0;
              const isDone = !!done[m.id];
              const missionPct = m.id === 1 && academyFundamentosComplete && !isDone ? 100 : Math.round((p / m.steps) * 100);
              return (
                <div key={m.id} className={`rounded-3xl p-6 ring-1 transition-all duration-200 hover:-translate-y-1 hover:bg-surface-hover ${isDone ? "bg-brand/[0.08] ring-line shadow-[0_0_28px_rgba(255,199,0,.08)]" : "bg-card ring-line"}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`grid size-9 place-items-center rounded-lg font-display text-sm font-bold ${isDone ? "bg-brand text-brand-foreground" : "bg-brand/15 text-brand"}`}>{isDone ? "✓" : m.id}</span>
                      <div>
                        <div className="font-semibold">{m.title}</div>
                        <div className="text-xs text-mist">{m.tag}</div>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${isDone ? "text-brand" : "text-foreground"}`}>+{m.xp} XP</span>
                  </div>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10"><div className={`xp-progress-fill h-full rounded-full transition-all duration-500 ${isDone ? "bg-brand" : "bg-brand2"}`} style={{ width: `${missionPct}%` }} /></div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs text-mist">{isDone ? "Concluída · badge liberada" : p > 0 ? `Em andamento · ${p} de ${m.steps}` : `${m.steps} etapa${m.steps > 1 ? "s" : ""} para concluir`}</span>
                    <button onClick={() => advance(m)} disabled={isDone || (m.id === 1 && !academyFundamentosComplete)} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${isDone ? "cursor-default bg-white/5 text-mist" : "bg-brand text-brand-foreground hover:bg-brand2"} ${(m.id === 1 && !academyFundamentosComplete) ? "opacity-60" : ""}`}>{isDone ? "Concluída" : p > 0 ? "Continuar" : "Iniciar"}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

            <div className="relative z-10 mx-auto max-w-6xl px-5 pb-12 sm:px-8"><ProgressMilestones /></div>
    </PageShell>
  );
}
