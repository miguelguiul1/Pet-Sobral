#!/usr/bin/env node
/**
 * npm run imagens:placeholders
 * Gera imagens provisórias (blocos de cor com o nome do slot) para o site funcionar
 * antes de `npm run imagens`. Não sobrescreve fotos existentes, a menos que use --forcar.
 */
import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { fotos } from './fotos.config.mjs'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pasta = path.join(raiz, 'public', 'images')
const forcar = process.argv.includes('--forcar')
const tons = [
  ['#d8c6a6', '#b59570'],
  ['#c9b08d', '#9c7a58'],
  ['#d6bfa0', '#a8835e'],
]

await mkdir(pasta, { recursive: true })
let i = 0
for (const f of fotos) {
  const [a, b] = tons[i++ % tons.length]
  for (const w of f.larguras) {
    const arquivo = path.join(pasta, `${f.slot}-${w}.webp`)
    if (!forcar) {
      try {
        await access(arquivo)
        continue
      } catch {}
    }
    const h = Math.round(w * f.ratio)
    const fs = Math.round(w / 26)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" text-anchor="middle" font-family="sans-serif" font-size="${fs}" font-weight="700" letter-spacing="2" fill="#1E2B25" opacity=".55">FOTO ILUSTRATIVA</text>
      <text x="50%" y="${50 + (fs / h) * 170}%" text-anchor="middle" font-family="sans-serif" font-size="${fs * 0.75}" fill="#1E2B25" opacity=".5">${f.slot} · rode npm run imagens</text>
    </svg>`
    await sharp(Buffer.from(svg)).webp({ quality: 60 }).toFile(arquivo)
  }
}
try {
  await access(path.join(pasta, 'CREDITOS.md'))
} catch {
  await writeFile(
    path.join(pasta, 'CREDITOS.md'),
    '# Créditos das fotos ilustrativas\n\nAinda não há fotos baixadas: as imagens atuais são placeholders gerados localmente.\nRode `npm run imagens` para baixar as fotos do Unsplash e gerar os créditos.\n',
  )
}
console.log('Placeholders gerados em public/images/')
