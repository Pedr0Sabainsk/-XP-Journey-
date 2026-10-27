import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { BadgeCheck, CreditCard, Crown, Sparkles, Wallet } from "lucide-react";
import { PageShell } from "@/components/SiteNav";

export const Route = createFileRoute("/pass-premium")({
  head: () => ({
    meta: [
      { title: "XP Pass Premium — O upgrade da sua jornada" },
      { name: "description", content: "Simulação do XP Pass Premium: assinatura mensal com cashback máximo, consultoria dedicada e missões exclusivas. Calcule quanto você economiza." },
      { property: "og:title", content: "XP Pass Premium — O upgrade da sua jornada" },
      { property: "og:description", content: "Assinatura mensal com benefícios exclusivos. Simule quanto o Premium retorna para você." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PremiumPage,
});

const PREMIUM_PRICE = 14.9;

function PremiumPage() {
  const [monthlySpend, setMonthlySpend] = useState(3000);
  const [monthlyTrades, setMonthlyTrades] = useState(10);
  const cashback = monthlySpend * 0.02;
  const brokerageSaved = monthlyTrades * 4.9 * 0.5;
  const totalReturn = cashback + brokerageSaved;
  const net = totalReturn - PREMIUM_PRICE;
  const breakEvenSpend = useMemo(() => Math.max(0, ((PREMIUM_PRICE - brokerageSaved) / 0.02)), [brokerageSaved]);

  return (
    <PageShell>
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">XP Pass Premium · simulação</span>
          <h1 className="mt-3 max-w-[22ch] font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Descubra o <span className="text-brand">valor do Premium</span></h1>
          <p className="mt-4 max-w-[58ch] text-pretty text-mist">Compare o plano gratuito com o Premium e estime o custo-benefício de uma assinatura mensal. Todos os valores são hipóteses comerciais em avaliação.</p>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl space-y-8 px-5 pb-16 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <div className="rounded-3xl bg-card p-6 ring-1 ring-line sm:p-8">
              <div className="font-display text-xl font-semibold">Calculadora de custo-benefício</div>
              <div className="mt-8">
                <div className="flex items-center justify-between"><label className="text-sm text-mist">Gasto mensal no cartão</label><span className="font-display text-lg font-semibold">R$ {monthlySpend.toLocaleString("pt-BR")}</span></div>
                <input type="range" min={500} max={20000} step={100} value={monthlySpend} onChange={(e) => setMonthlySpend(Number(e.target.value))} className="mt-3 w-full accent-brand" />
              </div>
              <div className="mt-8">
                <div className="flex items-center justify-between"><label className="text-sm text-mist">Operações de corretagem por mês</label><span className="font-display text-lg font-semibold">{monthlyTrades}</span></div>
                <input type="range" min={0} max={60} value={monthlyTrades} onChange={(e) => setMonthlyTrades(Number(e.target.value))} className="mt-3 w-full accent-brand" />
              </div>
              <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm">
                <div className="flex justify-between"><span className="text-mist">Cashback de 2% no cartão</span><span className="font-semibold text-brand">+ R$ {cashback.toFixed(2).replace(".", ",")}</span></div>
                <div className="flex justify-between"><span className="text-mist">Economia em corretagem (-50%)</span><span className="font-semibold text-brand">+ R$ {brokerageSaved.toFixed(2).replace(".", ",")}</span></div>
                <div className="flex justify-between"><span className="text-mist">Assinatura Premium</span><span className="font-semibold text-gold">− R$ {PREMIUM_PRICE.toFixed(2).replace(".", ",")}</span></div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4"><span className="font-semibold">Retorno líquido mensal</span><span className={`font-display text-2xl font-semibold ${net >= 0 ? "text-brand" : "text-gold"}`}>{net >= 0 ? "+" : "−"} R$ {Math.abs(net).toFixed(2).replace(".", ",")}</span></div>
                <p className="text-xs text-mist">{net >= 0 ? "Neste cenário ilustrativo, os benefícios projetados superam o preço hipotético." : "Nesse perfil, o Pass gratuito pode ser suficiente por enquanto."}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-card p-7 ring-1 ring-line">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand"><Crown size={14} /> plano hipotético</div>
              <div className="mt-4 font-display text-4xl font-semibold">R$ {PREMIUM_PRICE.toFixed(2).replace(".", ",")}<span className="text-sm text-mist">/mês</span></div>
              <div className="mt-1 text-xs text-mist">hipótese do relatório, em validação</div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <CompareCard title="Pass grátis" items={["Benefícios por nível", "Evolução gradual", "Sem mensalidade"]} icon={<Wallet size={18} />} />
                <CompareCard title="Premium" highlight items={["Cashback hipotético de 2%", "-50% em corretagem", "Camada extra de benefícios"]} icon={<CreditCard size={18} />} />
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm">
                <div className="flex items-center gap-2 font-semibold"><BadgeCheck size={16} className="text-brand" /> Ponto de equilíbrio estimado</div>
                <p className="mt-2 text-mist">Considerando suas operações atuais, o cashback começaria a compensar o preço mensal perto de <span className="font-semibold text-white">R$ {breakEvenSpend.toFixed(0).replace(".", ",")}</span> em gasto mensal no cartão.</p>
              </div>
              <div className="mt-6 rounded-2xl border border-brand/20 bg-brand/10 p-4 text-xs text-white/85"><span className="font-semibold">Importante:</span> cashback, descontos e demais benefícios mostrados aqui são ilustrativos e não representam uma oferta comercial vigente.</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MiniPremiumCard icon={<Sparkles size={18} />} title="Valor percebido" text="A proposta visualiza de forma simples quando o Premium agrega valor e quando não agrega." />
            <MiniPremiumCard icon={<BadgeCheck size={18} />} title="Transparência" text="O usuário vê preço, benefícios e retorno líquido no mesmo lugar, com regras claras." />
            <MiniPremiumCard icon={<Crown size={18} />} title="Comparação objetiva" text="Benefícios e custo mensal reunidos em uma única visão para apoiar uma decisão informada." />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function CompareCard({ title, items, icon, highlight = false }: { title: string; items: string[]; icon: ReactNode; highlight?: boolean }) {
  return <div className={`rounded-2xl border p-4 ${highlight ? "border-brand/30 bg-brand/[0.08]" : "border-white/10 bg-white/[0.03]"}`}><div className="flex items-center gap-2 font-semibold">{icon}{title}</div><ul className="mt-3 space-y-2 text-sm text-mist">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>;
}
function MiniPremiumCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className="rounded-3xl bg-card p-5 ring-1 ring-line"><div className="flex items-center gap-2 text-brand">{icon}<span className="font-semibold">{title}</span></div><p className="mt-3 text-sm text-mist">{text}</p></div>;
}
