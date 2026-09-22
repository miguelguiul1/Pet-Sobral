# Pet Sobral: protótipo de site

Site one-page para o **Pet Sobral**, pet shop de bairro no Socorro (zona sul de São Paulo).
React + TypeScript + Vite + Tailwind CSS + shadcn/ui, sem backend. O agendamento monta a mensagem e abre o WhatsApp.

- Regras, dados do cliente e checklist: [`CLAUDE.md`](CLAUDE.md)
- O que falta confirmar com o dono: [`PLACEHOLDERS.md`](PLACEHOLDERS.md)
- Copy completa: [`docs/copy.md`](docs/copy.md) · Direções visuais: [`docs/direcoes-visuais.html`](docs/direcoes-visuais.html)

## Baixar as fotos ilustrativas (Windows / PowerShell)

As fotos do Unsplash não puderam ser baixadas no ambiente onde o site foi montado. Rode uma vez na sua máquina
(requer Node 20 ou mais novo e Git):

```powershell
cd $HOME\Documents\GitHub
git clone https://github.com/miguelguiul1/pet-sobral.git   # só na primeira vez
cd pet-sobral
git fetch origin
git checkout claude/pet-sobral-prototype-p2kz1m
git pull
npm install
npm run imagens
```

Confira o resultado antes de subir:

```powershell
start public\images\_previa.html      # abre a prévia das fotos no navegador
Get-Content public\images\CREDITOS.md  # autor e link de cada foto
```

Se alguma foto não combinar, troque a URL em `scripts\fotos.config.mjs` e rode `npm run imagens` de novo.
Se o script avisar "Sem foto" para algum item, a URL não está mais disponível no Unsplash: troque por outra.

Atualize a imagem de compartilhamento (WhatsApp/redes) com a foto nova:

```powershell
npx playwright install chromium   # só na primeira vez
npm run og
```

Suba tudo:

```powershell
git add public/images public/og-image.jpg
git commit -m "feat: fotos ilustrativas do Unsplash com créditos"
git push origin claude/pet-sobral-prototype-p2kz1m
```

## Modo revisão

- `http://localhost:5173/` (ou o link da Vercel): site limpo, sem nenhuma marca `[CONFIRMAR]`.
- `.../?revisao=1`: mostra todos os itens pendentes destacados, para passar com o dono. Lista completa em `PLACEHOLDERS.md`.

## Dados do Google Maps

O link direto das avaliações e as coordenadas da loja ficam em `src/data/google-maps.ts` (lugar único).

## Comandos do dia a dia

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor local em http://localhost:5173 |
| `npm run build` | Build de produção com HTML pré-renderizado, JSON-LD, robots.txt e sitemap.xml |
| `npm run preview` | Serve o build em http://localhost:4173 |
| `npm test` | Testes unitários (horário "Aberto agora", mensagem do WhatsApp) |
| `npm run test:e2e` | Testes Playwright (agendamento → WhatsApp, breakpoints, acessibilidade) |
| `npm run imagens` | Baixa as fotos ilustrativas e gera `CREDITOS.md` |
| `npm run og` | Gera `public/og-image.jpg` |
| `npm run contraste` | Confere o contraste WCAG da paleta |

## Indexação (preview × produção)

Enquanto o dono não aprovar, o site **não deve aparecer no Google**. O bloqueio está em três lugares:

1. `vercel.json`: header `X-Robots-Tag: noindex, nofollow`
2. `<meta name="robots" content="noindex, nofollow">`, gerado no build quando `VITE_SITE_INDEXAVEL` não é `true`
3. `robots.txt` com `Disallow: /`, gerado no build pela mesma variável

Para liberar depois da aprovação: `VITE_SITE_INDEXAVEL=true`, remova o header do `vercel.json`, ajuste
`VITE_SITE_URL` para o domínio final e faça novo deploy.

## Deploy na Vercel

Projeto `pet-sobral-preview`, importado do GitHub apontando para a branch `main`. Nenhuma configuração extra:
`vercel.json` já define build (`npm run build`) e saída (`dist`).
