import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const status = (page: import('@playwright/test').Page) => page.locator('header [data-status-loja]')

test.describe('Aberto agora (fuso de SP, navegador em Tóquio)', () => {
  const casos: Array<[string, string]> = [
    ['2026-09-21T10:00:00-03:00', 'Aberto agora'],
    ['2026-09-21T18:30:00-03:00', 'Fecha às 19h'],
    ['2026-09-21T19:00:00-03:00', 'Fechado · abre amanhã às 9h'],
    ['2026-09-26T16:00:00-03:00', 'Fecha às 16h30'],
    ['2026-09-26T16:30:00-03:00', 'Fechado · abre segunda às 9h'],
    ['2026-09-27T11:00:00-03:00', 'Fechado · abre amanhã às 9h'],
  ]
  for (const [quando, texto] of casos) {
    test(`${quando} → ${texto}`, async ({ page }) => {
      await page.clock.setFixedTime(new Date(quando))
      await page.goto('/')
      await expect(status(page)).toHaveText(texto)
    })
  }

  test('HTML pré-renderizado traz o horário fixo, não um status congelado', async ({ request }) => {
    const html = await (await request.get('/')).text()
    expect(html).toContain('data-status-loja="neutro"')
    expect(html).not.toContain('Aberto agora')
  })
})

// Tamanhos reais: celulares, tablet e notebooks comuns (altura já descontando a barra do navegador)
const TELAS: Array<[number, number]> = [
  [360, 640],
  [390, 844],
  [768, 1024],
  [1280, 720],
  [1366, 650],
  [1440, 900],
]

for (const [largura, altura] of TELAS) {
  test(`layout em ${largura}x${altura}: sem rolagem horizontal, logo real inteiro, screenshot`, async ({ page }, info) => {
    await page.setViewportSize({ width: largura, height: altura })
    await page.clock.setFixedTime(new Date('2026-09-21T10:00:00-03:00'))
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0)

    // Logo real inteiro dentro da tela e com tamanho legível
    for (const logo of await page.locator('[data-logo]').all()) {
      await logo.scrollIntoViewIfNeeded()
      const b = (await logo.boundingBox())!
      expect(b.x).toBeGreaterThanOrEqual(0)
      expect(b.x + b.width).toBeLessThanOrEqual(largura)
      expect(b.width).toBeGreaterThanOrEqual(90)
      expect(await logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true)
    }
    await page.evaluate(() => window.scrollTo(0, 0))

    // Nenhum conteúdo invade a margem lateral dos containers
    const invasores = await page.evaluate(() => {
      const out: string[] = []
      for (const c of document.querySelectorAll('.container-site')) {
        const limite = c.getBoundingClientRect().right - parseFloat(getComputedStyle(c).paddingRight) + 1
        for (const e of c.querySelectorAll('*')) {
          if (e.closest('[class*="absolute"]') || !e.getClientRects().length) continue
          const r = e.getBoundingClientRect()
          if (r.width > 0 && r.right > limite) out.push(`${e.tagName}.${String(e.className).slice(0, 50)}`)
        }
      }
      return out
    })
    expect(invasores).toEqual([])

    // CTA principal visível sem rolar
    const cta = page.locator('[data-cta="hero-whatsapp"]')
    const box = await cta.boundingBox()
    expect(box!.y + box!.height).toBeLessThanOrEqual(altura)

    // Força o carregamento das imagens lazy antes do screenshot de página inteira
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 30))
      }
      window.scrollTo(0, 0)
    })
    await page.screenshot({ path: info.outputPath(`pagina-${largura}x${altura}.png`), fullPage: true })
    await page.screenshot({ path: `test-results/screens/pagina-${largura}x${altura}.png`, fullPage: true })
  })

  test(`botão flutuante em ${largura}x${altura}: não cobre nada no carregamento e nunca cobre um elemento inteiro`, async ({ page }) => {
    test.setTimeout(90_000)
    await page.setViewportSize({ width: largura, height: altura })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const resultado = await page.evaluate(async () => {
      const fab = document.querySelector('[data-fab-whatsapp]')!
      const noCarregamento: string[] = []
      const inteiros: string[] = []
      const H = document.documentElement.scrollHeight
      const quadro = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      for (let y = 0; y <= H; y += 80) {
        window.scrollTo({ top: y, behavior: 'instant' })
        await quadro()
        await new Promise((r) => setTimeout(r, 30))
        // Estado real do botão (aria-hidden muda na hora; a opacidade tem transição)
        if (fab.getAttribute('aria-hidden') === 'true' || getComputedStyle(fab).visibility === 'hidden') continue
        const f = fab.getBoundingClientRect()
        for (const el of document.querySelectorAll('a[href], button, input, label, select, textarea')) {
          if (fab.contains(el) || el.closest('[hidden]')) continue
          const r = el.getBoundingClientRect()
          if (!r.width || !r.height) continue
          const ix = Math.min(r.right, f.right) - Math.max(r.left, f.left)
          const iy = Math.min(r.bottom, f.bottom) - Math.max(r.top, f.top)
          if (ix <= 0 || iy <= 0) continue
          const nome = `${el.tagName} "${(el.textContent ?? '').trim().slice(0, 30)}" (scroll ${y})`
          if (y === 0) noCarregamento.push(nome)
          if (ix >= r.width - 1 && iy >= r.height - 1) inteiros.push(nome)
        }
      }
      return { noCarregamento, inteiros }
    })
    expect(resultado.noCarregamento).toEqual([])
    expect(resultado.inteiros).toEqual([])
  })
}

