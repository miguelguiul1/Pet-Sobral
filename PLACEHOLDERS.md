# Placeholders: o que confirmar com o Pet Sobral

Tudo aqui aparece no site marcado como `[CONFIRMAR COM O CLIENTE]` (ou `[SUBSTITUIR]`), com fundo listrado amarelo.
Nada disso foi inventado: são lacunas que só o dono pode preencher.
Para achar no código: pesquise por `CONFIRMAR` ou `SUBSTITUIR`.

## Dados do negócio

| # | O que confirmar | Onde aparece | Arquivo |
|---|---|---|---|
| 1 | Preço "a partir de" do **banho** | Serviços, FAQ "Quanto custa?" | `sections/Servicos.tsx`, `sections/Duvidas.tsx` |
| 2 | Preço "a partir de" da **tosa** | Serviços, FAQ | idem |
| 3 | Preço "a partir de" do **banho + tosa** | Serviços, FAQ | idem |
| 4 | O preço varia por porte/pelagem? Quais faixas? | Nota abaixo dos serviços, FAQ | idem |
| 5 | Atende **gatos**? Em quais serviços? | Agendamento (opção Gato), FAQ | `sections/Agendamento.tsx`, `sections/Duvidas.tsx` |
| 6 | Critério de **porte** (P/M/G, ex.: faixas de peso) | Agendamento | `sections/Agendamento.tsx` |
| 7 | Funcionamento em **feriados** (hoje o "Aberto agora" ignora feriados) | FAQ, status de horário | `sections/Duvidas.tsx`, `lib/opening-hours.ts` |
| 8 | Atende **sem agendamento** / por ordem de chegada? | FAQ | `sections/Duvidas.tsx` |
| 9 | **Tempo médio** de banho, tosa e banho + tosa | FAQ | `sections/Duvidas.tsx` |
| 10 | **Formas de pagamento** | FAQ | `sections/Duvidas.tsx` |
| 11 | **Condomínios**: como funciona, quais condomínios/bairros (raio), frequência, busca e leva, condição especial | Seção Condomínios | `sections/Condominios.tsx` |
| 12 | **Instagram** / redes sociais (se não tiver, remover o bloco) | Rodapé | `sections/Rodape.tsx`, `data/business.ts` |
| 13 | **CNPJ / razão social** (se quiser exibir) | Rodapé | `sections/Rodape.tsx` |
| 14 | **Coordenadas** exatas da loja (lat/long do Google Maps). Sem elas, o JSON-LD sai sem `geo` | JSON-LD | `data/business.ts` (`geo`) |
| 15 | **Link direto das avaliações** no Google (Perfil da Empresa / Place ID). Hoje é um link de busca | Hero, Depoimentos | `data/business.ts` (`google.urlAvaliacoes`) |
| 16 | **Domínio** definitivo (ex.: petsobral.com.br) | canonical, og:url, sitemap | `.env` (`VITE_SITE_URL`) |

## Conteúdo a coletar

| # | O que | Onde | Arquivo |
|---|---|---|---|
| 17 | 3 **avaliações reais do Google** (temas: atendimento atencioso; equipe carinhosa; preço justo no banho e tosa) + nome do autor, **com autorização** | Depoimentos | `sections/Depoimentos.tsx` |
| 18 | **Fotos reais** (substituem as ilustrativas do Unsplash). Lista em `public/images/README.md` | Todo o site | `public/images/`, `data/imagens.ts` |
| 19 | Textos `alt` das fotos: revisar depois de rodar `npm run imagens` e de novo com as fotos reais | Todo o site | `data/imagens.ts` |
| 20 | **Logo** oficial, se existir. O atual é tipográfico e **provisório** | Cabeçalho, rodapé, favicon, OG | `components/Logo.tsx`, `public/favicon.svg`, `scripts/og/og.html` |

## Antes de publicar de verdade (depois da aprovação)

- Liberar indexação: `VITE_SITE_INDEXAVEL=true` no `.env` (ou nas variáveis da Vercel), remover o header `X-Robots-Tag` do `vercel.json` e fazer novo deploy (o `robots.txt` é gerado no build).
- Rodar `npm run og` para a imagem de compartilhamento usar a foto final.
- Adicionar o site ao Perfil da Empresa no Google.
