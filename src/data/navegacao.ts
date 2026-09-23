/**
 * Seções da página, NA ORDEM EM QUE APARECEM (fonte única do menu do cabeçalho, do menu do
 * celular e do "Navegue" do rodapé). Se mudar a ordem das seções em App.tsx, mude aqui também:
 * o teste tests/navegacao.spec.ts confere.
 *
 * `rotulo` = texto do rótulo acima do título da seção; `menu` = texto curto no menu.
 */
export const secoes = {
  servicos: { id: 'servicos', rotulo: 'Serviços', menu: 'Serviços' },
  agendamento: { id: 'agendamento', rotulo: 'Agendamento', menu: 'Agendar' },
  porQue: { id: 'por-que', rotulo: 'Por que o Pet Sobral', menu: 'Por que nós' },
  avaliacoes: { id: 'avaliacoes', rotulo: 'Avaliações', menu: 'Avaliações' },
  localizacao: { id: 'localizacao', rotulo: 'Onde estamos', menu: 'Onde estamos' },
  condominios: { id: 'condominios', rotulo: 'Para condomínios', menu: 'Condomínios' },
  duvidas: { id: 'duvidas', rotulo: 'Dúvidas', menu: 'Dúvidas' },
} as const

export type ChaveSecao = keyof typeof secoes
export const ordemSecoes = Object.values(secoes)
