import { MapPin, Navigation, Package } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { IconeWhatsApp } from '@/components/IconeWhatsApp'
import { StatusLoja } from '@/components/StatusLoja'
import { Button } from '@/components/ui/button'
import { business, urlComoChegar, urlMapaEmbed } from '@/data/business'
import { useAgora } from '@/hooks/useAgora'
import { dataNaLoja } from '@/lib/opening-hours'
import { cn } from '@/lib/utils'
import { mensagens, urlWhatsApp } from '@/lib/whatsapp'

const linhas = [
  { dias: [1, 2, 3, 4, 5], rotulo: 'Segunda a sexta', valor: '9h – 19h' },
  { dias: [6], rotulo: 'Sábado', valor: '9h – 16h30' },
  { dias: [0], rotulo: 'Domingo', valor: 'Fechado' },
]

/** Mapa do Google só é inserido quando a seção chega perto da tela (não pesa no carregamento). */
function Mapa() {
  const ref = useRef<HTMLDivElement>(null)
  const [carregar, setCarregar] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setCarregar(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCarregar(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="relative aspect-[4/3] overflow-hidden rounded-cartao bg-creme-escuro ring-1 ring-border lg:aspect-auto lg:h-full lg:min-h-[26rem]">
      {carregar ? (
        <iframe
          title="Mapa com a localização do Pet Sobral no Socorro, São Paulo"
          src={urlMapaEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-tinta-suave">
          <p>
            <MapPin aria-hidden="true" className="mx-auto mb-2 size-8 text-marca" strokeWidth={1.75} />
            {business.endereco.curto}
          </p>
        </div>
      )}
    </div>
  )
}

export function Localizacao() {
  const agora = useAgora()
  const hoje = agora ? dataNaLoja(agora).diaSemana : null
  return (
    <section id="localizacao" aria-labelledby="localizacao-titulo" className="bg-cartao py-16 md:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 id="localizacao-titulo" className="font-display text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.015em] md:text-5xl">
            Venha nos visitar <em className="font-medium text-marca">no Socorro</em>
          </h2>
          <p className="mt-4 text-lg text-tinta-suave">
            Pode vir pra conhecer a loja, trazer o pet ou deixar sua devolução do Mercado Livre.
          </p>

          <address className="mt-8 flex gap-3 not-italic">
            <MapPin aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-marca" strokeWidth={1.75} />
            <span className="text-lg font-semibold">{business.endereco.completo}</span>
          </address>

          <div className="mt-8 rounded-cartao bg-creme p-5 ring-1 ring-border">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-xl font-semibold">Horário</h3>
              <StatusLoja />
            </div>
            <table className="mt-3 w-full text-left">
              <caption className="sr-only">Horário de funcionamento</caption>
              <tbody>
                {linhas.map((l) => {
                  const ehHoje = hoje !== null && l.dias.includes(hoje)
                  return (
                    <tr key={l.rotulo} className={cn('border-t border-border first:border-t-0', ehHoje && 'font-bold text-marca-escuro')}>
                      <th scope="row" className="py-2.5 font-semibold">
                        {l.rotulo}
                        {ehHoje && <span className="ml-2 rounded-full bg-mostarda px-2 py-0.5 text-xs text-tinta">hoje</span>}
                      </th>
                      <td className="py-2.5 text-right font-display text-lg font-semibold">{l.valor}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-5 flex items-start gap-3 rounded-xl bg-mostarda-claro px-4 py-3">
            <Package aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
            <span>
              <strong>Ponto de devolução do Mercado Livre.</strong> É só vir no horário da loja.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="primario" size="lg">
              <a href={urlComoChegar} target="_blank" rel="noopener">
                <Navigation aria-hidden="true" className="size-5" strokeWidth={2} />
                Como chegar
                <span className="sr-only">ao Pet Sobral no Google Maps (abre em nova aba)</span>
              </a>
            </Button>
            <Button asChild variant="contorno" size="lg">
              <a href={urlWhatsApp(mensagens.geral)} target="_blank" rel="noopener">
                <IconeWhatsApp className="size-5" />
                Chamar no WhatsApp
                <span className="sr-only">(abre o WhatsApp)</span>
              </a>
            </Button>
          </div>
        </div>
        <Mapa />
      </div>
    </section>
  )
}
