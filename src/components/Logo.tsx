import { cn } from '@/lib/utils'

/**
 * LOGO PROVISÓRIO (tipográfico) — [CONFIRMAR COM O CLIENTE] substituir pelo logo oficial, se existir.
 * A plaquinha de coleira pende do "l" final e fica sempre dentro da caixa do componente
 * (padding inferior/direito reservado), para não cortar nem transbordar em telas estreitas.
 */
export function Logo({ className, comLocal = false }: { className?: string; comLocal?: boolean }) {
  return (
    <span
      className={cn('group/logo inline-flex flex-col items-start pb-[0.34em] pr-[0.08em] leading-none', className)}
      data-logo-provisorio
    >
      <span className="font-display whitespace-nowrap font-semibold tracking-[-0.02em] text-tinta">
        <em className="font-medium text-terracota">Pet</em> Sobra
        <span className="relative inline-block">
          l
          <svg
            data-plaquinha
            aria-hidden="true"
            viewBox="0 0 34 46"
            className="absolute left-1/2 top-[0.8em] h-[0.42em] w-[0.31em] -translate-x-1/2 -rotate-6 origin-top overflow-visible motion-safe:group-hover/logo:animate-balanco"
          >
            <line x1="17" y1="0" x2="17" y2="12" stroke="currentColor" strokeWidth="4" />
            <circle cx="17" cy="29" r="16" fill="var(--color-mostarda)" />
            <circle cx="17" cy="19" r="3.5" fill="var(--color-creme)" />
          </svg>
        </span>
      </span>
      {comLocal && (
        <span className="mt-[0.5em] font-sans text-[0.26em] font-bold uppercase tracking-[0.18em] text-tinta">
          Socorro · São Paulo
        </span>
      )}
    </span>
  )
}
