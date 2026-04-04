import { useEffect, useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Github, Linkedin, MapPin, Briefcase, ArrowLeft, ExternalLink } from 'lucide-react';
import { supabaseCommunity } from '../lib/supabaseCommunity';

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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

const AVAILABILITY_COLORS: Record<string, string> = {
  'Disponível para trabalho': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  'Aberto a oportunidades': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  'Não disponível no momento': 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
};

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

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

function formatWhatsapp(raw: string): string {
  return raw.replace(/\D/g, '');
}

export default function MemberProfilePage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchMember() {
      const { data, error } = await supabaseCommunity
        .from('community_members')
        .select('id, full_name, city, uf, interest_area, about, linkedin_url, github_url, portfolio_url, whatsapp, job_title, experience_level, availability')
        .eq('id', id)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setMember(data);
      }
      setLoading(false);
    }

    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-cb-purple/30 border-t-cb-purple animate-spin" />
      </div>
    );
  }

  if (notFound || !member) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-light-bg dark:bg-dark-bg flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-cb-gray-dark dark:text-cb-gray">Membro não encontrado.</p>
        <Link to="/comunidade" className="text-cb-purple hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Voltar para a comunidade
        </Link>
      </div>
    );
  }

  const avatarUrl = getGithubAvatarUrl(member.github_url);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Voltar */}
        <Link
          to="/comunidade"
          className="inline-flex items-center gap-1.5 text-sm text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a comunidade
        </Link>

        {/* Card de perfil */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-cb-gray-light dark:border-[#26262C] overflow-hidden shadow-sm">
          {/* Banner gradiente */}
          <div className="h-24 bg-gradient-to-r from-cyan-500 to-purple-600" />

          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="relative -mt-12 mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-dark-card bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={member.full_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-white font-bold text-2xl">${getInitials(member.full_name)}</span>`;
                    }}
                  />
                ) : (
                  getInitials(member.full_name)
                )}
              </div>
            </div>

            {/* Nome + cargo */}
            <h1 className="text-2xl font-bold text-light-text dark:text-dark-text leading-tight">
              {member.full_name}
            </h1>
            {member.job_title && (
              <p className="flex items-center gap-1.5 text-sm text-cb-gray-dark dark:text-cb-gray mt-1">
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                {member.job_title}
              </p>
            )}

            {/* Localização */}
            <p className="flex items-center gap-1.5 text-sm text-cb-gray-dark dark:text-cb-gray mt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {member.city}, {member.uf}
            </p>

            {/* Badges */}
            <div className="flex flex-col gap-2 mt-5">
              {member.interest_area && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-cb-gray dark:text-cb-gray w-16 shrink-0">Área:</span>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-cb-purple/10 text-cb-purple dark:bg-cb-purple/20 dark:text-purple-300">
                    {member.interest_area}
                  </span>
                </div>
              )}
              {member.experience_level && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-cb-gray dark:text-cb-gray w-16 shrink-0">Nível:</span>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-cb-gray-light dark:bg-[#26262C] text-cb-gray-dark dark:text-cb-gray">
                    {member.experience_level}
                  </span>
                </div>
              )}
              {member.availability && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-cb-gray dark:text-cb-gray w-16 shrink-0">Status:</span>
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${AVAILABILITY_COLORS[member.availability] ?? 'bg-gray-100 text-gray-600'}`}>
                    {member.availability}
                  </span>
                </div>
              )}
            </div>

            {/* Sobre */}
            {member.about && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">Sobre</h2>
                <p className="text-sm text-cb-gray-dark dark:text-cb-gray leading-relaxed whitespace-pre-line">
                  {member.about}
                </p>
              </div>
            )}

            {/* Links */}
            {(member.linkedin_url || member.github_url || member.whatsapp || member.portfolio_url) && (
              <div className="mt-6 pt-5 border-t border-cb-gray-light dark:border-[#26262C] flex flex-wrap gap-2">
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#0A66C2]/10 text-[#0A66C2] dark:bg-[#0A66C2]/20 dark:text-[#5b9bd5] hover:bg-[#0A66C2]/20 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
                {member.github_url && (
                  <a
                    href={member.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-cb-gray-light dark:bg-[#26262C] text-light-text dark:text-dark-text hover:bg-cb-gray-light/70 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {member.whatsapp && (
                  <a
                    href={`https://wa.me/55${formatWhatsapp(member.whatsapp)}?text=${encodeURIComponent(`Olá, ${member.full_name.split(' ')[0]}! Vi seu perfil na comunidade do Café Bugado e queria conversar com você. 😊`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-colors"
                  >
                    <WhatsappIcon className="w-4 h-4" />
                    WhatsApp
                  </a>
                )}
                {member.portfolio_url && (
                  <a
                    href={member.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-cb-purple/10 text-cb-purple dark:bg-cb-purple/20 dark:text-purple-300 hover:bg-cb-purple/20 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Portfólio
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
