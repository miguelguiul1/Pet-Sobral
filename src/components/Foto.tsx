import type { Imagem } from '@/data/imagens'
import { cn } from '@/lib/utils'

/** Foto responsiva em WebP com dimensões explícitas (sem CLS). `prioridade` = imagem LCP. */
export function Foto({
  imagem,
  sizes,
  prioridade = false,
  className,
}: {
  imagem: Imagem
  sizes: string
  prioridade?: boolean
  className?: string
}) {
  const maior = imagem.larguras[imagem.larguras.length - 1]
  return (
    <img
      src={`/images/${imagem.slot}-${maior}.webp`}
      srcSet={imagem.larguras.map((w) => `/images/${imagem.slot}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      width={maior}
      height={Math.round(maior * imagem.ratio)}
      alt={imagem.alt}
      loading={prioridade ? 'eager' : 'lazy'}
      decoding={prioridade ? 'auto' : 'async'}
      fetchPriority={prioridade ? 'high' : 'auto'}
      className={cn('block h-full w-full object-cover', className)}
    />
  )
}
