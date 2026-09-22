/**
 * FOTOS ILUSTRATIVAS (Unsplash) — serão trocadas por fotos reais do Pet Sobral na versão final.
 * Arquivos em public/images/{slot}-{largura}.webp, gerados por `npm run imagens`
 * (lista e créditos em scripts/fotos.config.mjs e public/images/CREDITOS.md).
 * Para trocar por uma foto real: salve com o mesmo nome e proporção, ou ajuste aqui.
 */
export interface Imagem {
  slot: string
  larguras: number[]
  /** altura / largura */
  ratio: number
  alt: string
}

export const imagens = {
  hero: {
    slot: 'hero-cachorro-pos-banho',
    larguras: [480, 760, 1120],
    ratio: 5 / 4,
    alt: 'Cachorro tranquilo, enrolado numa toalha depois do banho',
  },
  banho: {
    slot: 'servico-banho',
    larguras: [400, 800],
    ratio: 3 / 4,
    alt: 'Cachorro sendo secado com uma toalha depois do banho',
  },
  tosa: {
    slot: 'servico-tosa',
    larguras: [400, 800],
    ratio: 3 / 4,
    alt: 'Cachorro de pelo tosado e bem cuidado',
  },
  banhoETosa: {
    slot: 'servico-banho-e-tosa',
    larguras: [400, 800],
    ratio: 3 / 4,
    alt: 'Cachorro feliz e de pelo macio olhando para cima',
  },
  produtos: {
    slot: 'servico-produtos',
    larguras: [400, 800],
    ratio: 3 / 4,
    alt: 'Ração seca para cães em close',
  },
  carinho: {
    slot: 'porque-carinho',
    larguras: [480, 900],
    ratio: 5 / 4,
    alt: 'Pessoa abraçando um cachorro com carinho',
  },
  condominios: {
    slot: 'condominios-passeio',
    larguras: [480, 960],
    ratio: 4 / 5,
    alt: 'Tutora passeando com o cachorro na calçada',
  },
} satisfies Record<string, Imagem>
