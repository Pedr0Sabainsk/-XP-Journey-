export type Fase = { emoji: string; titulo: string; explica: string; pergunta: string; opcoes: string[]; certa: number };

export const MUNDOS: { nome: string; resumo: string; icon: string; fases: Fase[] }[] = [
  { nome: "Mundo 1 · Organizando a casa", resumo: "Fluxo de caixa, cortes inteligentes e juros do cartão.", icon: "🧭", fases: [
    { emoji: "👛", titulo: "Pra onde vai seu dinheiro?", explica: "Antes de investir, anote tudo que você ganha e gasta no mês. Só assim dá pra saber quanto sobra.", pergunta: "Qual é o primeiro passo?", opcoes: ["Comprar ações", "Anotar ganhos e gastos", "Pedir empréstimo"], certa: 1 },
    { emoji: "✂️", titulo: "Cortando gastos", explica: "Pequenos gastos repetidos (delivery, assinaturas) somam muito no fim do mês.", pergunta: "O que mais pesa sem você perceber?", opcoes: ["Gastos pequenos e repetidos", "Conta de luz", "Aluguel"], certa: 0 },
    { emoji: "💳", titulo: "Fuja dos juros", explica: "O rotativo do cartão cobra juros altíssimos. Pague sempre a fatura inteira.", pergunta: "O que fazer com a fatura do cartão?", opcoes: ["Pagar o mínimo", "Pagar inteira", "Deixar pra depois"], certa: 1 },
  ]},
  { nome: "Mundo 2 · Reserva de emergência", resumo: "Objetivo, tamanho da reserva e produtos adequados.", icon: "🛡️", fases: [
    { emoji: "🛟", titulo: "O que é reserva?", explica: "É um dinheiro guardado para imprevistos: perder o emprego, consertar o carro, saúde.", pergunta: "Para que serve a reserva?", opcoes: ["Viajar", "Imprevistos", "Comprar celular novo"], certa: 1 },
    { emoji: "📏", titulo: "Quanto guardar?", explica: "O ideal é ter de 6 a 12 meses dos seus gastos mensais guardados.", pergunta: "Se você gasta R$ 2.000/mês, a reserva ideal começa em…", opcoes: ["R$ 2.000", "R$ 12.000", "R$ 500"], certa: 1 },
    { emoji: "🏦", titulo: "Onde deixar?", explica: "A reserva precisa ser segura e ter saque rápido, como Tesouro Selic ou CDB com liquidez diária.", pergunta: "Qual o melhor lugar pra reserva?", opcoes: ["Ações", "Criptomoedas", "Tesouro Selic / CDB liquidez diária"], certa: 2 },
  ]},
  { nome: "Mundo 3 · Primeiro investimento", resumo: "Renda fixa, diversificação e o primeiro aporte com constância.", icon: "🏔️", fases: [
    { emoji: "📈", titulo: "Renda fixa", explica: "Na renda fixa você sabe as regras do rendimento na hora que investe. É o melhor começo.", pergunta: "Renda fixa é boa para…", opcoes: ["Começar com segurança", "Ficar rico em 1 mês", "Apostar"], certa: 0 },
    { emoji: "🧺", titulo: "Não coloque tudo num lugar só", explica: "Diversificar é dividir seu dinheiro em vários investimentos para reduzir riscos.", pergunta: "Diversificar significa…", opcoes: ["Investir tudo numa ação", "Dividir em vários investimentos", "Não investir"], certa: 1 },
    { emoji: "🏆", titulo: "Seu primeiro aporte", explica: "Comece com pouco, mas todo mês. A constância vale mais que o valor.", pergunta: "O que mais importa no começo?", opcoes: ["Investir todo mês", "Esperar ter muito dinheiro", "Seguir dicas da internet"], certa: 0 },
  ]},
];

