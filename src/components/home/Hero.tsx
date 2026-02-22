import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Terminal, X } from 'lucide-react';
import { LinkButton } from '../ui';

const comunidades = [
  {
    label: 'Discord',
    href: 'https://discord.gg/FkDb6PxH',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://chat.whatsapp.com/CSma4uQURpSFsTpQSS6m9V',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/jornadati/58',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
];

function ComunidadeButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-white font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      >
        Entrar na Comunidade
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-xs sm:max-w-sm rounded-2xl bg-white dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C] shadow-2xl p-4 sm:p-6"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-cb-gray dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple hover:bg-cb-purple/10 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-h3 font-heading text-light-text dark:text-dark-text mb-1 text-center sm:text-left">
              Escolha seu canal
            </h2>
            <p className="text-body text-cb-gray-dark dark:text-cb-gray mb-6 text-center sm:text-left">
              Entre na nossa comunidade pela plataforma que preferir.
            </p>

            <div className="flex flex-col gap-3">
              {comunidades.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl border border-cb-gray-light dark:border-[#26262C] text-cb-gray-dark dark:text-cb-gray hover:border-cb-purple/50 dark:hover:border-cb-purple/50 hover:bg-cb-purple/5 dark:hover:bg-cb-purple/10 hover:text-cb-purple dark:hover:text-cb-purple transition-all group"
                >
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-cb-purple/10 dark:bg-cb-purple/20 text-cb-purple group-hover:bg-cb-purple group-hover:text-white transition-all">
                    {icon}
                  </span>
                  <span className="font-semibold text-base">{label}</span>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      glowRef.current.style.setProperty('--x', `${x * 100}%`);
      glowRef.current.style.setProperty('--y', `${y * 100}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = ['devs', 'iniciantes', 'ideias', 'conexões', 'projetos', 'comunidade'];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 pb-12 md:pt-20 md:pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dark:opacity-30 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 600px at var(--x, 50%) var(--y, 50%), rgba(139, 92, 246, 0.15), transparent 40%)',
        }}
      ></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-primary opacity-20 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-2 rounded-lg bg-cb-purple/10 border border-cb-purple/30 text-cb-purple-dark dark:text-cb-purple font-medium text-[11px] sm:text-sm mb-2 animate-fadeIn whitespace-nowrap">
              Bem-vindo à revolução dev com muito café e zero formalidade
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-light-text dark:text-dark-text animate-slideUp">
              {/* Mobile: 3 linhas centralizadas */}
              <div className="flex flex-col items-center gap-y-1 sm:hidden">
                <span>Onde</span>
                <span className="relative block overflow-visible text-center" style={{ minWidth: '6ch' }}>
                  <span className="invisible">comunidade</span>
                  {words.map((word, index) => (
                    <span key={word} className="absolute inset-0 flex items-center justify-center whitespace-nowrap bg-clip-text text-transparent bg-gradient-primary animate-wordRotate" style={{ animationDelay: `${index * 3}s` }}>
                      {word}
                    </span>
                  ))}
                </span>
                <span>se encontram</span>
              </div>
              {/* Desktop: duas linhas */}
              <div className="hidden sm:flex flex-col items-start gap-y-1">
                <div className="flex items-center gap-x-2">
                  <span>Onde</span>
                  <span className="relative inline-block overflow-visible" style={{ minWidth: '6ch' }}>
                    <span className="invisible">comunidade</span>
                    {words.map((word, index) => (
                      <span key={`d-${word}`} className="absolute left-0 top-0 whitespace-nowrap bg-clip-text text-transparent bg-gradient-primary animate-wordRotate" style={{ animationDelay: `${index * 3}s` }}>
                        {word}
                      </span>
                    ))}
                  </span>
                </div>
                <span>se encontram</span>
              </div>
            </h1>

            <p className="text-sm sm:text-large text-justify sm:text-left text-cb-gray-dark dark:text-cb-gray max-w-2xl mx-auto lg:mx-0 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Se você está dando os primeiros passos na tecnologia, este é o seu lugar. Aqui ninguém é julgado por não saber, todo mundo já foi iniciante. Troque experiências, tire dúvidas sem medo, encontre sua primeira oportunidade e cresça junto com uma comunidade que acredita que aprender em conjunto vai muito mais longe.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
              <ComunidadeButton />
              <LinkButton href="https://eventos.cafebugado.com.br/" variant="outline" external className="w-full sm:w-auto group">
                Ver projetos da comunidade
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </LinkButton>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <div className="relative w-full max-w-lg">
              {/* Terminal window */}
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center p-3 bg-gray-900">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-xs text-gray-400 font-mono">cafebugado.terminal</div>
                </div>
                <div className="p-3 sm:p-4 h-52 sm:h-64 overflow-hidden font-mono text-xs sm:text-sm">
                  <div className="text-green-400 mb-2 flex">
                    <Terminal className="w-4 h-4 mr-2" />
                    <span className="animate-typing overflow-hidden whitespace-nowrap">cd cafe-bugado</span>
                  </div>
                  <div className="text-cyan-400 mb-2 flex">
                    <Terminal className="w-4 h-4 mr-2" />
                    <span className="animate-typing overflow-hidden whitespace-nowrap" style={{ animationDelay: '1s' }}>
                      npm install comunidade
                    </span>
                  </div>
                  <div className="text-gray-400 mb-2 animate-fadeIn" style={{ animationDelay: '2s' }}>
                    Instalando pacotes...
                  </div>
                  <div className="text-gray-400 mb-2 animate-fadeIn" style={{ animationDelay: '3s' }}>
                    <span className="text-yellow-400">WARN</span> encontrado bug #42: café insuficiente
                  </div>
                  <div className="text-gray-400 mb-2 animate-fadeIn" style={{ animationDelay: '3.5s' }}>
                    <span className="text-cyan-400">INFO</span> preparando mais café...
                  </div>
                  <div className="text-gray-400 mb-2 animate-fadeIn" style={{ animationDelay: '4s' }}>
                    <span className="text-green-400">SUCCESS</span> café reabastecido!
                  </div>
                  <div className="text-green-400 mb-2 flex animate-fadeIn" style={{ animationDelay: '4.5s' }}>
                    <Terminal className="w-4 h-4 mr-2" />
                    <span className="animate-typing overflow-hidden whitespace-nowrap" style={{ animationDelay: '4.5s' }}>
                      npm start
                    </span>
                  </div>
                  <div className="text-purple-400 animate-pulse mt-4 animate-fadeIn" style={{ animationDelay: '5.5s' }}>
                    Café Bugado rodando em http://localhost:1337/ ✨
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-40 md:h-40 bg-gradient-primary opacity-30 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 md:w-40 md:h-40 bg-gradient-primary opacity-30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}