import { useEffect, useState } from 'react';
import { Github, Linkedin, MapPin, Briefcase, Search, Filter } from 'lucide-react';

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
import { supabaseCommunity } from '../lib/supabaseCommunity';

interface Member {
  id: string;
  full_name: string;
  city: string;
  uf: string;
  interest_area: string;
  about: string;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  whatsapp: string | null;
  job_title: string | null;
  experience_level: string | null;
  availability: string | null;
}

function getGithubAvatarUrl(githubUrl: string | null): string | null {
  if (!githubUrl) return null;
  try {
    const url = new URL(githubUrl);
    if (!url.hostname.includes('github.com')) return null;
    const username = url.pathname.replace(/^\//, '').split('/')[0];
    if (!username) return null;
    return `https://avatars.githubusercontent.com/${username}`;
  } catch {
    return null;
  }
}

function formatWhatsapp(raw: string): string {
  return raw.replace(/\D/g, '');
}

const INTEREST_AREAS = [
  'Todos',
  'Front-end',
  'Back-end',
  'Full Stack',
  'Mobile',
  'UI/UX',
  'DevOps',
  'QA',
  'Dados',
  'IA',
  'Segurança',
  'Outro',
];

const AVAILABILITY_COLORS: Record<string, string> = {
  'Disponível para trabalho': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  'Aberto a oportunidades': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  'Não disponível no momento': 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function MemberCard({ member }: { member: Member }) {
  const avatarUrl = getGithubAvatarUrl(member.github_url);

  return (
    <div className="relative group flex flex-col bg-white dark:bg-dark-card rounded-2xl border border-cb-gray-light dark:border-[#26262C] hover:border-cb-purple/50 dark:hover:border-cb-purple/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Gradient top bar */}
      <div className="h-1.5 bg-cb-purple w-0 group-hover:w-full transition-all duration-500" />

      {/* Link cobre o card inteiro, exceto os botões de ação */}
      <a
        href={`/comunidade/${member.id}`}
        className="absolute inset-0 z-0"
        aria-label={`Ver perfil de ${member.full_name}`}
      />

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Avatar + Nome */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-base">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={member.full_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<span class="text-white font-bold text-base">${getInitials(member.full_name)}</span>`;
                }}
              />
            ) : (
              getInitials(member.full_name)
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-light-text dark:text-dark-text truncate leading-tight">
              {member.full_name}
            </h3>
            {member.job_title && (
              <p className="text-xs text-cb-gray-dark dark:text-cb-gray truncate flex items-center gap-1 mt-0.5">
                <Briefcase className="w-3 h-3 shrink-0" />
                {member.job_title}
              </p>
            )}
          </div>
        </div>

        {/* Localização */}
        <div className="flex items-center gap-1 text-xs text-cb-gray-dark dark:text-cb-gray">
          <MapPin className="w-3 h-3 shrink-0" />
          <span>
            {member.city}, {member.uf}
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-col gap-1.5">
          {member.interest_area && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-cb-gray dark:text-cb-gray shrink-0">Área:</span>
              <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-cb-purple/10 text-cb-purple dark:bg-cb-purple/20 dark:text-purple-300">
                {member.interest_area}
              </span>
            </div>
          )}
          {member.experience_level && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-cb-gray dark:text-cb-gray shrink-0">Nível:</span>
              <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-cb-gray-light dark:bg-[#26262C] text-cb-gray-dark dark:text-cb-gray">
                {member.experience_level}
              </span>
            </div>
          )}
          {member.availability && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-cb-gray dark:text-cb-gray shrink-0">Status:</span>
              <span
                className={`px-2 py-0.5 text-[11px] font-medium rounded-full ${
                  AVAILABILITY_COLORS[member.availability] ?? 'bg-gray-100 text-gray-600'
                }`}
              >
                {member.availability}
              </span>
            </div>
          )}
        </div>

        {/* Links */}
        {(member.linkedin_url || member.github_url || member.portfolio_url || member.whatsapp) && (
          <div className="relative z-10 flex gap-2 pt-1 border-t border-cb-gray-light dark:border-[#26262C] mt-auto">
            {member.linkedin_url && (
              <a
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple hover:bg-cb-purple/10 transition-colors"
                aria-label={`LinkedIn de ${member.full_name}`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {member.github_url && (
              <a
                href={member.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple hover:bg-cb-purple/10 transition-colors"
                aria-label={`GitHub de ${member.full_name}`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {member.whatsapp && (
              <a
                href={`https://wa.me/55${formatWhatsapp(member.whatsapp)}?text=${encodeURIComponent(`Olá, ${member.full_name.split(' ')[0]}! Vi seu perfil na comunidade do Café Bugado e queria conversar com você. 😊`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-cb-gray-dark dark:text-cb-gray hover:text-green-500 dark:hover:text-green-400 hover:bg-green-500/10 transition-colors"
                aria-label={`WhatsApp de ${member.full_name}`}
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
            )}
            {member.portfolio_url && (
              <a
                href={member.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple hover:bg-cb-purple/10 transition-colors text-xs font-medium"
                aria-label={`Portfólio de ${member.full_name}`}
              >
                Portfolio
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todos');

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabaseCommunity
        .from('community_members')
        .select(
          'id, full_name, city, uf, interest_area, about, linkedin_url, github_url, portfolio_url, whatsapp, job_title, experience_level, availability'
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[Comunidade] Erro Supabase:', error);
        setError(`Erro: ${error.message}`);
      } else {
        console.log('[Comunidade] Membros recebidos:', data?.length, data);
        setMembers(data ?? []);
      }
      setLoading(false);
    }

    fetchMembers();
  }, []);

  const filtered = members.filter((m) => {
    const matchArea = selectedArea === 'Todos' || m.interest_area === selectedArea;
    const matchSearch =
      search.trim() === '' ||
      m.full_name.toLowerCase().includes(search.toLowerCase()) ||
      m.city.toLowerCase().includes(search.toLowerCase()) ||
      (m.job_title ?? '').toLowerCase().includes(search.toLowerCase());
    return matchArea && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16 animate-fadeIn">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="block md:inline">Nossa</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-primary">Comunidade</span>
          </h2>
          <p className="text-sm md:text-xl text-center text-gray-600 dark:text-gray-300">
            Conheça as pessoas que fazem a Café Bugado acontecer.
            <br />
            Aqui você encontra devs, designers e entusiastas que estão estudando, construindo projetos e evoluindo juntos todos os dias.
          </p>
          <p className="text-sm md:text-base text-center text-gray-500 dark:text-gray-400 mt-3">
            Explore os perfis, descubra projetos e conecte-se com quem está no mesmo caminho que você.
          </p>
          <a
            href="https://talentos.cafebugado.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-lg bg-gradient-primary text-white font-semibold hover:shadow-lg hover:shadow-cb-purple/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            Cadastrar na comunidade
          </a>
        </div>

        {/* Filtros — visível apenas com mais de 50 membros */}
        {members.length > 50 && <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Busca */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cb-gray" />
            <input
              type="text"
              placeholder="Buscar por nome, cidade ou cargo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C] text-light-text dark:text-dark-text placeholder-cb-gray text-sm focus:outline-none focus:border-cb-purple dark:focus:border-cb-purple transition-colors"
            />
          </div>

          {/* Filtro de área */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cb-gray pointer-events-none" />
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C] text-light-text dark:text-dark-text text-sm focus:outline-none focus:border-cb-purple dark:focus:border-cb-purple transition-colors appearance-none cursor-pointer"
            >
              {INTEREST_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>}

        {/* Contagem */}
        {!loading && !error && members.length > 50 && (
          <p className="text-sm text-cb-gray-dark dark:text-cb-gray mb-6">
            {filtered.length === 0
              ? 'Nenhum membro encontrado.'
              : `${filtered.length} membro${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
          </p>
        )}

        {/* Estados */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-2xl bg-white dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C] animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-cb-gray-dark dark:text-cb-gray">Nenhum membro encontrado para os filtros selecionados.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