test('teclado: nenhum elemento focado fica embaixo do botão flutuante (WCAG 2.4.11)', async ({ page }) => {
  for (const [largura, altura] of [
    [360, 640],
    [1366, 650],
  ]) {
    await page.setViewportSize({ width: largura, height: altura })
    await page.goto('/')
    const problemas: string[] = []
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press('Tab')
      await page.waitForTimeout(40)
      const p = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null
        const fab = document.querySelector('[data-fab-whatsapp]')!
        if (!el || el === document.body || fab.contains(el)) return null
        const cs = getComputedStyle(fab)
        if (cs.opacity === '0' || cs.visibility === 'hidden') return null
        const r = el.getBoundingClientRect()
        const f = fab.getBoundingClientRect()
        const cobre = Math.min(r.right, f.right) > Math.max(r.left, f.left) && Math.min(r.bottom, f.bottom) > Math.max(r.top, f.top)
        return cobre ? `${el.tagName} "${(el.textContent ?? '').trim().slice(0, 30)}"` : null
      })
      if (p) problemas.push(`${largura}px: ${p}`)
    }
    expect(problemas).toEqual([])
  }
})

test('acessibilidade: axe sem violações WCAG 2.x A/AA', async ({ page }) => {
  await page.goto('/')
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
  expect(r.violations.map((v) => `${v.id}: ${v.nodes.length} nó(s) · ${v.nodes[0]?.target}`)).toEqual([])
})

test('acessibilidade com FAQ aberto e erros do formulário visíveis', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Preciso agendar?' }).click()
  await page.getByRole('button', { name: 'Enviar pelo WhatsApp' }).click()
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(r.violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([])
})

test('teclado: primeiro Tab vai para "Pular para o conteúdo"', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#conteudo$/)
})

test('botão flutuante: some onde já há botão de WhatsApp (topo, formulário, rodapé) e aparece no resto', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const fab = page.locator('[data-fab-whatsapp]')
  await expect(fab).toHaveAttribute('href', /^https:\/\/wa\.me\/5511976964074\?text=/)
  await expect(fab).toHaveCSS('opacity', '0') // CTA do topo (WhatsApp) visível
  await page.locator('#servicos h2').scrollIntoViewIfNeeded()
  await page.evaluate(() => document.getElementById('servicos')!.scrollIntoView({ behavior: 'instant' }))
  await expect(fab).toHaveCSS('opacity', '1')
  await page.evaluate(() => document.querySelector('#agendamento form button[type=submit]')!.scrollIntoView({ block: 'center', behavior: 'instant' }))
  await expect(fab).toHaveCSS('opacity', '0')
  await page.evaluate(() => document.getElementById('condominios')!.scrollIntoView({ behavior: 'instant' }))
  await expect(fab).toHaveCSS('opacity', '1')
  await page.evaluate(() => document.querySelector('footer')!.scrollIntoView({ behavior: 'instant' }))
  await expect(fab).toHaveCSS('opacity', '0')
})

test('menu do celular aberto: botão flutuante some e a página atrás não rola', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => document.getElementById('servicos')!.scrollIntoView({ behavior: 'instant' }))
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.getByRole('button', { name: 'Menu' }).click()
  const fab = page.locator('[data-fab-whatsapp]')
  await expect(fab).toBeHidden()
  await page.mouse.wheel(0, 1200)
  await page.waitForTimeout(300)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
  await page.keyboard.press('Escape')
  await expect(page.locator('html')).not.toHaveAttribute('data-menu-aberto')
  await page.mouse.wheel(0, 1200)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
})

test('SEO: noindex no preview, JSON-LD PetStore válido, canonical e OG', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex, nofollow')
  await expect(page).toHaveTitle(/banho e tosa.*Socorro/i)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-image\.jpg$/)
  const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)
  expect(ld['@type']).toBe('PetStore')
  expect(ld.telephone).toBe('+5511976964074')
  expect(ld.address.postalCode).toBe('04766-001')
  expect(ld.aggregateRating).toMatchObject({ ratingValue: 4.8, reviewCount: 150 })
  expect(ld.openingHoursSpecification).toEqual([
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '16:30' },
  ])
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /')
  expect(await (await request.get('/sitemap.xml')).text()).toContain('<loc>')
  expect((await request.get('/og-image.jpg')).status()).toBe(200)
})

test('reduced motion: sem animações rodando', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.clock.setFixedTime(new Date('2026-09-21T10:00:00-03:00'))
  await page.goto('http://localhost:4173/')
  const animando = await page.evaluate(() =>
    document.getAnimations().filter((a) => {
      const t = a.effect?.getComputedTiming()
      return t && Number(t.duration) > 1 && t.iterations === Infinity
    }).length,
  )
  expect(animando).toBe(0)
  await ctx.close()
})
