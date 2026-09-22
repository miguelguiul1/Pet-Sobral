# Pet Sobral — protótipo de site

Protótipo de site para **vender** ao dono do Pet Sobral, pet shop de bairro no Socorro (zona sul de SP) que hoje não tem site. O padrão de qualidade é de agência profissional: nada com cara de template.

## Dados do cliente (fonte da verdade — use exatamente assim)

| Campo | Valor |
|---|---|
| Nome | Pet Sobral |
| Endereço | R. Olívia Guedes Penteado, 517 - Socorro, São Paulo - SP, 04766-001 |
| Telefone / WhatsApp | (11) 97696-4074 → `wa.me/5511976964074` |
| Horário | Seg–sex 9h–19h · Sáb 9h–16h30 · Dom fechado |
| Google | 4.8 ★ · 150 avaliações |
| Elogios recorrentes | atendimento atencioso; equipe carinhosa com os animais; preço justo no banho e tosa (abaixo da concorrência da região); produtos de qualidade; bom horário |
| Extras | atende condomínios da região; ponto de devolução do Mercado Livre |

Esses dados vivem em **um único arquivo** (`src/data/business.ts`). Componentes, JSON-LD, meta tags e rodapé leem dali. Nunca repita telefone ou endereço hardcoded em outro lugar.

## Regras inegociáveis

1. **Não invente dados.** Preços, nomes de funcionários, tempo de mercado, redes sociais, CNPJ, formas de pagamento, raças atendidas, coordenadas exatas: tudo que não está na tabela acima vira `[CONFIRMAR COM O CLIENTE]` e entra no `PLACEHOLDERS.md`.
2. **Depoimentos:** 3 cards com texto placeholder claramente marcado para troca por avaliações reais do Google. Nunca escreva depoimentos fictícios atribuídos a pessoas com nome.
3. **Imagens:** placeholders do Unsplash (licença livre), salvos localmente em `public/images/` com nomes descritivos (`hero-cachorro-banho.webp`, `servico-tosa.webp`…) e um comentário `{/* TROCAR: foto real de … */}` no ponto de uso. O inventário fica em `public/images/README.md`.
4. **Logo** é tipográfico e **provisório**, marcado assim no código e no PLACEHOLDERS.md.
5. **Commits separados por etapa**, mensagens claras em português (`feat: seção de agendamento com envio via WhatsApp`).
6. Toda afirmação de marketing precisa ter base nos dados reais (ex.: "preço justo" vem das avaliações; "4.8 no Google" é real). Nada de "o melhor de SP", "desde 19XX", "+ de 5 mil pets atendidos".
7. O selo diz **"Preço justo no banho e tosa"**, sempre atribuído aos clientes. Nunca "mais barato", "menor preço" ou comparação com concorrentes; a frase "nenhum concorrente da região faz isso" não entra no site nem no kit de venda.
8. Condomínios e Mercado Livre: só o que está no briefing ("atende condomínios da região", "ponto de devolução do Mercado Livre"). Como funciona, raio, frequência, descontos etc. = `[CONFIRMAR COM O CLIENTE]`.
9. Feriados não são tratados no "Aberto agora" até o cliente confirmar (item do checklist da Fase 5).
10. **Modo padrão sem marcas.** Todo dado pendente usa `<Confirmar neutro="…">` (texto neutro e verdadeiro) ou `<SoNaRevisao>` (oculto). As marcas só aparecem com `?revisao=1`. Todo novo placeholder entra no PLACEHOLDERS.md com o texto do modo padrão, e `tests/placeholders.spec.ts` precisa continuar passando.
11. Link das avaliações e coordenadas: só em `src/data/google-maps.ts`.

## Stack

- React 19 + TypeScript (strict) + Vite
- Tailwind CSS v4 (tokens de design em CSS variables via `@theme`)
- shadcn/ui (só os componentes usados: button, input, select, radio-group, accordion, label…)
- Sem backend. Formulário gera link `https://wa.me/5511976964074?text=…`
- Pré-renderização estática do HTML no build (SEO local e LCP): a página precisa ter o conteúdo no HTML servido, não só após o JS rodar.
- Testes: Playwright (fluxo de agendamento, breakpoints, "aberto agora", placeholders), Lighthouse para as metas de nota.
- **O build roda no Windows sem Python.** As fontes enxutas da Fraunces estão commitadas em `src/assets/fonts/` como arquivos prontos; fonttools só seria necessário para regenerá-las (comando no comentário de `src/index.css`).
- Microinterações (Whimsy Injector só sugere): nada que atrase o botão de agendar ou derrube a Performance abaixo de 95.
- Deploy: Vercel (projeto `pet-sobral-preview`, branch `main`).

## Estrutura

```
src/
  data/business.ts        # dados do cliente + placeholders tipados
  data/content.ts         # copy das seções (serviços, FAQ, diferenciais)
  lib/whatsapp.ts         # monta mensagem + URL wa.me (função pura, testada)
  lib/opening-hours.ts    # "Aberto agora/Fechado" no fuso America/Sao_Paulo (função pura, testada)
  components/ui/          # shadcn
  components/sections/    # Hero, Servicos, Agendamento, PorQue, Condominios, Depoimentos, FAQ, Localizacao, Rodape
  components/             # Logo, WhatsAppFab, SectionHeading…
public/images/            # fotos placeholder com nomes claros + README de troca
public/robots.txt, sitemap.xml, og-image.jpg, favicon.svg
tests/                    # Playwright
PLACEHOLDERS.md           # tudo que precisa de confirmação do cliente
```

## Padrões de código

