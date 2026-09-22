import { useSyncExternalStore } from 'react'

/**
 * Hora atual, só no navegador (atualiza a cada 30 s). No HTML pré-renderizado e na hidratação
 * retorna null, para nunca exibir um "Aberto agora" congelado na hora do build.
 */
let atual: Date | null = null
let timer: number | undefined
const ouvintes = new Set<() => void>()

function assinar(avisar: () => void) {
  ouvintes.add(avisar)
  if (timer === undefined) {
    timer = window.setInterval(() => {
      atual = new Date()
      ouvintes.forEach((f) => f())
    }, 30_000)
  }
  return () => {
    ouvintes.delete(avisar)
    if (!ouvintes.size) {
      window.clearInterval(timer)
      timer = undefined
    }
  }
}

const noCliente = () => (atual ??= new Date())
const noServidor = () => null

export function useAgora(): Date | null {
  return useSyncExternalStore(assinar, noCliente, noServidor)
}
