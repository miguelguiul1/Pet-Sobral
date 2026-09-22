# Copy do site: Pet Sobral (one-page, pt-BR)

Direção: **"Quintal da Guarapiranga"**. Tom próximo, calmo, de vizinho: caloroso, claro e local.

**Como ler este arquivo**
- Tudo entre `[CONFIRMAR COM O CLIENTE]` depende do dono. Não publicar sem confirmar.
- Dados reais (nome, endereço, WhatsApp, horário, nota e avaliações do Google, elogios, condomínios, Mercado Livre) vêm de `src/data/business.ts`. Na copy abaixo eles aparecem escritos por extenso só para leitura. No código, sempre leia de `business.ts`.
- "Preço justo" é sempre atribuído aos clientes. Nunca usar "mais barato", "menor preço", "o melhor" nem comparar com concorrentes.
- Sem emojis em nenhum texto, inclusive nas mensagens de WhatsApp.

---

## 0. SEO (head)

**`<title>`** (59 caracteres)
> Pet Sobral · Banho e tosa e pet shop no Socorro, São Paulo

**Meta description** (cerca de 140 caracteres)
> Pet shop no Socorro, São Paulo: banho e tosa com equipe carinhosa, nota 4.8 no Google. Agende pelo WhatsApp. Seg a sex 9h–19h, sáb 9h–16h30.

**Open Graph / Twitter**
- `og:title`: Pet Sobral · Banho e tosa no Socorro, zona sul de SP
- `og:description`: Banho, tosa, rações e acessórios no Socorro. Nota 4.8 no Google com 150 avaliações. Escolha o horário e confirme pelo WhatsApp.
- `og:image:alt`: Pet Sobral, banho e tosa no Socorro, São Paulo

**Skip link:** Pular para o conteúdo

---

## 1. Hero

**Eyebrow**
> Pet shop no Socorro · zona sul de SP

**H1**
> O banho e tosa de confiança aqui do Socorro.

**Subtítulo**
> Banho, tosa, rações e acessórios num pet shop de bairro, com uma equipe que trata seu pet com carinho. Você escolhe o horário aqui e a gente confirma pelo WhatsApp.

**Selo**
> Preço justo no banho e tosa

Linha de apoio do selo (pequena, abaixo ou em tooltip):
> É o que dizem nossos clientes no Google.

**Prova social (linha curta)**
> 4.8 no Google · 150 avaliações

**Horário em destaque**
> Seg a sex 9h–19h · Sáb até 16h30

(Pode vir acompanhado do status dinâmico da seção 8, ex.: "Aberto agora · fecha às 19h".)

**CTA principal:** Agendar banho e tosa  → rola até `#agendamento`
**CTA secundário:** Ver serviços e preços  → rola até `#servicos`

**Alt da foto do hero** (ajustar à foto placeholder escolhida e depois à foto real)
> Cachorro tranquilo, enrolado numa toalha depois do banho

---

## 2. Serviços (`#servicos`)

**Título**
> Banho e tosa no Socorro, e o que mais seu pet precisar

**Intro**
> Tudo num lugar só, pertinho de casa para quem mora no Socorro e arredores. Os preços abaixo são o ponto de partida; o valor certinho a gente passa pelo WhatsApp.

### Card 1: Banho
> Banho com calma e carinho, para seu pet voltar pra casa limpinho e cheiroso.

Preço: **a partir de R$ [CONFIRMAR COM O CLIENTE]**
Link do card: Agendar banho

### Card 2: Tosa
> Tosa feita com paciência pela nossa equipe. Conte como você gosta no campo de observações do agendamento.

Preço: **a partir de R$ [CONFIRMAR COM O CLIENTE]**
Link do card: Agendar tosa

### Card 3: Banho + tosa
> Os dois na mesma visita: prático pra você, tranquilo pro seu pet.

Preço: **a partir de R$ [CONFIRMAR COM O CLIENTE]**
Link do card: Agendar banho + tosa

(Os links dos cards 1 a 3 levam ao formulário com o serviço já selecionado.)

### Card 4: Rações, produtos e acessórios
> Rações, produtos e acessórios na loja, com a qualidade que nossos clientes elogiam no Google. Quer saber se tem o que você procura? Pergunte pelo WhatsApp.

Sem preço.
Link do card: Perguntar pelo WhatsApp
Mensagem pré-preenchida:
```
Olá, Pet Sobral! Queria saber se vocês têm um produto na loja:
```

