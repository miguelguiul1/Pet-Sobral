---
name: prototipo-negocio-local
description: Processo completo para criar um protótipo de site de alto nível para um negócio local real que ainda não tem site (pet shop, salão, barbearia, confeitaria, oficina, clínica…) com o objetivo de vendê-lo ao dono. Use quando o usuário pedir um site/landing page/protótipo para um negócio de bairro, lead de venda de site, ou mencionar "prototipo-negocio-local".
---

# Protótipo de site para negócio local (para vender ao dono)

O objetivo não é "fazer um site", é **fechar a venda**. O dono precisa abrir o link no celular e pensar "esse é o meu negócio, e ficou melhor do que eu imaginava". Isso exige três coisas ao mesmo tempo: dados reais corretos, visual que não pareça template e um fluxo que gere cliente (WhatsApp).

## Princípios

1. **Nunca invente dados.** Tudo que não veio de fonte verificável (Google Maps, fachada, Instagram oficial, o próprio dono) vira `[CONFIRMAR COM O CLIENTE]` e entra no `PLACEHOLDERS.md`. Um preço inventado que o dono vê no protótipo destrói a confiança na hora.
2. **Depoimentos nunca são fictícios com nome.** Use cards placeholder marcados para troca por avaliações reais do Google.
3. **Mobile first de verdade.** O público de negócio local chega pelo celular, via Google Maps ou WhatsApp, e quer resolver uma coisa: preço, horário, agendar, como chegar.
4. **WhatsApp é o backend.** Sem servidor: formulários montam uma mensagem formatada e abrem `wa.me/55DDDNUMERO?text=…`.
5. **Uma fonte de dados.** Nome, telefone, endereço, horário e nota ficam em um único arquivo (`src/data/business.ts`) consumido por UI, JSON-LD e meta tags.
6. **Pare nos checkpoints.** Mostre o plano (Fase 0) e as direções visuais (Fase 1) antes de implementar.

## Fase 0 — Preparação

1. Coletar dados reais: nome, endereço, telefone/WhatsApp, horário, nota e nº de avaliações no Google, o que os clientes elogiam (ler as avaliações), serviços reais, diferenciais verificáveis (ex.: atende condomínios, ponto de coleta).
2. Mapear agentes disponíveis (`~/.claude/agents`, `.claude/agents`) para papéis. Com o catálogo Agency Agents, o mapeamento padrão é:

| Papel | Agente |
|---|---|
| Pesquisa de UX | UX Researcher (+ Persona Walkthrough Specialist) |
| Arquitetura de UX | UX Architect |
| UI / visual | UI Designer |
| Marca / tom / logo provisório | Brand Guardian |
| Copy | Content Creator |
| SEO local | SEO Specialist |
| Frontend | Frontend Developer |
| Acessibilidade | Accessibility Auditor |
| Performance | Performance Benchmarker |
| QA com evidência | Evidence Collector |
| Revisão brutal | Reality Checker |
| Polimento final | UI Finish-Gate Reviewer |
| Microinterações | Whimsy Injector |
| Kit de venda | Proposal Strategist |

   Use só nomes que existem de fato. Se o agente não estiver registrado na sessão, use um agente genérico passando o conteúdo do `.md` do agente como instrução.
3. Verificar ferramentas: skill frontend-design (se houver), Playwright (+ navegador), Lighthouse.
4. Criar `CLAUDE.md` no projeto: dados do cliente, regras, stack, padrões de código, checklist.
5. **PARAR** e mostrar tabela de agentes + plano.

## Fase 1 — Estratégia e direção visual

- Definir público, tarefa principal (o "job" do visitante) e proposta de valor em uma frase, baseada no que as avaliações reais elogiam.
- Propor **2 direções visuais realmente diferentes**, cada uma com: paleta (com contraste verificado), par tipográfico, estilo de ícones/ilustração, tratamento de fotos, tom de voz com 2–3 exemplos de frase, e justificativa ligada ao público e ao bairro.
- Evitar clichês do segmento (pet: azul+laranja com patinhas; barbearia: preto+dourado com bigode; confeitaria: rosa bebê com cupcake; salão: rosé gold). Um elemento temático bem usado vale mais que dez espalhados.
- Logo tipográfico **provisório**, marcado como tal.
- **PARAR** e deixar o usuário escolher.

## Fase 2 — Conteúdo e estrutura

Copy em pt-BR, calorosa, clara, com referência natural ao bairro/região. Estrutura base (adapte ao segmento):

