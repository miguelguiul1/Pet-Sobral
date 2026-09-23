import { ExternalLink, Quote } from 'lucide-react'
import { Confirmar } from '@/components/Confirmar'
import { business, notaFormatada } from '@/data/business'
import { useModoRevisao } from '@/hooks/useModoRevisao'

// Temas reais dos elogios no Google (briefing). Os depoimentos em si são placeholders:
// substituir por 3 avaliações reais do Google, com autorização do autor.
const temas = ['atendimento atencioso', 'equipe carinhosa com os animais', 'preço justo no banho e tosa']

function CardPlaceholder({ tema }: { tema: string }) {
  return (
    <figure className="flex h-full flex-col rounded-cartao bg-cartao p-6 ring-1 ring-border">
      <Quote aria-hidden="true" className="size-8 -scale-x-100 fill-marca/15 text-marca" strokeWidth={1.5} />
      <blockquote className="mt-4 flex-1 font-display text-lg leading-snug">
        <Confirmar>[SUBSTITUIR por avaliação real do Google — tema: {tema}]</Confirmar>
      </blockquote>
      <figcaption className="mt-5 text-sm text-tinta-suave">
        <Confirmar curto="Nome do cliente">[SUBSTITUIR pelo nome exibido no Google, com autorização]</Confirmar> · Avaliação no
        Google
      </figcaption>
    </figure>
  )
}

/** Modo padrão: sem citações inventadas, só os temas que de fato aparecem nas avaliações. */
function CardTema({ tema }: { tema: string }) {
  return (
    <div className="flex h-full flex-col rounded-cartao bg-cartao p-6 ring-1 ring-border">
      <span aria-hidden="true" className="size-3 rounded-full bg-mostarda" />
      <p className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-marca">Elogio frequente</p>
      <p className="mt-1 font-display text-2xl leading-snug font-semibold first-letter:uppercase">{tema}</p>
    </div>
  )
}

export function Depoimentos() {
  const revisao = useModoRevisao()
  return (
    <section aria-labelledby="depoimentos-titulo" className="py-16 md:py-24">
      <div className="container-site">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="depoimentos-titulo" className="font-display text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.015em] md:text-5xl">
              {revisao ? 'Quem já trouxe o pet, conta' : 'O que mais aparece nas avaliações'}
            </h2>
            <p className="mt-3 text-lg font-semibold text-tinta-suave">
              {notaFormatada} no Google · {business.google.avaliacoes} avaliações
            </p>
          </div>
          <a
            href={business.google.urlAvaliacoes}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 font-bold text-marca underline decoration-2 underline-offset-4 hover:text-marca-escuro"
          >
            Ver todas as avaliações no Google
            <ExternalLink aria-hidden="true" className="size-4" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {temas.map((tema) => (
            <li key={tema}>{revisao ? <CardPlaceholder tema={tema} /> : <CardTema tema={tema} />}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
