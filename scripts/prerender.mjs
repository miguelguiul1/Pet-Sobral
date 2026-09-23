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
// Fonte do título (Figtree, subset latino): o H1 é o elemento LCP
const fontesTitulo = assets.filter((a) => /^figtree-latin-wght-normal.*\.woff2$/.test(a))

// CSS inline (≈9 kB gzip): elimina a requisição que bloqueia a renderização
const cssLink = html.match(/<link rel="stylesheet"[^>]*href="\/assets\/([^"]+\.css)"[^>]*>/)
if (cssLink) {
  const css = await readFile(path.join(dist, 'assets', cssLink[1]), 'utf8')
  html = html.replace(cssLink[0], () => `<style>${css}</style>`)
}

// Preload da foto do hero (elemento LCP), com o mesmo srcset/sizes do <img>
const hero = { slot: 'hero-cachorro-pos-banho', larguras: [480, 760, 1120] }
const heroSizes = '(min-width: 1024px) 34rem, (min-width: 640px) 26rem, 92vw'
const preloadHero = `<link rel="preload" as="image" type="image/webp" fetchpriority="high" imagesrcset="${hero.larguras
  .map((w) => `/images/${hero.slot}-${w}.webp ${w}w`)
  .join(', ')}" imagesizes="${heroSizes}" />`

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
    fontesTitulo.map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`).join('') +
      preloadHero,
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
