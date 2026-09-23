import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Logo } from '@/components/Logo'
import { StatusLoja } from '@/components/StatusLoja'
import { ordemSecoes } from '@/data/navegacao'
import { useSecaoAtiva } from '@/hooks/useSecaoAtiva'
import { cn } from '@/lib/utils'

const ids = ordemSecoes.map((s) => s.id)

/**
 * Cabeçalho sobre o azul da marca. O menu lista as seções na ordem da página
 * (fonte única: src/data/navegacao.ts). No celular, as seções ficam no botão "Menu".
 */
export function Cabecalho() {
  const ativa = useSecaoAtiva(ids)
  const [aberto, setAberto] = useState(false)
  const idPainel = useId()
  const botaoRef = useRef<HTMLButtonElement>(null)
  const painelRef = useRef<HTMLDivElement>(null)

  // Menu aberto: trava a rolagem da página e esconde o botão flutuante (CSS em index.css)
  useEffect(() => {
    document.documentElement.toggleAttribute('data-menu-aberto', aberto)
    return () => document.documentElement.removeAttribute('data-menu-aberto')
  }, [aberto])

  // Fecha com Esc (devolvendo o foco ao botão) e ao tocar fora do menu
  useEffect(() => {
    if (!aberto) return
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAberto(false)
        botaoRef.current?.focus()
      }
    }
    const clique = (e: PointerEvent) => {
      const alvo = e.target as Node
      if (!painelRef.current?.contains(alvo) && !botaoRef.current?.contains(alvo)) setAberto(false)
    }
    document.addEventListener('keydown', tecla)
    document.addEventListener('pointerdown', clique)
    return () => {
      document.removeEventListener('keydown', tecla)
      document.removeEventListener('pointerdown', clique)
    }
  }, [aberto])

  return (
    <header className="relative">
      <div className="container-site flex items-center justify-between gap-4 pt-4 pb-2 md:pt-6">
        <a href="/" aria-label="Pet Sobral, página inicial" className="shrink-0 rounded-md">
          <Logo variante="branco" className="w-[5.75rem] md:w-[7.25rem]" />
        </a>

        <nav aria-label="Seções do site" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {ordemSecoes.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={ativa === s.id ? 'location' : undefined}
                  className={cn(
                    'inline-flex min-h-11 items-center rounded-lg px-2.5 text-[0.95rem] font-bold whitespace-nowrap text-white transition-colors hover:bg-white/12 xl:px-3',
                    'aria-[current=location]:bg-white aria-[current=location]:text-marca',
                  )}
                >
                  {s.menu}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <StatusLoja compacto className="hidden rounded-full bg-white px-3 py-1.5 text-tinta sm:inline-flex lg:hidden xl:inline-flex" />
          <button
            ref={botaoRef}
            type="button"
            aria-expanded={aberto}
            aria-controls={idPainel}
            onClick={() => setAberto((a) => !a)}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-white/70 px-3.5 font-bold text-white transition-colors hover:bg-white/12 lg:hidden"
          >
            {aberto ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            Menu
          </button>
        </div>
      </div>

      {/* Menu do celular: as mesmas seções, na ordem da página */}
      <div
        ref={painelRef}
        id={idPainel}
        hidden={!aberto}
        className="absolute inset-x-0 top-full z-50 px-4 pt-2 lg:hidden"
      >
        <nav aria-label="Seções do site (menu)" className="rounded-cartao bg-white p-2 text-tinta shadow-[0_24px_50px_-20px_rgb(0_0_0/0.5)]">
          <ul>
            {ordemSecoes.map((s, i) => (
              <li key={s.id} className={cn(i > 0 && 'border-t border-border')}>
                <a
                  href={`#${s.id}`}
                  aria-current={ativa === s.id ? 'location' : undefined}
                  onClick={() => setAberto(false)}
                  className="flex min-h-12 items-center justify-between rounded-xl px-4 text-lg font-bold hover:bg-creme aria-[current=location]:text-marca"
                >
                  {s.menu}
                  <span aria-hidden="true" className="text-marca">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
