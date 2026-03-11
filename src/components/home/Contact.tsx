import { useState } from 'react';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
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

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpa o erro do campo ao digitar
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
        toast.success('Mensagem enviada com sucesso! Retornaremos em breve.');
        setForm({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        toast.error(data.error || 'Erro ao enviar mensagem. Tente novamente.');
      }
    } catch {
      toast.error('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactItems = [
    {
      icon: <Mail className="w-5 h-5 text-cb-purple" />,
      label: 'Email',
      value: 'comunidade.cafebugado@gmail.com',
      href: 'mailto:comunidade.cafebugado@gmail.com',
      description: 'Fale com a gente para dúvidas, sugestões ou parcerias. Resposta em até 24h.',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-cb-purple" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      ),
      label: 'WhatsApp',
      value: '+55 11 96188-9886',
      href: 'https://wa.me/5511961889886',
      description: 'Canal direto para falar com a comunidade e tirar dúvidas rápidas. Seg a sex, das 9h às 18h.',
    },
    {
      icon: <MapPin className="w-5 h-5 text-cb-purple" />,
      label: 'Localização',
      value: 'Brasil',
      href: null,
      description: 'Atendimento remoto para todo o Brasil.',
    },
  ];

  return (
    <section
      id="contato"
      className="py-8 md:py-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300 overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-h2 font-bold text-light-text dark:text-dark-text mb-3">
            Contato
          </h2>
          <span className="inline-block text-cb-purple text-sm font-semibold tracking-widest uppercase mb-3">
            Fale com a gente
          </span>
          <p className="text-body text-cb-gray max-w-xl mx-auto">
            Você conta sua ideia, dúvida ou sugestão e vamos conversar!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
          {/* Left: Contact Cards */}
          <div className="flex flex-col gap-4">
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-4 md:gap-4 md:p-5 rounded-xl border border-cb-gray-light dark:border-border-dark-subtle bg-light-card dark:bg-dark-card transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cb-purple/10 dark:bg-cb-purple/20 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-label font-semibold text-cb-gray uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-cb-purple dark:text-cb-purple font-semibold hover:text-cb-purple-dark transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-cb-purple font-semibold">{item.value}</span>
                  )}
                  <p className="text-sm text-cb-gray mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Contact Form */}
          <div className="p-4 md:p-6 rounded-xl border border-cb-gray-light dark:border-border-dark-subtle bg-light-card dark:bg-dark-card transition-colors duration-300">
            <h3
              id="fale-com-a-comunidade"
              tabIndex={-1}
              className="text-h4 font-bold text-light-text dark:text-dark-text mb-6 outline-none"
            >
              Fale com a comunidade
            </h3>

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
                  rows={5}
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
        </div>
      </div>
    </section>
  );
}
