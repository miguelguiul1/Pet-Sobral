import { secoes } from '@/data/navegacao'
import { Rotulo } from '@/components/Rotulo'
import { CircleAlert } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Confirmar } from '@/components/Confirmar'
import { IconeWhatsApp } from '@/components/IconeWhatsApp'
import { EVENTO_ESCOLHER_SERVICO } from '@/components/sections/Servicos'
import { Button } from '@/components/ui/button'
import { Input, Label, Textarea } from '@/components/ui/input'
import { business } from '@/data/business'
import { useAgora } from '@/hooks/useAgora'
import { useModoRevisao } from '@/hooks/useModoRevisao'
import { dataNaLoja, formatarHora, MEIO_DIA, proximosDiasAbertos } from '@/lib/opening-hours'
import { cn } from '@/lib/utils'
import {
  mensagemAgendamento,
  urlWhatsApp,
  type Especie,
  type Periodo,
  type Porte,
  type Servico,
} from '@/lib/whatsapp'

type Campo = 'servico' | 'especie' | 'porte' | 'nomePet' | 'dia' | 'periodo' | 'nomeTutor'

interface Estado {
  servico: Servico | ''
  especie: Especie | ''
  porte: Porte | ''
  nomePet: string
  dia: string
  periodo: Periodo | ''
  nomeTutor: string
  observacoes: string
}

const inicial: Estado = {
  servico: '',
  especie: '',
  porte: '',
  nomePet: '',
  dia: '',
  periodo: '',
  nomeTutor: '',
  observacoes: '',
}

const ERROS: Record<Campo, string> = {
  servico: 'Escolha o serviço.',
  especie: 'Diga se é cachorro ou gato.',
  porte: 'Escolha o porte do pet.',
  nomePet: 'Conta pra gente o nome do pet.',
  dia: 'Escolha o dia.',
  periodo: 'Escolha manhã ou tarde.',
  nomeTutor: 'Digite seu nome.',
}

const ORDEM: Campo[] = ['servico', 'especie', 'porte', 'nomePet', 'dia', 'periodo', 'nomeTutor']
const LIMITE_OBS = 300

interface Opcao {
  valor: string
  rotulo: ReactNode
  desabilitada?: boolean
}

