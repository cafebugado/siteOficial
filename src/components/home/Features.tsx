import { Users, Calendar, BookOpen, Code, Share2, Coffee, MessageSquare, Award } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <div
      className="group p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-cb-purple/50 dark:hover:border-cb-purple/40 hover:shadow-lg dark:hover:shadow-cb-purple/20 transition-all transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-cb-purple/5 dark:hover:from-gray-800 dark:hover:to-gray-800/80 animate-fadeIn"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      {/* Ícone e título na mesma linha (mobile e desktop) */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 md:p-3 rounded-lg bg-cb-purple/10 dark:bg-cb-purple/20 w-9 h-9 md:w-14 md:h-14 flex items-center justify-center text-cb-purple dark:text-cb-purple group-hover:bg-cb-purple/20 dark:group-hover:bg-cb-purple/30 transition-colors shrink-0">
          <span className="[&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-7 md:[&>svg]:h-7">{icon}</span>
        </div>
        <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default function Features() {
  const features = [
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Comunidade',
      description: 'Conecte-se com desenvolvedores, designers e entusiastas de tecnologia com interesses similares.'
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      title: 'Prática Real',
      description: 'Aplique o que aprende em desafios práticos e contribuições reais da comunidade.'
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: 'Artigos',
      description: 'Explore conteúdos escritos pela comunidade sobre tecnologias, tendências e boas práticas.'
    },
    {
      icon: <Code className="w-7 h-7" />,
      title: 'Projetos',
      description: 'Colabore em projetos open source e construa seu portfólio junto com a comunidade.'
    },
    {
      icon: <Share2 className="w-7 h-7" />,
      title: 'Networking',
      description: 'Amplie sua rede profissional e encontre mentores e parceiros para seus projetos.'
    },
    {
      icon: <Coffee className="w-7 h-7" />,
      title: 'Café',
      description: 'Porque não existe código sem café. Compartilhe sua bebida favorita enquanto programa.'
    },
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: 'Fórum',
      description: 'Faça perguntas, compartilhe soluções e ajude outros membros em um ambiente colaborativo.'
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: 'Reconhecimento',
      description: 'Ganhe destaque por suas contribuições e ajuda a outros membros da comunidade.'
    }
  ];

  return (
    <section id="about" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      {/* Blob decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-cb-purple/30 to-cb-purple-dark/30 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-cb-purple/30 to-cb-purple-dark/30 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16 animate-fadeIn">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="block md:inline">O que você encontra no</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-primary">Café Bugado</span>
          </h2>
          <p className="text-sm md:text-xl text-justify md:text-center text-gray-600 dark:text-gray-300">
            Muito mais que uma comunidade de tecnologia, somos um ponto de encontro para quem respira inovação.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}