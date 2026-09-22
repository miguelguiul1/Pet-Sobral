/**
 * Fonte única dos dados do Pet Sobral.
 * UI, JSON-LD, meta tags e rodapé leem daqui. Não repita estes dados em outro lugar.
 *
 * Campos com `null` ou marcados CONFIRMAR são desconhecidos e estão listados em PLACEHOLDERS.md.
 */

export const CONFIRMAR = '[CONFIRMAR COM O CLIENTE]'

export type DiaSemana = 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0 = domingo

/** Minutos desde 00:00 no fuso America/Sao_Paulo. */
export interface Expediente {
  abre: number
  fecha: number
}

export const business = {
  nome: 'Pet Sobral',
  endereco: {
    rua: 'R. Olívia Guedes Penteado, 517',
    bairro: 'Socorro',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '04766-001',
    completo: 'R. Olívia Guedes Penteado, 517 - Socorro, São Paulo - SP, 04766-001',
    curto: 'R. Olívia Guedes Penteado, 517 · Socorro',
  },
  /** Coordenadas exatas: [CONFIRMAR COM O CLIENTE] (pegar no Google Maps da loja). Enquanto null, o JSON-LD omite `geo`. */
  geo: null as { lat: number; lng: number } | null,
  telefone: {
    exibicao: '(11) 97696-4074',
    e164: '+5511976964074',
    whatsapp: '5511976964074',
  },
  fuso: 'America/Sao_Paulo',
  /** Índice = dia da semana (0 = domingo). null = fechado. Feriados: [CONFIRMAR COM O CLIENTE], não tratados. */
  horario: [
    null,
    { abre: 9 * 60, fecha: 19 * 60 },
    { abre: 9 * 60, fecha: 19 * 60 },
    { abre: 9 * 60, fecha: 19 * 60 },
    { abre: 9 * 60, fecha: 19 * 60 },
    { abre: 9 * 60, fecha: 19 * 60 },
    { abre: 9 * 60, fecha: 16 * 60 + 30 },
  ] as ReadonlyArray<Expediente | null>,
  horarioTexto: {
    semana: 'Seg a sex 9h–19h',
    sabado: 'Sáb 9h–16h30',
    domingo: 'Dom fechado',
    curto: 'Seg a sex 9h–19h · Sáb até 16h30',
  },
  google: {
    nota: 4.8,
    avaliacoes: 150,
    /**
     * Link de busca que mostra o painel da loja com as avaliações.
     * [CONFIRMAR COM O CLIENTE] trocar pelo link direto de avaliações (Place ID) do Perfil da Empresa.
     */
    urlAvaliacoes:
      'https://www.google.com/search?q=' +
      encodeURIComponent('Pet Sobral R. Olívia Guedes Penteado 517 Socorro São Paulo avaliações'),
  },
  elogios: [
    'atendimento atencioso',
    'equipe carinhosa com os animais',
    'preço justo no banho e tosa',
    'produtos de qualidade',
    'bom horário de funcionamento',
  ],
  atendeCondominios: true,
  pontoDevolucaoMercadoLivre: true,
  /** [CONFIRMAR COM O CLIENTE] Instagram/redes. null = não exibir. */
  instagram: null as string | null,
} as const

export const mapsQuery = `${business.nome}, ${business.endereco.completo}`
export const urlComoChegar =
  'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(mapsQuery)
export const urlMapaEmbed =
  'https://www.google.com/maps?q=' + encodeURIComponent(mapsQuery) + '&output=embed'
export const notaFormatada = business.google.nota.toLocaleString('pt-BR', { minimumFractionDigits: 1 })