1. **Hero** — headline com a proposta de valor, prova social real (nota do Google) em destaque, CTA principal (WhatsApp com mensagem pronta) + CTA secundário (âncora para serviços).
2. **Serviços** — cards com preço placeholder "a partir de R$ [CONFIRMAR]" e selo do diferencial (ex.: "preço justo").
3. **Agendamento / pedido** — formulário com validação acessível → mensagem formatada → `wa.me`.
4. **Por que nós** — diferenciais extraídos das avaliações (sem superlativos inventados).
5. **Canal de receita recorrente** — seção dedicada quando existir (condomínios, empresas, encomendas para eventos, planos mensais, pacotes).
6. **Depoimentos** — 3 placeholders + link "Ver todas as avaliações no Google".
7. **FAQ** — accordion; respostas incertas marcadas como placeholder.
8. **Localização** — mapa embutido (iframe lazy), horário com "Aberto agora/Fechado" calculado no fuso do negócio, botão "Como chegar".
9. **Rodapé** — contato, horário, extras (ponto de coleta etc.).
10. **Botão flutuante de WhatsApp** em todas as telas.

Toda imagem é placeholder livre (Unsplash) salva em `public/images/` com nome descritivo e comentário de troca. Tudo que falta vai para `PLACEHOLDERS.md`.

## Fase 3 — Implementação e qualidade

**Stack:** React + TypeScript + Vite + Tailwind + shadcn/ui, sem backend, HTML pré-renderizado no build.

- Mobile-first, validado em 360, 390, 768 e 1440px.
- Lógica em funções puras testadas: `buildWhatsAppUrl()`, `getOpenStatus(now)` (fuso fixo via `Intl.DateTimeFormat`, com testes nas bordas de horário).
- **SEO local:** title/meta com "[segmento] [bairro] [cidade]" e o serviço principal + bairro; canonical; Open Graph 1200×630; favicon; JSON-LD do tipo mais específico do schema.org (`PetStore`, `HairSalon`, `BarberShop`, `Bakery`, `AutoRepair`…) com `address`, `geo`, `telephone`, `openingHoursSpecification`, `aggregateRating`, `priceRange` (placeholder se incerto); `sitemap.xml`; `robots.txt`.
- **Acessibilidade WCAG 2.2 AA:** contraste, labels, erros com `aria-describedby`, foco visível, skip link, teclado, `alt`, `prefers-reduced-motion`.
- **Performance:** WebP com dimensões explícitas, lazy abaixo da dobra, `fetchpriority="high"` no hero, fontes `display=swap` com preload, mapa carregado sob demanda. Meta: Lighthouse mobile ≥ 95 nas 4 categorias.
- **Microinterações** sutis e temáticas, só `transform`/`opacity`, desligadas em reduced motion.
- Commits separados por etapa.

## Fase 4 — Revisão brutal

1. Playwright: fluxo completo do formulário (validação → URL wa.me com texto exato), screenshots nos 4 breakpoints, ausência de scroll horizontal, teclado.
2. axe-core + Accessibility Auditor.
3. Lighthouse mobile (3 execuções, mediana).
4. Reality Checker com as evidências (default "NEEDS WORK").
5. UI Finish-Gate Reviewer: o que ainda parece template/genérico.
6. Entregar ao usuário uma **lista honesta** do que ainda está fraco, em ordem de impacto.

## Fase 5 — Kit de venda

- `PLACEHOLDERS.md` como roteiro da conversa com o dono (o que confirmar, fotos para tirar).
- `PROPOSTA.md`: problema (clientes procuram no Google/Maps e não acham site), o que o site resolve, pacote/preço/manutenção `[DEFINIR]`, próximos passos.
- Screenshots mobile e desktop + link de preview (Vercel/Netlify) para mandar pelo WhatsApp.
- Roteiro de abordagem curto (mensagem inicial + como apresentar o protótipo no celular do dono).
- Lista de fotos reais a produzir (fachada, equipe, antes/depois, ambiente).

## Checklist final

- [ ] Zero dados inventados; PLACEHOLDERS.md completo
- [ ] Telefone/endereço/horário consistentes (fonte única)
- [ ] Formulário → WhatsApp testado com Playwright
- [ ] "Aberto agora" correto nas bordas, no fuso do negócio
- [ ] 360/390/768/1440 sem quebra nem scroll horizontal
- [ ] JSON-LD válido, sitemap, robots, OG, favicon
- [ ] axe sem violações; teclado ok; reduced motion ok
- [ ] Lighthouse mobile ≥ 95 ×4
- [ ] Nada com cara de template (Finish-Gate aprovado)
- [ ] Kit de venda pronto
