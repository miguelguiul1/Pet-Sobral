import type { ReactNode } from 'react'
import { Confirmar } from '@/components/Confirmar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { business } from '@/data/business'

const perguntas: Array<{ p: string; r: ReactNode }> = [
  {
    p: 'Preciso agendar?',
    r: (
      <>
        Recomendamos agendar pelo site ou pelo WhatsApp pra garantir seu horário.{' '}
        <Confirmar>[CONFIRMAR COM O CLIENTE: atende sem agendamento, por ordem de chegada?]</Confirmar>
      </>
    ),
  },
  {
    p: 'Quanto tempo demora o banho e tosa?',
    r: (
      <>
        <Confirmar>[CONFIRMAR COM O CLIENTE: tempo médio de banho, de tosa e de banho + tosa.]</Confirmar> Se precisar de uma
        previsão pro seu pet, pergunte no WhatsApp ao agendar.
      </>
    ),
  },
  { p: 'Vocês atendem gatos?', r: <Confirmar>[CONFIRMAR COM O CLIENTE: atende gatos? Se sim, em quais serviços?]</Confirmar> },
  { p: 'Quais as formas de pagamento?', r: <Confirmar>[CONFIRMAR COM O CLIENTE: formas de pagamento aceitas.]</Confirmar> },
  {
    p: 'Quanto custa?',
    r: (
      <>
        Banho, tosa e banho + tosa começam a partir de R$ <Confirmar curto="a confirmar">[CONFIRMAR COM O CLIENTE]</Confirmar>. O
        valor certinho pro seu pet a gente passa pelo WhatsApp.{' '}
        <Confirmar>[CONFIRMAR COM O CLIENTE: o preço varia por porte/pelagem?]</Confirmar>
      </>
    ),
  },
  {
    p: 'Posso devolver compras do Mercado Livre aí?',
    r: `Pode. Somos ponto de devolução do Mercado Livre. É só vir no horário da loja: segunda a sexta das 9h às 19h e sábado das 9h às 16h30.`,
  },
  {
    p: 'Abrem em feriados?',
    r: (
      <>
        <Confirmar>[CONFIRMAR COM O CLIENTE: funcionamento em feriados.]</Confirmar> Na dúvida, chama a gente no WhatsApp{' '}
        {business.telefone.exibicao} antes de vir.
      </>
    ),
  },
]

export function Duvidas() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo" className="py-16 md:py-24">
      <div className="container-site grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 id="duvidas-titulo" className="font-display text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.015em] md:text-5xl">
          Perguntas frequentes
        </h2>
        <Accordion type="single" collapsible className="border-t border-border">
          {perguntas.map(({ p, r }, i) => (
            <AccordionItem key={p} value={`p${i}`}>
              <AccordionTrigger>{p}</AccordionTrigger>
              {/* forceMount: respostas ficam no HTML (SEO) mesmo fechadas; o Radix aplica `hidden` */}
              <AccordionContent forceMount>
                {r}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
