#!/usr/bin/env node
/**
 * Pós-build: injeta o HTML pré-renderizado, JSON-LD, preload da fonte do título e a política de
 * indexação em dist/index.html; gera robots.txt e sitemap.xml.
 *
 * Indexação (VITE_SITE_INDEXAVEL):
 *   false (padrão, preview): <meta name="robots" content="noindex, nofollow"> + robots.txt "Disallow: /"
 *                            (o header X-Robots-Tag fica em vercel.json)
 *   true  (após aprovação):   index, follow + robots.txt liberado com sitemap
 */
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(raiz, 'dist')
const env = { ...loadEnv('production', raiz, 'VITE_'), ...process.env }
const siteUrl = (env.VITE_SITE_URL || 'https://pet-sobral-preview.vercel.app').replace(/\/$/, '')
const indexavel = env.VITE_SITE_INDEXAVEL === 'true'

const { render, jsonLd } = await import(pathToFileURL(path.join(raiz, 'dist-ssr', 'entry-server.js')).href)

let html = await readFile(path.join(dist, 'index.html'), 'utf8')
const assets = await readdir(path.join(dist, 'assets'))
const fonteTitulo = assets.find((a) => /^fraunces-latin-soft-normal.*\.woff2$/.test(a))

html = html
  .replace('<!--app-html-->', render())
  .replace(
    '<!--robots-->',
    indexavel
      ? '<meta name="robots" content="index, follow, max-image-preview:large" />'
      : '<meta name="robots" content="noindex, nofollow" />',
  )
  .replace(
    '<!--preload-->',
    fonteTitulo ? `<link rel="preload" href="/assets/${fonteTitulo}" as="font" type="font/woff2" crossorigin />` : '',
  )
  .replace('<!--jsonld-->', `<script type="application/ld+json">${jsonLd(siteUrl)}</script>`)

await writeFile(path.join(dist, 'index.html'), html)

await writeFile(
  path.join(dist, 'robots.txt'),
  indexavel
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
    : `# Preview: não indexar até o dono aprovar o site.\nUser-agent: *\nDisallow: /\n`,
)

const hoje = new Date().toISOString().slice(0, 10)
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${hoje}</lastmod>\n  </url>\n</urlset>\n`,
)

await rm(path.join(raiz, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerender ok · ${siteUrl} · ${indexavel ? 'INDEXÁVEL' : 'noindex (preview)'}`)
