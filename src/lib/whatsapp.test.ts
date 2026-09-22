import { describe, expect, it } from 'vitest'
import { mensagemAgendamento, urlWhatsApp } from './whatsapp'

describe('mensagemAgendamento', () => {
  const base = {
    servico: 'Banho + tosa',
    especie: 'Cachorro',
    porte: 'Pequeno',
    nomePet: ' Paçoca ',
    dia: 'sexta-feira, 25/09',
    periodo: 'Manhã',
    nomeTutor: 'Carla',
  } as const

  it('segue o modelo exato, sem observações', () => {
    expect(mensagemAgendamento(base)).toBe(
      [
        'Olá, Pet Sobral! Quero agendar pelo site.',
        '',
        'Serviço: Banho + tosa',
        'Pet: Paçoca (cachorro, porte pequeno)',
        'Dia: sexta-feira, 25/09',
        'Período: Manhã',
        'Meu nome: Carla',
        '',
        'Pode confirmar o horário pra mim?',
      ].join('\n'),
    )
  })

  it('inclui observações só quando preenchidas', () => {
    expect(mensagemAgendamento({ ...base, observacoes: '   ' })).not.toContain('Observações')
    expect(mensagemAgendamento({ ...base, observacoes: 'tem medo de secador' })).toContain(
      'Meu nome: Carla\nObservações: tem medo de secador\n',
    )
  })
})

describe('urlWhatsApp', () => {
  it('usa wa.me com o número da loja e texto codificado', () => {
    const url = urlWhatsApp('Olá & tchau\nlinha 2')
    expect(url).toBe('https://wa.me/5511976964074?text=Ol%C3%A1%20%26%20tchau%0Alinha%202')
    expect(decodeURIComponent(new URL(url).searchParams.get('text')!)).toBe('Olá & tchau\nlinha 2')
  })
})
