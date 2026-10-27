import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ProductTerms } from "@/components/ProductTerms";
const money = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });
/** Illustrative monthly-compounding calculation. Rewards are NOT CDB interest. */
export function FinanceSimulator() {
  const [monthly, setMonthly] = useState(120);
  const [cdi, setCdi] = useState(12);
  const [months, setMonths] = useState(48);
  const data = useMemo(() => {
    const rate = Math.pow(1 + (cdi / 100) * 0.8, 1 / 12) - 1;
    const rewardRate = Math.pow(1 + (cdi / 100) * 0.1, 1 / 12) - 1;
    let balance = 0, rewards = 0, deposited = 0;
    const points = [{mes:0, aplicado:0, cdb:0, recompensas:0}];
    for (let i=1;i<=months;i++) {
      // deposit at the beginning of the month, with illustrative, fixed interest rates
      deposited += monthly; balance = (balance + monthly) * (1 + rate);
      rewards += (deposited * rewardRate); // indicative rewards, not a financial credit/guarantee
      points.push({mes:i, aplicado:deposited, cdb:balance, recompensas:rewards});
    }
    return points;
  }, [monthly,cdi,months]);
  const last = data[data.length - 1];
  return <section className="rounded-3xl border border-white/10 bg-[#171717] p-5 sm:p-8" aria-label="Simulador de hipóteses financeiras">
    <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand">Simulador educacional · hipóteses</p>
    <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Visualize o efeito da consistência</h2>
    <p className="mt-2 text-sm text-mist">Aporte inicial não incluído nesta simulação. O CDI é uma hipótese constante, não uma previsão. Recompensas são estimativas promocionais condicionais e não integram o saldo investido.</p>
    <div className="mt-6 grid gap-5 sm:grid-cols-3">{[
      {label:"Aporte mensal",value:monthly,show:money(monthly),min:30,max:1000,step:10,set:setMonthly},
      {label:"CDI hipotético (a.a.)",value:cdi,show:`${cdi}%`,min:10,max:14,step:1,set:setCdi},
      {label:"Duração",value:months,show:`${months} meses`,min:12,max:60,step:12,set:setMonths},
    ].map(s=><label key={s.label} className="block"><span className="flex justify-between gap-2 text-xs text-mist"><span>{s.label}</span><strong className="text-white">{s.show}</strong></span><input className="mt-3 w-full accent-yellow-400" type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={e=>s.set(Number(e.target.value))}/></label>)}</div>
    <div className="mt-6 grid gap-3 sm:grid-cols-3">{[
      ["Total aportado", last.aplicado, "Aportes simulados"],
      ["Saldo do CDB", last.cdb, "80% do CDI · hipótese"],
      ["Recompensas estimadas", last.recompensas, "10% do CDI · separadas"],
    ].map(([name,value,description])=><div key={String(name)} className="rounded-2xl bg-white/5 p-4"><p className="text-xs text-mist">{name}</p><p className="mt-2 text-xl font-bold text-brand sm:text-2xl">{money(Number(value))}</p><p className="mt-1 text-xs text-mist">{description}</p></div>)}</div>
    <div className="mt-6 h-64" role="img" aria-label="Gráfico ilustrativo de crescimento do saldo do CDB comparado aos aportes">
      <ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><defs><linearGradient id="journey-cdb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffc700" stopOpacity={0.45}/><stop offset="95%" stopColor="#ffc700" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#383838" vertical={false}/><XAxis dataKey="mes" stroke="#bbb" tick={{fontSize:11}}/><YAxis stroke="#bbb" tick={{fontSize:11}} width={58} tickFormatter={v=>`R$${Math.round(v/1000)}k`}/><Tooltip contentStyle={{background:"#1a1a1a",border:"1px solid #555",color:"#fff"}} formatter={(v,name)=>[money(Number(v)),name]}/><Area type="monotone" dataKey="aplicado" stroke="#aaa" fillOpacity={0} name="Total aportado"/><Area type="monotone" dataKey="cdb" stroke="#ffc700" fill="url(#journey-cdb)" name="Saldo do CDB"/></AreaChart></ResponsiveContainer>
    </div>
    <p className="mt-2 text-xs text-mist">Simulação simplificada sem tributos, inflação, taxas ou variação do CDI. Não representa oferta, desempenho futuro nem crédito real de recompensas. Cashback e economia de corretagem do Pass dependem de regras próprias e não foram somados.</p>
    <ProductTerms/>
  </section>;
}
