import svg from '@/assets/marca/cachorro.svg?raw'
import { cn } from '@/lib/utils'

/** O cachorro em traço do logo, inline (herda a cor via currentColor). Decorativo. */
export function CachorroTraco({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('block [&>svg]:block [&>svg]:h-auto [&>svg]:w-full', className)} dangerouslySetInnerHTML={{ __html: svg }} />
}
