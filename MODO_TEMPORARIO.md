# Progresso temporário no navegador

Nesta versão, `useProgress`, `useMapProgress` e as estrelas de `/mapa` usam `sessionStorage` em vez de `localStorage`.

- Atualizar a página dentro da mesma aba mantém o progresso.
- Fechar a aba e abrir uma nova começa com o progresso padrão (incluindo os 180 XP iniciais demonstrativos definidos no código).
- Fechar e restaurar uma sessão do navegador pode preservar `sessionStorage` em alguns navegadores; para um reset garantido em apresentações, use uma nova aba/janela sem restauração da sessão.
- Não alteramos integração Supabase nem persistência de autenticação; a mudança diz respeito ao progresso da demonstração.
- Dados antigos no `localStorage` deixam de ser lidos pela aplicação, mas não são apagados.

## Como abrir

`npm install` e `npm run dev` na pasta com o `package.json`.
