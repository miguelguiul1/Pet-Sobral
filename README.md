# Protótipo · site para pet shop de bairro

Um site de uma página para pet shop de banho e tosa, com agendamento que monta a mensagem e abre direto no WhatsApp.

**No ar:** https://pet-sobral.vercel.app

> Protótipo independente, feito por mim como estudo de design e de produto. Não é o site oficial de nenhum estabelecimento e não tem vínculo com nenhum negócio. Nomes, marcas e imagens de terceiros que aparecem na demonstração pertencem aos seus donos.

## O que o protótipo resolve

O dono de pet shop pequeno atende no balcão, dá banho e ainda responde WhatsApp. Cada agendamento vira uma conversa longa: qual serviço, porte do cachorro, que dia, que horário. O site faz essas perguntas antes:

- **Formulário de agendamento** que junta serviço, porte, dia e horário numa mensagem pronta para o WhatsApp.
- **"Aberto agora"** calculado pelo horário de funcionamento, com testes cobrindo fuso horário e virada de dia.
- **Serviços, dúvidas frequentes e localização** numa página que carrega rápido no celular.
- **Modo revisão** (`?revisao=1`): destaca tudo o que ainda precisa ser confirmado antes de publicar de verdade.
- **SEO pronto para produção:** HTML pré-renderizado, JSON-LD, sitemap e `robots.txt`, com indexação bloqueada enquanto for protótipo.

## Tecnologias

React, TypeScript, Vite, Tailwind CSS, shadcn/ui. Testes com Vitest e Playwright (fluxo de agendamento, breakpoints e acessibilidade). Sem backend. Deploy na Vercel.

## Rodando localmente

```bash
git clone https://github.com/miguelguiul1/Pet-Sobral.git
cd Pet-Sobral
npm install
npm run dev          # http://localhost:5173
```

| Comando | O que faz |
|---|---|
| `npm run build` | Build de produção com HTML pré-renderizado, JSON-LD, sitemap e robots.txt |
| `npm run preview` | Serve o build em http://localhost:4173 |
| `npm test` | Testes unitários (horário e mensagem do WhatsApp) |
| `npm run test:e2e` | Testes Playwright |
| `npm run imagens` | Baixa as fotos ilustrativas do Unsplash e gera os créditos |
| `npm run contraste` | Confere o contraste WCAG da paleta |

As variáveis de ambiente estão descritas em `.env.example`.

## Licença

O código está sob a licença [MIT](LICENSE). A licença não cobre marcas, logos, fotos nem textos de terceiros.
