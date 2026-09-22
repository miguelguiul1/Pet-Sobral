#!/usr/bin/env node
// Gera favicon-32.png e apple-touch-icon.png a partir de public/favicon.svg. node scripts/gerar-icones.mjs
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const pub = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public')
const svg = await readFile(path.join(pub, 'favicon.svg'))
await sharp(svg, { density: 300 }).resize(32, 32).png().toFile(path.join(pub, 'favicon-32.png'))
await sharp(svg, { density: 600 }).resize(180, 180).flatten({ background: '#9c4a2a' }).png().toFile(path.join(pub, 'apple-touch-icon.png'))
console.log('ícones gerados')
