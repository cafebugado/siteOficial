import { Code2, Zap, Target, Server, LucideIcon } from 'lucide-react';

export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  participants: number;
  timeLimit: string;
  icon: LucideIcon;
  color: string;
  link?: string;
  image?: string;
  category: 'Frontend' | 'Backend' | 'Full-Stack';
}

export const challenges: Challenge[] = [
  {
    id: 1,
    title: 'O Sorteador de Amigo Secreto do Noel',
    description: 'Você deve construir uma aplicação web front-end onde seja possível cadastrar os nomes dos participantes. Após o cadastro, o sistema deve realizar o sorteio internamente.',
    difficulty: 'Intermediário',
    participants: 0,
    timeLimit: '4 a 6 horas',
    icon: Target,
    color: 'from-[#EF4444] to-[#34D399]',
    link: 'https://darioreisjr.notion.site/Desafio-N-mero-4-da-Comunidade-Caf-Bugado-O-Sorteador-de-Amigo-Secreto-do-Noel-2be93b897cb680afaa04f5dcd290af03?pvs=74',
    image: '/images/challenges/sorteador-natal.png',
    category: 'Frontend'
  },
  {
    id: 2,
    title: 'Quiz Full-Stack com Painel de Cadastro',
    description: 'Construir uma aplicação onde: um admin cadastra perguntas, alternativas e a correta; um usuário joga um quiz gerado a partir dessas perguntas (por categoria e/ou dificuldade), vê pontuação e relatório final.',
    difficulty: 'Intermediário',
    participants: 10,
    timeLimit: '4 horas',
    icon: Code2,
    color: 'from-[#8B5CF6] to-[#6D28D9]',
    link: 'https://darioreisjr.notion.site/Desafio-N-mero-3-da-Comunidade-Caf-Bugado-Quiz-Full-Stack-com-Painel-de-Cadastro-1e793b897cb68076b25bedfdef60c8ab?pvs=74',
    category: 'Full-Stack'
  },
  {
    id: 3,
    title: 'API de Cadastro de Pessoas (Node.js + TypeScript)',
    description: 'Desenvolva uma API RESTful usando Node.js e TypeScript para gerenciar um cadastro de pessoas. A API deve ter documentação via Swagger e utilizar um banco de dados gratuito (SQLite ou MongoDB Atlas Free). Foco 100% em back-end — não é necessário front-end.',
    difficulty: 'Iniciante',
    participants: 32,
    timeLimit: '4 horas',
    icon: Server,
    color: 'from-[#6D28D9] to-[#4C1D95]',
    link: 'https://darioreisjr.notion.site/Desafio-N-mero-2-da-Comunidade-Caf-Bugado-Back-End-API-de-Cadastro-de-Pessoas-Node-js-TypeScr-1e693b897cb68098bb11c69df42ea5e2?pvs=74',
    category: 'Backend'
  }
];
