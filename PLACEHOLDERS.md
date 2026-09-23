# Placeholders: o que confirmar com o Pet Sobral

O site tem **dois modos**:

- **Padrão** (`/`): nenhuma marca `[CONFIRMAR]` aparece. Onde falta dado, entra um texto neutro e verdadeiro ou o trecho fica oculto.
  Um teste E2E (`tests/placeholders.spec.ts`) garante isso no HTML servido e na página renderizada.
- **Revisão** (`/?revisao=1`): todas as marcas aparecem com fundo listrado amarelo e uma faixa no topo avisa o modo.
  Use na conversa com o dono para passar item por item.

Para achar no código: pesquise por `CONFIRMAR`, `SUBSTITUIR`, `neutro=` ou `SoNaRevisao`.

## Dados do negócio (com o dono)

| # | O que confirmar | Onde | No modo padrão aparece | Arquivo |
|---|---|---|---|---|
| 1 | **Se o dono quer os preços publicados no site**; se sim, preço "a partir de" do **banho** | Card Banho | "Valor pelo WhatsApp" | `sections/Servicos.tsx` |
| 2 | Preço "a partir de" da **tosa** | Card Tosa | "Valor pelo WhatsApp" | idem |
| 3 | Preço "a partir de" do **banho + tosa** | Card Banho + tosa | "Valor pelo WhatsApp" | idem |
| 4 | Texto de introdução com preços | Intro de Serviços | "Tudo num lugar só, pertinho de casa. O valor para o seu pet a gente passa pelo WhatsApp." | idem |
| 5 | O preço varia por porte/pelagem? Faixas? | Nota abaixo dos cards | **Oculto** | idem |
| 6 | Preços (FAQ "Quanto custa?") | FAQ | "O valor depende do serviço escolhido. Pergunte pelo WhatsApp e a gente passa o valor para o seu pet." | `sections/Duvidas.tsx` |
| 7 | Atende **gatos**? Em quais serviços? | Dica no formulário; FAQ | Dica **oculta**; pergunta do FAQ **oculta**. A opção "Gato" continua no formulário (campo espécie do briefing) | `sections/Agendamento.tsx`, `sections/Duvidas.tsx` |
| 8 | Critério de **porte** (P/M/G) | Dica no formulário | "Na dúvida, escolha o mais próximo." | `sections/Agendamento.tsx` |
| 9 | Funcionamento em **feriados** ("Aberto agora" ignora feriados) | FAQ | "Na dúvida, chama a gente no WhatsApp (11) 97696-4074 antes de vir." | `sections/Duvidas.tsx`, `lib/opening-hours.ts` |
| 10 | Atende **sem agendamento**? | FAQ "Preciso agendar?" | "Recomendamos agendar pelo site ou pelo WhatsApp pra garantir seu horário." | `sections/Duvidas.tsx` |
| 11 | **Tempo médio** de cada serviço | FAQ | "Se precisar de uma previsão pro seu pet, pergunte no WhatsApp ao agendar." | idem |
| 12 | **Formas de pagamento** | FAQ | Pergunta **oculta** | idem |
| 13 | **Condomínios**: como funciona, raio/bairros, frequência, busca e leva, condição especial | Seção Condomínios, bloco "Como funciona" | "Para saber como funciona o atendimento no seu condomínio, fale com a gente pelo WhatsApp." | `sections/Condominios.tsx` |
| 14 | **Instagram** / redes sociais | Rodapé | **Oculto** | `sections/Rodape.tsx` |
| 15 | **CNPJ / razão social** | Rodapé | **Oculto** (fica "© 2026 Pet Sobral.") | idem |
| 16 | **Domínio** definitivo. O logo traz `www.petsobral.com.br`: confirmar se o domínio é do dono e se está ativo | canonical, og:url, sitemap | `pet-sobral-preview.vercel.app` (a URL do logo foi omitida no site) | `.env` (`VITE_SITE_URL`) |
| 17 | **Logo vetorizado a partir de JPG cortado; L reconstruído; substituir pelo arquivo original do dono** (vetor: PDF/SVG/AI/EPS, ou PNG em alta resolução). O pé do "L" final foi completado com a mesma espessura e o mesmo comprimento do braço inferior do "E" (comparação em `docs/marca/comparacao-L-3x.png`) | Cabeçalho, rodapé, favicon, OG, rótulos das seções | Logo real vetorizado | `public/marca/`, `public/favicon.svg`, `src/assets/marca/`, `components/Logo.tsx` |
| 18 | **Autorização do dono para usar a marca** (logo, cachorro em traço e cores) no site | Todo o site | Marca usada no protótipo de apresentação | — |

## Dados do Google Maps (coletados no Maps, não precisam do dono)

Colar em **`src/data/google-maps.ts`** (lugar único):

| # | O que | Enquanto vazio |
|---|---|---|
| 19 | `linkAvaliacoes`: link direto das avaliações | Link de busca no Google que mostra a ficha da loja |
| 20 | `coordenadas`: `{ lat, lng }` da loja | JSON-LD sai sem `geo` |

## Conteúdo a coletar

| # | O que | No modo padrão aparece | Arquivo |
|---|---|---|---|
| 21 | 3 **avaliações reais do Google**, com **autorização do dono** para citar e exibindo **só o primeiro nome** do autor | Título "O que mais aparece nas avaliações" + 3 cards com os temas reais dos elogios (atendimento atencioso; equipe carinhosa com os animais; preço justo no banho e tosa), sem citação | `sections/Depoimentos.tsx` |
| 22 | **Fotos reais** (substituem as ilustrativas) | Fotos ilustrativas do Unsplash | `public/images/`, `data/imagens.ts` |
| 23 | Textos `alt`: revisar depois de `npm run imagens` e de novo com as fotos reais | — | `data/imagens.ts` |

## Antes de publicar de verdade (depois da aprovação)

- Liberar indexação: `VITE_SITE_INDEXAVEL=true` (no `.env` ou nas variáveis da Vercel), remover o header `X-Robots-Tag` do `vercel.json` e fazer novo deploy (o `robots.txt` é gerado no build).
- Rodar `npm run og` para a imagem de compartilhamento usar a foto final.
- Adicionar o site ao Perfil da Empresa no Google.
