import * as LabelPrimitive from '@radix-ui/react-label'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const campo =
  'w-full rounded-xl border-2 border-input bg-cartao px-4 text-[1.0625rem] text-tinta placeholder:text-tinta-suave/80 transition-colors focus-visible:border-terracota focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-terracota/20 aria-invalid:border-destructive aria-invalid:ring-destructive/15'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input data-slot="input" className={cn(campo, 'h-13', className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(campo, 'min-h-28 py-3', className)} {...props} />
}

export function Label({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn('block font-bold text-tinta', className)}
      {...props}
    />
  )
}
