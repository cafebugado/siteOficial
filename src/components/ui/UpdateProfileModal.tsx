import { useState, useEffect } from 'react'
import { X, ArrowRight, ArrowLeft, CheckCircle, UserCog } from 'lucide-react'
import { z } from 'zod'
import { toast } from 'sonner'

const UPDATABLE_FIELDS: { key: string; label: string; placeholder: string; type?: string }[] = [
  { key: 'full_name', label: 'Nome completo', placeholder: 'Ex: Maria Silva' },
  { key: 'city', label: 'Cidade', placeholder: 'Ex: São Paulo' },
  { key: 'uf', label: 'Estado (UF)', placeholder: 'Ex: SP' },
  { key: 'job_title', label: 'Cargo atual', placeholder: 'Ex: Desenvolvedora Front-end' },
  { key: 'interest_area', label: 'Área de interesse', placeholder: 'Ex: Front-end, Back-end, UI/UX…' },
  { key: 'experience_level', label: 'Nível de experiência', placeholder: 'Ex: Pleno, Sênior, Júnior…' },
  { key: 'availability', label: 'Disponibilidade', placeholder: 'Ex: Disponível para trabalho' },
  { key: 'linkedin_url', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/…', type: 'url' },
  { key: 'github_url', label: 'GitHub', placeholder: 'https://github.com/…', type: 'url' },
  { key: 'portfolio_url', label: 'Portfólio', placeholder: 'https://…', type: 'url' },
  { key: 'whatsapp', label: 'WhatsApp', placeholder: 'Ex: 11 91234-5678' },
]

const identitySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
})

const inputClass = (hasError?: boolean) =>
  `w-full px-4 py-3 rounded-lg bg-light-bg dark:bg-dark-bg border text-light-text dark:text-dark-text placeholder-cb-gray text-body focus:outline-none focus:ring-2 focus:ring-cb-purple/50 focus:border-cb-purple transition-colors ${
    hasError
      ? 'border-cb-red focus:ring-cb-red/50 focus:border-cb-red'
      : 'border-cb-gray-light dark:border-border-dark-subtle'
  }`

interface Props {
  isOpen: boolean
  onClose: () => void
}

type Step = 'identity' | 'select' | 'fill' | 'done'

