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
  ['texto suave / branco', '#4a5750', '#ffffff', 4.5],
  ['texto suave / creme escuro', '#4a5750', '#ebe3d3', 4.5],
  ['azul marca / creme (títulos, links)', '#3f3f95', '#f4efe4', 4.5],
  ['azul marca / branco (selo, pílulas, botão do topo)', '#3f3f95', '#ffffff', 4.5],
  ['azul marca escuro / branco (texto menor do selo)', '#2c2c6e', '#ffffff', 4.5],
  ['azul marca / azul claro (caixa Mercado Livre)', '#3f3f95', '#e3e3f3', 4.5],
  ['texto / azul claro (caixa Mercado Livre)', '#1e2b25', '#e3e3f3', 4.5],
  ['branco / azul marca (topo, rodapé, chips)', '#ffffff', '#3f3f95', 4.5],
  ['branco / azul marca escuro (condomínios)', '#ffffff', '#2c2c6e', 4.5],
  ['destaque / azul marca ("aqui do Socorro.", rótulo do topo)', '#c9c9ee', '#3f3f95', 4.5],
  ['destaque / azul marca escuro (condomínios)', '#c9c9ee', '#2c2c6e', 4.5],
  ['azul marca escuro / destaque (faixa do modo revisão)', '#2c2c6e', '#c9c9ee', 4.5],
  ['estrela / azul marca (estrelas, UI 3:1)', '#d9a441', '#3f3f95', 3],
  ['branco / zap', '#ffffff', '#0e6b45', 4.5],
  ['branco / zap escuro', '#ffffff', '#0a5537', 4.5],
  ['placeholder texto / fundo (modo revisão)', '#5c420b', '#f3e2b8', 4.5],
  ['borda input / branco (UI 3:1)', '#6e7772', '#ffffff', 3],
  ['zap / branco (ponto de status, UI 3:1)', '#0e6b45', '#ffffff', 3],
]
let falhou = false
for (const [nome, a, b, min] of pares) {
  const r = ratio(a, b)
  const ok = r >= min
  if (!ok) falhou = true
  console.log(`${ok ? 'ok ' : 'NÃO'} ${r.toFixed(2).padStart(5)}:1  (mín ${min})  ${nome}`)
}
process.exitCode = falhou ? 1 : 0
