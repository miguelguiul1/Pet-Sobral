#!/usr/bin/env node
/**
 * npm run og — gera public/og-image.jpg (1200×630) a partir de scripts/og/og.html,
 * usando a foto atual do hero. Rode de novo depois de `npm run imagens`.
 * Requer o navegador do Playwright: npx playwright install chromium
 */
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'
import sharp from 'sharp'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto(pathToFileURL(path.join(raiz, 'scripts', 'og', 'og.html')).href)
await page.evaluate(() => document.fonts.ready)
const png = await page.screenshot({ type: 'png' })
await browser.close()
await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(raiz, 'public', 'og-image.jpg'))
console.log('public/og-image.jpg gerado')
