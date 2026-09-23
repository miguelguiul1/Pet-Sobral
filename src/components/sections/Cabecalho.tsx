import { Logo } from '@/components/Logo'
import { StatusLoja } from '@/components/StatusLoja'

const links = [
  { href: '#servicos', rotulo: 'Serviços' },
  { href: '#agendamento', rotulo: 'Agendar' },
  { href: '#condominios', rotulo: 'Condomínios' },
  { href: '#duvidas', rotulo: 'Dúvidas' },
  { href: '#localizacao', rotulo: 'Como chegar' },
]

/** Cabeçalho sobre o azul da marca, com o logo branco (como no logo original). */
export function Cabecalho() {
  return (
    <header className="container-site flex items-center justify-between gap-4 pt-4 pb-2 md:pt-6">
      <a href="/" aria-label="Pet Sobral, página inicial" className="rounded-md">
        <Logo variante="branco" className="w-[5.75rem] md:w-[7.25rem]" />
      </a>
      <nav aria-label="Seções do site" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-11 items-center rounded-lg px-3 font-bold text-white transition-colors hover:bg-white/12"
              >
                {l.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <StatusLoja compacto className="rounded-full bg-white px-3 py-1.5 text-tinta" />
    </header>
  )
}