**Nota de preço** (abaixo dos cards, texto pequeno)
> O valor pode variar conforme o porte e a pelagem do pet. [CONFIRMAR COM O CLIENTE: o preço varia por porte/pelagem? quais faixas?]

---

## 3. Agendamento (`#agendamento`)

**Título**
> Agende em um minuto

**Intro**
> Preencha, toque em enviar e a mensagem já sai pronta no WhatsApp. A gente confirma o horário por lá.

**Indicação de obrigatoriedade** (topo do formulário, pequena)
> Todos os campos são obrigatórios, menos Observações.

### Campos

**1. Serviço** (radio)
- Label: Qual serviço?
- Opções: Banho · Tosa · Banho + tosa
- Erro: Escolha o serviço.

**2. Espécie** (radio)
- Label: Seu pet é
- Opções: Cachorro · Gato
- Nota da opção Gato (enquanto não confirmado; remover a opção se não atender): [CONFIRMAR COM O CLIENTE: atende gatos?]
- Erro: Diga se é cachorro ou gato.

**3. Porte** (radio)
- Label: Porte
- Opções: Pequeno · Médio · Grande
- Hint: [CONFIRMAR COM O CLIENTE: critério de porte, ex.: faixas de peso]. Na dúvida, escolha o mais próximo; a gente ajusta na conversa.
- Erro: Escolha o porte do pet.

**4. Nome do pet** (texto)
- Label: Nome do pet
- Placeholder: Ex.: Paçoca
- Erro: Conta pra gente o nome do pet.

**5. Dia** (select)
- Label: Qual dia?
- Hint: Mostramos só os dias em que a loja abre. Domingo é fechado.
- Formato das opções: `Hoje · ter, 22/09` · `Amanhã · qua, 23/09` · `sex, 25/09` · `sáb, 26/09`
- Regra: não listar domingos; não listar "Hoje" se a loja já fechou (depois das 19h de seg a sex, depois das 16h30 no sábado). [CONFIRMAR COM O CLIENTE: abre em feriados? Se não, excluir feriados da lista.]
- Opção vazia: Escolha um dia
- Erro: Escolha o dia.

**6. Período** (radio)
- Label: Melhor período
- Opções: Manhã · Tarde
- Hint: O horário exato a gente combina no WhatsApp.
- Erro: Escolha manhã ou tarde.

**7. Seu nome** (texto)
- Label: Seu nome
- Placeholder: Como podemos te chamar?
- Erro: Digite seu nome.

**8. Observações** (textarea, opcional)
- Label: Observações (opcional)
- Placeholder: Ex.: é a primeira vez dele aqui, tem medo de secador, prefere tosa mais curta…
- Contador (se houver limite): {n}/300 caracteres

**Resumo de erros** (topo do formulário, anunciado para leitor de tela)
> Faltam algumas informações. Confira os campos marcados.

**Botão**
> Enviar pelo WhatsApp

**Microcopy abaixo do botão**
> Abre o WhatsApp com a mensagem pronta. O horário fica garantido quando a gente confirmar por lá.

**Fallback** (se o WhatsApp não abrir; texto discreto)
> Não abriu? Chame a gente no (11) 97696-4074.

### Modelo exato da mensagem do WhatsApp

Variáveis entre chaves. Valores em minúsculo onde indicado. A linha "Observações" só entra se o campo for preenchido.

```
Olá, Pet Sobral! Quero agendar pelo site.

Serviço: {servico}
Pet: {nomePet} ({especie em minúsculo}, porte {porte em minúsculo})
Dia: {diaDaSemana}, {dd/mm}
Período: {periodo}
Meu nome: {seuNome}
Observações: {observacoes}

Pode confirmar o horário pra mim?
```

Exemplo preenchido:
```
Olá, Pet Sobral! Quero agendar pelo site.

Serviço: Banho + tosa
Pet: Paçoca (cachorro, porte pequeno)
Dia: sexta-feira, 25/09
Período: Manhã
Meu nome: {seuNome}
Observações: é a primeira vez dela aqui

Pode confirmar o horário pra mim?
```

---

## 4. Por que o Pet Sobral

**Título**
> Por que os vizinhos confiam no Pet Sobral

**Intro**
> Não somos nós que dizemos. É o que mais aparece nas 150 avaliações do Google, com nota 4.8.

### Diferencial 1: Atendimento atencioso
> Atenção de verdade com você e com seu pet, do jeito que nossos clientes descrevem no Google. Ficou com dúvida? É só perguntar.

