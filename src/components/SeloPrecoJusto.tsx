import { cn } from '@/lib/utils'

/**
 * Selo "Preço justo no banho e tosa": cartão branco com texto azul (cores do logo).
 * Sempre atribuído aos clientes. Nunca usar "mais barato" / "menor preço" / comparação com concorrentes.
 */
export function SeloPrecoJusto({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        'relative inline-flex max-w-full items-center gap-3 rounded-xl bg-white py-2.5 pr-4 pl-3 text-marca ring-1 ring-marca/15',
        className,
      )}
    >
      <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-marca" />
      <span className="leading-tight">
        <strong className="block text-[1.0625rem] font-extrabold tracking-[-0.005em]">Preço justo no banho e tosa</strong>
        <span className="text-[0.8125rem] font-semibold text-marca-escuro">é o que dizem nossos clientes no Google</span>
      </span>
    </p>
  )
}