- Componentes funcionais, props tipadas, sem `any`. Um componente por arquivo, nomes em PascalCase; seções nomeadas em português (é o vocabulário do cliente).
- Lógica de negócio (WhatsApp, horário) em funções puras em `src/lib`, sem depender de React, com testes.
- **Horário "Aberto agora"** calculado sempre em `America/Sao_Paulo` via `Intl.DateTimeFormat`, independentemente do fuso do visitante. Renderiza estado neutro no HTML estático e hidrata no cliente (sem flash de informação errada).
- Tailwind: mobile-first (estilo base = 360px, depois `sm/md/lg`). Cores e fontes só via tokens; nada de hex solto em componente.
- Microinterações só com `transform`/`opacity`, todas desligadas em `prefers-reduced-motion: reduce`.
- Sem bibliotecas de animação pesadas; sem carrossel automático.
- Imagens: WebP, `width`/`height` explícitos, `loading="lazy"` e `decoding="async"` abaixo da dobra, `fetchpriority="high"` na imagem do hero.
- Fontes: no máximo 2 famílias, subset latin, `display=swap`, preload da fonte do título.
- Textos em pt-BR; `lang="pt-BR"` no `<html>`.

## Checklist de qualidade (antes de dizer que está pronto)

**Conteúdo**
- [ ] Nenhum dado inventado; todo placeholder marcado com `[CONFIRMAR COM O CLIENTE]` e listado no PLACEHOLDERS.md
- [ ] Telefone, endereço e horário idênticos em todas as ocorrências (vêm de `business.ts`)
- [ ] Copy menciona Socorro / zona sul de forma natural, sem keyword stuffing

**Funcional**
- [ ] Formulário valida todos os campos, mostra erros acessíveis e abre wa.me com a mensagem correta (teste Playwright)
- [ ] "Aberto agora / Fechado" correto em: seg 8h59, seg 9h, seg 18h59, seg 19h, sáb 16h29, sáb 16h30, domingo (teste unitário)
- [ ] Botão flutuante do WhatsApp visível em todas as telas e sem cobrir CTA/formulário
- [ ] Mapa, "Como chegar" e links do Google funcionam

**Responsivo** — screenshots Playwright em 360, 390, 768 e 1440px, sem scroll horizontal

**SEO local**
- [ ] `<title>` e meta description com "pet shop Socorro São Paulo" / "banho e tosa Socorro"
- [ ] Open Graph + Twitter card com imagem 1200×630
- [ ] JSON-LD `PetStore` com endereço, geo, telefone, `openingHoursSpecification`, `aggregateRating` — validado
- [ ] `sitemap.xml`, `robots.txt`, favicon, canonical

**Acessibilidade (WCAG 2.2 AA)**
- [ ] Contraste ≥ 4.5:1 texto / 3:1 elementos grandes e UI
- [ ] Todo input com `<label>`; erros ligados via `aria-describedby`
- [ ] Foco visível em tudo; navegação completa por teclado; skip link
- [ ] `alt` descritivo em imagens de conteúdo, `alt=""` em decorativas
- [ ] axe-core sem violações

**Performance** — Lighthouse (mobile) ≥ 95 em Performance, Acessibilidade, Boas práticas e SEO

## Agentes do projeto

Em `.claude/agents/` (catálogo Agency Agents, MIT). Papel de cada um:

| Agente | Papel |
|---|---|
| UX Researcher | persona do tutor do bairro, tarefas principais, hierarquia de informação |
| Persona Walkthrough Specialist | walkthrough rolando a página como o tutor apressado no celular |
| UX Architect | arquitetura da página, tokens, sistema de layout |
| UI Designer | direção visual, componentes, estados |
| Brand Guardian | identidade, tom de voz, logo provisório |
| Content Creator | copy pt-BR |
| SEO Specialist | SEO local, schema, meta |
| Frontend Developer | implementação |
| Whimsy Injector | microinterações com tema pet (com moderação) |
| Accessibility Auditor | auditoria WCAG |
| Performance Benchmarker | Lighthouse / Core Web Vitals |
| Evidence Collector | QA com screenshots |
| Reality Checker | revisão brutal final (padrão "NEEDS WORK") |
| UI Finish-Gate Reviewer | polimento final, caça ao "cara de template" |
| Proposal Strategist | kit de venda para o dono |

## Preview (Vercel) e indexação

- Projeto Vercel: `pet-sobral-preview`. Deploy estático via integração GitHub (importar o repositório no painel da Vercel).
- **Enquanto o dono não aprovar, o site não pode ser indexado.** Dupla proteção:
  1. `<meta name="robots" content="noindex, nofollow">` injetado no build quando `VITE_SITE_INDEXAVEL !== "true"` (padrão: bloqueado);
  2. header `X-Robots-Tag: noindex, nofollow` em `vercel.json`, e `robots.txt` com `Disallow: /` na versão de preview.
- Liberar indexação (após aprovação) = setar `VITE_SITE_INDEXAVEL=true`, remover o header do `vercel.json`, trocar o `robots.txt` e configurar o domínio definitivo no canonical/sitemap.

## Kit de venda (Fase 5) — pasta `kit-venda/`

- `mensagem-whatsapp.md` — abordagem curta com link do preview
- `roteiro-apresentacao.md` — 2–3 min presencial, focado no ganho do dono (agendamento pelo WhatsApp, aparecer no Google para "banho e tosa Socorro", mais confiança)
- `proposta-comercial.pdf` (+ fonte HTML) — 1 página, valores como `[DEFINIR PREÇO]`
- `checklist-dono.md` — o que coletar para a versão final (fotos reais, preços, logo, Instagram se houver, etc.)
