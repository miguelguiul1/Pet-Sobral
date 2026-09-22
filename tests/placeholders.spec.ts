import { expect, test } from '@playwright/test'

// Marcas de placeholder (o verbo "confirmar" comum, como em "a gente confirma", é permitido)
const MARCAS = /\[CONFIRMAR|\[SUBSTITUIR|CONFIRMAR COM O CLIENTE|a confirmar\b|critério a confirmar/

test('modo padrão: nenhuma marca [CONFIRMAR] no HTML servido nem na página renderizada', async ({ page, request }) => {
  // HTML pré-renderizado (o que o Google e o WhatsApp leem)
  const html = await (await request.get('/')).text()
  const corpo = html.slice(html.indexOf('<body'))
  expect(corpo).not.toMatch(MARCAS)

  // Página hidratada, incluindo textos ocultos (FAQ fechado) e texto só para leitor de tela
  await page.goto('/')
  await expect(page.locator('#campo-dia input[type=radio]').first()).toBeAttached()
  // Abre o formulário completo (observações) e o FAQ inteiro para garantir que nada escondido vaze
  await page.getByRole('button', { name: '+ Adicionar observação' }).click()
  await expect(page.locator('[data-placeholder]')).toHaveCount(0)
  expect(await page.evaluate(() => document.body.textContent)).not.toMatch(MARCAS)
  expect(await page.evaluate(() => document.body.innerText)).not.toMatch(MARCAS)
  await expect(page.getByText('Modo revisão')).toHaveCount(0)
  // Perguntas sem resposta neutra ficam fora do modo padrão
  await expect(page.getByRole('button', { name: 'Vocês atendem gatos?' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Quais as formas de pagamento?' })).toHaveCount(0)
})

test('modo revisão (?revisao=1): marcas destacadas e aviso no topo', async ({ page }) => {
  await page.goto('/?revisao=1')
  await expect(page.getByRole('status').filter({ hasText: 'Modo revisão' })).toBeVisible()
  expect(await page.locator('[data-placeholder]').count()).toBeGreaterThanOrEqual(15)
  await expect(page.getByRole('button', { name: 'Vocês atendem gatos?' })).toBeVisible()
  await expect(page.locator('#servicos [data-placeholder]').first()).toBeVisible()
})
