import { useEffect, useState } from 'react'
import { IconeWhatsApp } from '@/components/IconeWhatsApp'
import { cn } from '@/lib/utils'
import { mensagens, urlWhatsApp } from '@/lib/whatsapp'

/**
 * Botão flutuante do WhatsApp, em todas as telas.
 * Some só enquanto o formulário de agendamento está na tela, para não cobrir o botão "Enviar".
 */
export function WhatsAppFab() {
  const [escondido, setEscondido] = useState(false)

  useEffect(() => {
    const alvos = document.querySelectorAll('[data-esconde-fab]')
    if (!alvos.length || !('IntersectionObserver' in window)) return
    const visiveis = new Set<Element>()
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) visiveis.add(e.target)
          else visiveis.delete(e.target)
        }
        setEscondido(visiveis.size > 0)
      },
      { rootMargin: '-15% 0px -15% 0px' },
    )
    alvos.forEach((a) => io.observe(a))
    return () => io.disconnect()
  }, [])

  return (
    <a
      href={urlWhatsApp(mensagens.geral)}
      target="_blank"
      rel="noopener"
      aria-label="Conversar com o Pet Sobral no WhatsApp (abre o WhatsApp)"
      aria-hidden={escondido || undefined}
      tabIndex={escondido ? -1 : undefined}
      data-fab-whatsapp
      className={cn(
        'group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 inline-flex h-14 items-center gap-2 rounded-full bg-zap pr-5 pl-4 font-bold text-white shadow-[0_14px_30px_-10px_rgb(14_107_69/0.75)] transition-[transform,opacity] duration-300 hover:bg-zap-escuro md:right-6 md:bottom-6',
        escondido && 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <IconeWhatsApp className="size-6 motion-safe:group-hover:animate-balanco" />
      <span className="text-[0.95rem]">Fale com a gente</span>
    </a>
  )
}
