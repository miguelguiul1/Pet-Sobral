#!/usr/bin/env node
/**
 * npm run imagens
 *
 * Baixa as fotos ILUSTRATIVAS do Unsplash listadas em scripts/fotos.config.mjs,
 * recorta/redimensiona com sharp, salva em public/images/{slot}-{largura}.webp
 * e gera public/images/CREDITOS.md e public/images/_previa.html.
 *
 * Node puro (sem bash / comandos Unix): funciona no Windows (PowerShell), macOS e Linux.
 * Requer Node 20+ (fetch nativo).
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { fotos } from './fotos.config.mjs'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pasta = path.join(raiz, 'public', 'images')
const UA = { 'User-Agent': 'pet-sobral-prototipo/1.0 (script de imagens)' }

const idDaUrl = (url) => url.replace(/[?#].*$/, '').split('/').pop().split('-').pop()

async function json(url) {
  const r = await fetch(url, { headers: { ...UA, Accept: 'application/json' } })
  if (!r.ok) throw new Error(`HTTP ${r.status} em ${url}`)
  return r.json()
}

/** Metadados da foto: tenta o endpoint público do site e cai para o oEmbed oficial. */
async function metadados(urlFoto) {
  const id = idDaUrl(urlFoto)
  try {
    const d = await json(`https://unsplash.com/napi/photos/${id}`)
    if (d.premium || d.plus) throw new Error('foto Unsplash+ (paga), pulando')
    return {
      id,
      autor: d.user?.name,
      urlAutor: d.user?.links?.html,
      urlFoto: d.links?.html ?? urlFoto,
      descricao: d.alt_description ?? d.description ?? '',
      urlImagem: `${d.urls.raw}&fm=jpg&q=85&w=2000`,
    }
  } catch (e) {
    if (String(e.message).includes('Unsplash+')) throw e
    const o = await json(
      `https://unsplash.com/oembed?url=${encodeURIComponent(`https://unsplash.com/photos/${id}`)}`,
    ).catch((e2) => {
      throw new Error(`${e.message}; oEmbed: ${e2.message}`)
    })
    return {
      id,
      autor: o.author_name,
      urlAutor: o.author_url,
      urlFoto: `https://unsplash.com/photos/${id}`,
      descricao: o.title ?? '',
      urlImagem: `https://unsplash.com/photos/${id}/download?force=true`,
    }
  }
}

async function baixar(url) {
  const r = await fetch(url, { headers: UA, redirect: 'follow' })
  if (!r.ok) throw new Error(`HTTP ${r.status} ao baixar a imagem`)
  const tipo = r.headers.get('content-type') ?? ''
  if (!tipo.startsWith('image/')) throw new Error(`resposta não é imagem (${tipo})`)
  return Buffer.from(await r.arrayBuffer())
}

await mkdir(pasta, { recursive: true })
const creditos = []
const falhas = []

for (const f of fotos) {
  let ok = false
  for (const candidata of f.candidatas) {
    try {
      process.stdout.write(`• ${f.slot}: ${candidata} ... `)
      const meta = await metadados(candidata)
      const original = await baixar(meta.urlImagem)
      for (const w of f.larguras) {
        await sharp(original)
          .rotate()
          .resize({ width: w, height: Math.round(w * f.ratio), fit: 'cover', position: sharp.strategy.attention })
          .webp({ quality: 76, effort: 5 })
          .toFile(path.join(pasta, `${f.slot}-${w}.webp`))
      }
      creditos.push({ ...f, ...meta })
      console.log(`ok (${meta.autor ?? 'autor não informado'})`)
      ok = true
      break
    } catch (e) {
      console.log(`falhou: ${e.message}`)
    }
  }
  if (!ok) falhas.push(f.slot)
}

const linhas = [
  '# Créditos das fotos ilustrativas',
  '',
  'Fotos do [Unsplash](https://unsplash.com), sob a [Licença Unsplash](https://unsplash.com/license).',
  'São **ilustrativas**: na versão final serão trocadas por fotos reais do Pet Sobral.',
  '',
  'Gerado por `npm run imagens`. Os dados de autor vêm do próprio Unsplash; se algum campo',
  'aparecer como "não informado", confira na página da foto.',
  '',
  '| Arquivo | Onde aparece | Foto | Autor |',
  '|---|---|---|---|',
  ...creditos.map(
    (c) =>
      `| \`${c.slot}-*.webp\` | ${c.uso} | [${c.id}](${c.urlFoto}) | ${
        c.autor ? `[${c.autor}](${c.urlAutor ?? c.urlFoto})` : 'não informado'
      } |`,
  ),
  '',
]
if (falhas.length) linhas.push('## Sem foto (placeholder mantido)', '', ...falhas.map((s) => `- ${s}`), '')
await writeFile(path.join(pasta, 'CREDITOS.md'), linhas.join('\n'))

const previa = `<!doctype html><meta charset="utf-8"><title>Prévia das fotos</title>
<style>body{font:14px system-ui;margin:24px;background:#f4efe4}div{display:inline-block;margin:0 16px 24px 0;vertical-align:top;max-width:320px}img{width:320px;display:block;border-radius:12px}</style>
<h1>Prévia das fotos ilustrativas</h1><p>Confira se cada foto combina com o uso. Para trocar, edite scripts/fotos.config.mjs e rode npm run imagens de novo.</p>
${fotos
  .map((f) => `<div><img src="${f.slot}-${f.larguras.at(-1)}.webp" alt=""><b>${f.slot}</b><br>${f.uso}</div>`)
  .join('\n')}`
await writeFile(path.join(pasta, '_previa.html'), previa)

console.log(`\n${creditos.length} de ${fotos.length} fotos baixadas. Créditos em public/images/CREDITOS.md`)
if (falhas.length) {
  console.log(`Sem foto: ${falhas.join(', ')}. Troque as URLs em scripts/fotos.config.mjs e rode de novo.`)
  process.exitCode = 1
}
