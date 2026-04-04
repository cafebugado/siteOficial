import { Home, ArrowLeft } from 'lucide-react';
import { LinkButton } from '../components/ui';

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-24 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 dark:opacity-30 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Blobs decorativos */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-cb-purple/30 to-cb-purple-dark/30 rounded-full blur-3xl opacity-20 dark:opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-cb-purple/30 to-cb-purple-dark/30 rounded-full blur-3xl opacity-20 dark:opacity-15 pointer-events-none"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-primary opacity-10 animate-float"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              top: `${20 + i * 20}%`,
              left: `${10 + i * 25}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* 404 */}
        <div className="animate-fadeIn">
          <span className="text-[8rem] sm:text-[12rem] font-bold leading-none bg-clip-text text-transparent bg-gradient-primary select-none">
            404
          </span>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <span className="px-4 py-2 rounded-lg bg-cb-purple/10 border border-cb-purple/30 text-cb-purple-dark dark:text-cb-purple font-medium text-sm">
            Página não encontrada
          </span>
        </div>

        {/* Título */}
        <h1 className="text-2xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          Parece que esse link tomou um{' '}
          <span className="bg-clip-text text-transparent bg-gradient-primary">bug no café</span>
        </h1>

        {/* Descrição */}
        <p className="text-sm sm:text-large text-cb-gray-dark dark:text-cb-gray max-w-md mx-auto mb-10 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          A página que você está procurando não existe ou foi movida. Mas não se preocupe, a comunidade ainda está aqui pra você!
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <LinkButton href="/" variant="primary">
            <Home className="w-4 h-4" />
            Voltar ao início
          </LinkButton>
          <LinkButton href="javascript:history.back()" variant="outline">
            <ArrowLeft className="w-4 h-4" />
            Página anterior
          </LinkButton>
        </div>

        {/* Terminal decorativo */}
        <div className="mt-16 max-w-sm mx-auto animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="flex items-center p-3 bg-gray-900">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-xs text-gray-400 font-mono">cafebugado.terminal</div>
            </div>
            <div className="p-4 font-mono text-sm">
              <div className="text-red-400 mb-1">ERROR 404: page not found</div>
              <div className="text-gray-400 mb-1">
                <span className="text-yellow-400">WARN</span> rota inexistente detectada
              </div>
              <div className="text-gray-400 mb-1">
                <span className="text-cyan-400">INFO</span> redirecionando para o café...
              </div>
              <div className="text-green-400 animate-pulse mt-2">▋</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
