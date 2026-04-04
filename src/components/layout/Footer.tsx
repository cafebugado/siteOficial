import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Heart, Lock, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 pt-10 pb-24 md:pt-16 md:pb-10 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="hidden md:block col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Café Bugado" className="w-10 h-10 rounded-lg object-contain" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-primary">
                Café Bugado
              </span>
            </div>
            <p className="hidden md:block text-gray-600 dark:text-gray-400 text-justify">
              Um espaço para quem ama tecnologia, quer aprender de verdade e crescer junto com uma comunidade que abraça os bugs e celebra cada linha de código.
            </p>
            <div className="hidden md:flex space-x-4">
              <a href="https://github.com/cafebugado" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cb-purple dark:text-gray-400 dark:hover:text-cb-purple transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://discord.gg/vm4DgYpz2m" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cb-purple dark:text-gray-400 dark:hover:text-cb-purple transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
              </a>
              <a href="https://chat.whatsapp.com/CSma4uQURpSFsTpQSS6m9V" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cb-purple dark:text-gray-400 dark:hover:text-cb-purple transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </a>
              <a href="https://t.me/jornadati/58" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cb-purple dark:text-gray-400 dark:hover:text-cb-purple transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/comunidadecafebugado/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cb-purple dark:text-gray-400 dark:hover:text-cb-purple transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/cafebugado" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cb-purple dark:text-gray-400 dark:hover:text-cb-purple transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:comunidade.cafebugado@gmail.com" className="text-gray-500 hover:text-cb-purple dark:text-gray-400 dark:hover:text-cb-purple transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="hidden md:block space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Navegação</h3>
            <ul className="space-y-2">
              {[
                { name: 'Início', href: '/' },
                { name: 'Sobre', href: null },
                { name: 'Eventos', href: '/eventos' },
                { name: 'Blog', href: null },
                { name: 'Comunidade', href: '/comunidade' },
                { name: 'Contato', href: '/contato' },
              ].map(item => (
                <li key={item.name}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-cb-purple dark:text-gray-400 dark:hover:text-cb-purple transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="group inline-flex items-center gap-1.5 text-gray-400 dark:text-gray-600 cursor-default select-none">
                      {item.name}
                      <Lock className="w-3 h-3" />
                      <span className="text-xs font-medium text-cb-purple/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Em breve</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Recursos</h3>
            <ul className="space-y-2">
              {[
                { name: 'Artigos', href: null },
                { name: 'Tutoriais', href: null },
                { name: 'Podcast', href: 'https://www.youtube.com/@MaiconGerardi/podcasts' },
                { name: 'Newsletter', href: null },
                { name: 'Vagas', href: null },
              ].map(item => (
                <li key={item.name}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-cb-purple dark:text-gray-400 dark:hover:text-cb-purple transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="group inline-flex items-center gap-1.5 text-gray-400 dark:text-gray-600 cursor-default select-none">
                      {item.name}
                      <Lock className="w-3 h-3" />
                      <span className="text-xs font-medium text-cb-purple/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Em breve</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Contato</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fala com a gente! <br />
              Dúvidas, sugestões ou ideias malucas? Estamos aqui pra ouvir você. Bora conversar!
            </p>
            <a
              href="/form"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-primary text-white text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Enviar mensagem
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center text-xs md:text-sm">
          <div className="flex items-center space-x-1 mb-2">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-cb-purple fill-cb-purple" />
            <span className="hidden md:inline">bugs e muito café por gente que acredita no poder da colaboração.</span>
            <span className="md:hidden">bugs e café.</span>
          </div>
          <p>© {currentYear} Café Bugado</p>
        </div>
      </div>
      {/* Botão voltar ao topo */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-6 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-cb-purple text-white shadow-lg hover:bg-cb-purple-dark hover:-translate-y-0.5 transition-all duration-200"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}