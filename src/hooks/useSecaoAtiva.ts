import { useEffect, useState } from 'react'

/** Id da seção que está no meio da tela (para marcar o item do menu com aria-current). */
export function useSecaoAtiva(ids: readonly string[]): string | null {
  const [ativa, setAtiva] = useState<string | null>(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtiva(e.target.id)
      },
      // faixa fina no meio da tela: só uma seção "ativa" por vez
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return ativa
}
