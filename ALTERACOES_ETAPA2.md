# XP Journey — etapa 2

## Como rodar

Na pasta que contém `package.json`:

```sh
npm install
npm run dev
```

Também é possível executar `bun install` e `bun run dev`.

## Arquivos alterados

- `src/styles.css`: foco e redução de movimento.
- `public/xp-journey-mark.png`: símbolo enviado pelo usuário, armazenado localmente.
- `src/components/SiteNav.tsx`: marca e título locais, incluindo rodapé.
- `src/components/LiveBusinessDashboard.tsx`: painel dinâmico de cenários financeiros.
- `src/components/MarketOpportunity.tsx`: visualização da tese de oportunidade com fontes.
- `src/lib/academy-checks.ts`: perguntas e respostas de verificação para cada aula.
- `src/routes/index.tsx`: remoção da importação do antigo logo remoto.
- `src/routes/projeto.tsx`: inclusão do dashboard e da oportunidade de mercado, mantendo o relatório original e o ProductTerms.
- `src/routes/academy.tsx`: conclusão verificada por resposta correta, com chaves versionadas `verified-v2-*` e pontuação concedida uma única vez.
- `src/routes/journey.tsx`: missão Fundamentos depende da verificação Academy; missões de aporte permanecem demonstrativas.

## Notas de integridade

- O painel de cenários calcula margens em uma aproximação por coortes, derivada das premissas do relatório. A DRE e série EBIT oficiais continuam na página.
- Não foi alterado o `.env`, nem os hooks `useProgress` e `useMapProgress`, nem os arquivos de integração/servidor.
- Nenhum evento de depósito real é confirmado; os demais check-ins financeiros são simulações.
- Taxas e retornos são hipóteses, não promessas; recompensas permanecem separadas do CDB.
- A verificação Academy testa uma pergunta conceitual por aula. Não equivale a concluir conteúdo pedagógico integral nem verificação financeira.
- Não foi possível completar um `npm run build` neste ambiente porque a instalação demorou além do limite de execução.
