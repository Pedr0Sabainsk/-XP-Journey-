export type Question = { prompt: string; options: string[]; correct: number; explanation: string };
export type MapLesson = { id: string; title: string; emoji: string; intro: string; questions: Question[] };
type Row = [string, string, string, string, string];
// The first answer in each authoring row is correct; rotate its position for display.
function questions(rows: Row[]): Question[] {
  return rows.map(([prompt, right, wrong1, wrong2, explanation], index) => {
    const correct = index % 3;
    const options = [wrong1, wrong2];
    options.splice(correct, 0, right);
    return { prompt, options, correct, explanation };
  });
}
export const MAP_UNITS: { title: string; subtitle: string; lessons: MapLesson[] }[] = [
  { title: "Organizando a casa", subtitle: "Seu dinheiro, suas escolhas", lessons: [
    { id: "orcamento-v2", title: "Seu dinheiro no mês", emoji: "👛", intro: "Um orçamento reúne o que entra e o que sai. Saber para onde seu dinheiro vai é o começo de uma vida financeira mais organizada.", questions: questions([
      ["Qual é o primeiro passo para organizar o dinheiro?", "Anotar ganhos e gastos", "Comprar ações", "Pedir um empréstimo", "Conhecer suas entradas e saídas permite decidir com informação."],
      ["Salário é um exemplo de…", "Receita", "Despesa", "Dívida", "Receita é dinheiro que entra, como salário e outros recebimentos."],
      ["A conta de luz é uma…", "Despesa", "Receita", "Aplicação", "Despesa é dinheiro que sai para pagar um bem ou serviço."],
      ["Entram R$ 2.500 e saem R$ 2.000. Quanto sobra?", "R$ 500", "R$ 2.000", "R$ 4.500", "O saldo é a receita menos as despesas: 2.500 − 2.000 = 500."],
      ["Se os gastos superam a renda, o orçamento fica…", "Negativo", "Equilibrado", "Com sobra", "Gastar mais do que entra gera um déficit que precisa ser ajustado."],
      ["Qual gasto costuma ser fixo?", "Aluguel mensal contratado", "Um presente eventual", "Uma viagem surpresa", "Gastos fixos se repetem com valor relativamente previsível."],
      ["Qual é um gasto variável?", "Lazer no fim de semana", "Aluguel contratado", "Mensalidade fixa", "Gastos variáveis mudam conforme o consumo e as escolhas."],
      ["Como registrar uma compra pequena?", "Anotar também", "Ignorar sempre", "Contar como receita", "Compras pequenas se acumulam e precisam entrar no orçamento."],
      ["Quando revisar o orçamento?", "Regularmente, inclusive quando a renda mudar", "Nunca depois de criá-lo", "Só quando faltar dinheiro", "A revisão mantém o planejamento alinhado à sua realidade."],
      ["Uma sobra no mês permite…", "Planejar objetivos e uma reserva", "Garantir lucro em qualquer ativo", "Dispensar o orçamento", "A sobra pode apoiar metas, respeitando suas necessidades e obrigações."],
    ]) },
    { id: "gastos-v2", title: "Escolhas que cabem", emoji: "✂️", intro: "Distinguir necessidades de desejos ajuda a escolher. Reduzir desperdícios não significa abrir mão de tudo: significa fazer o dinheiro caber na sua vida.", questions: questions([
      ["Qual é uma necessidade básica?", "Alimentação", "Trocar um celular que funciona", "Assinar mais um streaming", "Necessidades básicas sustentam sua vida e merecem prioridade."],
      ["R$ 10 por dia, durante 30 dias, somam…", "R$ 300", "R$ 30", "R$ 100", "Pequenos gastos recorrentes crescem: 10 × 30 = 300."],
      ["Uma assinatura que você não usa deve ser…", "Reavaliada e possivelmente cancelada", "Mantida sem pensar", "Contada como investimento", "Cancelar serviços sem uso libera dinheiro sem perder algo importante."],
      ["Antes de comprar por impulso, vale…", "Esperar e avaliar a necessidade", "Comprar imediatamente", "Usar todo o limite do cartão", "Uma pausa ajuda a separar vontade momentânea de necessidade real."],
      ["Uma promoção vale a pena quando…", "A compra é necessária e cabe no orçamento", "Tem qualquer desconto", "Exige uma dívida que não cabe", "Desconto não transforma uma compra desnecessária em economia."],
      ["Para comparar produtos, observe…", "Preço total e qualidade", "Só o tamanho da parcela", "Apenas a propaganda", "Preço total e qualidade ajudam a avaliar o custo-benefício."],
      ["Qual atitude reduz desperdício?", "Planejar compras com uma lista", "Comprar tudo em promoção", "Ignorar o que já tem em casa", "A lista evita duplicidades e compras que não serão usadas."],
      ["Lazer deve ser…", "Planejado dentro do orçamento", "Sempre proibido", "Sempre pago com dívida", "Um orçamento sustentável pode reservar espaço para lazer."],
      ["Um corte de gastos sustentável é…", "Aquele que você consegue manter", "Eliminar alimentação básica", "Deixar de pagar contas essenciais", "Mudanças possíveis de manter são melhores que cortes prejudiciais."],
      ["Economizar R$ 50 por mês por 6 meses soma…", "R$ 300, sem considerar rendimentos", "R$ 600", "R$ 50", "A soma dos valores guardados é 50 × 6 = 300."],
    ]) },
    { id: "dividas-v2", title: "Entendendo os juros", emoji: "💳", intro: "Uma dívida pode custar mais do que o valor comprado. Juros, tarifas e prazo importam. O CET reúne os custos de uma operação de crédito.", questions: questions([
      ["O limite do cartão é…", "Crédito disponível, não renda extra", "Dinheiro gratuito", "Um salário adicional", "Usar o limite cria uma obrigação de pagamento."],
      ["Para evitar juros do rotativo, o ideal é…", "Pagar a fatura inteira no vencimento", "Pagar só o mínimo", "Ignorar o vencimento", "O pagamento integral no prazo evita financiar o saldo pelo rotativo."],
      ["Pagar só o mínimo geralmente…", "Deixa saldo sujeito a juros", "Quita toda a dívida", "Apaga as próximas parcelas", "A parte não paga pode entrar em uma modalidade de financiamento."],
      ["O que significa CET?", "Custo Efetivo Total", "Crédito Extra Temporário", "Conta Especial de Tesouro", "O CET reúne juros, tarifas, tributos e outros custos do crédito."],
      ["Ao comparar empréstimos, veja…", "CET e valor total a pagar", "Só a parcela mais baixa", "Só o nome do banco", "Uma parcela menor pode esconder um prazo longo e um custo total maior."],
      ["Se não conseguir pagar uma conta, é melhor…", "Buscar negociação e avaliar os custos", "Ignorar o credor", "Assumir qualquer nova dívida", "Negociar e comparar opções ajuda a buscar uma solução viável."],
      ["Uma dívida de R$ 100 com juros de 10% no período vira…", "R$ 110, sem outros custos", "R$ 101", "R$ 90", "Dez por cento de 100 é 10: 100 + 10 = 110."],
      ["Atrasos podem gerar…", "Multas e juros conforme o contrato", "Rendimento para você", "Desconto automático", "Leia o contrato: atraso costuma trazer encargos adicionais."],
      ["Antes de parcelar, confira…", "As parcelas futuras e o custo total", "Só se a primeira parcela cabe", "Apenas o limite disponível", "As parcelas comprometem os próximos meses do orçamento."],
      ["Qual é um hábito útil?", "Acompanhar vencimentos", "Esquecer a fatura", "Tratar crédito como renda", "Organizar datas e valores evita atrasos por falta de planejamento."],
    ]) },
  ] },
  { title: "Reserva de emergência", subtitle: "Uma base para os imprevistos", lessons: [
    { id: "reserva-v2", title: "Seu plano de proteção", emoji: "🛟", intro: "A reserva de emergência é dinheiro separado para situações inesperadas. Ela não elimina os imprevistos, mas ajuda você a lidar com eles.", questions: questions([
      ["Para que serve uma reserva de emergência?", "Para despesas inesperadas", "Para toda compra por impulso", "Para apostar", "A reserva ajuda em situações urgentes e não planejadas."],
      ["Qual situação pode justificar usar a reserva?", "Um reparo urgente e essencial", "Uma promoção de roupas", "Uma festa planejada", "Um reparo essencial inesperado é diferente de um desejo ou gasto previsível."],
      ["Uma viagem planejada deve ter…", "Uma meta separada", "Uso automático da reserva", "Pagamento sempre atrasado", "Metas previsíveis podem ser planejadas sem consumir a proteção de emergência."],
      ["A reserva ajuda a reduzir…", "A necessidade de crédito em imprevistos", "Todos os riscos da vida", "Todos os impostos", "Ter dinheiro disponível pode evitar empréstimos em situações urgentes."],
      ["Como começar uma reserva?", "Com valores que caibam no orçamento", "Só quando tiver muito dinheiro", "Com qualquer dívida cara", "É possível construir aos poucos, considerando renda, gastos e dívidas."],
      ["Depois de usar parte da reserva, vale…", "Planejar sua reposição", "Esquecer que ela existe", "Gastar todo o restante", "Repor o valor ajuda a recuperar a proteção para novos imprevistos."],
      ["Reserva e limite do cartão são…", "Coisas diferentes", "A mesma coisa", "Ambos dinheiro próprio guardado", "O limite é crédito; a reserva é dinheiro seu já separado."],
      ["Qual gasto é previsível?", "Uma matrícula anual conhecida", "Um reparo inesperado", "Uma emergência de saúde", "Despesas anuais conhecidas devem entrar no planejamento."],
      ["Ao definir uma reserva, considere…", "Sua realidade e responsabilidades", "Só o valor de um amigo", "Uma dica aleatória", "Renda, dependentes e estabilidade financeira mudam sua necessidade."],
      ["Ter uma reserva significa…", "Ter uma proteção financeira, não uma garantia absoluta", "Nunca mais enfrentar problemas", "Não precisar de orçamento", "A reserva é uma ferramenta de proteção; não substitui o planejamento."],
    ]) },
    { id: "meta-reserva-v2", title: "Um passo de cada vez", emoji: "📏", intro: "A meta da reserva depende das despesas essenciais e da estabilidade da renda. Usaremos seis meses apenas como exemplo de cálculo, não como regra para todas as pessoas.", questions: questions([
      ["Para calcular uma meta de reserva, comece pelas…", "Despesas essenciais mensais", "Compras que deseja fazer", "Dicas de desconhecidos", "As despesas essenciais mostram quanto você precisa para manter o básico."],
      ["R$ 2.000 mensais por 6 meses equivalem a…", "R$ 12.000", "R$ 2.600", "R$ 6.000", "Neste exemplo, 2.000 × 6 = 12.000."],
      ["Seis meses de despesas são…", "Um exemplo, não uma regra universal", "Obrigatórios para todos", "Sempre suficientes para qualquer pessoa", "O tamanho adequado varia conforme a situação de cada pessoa."],
      ["Uma renda instável pode exigir…", "Uma margem de proteção maior", "Nenhuma reserva", "Gastar a reserva mensalmente sem plano", "A variabilidade da renda aumenta a importância de avaliar a proteção necessária."],
      ["Guardar R$ 100 por mês por 12 meses soma…", "R$ 1.200, sem rendimentos", "R$ 120", "R$ 12.000", "Os aportes somam 100 × 12 = 1.200."],
      ["Se a meta parece distante, vale…", "Dividi-la em pequenas etapas", "Abandoná-la sempre", "Buscar retorno garantido e alto", "Etapas menores tornam o avanço mais concreto e administrável."],
      ["Se as despesas essenciais aumentarem, a meta…", "Deve ser reavaliada", "Nunca pode mudar", "Vira zero", "O planejamento deve acompanhar mudanças no custo de vida."],
      ["O valor mensal guardado deve…", "Respeitar o orçamento", "Ser igual ao de todos", "Exigir atrasar contas básicas", "Poupar não deve comprometer necessidades essenciais ou obrigações."],
      ["Uma boa forma de acompanhar a meta é…", "Registrar quanto já foi guardado", "Não olhar os valores", "Contar limite de crédito como reserva", "Registrar o progresso facilita ajustes e dá clareza sobre a meta."],
      ["Antes de investir, quem tem dívidas caras deve…", "Avaliar os custos das dívidas no planejamento", "Ignorá-las", "Presumir que todo investimento rende mais", "Juros de dívida podem superar rendimentos; a decisão exige avaliar a realidade."],
    ]) },
    { id: "liquidez-v2", title: "Dinheiro acessível", emoji: "🏦", intro: "Liquidez é a facilidade de transformar um investimento em dinheiro disponível. Para uma emergência, prazo de resgate, riscos e regras importam mais do que uma promessa de ganho alto.", questions: questions([
      ["O que é liquidez?", "Facilidade de acessar o dinheiro investido", "Lucro garantido", "Isenção de impostos", "Liquidez envolve a possibilidade e o prazo de resgatar os recursos."],
      ["Para uma emergência, o prazo de resgate deve ser…", "Compatível com uma necessidade urgente", "Sempre de dez anos", "Ignorado", "A reserva precisa poder ser acessada quando o imprevisto ocorrer."],
      ["Liquidez diária significa que…", "Há possibilidade de resgate conforme as regras", "O dinheiro chega a qualquer hora sem condições", "Não existem riscos", "Verifique horários, dias úteis e prazo de crédito; liquidez não elimina risco."],
      ["Antes de aplicar, leia…", "As condições e riscos do produto", "Só a manchete do anúncio", "Apenas a rentabilidade passada", "As regras mostram resgate, custos, riscos e condições da aplicação."],
      ["Renda fixa é sempre livre de risco?", "Não, há riscos a avaliar", "Sim, em todo caso", "Sim, se a taxa for alta", "Crédito, mercado e liquidez são exemplos de riscos possíveis."],
      ["Um produto que bloqueia saques por anos é…", "Pouco adequado para acesso urgente", "Sempre ideal para emergência", "Igual a dinheiro disponível", "Um prazo longo de bloqueio pode impedir o uso em um imprevisto."],
      ["O FGC cobre qualquer investimento?", "Não, apenas produtos elegíveis e nos limites", "Sim, inclusive todas as ações", "Sim, sem limite", "A cobertura depende do produto e tem limites regulamentares."],
      ["O limite usual do FGC por CPF e instituição ou conglomerado é…", "R$ 250 mil, sujeito às regras", "Ilimitado", "R$ 10 milhões", "Há também teto global de R$ 1 milhão em quatro anos e regras de elegibilidade."],
      ["FGC significa resgate imediato em uma quebra?", "Não, o pagamento segue um processo", "Sim, no mesmo segundo", "Sim, sem qualquer etapa", "A garantia não substitui liquidez: há procedimentos e prazo de pagamento."],
      ["Tesouro Selic e CDBs devem ser avaliados pelo…", "Prazo, regras, custos e riscos", "Nome apenas", "Maior promessa de lucro", "São exemplos educacionais; cada produto tem condições que devem ser verificadas."],
    ]) },
  ] },
  { title: "Primeiros conceitos de investimento", subtitle: "Conhecimento antes da decisão", lessons: [
    { id: "renda-fixa-v2", title: "Renda fixa sem mistério", emoji: "📈", intro: "Renda fixa tem regras de remuneração definidas na contratação, mas não é sinônimo de ausência de risco. Aprenda os conceitos antes de escolher qualquer produto.", questions: questions([
      ["Na renda fixa, o que é definido na contratação?", "A regra de remuneração", "Todo lucro futuro em reais", "Ausência de riscos", "A regra é conhecida; o valor final pode depender de índices e outros fatores."],
      ["Um título prefixado tem…", "Taxa contratada previamente", "Taxa sempre igual à inflação", "Preço de venda sempre constante", "A taxa é definida, mas venda antecipada pode ocorrer por outro preço."],
      ["Um investimento pós-fixado costuma acompanhar…", "Um indicador como o CDI", "Sempre o preço do ouro", "Um sorteio", "O rendimento acompanha um índice de referência conforme o contrato."],
      ["CDI é…", "Uma referência de juros do mercado", "Uma garantia de lucro", "Um tipo de ação", "O CDI é usado como referência em diversas aplicações pós-fixadas."],
      ["O CDB representa…", "Um empréstimo do investidor a um banco", "Uma participação acionária", "Uma doação", "Ao emitir CDB, o banco capta recursos e assume uma obrigação de pagamento."],
      ["Comprar um título do Tesouro significa…", "Emprestar ao governo federal", "Comprar uma ação de um banco", "Receber dinheiro sem obrigação", "Títulos públicos são instrumentos de dívida do governo federal."],
      ["Vender um título antes do vencimento pode…", "Gerar um valor diferente do esperado", "Garantir sempre lucro", "Eliminar impostos automaticamente", "O preço de mercado pode variar, especialmente em títulos de prazo maior."],
      ["Rentabilidade bruta é…", "O resultado antes de descontos e custos", "O valor líquido no bolso", "Uma promessa garantida", "Para comparar o resultado, considere impostos e custos aplicáveis."],
      ["Um retorno muito maior pode indicar…", "Riscos ou condições diferentes", "Sempre um produto melhor", "Ausência de risco", "Retorno não deve ser analisado sem risco, liquidez e condições."],
      ["Antes de uma recomendação real, é necessário…", "Avaliar a adequação ao perfil do investidor", "Só escolher a maior taxa", "Seguir um quiz educativo", "A avaliação regulada de perfil não pode ser substituída por esta atividade educativa."],
    ]) },
    { id: "diversificacao-v2", title: "Risco e diversificação", emoji: "🧺", intro: "Diversificar é distribuir exposições para reduzir concentração. Isso não garante lucro nem elimina perdas. Produtos diferentes podem estar expostos ao mesmo risco.", questions: questions([
      ["Diversificar significa…", "Distribuir exposições a riscos", "Concentrar tudo em um ativo", "Garantir ganho", "Diversificação busca reduzir a dependência de um único resultado."],
      ["Diversificação elimina todos os riscos?", "Não", "Sim, sempre", "Sim, com dois ativos", "Riscos gerais do mercado e outras perdas continuam possíveis."],
      ["Comprar muitos ativos parecidos pode…", "Manter uma concentração de risco", "Eliminar toda perda", "Garantir liquidez diária", "Quantidade não basta: é importante entender as exposições de cada ativo."],
      ["Risco de crédito é o risco de…", "O emissor não cumprir o pagamento", "A senha expirar", "A inflação cair", "É a possibilidade de inadimplência de quem deve pagar."],
      ["Risco de mercado envolve…", "Variações de preços e taxas", "Só esquecer o vencimento", "Somente fraude de senha", "Movimentos de mercado podem mudar o valor dos investimentos."],
      ["Risco de liquidez envolve…", "Dificuldade para vender ou resgatar", "Um aumento garantido do lucro", "Apenas pagar tributos", "Pode ser difícil acessar o dinheiro no prazo e preço desejados."],
      ["O prazo do objetivo deve…", "Ser considerado na escolha", "Ser sempre ignorado", "Ser igual para todos", "Um objetivo próximo pode exigir condições diferentes de um objetivo distante."],
      ["Rentabilidade passada…", "Não garante rentabilidade futura", "Garante o mesmo resultado", "Elimina a necessidade de avaliar risco", "O histórico informa, mas não assegura o que acontecerá depois."],
      ["Uma distribuição de ativos adequada depende…", "Do perfil, objetivos e condições individuais", "Só de uma regra da internet", "De uma aposta", "A decisão exige uma avaliação individual apropriada, não este jogo."],
      ["O objetivo desta fase é…", "Aprender conceitos, não receber uma carteira", "Definir sua alocação ideal", "Indicar um ativo obrigatório", "Este conteúdo é educativo e não é uma recomendação personalizada."],
    ]) },
    { id: "habitos-v2", title: "Constância e objetivos", emoji: "🏆", intro: "Metas claras e hábitos possíveis de manter apoiam o planejamento. No XP Journey, a proposta valoriza disciplina e recorrência, não sorte nem incentivo a assumir mais risco.", questions: questions([
      ["Uma meta financeira clara inclui…", "Objetivo, valor estimado e prazo", "Só uma vontade vaga", "Uma promessa de lucro", "Esses elementos ajudam a acompanhar e revisar o plano."],
      ["O aporte mensal deve…", "Caber na sua realidade financeira", "Ser o maior possível a qualquer custo", "Ser financiado por dívida cara sempre", "A constância deve respeitar necessidades e obrigações."],
      ["Juros compostos são juros sobre…", "O valor acumulado, incluindo juros anteriores", "Somente o valor inicial para sempre", "Apenas tarifas", "Quando os rendimentos são incorporados, eles também podem render."],
      ["R$ 100 rendendo 10% por período, por dois períodos, viram…", "R$ 121, no exemplo sem custos", "R$ 120", "R$ 110", "100 × 1,10 × 1,10 = 121. A taxa é só uma hipótese didática."],
      ["A inflação pode…", "Reduzir o poder de compra", "Garantir ganho real", "Aumentar todo salário automaticamente", "Se os preços sobem, o mesmo dinheiro pode comprar menos."],
      ["Automatizar um valor planejado pode…", "Ajudar a manter um hábito", "Garantir retorno", "Dispensar revisão do orçamento", "A automação pode ajudar, mas o valor precisa continuar adequado."],
      ["Se a renda cair, é importante…", "Reavaliar o plano e os aportes", "Manter o valor a qualquer custo", "Ignorar contas essenciais", "O planejamento precisa se adaptar às mudanças da vida."],
      ["Na proposta XP Journey, as recompensas se baseiam em…", "Critérios objetivos de disciplina e mérito", "Sorteios", "Assumir o máximo de risco", "A proposta não usa acaso nem incentiva risco excessivo."],
      ["Recompensa e rendimento do CDB são…", "Elementos separados", "A mesma coisa garantida", "Sempre um retorno fixo único", "Recompensas dependem de critérios; não devem ser confundidas com a remuneração do CDB."],
      ["Depois de concluir o mapa, o próximo passo é…", "Continuar aprendendo e avaliar seu planejamento", "Comprar um ativo sem avaliar o perfil", "Achar que não há mais riscos", "Aprender é contínuo; decisões reais exigem análise adequada e avaliação de perfil."],
    ]) },
  ] },
];
export const MAP_LESSONS = MAP_UNITS.flatMap((unit, unitIndex) => unit.lessons.map(lesson => ({ ...lesson, unitIndex })));