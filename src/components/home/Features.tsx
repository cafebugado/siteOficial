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
      className="group p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-800 hover:shadow-lg dark:hover:shadow-cyan-900/20 transition-all transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-cyan-50 dark:hover:from-gray-800 dark:hover:to-gray-800/80 animate-fadeIn"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="mb-4 p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 w-14 h-14 flex items-center justify-center text-cyan-500 dark:text-cyan-400 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/30 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
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
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      {/* Blob decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-purple-600/30 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-purple-600/30 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            O que você encontra no <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">Café Bugado</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
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