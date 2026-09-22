import { business, type Expediente } from '../data/business'

/** Data "de calendário" no fuso da loja, independente do fuso do navegador. */
export interface DataLoja {
  ano: number
  mes: number // 1-12
  dia: number
  diaSemana: number // 0 = domingo
  minutos: number // minutos desde 00:00
}

const DIAS_CURTOS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'] as const
const DIAS_LONGOS = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
] as const
const DIAS_FALADOS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'] as const

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: business.fuso,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  weekday: 'short',
  hour: 'numeric',
  minute: 'numeric',
  hourCycle: 'h23',
})

const WEEKDAY: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

export function dataNaLoja(agora: Date): DataLoja {
  const p: Record<string, string> = {}
  for (const part of formatter.formatToParts(agora)) p[part.type] = part.value
  const hora = Number(p.hour) % 24
  return {
    ano: Number(p.year),
    mes: Number(p.month),
    dia: Number(p.day),
    diaSemana: WEEKDAY[p.weekday],
    minutos: hora * 60 + Number(p.minute),
  }
}

export function formatarHora(minutos: number): string {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`
}

export type EstadoLoja = 'aberto' | 'fechando' | 'fechado'

export interface StatusLoja {
  estado: EstadoLoja
  /** Texto principal curto, ex.: "Aberto agora" / "Fecha às 19h" / "Fechado". */
  titulo: string
  /** Complemento, ex.: "fecha às 19h" / "abre amanhã às 9h". */
  detalhe: string
}

/** Minutos antes do fechamento em que o status passa a "Fecha às X". */
export const AVISO_FECHAMENTO_MIN = 60

function proximaAbertura(hoje: DataLoja, horario: ReadonlyArray<Expediente | null>): string {
  const expHoje = horario[hoje.diaSemana]
  if (expHoje && hoje.minutos < expHoje.abre) return `abre hoje às ${formatarHora(expHoje.abre)}`
  for (let i = 1; i <= 7; i++) {
    const dia = (hoje.diaSemana + i) % 7
    const exp = horario[dia]
    if (!exp) continue
    const quando = i === 1 ? 'amanhã' : DIAS_FALADOS[dia]
    return `abre ${quando} às ${formatarHora(exp.abre)}`
  }
  return ''
}

export function statusLoja(agora: Date, horario = business.horario): StatusLoja {
  const hoje = dataNaLoja(agora)
  const exp = horario[hoje.diaSemana]
  if (exp && hoje.minutos >= exp.abre && hoje.minutos < exp.fecha) {
    const fecha = formatarHora(exp.fecha)
    if (exp.fecha - hoje.minutos <= AVISO_FECHAMENTO_MIN) {
      return { estado: 'fechando', titulo: `Fecha às ${fecha}`, detalhe: 'aberto por pouco tempo' }
    }
    return { estado: 'aberto', titulo: 'Aberto agora', detalhe: `fecha às ${fecha}` }
  }
  return { estado: 'fechado', titulo: 'Fechado', detalhe: proximaAbertura(hoje, horario) }
}

export interface DiaAgendavel {
  /** yyyy-mm-dd */
  iso: string
  diaSemana: number
  /** "Hoje" | "Amanhã" | "qui" */
  rotulo: string
  /** "24/09" */
  data: string
  /** "quinta-feira, 24/09" — usado na mensagem do WhatsApp */
  extenso: string
  ehHoje: boolean
  expediente: Expediente
}

/** Próximos `quantidade` dias em que a loja abre. Hoje só entra se a loja ainda não fechou. */
export function proximosDiasAbertos(
  agora: Date,
  quantidade = 6,
  horario = business.horario,
): DiaAgendavel[] {
  const hoje = dataNaLoja(agora)
  const base = Date.UTC(hoje.ano, hoje.mes - 1, hoje.dia)
  const dias: DiaAgendavel[] = []
  for (let i = 0; dias.length < quantidade && i < 21; i++) {
    const d = new Date(base + i * 86_400_000)
    const diaSemana = d.getUTCDay()
    const exp = horario[diaSemana]
    if (!exp) continue
    if (i === 0 && hoje.minutos >= exp.fecha) continue
    const dd = String(d.getUTCDate()).padStart(2, '0')
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
    dias.push({
      iso: `${d.getUTCFullYear()}-${mm}-${dd}`,
      diaSemana,
      rotulo: i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : DIAS_CURTOS[diaSemana],
      data: `${dd}/${mm}`,
      extenso: `${DIAS_LONGOS[diaSemana]}, ${dd}/${mm}`,
      ehHoje: i === 0,
      expediente: exp,
    })
  }
  return dias
}

/** Turnos: manhã até 12h; tarde do meio-dia ao fechamento. */
export const MEIO_DIA = 12 * 60
