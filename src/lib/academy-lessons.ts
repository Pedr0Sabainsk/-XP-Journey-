export type AcademyContent = { intro: string; goals: string[]; sections: {heading: string; body: string; example: string}[]; takeaway: string; video?: { id: string; title: string; creator: string; note: string } };

/** Original educational content. External videos are independent material, not endorsed by XP. */
export const ACADEMY_CONTENT: Record<string, AcademyContent> = {
  "fundamentos-0": {
    intro: "Investir é usar recursos de hoje para apoiar objetivos de amanhã. Começa com planejamento, não com uma promessa de enriquecimento.",
    goals: ["Diferenciar poupar e investir", "Escolher objetivo e prazo", "Entender que todo produto possui condições e riscos"],
    sections: [
      {heading:"Comece por um objetivo",body:"Uma reserva para imprevistos e uma meta de longo prazo pedem soluções diferentes. Antes de comparar rentabilidades, defina quando você precisará do dinheiro.",example:"Exemplo: reservar R$ 30 por mês durante 12 meses significa separar R$ 360 em aportes, sem contar rendimentos."},
      {heading:"Poupar não é apostar",body:"Você decide o valor que cabe no orçamento e constrói constância. O desempenho de um investimento depende de condições do produto, taxas e prazos, e não de uma recompensa aleatória.",example:"Uma boa primeira ação é montar um orçamento e descobrir quanto pode ser reservado sem comprometer despesas."},
      {heading:"Separe XP e patrimônio",body:"Os pontos do Journey reconhecem aprendizado e critérios cumpridos. Eles não são depósitos, saldo de investimento nem promessa de remuneração.",example:"Concluir esta aula pode render XP educacional, mas não altera o saldo do banco."}
    ],takeaway:"Objetivo, prazo e capacidade de poupar vêm antes da escolha do investimento."
  },
  "fundamentos-1": {
    intro:"Inflação é a alta generalizada de preços. Ela ajuda a explicar por que guardar o mesmo valor nominal pode não preservar seu poder de compra.",
    goals:["Definir inflação", "Distinguir valor nominal e poder de compra", "Entender o retorno real"],
    sections:[
      {heading:"Por que os preços importam?",body:"Se produtos e serviços ficam mais caros, o mesmo dinheiro compra menos. Essa diferença é chamada perda de poder de compra.",example:"Uma cesta que custa R$ 100 e sobe 5% passa a custar R$ 105."},
      {heading:"Retorno nominal e real",body:"A remuneração anunciada costuma ser nominal. O retorno real considera a inflação do período, além dos custos e tributos quando aplicáveis.",example:"Ter 7% de rendimento nominal e inflação de 5% não significa ganhar 7% de poder de compra."},
      {heading:"Planeje metas em valores de hoje",body:"Para metas de longo prazo, considere que os custos futuros podem ser maiores. Revise suas metas periodicamente.",example:"Uma viagem planejada para daqui a três anos pode exigir um orçamento atualizado."}
    ],takeaway:"Rendimento nominal não é sinônimo de aumento equivalente do poder de compra."
  },
  "fundamentos-2": {
    intro:"Juros compostos são juros que podem incidir sobre o capital inicial e rendimentos já acumulados. O tempo é uma variável fundamental.",
    goals:["Entender a capitalização", "Comparar juros simples e compostos", "Evitar interpretar simulações como garantia"],
    sections:[
      {heading:"Como funciona a capitalização",body:"Quando os juros se incorporam ao saldo, os juros seguintes podem incidir sobre uma base maior.",example:"A 1% por período, R$ 100 passam a R$ 101 no primeiro período e R$ 102,01 no segundo, antes de impostos e taxas."},
      {heading:"Aportes recorrentes",body:"Além dos juros, novos aportes aumentam o saldo acumulado. Na prática, regularidade pode importar mais do que procurar ganhos rápidos.",example:"Doze aportes de R$ 50 somam R$ 600 de principal, independentemente de qualquer rendimento."},
      {heading:"Taxas e condições",body:"Uma taxa hipotética constante facilita ensinar matemática, mas investimentos reais podem ter impostos, prazos, risco e condições variáveis.",example:"Uma projeção de 12 meses é uma ilustração; o valor de resgate depende do produto e das condições efetivas."}
    ],takeaway:"Capitalização depende de taxa, tempo e saldo; crescimento projetado não é ganho assegurado.",
    video:{id:"lQii2OIr4Is",title:"Juros compostos — CDB: cálculo na prática",creator:"Deluca Educação Financeira",note:"Material independente publicado em 2022. Exemplos e condições do vídeo podem diferir do protótipo."}
  },
  "fundamentos-3": {
    intro:"Todo investimento envolve riscos e restrições. O retorno potencial deve ser avaliado junto à possibilidade de perdas e à necessidade de liquidez.",
    goals:["Reconhecer riscos", "Compreender liquidez", "Identificar a importância do perfil do investidor"],
    sections:[
      {heading:"Risco não é só oscilação",body:"Há risco de crédito, mercado e liquidez, entre outros. Mesmo produtos de renda fixa têm características próprias.",example:"Um investimento sem liquidez diária pode ser inadequado para uma reserva usada em emergências."},
      {heading:"Adequação ao perfil",body:"Uma recomendação de produto exige avaliar objetivos, conhecimento, situação financeira e tolerância a riscos, conforme as regras de suitability aplicáveis.",example:"Dois investidores com a mesma renda podem ter necessidades e prazos distintos."},
      {heading:"Não confunda potencial com certeza",body:"Rentabilidade passada, simulações e pontuações de aplicativos não asseguram retornos futuros.",example:"Um bônus de XP ao concluir uma trilha não compensa um risco que não seja adequado ao seu perfil."}
    ],takeaway:"Entenda risco, liquidez e adequação antes de considerar uma aplicação."
  },
  "renda-fixa-0": {
    intro:"Renda fixa reúne títulos com regras de remuneração definidas na contratação, mas não significa retorno livre de riscos.",
    goals:["Diferenciar CDB, LCI e títulos públicos", "Entender CDI", "Conhecer a cobertura do FGC e seus limites"],
    sections:[
      {heading:"CDB e LCI",body:"São títulos bancários com emissores, prazos, tributos e regras de liquidez que variam. A cobertura do FGC depende de elegibilidade, limites e regulamento.",example:"Um CDB elegível pode contar com FGC nos limites vigentes; isso não significa liquidez imediata ou ausência absoluta de risco."},
      {heading:"Tesouro Direto",body:"Permite investir em títulos públicos federais. A precificação e o resultado em resgates antecipados dependem do tipo de título e do mercado.",example:"Resgatar antes do vencimento um título de preço variável pode gerar resultado diferente do esperado."},
      {heading:"O que significa % do CDI",body:"É uma referência de remuneração que acompanha a taxa CDI, sujeita às condições contratuais e ao período da aplicação.",example:"O XP Journey usa 80% do CDI apenas como hipótese de simulação do CDB, separadamente das recompensas."}
    ],takeaway:"Compare remuneração, emissor, liquidez, impostos, riscos e adequação ao perfil.",
    video:{id:"WppbcBJyIfE",title:"Tesouro Direto ou CDB?",creator:"Excelência no Bolso",note:"Vídeo externo de 2021. Informações comerciais e tributárias podem ter mudado; verifique fontes atualizadas."}
  },
  "renda-fixa-1": {
    intro:"Fundos reúnem recursos de cotistas e investem conforme uma política específica. Podem ter estratégias e graus de risco diferentes.",
    goals:["Entender cotas", "Identificar custos", "Ler estratégia e riscos"],
    sections:[
      {heading:"O que você compra?",body:"Ao investir em um fundo, o cotista participa do patrimônio conforme as regras do regulamento. A gestão segue a política divulgada.",example:"Um fundo de renda fixa não é equivalente a um CDB: composição, custos e mecanismos de proteção são diferentes."},
      {heading:"Taxas importam",body:"Taxas de administração, performance e tributação, quando aplicáveis, afetam o resultado líquido.",example:"Dois fundos com desempenho bruto parecido podem gerar resultados líquidos diferentes."},
      {heading:"Leia os documentos",body:"Consulte regulamento, lâmina e informações sobre riscos antes de decidir.",example:"Confira se o fundo permite resgate na velocidade necessária para sua meta."}
    ],takeaway:"Fundo não é um benefício de pontos: é investimento sujeito a política, custos e riscos."
  },
  "renda-fixa-2": {
    intro:"A reserva para imprevistos ajuda a lidar com despesas inesperadas sem depender de crédito caro ou decisões precipitadas.",
    goals:["Entender liquidez", "Estabelecer uma meta realista", "Separar reserva de outros objetivos"],
    sections:[
      {heading:"O tamanho depende da situação",body:"A necessidade de reserva varia conforme estabilidade de renda, despesas e rede de apoio; não existe uma quantia universal.",example:"Liste moradia, alimentação, transporte e contas essenciais para estimar o que precisa proteger."},
      {heading:"Disponibilidade importa",body:"O dinheiro da reserva deve poder ser acessado em prazo compatível com emergências, levando em conta riscos e condições do produto.",example:"Um investimento que só pode ser resgatado em um ano pode não servir para urgências de amanhã."},
      {heading:"Construa aos poucos",body:"Comece com valores compatíveis com seu orçamento. Não há prêmio por se comprometer além da sua capacidade.",example:"Poupar R$ 20 de forma sustentável é mais coerente do que assumir um aporte que gera dívidas."}
    ],takeaway:"Uma boa reserva prioriza segurança, disponibilidade e adequação ao orçamento."
  },
  "carteira-0": {
    intro:"Construir uma carteira significa combinar investimentos de acordo com objetivos, prazo e perfil. Esta aula é educacional e não recomenda percentuais de alocação.",
    goals:["Definir objetivo por horizonte", "Entender concentração", "Compreender diversificação"],
    sections:[
      {heading:"Diferentes metas, diferentes prazos",body:"A necessidade de disponibilidade para curto prazo difere de metas de longo prazo. Comece identificando o uso previsto do dinheiro.",example:"A reserva de emergência e a aposentadoria não têm necessariamente a mesma estratégia."},
      {heading:"Diversificação",body:"Exposições variadas podem reduzir dependência de um único risco, embora não eliminem risco de perda.",example:"Concentrar todo o patrimônio em um único emissor pode aumentar o impacto de um problema específico."},
      {heading:"Suitability antes da execução",body:"Decisões reais dependem de uma avaliação formal do perfil e de informações atuais dos produtos.",example:"Uma simulação de carteira no aplicativo não executa ordens nem substitui orientação apropriada."}
    ],takeaway:"Uma carteira adequada nasce de metas, perfil e compreensão dos riscos."
  },
  "carteira-1": {
    intro:"Rebalancear é revisar o peso dos investimentos em relação ao plano. Não significa operar sempre nem tentar prever o mercado.",
    goals:["Entender por que pesos mudam", "Distinguir revisão de negociação impulsiva", "Reavaliar custos e perfil"],
    sections:[
      {heading:"Pesos mudam com o tempo",body:"Se ativos apresentam desempenhos distintos, a composição da carteira pode se afastar do planejamento original.",example:"Uma categoria que aumenta de valor pode passar a representar uma parcela maior do total."},
      {heading:"Revisar antes de agir",body:"Rebalanceamento requer avaliar custos, impostos, condições de mercado e suitability. Às vezes revisar não exige negociar.",example:"Uma alteração de objetivo pode justificar rever o plano, mas XP não é incentivo para realizar ordens."},
      {heading:"Disciplina não é hiperatividade",body:"O Journey pode premiar educação e planejamento verificados, mas não deve estimular volume de transações.",example:"Estudar a lógica de uma carteira rende XP educacional sem comprar ou vender ativos."}
    ],takeaway:"Rebalancear é seguir um plano adequado, não buscar recompensa por negociar mais."
  }
};
