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
  ['azul marca / creme (títulos, links)', '#3f3f95', '#f4efe4', 4.5],
  ['azul marca / cartão', '#3f3f95', '#fbf8f1', 4.5],
  ['azul marca escuro / cartão', '#2c2c6e', '#fbf8f1', 4.5],
  ['branco / azul marca (botões, chips)', '#ffffff', '#3f3f95', 4.5],
  ['creme / azul marca (seção Serviços)', '#f4efe4', '#3f3f95', 4.5],
  ['creme / azul marca escuro (rodapé)', '#f4efe4', '#2c2c6e', 4.5],
  ['mostarda claro / azul marca escuro (títulos do rodapé)', '#f3e2b8', '#2c2c6e', 4.5],
  ['mostarda / azul marca escuro (texto grande 3:1)', '#d9a441', '#2c2c6e', 3],
  ['texto / mostarda', '#1e2b25', '#d9a441', 4.5],
  ['texto / mostarda claro', '#1e2b25', '#f3e2b8', 4.5],
  ['branco / zap', '#ffffff', '#0e6b45', 4.5],
  ['branco / zap escuro', '#ffffff', '#0a5537', 4.5],
  ['creme / tinta', '#f4efe4', '#1e2b25', 4.5],
  ['mostarda / tinta (condomínios)', '#d9a441', '#1e2b25', 4.5],
  ['placeholder texto / fundo', '#5c420b', '#f3e2b8', 4.5],
  ['borda input / creme (UI 3:1)', '#6e7772', '#f4efe4', 3],
  ['zap / creme (ponto de status, UI 3:1)', '#0e6b45', '#f4efe4', 3],
  ['texto suave / creme (ponto fechado, UI 3:1)', '#4a5750', '#f4efe4', 3],
]
let falhou = false
for (const [nome, a, b, min] of pares) {
  const r = ratio(a, b)
  const ok = r >= min
  if (!ok) falhou = true
  console.log(`${ok ? 'ok ' : 'NÃO'} ${r.toFixed(2).padStart(5)}:1  (mín ${min})  ${nome}`)
}
process.exitCode = falhou ? 1 : 0