### Diferencial 2: Carinho com cada pet
> Nossa equipe trata seu pet com o cuidado que você teria em casa. É um dos elogios que mais recebemos.

### Diferencial 3: Preço justo no banho e tosa
> Preço justo, como dizem nossos clientes no Google. O valor pro seu pet a gente passa antes, pelo WhatsApp.

### Diferencial 4: Horário que cabe na rotina
> De segunda a sexta até as 19h e sábado até 16h30. Fica mais fácil encaixar o pet na sua semana. Produtos de qualidade na loja também estão entre os elogios.

(Se o layout comportar 5 itens, "Produtos de qualidade" pode virar card próprio: "Rações, produtos e acessórios com a qualidade que nossos clientes elogiam." Nesse caso, tirar a última frase do diferencial 4.)

---

## 5. Condomínios (`#condominios`)

**Eyebrow**
> Para condomínios

**Título**
> Mora em condomínio aqui na região? A gente atende.

**Texto**
> O Pet Sobral atende condomínios da região. Se você é síndico, trabalha na administradora ou é morador e quer levar essa facilidade pro seu prédio, chama a gente no WhatsApp pra conversar.

**Detalhes das condições** (só publicar depois de confirmado):
> [CONFIRMAR COM O CLIENTE: como funciona o atendimento a condomínios, quais condomínios/bairros entram (raio), frequência, se há busca e leva, se há condição ou desconto especial.]

**CTA**
> Conversar sobre meu condomínio

**Mensagem pré-preenchida do WhatsApp**
```
Olá, Pet Sobral! Vim pelo site. Sou do condomínio ____ aqui na região e queria saber como funciona o atendimento a condomínios.
```

---

## 6. Depoimentos

**Título**
> Quem já trouxe o pet, conta

**Subtítulo**
> 4.8 no Google · 150 avaliações

**Card 1**
> [SUBSTITUIR por avaliação real do Google — tema: atendimento atencioso]

Assinatura: [SUBSTITUIR pelo nome exibido no Google, com autorização] · Avaliação no Google

**Card 2**
> [SUBSTITUIR por avaliação real do Google — tema: equipe carinhosa com os animais]

Assinatura: [SUBSTITUIR pelo nome exibido no Google, com autorização] · Avaliação no Google

**Card 3**
> [SUBSTITUIR por avaliação real do Google — tema: preço justo no banho e tosa]

Assinatura: [SUBSTITUIR pelo nome exibido no Google, com autorização] · Avaliação no Google

**Link**
> Ver todas as avaliações no Google

(Link externo: abre em nova aba; incluir no aria-label "abre em nova aba".)

---

## 7. Perguntas frequentes (`#faq`)

**Título**
> Perguntas frequentes

**1. Preciso agendar?**
> Recomendamos agendar pelo site ou pelo WhatsApp pra garantir seu horário. [CONFIRMAR COM O CLIENTE: atende sem agendamento, por ordem de chegada?]

**2. Quanto tempo demora o banho e tosa?**
> [CONFIRMAR COM O CLIENTE: tempo médio de banho, de tosa e de banho + tosa.] Se precisar de uma previsão pro seu pet, pergunte no WhatsApp ao agendar.

**3. Vocês atendem gatos?**
> [CONFIRMAR COM O CLIENTE: atende gatos? Se sim, em quais serviços?]

**4. Quais as formas de pagamento?**
> [CONFIRMAR COM O CLIENTE: formas de pagamento aceitas.]

**5. Quanto custa?**
> Banho, tosa e banho + tosa começam a partir de R$ [CONFIRMAR COM O CLIENTE]. O valor certinho pro seu pet a gente passa pelo WhatsApp. [CONFIRMAR COM O CLIENTE: o preço varia por porte/pelagem?]

**6. Posso devolver compras do Mercado Livre aí?**
> Pode. Somos ponto de devolução do Mercado Livre. É só vir no horário da loja: segunda a sexta das 9h às 19h e sábado das 9h às 16h30.

**7. Abrem em feriados?**
> [CONFIRMAR COM O CLIENTE: funcionamento em feriados.] Na dúvida, chama a gente no WhatsApp antes de vir.

---

## 8. Localização (`#localizacao`)

**Título**
> Venha nos visitar no Socorro

**Texto**
> Estamos na R. Olívia Guedes Penteado, 517, no Socorro, zona sul de São Paulo. Pode vir pra conhecer a loja, trazer o pet ou deixar sua devolução do Mercado Livre.

