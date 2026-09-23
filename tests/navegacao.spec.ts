import { expect, test } from '@playwright/test'

test('menu do cabeçalho lista todas as seções, na mesma ordem da página', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')
  const hrefs = await page.locator('header nav[aria-label="Seções do site"] a').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
  const secoesNaPagina = await page.locator('main section[id]').evaluateAll((ss) => ss.map((s) => `#${s.id}`))
  expect(hrefs).toEqual(secoesNaPagina)
  expect(hrefs).toHaveLength(7)
  // Rodapé usa a mesma lista
  const rodape = await page.locator('footer a[href^="#"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
  expect(rodape).toEqual(secoesNaPagina)
})

test('item do menu da seção visível fica marcado (aria-current)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')
  await page.locator('#avaliacoes').scrollIntoViewIfNeeded()
  await page.evaluate(() => document.getElementById('avaliacoes')!.scrollIntoView({ block: 'center', behavior: 'instant' }))
  await expect(page.locator('header nav[aria-label="Seções do site"] a[aria-current="location"]')).toHaveAttribute('href', '#avaliacoes')
})

for (const largura of [360, 390, 768]) {
  test(`celular/tablet ${largura}px: botão Menu abre as seções, navega e fecha`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: 800 })
    await page.goto('/')
    const botao = page.getByRole('button', { name: 'Menu' })
    await expect(botao).toBeVisible()
    await expect(botao).toHaveAttribute('aria-expanded', 'false')
    await botao.click()
    await expect(botao).toHaveAttribute('aria-expanded', 'true')
    const painel = page.getByRole('navigation', { name: 'Seções do site (menu)' })
    await expect(painel.getByRole('link')).toHaveText([/Serviços/, /Agendar/, /Por que nós/, /Avaliações/, /Onde estamos/, /Condomínios/, /Dúvidas/])
    await painel.getByRole('link', { name: /Onde estamos/ }).click()
    await expect(page).toHaveURL(/#localizacao$/)
    await expect(painel).toBeHidden()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0)
  })
}

test('menu do celular fecha com Esc e devolve o foco ao botão', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto('/')
  const botao = page.getByRole('button', { name: 'Menu' })
  await botao.click()
  await page.keyboard.press('Escape')
  await expect(botao).toHaveAttribute('aria-expanded', 'false')
  await expect(botao).toBeFocused()
})
