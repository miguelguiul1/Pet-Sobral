#!/usr/bin/env node
// Verifica contraste WCAG das combinações de cor usadas no site. node scripts/contraste.mjs
const lum = (hex) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => {
    const c = parseInt(x, 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}
const pares = [
  ['texto / creme', '#1e2b25', '#f4efe4', 4.5],
  ['texto suave / creme', '#4a5750', '#f4efe4', 4.5],
  ['texto suave / cartão', '#4a5750', '#fbf8f1', 4.5],
  ['texto suave / creme escuro', '#4a5750', '#ebe3d3', 4.5],
  ['terracota / creme', '#9c4a2a', '#f4efe4', 4.5],
  ['terracota / cartão', '#9c4a2a', '#fbf8f1', 4.5],
  ['branco / terracota', '#ffffff', '#9c4a2a', 4.5],
  ['creme / terracota', '#f4efe4', '#9c4a2a', 4.5],
  ['creme / terracota escuro', '#f4efe4', '#7f3a1f', 4.5],
  ['terracota claro / terracota escuro', '#f0d9cc', '#7f3a1f', 4.5],
  ['texto / mostarda', '#1e2b25', '#d9a441', 4.5],
  ['texto / mostarda claro', '#1e2b25', '#f3e2b8', 4.5],
  ['branco / zap', '#ffffff', '#0e6b45', 4.5],
  ['branco / zap escuro', '#ffffff', '#0a5537', 4.5],
  ['creme / tinta', '#f4efe4', '#1e2b25', 4.5],
  ['mostarda / tinta', '#d9a441', '#1e2b25', 4.5],
  ['placeholder texto / fundo', '#5c420b', '#f3e2b8', 4.5],
  ['borda input / creme (UI 3:1)', '#6e7772', '#f4efe4', 3],
  ['zap / creme (ponto de status, UI 3:1)', '#0e6b45', '#f4efe4', 3],
]
let falhou = false
for (const [nome, a, b, min] of pares) {
  const r = ratio(a, b)
  const ok = r >= min
  if (!ok) falhou = true
  console.log(`${ok ? 'ok ' : 'NÃO'} ${r.toFixed(2).padStart(5)}:1  (mín ${min})  ${nome}`)
}
process.exitCode = falhou ? 1 : 0
