import type { ReactNode } from 'react'
import { useModoRevisao } from '@/hooks/useModoRevisao'

/**
 * Dado pendente de confirmação com o cliente. Todo uso está listado em PLACEHOLDERS.md.
 *
 * - Modo padrão: mostra `neutro` (texto verdadeiro que não inventa nada) ou nada.
 * - Modo revisão (?revisao=1): mostra a marca destacada. `curto` aparece na tela e o texto
 *   completo fica acessível e no atributo data-placeholder.
 */
export function Confirmar({ children, curto, neutro }: { children: ReactNode; curto?: string; neutro?: ReactNode }) {
  const revisao = useModoRevisao()
  if (!revisao) return neutro ?? null
  return (
    <span className={curto ? 'marca-confirmar whitespace-nowrap' : 'marca-confirmar inline-block max-w-full'} data-placeholder>
      {curto ? (
        <>
          <span aria-hidden="true">{curto}</span>
          <span className="sr-only">{children}</span>
        </>
      ) : (
        children
      )}
    </span>
  )
}

/** Mostra o conteúdo só no modo revisão (para blocos que não têm texto neutro possível). */
export function SoNaRevisao({ children }: { children: ReactNode }) {
  return useModoRevisao() ? children : null
}

/** Faixa fixa avisando que o modo revisão está ligado. */
export function AvisoRevisao() {
  const revisao = useModoRevisao()
  if (!revisao) return null
  return (
    <div role="status" className="sticky top-0 z-[55] bg-mostarda px-4 py-2 text-center text-sm font-bold text-tinta">
      Modo revisão: os trechos listrados dependem de confirmação com o Pet Sobral. Sem <code>?revisao=1</code>, o site mostra
      só textos confirmados.
    </div>
  )
}
