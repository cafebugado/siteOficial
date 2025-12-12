import React from 'react';
import { Clock, User, ArrowRight, Tag } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  link: string;
  featured?: boolean;
  delay: number;
}

function BlogCard({ 
  title, 
  excerpt, 
  coverImage, 
  category, 
  author, 
  publishDate, 
  readTime, 
  link, 
  featured = false,
  delay 
}: BlogCardProps) {
  return (
    <div 
      className={`group animate-fadeIn ${
        featured 
          ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-6' 
          : ''
      }`}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className={`overflow-hidden rounded-xl ${featured ? 'h-full' : 'mb-4'}`}>
        <img
          src={coverImage}
          alt={title}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className={`${featured ? 'flex flex-col justify-center' : ''}`}>
        <div className="mb-3 flex items-center space-x-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center">
            <Tag className="w-3 h-3 mr-1" />
            {category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
          <a href={link}>{title}</a>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{excerpt}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{author.name}</span>
          </div>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
          <User className="w-4 h-4 mr-1" />
          <span>{publishDate}</span>
        </div>
        
        <a
          href={link}
          className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors"
        >
          Continuar lendo
          <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default function Blog() {
  const blogPosts = [
    {
      title: "Como debugar eficientemente seu código React",
      excerpt: "Dicas e truques para encontrar e resolver bugs em aplicações React de forma rápida e eficiente, economizando tempo de desenvolvimento.",
      coverImage: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "React",
      author: {
        name: "Ana Silva",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      publishDate: "15 de Outubro, 2025",
      readTime: "8 min de leitura",
      link: "#",
      featured: true
    },
    {
      title: "Introdução ao DevOps para desenvolvedores",
      excerpt: "Aprenda os conceitos básicos de DevOps e como integrar estas práticas no seu fluxo de trabalho como desenvolvedor.",
      coverImage: "https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "DevOps",
      author: {
        name: "Carlos Santos",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      publishDate: "28 de Setembro, 2025",
      readTime: "12 min de leitura",
      link: "#"
    },
    {
      title: "Princípios de UI/UX que todo desenvolvedor deveria conhecer",
      excerpt: "Uma visão geral dos princípios fundamentais de design de interface e experiência do usuário que podem melhorar seus projetos.",
      coverImage: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Design",
      author: {
        name: "Juliana Ferreira",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      publishDate: "5 de Outubro, 2025",
      readTime: "10 min de leitura",
      link: "#"
    },
    {
      title: "O futuro da Inteligência Artificial no desenvolvimento de software",
      excerpt: "Como ferramentas baseadas em IA estão transformando o processo de desenvolvimento e quais habilidades serão valorizadas no futuro.",
      coverImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "AI",
      author: {
        name: "Marcos Oliveira",
        avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      publishDate: "22 de Setembro, 2025",
      readTime: "15 min de leitura",
      link: "#"
    },
    {
      title: "Estratégias para escalar seu banco de dados",
      excerpt: "Técnicas práticas para lidar com crescimento de dados e aumento de tráfego em sua aplicação sem comprometer a performance.",
      coverImage: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Backend",
      author: {
        name: "Patrícia Lima",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      publishDate: "10 de Outubro, 2025",
      readTime: "11 min de leitura",
      link: "#"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeIn">
              Nosso <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">Blog</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              Artigos, tutoriais e discussões sobre desenvolvimento, tecnologia e inovação.
            </p>
          </div>
          
          <a 
            href="#" 
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group animate-fadeIn"
            style={{ animationDelay: '0.2s' }}
          >
            Ver todos os posts
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard 
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              coverImage={post.coverImage}
              category={post.category}
              author={post.author}
              publishDate={post.publishDate}
              readTime={post.readTime}
              link={post.link}
              featured={post.featured}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}