import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { PageShell } from "@/components/SiteNav";
import { recommendJourney, type Recommendation } from "@/lib/recommend.functions";

export const Route = createFileRoute("/objetivos")({
  head: () => ({
    meta: [
      { title: "Meus objetivos — Jornada personalizada com AI | XP Journey" },
      {
        name: "description",
        content:
          "Conte seus objetivos financeiros e receba missões do XP Journey e trilhas da XP Academy personalizadas por AI.",
      },
      { property: "og:title", content: "Jornada personalizada com AI — XP Journey" },
      {
        property: "og:description",
        content: "Missões e trilhas recomendadas para os seus objetivos financeiros.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ObjetivosPage,
});

const PERFIS = ["Conservador", "Moderado", "Arrojado"] as const;
const PRAZOS = ["Curto (até 1 ano)", "Médio (1 a 5 anos)", "Longo (5+ anos)"] as const;
const EXEMPLOS = [
  "Montar uma reserva de emergência de 6 meses",
  "Juntar R$ 50 mil para dar entrada em um apartamento",
  "Começar a investir para a aposentadoria",
];

function ObjetivosPage() {
  const recommend = useServerFn(recommendJourney);
  const [objetivos, setObjetivos] = useState("");
  const [perfil, setPerfil] = useState<(typeof PERFIS)[number]>("Moderado");
  const [prazo, setPrazo] = useState<(typeof PRAZOS)[number]>("Médio (1 a 5 anos)");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Recommendation | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (objetivos.trim().length < 5) {
      setError("Descreva seus objetivos com um pouco mais de detalhe.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setResult(await recommend({ data: { objetivos, perfil, prazo } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 text-xs font-semibold ring-1 transition-colors ${
      active ? "bg-brand text-brand-foreground ring-brand" : "bg-card text-mist ring-line hover:text-foreground"
    }`;

  return (
    <PageShell>
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            Jornada personalizada · AI
          </span>
          <h1 className="mt-3 max-w-[22ch] font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Seus objetivos, <span className="text-brand">sua jornada</span>
          </h1>
          <p className="mt-4 max-w-[56ch] text-pretty text-mist">
            Conte o que você quer conquistar e a AI monta missões do XP Journey e trilhas da XP
            Academy feitas para você. O plano é apenas educacional: não é recomendação de
            investimento nem substitui a avaliação de perfil (suitability) exigida pela CVM.
          </p>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl space-y-8 px-5 pb-16 sm:px-8">
          <form
            onSubmit={submit}
            className="space-y-5 rounded-3xl bg-card p-6 ring-1 ring-line"
          >
            <div>
              <label htmlFor="obj" className="text-sm font-semibold">
                Quais são seus objetivos financeiros?
              </label>
              <textarea
                id="obj"
                value={objetivos}
                onChange={(e) => setObjetivos(e.target.value)}
                maxLength={1000}
                rows={4}
                placeholder="Ex.: quero sair das dívidas, montar uma reserva e começar a investir..."
                className="mt-2 w-full rounded-xl bg-ink2 p-4 text-sm ring-1 ring-line outline-none placeholder:text-mist focus:ring-brand"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {EXEMPLOS.map((ex) => (
                  <button key={ex} type="button" onClick={() => setObjetivos(ex)} className={chip(false)}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <div className="text-sm font-semibold">Perfil de risco</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PERFIS.map((p) => (
                    <button key={p} type="button" onClick={() => setPerfil(p)} className={chip(perfil === p)}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Prazo</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PRAZOS.map((p) => (
                    <button key={p} type="button" onClick={() => setPrazo(p)} className={chip(prazo === p)}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand2 duration-200 disabled:opacity-60"
              >
                {loading ? "Gerando sua jornada..." : "Gerar recomendações"}
              </button>
              {error && <span className="text-sm text-destructive">{error}</span>}
            </div>
          </form>

          {result && (
            <div className="space-y-8">
              <p className="rounded-2xl bg-brand/[0.08] p-5 text-sm ring-1 ring-line">{result.resumo}</p>
              <div>
                <h2 className="font-display text-2xl font-semibold">Missões recomendadas · XP Journey</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {result.missoes.map((m, i) => (
                    <div key={i} className="rounded-2xl bg-card p-5 ring-1 ring-line">
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-semibold">{m.titulo}</div>
                        <span className="shrink-0 text-sm font-semibold text-brand">+{m.xp} XP</span>
                      </div>
                      <p className="mt-2 text-sm text-mist">{m.descricao}</p>
                      <div className="mt-3 text-xs text-mist">
                        {m.etapas} etapa{m.etapas > 1 ? "s" : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold">Trilhas sugeridas · XP Academy</h2>
                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  {result.trilhas.map((t, i) => (
                    <div key={i} className="rounded-2xl bg-card p-5 ring-1 ring-line">
                      <div className={`text-xs font-semibold ${t.nivel === "Avançado" ? "text-gold" : "text-brand"}`}>
                        {t.nivel}
                      </div>
                      <div className="mt-1 font-display text-lg font-semibold">{t.titulo}</div>
                      <p className="mt-2 text-sm text-mist">{t.motivo}</p>
                      <ul className="mt-3 space-y-1.5">
                        {t.aulas.map((a, j) => (
                          <li key={j} className="flex gap-2 text-sm">
                            <span className="text-brand">{j + 1}.</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
