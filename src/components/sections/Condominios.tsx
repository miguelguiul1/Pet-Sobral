import { Building2 } from 'lucide-react'
import { Confirmar } from '@/components/Confirmar'
import { Foto } from '@/components/Foto'
import { IconeWhatsApp } from '@/components/IconeWhatsApp'
import { Button } from '@/components/ui/button'
import { imagens } from '@/data/imagens'
import { mensagens, urlWhatsApp } from '@/lib/whatsapp'

/**
 * Fato do briefing: "atende condomínios da região". Todo o resto (como funciona, raio, frequência,
 * busca e leva, condições) é [CONFIRMAR COM O CLIENTE] — não inventar.
 */
export function Condominios() {
  return (
    <section id="condominios" aria-labelledby="condominios-titulo" className="bg-tinta py-16 text-creme md:py-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 [&>*]:min-w-0">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-mostarda px-3.5 py-1.5 text-sm font-bold text-tinta">
            <Building2 aria-hidden="true" className="size-4" strokeWidth={2} />
            Para condomínios
          </p>
          <h2 id="condominios-titulo" className="mt-5 font-display text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.015em] text-balance md:text-5xl">
            Mora em condomínio aqui na região? <em className="font-medium text-mostarda">A gente atende.</em>
          </h2>
          <p className="mt-5 text-lg text-creme/95">
            O Pet Sobral atende condomínios da região. Se você é síndico, trabalha na administradora ou é morador e quer levar essa
            facilidade pro seu prédio, chama a gente no WhatsApp pra conversar.
          </p>
          <div className="mt-6 rounded-xl border border-creme/25 p-4 text-sm">
            <p className="mb-2 font-bold text-mostarda">Como funciona</p>
            <Confirmar>
              [CONFIRMAR COM O CLIENTE: como funciona o atendimento a condomínios, quais condomínios/bairros entram, frequência, se há
              busca e leva, se há condição especial]
            </Confirmar>
          </div>
          <Button asChild variant="claro" size="lg" className="mt-8 w-full sm:w-auto">
            <a href={urlWhatsApp(mensagens.condominio)} target="_blank" rel="noopener">
              <IconeWhatsApp className="size-5 text-zap" />
              Conversar sobre meu condomínio
              <span className="sr-only">(abre o WhatsApp)</span>
            </a>
          </Button>
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-cartao">
            {/* TROCAR: foto real (ex.: atendimento em um condomínio da região), foto ilustrativa do Unsplash */}
            <Foto imagem={imagens.condominios} sizes="(min-width: 1024px) 30rem, 90vw" className="aspect-[5/4]" />
          </div>
        </div>
      </div>
    </section>
  )
}
