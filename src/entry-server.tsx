import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'
import { business, urlComoChegar } from './data/business'

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

const DIAS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

/** JSON-LD PetStore gerado a partir de business.ts (fonte única). */
export function jsonLd(siteUrl: string): string {
  const horarios = new Map<string, string[]>()
  business.horario.forEach((exp, dia) => {
    if (!exp) return
    const chave = `${hhmm(exp.abre)}-${hhmm(exp.fecha)}`
    horarios.set(chave, [...(horarios.get(chave) ?? []), DIAS[dia]])
  })
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    '@id': `${siteUrl}/#petstore`,
    name: business.nome,
    url: `${siteUrl}/`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: business.telefone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.endereco.rua,
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: business.endereco.cep,
      addressCountry: 'BR',
    },
    // `geo` só entra quando as coordenadas forem confirmadas (business.geo) — [CONFIRMAR COM O CLIENTE]
    ...(business.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng } }
      : {}),
    areaServed: { '@type': 'Place', name: 'Socorro, zona sul de São Paulo' },
    hasMap: urlComoChegar,
    openingHoursSpecification: [...horarios].map(([faixa, dias]) => {
      const [opens, closes] = faixa.split('-')
      return { '@type': 'OpeningHoursSpecification', dayOfWeek: dias, opens, closes }
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.google.nota,
      reviewCount: business.google.avaliacoes,
      bestRating: 5,
    },
    makesOffer: ['Banho', 'Tosa', 'Banho e tosa'].map((nome) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: nome },
    })),
  }
  return JSON.stringify(dados).replace(/</g, '\\u003c')
}
