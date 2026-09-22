import type { ReactNode } from 'react'

/**
 * Marca visível de dado pendente. Todo uso está listado em PLACEHOLDERS.md.
 * `curto` aparece na tela; o texto completo fica acessível e no atributo data-placeholder.
 */
export function Confirmar({ children, curto }: { children?: ReactNode; curto?: string }) {
  const completo = children ?? '[CONFIRMAR COM O CLIENTE]'
  return (
    <span className={curto ? "marca-confirmar whitespace-nowrap" : "marca-confirmar inline-block max-w-full"} data-placeholder>
      {curto ? (
        <>
          <span aria-hidden="true">{curto}</span>
          <span className="sr-only">{completo}</span>
        </>
      ) : (
        completo
      )}
    </span>
  )
}
