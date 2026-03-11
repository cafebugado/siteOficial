import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  subject: z.string().min(3, { message: 'Assunto deve ter pelo menos 3 caracteres' }),
  message: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' }),
});

type ContactForm = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactForm, string>>;

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg bg-light-bg dark:bg-dark-bg border text-light-text dark:text-dark-text placeholder-cb-gray text-body focus:outline-none focus:ring-2 focus:ring-cb-purple/50 focus:border-cb-purple transition-colors ${
    hasError
      ? 'border-cb-red focus:ring-cb-red/50 focus:border-cb-red'
      : 'border-cb-gray-light dark:border-border-dark-subtle'
  }`;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!showThankYou) return;
    const timer = setTimeout(() => {
      setShowThankYou(false);
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [showThankYou, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactForm;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error('Verifique os campos antes de enviar.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setForm({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setShowThankYou(true);
      } else {
        toast.error(data.error || 'Erro ao enviar mensagem. Tente novamente.');
      }
    } catch {
      toast.error('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Formulário de contato"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-cb-gray-light dark:border-border-dark-subtle bg-light-bg dark:bg-dark-bg shadow-2xl">

        {showThankYou ? (
          /* Tela de obrigado */
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-cb-purple/10 dark:bg-cb-purple/20">
              <CheckCircle className="w-8 h-8 text-cb-purple" />
            </div>
            <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
              Obrigado pela mensagem!
            </h2>
            <p className="text-cb-gray text-sm max-w-xs">
              Recebemos sua mensagem e retornaremos em breve. Até logo!
            </p>
            <button
              onClick={onClose}
              className="mt-2 text-xs text-cb-gray hover:text-cb-purple transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-cb-gray-light dark:border-border-dark-subtle bg-light-bg dark:bg-dark-bg">
              <div>
                <h2 className="text-lg font-bold text-light-text dark:text-dark-text">
                  Fale com a comunidade
                </h2>
                <p className="text-sm text-cb-gray mt-0.5">
                  Dúvidas, sugestões ou ideias? Estamos aqui!
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-cb-gray hover:text-light-text dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className={inputClass(!!errors.name)}
                    />
                    {errors.name && (
                      <span className="text-cb-red text-xs px-1">{errors.name}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Seu email"
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && (
                      <span className="text-cb-red text-xs px-1">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Sobre o que você quer falar"
                    className={inputClass(!!errors.subject)}
                  />
                  {errors.subject && (
                    <span className="text-cb-red text-xs px-1">{errors.subject}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Conte sua mensagem aqui"
                    rows={4}
                    className={inputClass(!!errors.message) + ' resize-none'}
                  />
                  {errors.message && (
                    <span className="text-cb-red text-xs px-1">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-white font-semibold text-button hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensagem
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
