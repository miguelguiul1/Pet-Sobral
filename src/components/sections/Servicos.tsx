import { ArrowRight } from 'lucide-react'
import { Confirmar, SoNaRevisao } from '@/components/Confirmar'
import { Foto } from '@/components/Foto'
import { IconeWhatsApp } from '@/components/IconeWhatsApp'
import { SeloPrecoJusto } from '@/components/SeloPrecoJusto'
import { imagens, type Imagem } from '@/data/imagens'
import { mensagens, urlWhatsApp, type Servico } from '@/lib/whatsapp'

export const EVENTO_ESCOLHER_SERVICO = 'petsobral:servico'

interface Card {
  titulo: string
  texto: string
  imagem: Imagem
  servico?: Servico
  acao: string
}

const cards: Card[] = [
  {
    titulo: 'Banho',
    texto: 'Banho com calma e carinho, para seu pet voltar pra casa limpinho e cheiroso.',
    imagem: imagens.banho,
    servico: 'Banho',
    acao: 'Agendar banho',
  },
  {
    titulo: 'Tosa',
    texto: 'Tosa feita com paciência pela nossa equipe. Conte como você gosta no campo de observações do agendamento.',
    imagem: imagens.tosa,
    servico: 'Tosa',
    acao: 'Agendar tosa',
  },
  {
    titulo: 'Banho + tosa',
    texto: 'Os dois na mesma visita: prático pra você, tranquilo pro seu pet.',
    imagem: imagens.banhoETosa,
    servico: 'Banho + tosa',
    acao: 'Agendar banho + tosa',
  },
  {
    titulo: 'Rações, produtos e acessórios',
    texto:
      'Rações, produtos e acessórios na loja, com a qualidade que nossos clientes elogiam no Google. Quer saber se tem o que você procura? Pergunte pelo WhatsApp.',
    imagem: imagens.produtos,
    acao: 'Perguntar pelo WhatsApp',
  },
]

function escolher(servico: Servico) {
  window.dispatchEvent(new CustomEvent<Servico>(EVENTO_ESCOLHER_SERVICO, { detail: servico }))
}

export function Servicos() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="bg-marca py-16 text-creme md:py-24">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <h2 id="servicos-titulo" className="font-display text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.015em] text-balance md:text-5xl">
              Banho e tosa no Socorro, e o que mais seu pet precisar
            </h2>
            <p className="mt-4 text-lg text-creme/95">
              Tudo num lugar só, pertinho de casa.{' '}
              <Confirmar neutro="O valor para o seu pet a gente passa pelo WhatsApp.">
                [CONFIRMAR COM O CLIENTE: texto com preços] Os preços abaixo são o ponto de partida; o valor certinho a gente passa
                pelo WhatsApp.
              </Confirmar>
            </p>
          </div>
          <SeloPrecoJusto claro />
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <li key={c.titulo} className="flex flex-col overflow-hidden rounded-cartao bg-cartao text-tinta">
              <div className="aspect-[4/3] overflow-hidden">
                {/* TROCAR: foto real do serviço no Pet Sobral (foto ilustrativa do Unsplash) */}
                <Foto
                  imagem={c.imagem}
                  sizes="(min-width: 1024px) 17rem, (min-width: 640px) 45vw, 92vw"
                  className="transition-transform duration-500 motion-safe:hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl font-semibold">{c.titulo}</h3>
                <p className="mt-2 flex-1 text-[0.98rem] text-tinta-suave">{c.texto}</p>
                {c.servico ? (
                  <>
                    <p className="mt-4 text-sm">
                      <Confirmar neutro={<span className="font-semibold text-tinta-suave">Valor pelo WhatsApp</span>}>
                        a partir de{' '}
                        <strong className="text-lg text-marca-escuro">
                          R$ <span className="marca-confirmar whitespace-nowrap">[CONFIRMAR] preço do {c.titulo.toLowerCase()}</span>
                        </strong>
                      </Confirmar>
                    </p>
                    <a
                      href="#agendamento"
                      onClick={() => escolher(c.servico!)}
                      className="group mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-marca hover:text-marca-escuro"
                    >
                      {c.acao}
                      <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </>
                ) : (
                  <a
                    href={urlWhatsApp(mensagens.produtos)}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-zap hover:text-zap-escuro"
                  >
                    <IconeWhatsApp className="size-5" />
                    {c.acao}
                    <span className="sr-only">(abre o WhatsApp)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        <SoNaRevisao>
          <p className="mt-6 text-sm text-creme/95">
            O valor pode variar conforme o porte e a pelagem do pet.{' '}
            <Confirmar>[CONFIRMAR COM O CLIENTE: o preço varia por porte/pelagem? quais faixas?]</Confirmar>
          </p>
        </SoNaRevisao>
      </div>
    </section>
  )
}
