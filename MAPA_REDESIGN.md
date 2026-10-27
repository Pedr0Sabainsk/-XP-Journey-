# XP Journey — Mapa Adventure

Redesign da rota `/mapa` inspirado na clareza de progressão do Duolingo e no relevo de botões de jogos de fases, com identidade própria XP.

- 3 mundos com paletas distintas: azul, verde e roxo, mantendo amarelo XP nos destaques.
- Trilha curva SVG conectando checkpoints, estados de fase concluída, atual ou bloqueada.
- Nível e estrelas no cabeçalho; conquistas de mundo com celebração.
- As **nove perguntas originais** foram mantidas e movidas para `src/lib/map-worlds.ts`, sem mudança nos enunciados ou gabaritos.
- O identificador de sessão `xp-mapa-progresso` foi preservado; o progresso é temporário (`sessionStorage`).
- Estrelas têm valor **somente educacional**; sem recompensa financeira, sorteio ou caixa surpresa.
- Animações respeitam `prefers-reduced-motion`.

## Teste local

```bash
npm install
npm run dev
```

Abrir `/mapa` e concluir as nove perguntas; testar em viewport mobile e com a preferência de movimento reduzido.

Compilação completa não confirmada neste ambiente; a sintaxe TSX/TS foi validada.
