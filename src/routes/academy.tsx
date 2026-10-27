import { ProgressMilestones } from "@/components/ProgressMilestones";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, CircleCheck, PlayCircle, Video, Lightbulb, ArrowLeft, ShieldCheck } from "lucide-react";
import { ACADEMY_CONTENT } from "@/lib/academy-lessons";
import { PageShell, SaveNotice } from "@/components/SiteNav";
import { useProgress } from "@/hooks/useProgress";
import { ACADEMY_CHECKS } from "@/lib/academy-checks";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { toast } from "sonner";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "XP Academy — Trilhas de educação financeira" },
      {
        name: "description",
        content:
          "Simulação da XP Academy: trilhas guiadas de educação financeira com módulos, aulas e XP por conclusão.",
      },
      { property: "og:title", content: "XP Academy — Trilhas de educação financeira" },
      {
        property: "og:description",
        content:
          "Aprenda a investir em trilhas guiadas e ganhe XP a cada módulo concluído.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AcademyPage,
});

type Lesson = { title: string; minutes: number };
type Track = {
  id: string;
  level: string;
  title: string;
  description: string;
  xpPerLesson: number;
  lessons: Lesson[];
};

const TRACKS: Track[] = [
  {
    id: "fundamentos",
    level: "Iniciante",
    title: "Fundamentos",
    description: "Inflação, juros compostos e o poder do tempo.",
    xpPerLesson: 25,
    lessons: [
      { title: "Por que investir?", minutes: 6 },
      { title: "Inflação na prática", minutes: 8 },
      { title: "Juros compostos", minutes: 10 },
      { title: "Risco e retorno", minutes: 7 },
    ],
  },
  {
    id: "renda-fixa",
    level: "Intermediário",
    title: "Renda fixa e fundos",
    description: "Renda fixa, fundos e diversificação prática.",
    xpPerLesson: 40,
    lessons: [
      { title: "CDB, LCI e Tesouro", minutes: 12 },
      { title: "Fundos de investimento", minutes: 10 },
      { title: "Montando uma reserva", minutes: 9 },
    ],
  },
  {
    id: "carteira",
    level: "Avançado",
    title: "Construção de carteira",
    description: "Monte e rebalanceie uma carteira completa.",
    xpPerLesson: 60,
    lessons: [
      { title: "Alocação de ativos", minutes: 14 },
      { title: "Rebalanceamento", minutes: 11 },
    ],
  },
];

