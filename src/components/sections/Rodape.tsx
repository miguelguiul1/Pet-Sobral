import { Confirmar, SoNaRevisao } from '@/components/Confirmar'
import { Logo } from '@/components/Logo'
import { ordemSecoes } from '@/data/navegacao'
import { business } from '@/data/business'
import { mensagens, urlWhatsApp } from '@/lib/whatsapp'


export function Rodape() {
  return (
    <footer className="bg-marca pt-14 pb-28 text-creme md:pb-14">
      <div className="container-site grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo variante="branco" className="w-40" />
          <p className="mt-4 max-w-xs text-creme/95">Pet shop, banho e tosa no Socorro, zona sul de São Paulo.</p>
          <p className="mt-5 inline-flex rounded-full bg-mostarda px-3.5 py-1.5 text-sm font-bold text-tinta">
            Ponto de devolução do Mercado Livre
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-extrabold text-mostarda-claro">Contato</h2>
          <dl className="mt-3 space-y-3">
            <div>
              <dt className="text-sm font-bold uppercase tracking-wider text-creme/90">Endereço</dt>
              <dd>
                <address className="not-italic">{business.endereco.completo}</address>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wider text-creme/90">WhatsApp</dt>
              <dd>
                <a href={urlWhatsApp(mensagens.geral)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
                  {business.telefone.exibicao}
                  <span className="sr-only"> (abre o WhatsApp)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wider text-creme/90">Horário</dt>
              <dd>
                {business.horarioTexto.semana} · {business.horarioTexto.sabado} · {business.horarioTexto.domingo}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="font-display text-xl font-extrabold text-mostarda-claro">Navegue</h2>
          <ul className="mt-2">
            {ordemSecoes.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="inline-flex min-h-11 items-center hover:underline hover:underline-offset-4">
                  {l.menu}
                </a>
              </li>
            ))}
          </ul>
          <SoNaRevisao>
            <p className="mt-4 text-sm">
              Redes sociais: <Confirmar>[CONFIRMAR COM O CLIENTE: tem Instagram?]</Confirmar>
            </p>
          </SoNaRevisao>
        </div>
      </div>

      <div className="container-site mt-12 flex flex-col gap-2 border-t border-creme/25 pt-6 text-sm text-creme/90 md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} {business.nome}. <Confirmar curto="CNPJ a confirmar">[CONFIRMAR COM O CLIENTE: CNPJ/razão social]</Confirmar>
        </p>
        <p>
          Fotos ilustrativas:{' '}
          <a href="/images/CREDITOS.md" className="underline underline-offset-2">
            créditos Unsplash
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
