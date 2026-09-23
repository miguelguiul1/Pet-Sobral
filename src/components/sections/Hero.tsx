import { Star } from 'lucide-react'
import { secoes } from '@/data/navegacao'
import { CachorroTraco } from '@/components/CachorroTraco'
import { Foto } from '@/components/Foto'
import { IconeWhatsApp } from '@/components/IconeWhatsApp'
import { SeloPrecoJusto } from '@/components/SeloPrecoJusto'
import { StatusLoja } from '@/components/StatusLoja'
import { Button } from '@/components/ui/button'
import { business, notaFormatada } from '@/data/business'
import { imagens } from '@/data/imagens'
import { mensagens, urlWhatsApp } from '@/lib/whatsapp'

/** Topo em azul da marca com branco, como o logo; o cachorro em traço do logo aparece ao fundo. */
export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="relative overflow-hidden bg-marca text-white">
      {/* Cachorro em traço do logo, grande e discreto (decorativo, inline: não compete com o LCP) */}
      <CachorroTraco className="pointer-events-none absolute -right-24 bottom-6 w-[46rem] text-white opacity-[0.07] select-none md:-right-10 md:bottom-10 md:w-[64rem]" />
      <div className="container-site relative pt-6 pb-20 md:pt-10 lg:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="mb-3 text-[0.8rem] font-extrabold uppercase tracking-[0.14em] text-destaque sm:text-sm">
              Pet shop no Socorro · zona sul de SP
            </p>
            <h1
              id="hero-titulo"
              className="font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[4.4rem]"
            >
              O banho e tosa de confiança <span className="text-destaque">aqui do Socorro.</span>
            </h1>

            <SeloPrecoJusto className="mt-6" />

            <p className="mt-5 max-w-xl text-[1.0625rem] text-white/90 md:text-lg">
              Banho, tosa, rações e acessórios num pet shop de bairro, com uma equipe que trata seu pet com carinho.
            </p>

            <div data-esconde-fab className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="branco" size="lg" className="w-full sm:w-auto">
                <a href={urlWhatsApp(mensagens.agendarRapido)} target="_blank" rel="noopener" data-cta="hero-whatsapp">
                  <IconeWhatsApp className="size-6 text-zap motion-safe:group-hover/botao:animate-balanco" />
                  Agendar banho e tosa
                  <span className="sr-only">(abre o WhatsApp)</span>
                </a>
              </Button>
              <Button asChild variant="linkClaro" size="link" className="self-center sm:self-auto">
                <a href={`#${secoes.servicos.id}`}>Ver serviços</a>
              </Button>
            </div>

            <div className="mt-8 grid gap-4 border-t border-white/25 pt-6 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-8">
              <a
                href={business.google.urlAvaliacoes}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-3 rounded-lg"
              >
                <span className="font-display text-4xl font-extrabold leading-none">{notaFormatada}</span>
                <span className="text-sm leading-tight">
                  <span className="flex text-estrela" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-4 fill-current" strokeWidth={0} />
                    ))}
                  </span>
                  <span className="font-bold underline decoration-white/40 underline-offset-2 group-hover:decoration-white">
                    {business.google.avaliacoes} avaliações no Google
                  </span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </span>
              </a>
              <div>
                <StatusLoja className="mb-1.5 rounded-full bg-white px-3 py-1 text-tinta" />
                <p className="font-display text-[1.45rem] leading-tight font-extrabold md:text-[1.6rem]">
                  <span className="block whitespace-nowrap xl:inline">Seg a sex 9h–19h</span>
                  <span className="hidden text-destaque xl:inline" aria-hidden="true">
                    {' '}
                    ·{' '}
                  </span>
                  <span className="block whitespace-nowrap xl:inline">Sáb até 16h30</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-marca-escuro ring-[6px] ring-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.55)]">
              {/* TROCAR: foto real de um pet atendido no Pet Sobral (foto ilustrativa do Unsplash) */}
              <Foto imagem={imagens.hero} prioridade sizes="(min-width: 1024px) 34rem, (min-width: 640px) 26rem, 92vw" />
            </div>
            <a
              href={business.google.urlAvaliacoes}
              target="_blank"
              rel="noopener"
              aria-label={`Nota ${notaFormatada} no Google, ${business.google.avaliacoes} avaliações (abre em nova aba)`}
              className="absolute -bottom-6 -left-3 grid size-28 -rotate-6 place-items-center rounded-full bg-white text-center text-marca shadow-[0_12px_28px_-14px_rgb(0_0_0/0.7)] ring-4 ring-destaque transition-transform hover:rotate-0 md:size-32"
            >
              <span aria-hidden="true" className="leading-tight">
                <span className="block font-display text-3xl font-extrabold md:text-[2.1rem]">{notaFormatada}★</span>
                <span className="block text-xs font-bold">
                  {business.google.avaliacoes} avaliações
                  <br />
                  no Google
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
