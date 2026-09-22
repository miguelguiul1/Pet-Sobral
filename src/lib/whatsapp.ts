import { business } from '../data/business'

export function urlWhatsApp(texto: string, numero: string = business.telefone.whatsapp): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
}

export type Servico = 'Banho' | 'Tosa' | 'Banho + tosa'
export type Especie = 'Cachorro' | 'Gato'
export type Porte = 'Pequeno' | 'Médio' | 'Grande'
export type Periodo = 'Manhã' | 'Tarde'

export interface DadosAgendamento {
  servico: Servico
  especie: Especie
  porte: Porte
  nomePet: string
  /** Ex.: "sexta-feira, 25/09" */
  dia: string
  periodo: Periodo
  nomeTutor: string
  observacoes?: string
}

/** Monta a mensagem de agendamento (modelo em docs/copy.md, seção 3). */
export function mensagemAgendamento(d: DadosAgendamento): string {
  const linhas = [
    `Olá, ${business.nome}! Quero agendar pelo site.`,
    '',
    `Serviço: ${d.servico}`,
    `Pet: ${d.nomePet.trim()} (${d.especie.toLowerCase()}, porte ${d.porte.toLowerCase()})`,
    `Dia: ${d.dia}`,
    `Período: ${d.periodo}`,
    `Meu nome: ${d.nomeTutor.trim()}`,
  ]
  const obs = d.observacoes?.trim()
  if (obs) linhas.push(`Observações: ${obs}`)
  linhas.push('', 'Pode confirmar o horário pra mim?')
  return linhas.join('\n')
}

export const mensagens = {
  geral: `Olá, ${business.nome}! Vim pelo site e queria tirar uma dúvida.`,
  produtos: `Olá, ${business.nome}! Queria saber se vocês têm um produto na loja:`,
  condominio: `Olá, ${business.nome}! Vim pelo site. Sou do condomínio ____ aqui na região e queria saber como funciona o atendimento a condomínios.`,
  agendarRapido: `Olá, ${business.nome}! Vim pelo site e quero agendar banho e tosa.`,
}
