import { Github, Twitter, Linkedin, Mail, Heart, Coffee, Code, } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 pt-16 pb-10 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
                <Code className="w-5 h-5 text-white absolute transform translate-x-2 -translate-y-2 opacity-70" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                Café Bugado
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Um ecossistema feito para devs e entusiastas da tecnologia que querem aprender de verdade, compartilhar sem medo e crescer juntos – com bugs, cafés e muito código no caminho.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Navegação</h3>
            <ul className="space-y-2">
              {['Início', 'Sobre', 'Eventos', 'Blog', 'Comunidade', 'Contato'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Recursos</h3>
            <ul className="space-y-2">
              {['Artigos', 'Tutoriais', 'Podcast', 'Newsletter', 'Vagas'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Contato</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fala com a gente! <br />
              Dúvidas, sugestões ou ideias malucas? Estamos aqui pra ouvir você. Bora conversar!
            </p>
            <a href="mailto:contato@cafebugado.com.br" className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
              Enviar mensagem
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
          <div className="flex items-center space-x-1 mb-2">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>bugs e muito café por gente que acredita no poder da colaboração.</span>
          </div>
          <p>© {currentYear} Café Bugado. Café Bugado. Bora codar?</p>
        </div>
      </div>
    </footer>
  );
}