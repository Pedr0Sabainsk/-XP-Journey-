import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const brl = (n: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

/** Projeção mensal ilustrativa: CDI constante, capitalização mensal equivalente e aportes no fim do mês. */
export function JourneySimulator() {
  const [monthly, setMonthly] = useState(120);
  const [years, setYears] = useState(4);
  const [cdi, setCdi] = useState(12);
  const { rows, invested, cdbReturn, estimatedRewards } = useMemo(() => {
    const months = years * 12;
    const rate = Math.pow(1 + (cdi / 100) * 0.8, 1 / 12) - 1;
    const rewardRate = Math.pow(1 + (cdi / 100) * 0.1, 1 / 12) - 1;
    let value = 30;
    let rewardTotal = 0;
    const rows = [{ month: 0, aportes: 30, cdb: 30, recompensas: 0 }];
    for (let m = 1; m <= months; m++) {
      rewardTotal += value * rewardRate;
      value = value * (1 + rate) + monthly;
      if (m % 6 === 0 || m === months) rows.push({ month: m, aportes: 30 + m * monthly, cdb: Math.round(value), recompensas: Math.round(rewardTotal) });
    }
    return { rows, invested: 30 + months * monthly, cdbReturn: value - (30 + months * monthly), estimatedRewards: rewardTotal };
  }, [monthly, years, cdi]);
  return (
    <section className="xp-glass rounded-3xl p-5 sm:p-8" aria-labelledby="sim-title">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand">Simulador educacional</p><h2 id="sim-title" className="mt-2 text-2xl font-bold sm:text-3xl">Sua disciplina em números</h2><p className="mt-2 max-w-xl text-sm text-mist">Cenário hipotético com entrada de R$ 30. Ajuste os valores para visualizar aportes, rendimento do CDB e recompensas separadamente.</p></div><span className="rounded-full border border-brand/40 px-3 py-1 text-xs text-brand">Sem promessa de retorno</span></div>
      <div className="mt-7 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">{[
          { label: "Aporte mensal", value: monthly, display: brl(monthly), min: 30, max: 1000, step: 10, update: setMonthly },
          { label: "Prazo", value: years, display: `${years} anos`, min: 1, max: 10, step: 1, update: setYears },
          { label: "CDI anual (hipótese)", value: cdi, display: `${cdi}% a.a.`, min: 10, max: 14, step: 1, update: setCdi },
        ].map(item => <div key={item.label}><label className="flex justify-between gap-2 text-sm" htmlFor={`sim-${item.label}`}><span>{item.label}</span><strong className="text-brand">{item.display}</strong></label><input className="mt-3 w-full accent-brand" id={`sim-${item.label}`} type="range" min={item.min} max={item.max} step={item.step} value={item.value} onChange={e => item.update(Number(e.target.value))} /></div>)}</div>
        <div className="min-w-0 lg:col-span-2"><div className="grid grid-cols-1 gap-3 sm:grid-cols-3"><Summary label="Total aportado" value={brl(invested)} /><Summary label="Rendimento CDB (80% CDI)" value={brl(cdbReturn)} /><Summary label="Recompensas estimadas (10% CDI)" value={brl(estimatedRewards)} /></div><div className="mt-5 h-56 w-full" role="img" aria-label="Gráfico ilustrativo da evolução de aportes, saldo do CDB e recompensas ao longo dos meses"><ResponsiveContainer width="100%" height="100%"><AreaChart data={rows}><defs><linearGradient id="simGlow" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#ffc700" stopOpacity={0.35}/><stop offset="95%" stopColor="#ffc700" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid stroke="#333" strokeDasharray="3 4"/><XAxis dataKey="month" stroke="#aaa" tick={{fontSize:11}}/><YAxis stroke="#aaa" tick={{fontSize:11}} tickFormatter={v=>`${Math.round(Number(v)/1000)}k`}/><Tooltip formatter={value=>brl(Number(value))} contentStyle={{backgroundColor:"#1a1a1a",border:"1px solid #666",borderRadius:12}}/><Area type="monotone" dataKey="cdb" name="Saldo no CDB" stroke="#ffc700" fill="url(#simGlow)" strokeWidth={3}/><Area type="monotone" dataKey="aportes" name="Total aportado" stroke="#ddd" fill="transparent" strokeWidth={2}/><Area type="monotone" dataKey="recompensas" name="Recompensas estimadas" stroke="#5cffa1" fill="transparent" strokeWidth={2}/></AreaChart></ResponsiveContainer></div></div>
      </div><p className="mt-5 text-xs leading-relaxed text-mist">Simulação ilustrativa, não oferta: CDI constante, rendimento bruto estimado com capitalização mensal equivalente, sem impostos, tarifas, resgates ou mudanças de taxas. Recompensas representam cálculo promocional separado, não juros do CDB, não são crédito garantido e dependem de elegibilidade, critérios objetivos e validação. O produto não movimenta dinheiro neste protótipo.</p>
    </section>
  );
}
function Summary({label,value}:{label:string;value:string}) {return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="min-h-10 text-xs text-mist">{label}</p><p className="mt-2 break-words text-xl font-extrabold text-white sm:text-2xl">{value}</p></div>}
