import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { TrendingUp, ShieldCheck, Coins, Calculator } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
/** Projeção simplificada, bruta, de um CDB hipotético a 80% do CDI.
 * Recompensas condicionais são calculadas e exibidas em linha separada. */
export function FinancialCompass({compact = false}: {compact?: boolean}) {
  const [monthly, setMonthly] = useState(120);
  const [months, setMonths] = useState(12);
  const [cdi, setCdi] = useState(12);
  const { progress } = useProgress();
  const monthlyRate = Math.pow(1 + (cdi / 100) * .8, 1 / 12) - 1;
  const rewardMonthlyRate = Math.pow(1 + (cdi / 100) * .1, 1 / 12) - 1;
  let balance = 30;
  let deposits = 30;
  let rewards = 0;
  const data = [{ month: 0, balance, contributed: deposits }];
  for (let i = 1; i <= months; i++) {
    rewards += balance * rewardMonthlyRate;
    balance = balance * (1 + monthlyRate) + monthly;
    deposits += monthly;
    data.push({month: i, balance: Math.round(balance * 100) / 100, contributed: deposits});
  }
  const earn = balance - deposits;
  const level = Math.floor(progress.journey_xp / 500) + 1;
  return <section className="xp-finance-glow rounded-3xl border border-brand/30 bg-[#101414] p-5 shadow-2xl sm:p-7" aria-label="Minha evolução financeira simulada">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><span className="text-xs font-bold uppercase tracking-[.22em] text-brand">Meu futuro financeiro · simulação</span><h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">Seu dinheiro pode <span className="text-brand">evoluir com constância.</span></h2></div><span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs text-brand">Nível {level} · {progress.journey_xp} XP educacional / ilustrativo</span></div>
    <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-white/[.06] p-4"><p className="text-xs text-slate-300">Patrimônio projetado</p><p className="mt-1 text-2xl font-bold text-white">{BRL.format(balance)}</p></div><div className="rounded-2xl bg-white/[.06] p-4"><p className="text-xs text-slate-300">Rendimento bruto estimado do CDB</p><p className="mt-1 text-xl font-bold text-emerald-300">+ {BRL.format(earn)}</p></div><div className="rounded-2xl bg-white/[.06] p-4"><p className="text-xs text-slate-300">Recompensas condicionais estimadas</p><p className="mt-1 text-xl font-bold text-amber-300">+ {BRL.format(rewards)}</p></div></div>
    <div className="mt-5 h-36 w-full sm:h-44" role="img" aria-label="Gráfico de evolução simulada do patrimônio conforme o período e aporte"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><defs><linearGradient id="financeCompassGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#facc15" stopOpacity={.35}/><stop offset="100%" stopColor="#facc15" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="month" tick={{fill:"#cbd5e1",fontSize:11}} axisLine={false} tickLine={false}/><Tooltip formatter={(v) => BRL.format(Number(v))} labelFormatter={(v)=>`Mês ${v}`}/><Area dataKey="balance" name="Patrimônio" type="monotone" stroke="#facc15" strokeWidth={3} fill="url(#financeCompassGrad)" isAnimationActive={true}/></AreaChart></ResponsiveContainer></div>
    <div className="mt-4 grid gap-4 sm:grid-cols-3"><label className="text-xs text-slate-200">Aporte mensal <strong className="block text-lg text-white">{BRL.format(monthly)}</strong><input aria-label="Aporte mensal" className="mt-2 w-full accent-yellow-400" type="range" min="30" max="1000" step="10" value={monthly} onChange={e=>setMonthly(+e.target.value)}/></label><label className="text-xs text-slate-200">Período <strong className="block text-lg text-white">{months} meses</strong><input aria-label="Período em meses" className="mt-2 w-full accent-yellow-400" type="range" min="3" max="60" step="3" value={months} onChange={e=>setMonths(+e.target.value)}/></label><label className="text-xs text-slate-200">CDI anual hipotético <strong className="block text-lg text-white">{cdi}% a.a.</strong><input aria-label="CDI hipotético" className="mt-2 w-full accent-yellow-400" type="range" min="8" max="16" step=".5" value={cdi} onChange={e=>setCdi(+e.target.value)}/></label></div>
    <p className="mt-4 text-xs leading-relaxed text-slate-300"><ShieldCheck className="mr-1 inline size-4 text-emerald-300"/> Simulação educacional: R$ 30 iniciais; CDB hipotético a 80% do CDI, recompensas condicionais equivalentes a 10% do CDI separadas do investimento. Valores brutos aproximados; não incluem IR, IOF, taxas nem condições comerciais. Recompensas dependem de critérios objetivos e podem não ocorrer. O XP não é dinheiro. Não há depósito ou saldo real aqui. FGC cobre produtos elegíveis, dentro dos limites aplicáveis. Não constitui oferta nem promessa de retorno.</p>
    {!compact && <div className="mt-4 flex flex-wrap gap-3"><Link to="/academy" className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-110">Aprender e desbloquear missões →</Link><Link to="/projeto" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-brand">Entenda as hipóteses</Link></div>}
  </section>;
}
