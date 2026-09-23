import { Rotulo } from '@/components/Rotulo'
import { Clock, HandHeart, MessagesSquare, Tag } from 'lucide-react'
import { Foto } from '@/components/Foto'
import { business, notaFormatada } from '@/data/business'
import { imagens } from '@/data/imagens'

// Diferenciais extraídos só dos elogios reais das avaliações do Google.
const diferenciais = [
  {
    icone: MessagesSquare,
    titulo: 'Atendimento atencioso',
    texto: 'Atenção de verdade com você e com seu pet, do jeito que nossos clientes descrevem no Google. Ficou com dúvida? É só perguntar.',
  },
  {
    icone: HandHeart,
    titulo: 'Carinho com cada pet',
    texto: 'Nossa equipe trata seu pet com o cuidado que você teria em casa. É um dos elogios que mais recebemos.',
  },
  {
    icone: Tag,
    titulo: 'Preço justo no banho e tosa',
    texto: 'Preço justo, como dizem nossos clientes no Google. O valor pro seu pet a gente passa pelo WhatsApp.',
  },
  {
    icone: Clock,
    titulo: 'Horário que cabe na rotina',
    texto: 'De segunda a sexta até as 19h e sábado até 16h30. E produtos de qualidade na loja, outro elogio frequente.',
  },
]

export function PorQue() {
  return (
    <section aria-labelledby="porque-titulo" className="bg-creme-escuro py-16 md:py-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-creme ring-[6px] ring-white shadow-[0_30px_60px_-34px_rgb(30_43_37/0.6)]">
            {/* TROCAR: foto real da equipe com um pet (foto ilustrativa do Unsplash) */}
            <Foto imagem={imagens.carinho} sizes="(min-width: 1024px) 28rem, 90vw" />
          </div>
          <p className="absolute right-0 -bottom-4 max-w-[15rem] rounded-2xl bg-marca px-5 py-4 text-white shadow-lg ring-4 ring-white sm:-right-4">
            <span className="block font-display text-3xl font-extrabold text-mostarda">{notaFormatada} no Google</span>
            <span className="text-sm">com {business.google.avaliacoes} avaliações de clientes da região</span>
          </p>
        </div>

        <div>
          <Rotulo>Por que o Pet Sobral</Rotulo>
          <h2 id="porque-titulo" className="font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance md:text-5xl">
            Por que os vizinhos confiam no <em className="not-italic text-marca">Pet Sobral</em>
          </h2>
          <p className="mt-4 text-lg text-tinta-suave">
            Não somos nós que dizemos. É o que mais aparece nas {business.google.avaliacoes} avaliações do Google, com nota {notaFormatada}.
          </p>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {diferenciais.map(({ icone: Icone, titulo, texto }) => (
              <li key={titulo}>
                <span className="grid size-12 place-items-center rounded-full bg-marca text-creme">
                  <Icone aria-hidden="true" strokeWidth={1.75} className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-extrabold">{titulo}</h3>
                <p className="mt-1.5 text-tinta-suave">{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
