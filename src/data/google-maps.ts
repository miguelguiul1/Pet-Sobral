/**
 * DADOS DO GOOGLE MAPS — cole aqui os dois valores (é o único lugar que precisa mudar).
 *
 * 1. linkAvaliacoes: no Google Maps, abra a ficha do Pet Sobral > "Avaliações" > compartilhar,
 *    ou use o link do Perfil da Empresa (ex.: https://g.page/r/XXXX/review ou https://maps.app.goo.gl/XXXX).
 *    Enquanto estiver vazio, o site usa uma busca no Google que mostra a ficha da loja.
 *
 * 2. coordenadas: no Google Maps, clique com o botão direito no pino da loja; o primeiro item do menu
 *    são as coordenadas (ex.: -23.12345, -46.12345). Cole como números: { lat: -23.12345, lng: -46.12345 }.
 *    Enquanto for null, o JSON-LD (SEO) sai sem "geo".
 */
export const googleMaps: {
  linkAvaliacoes: string
  coordenadas: { lat: number; lng: number } | null
} = {
  linkAvaliacoes: '',
  coordenadas: null,
}
