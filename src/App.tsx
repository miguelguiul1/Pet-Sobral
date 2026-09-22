import { AvisoRevisao } from '@/components/Confirmar'
import { WhatsAppFab } from '@/components/WhatsAppFab'
import { Agendamento } from '@/components/sections/Agendamento'
import { Cabecalho } from '@/components/sections/Cabecalho'
import { Condominios } from '@/components/sections/Condominios'
import { Depoimentos } from '@/components/sections/Depoimentos'
import { Duvidas } from '@/components/sections/Duvidas'
import { Hero } from '@/components/sections/Hero'
import { Localizacao } from '@/components/sections/Localizacao'
import { PorQue } from '@/components/sections/PorQue'
import { Rodape } from '@/components/sections/Rodape'
import { Servicos } from '@/components/sections/Servicos'

export function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-lg bg-tinta px-4 py-3 font-bold text-creme focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <AvisoRevisao />
      <Cabecalho />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Servicos />
        <Agendamento />
        <PorQue />
        <Depoimentos />
        <Localizacao />
        <Condominios />
        <Duvidas />
      </main>
      <Rodape />
      <WhatsAppFab />
    </>
  )
}
