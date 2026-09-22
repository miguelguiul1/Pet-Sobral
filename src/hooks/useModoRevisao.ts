import { useSyncExternalStore } from 'react'

/**
 * Modo de revisão dos placeholders: ativo com ?revisao=1 na URL.
 * Padrão (e HTML pré-renderizado): desligado, nenhuma marca [CONFIRMAR] aparece.
 * No servidor/hidratação retorna false; no cliente lê a URL (sem erro de hidratação).
 */
const semAssinatura = () => () => {}
const lerUrl = () => new URLSearchParams(window.location.search).get('revisao') === '1'
const noServidor = () => false

export function useModoRevisao(): boolean {
  return useSyncExternalStore(semAssinatura, lerUrl, noServidor)
}
