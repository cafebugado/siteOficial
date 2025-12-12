import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent"></div>

      {/* Blob decorations */}
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-cyan-500/5 to-transparent"></div>
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-900/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-900/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Entre em <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">Contato</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Quer tirar uma dúvida ou fazer parte da comunidade mais bugadamente incrível da internet? Fala com a gente!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-2 animate-slideUp">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Informações de Contato
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      Email
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      contato@cafebugado.com.br
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      Localização
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Online, diretamente da nuvem
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      Discord
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a href="https://discord.gg/8TGmwjefnC" target='_blank'>
                        discord.gg/cafebugado
                      </a>
                    </p>
                    <br />
                    <p className="text-gray-600 dark:text-gray-400">
                      Junta com a gente por lá — é onde tudo acontece!
                    </p>

                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Estamos sempre online!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nossos encontros, bate-papos e trocas de conhecimento acontecem no Discord, de forma 100% remota. Vem participar quando quiser, no seu tempo.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Envie uma Mensagem
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-600 transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-600 transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Assunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-600 transition-all"
                      placeholder="Assunto da mensagem"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-600 transition-all resize-none"
                      placeholder="Sua mensagem..."
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting || formStatus !== 'idle'}
                      className={`w-full px-6 py-3 rounded-lg font-medium text-white transition-all transform hover:-translate-y-1 flex items-center justify-center ${isSubmitting
                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                        : formStatus === 'success'
                          ? 'bg-green-500 hover:bg-green-600'
                          : formStatus === 'error'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/20'
                        }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : formStatus === 'success' ? (
                        <span className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Mensagem enviada!
                        </span>
                      ) : formStatus === 'error' ? (
                        <span className="flex items-center">
                          <AlertCircle className="mr-2 h-5 w-5" />
                          Erro ao enviar
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-5 w-5" />
                          Enviar mensagem
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}