/** Grupo de "chips" com rádios nativos: acessível por teclado e leitor de tela sem JS extra. */
function Chips({
  nome,
  legenda,
  opcoes,
  valor,
  onChange,
  erro,
  dica,
  colunas = 3,
}: {
  nome: Campo
  legenda: string
  opcoes: Opcao[]
  valor: string
  onChange: (v: string) => void
  erro?: string
  dica?: ReactNode
  colunas?: 2 | 3
}) {
  const id = useId()
  const descricao = [dica ? `${id}-dica` : '', erro ? `${id}-erro` : ''].filter(Boolean).join(' ') || undefined
  return (
    <fieldset id={`campo-${nome}`} aria-describedby={descricao} aria-invalid={erro ? true : undefined} tabIndex={-1} className="min-w-0 rounded-lg">
      <legend className="mb-2 font-bold">{legenda}</legend>
      <div className={cn('grid gap-2', colunas === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
        {opcoes.map((o) => (
          <label
            key={o.valor}
            className={cn(
              'relative flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 px-2 py-2 text-center text-[0.98rem] leading-tight font-semibold transition-[background-color,border-color,transform] duration-150 select-none',
              'has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-marca',
              valor === o.valor
                ? 'border-marca bg-marca text-white motion-safe:scale-[1.02]'
                : 'border-input bg-cartao text-tinta hover:border-marca',
              erro && valor !== o.valor && 'border-destructive',
              o.desabilitada && 'cursor-not-allowed opacity-45 hover:border-input',
            )}
          >
            <input
              type="radio"
              name={nome}
              value={o.valor}
              checked={valor === o.valor}
              disabled={o.desabilitada}
              onChange={() => onChange(o.valor)}
              className="sr-only"
            />
            {o.rotulo}
          </label>
        ))}
      </div>
      {dica && (
        <p id={`${id}-dica`} className="mt-2 text-sm text-tinta-suave">
          {dica}
        </p>
      )}
      {erro && (
        <p id={`${id}-erro`} className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-destructive">
          <CircleAlert aria-hidden="true" className="size-4" /> {erro}
        </p>
      )}
    </fieldset>
  )
}

export function Agendamento() {
  const agora = useAgora()
  const revisao = useModoRevisao()
  const [dados, setDados] = useState<Estado>(inicial)
  const [erros, setErros] = useState<Partial<Record<Campo, string>>>({})
  const [enviado, setEnviado] = useState<string | null>(null)
  const [mostrarObs, setMostrarObs] = useState(false)
  const resumoRef = useRef<HTMLDivElement>(null)
  const sucessoRef = useRef<HTMLDivElement>(null)

  const dias = useMemo(() => (agora ? proximosDiasAbertos(agora, 6) : []), [agora])
  const diaEscolhido = dias.find((d) => d.iso === dados.dia)
  const manhaEsgotada = !!(diaEscolhido?.ehHoje && agora && dataNaLoja(agora).minutos >= MEIO_DIA)

  // Cards de serviço pré-selecionam o serviço
  useEffect(() => {
    const ouvir = (e: Event) => {
      const servico = (e as CustomEvent<Servico>).detail
      setDados((d) => ({ ...d, servico }))
      setErros((er) => ({ ...er, servico: undefined }))
    }
    window.addEventListener(EVENTO_ESCOLHER_SERVICO, ouvir)
    return () => window.removeEventListener(EVENTO_ESCOLHER_SERVICO, ouvir)
  }, [])

  // Valores efetivos: se o dia escolhido saiu da lista (virou a hora) ou a manhã já passou, a escolha deixa de valer
  const diaValido = diaEscolhido ? dados.dia : ''
  const periodoValido = manhaEsgotada && dados.periodo === 'Manhã' ? '' : dados.periodo

  function set<K extends keyof Estado>(campo: K, valor: Estado[K]) {
    setDados((d) => ({ ...d, [campo]: valor }))
    if (campo in ERROS) setErros((er) => ({ ...er, [campo]: undefined }))
    setEnviado(null)
  }

  function validar(): Partial<Record<Campo, string>> {
    const e: Partial<Record<Campo, string>> = {}
    const valores = { ...dados, dia: diaValido, periodo: periodoValido }
    for (const c of ORDEM) if (!valores[c].trim()) e[c] = ERROS[c]
    return e
  }

  function enviar(ev: FormEvent) {
    ev.preventDefault()
    const e = validar()
    setErros(e)
    if (Object.keys(e).length) {
      setEnviado(null)
      requestAnimationFrame(() => resumoRef.current?.focus())
      return
    }
    const url = urlWhatsApp(
      mensagemAgendamento({
        servico: dados.servico as Servico,
        especie: dados.especie as Especie,
        porte: dados.porte as Porte,
        nomePet: dados.nomePet,
        dia: diaEscolhido!.extenso,
        periodo: periodoValido as Periodo,
        nomeTutor: dados.nomeTutor,
        observacoes: dados.observacoes,
      }),
    )
    setEnviado(url)
    window.open(url, '_blank', 'noopener')
    requestAnimationFrame(() => sucessoRef.current?.focus())
  }

  const listaErros = ORDEM.filter((c) => erros[c])
  const idHintNome = useId()

  return (
    <section id={secoes.agendamento.id} aria-labelledby="agendamento-titulo" data-esconde-fab className="py-16 md:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <Rotulo>{secoes.agendamento.rotulo}</Rotulo>
          <h2 id="agendamento-titulo" className="font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.03em] md:text-5xl">
            Agende em <em className="not-italic text-marca">um minuto</em>
          </h2>
          <p className="mt-4 text-lg text-tinta-suave">
            Preencha, toque em enviar e a mensagem já sai pronta no WhatsApp. A gente confirma o horário por lá.
          </p>
          <ol className="mt-8 hidden space-y-4 lg:block">
            {['Escolha o serviço e conte sobre o pet', 'Diga o dia e o período que prefere', 'Envie pelo WhatsApp e aguarde a confirmação'].map(
              (t, i) => (
                <li key={t} className="flex items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mostarda font-display text-lg font-extrabold">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{t}</span>
                </li>
              ),
            )}
          </ol>
        </div>

        <form
          noValidate
          onSubmit={enviar}
          aria-labelledby="agendamento-titulo"
          className="rounded-cartao bg-white p-5 shadow-[0_24px_60px_-40px_rgb(30_43_37/0.6)] ring-1 ring-border sm:p-8"
        >
          <p className="mb-6 text-sm text-tinta-suave">Todos os campos são obrigatórios, menos Observações.</p>

          <div ref={resumoRef} tabIndex={-1} role="alert" className="outline-none focus-visible:outline-3">
            {listaErros.length > 0 && (
              <div className="mb-6 rounded-xl border-2 border-destructive bg-destructive/5 p-4">
                <p className="font-bold text-destructive">Faltam algumas informações. Confira os campos marcados.</p>
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {listaErros.map((c) => (
                    <li key={c}>
                      <a href={`#campo-${c}`} className="underline underline-offset-2">
                        {erros[c]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-7">
            <Chips
              nome="servico"
              legenda="Qual serviço?"
              valor={dados.servico}
              onChange={(v) => set('servico', v as Servico)}
              erro={erros.servico}
              opcoes={[
                { valor: 'Banho', rotulo: 'Banho' },
                { valor: 'Tosa', rotulo: 'Tosa' },
                { valor: 'Banho + tosa', rotulo: 'Banho + tosa' },
              ]}
            />

            <div className="grid gap-7 sm:grid-cols-2">
              <Chips
                nome="especie"
                legenda="Seu pet é"
                colunas={2}
                valor={dados.especie}
                onChange={(v) => set('especie', v as Especie)}
                erro={erros.especie}
                // Modo padrão: sem dica (não há texto neutro que não prometa nada sobre gatos)
                dica={revisao ? <Confirmar curto="Gatos: a confirmar">[CONFIRMAR COM O CLIENTE: atende gatos?]</Confirmar> : undefined}
                opcoes={[
                  { valor: 'Cachorro', rotulo: 'Cachorro' },
                  { valor: 'Gato', rotulo: 'Gato' },
                ]}
              />
              <Chips
                nome="porte"
                legenda="Porte"
                valor={dados.porte}
                onChange={(v) => set('porte', v as Porte)}
                erro={erros.porte}
                dica={
                  <>
                    Na dúvida, escolha o mais próximo.{' '}
                    <Confirmar curto="critério a confirmar">[CONFIRMAR COM O CLIENTE: critério de porte]</Confirmar>
                  </>
                }
                opcoes={[
                  { valor: 'Pequeno', rotulo: 'Pequeno' },
                  { valor: 'Médio', rotulo: 'Médio' },
                  { valor: 'Grande', rotulo: 'Grande' },
                ]}
              />
            </div>

            <div id="campo-nomePet" tabIndex={-1} className="rounded-lg">
              <Label htmlFor="nomePet" className="mb-2">
                Nome do pet
              </Label>
              <Input
                id="nomePet"
                name="nomePet"
                autoComplete="off"
                placeholder="Ex.: Paçoca"
                value={dados.nomePet}
                onChange={(e) => set('nomePet', e.target.value)}
                aria-invalid={erros.nomePet ? true : undefined}
                aria-describedby={erros.nomePet ? 'erro-nomePet' : undefined}
                maxLength={60}
              />
              {erros.nomePet && (
                <p id="erro-nomePet" className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-destructive">
                  <CircleAlert aria-hidden="true" className="size-4" /> {erros.nomePet}
                </p>
              )}
            </div>

            {dias.length ? (
              <Chips
                nome="dia"
                legenda="Qual dia?"
                valor={diaValido}
                onChange={(v) => set('dia', v)}
                erro={erros.dia}
                dica="Mostramos só os dias em que a loja abre. Domingo é fechado."
                opcoes={dias.map((d) => ({
                  valor: d.iso,
                  rotulo: (
                    <span className="flex flex-col">
                      <span className="capitalize">{d.rotulo}</span>
                      <span className={cn('text-xs font-medium', diaValido === d.iso ? 'text-white/90' : 'text-tinta-suave')}>
                        {d.data}
                      </span>
                    </span>
                  ),
                }))}
              />
            ) : (
              <div id="campo-dia" aria-busy="true">
                <p className="mb-2 font-bold">Qual dia?</p>
                <div className="grid grid-cols-3 gap-2" aria-hidden="true">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="h-14 rounded-xl bg-creme-escuro motion-safe:animate-pulse" />
                  ))}
                </div>
              </div>
            )}

            <Chips
              nome="periodo"
              legenda="Melhor período"
              colunas={2}
              valor={periodoValido}
              onChange={(v) => set('periodo', v as Periodo)}
              erro={erros.periodo}
              dica="O horário exato a gente combina no WhatsApp."
              opcoes={[
                {
                  valor: 'Manhã',
                  rotulo: manhaEsgotada ? 'Manhã (já passou)' : 'Manhã',
                  desabilitada: manhaEsgotada,
                },
                {
                  valor: 'Tarde',
                  rotulo: diaEscolhido
                    ? `Tarde · até ${formatarHora(diaEscolhido.expediente.fecha)}`
                    : 'Tarde',
                },
              ]}
            />

            <div id="campo-nomeTutor" tabIndex={-1} className="rounded-lg">
              <Label htmlFor="nomeTutor" className="mb-2">
                Seu nome
              </Label>
              <Input
                id="nomeTutor"
                name="nomeTutor"
                autoComplete="given-name"
                placeholder="Como podemos te chamar?"
                value={dados.nomeTutor}
                onChange={(e) => set('nomeTutor', e.target.value)}
                aria-invalid={erros.nomeTutor ? true : undefined}
                aria-describedby={erros.nomeTutor ? 'erro-nomeTutor' : idHintNome}
                maxLength={60}
              />
              <p id={idHintNome} className="sr-only">
                Não pedimos telefone: o WhatsApp já identifica você.
              </p>
              {erros.nomeTutor && (
                <p id="erro-nomeTutor" className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-destructive">
                  <CircleAlert aria-hidden="true" className="size-4" /> {erros.nomeTutor}
                </p>
              )}
            </div>

            <div>
              {mostrarObs || dados.observacoes ? (
                <>
                  <Label htmlFor="observacoes" className="mb-2">
                    Observações <span className="font-medium text-tinta-suave">(opcional)</span>
                  </Label>
                  <Textarea
                    id="observacoes"
                    name="observacoes"
                    autoFocus={mostrarObs && !dados.observacoes}
                    placeholder="Ex.: é a primeira vez dele aqui, tem medo de secador, prefere tosa mais curta…"
                    value={dados.observacoes}
                    maxLength={LIMITE_OBS}
                    onChange={(e) => set('observacoes', e.target.value)}
                    aria-describedby="contador-obs"
                  />
                  <p id="contador-obs" className="mt-1 text-right text-xs text-tinta-suave">
                    {dados.observacoes.length}/{LIMITE_OBS} caracteres
                  </p>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setMostrarObs(true)}
                  className="inline-flex min-h-11 items-center font-bold text-marca underline decoration-2 underline-offset-4 hover:text-marca-escuro"
                >
                  + Adicionar observação
                </button>
              )}
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-8 w-full">
            <IconeWhatsApp className="size-5.5" />
            Enviar pelo WhatsApp
          </Button>
          <p className="mt-3 text-center text-sm text-tinta-suave">
            Abre o WhatsApp com a mensagem pronta. O horário fica garantido quando a gente confirmar por lá.
          </p>

          <div ref={sucessoRef} tabIndex={-1} aria-live="polite" className="outline-none">
            {enviado && (
              <div className="mt-6 rounded-xl bg-zap/10 p-4 text-center ring-1 ring-zap/30" data-agendamento-enviado>
                <p className="font-bold text-zap-escuro">Prontinho! Sua mensagem foi montada.</p>
                <p className="mt-1 text-sm">
                  Não abriu?{' '}
                  <a href={enviado} target="_blank" rel="noopener" className="font-bold text-zap-escuro underline underline-offset-2" data-link-whatsapp-agendamento>
                    Abrir o WhatsApp
                  </a>{' '}
                  ou chame a gente no{' '}
                  <a href={`tel:${business.telefone.e164}`} className="font-bold underline underline-offset-2">
                    {business.telefone.exibicao}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
