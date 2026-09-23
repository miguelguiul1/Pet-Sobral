import { cn } from '@/lib/utils'

/**
 * Logo do Pet Sobral: vetorizado (SVG) a partir da imagem do logo recebida (JPG 365×365).
 * [CONFIRMAR COM O CLIENTE] pedir o arquivo original (PDF/SVG/AI/PNG grande) e trocar os arquivos em public/marca/.
 * Proporção do desenho: 1498 × 725 (o pé do "L" final foi reconstruído: o JPG recebido vinha cortado na borda).
 */
export function Logo({ className, variante = 'azul' }: { className?: string; variante?: 'azul' | 'branco' }) {
  return (
    <img
      src={`/marca/logo-${variante}.svg`}
      alt="Pet Sobral"
      width={1498}
      height={725}
      decoding="async"
      data-logo
      className={cn('block h-auto', className)}
    />
  )
}
