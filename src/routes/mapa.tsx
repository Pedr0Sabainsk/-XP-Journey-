import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronRight, Crown, LockKeyhole, Play, ShieldCheck, Sparkles, Star, Trophy, X } from "lucide-react";
import { toast } from "sonner";
import { PageShell, SaveNotice } from "@/components/SiteNav";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { MUNDOS, type Fase } from "@/lib/map-worlds";
import { useProgress } from "@/hooks/useProgress";

export const Route = createFileRoute("/mapa")({
  head: () => ({ meta: [
    { title: "Mapa de fases — XP Journey" },
    { name: "description", content: "Explore três mundos de educação financeira, complete desafios e ilumine seu caminho no XP Journey." },
    { property: "og:title", content: "Mapa de fases — XP Journey" },
    { property: "og:description", content: "Avance pelo mapa de aprendizado: desafios, estrelas e novas fases com regras claras." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: MapaPage,
});

const KEY = "xp-mapa-progresso"; // Preserva progresso da versão anterior durante a sessão
const WORLDS = [
  { number: "01", name: "Organizando a casa", subtitle: "Domine suas finanças", color: "sky", emoji: "🧭", scenery: "🏘️", icon: "💰" },
  { number: "02", name: "Reserva de emergência", subtitle: "Construa sua segurança", color: "mint", emoji: "🛡️", scenery: "🌲", icon: "🪙" },
  { number: "03", name: "Primeiro investimento", subtitle: "Prepare seu futuro", color: "violet", emoji: "🏔️", scenery: "⛰️", icon: "🏆" },
] as const;
const QUESTIONS_PER_WORLD = MUNDOS[0].fases.length;
const TOTAL = MUNDOS.reduce((sum, w) => sum + w.fases.length, 0);
// O desenho acompanha três linhas reservadas da grade, sem posicionar cards por cima uns dos outros.
const PATH = "M 130 103 C 260 135 390 205 390 310 S 130 455 130 517";
const PATH_SEGMENTS = [
  "M 130 103 C 260 135 390 205 390 310",
  "M 390 310 C 390 405 130 455 130 517",
];

type Completion = { title: string; subtitle: string };
function MapaPage() {
  const { progress } = useProgress();
  const [stars, setStars] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [celebration, setCelebration] = useState<Completion | null>(null);
  const [revealed, setRevealed] = useState<number | null>(null);
  const revealTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      const data: unknown = JSON.parse(sessionStorage.getItem(KEY) || "[]");
      if (Array.isArray(data)) setStars(Array.from({ length: TOTAL }, (_, i) => {
        const value = Number(data[i]);
        return Number.isFinite(value) ? Math.max(0, Math.min(3, value)) : 0;
      }));
    } catch { /* invalid or blocked storage: use in-memory progress */ }
    return () => window.clearTimeout(revealTimer.current);
  }, []);

  const done = stars.filter((s) => s > 0).length;
  const starCount = stars.reduce((sum, n) => sum + (n || 0), 0);
  // Sequência desbloqueia um único checkpoint por vez, mesmo se a sessão contiver dados antigos incompletos.
  const next = Array.from({ length: TOTAL }, (_, i) => i).find((i) => (stars[i] ?? 0) <= 0) ?? TOTAL;
  const level = Math.floor(progress.journey_xp / 500) + 1;

  function complete(i: number, gained: number) {
    const firstCompletion = (stars[i] ?? 0) <= 0;
    const updated = [...stars];
    updated[i] = Math.max(updated[i] ?? 0, gained);
    setStars(updated);
    try { sessionStorage.setItem(KEY, JSON.stringify(updated)); } catch { /* session storage unavailable */ }
    if (firstCompletion) {
      setRevealed(i + 1);
      window.clearTimeout(revealTimer.current);
      revealTimer.current = window.setTimeout(() => setRevealed(null), 2100);
      const worldCleared = (i + 1) % QUESTIONS_PER_WORLD === 0;
      setCelebration({
        title: worldCleared ? "Mundo concluído!" : "Fase concluída!",
        subtitle: worldCleared ? "Você dominou essa região! O próximo mundo está liberado." : "Sua próxima fase foi desbloqueada. Continue no seu ritmo!",
      });
    }
    toast.success("Checkpoint verificado", { description: `${gained} estrela${gained > 1 ? "s" : ""} de aprendizado. Sem prêmio financeiro.` });
  }

  return <PageShell>
    <CelebrationOverlay open={!!celebration} title={celebration?.title ?? ""} subtitle={celebration?.subtitle} onClose={() => setCelebration(null)} />
    <main className="xp-map-page relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-8">
      <section className="xp-map-intro relative overflow-hidden rounded-[2rem] px-6 pb-7 pt-8 sm:px-9">
        <div className="absolute -right-4 top-4 text-7xl opacity-25 sm:text-9xl" aria-hidden="true">🗺️</div>
        <span className="text-[11px] font-black uppercase tracking-[.24em] text-brand">XP JOURNEY / MODO AVENTURA</span>
        <h1 className="mt-2 max-w-xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Seu dinheiro. <span className="text-brand">Sua jornada.</span></h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-white/75 sm:text-base">Uma aventura financeira por etapas. Aprenda, acerte os desafios e ilumine o caminho até seu primeiro investimento.</p>
        <div className="mt-5"><SaveNotice /></div>
        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          <Hud label="Nível" value={String(level)} symbol="⚡" />
          <Hud label="Estrelas" value={`${starCount}/${TOTAL * 3}`} symbol="⭐" />
          <Hud label="Fases" value={`${done}/${TOTAL}`} symbol="🏁" />
        </div>
        <div className="mt-5 flex items-center justify-between text-xs text-white/70"><span>Progresso da aventura</span><strong className="text-brand">{Math.round(done / TOTAL * 100)}%</strong></div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-black/40 ring-1 ring-white/10"><div className="xp-map-meter h-full rounded-full" style={{width:`${done/TOTAL*100}%`}} /></div>
      </section>

      <div className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Regiões da aventura">
        {WORLDS.map((world, idx) => {
          const completed = stars.slice(idx*QUESTIONS_PER_WORLD, (idx+1)*QUESTIONS_PER_WORLD).filter(s=>s>0).length;
          const locked = next < idx * QUESTIONS_PER_WORLD;
          return <a key={world.name} href={`#world-${idx+1}`} className={`xp-map-world-chip xp-world-${world.color} rounded-2xl p-4 ${locked ? "opacity-65" : ""}`}>
            <div className="flex items-center justify-between"><span className="text-2xl" aria-hidden="true">{world.emoji}</span><span className="text-[11px] font-extrabold text-white/75">{completed}/{QUESTIONS_PER_WORLD}</span></div>
            <div className="mt-3 text-sm font-bold text-white">{world.name}</div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/25"><div className="h-full rounded-full bg-white/85 transition-all duration-500" style={{width:`${completed/QUESTIONS_PER_WORLD*100}%`}} /></div>
          </a>;
        })}
      </div>

      <section className="mx-auto mt-10 max-w-[660px] space-y-9" aria-label="Mapa de aprendizagem">
        {WORLDS.map((world, worldIdx) => {
          const start = worldIdx * QUESTIONS_PER_WORLD;
          const worldDone = stars.slice(start, start+QUESTIONS_PER_WORLD).filter((s)=>s>0).length;
          const unlockWorld = next >= start;
          return <section id={`world-${worldIdx+1}`} className={`xp-map-world xp-world-${world.color} relative overflow-hidden rounded-[2.4rem] pb-9 pt-7 ${unlockWorld ? "" : "xp-map-locked"}`} key={world.name}>
            <div className="xp-map-scene absolute inset-0" aria-hidden="true" />
            <div className="xp-map-decoration xp-map-deco-one" aria-hidden="true">{world.scenery}</div>
            <div className="xp-map-decoration xp-map-deco-two" aria-hidden="true">{world.icon}</div>
            <div className="relative z-10 mx-6 flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-black/25 p-4 backdrop-blur-sm sm:mx-8">
              <div><div className="text-[10px] font-extrabold uppercase tracking-[.24em] text-white/70">MUNDO {world.number}</div><h2 className="mt-1 font-display text-xl font-extrabold text-white sm:text-2xl">{world.name}</h2><p className="text-xs text-white/80">{world.subtitle}</p></div>
              <div className="shrink-0 text-right"><div className="text-2xl" aria-hidden="true">{world.emoji}</div><div className="mt-1 text-xs font-bold text-white">{worldDone}/{QUESTIONS_PER_WORLD}</div></div>
            </div>

            <div className="xp-map-track relative z-10 mx-auto mt-8 w-full max-w-[520px] px-4 sm:px-5" role="group" aria-label={`Fases de ${world.name}`}>
              <svg viewBox="0 0 520 620" preserveAspectRatio="none" className="xp-map-track-line pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                <path d={PATH} fill="none" stroke="rgba(12,29,38,.37)" strokeWidth="26" strokeLinecap="round" />
                <path d={PATH} fill="none" stroke="rgba(255,255,255,.52)" strokeWidth="13" strokeLinecap="round" strokeDasharray="2 25" />
                {PATH_SEGMENTS.map((segment, j) => (stars[start + j] ?? 0) > 0 ? (
                  <path key={j} d={segment} className="xp-map-path-complete" fill="none" strokeWidth="14" strokeLinecap="round" />
                ) : null)}
              </svg>
              <div className="xp-map-stop-grid relative grid grid-cols-2 grid-rows-3">
                {MUNDOS[worldIdx].fases.map((phase, phaseIdx) => {
                  const index = start + phaseIdx;
                  const cleared = (stars[index] ?? 0) > 0;
                  const available = index === next;
                  const blocked = index > next;
                  const milestone = phaseIdx === QUESTIONS_PER_WORLD - 1;
                  const label = cleared ? "Concluída" : available ? "Jogar agora" : "Bloqueada";
                  return <div key={phase.titulo} className={`xp-map-stop-slot flex min-w-0 flex-col items-center justify-center ${phaseIdx === 1 ? "col-start-2" : "col-start-1"}`} style={{ gridRow: phaseIdx + 1 }}>
                    <div className="xp-map-stop relative flex w-full flex-col items-center text-center">
                      {available && <div className="xp-map-you-are-here">VOCÊ ESTÁ AQUI <span aria-hidden="true">▼</span></div>}
                      <button type="button" onClick={() => setActive(index)} disabled={blocked} aria-label={`Fase ${index + 1}: ${phase.titulo}. ${label}`} className={`xp-map-node ${cleared ? "is-cleared" : available ? "is-active" : "is-locked"} ${milestone ? "is-milestone" : ""} ${revealed === index ? "is-revealed" : ""}`}>
                        {blocked ? <LockKeyhole size={27} strokeWidth={2.6} /> : cleared ? <Check size={35} strokeWidth={3.5} /> : milestone ? <Trophy size={34} strokeWidth={2.8} /> : <span aria-hidden="true">{phase.emoji}</span>}
                      </button>
                      <div className="xp-map-node-label mt-4 w-full max-w-[165px] min-w-0"><span className="block text-[10px] font-black uppercase tracking-wider text-white/75">FASE {index + 1}</span><strong className="mt-1 block text-xs leading-4 text-white sm:text-sm">{phase.titulo}</strong>{cleared && <span className="mt-1 block text-xs text-amber-200">{"★".repeat(stars[index] ?? 0)}</span>}</div>
                    </div>
                  </div>;
                })}
              </div>
            </div>
            <div className="relative z-10 mx-6 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/25 p-4 sm:mx-8">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15 text-2xl" aria-hidden="true">{worldDone === QUESTIONS_PER_WORLD ? "🏆" : unlockWorld ? "✨" : "🔒"}</div>
              <div className="min-w-0 flex-1"><p className="text-xs font-extrabold uppercase tracking-wider text-white/75">Marco de aprendizagem</p><p className="mt-1 text-sm font-semibold text-white">{worldDone === QUESTIONS_PER_WORLD ? "Mundo concluído!" : unlockWorld ? `Faltam ${QUESTIONS_PER_WORLD-worldDone} fases para concluir este mundo` : "Conclua o mundo anterior para entrar"}</p></div>
            </div>
          </section>;
        })}
      </section>

      <div className="mx-auto mt-9 flex max-w-[660px] flex-col items-center gap-3 rounded-3xl border border-brand/30 bg-brand/10 p-7 text-center">
        <Crown className="text-brand" size={34}/><h3 className="font-display text-xl font-extrabold">{done === TOTAL ? "Jornada do mapa concluída!" : "O próximo nível espera por você"}</h3><p className="max-w-md text-sm text-mist">As estrelas representam aprendizado verificado no protótipo. Não são dinheiro, cashback ou rendimento.</p>
        <Link to="/journey" className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-extrabold text-black">Ver meu Journey <ChevronRight size={18}/></Link>
      </div>
    </main>
    {active!==null && <LessonDialog key={active} phase={MUNDOS[Math.floor(active/QUESTIONS_PER_WORLD)].fases[active%QUESTIONS_PER_WORLD]} number={active+1} previousStars={stars[active]??0} onClose={()=>setActive(null)} onComplete={s=>complete(active,s)} />}
  </PageShell>;
}

function Hud({label,value,symbol}:{label:string;value:string;symbol:string}) {
  return <div className="xp-map-hud flex items-center justify-center gap-2 rounded-2xl px-3 py-3 sm:justify-start"><span aria-hidden="true" className="text-xl">{symbol}</span><div><div className="text-[10px] font-bold uppercase tracking-widest text-white/65">{label}</div><div className="font-display text-xl font-extrabold text-white">{value}</div></div></div>;
}

function LessonDialog({phase,number,previousStars,onClose,onComplete}:{phase:Fase;number:number;previousStars:number;onClose:()=>void;onComplete:(stars:number)=>void}) {
  const [step,setStep]=useState<"learn"|"quiz"|"done">("learn");
  const [mistakes,setMistakes]=useState(0);
  const [chosen,setChosen]=useState<number|null>(null);
  const [earned,setEarned]=useState(0);
  const stars=Math.max(1,3-mistakes);
  function answer(index:number) {
    if(index===phase.certa) {setEarned(stars);onComplete(stars);setStep("done");}
    else {setMistakes(v=>v+1);setChosen(index);toast.error("Quase!",{description:"Releia o conceito e tente outra vez."});}
  }
  return <div className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-4 backdrop-blur-md" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <section role="dialog" aria-modal="true" aria-labelledby="xp-map-dialog-title" className="xp-map-dialog relative w-full max-w-md overflow-hidden rounded-[2rem] border border-brand/30 bg-[#171717] p-6 text-white shadow-2xl sm:p-8">
      <button onClick={onClose} aria-label="Fechar atividade" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/15 bg-white/5"><X size={19}/></button>
      <div className="mx-auto grid size-20 place-items-center rounded-[1.5rem] border border-brand/35 bg-brand/15 text-5xl">{phase.emoji}</div>
      <div className="mt-5 text-center text-xs font-extrabold uppercase tracking-[.2em] text-brand">FASE {number} · {step==="learn" ? "APRENDA" : step==="quiz" ? "DESAFIO" : "CONCLUÍDA"}</div>
      <h2 id="xp-map-dialog-title" className="mt-2 text-center font-display text-2xl font-extrabold">{phase.titulo}</h2>
      {step==="learn" && <><p className="mt-4 text-center text-sm leading-6 text-white/75">{phase.explica}</p><button onClick={()=>setStep("quiz")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-extrabold text-black"><Play size={17} fill="currentColor"/> Começar desafio</button></>}
      {step==="quiz" && <><div className="mt-5 flex justify-between text-xs text-white/65"><span><ShieldCheck className="mr-1 inline text-brand" size={16}/>Verificação de aprendizado</span><span>Máximo 3 estrelas</span></div><p className="mt-4 text-lg font-bold">{phase.pergunta}</p><div className="mt-4 space-y-2">{phase.opcoes.map((option,index)=><button onClick={()=>answer(index)} key={option} className={`xp-map-answer w-full rounded-xl border p-4 text-left text-sm ${chosen===index ? "border-red-400/50 bg-red-400/10" : "border-white/15 bg-white/[.04]"}`}>{option}</button>)}</div>{mistakes>0&&<p role="status" className="mt-3 text-sm text-amber-200">Tente de novo. Você ainda pode ganhar {stars} estrela{stars>1?"s":""}.</p>}</>}
      {step==="done" && <div className="mt-5 text-center"><div className="text-4xl text-brand" aria-label={`${earned} estrelas`}>{"★".repeat(earned)}</div><p className="mt-3 text-sm text-white/80">{previousStars>0?"Sua melhor pontuação foi atualizada se você melhorou.":"Boa! Você compreendeu o conceito e liberou o próximo checkpoint."}</p><button onClick={onClose} className="mt-6 w-full rounded-full bg-brand px-6 py-3 font-extrabold text-black">Continuar jornada</button></div>}
    </section>
  </div>;
}
