import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Rótulo de seção na linguagem do logo: o cachorro em traço + texto em caixa alta.
 * `claro` = versão para fundo azul.
 */
export function Rotulo({ children, claro = false, className }: { children: ReactNode; claro?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        'mb-4 flex items-center gap-2.5 text-[0.8rem] font-extrabold uppercase tracking-[0.14em] sm:text-sm',
        claro ? 'text-white' : 'text-marca',
        className,
      )}
    >
      <img
        src={claro ? '/marca/cachorro-branco.svg' : '/marca/cachorro-azul.svg'}
        alt=""
        width={1470}
        height={485}
        loading="lazy"
        decoding="async"
        className="h-5 w-auto shrink-0"
      />
      {children}
    </p>
  )
}
