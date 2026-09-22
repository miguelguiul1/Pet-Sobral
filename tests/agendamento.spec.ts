import { expect, test, type Page } from '@playwright/test'

// Segunda-feira, 21/09/2026, 10h30 em São Paulo (o navegador está em Tóquio).
const SEGUNDA_1030 = new Date('2026-09-21T10:30:00-03:00')

async function abrir(page: Page, quando = SEGUNDA_1030) {
  await page.clock.setFixedTime(quando)
  // Captura o window.open em vez de sair para o wa.me
  await page.addInitScript(() => {
    ;(window as unknown as { __aberto: string[] }).__aberto = []
    window.open = ((url: string) => {
      ;(window as unknown as { __aberto: string[] }).__aberto.push(url)
      return null
    }) as typeof window.open
  })
  await page.goto('/')
  await expect(page.locator('#campo-dia input[type=radio]').first()).toBeAttached()
}

const escolher = (page: Page, campo: string, texto: string | RegExp) =>
  page.locator(`#campo-${campo} label`).filter({ hasText: texto }).click()

test('formulário vazio mostra resumo de erros acessível e foca nele', async ({ page }) => {
  await abrir(page)
  await page.getByRole('button', { name: 'Enviar pelo WhatsApp' }).click()
  const resumo = page.getByText('Faltam algumas informações. Confira os campos marcados.')
  await expect(resumo).toBeVisible()
  await expect(page.locator('#agendamento [role=alert]')).toBeFocused()
  for (const erro of ['Escolha o serviço.', 'Diga se é cachorro ou gato.', 'Escolha o porte do pet.', 'Conta pra gente o nome do pet.', 'Escolha o dia.', 'Escolha manhã ou tarde.', 'Digite seu nome.']) {
    await expect(page.getByRole('link', { name: erro })).toBeVisible()
  }
  await expect(page.locator('#nomePet')).toHaveAttribute('aria-invalid', 'true')
  expect(await page.evaluate(() => (window as unknown as { __aberto: string[] }).__aberto)).toEqual([])
})

test('fluxo completo: formulário → wa.me com a mensagem exata', async ({ page }) => {
  await abrir(page)
  await escolher(page, 'servico', 'Banho + tosa')
  await escolher(page, 'especie', 'Cachorro')
  await escolher(page, 'porte', 'Pequeno')
  await page.getByLabel('Nome do pet').fill('Paçoca')
  // Dias: hoje (seg 21/09) deve aparecer; domingo 27/09 não.
  await expect(page.locator('#campo-dia label')).toHaveText(['Hoje21/09', 'Amanhã22/09', 'qua23/09', 'qui24/09', 'sex25/09', 'sáb26/09'])
  await escolher(page, 'dia', 'sex')
  await escolher(page, 'periodo', 'Manhã')
  await page.getByLabel('Seu nome').fill('Carla')
  await page.getByRole('button', { name: '+ Adicionar observação' }).click()
  await page.getByLabel(/Observações/).fill('é a primeira vez dela aqui')
  await page.getByRole('button', { name: 'Enviar pelo WhatsApp' }).click()

  const esperado = [
    'Olá, Pet Sobral! Quero agendar pelo site.',
    '',
    'Serviço: Banho + tosa',
    'Pet: Paçoca (cachorro, porte pequeno)',
    'Dia: sexta-feira, 25/09',
    'Período: Manhã',
    'Meu nome: Carla',
    'Observações: é a primeira vez dela aqui',
    '',
    'Pode confirmar o horário pra mim?',
  ].join('\n')

  const abertos = await page.evaluate(() => (window as unknown as { __aberto: string[] }).__aberto)
  expect(abertos).toHaveLength(1)
  const url = new URL(abertos[0])
  expect(url.origin + url.pathname).toBe('https://wa.me/5511976964074')
  expect(url.searchParams.get('text')).toBe(esperado)

  // Link de reserva caso o pop-up seja bloqueado
  const link = page.locator('[data-link-whatsapp-agendamento]')
  await expect(link).toBeVisible()
  expect(new URL((await link.getAttribute('href'))!).searchParams.get('text')).toBe(esperado)
})

test('card de serviço pré-seleciona o serviço no formulário', async ({ page }) => {
  await abrir(page)
  await page.getByRole('link', { name: 'Agendar tosa' }).click()
  await expect(page.locator('#campo-servico input[value="Tosa"]')).toBeChecked()
})

test('sábado depois do meio-dia: manhã de hoje fica indisponível e tarde vai até 16h30', async ({ page }) => {
  await abrir(page, new Date('2026-09-26T13:00:00-03:00'))
  await escolher(page, 'dia', 'Hoje')
  await expect(page.locator('#campo-periodo input[value="Manhã"]')).toBeDisabled()
  await expect(page.locator('#campo-periodo label').nth(1)).toHaveText('Tarde · até 16h30')
})
