import { useProgress } from "@/hooks/useProgress";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { Gift, Lock, Rocket, ShieldCheck, Star, Wallet } from "lucide-react";
import { PageShell } from "@/components/SiteNav";

export const Route = createFileRoute("/pass")({
  head: () => ({
    meta: [
      { title: "XP Pass — Benefícios por nível" },
      { name: "description", content: "Simulação do XP Pass: arraste seu nível e veja quais benefícios são desbloqueados — taxas reduzidas, cashback e suporte prioritário." },
      { property: "og:title", content: "XP Pass — Benefícios por nível" },
      { property: "og:description", content: "Quanto maior seu nível no XP Journey, mais benefícios o XP Pass desbloqueia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PassPage,
});

type Benefit = { level: number; title: string; value: string; description: string };
const BENEFITS: Benefit[] = [
  { level: 1, title: "Cashback básico", value: "0,5%", description: "Cashback em compras no cartão" },
  { level: 3, title: "Taxa reduzida", value: "-25%", description: "Desconto na corretagem" },
  { level: 5, title: "Cashback turbinado", value: "1%", description: "Cashback dobrado no cartão" },
  { level: 8, title: "Suporte prioritário", value: "24/7", description: "Atendimento sem fila" },
  { level: 10, title: "Taxa mínima", value: "-50%", description: "Metade da corretagem" },
  { level: 12, title: "Bônus de XP", value: "+10%", description: "XP extra em todas as missões" },
  { level: 15, title: "Cashback máximo", value: "2%", description: "O teto de cashback do Pass" },
  { level: 20, title: "Acesso antecipado", value: "VIP", description: "Novos produtos antes de todos" },
];
const MAX_LEVEL = 20;

function PassPage() {
  const { progress } = useProgress();
  const actualLevel = Math.floor(progress.journey_xp / 500) + 1;
  const [level, setLevel] = useState(Math.min(MAX_LEVEL, Math.max(1, actualLevel)));
  const unlocked = useMemo(() => BENEFITS.filter((b) => b.level <= level), [level]);
  const nextBenefit = BENEFITS.find((b) => b.level > level);

  return (
    <PageShell>
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">XP Pass · benefícios</span>
          <h1 className="mt-3 max-w-[22ch] font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Benefícios que acompanham sua <span className="text-brand">evolução</span></h1>
          <p className="mt-4 max-w-[58ch] text-pretty text-mist">Conquistas, níveis e benefícios reunidos em uma jornada transparente. Consulte os benefícios de cada nível, os critérios de desbloqueio e sua próxima conquista.</p>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_.9fr]">
            <div className="rounded-3xl bg-card p-6 ring-1 ring-line sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-mist">Seu nível simulado</div>
                  <div className="font-display text-5xl font-semibold">Nível <span className="text-brand">{level}</span></div>
                </div>
                <button onClick={() => setLevel(Math.min(MAX_LEVEL, actualLevel))} className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-black">Usar meu nível real ({actualLevel})</button>
              </div>
              <input type="range" min={1} max={MAX_LEVEL} value={level} onChange={(e) => setLevel(Number(e.target.value))} className="mt-6 w-full accent-brand" />
              <div className="mt-1 flex justify-between text-[10px] text-mist"><span>Nv. 1</span><span>Nv. {MAX_LEVEL}</span></div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <SmallPassCard icon={<Gift size={18} />} label="Liberados" value={`${unlocked.length}`} helper="benefícios demonstrativos" />
                <SmallPassCard icon={<ShieldCheck size={18} />} label="Status" value={nextBenefit ? "Em progresso" : "Completo"} helper={nextBenefit ? `próximo no nível ${nextBenefit.level}` : "todos os marcos vistos"} />
                <SmallPassCard icon={<Wallet size={18} />} label="Lógica" value="Regras claras" helper="sem sorteio ou multiplicadores aleatórios" />
              </div>
            </div>

            <div className="rounded-3xl bg-card p-6 ring-1 ring-line sm:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-mist">Próximo desbloqueio</div>
              {nextBenefit ? (
                <>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand"><Rocket size={14} /> nível {nextBenefit.level}</div>
                  <div className="mt-4 font-display text-3xl font-semibold">{nextBenefit.value}</div>
                  <div className="mt-2 text-lg font-semibold">{nextBenefit.title}</div>
                  <p className="mt-2 text-sm text-mist">{nextBenefit.description}</p>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-mist">Faltam {nextBenefit.level - level} nível{nextBenefit.level - level > 1 ? "s" : ""} para liberar esse benefício.</div>
                </>
              ) : (
                <div className="mt-4 rounded-2xl border border-brand/20 bg-brand/10 p-5 text-sm text-white">Você já visualizou todos os marcos demonstrativos do XP Pass.</div>
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => {
              const state = b.level <= level ? "unlocked" : b.level <= level + 2 ? "near" : "locked";
              return (
                <div key={b.title} className={`rounded-3xl p-6 ring-1 transition-all duration-200 hover:-translate-y-1 ${state === "unlocked" ? "bg-brand/[0.08] ring-brand/20 shadow-[0_0_24px_rgba(255,199,0,.08)]" : state === "near" ? "bg-white/[0.03] ring-white/15" : "bg-card ring-line opacity-60"}`}>
                  <div className="flex items-center justify-between"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${state === "unlocked" ? "bg-brand/20 text-brand" : "bg-white/10 text-mist"}`}>Nv. {b.level}</span><span className="text-xs">{state === "unlocked" ? "🔓" : state === "near" ? "⏳" : "🔒"}</span></div>
                  <div className={`mt-4 font-display text-3xl font-semibold ${state === "unlocked" ? "text-brand" : "text-mist"}`}>{b.value}</div>
                  <div className="mt-1 text-sm font-semibold">{b.title}</div>
                  <p className="mt-1 text-xs text-mist">{b.description}</p>
                  <div className="mt-4 text-[11px] text-mist">{state === "unlocked" ? "Disponível na simulação" : state === "near" ? "Quase lá" : "Bloqueado"}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-3xl bg-card p-6 ring-1 ring-line sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-display text-xl font-semibold">Quer ir além?</div>
                <p className="mt-1 max-w-[46ch] text-sm text-mist">Compare as condições do XP Pass gratuito com a proposta Premium e simule benefícios e custos da assinatura.</p>
              </div>
              <Link to="/pass-premium" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground ring-1 ring-brand/40 hover:bg-brand2">Conhecer o Premium</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function SmallPassCard({ icon, label, value, helper }: { icon: ReactNode; label: string; value: string; helper: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mist">{icon}{label}</div><div className="mt-2 font-display text-2xl font-semibold">{value}</div><div className="mt-1 text-xs text-mist">{helper}</div></div>;
}
