import { JourneySimulator } from "@/components/JourneySimulator";
import { ProductTerms } from "@/components/ProductTerms";
import { Link } from "@tanstack/react-router";

/** Original complete home-page product experience, now embedded in the integrated presentation. */
export function ProductShowcase() {
  return (
    <div className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-background xp-hero-ambient">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[760px] opacity-70 hero-texture" />
      {/* HERO */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-16 sm:px-8 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs text-mist ring-1 ring-line">
                <span className="size-1.5 rounded-full bg-brand"></span>
                Finanças que evoluem com você
              </div>
              <h1 className="mt-6 max-w-[16ch] font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Pare de apostar. <span className="text-brand xp-hero-title">Comece a evoluir.</span>
              </h1>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-mist sm:text-lg">
                O XP Journey transforma investir, aprender e economizar em uma jornada de
                progressão. Complete missões, ganhe XP e avance com aprendizado e disciplina — sem
                sorteio, sem pressa e sem depender da sorte.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#cta"
                  className="xp-cta-pulse xp-glow rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground ring-1 ring-brand/40 transition-colors hover:bg-brand2 duration-200"
                >
                  Criar minha jornada
                </a>
                <a
                  href="#loop"
                  className="rounded-full bg-card px-6 py-3 text-sm ring-1 ring-line transition-colors hover:bg-surface-hover"
                >
                  Ver como funciona
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <div className="font-display text-2xl font-semibold">4</div>
                  <div className="text-xs text-mist">modelos de evolução</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold">R$ 30</div>
                  <div className="text-xs text-mist">aporte inicial (hipótese)</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold">3</div>
                  <div className="text-xs text-mist">trilhas de Academy</div>
                </div>
              </div>
            </div>

            {/* app mockup cards */}
            <div className="relative lg:col-span-6">
              <div className="relative h-[440px]">
                {/* progress ring card */}
                <div className="floaty absolute top-0 right-0 w-64 rounded-2xl bg-card p-5 ring-1 ring-line">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-mist">Progresso do mês</span>
                    <span className="text-xs font-semibold text-brand">+320 XP</span>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="relative size-24 shrink-0">
                      <div
                        className="size-24 rounded-full"
                        style={{
                          background:
                            "conic-gradient(var(--color-brand) 0deg, var(--color-brand2) 250deg, var(--color-line) 250deg 360deg)",
                        }}
                      ></div>
                      <div className="absolute inset-[10px] grid place-items-center rounded-full bg-ink2">
                        <div className="text-center">
                          <div className="font-display text-xl font-semibold">69%</div>
                          <div className="text-[10px] text-mist">nível 12</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full space-y-2">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="xp-progress-fill h-full w-[69%] rounded-full bg-brand"></div>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="xp-progress-fill h-full w-[42%] rounded-full bg-brand2"></div>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="xp-progress-fill h-full w-[28%] rounded-full bg-gold"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* mission card */}
                <div className="floaty2 absolute bottom-6 left-0 w-72 rounded-2xl bg-card p-5 ring-1 ring-line">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-mist">Missão em andamento</span>
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold">
                      Bônus
                    </span>
                  </div>
                  <div className="mt-3 font-display text-lg font-semibold leading-tight">
                    3 depósitos consecutivos
                  </div>
                  <p className="mt-1 text-xs text-mist">Complete 3 meses seguidos de aportes</p>
                  <div className="mt-4 flex items-center gap-1.5">
                    <span className="grid size-4 place-items-center rounded-full bg-brand text-[9px] font-bold text-brand-foreground">
                      1
                    </span>
                    <span className="grid size-4 place-items-center rounded-full bg-brand text-[9px] font-bold text-brand-foreground">
                      2
                    </span>
                    <span className="grid size-4 place-items-center rounded-full bg-white/10 text-[9px] font-bold text-mist">
                      3
                    </span>
                    <span className="ml-auto text-xs font-semibold text-brand">+150 XP</span>
                  </div>
                </div>

                {/* badge card */}
                <div className="floaty absolute top-40 left-6 w-52 rounded-2xl bg-card p-4 ring-1 ring-line">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-xl bg-gold/15 font-display font-bold text-gold">
                      B
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Badge desbloqueada</div>
                      <div className="text-xs text-mist">Primeiro investimento</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATION LOOP */}
      <section id="loop" className="relative z-10 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="max-w-[40ch]">
            <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              O loop
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Um ciclo que se alimenta
            </h2>
            <p className="mt-4 max-w-[48ch] text-pretty text-mist">
              Quatro modelos que se conectam: aprender, evoluir, coletar benefícios e recomeçar
              mais forte.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-card p-5 ring-1 ring-line">
              <div className="text-xs font-semibold text-brand">01</div>
              <div className="mt-3 font-display text-lg font-semibold">XP Academy</div>
              <p className="mt-2 text-sm text-pretty text-mist">
                Ensina os fundamentos em trilhas guiadas.
              </p>
            </div>
            <div className="rounded-2xl bg-card p-5 ring-1 ring-line">
              <div className="text-xs font-semibold text-brand">02</div>
              <div className="mt-3 font-display text-lg font-semibold">XP Journey</div>
              <p className="mt-2 text-sm text-pretty text-mist">
                Transforma o aprendizado em missões e evolução.
              </p>
            </div>
            <div className="rounded-2xl bg-card p-5 ring-1 ring-line">
              <div className="text-xs font-semibold text-brand">03</div>
              <div className="mt-3 font-display text-lg font-semibold">XP Pass</div>
              <p className="mt-2 text-sm text-pretty text-mist">
                Entrega benefícios por cada nível alcançado.
              </p>
            </div>
            <div className="rounded-2xl bg-card p-5 ring-1 ring-line">
              <div className="text-xs font-semibold text-brand">04</div>
              <div className="mt-3 font-display text-lg font-semibold">Nova missão</div>
              <p className="mt-2 text-sm text-pretty text-mist">
                Cada benefício abre o próximo desafio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSIONS */}
      <section id="missions" className="relative z-10 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                Progressão
              </span>
              <h2 className="mt-3 max-w-[16ch] font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Missões que pagam em XP
              </h2>
              <p className="mt-4 max-w-[40ch] text-pretty text-mist">
                Cada meta é objetiva. Ao cumprir, a barra enche e a badge é liberada. Sem
                sorteio, sem acaso.
              </p>
            </div>
            <div className="space-y-4 lg:col-span-8">
              <div className="rounded-2xl bg-card p-5 ring-1 ring-line">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-brand/15 font-display text-sm font-bold text-brand">
                      1
                    </span>
                    <div>
                      <div className="font-semibold">Concluir curso introdutório</div>
                      <div className="text-xs text-mist">XP Academy · Trilha iniciante</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-brand">+100 XP</span>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-full rounded-full bg-brand"></div>
                </div>
                <div className="mt-2 text-xs text-mist">
                  Concluída · badge "Fundamentos" liberada
                </div>
              </div>
              <div className="rounded-2xl bg-card p-5 ring-1 ring-line">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-brand/15 font-display text-sm font-bold text-brand">
                      2
                    </span>
                    <div>
                      <div className="font-semibold">Primeiro investimento</div>
                      <div className="text-xs text-mist">XP Journey · Aporte inicial</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-brand">+200 XP</span>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[55%] rounded-full bg-brand"></div>
                </div>
                <div className="mt-2 text-xs text-mist">Em andamento · 55%</div>
              </div>
              <div className="rounded-2xl bg-card p-5 ring-1 ring-line">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-white/10 font-display text-sm font-bold text-mist">
                      3
                    </span>
                    <div>
                      <div className="font-semibold">3 depósitos consecutivos</div>
                      <div className="text-xs text-mist">XP Journey · Consistência</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gold">+150 XP</span>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[33%] rounded-full bg-gold"></div>
                </div>
                <div className="mt-2 text-xs text-mist">Em andamento · 1 de 3 meses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMY */}
      <section id="academy" className="relative z-10 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="max-w-[40ch]">
            <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              XP Academy
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Trilhas que constroem sua base
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-card p-6 ring-1 ring-line">
              <div className="text-xs font-semibold text-brand">Iniciante</div>
              <div className="mt-2 font-display text-xl font-semibold">Fundamentos</div>
              <p className="mt-2 text-sm text-pretty text-mist">
                Inflação, juros compostos e o poder do tempo.
              </p>
              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-full rounded-full bg-brand"></div>
              </div>
              <div className="mt-2 text-xs text-mist">8 módulos · concluída</div>
            </div>
            <div className="rounded-2xl bg-card p-6 ring-1 ring-line">
              <div className="text-xs font-semibold text-brand">Intermediário</div>
              <div className="mt-2 font-display text-xl font-semibold">Renda fixa e fundos</div>
              <p className="mt-2 text-sm text-pretty text-mist">
                Renda fixa, fundos e diversificação prática.
              </p>
              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[60%] rounded-full bg-brand"></div>
              </div>
              <div className="mt-2 text-xs text-mist">12 módulos · 60%</div>
            </div>
            <div className="rounded-2xl bg-card p-6 ring-1 ring-line">
              <div className="text-xs font-semibold text-gold">Avançado</div>
              <div className="mt-2 font-display text-xl font-semibold">Construção de carteira</div>
              <p className="mt-2 text-sm text-pretty text-mist">
                Monte e rebalanceie uma carteira completa.
              </p>
              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[20%] rounded-full bg-gold"></div>
              </div>
              <div className="mt-2 text-xs text-mist">10 módulos · 20%</div>
            </div>
          </div>
        </div>
      </section>

      {/* XP PASS BENEFITS */}
      <section id="pass" className="relative z-10 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="rounded-3xl bg-card p-6 ring-1 ring-line sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                  XP Pass
                </span>
                <h2 className="mt-3 max-w-[16ch] font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Benefícios que crescem com seu nível
                </h2>
                <p className="mt-4 max-w-[42ch] text-pretty text-mist">
                  Quanto mais você evolui, mais o XP Pass entrega. As recompensas seguem
                  critérios objetivos de mérito e disciplina — nunca sorteio.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                <div className="rounded-xl bg-card p-4 ring-1 ring-line">
                  <div className="font-display text-2xl font-semibold text-brand">~10%</div>
                  <div className="mt-1 text-sm text-mist">do CDI em recompensas (hipótese)</div>
                </div>
                <div className="rounded-xl bg-card p-4 ring-1 ring-line">
                  <div className="font-display text-2xl font-semibold text-brand">FGC</div>
                  <div className="mt-1 text-sm text-mist">Cobertura até R$ 250 mil</div>
                </div>
                <div className="rounded-xl bg-card p-4 ring-1 ring-line">
                  <div className="font-display text-2xl font-semibold text-brand">100%</div>
                  <div className="mt-1 text-sm text-mist">Critérios objetivos, sem sorteio</div>
                </div>
                <div className="rounded-xl bg-card p-4 ring-1 ring-line">
                  <div className="font-display text-2xl font-semibold text-brand">+XP</div>
                  <div className="mt-1 text-sm text-mist">Bônus de XP por nível</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PASS vs PREMIUM */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="max-w-[40ch]">
            <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              XP Pass Premium
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Do Pass ao Premium
            </h2>
            <p className="mt-4 max-w-[48ch] text-pretty text-mist">
              O Premium é o próximo passo do XP Pass: assinatura mensal com benefícios
              exclusivos e receita recorrente.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {/* Pass */}
            <div className="rounded-3xl bg-card p-7 ring-1 ring-line">
              <div className="flex items-center justify-between">
                <div className="font-display text-xl font-semibold">XP Pass</div>
                <span className="text-xs text-mist">gratuito</span>
              </div>
              <div className="mt-4 font-display text-4xl font-semibold">
                R$ 0<span className="text-sm text-mist">/mês</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <span className="grid size-4 place-items-center rounded-full bg-brand/20 text-[10px] font-bold text-brand">
                    ✓
                  </span>{" "}
                  Missões e XP ilimitados
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="grid size-4 place-items-center rounded-full bg-brand/20 text-[10px] font-bold text-brand">
                    ✓
                  </span>{" "}
                  Trilhas da Academy
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="grid size-4 place-items-center rounded-full bg-brand/20 text-[10px] font-bold text-brand">
                    ✓
                  </span>{" "}
                  Benefícios básicos
                </li>
                <li className="flex items-center gap-2.5 text-mist/60">
                  <span className="grid size-4 place-items-center rounded-full bg-white/5 text-[10px]">
                    —
                  </span>{" "}
                  Consultoria dedicada
                </li>
              </ul>
            </div>
            {/* Premium */}
            <div className="relative rounded-3xl bg-card p-7 ring-1 ring-line">
              <div className="absolute -top-3 right-6 rounded-full bg-brand px-3 py-1 text-[10px] font-bold text-brand-foreground">
                RECOMENDADO
              </div>
              <div className="flex items-center justify-between">
                <div className="font-display text-xl font-semibold">XP Pass Premium</div>
                <span className="text-xs text-brand">upgrade</span>
              </div>
              <div className="mt-4 font-display text-4xl font-semibold">
                R$ 14,90<span className="text-sm text-mist">/mês</span>
              </div>
              <div className="mt-1 text-xs text-mist">hipótese do relatório, em validação</div>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <span className="grid size-4 place-items-center rounded-full bg-brand/20 text-[10px] font-bold text-brand">
                    ✓
                  </span>{" "}
                  Tudo do XP Pass
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="grid size-4 place-items-center rounded-full bg-brand/20 text-[10px] font-bold text-brand">
                    ✓
                  </span>{" "}
                  Consultoria dedicada
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="grid size-4 place-items-center rounded-full bg-brand/20 text-[10px] font-bold text-brand">
                    ✓
                  </span>{" "}
                  Benefícios exclusivos
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="grid size-4 place-items-center rounded-full bg-brand/20 text-[10px] font-bold text-brand">
                    ✓
                  </span>{" "}
                  +25% XP em missões
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-20 sm:px-8"><JourneySimulator /></section>

      {/* CTA */}
      <section id="cta" className="relative z-10 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <ProductTerms />
          <div className="rounded-[2rem] bg-card p-8 text-center ring-1 ring-line sm:p-14">
            <h2 className="mx-auto max-w-[20ch] font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Comece sua jornada hoje
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-pretty text-mist">
              Escolha sua trilha e ganhe XP desde o primeiro passo — neste protótipo, sem cadastro.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/journey"
                className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-brand-foreground ring-1 ring-brand/40 transition-colors hover:bg-brand2 duration-200"
              >
                Entrar na jornada
              </Link>
              <Link
                to="/pass-premium"
                className="rounded-full bg-card px-7 py-3 text-sm ring-1 ring-line transition-colors hover:bg-surface-hover"
              >
                Ver o Premium
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