**Endereço completo**
> R. Olívia Guedes Penteado, 517 - Socorro, São Paulo - SP, 04766-001

**Rótulos de horário**
| Rótulo | Valor |
|---|---|
| Segunda a sexta | 9h – 19h |
| Sábado | 9h – 16h30 |
| Domingo | Fechado |

(Destacar a linha do dia atual; texto para leitor de tela: "hoje".)

**Status dinâmico** (calculado em America/Sao_Paulo)
| Situação | Texto |
|---|---|
| Aberto, mais de 1h para fechar | Aberto agora · fecha às 19h (seg–sex) / fecha às 16h30 (sáb) |
| Aberto, menos de 1h para fechar | Fecha às 19h / Fecha às 16h30 |
| Seg–sáb antes das 9h | Fechado · abre hoje às 9h |
| Seg–sex depois das 19h | Fechado · abre amanhã às 9h |
| Sábado depois das 16h30 | Fechado · abre segunda às 9h |
| Domingo | Fechado · abre amanhã às 9h |
| Estado neutro (HTML estático, antes de hidratar) | Seg a sex 9h–19h · Sáb até 16h30 |

Observação: feriados não são considerados até o cliente confirmar o funcionamento neles. [CONFIRMAR COM O CLIENTE: funcionamento em feriados.]

**Botão**
> Como chegar

(Abre o Google Maps com o endereço. aria-label: "Como chegar ao Pet Sobral no Google Maps, abre em nova aba".)

**Botão secundário**
> Chamar no WhatsApp

**Título acessível do mapa (iframe `title`)**
> Mapa com a localização do Pet Sobral no Socorro, São Paulo

---

## 9. Rodapé

**Marca + frase**
> Pet Sobral
> Pet shop, banho e tosa no Socorro, zona sul de São Paulo.

**Contato**
- Rótulo: Endereço · R. Olívia Guedes Penteado, 517 - Socorro, São Paulo - SP, 04766-001
- Rótulo: WhatsApp · (11) 97696-4074
- Rótulo: Horário · Seg a sex 9h–19h · Sáb 9h–16h30 · Dom fechado

**Extra**
> Ponto de devolução do Mercado Livre

**Links rápidos**
> Serviços · Agendar · Condomínios · Perguntas frequentes · Como chegar

**Redes sociais**
> [CONFIRMAR COM O CLIENTE: tem Instagram ou outra rede? Se não tiver, remover este bloco.]

**Linha legal**
> © 2026 Pet Sobral. [CONFIRMAR COM O CLIENTE: CNPJ/razão social, se quiser exibir.]

---

## 10. Botão flutuante do WhatsApp (FAB)

**aria-label**
> Conversar com o Pet Sobral no WhatsApp

**Tooltip / texto visível (se houver)**
> Fale com a gente

**Mensagem pré-preenchida**
```
Olá, Pet Sobral! Vim pelo site e queria tirar uma dúvida.
```

---

## Lista de placeholders usados

**[CONFIRMAR COM O CLIENTE]**
1. Preço "a partir de" do Banho (Serviços, FAQ 5)
2. Preço "a partir de" da Tosa (Serviços, FAQ 5)
3. Preço "a partir de" do Banho + tosa (Serviços, FAQ 5)
4. Se o preço varia por porte/pelagem e quais faixas (nota de Serviços, FAQ 5)
5. Se atende gatos, e em quais serviços (Agendamento: opção Gato; FAQ 3)
6. Critério de porte: Pequeno/Médio/Grande (hint do campo Porte)
7. Funcionamento em feriados (campo Dia, FAQ 7, status "Aberto agora")
8. Se atende sem agendamento / por ordem de chegada (FAQ 1)
9. Tempo médio de banho, tosa e banho + tosa (FAQ 2)
10. Formas de pagamento (FAQ 4)
11. Condomínios: como funciona, raio/bairros atendidos, frequência, busca e leva, condição ou desconto (seção 5)
12. Redes sociais, se houver (Rodapé)
13. CNPJ/razão social para o rodapé, se quiser exibir (Rodapé)

**[SUBSTITUIR]** (conteúdo a coletar, não é dado a confirmar)
14. Três avaliações reais do Google (temas: atendimento atencioso; equipe carinhosa com os animais; preço justo no banho e tosa) e o nome exibido de cada autor, com autorização (seção 6)
15. Alt da foto do hero: ajustar quando a foto placeholder for trocada pela foto real (seção 1)
