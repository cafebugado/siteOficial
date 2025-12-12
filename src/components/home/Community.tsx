import { useState } from 'react';
import { Github, Linkedin, Twitter, MessageCircle, ThumbsUp } from 'lucide-react';

interface MemberCardProps {
  name: string;
  role: string;
  avatar: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  delay: number;
}

function MemberCard({ name, role, avatar, github, twitter, linkedin, delay }: MemberCardProps) {
  return (
    <div
      className="relative group"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
      <div className="relative flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl">
        <div className="relative">
          <div className="w-24 h-24 overflow-hidden rounded-full mb-4 bg-gray-100 dark:bg-gray-700">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs">
            <ThumbsUp className="w-3 h-3" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{role}</p>

        <div className="flex space-x-3">
          {github && (
            <a
              href={github}
              className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              aria-label={`GitHub de ${name}`}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              aria-label={`Twitter de ${name}`}
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              aria-label={`LinkedIn de ${name}`}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

interface TestimonialProps {
  name: string;
  role: string;
  avatar: string;
  message: string;
}

function Testimonial({ name, role, avatar, message }: TestimonialProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fadeIn">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h4>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{role}</p>
        </div>
      </div>
      <div className="relative">
        <MessageCircle className="absolute top-0 left-0 w-8 h-8 text-cyan-100 dark:text-cyan-900 transform -translate-x-2 -translate-y-2 z-0" />
        <p className="text-gray-600 dark:text-gray-300 relative z-10">
          "{message}"
        </p>
      </div>
    </div>
  );
}

export default function Community() {
  const [activeTab, setActiveTab] = useState<'members' | 'testimonials'>('members');

  const members = [
    {
      name: "Rômulo Almeida",
      role: "Desenvolvedor Back-end",
      avatar: "images/romulo-pereira.png",
      github: "#",
      twitter: "#",
      linkedin: "#"
    },
    {
      name: "Jocelia Farias",
      role: "Front-end - UI/UX Design",
      avatar: "images/jocelia-fernandes.jpg",
      github: "#",
      linkedin: "#"
    },
    {
      name: "Daniel Carvalho",
      role: "Desenvolvedor Back-end",
      avatar: "images/daniel-carvalho.jpg",
      github: "https://github.com/DanieelCarvalho",
      linkedin: "ttps://www.linkedin.com/in/daniel-carvalho-dev/"
    },
    {
      name: "Indaya Souza",
      role: "Segurança da Informação",
      avatar: "images/indaya-souza.jpg",
      github: "#",
      twitter: "#"
    },
    {
      name: "Patrícia Lima",
      role: "Data Scientist",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      linkedin: "#"
    },
    {
      name: "Rafael Costa",
      role: "Mobile Developer",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      github: "#",
      twitter: "#"
    },
    {
      name: "Fernanda Melo",
      role: "Product Manager",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      linkedin: "#"
    },
    {
      name: "Diego Alves",
      role: "Security Specialist",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      github: "#",
      twitter: "#"
    }
  ];

  const testimonials = [
    {
      name: "Mariana Costa",
      role: "Desenvolvedora Frontend",
      avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      message: "O Café Bugado mudou completamente minha trajetória profissional. As conexões que fiz aqui me levaram a oportunidades que eu jamais imaginaria."
    },
    {
      name: "Pedro Almeida",
      role: "Engenheiro de Software",
      avatar: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      message: "É incrível como a comunidade está sempre disposta a ajudar. Resolvi um problema que estava me incomodando por semanas em apenas um encontro."
    },
    {
      name: "Sofia Carvalho",
      role: "UX Designer",
      avatar: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      message: "Os eventos do Café Bugado sempre trazem temas atuais e relevantes. É o lugar perfeito para se manter atualizado com as tendências de tecnologia."
    },
    {
      name: "Lucas Mendes",
      role: "DevOps Specialist",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      message: "Entrei como um iniciante em tecnologia e recebi todo o suporte da comunidade. Hoje posso dizer que sou um profissional completo graças ao networking que fiz aqui."
    }
  ];

  return (
    <section id="community" className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nossa <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">Comunidade</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Conheça algumas das pessoas incríveis que fazem parte do Café Bugado e suas histórias de sucesso.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('members')}
              className={`px-6 py-2 rounded-full ${activeTab === 'members'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                } transition-colors`}
            >
              Membros em Destaque
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-2 rounded-full ${activeTab === 'testimonials'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                } transition-colors`}
            >
              Depoimentos
            </button>
          </div>
        </div>

        {activeTab === 'members' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <MemberCard
                key={index}
                name={member.name}
                role={member.role}
                avatar={member.avatar}
                github={member.github}
                twitter={member.twitter}
                linkedin={member.linkedin}
                delay={index}
              />
            ))}
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                avatar={testimonial.avatar}
                message={testimonial.message}
              />
            ))}
          </div>
        )}

        <div className="mt-16 text-center animate-fadeIn">
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-1"
          >
            Junte-se à comunidade
          </a>
        </div>
      </div>
    </section>
  );
}