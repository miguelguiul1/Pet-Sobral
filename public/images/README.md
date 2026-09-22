# Imagens do site

**Todas as fotos atuais são ILUSTRATIVAS** (Unsplash, ou placeholders gerados localmente).
Na versão final serão trocadas por fotos reais do Pet Sobral. Créditos em `CREDITOS.md`.

| Arquivo(s) | Onde aparece | Proporção | Foto real sugerida |
|---|---|---|---|
| `hero-cachorro-pos-banho-{480,760,1120}.webp` | Topo do site (arco) | 4:5 retrato | Pet atendido na loja, limpinho, olhando pra câmera |
| `servico-banho-{400,800}.webp` | Card Banho | 4:3 paisagem | Banho em andamento ou secagem na toalha |
| `servico-tosa-{400,800}.webp` | Card Tosa | 4:3 paisagem | Tosa em andamento (mãos da equipe + pet) |
| `servico-banho-e-tosa-{400,800}.webp` | Card Banho + tosa | 4:3 paisagem | Antes/depois ou pet pronto com lacinho/bandana |
| `servico-produtos-{400,800}.webp` | Card Rações/produtos | 4:3 paisagem | Prateleiras da loja |
| `porque-carinho-{480,900}.webp` | "Por que o Pet Sobral" (arco) | 4:5 retrato | Alguém da equipe com um pet no colo |
| `condominios-passeio-{480,960}.webp` | Condomínios | 5:4 paisagem | Fachada da loja ou pet do bairro |

## Como trocar por uma foto real

1. Salve a foto em alta (celular serve, luz natural, sem flash).
2. Em `scripts/fotos.config.mjs`, a lista de candidatas aceita só URLs do Unsplash. Para fotos próprias, o jeito mais simples é
   exportar cada tamanho com o **mesmo nome** acima (WebP, mesma proporção) e substituir o arquivo.
3. Atualize o texto `alt` em `src/data/imagens.ts`.
4. Rode `npm run og` para atualizar a imagem de compartilhamento.
