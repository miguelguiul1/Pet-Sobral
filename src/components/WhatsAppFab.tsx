import { useEffect, useState } from 'react'
import { IconeWhatsApp } from '@/components/IconeWhatsApp'
import { cn } from '@/lib/utils'
import { mensagens, urlWhatsApp } from '@/lib/whatsapp'

/**
 * Botão flutuante do WhatsApp, em todas as telas.
 * Some onde já existe um botão de WhatsApp visível ([data-esconde-fab]: CTA do topo, formulário
 * de agendamento, rodapé) e com o menu do celular aberto (CSS em index.css). No celular é só o
 * ícone (56 px), para cobrir o mínimo de conteúdo.
 */
export function WhatsAppFab() {
  // Começa escondido: no carregamento o CTA do topo (WhatsApp) já está na tela
  const [escondido, setEscondido] = useState(true)

  useEffect(() => {
    const alvos = document.querySelectorAll('[data-esconde-fab]')
    // Sem IntersectionObserver (navegadores muito antigos) o botão fica oculto; o CTA do topo cobre o caso
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
      { rootMargin: '0px' },
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
        'group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 inline-flex size-14 items-center justify-center gap-2 rounded-full bg-zap font-bold sm:w-auto sm:pr-5 sm:pl-4 text-white shadow-[0_14px_30px_-10px_rgb(14_107_69/0.75)] transition-[transform,opacity] duration-300 hover:bg-zap-escuro md:right-6 md:bottom-6',
        escondido && 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <IconeWhatsApp className="size-6 motion-safe:group-hover:animate-balanco" />
      <span className="hidden text-[0.95rem] sm:inline">Fale com a gente</span>
    </a>
  )
}
