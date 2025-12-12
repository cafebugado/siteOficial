import { Trophy, Target, Clock, Users } from 'lucide-react';
import { challenges } from '../constants/challenges';

export default function Challenges() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-cb-green/10 text-cb-green dark:bg-cb-green/20';
      case 'Intermediário':
        return 'bg-cb-pink/10 text-cb-pink dark:bg-cb-pink/20';
      case 'Avançado':
        return 'bg-cb-red/10 text-cb-red dark:bg-cb-red/20';
      default:
        return 'bg-cb-gray/10 text-cb-gray-dark dark:bg-cb-gray/20 dark:text-cb-gray';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Frontend':
        return 'bg-cb-blue/10 text-cb-blue dark:bg-cb-blue/20';
      case 'Backend':
        return 'bg-cb-purple/10 text-cb-purple dark:bg-cb-purple/20';
      case 'Full-Stack':
        return 'bg-cb-purple-dark/10 text-cb-purple-dark dark:bg-cb-purple-dark/20';
      default:
        return 'bg-cb-gray/10 text-cb-gray-dark dark:bg-cb-gray/20 dark:text-cb-gray';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-dark-bg">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-2xl mb-6 shadow-lg">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-primary">
            Desafios de Programação
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-cb-gray-dark dark:text-cb-gray max-w-3xl mx-auto px-4">
            Teste suas habilidades, aprenda novas técnicas e compita com outros desenvolvedores da comunidade
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 shadow-lg border border-cb-gray-light dark:border-cb-gray-dark hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cb-gray-dark dark:text-cb-gray text-sm sm:text-base mb-1">Desafios Ativos</p>
                <p className="text-2xl sm:text-3xl font-bold text-cb-blue">{challenges.length}</p>
              </div>
              <div className="w-12 h-12 bg-cb-blue/10 dark:bg-cb-blue/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-cb-blue" />
              </div>
            </div>
          </div>

          <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 shadow-lg border border-cb-gray-light dark:border-cb-gray-dark hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cb-gray-dark dark:text-cb-gray text-sm sm:text-base mb-1">Participantes</p>
                <p className="text-2xl sm:text-3xl font-bold text-cb-purple">
                  {challenges.reduce((acc, c) => acc + c.participants, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-cb-purple/10 dark:bg-cb-purple/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-cb-purple" />
              </div>
            </div>
          </div>

          <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 shadow-lg border border-cb-gray-light dark:border-cb-gray-dark hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cb-gray-dark dark:text-cb-gray text-sm sm:text-base mb-1">Taxa de Conclusão</p>
                <p className="text-2xl sm:text-3xl font-bold text-cb-green">0%</p>
              </div>
              <div className="w-12 h-12 bg-cb-green/10 dark:bg-cb-green/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-cb-green" />
              </div>
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            return (
              <div
                key={challenge.id}
                className="bg-light-card dark:bg-dark-card rounded-xl overflow-hidden shadow-lg border border-cb-gray-light dark:border-cb-gray-dark hover:shadow-2xl transition-all duration-300 flex flex-col h-full group/card"
              >
                <div className={`h-2 bg-gradient-to-r ${challenge.color}`}></div>

                {/* Image Section or Title Placeholder */}
                {challenge.image ? (
                  <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br ${challenge.color} p-6">
                              <h4 class="text-white font-bold text-xl text-center leading-tight">
                                ${challenge.title}
                              </h4>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className={`w-full h-48 flex items-center justify-center bg-gradient-to-br ${challenge.color} p-6 flex-shrink-0`}>
                    <h4 className="text-white font-bold text-xl text-center leading-tight">
                      {challenge.title}
                    </h4>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${challenge.color} rounded-lg flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(challenge.category)}`}>
                        {challenge.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-light-text dark:text-dark-text line-clamp-2">
                    {challenge.title}
                  </h3>

                  <div className="relative mb-6 flex-grow">
                    <div className="overflow-hidden max-h-[4.5rem] group-hover/card:max-h-96 transition-all duration-500 ease-in-out">
                      <p className="text-cb-gray-dark dark:text-cb-gray text-sm leading-relaxed">
                        {challenge.description}
                      </p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-light-card dark:from-dark-card to-transparent pointer-events-none opacity-100 group-hover/card:opacity-0 transition-opacity duration-300"></div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-cb-gray-dark dark:text-cb-gray mb-6">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{challenge.timeLimit}</span>
                    </div>
                  </div>

                  {challenge.link ? (
                    <a
                      href={challenge.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3 px-4 bg-gradient-to-r ${challenge.color} text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-center mt-auto`}
                    >
                      Participar do Desafio
                    </a>
                  ) : (
                    <button className={`w-full py-3 px-4 bg-gradient-to-r ${challenge.color} text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 mt-auto`}>
                      Participar do Desafio
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
