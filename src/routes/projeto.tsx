import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteNav";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Link } from "@tanstack/react-router";
import { LiveBusinessDashboard } from "@/components/LiveBusinessDashboard";
import { MarketOpportunity } from "@/components/MarketOpportunity";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, Area, AreaChart } from "recharts";
import { ProductTerms } from "@/components/ProductTerms";
import { ArrowRight, BarChart3, BookOpen, CheckCircle2, ClipboardList, Clock3, Lightbulb, ShieldCheck, TrendingUp, Wallet, GraduationCap, Map, Gift, Rocket } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/projeto")({
  head: () => ({ meta: [
    { title: "XP Journey — Produto e viabilidade financeira" },
    { name: "description", content: "Roteiro didático de apresentação para profissionais XP: oportunidade, solução, receitas, LTV/CAC, EBIT, riscos e piloto." },
    { property: "og:title", content: "XP Journey — Proposta e viabilidade financeira" },
    { property: "og:description", content: "Apresentação executiva de 15 minutos baseada no relatório de outubro de 2026." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ProjectPage,
});

const presentation = [
  { id: "problema", title: "Mercado e aquisição", time: 2, question: "Por que esse produto faz sentido agora?" },
  { id: "produto", title: "Produtos na prática", time: 3, question: "Qual é a experiência proposta?" },
  { id: "receita", title: "Modelo de receita", time: 2, question: "De onde vêm as receitas?" },
  { id: "viabilidade", title: "Viabilidade financeira", time: 5, question: "A conta fecha?" },
  { id: "riscos", title: "Riscos e validação", time: 2, question: "O que pode impedir o sucesso?" },
  { id: "piloto", title: "Piloto e conclusão", time: 1, question: "Quais métricas sustentam o próximo investimento?" },
];

const annualEbit = [
  {ano:"Ano 1",meta:-734840,referencia:-3134840,acumulado:-734840},
  {ano:"Ano 2",meta:-592100,referencia:-4192100,acumulado:-1326940},
  {ano:"Ano 3",meta:105640,referencia:-3494360,acumulado:-1221300},
  {ano:"Ano 4",meta:1013380,referencia:-2586620,acumulado:-207920},
];
const brl=(n:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(n);

function Frame({number,title,minutes,answer,children}:{number:number;title:string;minutes:number;answer:string;children:ReactNode}){
 return <section id={presentation[number-1].id} className="xp-section-anchor scroll-mt-24 rounded-[28px] border border-white/10 bg-[#181818] p-5 shadow-[0_16px_55px_rgba(0,0,0,.16)] sm:p-8">
  <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-5"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand">Bloco {number} de 6</p><h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2><p className="mt-2 text-sm text-mist">{answer}</p></div><span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand"><Clock3 size={15}/>{minutes} min</span></div>
  {children}
 </section>;
}
function Takeaway({children}:{children:ReactNode}){
 return <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand/20 bg-brand/[.07] p-4"><Lightbulb className="mt-0.5 shrink-0 text-brand" size={19}/><p className="text-sm leading-relaxed"><span className="font-bold text-brand">Ponto central: </span>{children}</p></div>;
}
function NumberCard({value,label,detail}:{value:string;label:string;detail?:string}){
 return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="font-display text-2xl font-bold text-brand sm:text-3xl">{value}</p><p className="mt-2 text-sm font-semibold">{label}</p>{detail&&<p className="mt-1 text-xs leading-relaxed text-mist">{detail}</p>}</div>;
}
const sections = [
  { title: "Proposta e quatro componentes", paragraphs: [
    "Estratégia de captação e retenção que aproxima jovens do investimento, substituindo a lógica de risco e sorte pela formação de hábitos financeiros. A adesão ao produto ainda é uma hipótese a testar, não uma demanda comprovada.",
    "XP Journey organiza missões, XP, níveis, metas, badges, ligas e temporadas. XP Academy ensina em trilhas iniciais, intermediárias e avançadas. XP Pass entrega cashback, descontos em taxas de produtos XP e benefícios por critérios objetivos. XP Pass Premium é a modalidade mensal opcional com benefícios adicionais, cujo catálogo final ainda depende de definição.",
    "Educação → ação financeira → missão → evolução → recompensa → nova missão. XP mede evolução; XP Coins são pontos promocionais associados a critérios divulgados, sem cotação ou conversão fixada no relatório.",
  ] },
  { title: "Hábitos, metas e permanência", paragraphs: [
    "O relatório propõe aporte automático, metas com barra de progresso e arredondamento de transações de cartão ou Pix vinculados à conta XP para direcionar a diferença ao investimento. São propostas de integração, não operações disponíveis neste protótipo.",
    "Missões premiam a recorrência, não o tamanho do aporte. Sequências mensais, temporadas, ligas de participação e benefícios conforme o tempo no nível incentivam continuidade sem bloquear o capital ou estimular risco incompatível com renda e perfil.",
  ] },
  { title: "Modelo de negócio e Canvas", paragraphs: [
    "Segmento: jovens com familiaridade digital e necessidade de educação financeira. Proposta de valor: investimento, educação, gamificação, progressão e recompensas numa experiência contínua, não uma disputa pela maior taxa.",
    "Quatro pilares: spread que financia parte das recompensas; aquisição de menor custo por canais orgânicos e parcerias; aumento do valor do relacionamento por cross-selling adequado ao perfil; e receita recorrente do Premium.",
    "Canais propostos: indicação, faculdades e escolas técnicas. Recursos e atividades: ecossistema XP, motor de gamificação, conteúdo, tecnologia, atuária, suporte e governança jurídica. Custos incrementais: desenvolvimento, aquisição, recompensas e operação variável. A estrutura fixa já é considerada incorporada à operação XP no relatório.",
  ] },
  { title: "Premissas financeiras do piloto", paragraphs: [
    "Valores hipotéticos, a validar: entrada de R$ 30; aporte de R$ 120/mês; permanência de quatro anos; saldo médio anual de R$ 750, R$ 2.000, R$ 3.000 e R$ 4.250, média de R$ 2.500. CDI usado na simulação: 12% a.a., com cenários entre 10% e 14%; não é a taxa atual.",
    "Spread de cerca de 20% do CDI; metade financia o pool de recompensas. Premium: R$ 14,90/mês com 10% de adesão e custo de benefícios de 30% da receita. Cross-selling a partir do segundo ano: 8% dos clientes × R$ 150/ano; somente a parcela que migra mais recursos para a XP. Operação variável: R$ 10/cliente/ano, a confirmar.",
    "LTV em quatro anos: spread R$ 240 − recompensas R$ 120 + receita Premium R$ 71,5 − benefícios Premium R$ 21,5 + cross-selling R$ 36 − operação R$ 40 ≈ R$ 166. Com saldo maior: cerca de R$ 214; com cinco anos de permanência: R$ 232; com ambas as alavancas: R$ 292.",
    "CAC meta de R$ 60 (faixa de R$ 50 a R$ 70), contra R$ 300 como média XP informada no relatório. Relação LTV/CAC base: 2,8x na meta; para 3x, CAC máximo próximo de R$ 55. Cenário conservador de cross-selling para fundos de renda fixa: LTV ≈ R$ 133, relação 2,2x.",
  ] },
  { title: "Resultado, equilíbrio e sensibilidade", paragraphs: [
    "Piloto: 10 mil clientes no primeiro ano e 15 mil novos por ano a partir do segundo. Amortização de desenvolvimento: R$ 250 mil/ano (exemplo de CAPEX de R$ 1 milhão em quatro anos). Receitas do ano 1: R$ 358.800; recompensas, benefícios e operação: R$ 243.640; margem: R$ 115.160.",
    "Na meta de CAC R$ 60, EBIT anual projetado: −R$ 734.840 no ano 1; −R$ 592.100 no ano 2; +R$ 105.640 no ano 3; +R$ 1.013.380 no ano 4. Positivo anual não significa recuperação acumulada: esta ocorre no ano 5, mantida a captação. Caixa máximo necessário: cerca de R$ 1,3 milhão ao fim do ano 2.",
    "Com CAC R$ 300, o modelo não se sustenta nos cenários apresentados: EBIT acumulado de cerca de −R$ 13,4 milhões em quatro anos. A viabilidade depende de CAC baixo, Premium, cross-selling, juros, saldo médio e retenção; os valores não são resultados comprovados.",
  ] },
  { title: "Cinco forças de Porter", paragraphs: [
    "Rivalidade alta: bancos, corretoras e experiências digitais competem por atenção e recursos. Compradores com poder alto: muitas alternativas e facilidade de trocar de plataforma. Substitutos com ameaça alta: conteúdo gratuito, fidelidade, entretenimento e outras formas de guardar dinheiro.",
    "Fornecedores com poder médio: dependência de tecnologia, conteúdo, IA e especialistas; manter competências estratégicas internas reduz dependência. Novos entrantes com ameaça média/alta: podem copiar mecânicas, mas escala, marca, integração e conformidade criam barreiras.",
    "Resposta estratégica: diferenciar pela experiência integrada, confiança, educação e relacionamento de longo prazo, e não por maior cashback ou rendimento.",
  ] },
  { title: "PESTEL e ambiente externo", paragraphs: [
    "Político e legal: mudanças na regulação financeira, proteção do investidor, dados e recompensas exigem acompanhamento. Econômico: juros, renda, custo de aquisição e saldo médio afetam a sustentabilidade.",
    "Social: cultura digital e de apostas entre jovens, lacunas de educação financeira e instabilidade econômica explicam o foco. Tecnológico: maturidade digital, integrações financeiras, IA e microinterações viabilizam a experiência. A dimensão ecológica faz parte da análise, sem diferencial ambiental quantitativo estabelecido no relatório.",
    "Síntese: ambiente favorável à aproximação de educação e experiência digital, mas particularmente sensível às variáveis econômica e legal.",
  ] },
  { title: "Benchmark e evidências de mercado", paragraphs: [
    "Inter Loop conecta pontos, missões e benefícios, e certas aplicações a cashback. Nubank é referência pela reformulação do NuCoin; Mercado Pago pelo Meli+ e ecossistema; PicPay pelo Modo Turbo do Cofrinho. A comparação é qualitativa do grupo, baseada em consultas de setembro de 2026, não nota oficial nem promessa de condições atuais.",
    "Pesquisa CVM de 2025, com 1.371 respostas: 45% buscavam rentabilidade, 42% diversificação, 42% educação financeira e 86% pretendiam continuar investindo. Não é pesquisa exclusiva com jovens e não comprova demanda por XP Journey.",
    "O estudo CVM de suitability citado indica que 65% dos 2.815 participantes raramente ou nunca consideravam a análise de perfil ao decidir. ANBIMA 2026: 36% da população investe e apenas 21% participa de ações de educação financeira. DataSenado 2024: mais de 22 milhões haviam apostado no último mês; cerca de 12,4 milhões tinham entre 16 e 39 anos. São evidências de contexto, não garantias de adesão.",
  ] },
  { title: "Governança, riscos e responsabilidades", paragraphs: [
    "Sem sorteios ou recompensas ao acaso. Critérios de mérito e disciplina precisam ser objetivos, divulgados e validados juridicamente; cashback e descontos são separados da rentabilidade do CDB. Título de capitalização foi descartado pela ligação com sorteios.",
    "Antes de recomendação real, avaliação obrigatória de adequação ao perfil. O relatório cita CVM 30, supervisão profissional do uso de IA, normas de fundos e ofertas públicas conforme o ativo, infraestrutura bancária para Pix e proteção de dados pela LGPD. O enquadramento e as atribuições profissionais exigem validação formal, não são certificados por este site.",
    "Atuária e engenharia dimensionam o pool; tecnologia integra eventos elegíveis e crédito de XP; UX e economia comportamental desenham hábitos responsáveis; marketing valida canais de CAC baixo; jurídico e compliance revisam riscos, regras e comunicação. Consentimento e minimização de dados são necessários no uso de IA; este protótipo oferece apenas planejamento educacional, não gestão de carteira.",
  ] },
  { title: "Validação e fontes do relatório", paragraphs: [
    "Próximos passos: entrevistas, pesquisas de interesse e testes de MVP; medir CAC por canal, saldo médio, adesão ao Premium, retenção e conversão em cross-selling. Confirmar custos de operação e desenvolvimento com a XP antes de escalar.",
    "O relatório prevê um painel institucional para variar CAC, juros, saldo, adesão e captação, com backtest histórico do CDI. Este protótipo apresenta um painel de cenários sem backtest, com valores ilustrativos.",
    "Fontes citadas: CVM (perfil, comportamento, suitability e educação financeira), ANBIMA (Raio X do Investidor e normas de fundos), Agência Senado/DataSenado (apostas), B3 Bora Investir (jovens), páginas oficiais e centrais de ajuda de Inter, Nubank, Mercado Pago e PicPay, e referências jurídicas Pinheiro Guimarães. Consultas do grupo: setembro e outubro de 2026. Síntese baseada no relatório enviado, sem atualização externa das fontes.",
  ] },
];

function ProjectPage(){
 return <PageShell><main className="relative z-10 mx-auto max-w-6xl px-5 py-12 sm:px-8">
  <section aria-label="Experiência completa do XP Journey" id="experiencia-completa" className="xp-section-anchor scroll-mt-24">
     <div className="mb-4 flex flex-wrap items-end justify-between gap-3 px-1">
       <div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand">Experiência de produto integrada</p><h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">XP Journey: apresentação completa dos produtos</h2><p className="mt-2 max-w-3xl text-sm text-mist">Conheça o XP Journey, suas missões, as trilhas da Academy e os benefícios do Pass. Em seguida, explore a viabilidade econômica do projeto.</p></div>
       <a href="#analise-financeira" className="rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/20">Ver viabilidade financeira →</a>
     </div>
     <ProductShowcase />
  </section>


  <header id="analise-financeira" className="mt-10 rounded-[32px] border border-brand/20 bg-[radial-gradient(circle_at_top_right,rgba(255,199,0,.14),transparent_45%),#161616] p-6 sm:p-10">
   <p className="text-xs font-bold uppercase tracking-[.22em] text-brand">XP Journey · Produto e viabilidade · Outubro de 2026</p>
   <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Transformando educação financeira em <span className="text-brand">valor para o cliente e para a XP</span></h1>
   <p className="mt-5 max-w-3xl text-base leading-relaxed text-mist">O XP Journey integra educação, investimento e recompensas para ampliar a base de clientes e o relacionamento financeiro com a XP. A viabilidade depende de aquisição eficiente, retenção e disciplina de custos. Projeções condicionadas às premissas do estudo.</p>
   <div className="mt-7 flex flex-wrap gap-2"><span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">Visão executiva · 15 minutos</span><span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-mist">Aquisição · margem · caixa · retorno</span><span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-mist">Projeções sujeitas a validação</span></div>
   <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
    <div className="rounded-2xl border border-brand/30 bg-brand/[.11] p-4"><div className="text-[11px] font-bold uppercase tracking-[.15em] text-white/70">Valor por cliente · 4 anos</div><div className="mt-2 font-display text-3xl font-bold text-brand">R$ 166</div><p className="mt-1 text-xs text-mist">LTV base estimado</p></div>
    <div className="rounded-2xl border border-white/15 bg-white/[.04] p-4"><div className="text-[11px] font-bold uppercase tracking-[.15em] text-white/70">Aquisição-alvo</div><div className="mt-2 font-display text-3xl font-bold">R$ 60</div><p className="mt-1 text-xs text-mist">CAC por novo cliente</p></div>
    <div className="rounded-2xl border border-brand/30 bg-brand/[.11] p-4"><div className="text-[11px] font-bold uppercase tracking-[.15em] text-white/70">Resultado operacional · ano 4</div><div className="mt-2 font-display text-3xl font-bold text-brand">+R$ 1,01 mi</div><p className="mt-1 text-xs text-mist">EBIT anual, cenário-base</p></div>
    <div className="rounded-2xl border border-white/15 bg-white/[.04] p-4"><div className="text-[11px] font-bold uppercase tracking-[.15em] text-white/70">Capital necessário</div><div className="mt-2 font-display text-3xl font-bold">≈ R$ 1,3 mi</div><p className="mt-1 text-xs text-mist">Maior déficit acumulado previsto</p></div>
   </div>
   <p className="mt-4 text-xs leading-relaxed text-mist">Cenário hipotético do relatório. EBIT é resultado operacional; não equivale a retorno líquido sobre o capital investido nem a distribuição de lucro.</p>
  </header>



  <section id="trilha-apresentacao" aria-label="Trilha da apresentação" className="mt-6 overflow-hidden rounded-[28px] border border-brand/25 bg-[#191919] p-5 sm:p-7">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand">Trilha de apresentação</p><h2 className="mt-2 font-display text-2xl font-semibold">Do produto ao retorno financeiro</h2></div><span className="rounded-full border border-brand/25 bg-brand/10 px-3 py-2 text-xs font-bold text-brand">15 minutos · 6 etapas</span></div>
    <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">{presentation.map((item, index) => <a key={item.id} href={`#${item.id}`} className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[.035] p-4 transition hover:border-brand/60 hover:bg-brand/[.07]"><span className="inline-flex size-9 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-black shadow-[0_0_20px_rgba(255,199,0,.18)]">{index + 1}</span><span className="mt-3 text-sm font-bold group-hover:text-brand">{item.title}</span><span className="mt-1 text-xs text-mist">{item.time} min</span>{index < presentation.length - 1 && <ArrowRight className="absolute right-3 top-4 hidden text-brand/50 xl:block" size={14}/>}</a>)}</div>
    <p className="mt-4 text-xs text-mist">Sequência recomendada: oportunidade → demonstração dos produtos → monetização → retorno financeiro → riscos → proposta de piloto.</p>
  </section>


  <nav aria-label="Visão do projeto" className="sticky top-2 z-30 mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-[#151515]/95 p-3 shadow-xl backdrop-blur"><div className="flex min-w-max gap-2">{presentation.map((s,i)=><a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-mist transition-colors hover:bg-brand/10 hover:text-brand"><span className="grid size-6 place-items-center rounded-full bg-brand/15 text-brand">{i+1}</span>{s.title}<span className="text-[10px] text-white/40">{s.time}m</span></a>)}</div></nav>

  <div className="mt-4 flex flex-wrap gap-3"><a href="#dashboard-financeiro" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Dashboard financeiro <BarChart3 size={15}/></a></div>

  <div className="mt-6 space-y-6">
   <Frame number={1} title="Problema e oportunidade" minutes={2} answer="Por que olhar para jovens que hoje apostam?">
    <div className="grid gap-3 sm:grid-cols-3"><NumberCard value="≈ 22,13 mi" label="Brasileiros que apostaram" detail="13% das pessoas com 16+ anos nos 30 dias anteriores · DataSenado 2024"/><NumberCard value="56%" label="Apostadores de 16 a 39 anos" detail="Perfil etário dos apostadores · DataSenado 2024"/><NumberCard value="21%" label="Participação em educação financeira" detail="Cursos ou palestras · ANBIMA, 9ª edição, 2026"/></div>
    <p className="mt-5 max-w-4xl text-sm leading-relaxed text-mist">O relatório também registra que 31% dos brasileiros não têm reserva para imprevistos (ANBIMA, 2026). A combinação de familiaridade com experiências digitais, cultura de apostas e necessidade de educação financeira indica uma oportunidade de testar uma proposta alternativa.</p>
    <Takeaway>Existe um público e um problema relevantes. Mas esses dados <strong>não provam demanda pelo XP Journey</strong> — isso precisa ser testado com usuários reais.</Takeaway>
   </Frame>

   <Frame number={2} title="A solução: aprender, evoluir e conquistar" minutes={3} answer="Como substituir o acaso por uma jornada com regras claras?">
    <div className="grid gap-3 sm:grid-cols-4">{[{name:"XP Academy",desc:"Trilhas e avaliação do aprendizado",icon:<BookOpen size={20}/>},{name:"XP Journey",desc:"Missões, níveis e metas",icon:<TrendingUp size={20}/>},{name:"XP Pass",desc:"Benefícios por critérios objetivos",icon:<Wallet size={20}/>},{name:"Pass Premium",desc:"Assinatura e benefícios adicionais",icon:<CheckCircle2 size={20}/>}].map(x=><div key={x.name} className="rounded-2xl border border-brand/20 bg-brand/[.055] p-4"><div className="text-brand">{x.icon}</div><h3 className="mt-3 font-semibold">{x.name}</h3><p className="mt-2 text-xs leading-relaxed text-mist">{x.desc}</p></div>)}</div>
    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold">{["Educação","Ação financeira","Missão","XP e nível","Benefício"].map((item,i)=><span key={item} className="flex items-center gap-2"><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{item}</span>{i<4&&<ArrowRight size={14} className="text-brand"/>}</span>)}</div>
    <p className="mt-4 text-sm text-mist">Produto financeiro proposto: CDB com liquidez diária e cobertura do FGC nos limites aplicáveis. O rendimento do investimento é separado de cashback e demais recompensas. Não há sorteio, urgência falsa ou recompensa vinculada ao acaso.</p>
    <div className="mt-6 rounded-2xl border border-brand/25 bg-brand/[.05] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand">Demonstração de produto</p><h3 className="mt-1 text-lg font-bold">Uma jornada integrada à análise de viabilidade</h3></div></div><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[
      {to:"/academy",name:"XP Academy",description:"Aprender e validar",icon:<GraduationCap size={20}/>},
      {to:"/journey",name:"XP Journey",description:"Missões e evolução",icon:<Rocket size={20}/>},
      {to:"/mapa",name:"Mapa",description:"Trilha gamificada",icon:<Map size={20}/>},
      {to:"/pass",name:"XP Pass",description:"Benefícios e níveis",icon:<Gift size={20}/>}
    ].map(item=><Link key={item.to} to={item.to} className="group rounded-2xl border border-white/10 bg-white/[.04] p-4 transition hover:border-brand/50 hover:bg-brand/[.07]"><div className="text-brand">{item.icon}</div><div className="mt-3 font-semibold group-hover:text-brand">{item.name}</div><p className="mt-1 text-xs text-mist">{item.description}</p><div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand">Explorar <ArrowRight size={13}/></div></Link>)}</div><p className="mt-3 text-xs text-mist">Pass Premium: <Link to="/pass-premium" className="font-bold text-brand underline underline-offset-4">comparação de assinatura e benefícios</Link>. Protótipo demonstrativo; os produtos não efetuam operações financeiras.</p></div>
    <Takeaway>O diferencial não é superar concorrentes na taxa: é integrar <strong>investimento, educação, recorrência e relacionamento com a XP</strong>.</Takeaway>
   </Frame>


   <Frame number={3} title="Como a XP ganha dinheiro" minutes={2} answer="Quais são os quatro pilares financeiros do modelo?">
    <div className="grid gap-3 sm:grid-cols-2"><NumberCard value="Spread" label="Margem sobre recursos captados" detail="Hipótese: remuneração-base do cliente ≈ 80% do CDI; spread ≈ 20% do CDI; metade do spread financia as recompensas"/><NumberCard value="CAC menor" label="Aquisição orgânica e parcerias" detail="Meta: R$ 60 por cliente, comparada à referência de R$ 300 informada no relatório"/><NumberCard value="Cross-selling" label="Aumento do relacionamento" detail="8% dos clientes × R$ 150/ano, a partir do ano 2; pressupõe migração adicional de recursos"/><NumberCard value="R$ 14,90/mês" label="Assinatura Premium" detail="Hipótese: 10% de adesão; custo de benefícios de 30% da receita"/></div>
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-semibold">Oferta financeira proposta</h3><p className="mt-2 text-sm text-mist">Entrada hipotética de R$ 30; aporte mensal de R$ 120; CDB com remuneração-base de cerca de 80% do CDI; recompensas determinísticas equivalentes a aproximadamente 10% do CDI, separadas do rendimento do CDB. Valores e regras sujeitos à validação.</p></div>
    <Takeaway>A proposta tem receita diversificada, mas <strong>o spread sozinho não paga bem o CAC</strong>. Premium e cross-selling são importantes para sustentar o LTV.</Takeaway>
   </Frame>

   <Frame number={4} title="Retorno econômico e viabilidade financeira" minutes={5} answer="Economia por cliente, geração de resultado e investimento necessário.">
    <div className="grid gap-3 sm:grid-cols-4"><NumberCard value="R$ 166" label="LTV base" detail="Margem por cliente em 4 anos"/><NumberCard value="R$ 60" label="CAC meta" detail="A validar com canais de aquisição"/><NumberCard value="2,8x" label="LTV/CAC base" detail="Meta abaixo da referência de 3x"/><NumberCard value="≈ 26 meses" label="Payback do CAC" detail="Cenário com CAC de R$ 60"/></div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
      <div><h3 className="mb-3 text-lg font-bold">De onde vêm os R$ 166 de LTV?</h3><div className="overflow-x-auto rounded-2xl border border-white/10"><table className="w-full min-w-[310px] text-sm"><thead className="bg-white/[.06] text-left"><tr><th className="px-4 py-3">Componente (4 anos)</th><th className="px-4 py-3 text-right">Valor</th></tr></thead><tbody className="divide-y divide-white/10">{[["Spread bruto","+ R$ 240,0"],["Recompensas","− R$ 120,0"],["Receita Premium","+ R$ 71,5"],["Custo benefícios Premium","− R$ 21,5"],["Cross-selling","+ R$ 36,0"],["Operação variável","− R$ 40,0"]].map(([a,b])=><tr key={a}><td className="px-4 py-2.5 text-mist">{a}</td><td className="px-4 py-2.5 text-right font-semibold">{b}</td></tr>)}</tbody><tfoot className="bg-brand/10 font-bold text-brand"><tr><td className="px-4 py-3">LTV</td><td className="px-4 py-3 text-right">R$ 166</td></tr></tfoot></table></div></div>
      <div><h3 className="mb-3 text-lg font-bold">EBIT anual: CAC de R$ 60 × R$ 300</h3><div className="h-72 rounded-2xl border border-white/10 bg-white/[.025] p-2"><ResponsiveContainer width="100%" height="100%"><BarChart data={annualEbit}><CartesianGrid stroke="#434343" strokeDasharray="3 3"/><XAxis dataKey="ano" stroke="#aaa"/><YAxis stroke="#aaa" tickFormatter={v=>`${(Number(v)/1000000).toFixed(1)} mi`} width={58}/><Tooltip formatter={v=>brl(Number(v))} contentStyle={{backgroundColor:"#191919",border:"1px solid #777"}}/><ReferenceLine y={0} stroke="#ddd"/><Bar dataKey="meta" name="CAC R$ 60" fill="#ffc700" radius={[3,3,0,0]}/><Bar dataKey="referencia" name="CAC R$ 300" fill="#888888" radius={[3,3,0,0]}/></BarChart></ResponsiveContainer></div><p className="mt-2 text-xs text-mist">EBIT projetado, por cenário de CAC. Amarelo: aquisição a R$ 60. Cinza: aquisição a R$ 300.</p></div>
    </div>
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.025] p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-lg font-bold">Resultado acumulado e necessidade de capital</h3><p className="mt-1 text-sm text-mist">EBIT acumulado permanece negativo até o final do quarto ano; recuperação projetada no quinto.</p></div><span className="rounded-full border border-brand/25 bg-brand/[.1] px-3 py-1 text-xs font-semibold text-brand">Pior ponto: −R$ 1,33 mi · Ano 2</span></div>
      <div className="h-60 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={annualEbit}><CartesianGrid stroke="#434343" strokeDasharray="3 3"/><XAxis dataKey="ano" stroke="#aaa"/><YAxis stroke="#aaa" tickFormatter={(v:number)=>`${(Number(v)/1e6).toFixed(1)} mi`} width={60}/><Tooltip formatter={(v)=>brl(Number(v))} contentStyle={{backgroundColor:"#191919",border:"1px solid #777"}}/><ReferenceLine y={0} stroke="#aaa"/><Area type="monotone" dataKey="acumulado" name="EBIT acumulado" stroke="#ffc700" strokeWidth={3} fill="#ffc700" fillOpacity={0.13}/></AreaChart></ResponsiveContainer></div>
      <div className="mt-3 grid gap-3 text-center sm:grid-cols-3"><div className="rounded-xl bg-white/[.04] p-3"><p className="text-xs text-mist">Ano 2 · déficit máximo</p><p className="mt-1 font-display text-lg font-bold">−R$ 1,33 mi</p></div><div className="rounded-xl bg-white/[.04] p-3"><p className="text-xs text-mist">Ano 4 · saldo acumulado</p><p className="mt-1 font-display text-lg font-bold">−R$ 207,9 mil</p></div><div className="rounded-xl bg-brand/[.08] p-3"><p className="text-xs text-mist">Recuperação projetada</p><p className="mt-1 font-display text-lg font-bold text-brand">Ano 5</p></div></div>
    </div>
    <div className="mt-5 grid gap-3 sm:grid-cols-3"><NumberCard value="Ano 3" label="EBIT anual positivo" detail="+ R$ 105.640 na meta de CAC"/><NumberCard value="Ano 5" label="Recuperação acumulada" detail="Mantida a trajetória de captação"/><NumberCard value="≈ R$ 1,3 mi" label="Caixa máximo estimado" detail="Necessidade ao fim do ano 2"/></div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-brand/25 bg-brand/[.07] p-5"><p className="text-xs font-bold uppercase tracking-[.17em] text-brand">Unit economics · aquisição eficiente</p><div className="mt-3 font-display text-3xl font-bold text-brand">R$ 106</div><p className="mt-1 text-sm font-semibold">LTV − CAC alvo</p><p className="mt-2 text-xs text-mist">R$ 166 − R$ 60, antes dos demais custos de estrutura e do financiamento do crescimento.</p></div>
      <div className="rounded-2xl border border-rose-400/25 bg-rose-400/[.06] p-5"><p className="text-xs font-bold uppercase tracking-[.17em] text-rose-200">Unit economics · CAC de referência</p><div className="mt-3 font-display text-3xl font-bold text-rose-200">−R$ 134</div><p className="mt-1 text-sm font-semibold">LTV − CAC de R$ 300</p><p className="mt-2 text-xs text-mist">R$ 166 − R$ 300: a margem acumulada do cliente não recupera a aquisição nesse cenário.</p></div>
    </div>
    <p className="mt-4 text-sm text-mist">Premissas: 10 mil clientes no primeiro ano, 15 mil novos por ano após isso, R$ 250 mil/ano de amortização, CDI de 12% a.a. e saldo médio de R$ 2.500. Com CAC de R$ 300, não há sustentabilidade no cenário do relatório. O LTV pode chegar a ≈ R$ 292 pelas duas alavancas de maior saldo e maior permanência, mas isso também é hipótese.</p>
    <Takeaway><strong>O CAC é a principal condição de viabilidade.</strong> O resultado anual fica positivo no ano 3 na meta, mas o projeto ainda precisa financiar o caixa negativo acumulado até a recuperação prevista no ano 5.</Takeaway>
    <div id="dashboard-financeiro" className="mt-8 scroll-mt-28"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Demonstração ao vivo · cenários</p><h3 className="mt-1 font-display text-2xl font-semibold">Dashboard financeiro interativo</h3><p className="mt-2 max-w-3xl text-sm text-mist">Sensibilidade de LTV, CAC, margem e EBIT a cenários de aquisição, taxa de referência, saldo investido e adesão ao Premium.</p></div><span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-2 text-xs font-semibold text-brand">Atualização instantânea</span></div><LiveBusinessDashboard /><p className="mt-3 text-xs leading-relaxed text-mist">Simulação de cenários. Os valores de referência do estudo aparecem na análise acima; resultados efetivos dependem das condições comerciais e da validação do modelo.</p></div>
   </Frame>

   <Frame number={5} title="Riscos que afetam o retorno" minutes={2} answer="Viabilidade depende de aquisição, retenção e governança.">
    <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><BarChart3 className="text-brand"/><h3 className="mt-3 font-bold">Risco financeiro</h3><p className="mt-2 text-sm text-mist">CAC superior à meta; juros ou saldos menores; baixa adesão Premium e cross-selling limitado. No cenário conservador de cross-selling, LTV ≈ R$ 133.</p></div><div className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><ShieldCheck className="text-brand"/><h3 className="mt-3 font-bold">Regulação</h3><p className="mt-2 text-sm text-mist">Suitability antes de recomendação, LGPD, validação jurídica das recompensas, transparência do FGC e distinção CDB × XP/cashback.</p></div><div className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><ClipboardList className="text-brand"/><h3 className="mt-3 font-bold">Execução</h3><p className="mt-2 text-sm text-mist">Integração financeira, dimensionamento do pool de recompensas, experiência segura e competência tecnológica interna.</p></div></div>
    <p className="mt-5 text-sm text-mist">Porter identifica rivalidade, poder dos clientes e substitutos como altos; PESTEL aponta oportunidade social/tecnológica, com especial sensibilidade econômica e legal. Benchmark: Inter Loop, Nubank, Meli+ e PicPay já combinam recompensas e ecossistemas; a diferença proposta é a integração com educação e investimento.</p>
    <Takeaway>Um mercado favorável <strong>não garante sucesso</strong>. A operação só deve escalar depois de comprovar CAC, adequação regulatória e a sustentabilidade do pool de recompensas.</Takeaway>
   </Frame>

   <Frame number={6} title="Piloto, validação e proposta para XP" minutes={1} answer="Etapas de validação para decisão de investimento.">
    <div className="grid gap-3 sm:grid-cols-3"><NumberCard value="01" label="Validar interesse" detail="Entrevistas e testes de usabilidade com o público-alvo"/><NumberCard value="02" label="Medir unit economics" detail="CAC por canal, saldo médio, retenção, Premium e cross-selling"/><NumberCard value="03" label="Definir go/no-go" detail="Revisão jurídica, custos reais e comparação com metas financeiras"/></div>
    <p className="mt-5 text-sm leading-relaxed text-mist">Premissas a confirmar com a XP: CAC dos canais orgânicos, custos variáveis por cliente, desenvolvimento e amortização, desenho final das recompensas e viabilidade de integrações. O protótipo não movimenta dinheiro e não comprova desempenho comercial.</p>
    <Takeaway>Propomos testar em MVP a tese de <strong>captação de jovens com menor CAC, retenção por educação e disciplina, e aumento de LTV</strong> — com métricas claras antes de escala.</Takeaway>
   </Frame>
  </div>

  <div className="mt-8 rounded-3xl border border-white/10 bg-[#181818] p-5 sm:p-8"><h2 className="font-display text-2xl font-semibold">Informações complementares</h2><p className="mt-2 text-sm text-mist">Canvas, Porter, PESTEL, benchmark, premissas de cálculo e governança do modelo de negócio.</p><details className="mt-5 rounded-2xl border border-white/10 p-4"><summary className="cursor-pointer font-semibold text-brand">Ver análises completas: Canvas, Porter, PESTEL, benchmark, premissas e governança</summary><div className="mt-5 space-y-3">{sections.map((s,i)=><details key={s.title} className="rounded-xl border border-white/10 p-4"><summary className="cursor-pointer font-semibold">{i+1}. {s.title}</summary><div className="mt-3 space-y-3 text-sm leading-relaxed text-mist">{s.paragraphs.map(p=><p key={p}>{p}</p>)}</div></details>)}</div></details><details className="mt-3 rounded-2xl border border-white/10 p-4"><summary className="cursor-pointer font-semibold">Abrir evidências de mercado e contexto</summary><div className="mt-4"><MarketOpportunity /></div></details></div>
  <section id="acessar-site" aria-label="Acesso à apresentação XP Journey" className="mt-8 overflow-hidden rounded-[30px] border border-brand/30 bg-[radial-gradient(circle_at_top_right,rgba(255,199,0,.12),transparent_50%),#171717] p-6 sm:p-9">
    <div className="grid items-center gap-7 sm:grid-cols-[minmax(0,1fr)_auto]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.19em] text-brand">XP Journey · apresentação digital</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold sm:text-4xl">Explore o projeto no seu celular</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">Acesse a experiência completa dos produtos, as premissas financeiras e o dashboard interativo. O QR code direciona para a página Produto e Viabilidade.</p>
        <a href="https://xp-journey-jqcp.vercel.app/projeto" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-bold text-black transition hover:bg-brand2">Abrir XP Journey</a>
        <p className="mt-3 break-all text-xs text-mist">xp-journey-jqcp.vercel.app/projeto</p>
      </div>
      <div className="mx-auto rounded-3xl bg-white p-4 shadow-[0_0_45px_rgba(255,199,0,.08)] sm:mx-0">
        <img src="/qrcode-xp-journey.png" alt="QR code para abrir Produto e Viabilidade do XP Journey" width={228} height={228} loading="lazy" className="block size-[198px] object-contain sm:size-[228px]" />
      </div>
    </div>
  </section>

  <div className="mt-8"><ProductTerms /></div>
  <p className="mt-8 text-xs leading-relaxed text-mist">Equipe: Gustavo Mesquita Carapina · Pedro Henrique Lopes Sabainsk · Felipe Condutta Bertoa · Eduardo Cardoso dos Santos. Base: XP Journey — Modelos de Negócios, relatório executivo de outubro de 2026. Números financeiros e indicadores de mercado apresentados como hipóteses e fontes citadas no relatório; não representam validação independente de mercado.</p>
 </main></PageShell>;
}
