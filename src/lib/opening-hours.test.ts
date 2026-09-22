import { describe, expect, it } from 'vitest'
import { dataNaLoja, proximosDiasAbertos, statusLoja } from './opening-hours'

/** Cria um instante a partir de hora local de São Paulo (UTC-3, sem horário de verão desde 2019). */
const sp = (iso: string) => new Date(`${iso}-03:00`)

// 2026-09-21 é segunda-feira.
describe('statusLoja (fuso America/Sao_Paulo)', () => {
  const casos: Array<[string, string, string]> = [
    ['2026-09-21T08:59', 'Fechado', 'abre hoje às 9h'],
    ['2026-09-21T09:00', 'Aberto agora', 'fecha às 19h'],
    ['2026-09-21T17:59', 'Aberto agora', 'fecha às 19h'],
    ['2026-09-21T18:00', 'Fecha às 19h', 'aberto por pouco tempo'],
    ['2026-09-21T18:59', 'Fecha às 19h', 'aberto por pouco tempo'],
    ['2026-09-21T19:00', 'Fechado', 'abre amanhã às 9h'],
    ['2026-09-25T19:30', 'Fechado', 'abre amanhã às 9h'], // sexta à noite -> sábado
    ['2026-09-26T09:00', 'Aberto agora', 'fecha às 16h30'],
    ['2026-09-26T15:29', 'Aberto agora', 'fecha às 16h30'],
    ['2026-09-26T15:30', 'Fecha às 16h30', 'aberto por pouco tempo'],
    ['2026-09-26T16:29', 'Fecha às 16h30', 'aberto por pouco tempo'],
    ['2026-09-26T16:30', 'Fechado', 'abre segunda às 9h'],
    ['2026-09-27T12:00', 'Fechado', 'abre amanhã às 9h'], // domingo
  ]
  it.each(casos)('%s → %s · %s', (quando, titulo, detalhe) => {
    const s = statusLoja(sp(quando))
    expect(s.titulo).toBe(titulo)
    expect(s.detalhe).toBe(detalhe)
  })

  it('não depende do fuso do navegador: 22h UTC de segunda = 19h em SP (fechado)', () => {
    expect(statusLoja(new Date('2026-09-21T22:00:00Z')).titulo).toBe('Fechado')
    expect(statusLoja(new Date('2026-09-21T21:59:00Z')).titulo).toBe('Fecha às 19h')
  })

  it('virada de dia UTC: 01h UTC de terça ainda é segunda 22h em SP', () => {
    const d = dataNaLoja(new Date('2026-09-22T01:00:00Z'))
    expect(d.diaSemana).toBe(1)
    expect(d.minutos).toBe(22 * 60)
  })
})

describe('proximosDiasAbertos', () => {
  it('pula domingo e inclui hoje se ainda não fechou', () => {
    const dias = proximosDiasAbertos(sp('2026-09-26T10:00')) // sábado
    expect(dias.map((d) => d.rotulo)).toEqual(['Hoje', 'seg', 'ter', 'qua', 'qui', 'sex'])
    expect(dias[1].extenso).toBe('segunda-feira, 28/09')
  })

  it('não oferece hoje depois do fechamento', () => {
    const dias = proximosDiasAbertos(sp('2026-09-21T19:05')) // segunda depois das 19h
    expect(dias[0].rotulo).toBe('Amanhã')
    expect(dias[0].data).toBe('22/09')
  })

  it('no domingo começa por "Amanhã" (segunda)', () => {
    const dias = proximosDiasAbertos(sp('2026-09-27T11:00'))
    expect(dias[0]).toMatchObject({ rotulo: 'Amanhã', diaSemana: 1 })
  })
})
