import { useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';

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

  const words = ['códigos', 'bugs', 'café', 'ideias', 'soluções', 'problemas'];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dark:opacity-30 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 600px at var(--x, 50%) var(--y, 50%), rgba(56, 189, 248, 0.15), transparent 40%)',
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
            <div className="inline-block px-4 py-2 rounded-full bg-cb-purple/10 border border-cb-purple/30 text-cb-purple-dark dark:text-cb-purple font-medium text-sm mb-2 animate-fadeIn">
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Bem-vindo à revolução dev com muito café e zero formalidade</span>
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-light-text dark:text-dark-text animate-slideUp">
              Onde
              <span className="relative inline-block px-2">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-primary">
                  {words.map((word, index) => (
                    <span key={word} className="absolute inset-0 animate-wordRotate" style={{ animationDelay: `${index * 2}s` }}>
                      {word}
                    </span>
                  ))}
                </span>
                <span className="absolute inset-0 h-full w-full bg-cb-purple/10 dark:bg-cb-purple/20 rounded-lg transform -skew-x-2"></span>
              </span>
              se encontram
            </h1>

            <p className="text-large text-cb-gray-dark dark:text-cb-gray max-w-2xl mx-auto lg:mx-0 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Um hub para desenvolvedores e entusiastas da tecnologia se conectarem, trocarem experiências, resolverem bugs e construírem juntos — tudo regado a muito código e café.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
              <a
                href="/comunidade"
                className="px-6 py-3 rounded-lg bg-gradient-primary text-white font-semibold hover:shadow-lg hover:shadow-cb-purple/30 transition-all transform hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                Entrar no Discord
              </a>
              <a
                href="/eventos"
                className="px-6 py-3 rounded-lg border-2 border-cb-purple text-cb-purple dark:text-cb-purple font-semibold hover:bg-cb-purple/10 transition-all w-full sm:w-auto text-center group flex items-center justify-center"
              >
                Ver projetos da comunidade
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-16 lg:mt-0 flex justify-center lg:justify-end animate-fadeIn" style={{ animationDelay: '0.6s' }}>
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
                <div className="p-4 h-64 overflow-hidden font-mono text-sm">
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
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-primary opacity-30 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-primary opacity-30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}