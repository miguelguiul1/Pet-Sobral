/**
 * Fotos ILUSTRATIVAS do protótipo (Unsplash).
 * Na versão final, todas serão trocadas por fotos reais da loja (ver kit-venda/checklist-dono.md).
 *
 * Cada slot tem uma lista de candidatas em ordem de preferência. O script `npm run imagens`
 * tenta a primeira; se ela não estiver disponível (removida ou Unsplash+ pago), passa para a próxima.
 * As URLs foram encontradas por busca na web e não puderam ser abertas daqui:
 * confira o resultado em public/images/_previa.html depois de rodar o script.
 *
 * `ratio` = altura / largura. `larguras` = arquivos gerados: {slot}-{largura}.webp
 */
export const fotos = [
  {
    slot: 'hero-cachorro-pos-banho',
    uso: 'Hero (foto principal, recorte em arco)',
    ratio: 5 / 4,
    larguras: [480, 760, 1120],
    candidatas: [
      'https://unsplash.com/photos/brown-pomeranian-wearing-pink-towel-ZVdZw2p08y4',
      'https://unsplash.com/photos/brown-long-coated-dog-on-blue-towel-ikv10lHZUas',
    ],
  },
  {
    slot: 'servico-banho',
    uso: 'Card de serviço: Banho',
    ratio: 3 / 4,
    larguras: [400, 800],
    candidatas: [
      'https://unsplash.com/photos/brown-long-coated-dog-on-blue-towel-ikv10lHZUas',
      'https://unsplash.com/photos/happy-fluffy-dog-with-its-mouth-open-vXeJr4c3jFI',
    ],
  },
  {
    slot: 'servico-tosa',
    uso: 'Card de serviço: Tosa',
    ratio: 3 / 4,
    larguras: [400, 800],
    candidatas: ['https://unsplash.com/photos/black-poodle-with-yellow-leash-nAedTCXPdeg'],
  },
  {
    slot: 'servico-banho-e-tosa',
    uso: 'Card de serviço: Banho + tosa',
    ratio: 3 / 4,
    larguras: [400, 800],
    candidatas: [
      'https://unsplash.com/photos/a-corgi-dog-looking-up-with-a-happy-expression-QbTx8O1rVCo',
      'https://unsplash.com/photos/happy-fluffy-dog-with-its-mouth-open-vXeJr4c3jFI',
      'https://unsplash.com/photos/a-happy-border-collie-dog-sits-in-green-grass-Obj1nsA6F64',
    ],
  },
  {
    slot: 'servico-produtos',
    uso: 'Card de serviço: Rações, produtos e acessórios',
    ratio: 3 / 4,
    larguras: [400, 800],
    candidatas: ['https://unsplash.com/photos/close-up-of-dry-dog-food-kibble-TrmYHYdxhFQ'],
  },
  {
    slot: 'porque-carinho',
    uso: 'Seção "Por que o Pet Sobral"',
    ratio: 5 / 4,
    larguras: [480, 900],
    candidatas: [
      'https://unsplash.com/photos/Hen3PrsTGsM',
      'https://unsplash.com/photos/photo-of-man-hugging-tan-dog-ISg37AI2A-s',
      'https://unsplash.com/photos/man-hugging-dog-FyF5xcrWJ-Q',
    ],
  },
  {
    slot: 'condominios-passeio',
    uso: 'Seção de condomínios',
    ratio: 4 / 5,
    larguras: [480, 960],
    candidatas: [
      'https://unsplash.com/photos/woman-walking-a-pug-on-a-leash-on-sidewalk-KFAb-qdBi64',
      'https://unsplash.com/photos/ZeMORDph5lk',
      'https://unsplash.com/photos/a-person-walking-a-dog-on-a-leash-RAZADdmRIno',
    ],
  },
]
