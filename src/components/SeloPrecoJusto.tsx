import { cn } from '@/lib/utils'

/**
 * Selo "Preço justo no banho e tosa" — sempre atribuído aos clientes.
 * Nunca usar "mais barato" / "menor preço" / comparação com concorrentes.
 */
export function SeloPrecoJusto({ className, claro = false }: { className?: string; claro?: boolean }) {
  return (
    <p
      className={cn(
        'relative inline-flex max-w-full items-center gap-3 rounded-xl py-2.5 pr-4 pl-3',
        claro ? 'bg-creme text-tinta' : 'bg-mostarda text-tinta',
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-3 shrink-0 rounded-full', claro ? 'bg-mostarda' : 'bg-creme')} />
      <span className="leading-tight">
        <strong className="block text-[1.0625rem] font-extrabold tracking-[-0.005em]">Preço justo no banho e tosa</strong>
        <span className="text-[0.8125rem] font-semibold">é o que dizem nossos clientes no Google</span>
      </span>
    </p>
  )
}
