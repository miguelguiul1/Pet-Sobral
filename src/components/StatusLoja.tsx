import { business } from '@/data/business'
import { useAgora } from '@/hooks/useAgora'
import { statusLoja } from '@/lib/opening-hours'
import { cn } from '@/lib/utils'

const cores = {
  aberto: 'bg-zap',
  fechando: 'bg-mostarda',
  fechado: 'bg-terracota',
} as const

/**
 * "Aberto agora / Fecha às X / Fechado" calculado no fuso America/Sao_Paulo.
 * Antes de hidratar mostra o horário fixo (estado neutro).
 */
export function StatusLoja({ className, compacto = false }: { className?: string; compacto?: boolean }) {
  const agora = useAgora()
  const s = agora ? statusLoja(agora) : null
  return (
    <p
      className={cn('inline-flex items-center gap-2 text-sm font-semibold', className)}
      data-status-loja={s?.estado ?? 'neutro'}
      aria-live="polite"
    >
      {s ? (
        <>
          <span
            aria-hidden="true"
            className={cn('size-2.5 shrink-0 rounded-full', cores[s.estado], s.estado === 'aberto' && 'motion-safe:animate-pulse')}
          />
          <span>
            <span className="font-bold">{s.titulo}</span>
            {!compacto || s.estado === 'fechado' ? <span className="font-medium"> · {s.detalhe}</span> : null}
          </span>
        </>
      ) : (
        <span className="font-medium">{business.horarioTexto.curto}</span>
      )}
    </p>
  )
}
