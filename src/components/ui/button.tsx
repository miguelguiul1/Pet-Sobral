import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/botao inline-flex items-center justify-center gap-2.5 text-center leading-tight font-bold transition-[background-color,transform,box-shadow] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        zap: 'bg-zap text-white hover:bg-zap-escuro shadow-[0_10px_24px_-12px_rgb(14_107_69/0.8)]',
        primario: 'bg-marca text-white hover:bg-marca-escuro',
        contorno: 'border-2 border-tinta/80 bg-transparent text-tinta hover:bg-tinta hover:text-creme',
        claro: 'bg-creme text-marca-escuro hover:bg-cartao',
        branco: 'bg-white text-marca hover:bg-creme shadow-[0_14px_30px_-14px_rgb(0_0_0/0.6)]',
        linkClaro: 'text-white underline decoration-2 decoration-mostarda underline-offset-4 hover:decoration-white',
        link: 'text-marca underline decoration-2 underline-offset-4 hover:text-marca-escuro hover:decoration-mostarda',
      },
      size: {
        lg: 'min-h-14 rounded-botao px-6 text-[1.0625rem]',
        md: 'min-h-12 rounded-botao px-5 text-base',
        sm: 'min-h-11 rounded-xl px-4 text-[0.9375rem]',
        link: 'min-h-11 px-1 text-base',
      },
    },
    defaultVariants: { variant: 'zap', size: 'lg' },
  },
)

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}