function AcademyPage() {
  const [openTrack, setOpenTrack] = useState<string>("fundamentos");
  const { progress, update } = useProgress();
  const completed = progress.lessons_completed;
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const earnedXp = progress.academy_xp;
  const [activeTab, setActiveTab] = useState<"learn" | "video" | "quiz">("learn");
  const [videoConsent, setVideoConsent] = useState(false);
  const selectedContent = selectedLesson ? ACADEMY_CONTENT[selectedLesson] : undefined;
  const activeVerified = !!(selectedLesson && progress.lessons_completed[`verified-v2-${selectedLesson}`]);
  const [celebration, setCelebration] = useState<{ title: string; subtitle: string; xp: number } | null>(null);

  function validateLesson(trackId: string, index: number, xp: number) {
    const key = `${trackId}-${index}`;
    const question = ACADEMY_CHECKS[key];
    if (!question || selectedAnswer === null) return;
    if (selectedAnswer !== question.answer) {
      setFeedback(`Ainda não. ${question.explanation} Tente novamente.`);
      toast.error("Resposta incorreta", { description: "Revise a explicação da aula e tente outra vez." });
      return;
    }
    const alreadyDone = !!progress.lessons_completed[`verified-v2-${key}`];
    if (!alreadyDone) {
      update((p) => ({
        lessons_completed: { ...p.lessons_completed, [`verified-v2-${key}`]: true },
        academy_xp: p.academy_xp + xp,
        journey_xp: p.journey_xp + xp,
      }));
      setCelebration({
        title: "Aula validada!",
        subtitle: "Você confirmou o aprendizado e desbloqueou XP para a sua evolução financeira.",
        xp,
      });
      toast.success("XP liberado", { description: `+${xp} XP educacional adicionados ao seu progresso.` });
    }
    setFeedback(`Resposta correta! +${xp} XP educacional. ${question.explanation}`);
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
      {selectedLesson && ACADEMY_CHECKS[selectedLesson] && selectedContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 sm:p-5">
          <section role="dialog" aria-modal="true" aria-labelledby="lesson-heading" className="flex max-h-[96vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-brand/30 bg-[#141414] shadow-2xl">
            <header className="flex items-center justify-between gap-3 border-b border-white/10 p-4 sm:px-7">
              <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-widest text-brand">XP Academy · aula interativa</p><h2 id="lesson-heading" className="mt-1 truncate text-xl font-bold">{TRACKS.flatMap(t=>t.lessons.map((l,i)=>({key:`${t.id}-${i}`,title:l.title}))).find(x=>x.key===selectedLesson)?.title}</h2></div>
              <button onClick={()=>{setSelectedLesson(null);setVideoConsent(false)}} className="rounded-xl border border-white/25 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">Fechar ×</button>
            </header>
            <div className="flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-3 sm:px-7" role="tablist" aria-label="Conteúdo da aula">
              {([ ["learn","Estudar",BookOpen], ["video","Vídeo",Video], ["quiz","Teste de conhecimento",ShieldCheck] ] as const).map(([tab,label,Icon])=><button key={tab} role="tab" aria-selected={activeTab===tab} onClick={()=>setActiveTab(tab)} className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand ${activeTab===tab?"bg-brand text-black":"bg-white/10 text-white hover:bg-white/15"}`}><Icon size={16}/>{label}</button>)}
            </div>
            <div className="overflow-y-auto p-4 sm:p-7">
              {activeTab==="learn" && <div className="space-y-6">
                <p className="text-lg leading-relaxed text-white/90">{selectedContent.intro}</p>
                <div className="rounded-2xl border border-brand/20 bg-brand/5 p-5"><h3 className="font-semibold text-brand">Você vai aprender</h3><ul className="mt-3 space-y-2">{selectedContent.goals.map(g=><li key={g} className="flex items-start gap-2 text-sm text-white/85"><CircleCheck size={18} className="mt-0.5 shrink-0 text-brand"/>{g}</li>)}</ul></div>
                {selectedContent.sections.map((part,i)=><article key={part.heading} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><div className="mb-2 text-xs font-bold uppercase tracking-widest text-brand">Parte {i+1} de {selectedContent.sections.length}</div><h3 className="text-xl font-semibold">{part.heading}</h3><p className="mt-3 leading-relaxed text-white/80">{part.body}</p><div className="mt-4 flex items-start gap-3 rounded-xl bg-white/5 p-4"><Lightbulb size={19} className="mt-0.5 shrink-0 text-brand"/><div><div className="text-xs font-semibold uppercase tracking-wide text-brand">Exemplo prático</div><p className="mt-1 text-sm leading-relaxed text-white/80">{part.example}</p></div></div></article>)}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5"><h3 className="font-semibold text-emerald-300">Resumo da aula</h3><p className="mt-2 text-white/90">{selectedContent.takeaway}</p></div>
                <button onClick={()=>setActiveTab(selectedContent.video?"video":"quiz")} className="w-full rounded-full bg-brand p-3 font-semibold text-black">{selectedContent.video?"Assistir ao vídeo complementar →":"Responder ao teste →"}</button>
              </div>}
              {activeTab==="video" && <div className="space-y-4">
                {selectedContent.video ? <><h3 className="text-xl font-bold">{selectedContent.video.title}</h3><p className="text-sm text-white/70">Conteúdo independente: {selectedContent.video.creator}. {selectedContent.video.note}</p>
                  {!videoConsent ? <div className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-6 text-center"><PlayCircle className="text-brand" size={48}/><p>O vídeo é hospedado no YouTube. Ao reproduzir, dados poderão ser compartilhados com o provedor.</p><button onClick={()=>setVideoConsent(true)} className="rounded-full bg-brand px-6 py-3 font-semibold text-black">Carregar vídeo externo</button></div> : <div className="aspect-video overflow-hidden rounded-2xl bg-black"><iframe className="h-full w-full" title={selectedContent.video.title} src={`https://www.youtube-nocookie.com/embed/${selectedContent.video.id}?rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"/></div>}
                  <p className="text-xs text-white/60">O vídeo é complementar. O teste verifica o que você aprendeu com o conteúdo escrito; assistir não concede XP automaticamente.</p></> : <div className="rounded-2xl border border-white/15 bg-white/5 p-6"><Video className="text-brand" size={32}/><h3 className="mt-3 text-lg font-semibold">Aula escrita disponível</h3><p className="mt-2 text-white/75">Ainda não há vídeo externo selecionado e validado para este tópico. O material completo e a avaliação já estão disponíveis na aba Estudar.</p></div>}
                <button onClick={()=>setActiveTab("quiz")} className="w-full rounded-full bg-brand p-3 font-semibold text-black">Ir para a avaliação →</button>
              </div>}
              {activeTab==="quiz" && <div className="max-w-2xl space-y-5">
                <div className="flex items-center gap-2 text-sm text-brand"><ShieldCheck size={20}/>Verificação de compreensão · uma concessão de XP por aula</div>
                <h3 className="text-xl font-bold">{ACADEMY_CHECKS[selectedLesson].question}</h3>
                {ACADEMY_CHECKS[selectedLesson].choices.map((choice,i)=><label key={choice} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm ${selectedAnswer===i?"border-brand bg-brand/10":"border-white/20 bg-white/[0.03]"}`}><input type="radio" name="academy-answer" checked={selectedAnswer===i} onChange={()=>{setSelectedAnswer(i);setFeedback(null)}} className="mt-0.5 accent-yellow-400"/>{choice}</label>)}
                {feedback && <p role="status" className="rounded-2xl border border-brand/25 bg-gradient-to-r from-brand/14 to-brand/6 p-4 text-sm leading-relaxed text-white shadow-[0_0_25px_rgba(255,199,0,.08)]">{feedback}</p>}
                {activeVerified && <div className="flex items-center gap-2 text-emerald-300"><CircleCheck size={20}/>Aula já validada. Você pode revisar quando quiser.</div>}
                <button className="w-full rounded-full bg-brand p-3 font-semibold text-black disabled:opacity-40" disabled={selectedAnswer===null || activeVerified} onClick={()=>{const [trackId,idx]=selectedLesson.split(/-(?=\d+$)/);const track=TRACKS.find(t=>t.id===trackId); if(track)validateLesson(trackId,Number(idx),track.xpPerLesson)}}>Validar conhecimento</button>
                <button onClick={()=>setActiveTab("learn")} className="flex items-center gap-2 text-sm text-white/80 underline underline-offset-4"><ArrowLeft size={16}/>Revisar explicação</button>
              </div>}
            </div>
          </section>
        </div>
      )}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            XP Academy · simulação
          </span>
          <h1 className="mt-3 max-w-[20ch] font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Aprenda e <span className="text-brand">ganhe XP</span> por aula
          </h1>
          <p className="mt-4 max-w-[52ch] text-pretty text-mist">
            Estude cada tema com explicações, exemplos práticos e vídeos complementares selecionados; depois responda à verificação de compreensão. Cada aprovação rende XP que alimenta
            seu nível no XP Journey.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm ring-1 ring-line">
            <span className="size-2 rounded-full bg-brand"></span>
            <span className="text-mist">XP ganho nesta simulação:</span>
            <span className="font-semibold text-brand">{earnedXp} XP</span>
          </div>
          <SaveNotice />
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 pb-8 sm:px-8 lg:grid-cols-4">
          <div className="rounded-3xl bg-card p-5 ring-1 ring-line"><div className="text-[11px] uppercase tracking-[0.18em] text-mist">Trilhas</div><div className="mt-2 font-display text-3xl font-semibold text-brand">{TRACKS.length}</div><p className="mt-2 text-sm text-mist">Fundamentos, renda fixa e construção de carteira.</p></div>
          <div className="rounded-3xl bg-card p-5 ring-1 ring-line"><div className="text-[11px] uppercase tracking-[0.18em] text-mist">Aulas validadas</div><div className="mt-2 font-display text-3xl font-semibold text-brand">{Object.keys(completed).filter((k) => completed[k]).length}</div><p className="mt-2 text-sm text-mist">Cada aula exige verificação para liberar XP.</p></div>
          <div className="rounded-3xl bg-card p-5 ring-1 ring-line"><div className="text-[11px] uppercase tracking-[0.18em] text-mist">Próxima ação</div><div className="mt-2 text-lg font-semibold">{selectedLesson ? "Finalizar aula aberta" : "Escolher a próxima aula"}</div><p className="mt-2 text-sm text-mist">A sequência ideal é explicação → vídeo → teste.</p></div>
          <div className="rounded-3xl bg-card p-5 ring-1 ring-line"><div className="text-[11px] uppercase tracking-[0.18em] text-mist">Conquista ativa</div><div className="mt-2 text-lg font-semibold text-gold">{earnedXp >= 100 ? "Base construída" : "Começo da jornada"}</div><p className="mt-2 text-sm text-mist">Você acumula XP por aprendizado demonstrado.</p></div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl space-y-4 px-5 pb-16 sm:px-8">
          {TRACKS.map((track) => {
            const isOpen = openTrack === track.id;
            const doneCount = track.lessons.filter(
              (_, i) => completed[`verified-v2-${track.id}-${i}`]
            ).length;
            const pct = Math.round((doneCount / track.lessons.length) * 100);
            return (
              <div
                key={track.id}
                className="rounded-2xl bg-card ring-1 ring-line"
              >
                <button
                  onClick={() => setOpenTrack(isOpen ? "" : track.id)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <div>
                    <div
                      className={`text-xs font-semibold ${
                        track.level === "Avançado" ? "text-gold" : "text-brand"
                      }`}
                    >
                      {track.level}
                    </div>
                    <div className="mt-1 font-display text-xl font-semibold">{track.title}</div>
                    <p className="mt-1 text-sm text-mist">{track.description}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <div className="hidden text-right sm:block">
                      <div className="font-display text-lg font-semibold">{pct}%</div>
                      <div className="text-[10px] text-mist">
                        {doneCount}/{track.lessons.length} aulas
                      </div>
                    </div>
                    <span
                      className={`grid size-8 place-items-center rounded-full ring-1 ring-line transition-transform ${
                        isOpen ? "rotate-180 bg-brand/15 text-brand" : "bg-white/5 text-mist"
                      }`}
                    >
                      ▾
                    </span>
                  </div>
                </button>
                <div className="px-6">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        track.level === "Avançado" ? "bg-gold" : "bg-brand"
                      }`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
                {isOpen && (
                  <div className="space-y-2 p-6 pt-4">
                    {track.lessons.map((lesson, i) => {
                      const key = `${track.id}-${i}`;
                      const isDone = !!completed[`verified-v2-${key}`];
                      return (
                        <button
                          key={key}
                          onClick={() => { setSelectedLesson(key); setSelectedAnswer(null); setFeedback(null); setActiveTab("learn"); setVideoConsent(false); }}
                          className={`flex w-full items-center justify-between rounded-xl p-4 text-left ring-1 transition-colors ${
                            isDone
                              ? "bg-brand/[0.08] ring-line"
                              : "bg-card ring-line hover:bg-card"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`grid size-7 place-items-center rounded-full text-xs font-bold ${
                                isDone
                                  ? "bg-brand text-brand-foreground"
                                  : "bg-white/10 text-mist"
                              }`}
                            >
                              {isDone ? "✓" : i + 1}
                            </span>
                            <div>
                              <div className="text-sm font-semibold">{lesson.title}</div>
                              <div className="text-xs text-mist">{lesson.minutes} min · conteúdo + avaliação {ACADEMY_CONTENT[key]?.video ? "· vídeo" : ""}</div>
                            </div>
                          </div>
                          <span
                            className={`text-xs font-semibold ${
                              isDone ? "text-brand" : "text-mist"
                            }`}
                          >
                            +{track.xpPerLesson} XP
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-12 sm:px-8"><ProgressMilestones /></div>
    </PageShell>
  );
}
