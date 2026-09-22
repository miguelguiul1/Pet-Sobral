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

for (const largura of [360, 390, 768, 1440]) {
  test(`layout em ${largura}px: sem rolagem horizontal, logo inteiro, screenshot`, async ({ page }, info) => {
    await page.setViewportSize({ width: largura, height: 800 })
    await page.clock.setFixedTime(new Date('2026-09-21T10:00:00-03:00'))
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0)

    for (const logo of await page.locator('[data-logo-provisorio]').all()) {
      const [l, t] = await Promise.all([logo.boundingBox(), logo.locator('[data-plaquinha]').boundingBox()])
      expect(t!.x).toBeGreaterThanOrEqual(l!.x)
      expect(t!.x + t!.width).toBeLessThanOrEqual(l!.x + l!.width + 0.5)
      expect(t!.y + t!.height).toBeLessThanOrEqual(l!.y + l!.height + 0.5)
      expect(t!.x + t!.width).toBeLessThanOrEqual(largura)
    }

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
    expect(box!.y + box!.height).toBeLessThanOrEqual(800)

    // Força o carregamento das imagens lazy antes do screenshot de página inteira
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 30))
      }
      window.scrollTo(0, 0)
    })
    await page.screenshot({ path: info.outputPath(`pagina-${largura}.png`), fullPage: true })
    await page.screenshot({ path: `test-results/screens/pagina-${largura}.png`, fullPage: true })
  })
}

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

test('botão flutuante do WhatsApp: visível no topo, some sobre o formulário', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto('/')
  const fab = page.locator('[data-fab-whatsapp]')
  await expect(fab).toBeVisible()
  await expect(fab).toHaveAttribute('href', /^https:\/\/wa\.me\/5511976964074\?text=/)
  await page.locator('#agendamento form button[type=submit]').scrollIntoViewIfNeeded()
  await expect(fab).toHaveCSS('opacity', '0')
  await page.locator('#localizacao').scrollIntoViewIfNeeded()
  await page.locator('#condominios').scrollIntoViewIfNeeded()
  await expect(fab).toHaveCSS('opacity', '1')
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
