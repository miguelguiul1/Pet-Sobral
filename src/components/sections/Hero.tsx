import { Star } from 'lucide-react'
import { Foto } from '@/components/Foto'
import { IconeWhatsApp } from '@/components/IconeWhatsApp'
import { SeloPrecoJusto } from '@/components/SeloPrecoJusto'
import { StatusLoja } from '@/components/StatusLoja'
import { Button } from '@/components/ui/button'
import { business, notaFormatada } from '@/data/business'
import { imagens } from '@/data/imagens'
import { mensagens, urlWhatsApp } from '@/lib/whatsapp'

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="container-site pt-6 pb-16 md:pt-10 lg:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-marca sm:text-sm sm:tracking-[0.14em]">
            Pet shop no Socorro · zona sul de SP
          </p>
          <h1
            id="hero-titulo"
            className="font-display text-[2.45rem] leading-[1.04] font-semibold tracking-[-0.02em] text-balance sm:text-5xl lg:text-[4.1rem]"
          >
            O banho e tosa de confiança <em className="font-medium text-marca">aqui do Socorro.</em>
          </h1>

          <SeloPrecoJusto className="mt-6" />

          <p className="mt-5 max-w-xl text-[1.0625rem] text-tinta-suave md:text-lg">
            Banho, tosa, rações e acessórios num pet shop de bairro, com uma equipe que trata seu pet com carinho.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={urlWhatsApp(mensagens.agendarRapido)} target="_blank" rel="noopener" data-cta="hero-whatsapp">
                <IconeWhatsApp className="size-5.5 motion-safe:group-hover/botao:animate-balanco" />
                Agendar banho e tosa
                <span className="sr-only">(abre o WhatsApp)</span>
              </a>
            </Button>
            <Button asChild variant="link" size="link" className="self-center sm:self-auto">
              <a href="#servicos">Ver serviços</a>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-8">
            <a
              href={business.google.urlAvaliacoes}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-3 rounded-lg"
            >
              <span className="font-display text-4xl font-semibold leading-none">{notaFormatada}</span>
              <span className="text-sm leading-tight">
                <span className="flex text-mostarda" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-4 fill-current" strokeWidth={0} />
                  ))}
                </span>
                <span className="font-semibold underline decoration-border underline-offset-2 group-hover:decoration-marca">
                  {business.google.avaliacoes} avaliações no Google
                </span>
                <span className="sr-only"> (abre em nova aba)</span>
              </span>
            </a>
            <div>
              <StatusLoja className="mb-1" />
              <p className="font-display text-[1.45rem] leading-tight font-semibold md:text-[1.6rem]">
                <span className="block whitespace-nowrap xl:inline">Seg a sex 9h–19h</span>
                <span className="hidden text-marca xl:inline" aria-hidden="true"> · </span>
                <span className="block whitespace-nowrap xl:inline">Sáb até 16h30</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
          {/* Arco marca deslocado: dá presença de cor à foto sem virar moldura */}
          <div aria-hidden="true" className="recorte-arco absolute inset-0 translate-x-3 translate-y-3 bg-marca md:translate-x-5 md:translate-y-5" />
          <div className="recorte-arco relative aspect-[4/5] overflow-hidden bg-creme-escuro">
            {/* TROCAR: foto real de um pet atendido no Pet Sobral (foto ilustrativa do Unsplash) */}
            <Foto imagem={imagens.hero} prioridade sizes="(min-width: 1024px) 34rem, (min-width: 640px) 26rem, 92vw" />
          </div>
          <a
            href={business.google.urlAvaliacoes}
            target="_blank"
            rel="noopener"
            aria-label={`Nota ${notaFormatada} no Google, ${business.google.avaliacoes} avaliações (abre em nova aba)`}
            className="absolute -bottom-5 -left-2 grid size-28 -rotate-6 place-items-center rounded-full bg-mostarda text-center text-tinta shadow-[0_12px_28px_-14px_rgb(30_43_37/0.7)] transition-transform hover:rotate-0 md:size-32"
          >
            <span aria-hidden="true" className="absolute top-2.5 size-3 rounded-full bg-creme" />
            <span aria-hidden="true" className="mt-2 leading-tight">
              <span className="block font-display text-3xl font-semibold md:text-[2.1rem]">{notaFormatada}★</span>
              <span className="block text-xs font-bold">
                {business.google.avaliacoes} avaliações
                <br />
                no Google
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