export default function UpdateProfileModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<Step>('identity')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [identityErrors, setIdentityErrors] = useState<{ name?: string; email?: string }>({})
  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set())
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  function handleClose() {
    onClose()
    setTimeout(() => {
      setStep('identity')
      setName('')
      setEmail('')
      setIdentityErrors({})
      setSelectedFields(new Set())
      setFieldValues({})
    }, 300)
  }

  function handleIdentityNext() {
    const result = identitySchema.safeParse({ name, email })
    if (!result.success) {
      const errs: { name?: string; email?: string } = {}
      result.error.issues.forEach((i) => {
        const f = i.path[0] as 'name' | 'email'
        if (!errs[f]) errs[f] = i.message
      })
      setIdentityErrors(errs)
      return
    }
    setIdentityErrors({})
    setStep('select')
  }

  function toggleField(key: string) {
    setSelectedFields((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
        setFieldValues((v) => { const copy = { ...v }; delete copy[key]; return copy })
      } else {
        next.add(key)
      }
      return next
    })
  }

  function handleSelectNext() {
    if (selectedFields.size === 0) {
      toast.error('Selecione pelo menos um campo para atualizar.')
      return
    }
    setStep('fill')
  }

  async function handleSubmit() {
    const missing = [...selectedFields].filter((k) => !fieldValues[k]?.trim())
    if (missing.length > 0) {
      toast.error('Preencha todos os campos selecionados antes de enviar.')
      return
    }

    const lines = [...selectedFields].map((k) => {
      const field = UPDATABLE_FIELDS.find((f) => f.key === k)!
      return `• ${field.label}: ${fieldValues[k].trim()}`
    })

    const message =
      `Olá! Gostaria de atualizar meu perfil na comunidade do Café Bugado.\n\n` +
      `Nome: ${name}\nEmail: ${email}\n\n` +
      `Campos que desejo atualizar:\n${lines.join('\n')}`

    setIsLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: `Atualizar perfil de ${name}`,
          message,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setStep('done')
      } else {
        toast.error(data.error || 'Erro ao enviar. Tente novamente.')
      }
    } catch {
      toast.error('Erro de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const selectedList = UPDATABLE_FIELDS.filter((f) => selectedFields.has(f.key))

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Atualizar perfil"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-cb-gray-light dark:border-border-dark-subtle bg-light-bg dark:bg-dark-bg shadow-2xl">

        {step === 'done' ? (
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-cb-purple/10 dark:bg-cb-purple/20">
              <CheckCircle className="w-8 h-8 text-cb-purple" />
            </div>
            <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
              Solicitação enviada!
            </h2>
            <p className="text-cb-gray text-sm max-w-xs">
              Recebemos seu pedido de atualização e entraremos em contato pelo email <strong>{email}</strong> em breve.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 text-xs text-cb-gray hover:text-cb-purple transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-cb-gray-light dark:border-border-dark-subtle bg-light-bg dark:bg-dark-bg">
              <div className="flex items-center gap-3">
                {step !== 'identity' && (
                  <button
                    onClick={() => setStep(step === 'fill' ? 'select' : 'identity')}
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-cb-gray hover:text-light-text dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Voltar"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h2 className="text-lg font-bold text-light-text dark:text-dark-text flex items-center gap-2">
                    <UserCog className="w-5 h-5 text-cb-purple" />
                    Atualizar perfil
                  </h2>
                  <p className="text-xs text-cb-gray mt-0.5">
                    {step === 'identity' && 'Informe seus dados de contato'}
                    {step === 'select' && 'Escolha o que deseja alterar'}
                    {step === 'fill' && 'Informe os novos valores'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-cb-gray hover:text-light-text dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-1 px-6 pt-4">
              {(['identity', 'select', 'fill'] as const).map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      step === s
                        ? 'bg-cb-purple'
                        : i < ['identity', 'select', 'fill'].indexOf(step)
                        ? 'bg-cb-purple/40'
                        : 'bg-cb-gray-light dark:bg-[#26262C]'
                    }`}
                  />
                  {i < 2 && <div className="w-6 h-px bg-cb-gray-light dark:bg-[#26262C]" />}
                </div>
              ))}
            </div>

            <div className="px-6 py-5">
              {/* Step 1 — identity */}
              {step === 'identity' && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-cb-gray-dark dark:text-cb-gray">
                    Para processar sua solicitação, precisamos confirmar quem você é.
                  </p>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-cb-gray-dark dark:text-cb-gray">
                      Seu nome completo
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setIdentityErrors((p) => ({ ...p, name: undefined })) }}
                      placeholder="Como está cadastrado na comunidade"
                      className={inputClass(!!identityErrors.name)}
                    />
                    {identityErrors.name && (
                      <span className="text-cb-red text-xs px-1">{identityErrors.name}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-cb-gray-dark dark:text-cb-gray">
                      Seu email de cadastro
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setIdentityErrors((p) => ({ ...p, email: undefined })) }}
                      placeholder="O email que você usou para se cadastrar"
                      className={inputClass(!!identityErrors.email)}
                    />
                    {identityErrors.email && (
                      <span className="text-cb-red text-xs px-1">{identityErrors.email}</span>
                    )}
                  </div>
                  <button
                    onClick={handleIdentityNext}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-white font-semibold text-button hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2 — select fields */}
              {step === 'select' && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-cb-gray-dark dark:text-cb-gray">
                    Selecione os campos que você deseja atualizar:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {UPDATABLE_FIELDS.map((field) => (
                      <label
                        key={field.key}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors select-none ${
                          selectedFields.has(field.key)
                            ? 'border-cb-purple bg-cb-purple/10 text-cb-purple'
                            : 'border-cb-gray-light dark:border-[#26262C] bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text hover:border-cb-purple/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedFields.has(field.key)}
                          onChange={() => toggleField(field.key)}
                          className="accent-cb-purple w-4 h-4 shrink-0"
                        />
                        <span className="text-sm font-medium">{field.label}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    onClick={handleSelectNext}
                    disabled={selectedFields.size === 0}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-white font-semibold text-button hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    Continuar ({selectedFields.size} campo{selectedFields.size !== 1 ? 's' : ''})
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 3 — fill new values */}
              {step === 'fill' && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-cb-gray-dark dark:text-cb-gray">
                    Informe os novos valores para cada campo selecionado:
                  </p>
                  {selectedList.map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-cb-gray-dark dark:text-cb-gray">
                        {field.label}
                      </label>
                      <input
                        type={field.type ?? 'text'}
                        value={fieldValues[field.key] ?? ''}
                        onChange={(e) =>
                          setFieldValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                        }
                        placeholder={field.placeholder}
                        className={inputClass()}
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-white font-semibold text-button hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando solicitação…
                      </>
                    ) : (
                      <>
                        Enviar solicitação
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
