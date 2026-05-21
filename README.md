Projeto pronto para hospedagem estática

O repositório foi reorganizado para facilitar deploy em um host estático (Netlify, Vercel, GitHub Pages, etc.). Alterações realizadas:

- `index.html` permanece na raiz.
- `styles.css` movido para `css/styles.css`.
- `script.js` movido para `js/script.js`.

Observações / próximos passos opcionais:
 - O arquivo `fundo.jpg` e os SVGs estão em `assets/`.

Se quiser, eu também posso gerar um `404.html` simples para deploys estáticos.

Como hospedar rapidamente (ex.: GitHub Pages):
1. Crie um repositório no GitHub e faça commit/ push do conteúdo.
2. Ative GitHub Pages em `Settings > Pages` apontando para a branch `main` (ou `gh-pages`).

Para deploy em Netlify ou Vercel, basta apontar o diretório do projeto (raiz) — não há build step.

Se quiser, faço também:
- Mover `fundo.jpg` e SVGs para `assets/` e atualizar os caminhos automaticamente.
- Gerar um `404.html` simples.

Diga qual opção prefere e eu sigo com os próximos passos.