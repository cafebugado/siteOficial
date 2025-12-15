import { useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="w-full max-w-5xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 space-y-8 mx-auto">
            <div className="space-y-3 text-center">
              <p className="text-sm uppercase tracking-wide text-cyan-600 dark:text-cyan-400 font-semibold">
                Contato
              </p>
              <h1 className="text-3xl font-bold">Fale com a comunidade Cafe Bugado</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Removemos o arquivo do Drive. Use o formulário ou os canais abaixo para falar diretamente com a gente.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="space-y-6 lg:col-span-1">
                <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-center">
                  <h2 className="text-xl font-semibold mb-2">Email</h2>
                  <p className="text-gray-700 dark:text-gray-200 break-words">comunidade@cafebugado.com.br</p>
                  <a
                    href="mailto:comunidade@cafebugado.com.br"
                    className="inline-flex mt-4 items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    Abrir email
                  </a>
                </div>

                <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-center">
                  <h2 className="text-xl font-semibold mb-2">Discord</h2>
                  <p className="text-gray-700 dark:text-gray-200">Entre no servidor para conversar ao vivo.</p>
                  <a
                    href="https://discord.gg/9pMEAthj"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex mt-4 items-center justify-center px-4 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white transition-all"
                  >
                    Abrir Discord
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div className="flex items-center justify-between gap-4">
                    {formStatus === 'success' && (
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        Mensagem enviada! Em breve retornamos.
                      </span>
                    )}
                    {formStatus === 'error' && (
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        Erro ao enviar. Tente novamente.
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`ml-auto px-6 py-3 rounded-lg font-medium text-white transition-all transform hover:-translate-y-1 ${
                        isSubmitting
                          ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/20'
                      }`}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ContactForm;
