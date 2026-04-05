import { useEffect, useState } from 'react'
import { Github, Linkedin, MapPin, Search, Filter, ExternalLink, MessageCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { supabaseCommunity } from '../lib/supabaseCommunity'

interface Member {
  id: string
  full_name: string
  city: string
  uf: string
  interest_area: string
  linkedin_url: string | null
  github_url: string | null
  portfolio_url: string | null
  whatsapp: string | null
  job_title: string | null
  experience_level: string | null
  availability: string | null
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
]

const EXPERIENCE_LEVELS = [
  'Todos',
  'Iniciante',
  'Júnior',
  'Pleno',
  'Sênior',
  'Estudante',
  'Transição de carreira',
]

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function getGithubUsername(url: string | null): string | null {
  if (!url) return null
  try {
    const path = new URL(url).pathname.replace(/^\//, '').replace(/\/$/, '')
    const username = path.split('/')[0]
    return username || null
  } catch {
    return null
  }
}

function getGithubAvatarUrl(url: string | null): string | null {
  const username = getGithubUsername(url)
  if (!username) return null
  return `https://avatars.githubusercontent.com/${username}`
}

function getWhatsappUrl(phone: string | null): string | null {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/55${digits}`
}

function availabilityColor(availability: string | null) {
  if (!availability) return null
  if (availability === 'Disponível para trabalho')
    return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  if (availability === 'Aberto a oportunidades')
    return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
  return 'bg-cb-gray-light text-cb-gray-dark dark:bg-[#26262C] dark:text-cb-gray'
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col text-sm">
      <span className="text-xs text-cb-gray-dark dark:text-cb-gray">{label}</span>
      <span className="text-light-text dark:text-dark-text font-medium">{value}</span>
    </div>
  )
}

function Avatar({ member }: { member: Member }) {
  const [imgError, setImgError] = useState(false)
  const avatarUrl = getGithubAvatarUrl(member.github_url)

  if (avatarUrl && !imgError) {
    return (
      <img
        src={avatarUrl}
        alt={member.full_name}
        onError={() => setImgError(true)}
        className="w-16 h-16 rounded-full object-cover border-2 border-cb-gray-light dark:border-[#26262C] shrink-0"
      />
    )
  }

  return (
    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shrink-0 select-none">
      {getInitials(member.full_name)}
    </div>
  )
}

function MemberCard({ member }: { member: Member }) {
  const whatsappUrl = getWhatsappUrl(member.whatsapp)

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-primary rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-500 pointer-events-none" />
      <Link
        to="/comunidade/$id"
        params={{ id: member.id }}
        className="relative flex flex-col h-full p-5 bg-light-card dark:bg-dark-card rounded-xl border border-cb-gray-light dark:border-[#26262C] transition-all duration-300 cursor-pointer"
      >

        {/* Avatar + nome */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar member={member} />
          <div className="min-w-0">
            <h3 className="font-semibold text-light-text dark:text-dark-text leading-tight">{member.full_name}</h3>
            <p className="text-xs text-cb-gray-dark dark:text-cb-gray flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              {member.city}, {member.uf}
            </p>
          </div>
        </div>

        {/* Infos */}
        <div className="flex flex-col gap-1.5 mb-4">
          {member.job_title && (
            <InfoRow label="Cargo atual" value={member.job_title} />
          )}
          <InfoRow label="Área de interesse" value={member.interest_area} />
          {member.experience_level && (
            <InfoRow label="Nível de experiência" value={member.experience_level} />
          )}
          {member.availability && (
            <InfoRow label="Disponibilidade" value={member.availability} />
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3 mt-auto pt-3 border-t border-cb-gray-light dark:border-[#26262C]">
          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple transition-colors"
              aria-label={`LinkedIn de ${member.full_name}`}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {member.github_url && (
            <a
              href={member.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple transition-colors"
              aria-label={`GitHub de ${member.full_name}`}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-cb-gray-dark dark:text-cb-gray hover:text-green-500 dark:hover:text-green-400 transition-colors"
              aria-label={`WhatsApp de ${member.full_name}`}
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          )}
          {member.portfolio_url && (
            <a
              href={member.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs font-medium text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple transition-colors ml-auto"
              aria-label={`Portfólio de ${member.full_name}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Portfólio
            </a>
          )}
        </div>
      </Link>
    </div>
  )
}

export default function CommunityPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterArea, setFilterArea] = useState('Todos')
  const [filterLevel, setFilterLevel] = useState('Todos')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabaseCommunity
        .from('community_members')
        .select(
          'id, full_name, city, uf, interest_area, linkedin_url, github_url, portfolio_url, whatsapp, job_title, experience_level, availability'
        )
        .order('created_at', { ascending: false })

      if (!error && data) setMembers(data)
      setLoading(false)
    }

    fetchMembers()
  }, [])

  const filtered = members.filter((m) => {
    const matchSearch =
      search === '' ||
      m.full_name.toLowerCase().includes(search.toLowerCase()) ||
      m.city.toLowerCase().includes(search.toLowerCase()) ||
      (m.job_title ?? '').toLowerCase().includes(search.toLowerCase())

    const matchArea = filterArea === 'Todos' || m.interest_area === filterArea
    const matchLevel = filterLevel === 'Todos' || m.experience_level === filterLevel

    return matchSearch && matchArea && matchLevel
  })

  return (
    <div className="min-h-screen pt-20 pb-16 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-h1 font-heading text-light-text dark:text-dark-text mb-4">
            Nossa{' '}
            <span className="bg-clip-text text-transparent bg-gradient-primary">Comunidade</span>
          </h1>
          <p className="text-large text-cb-gray-dark dark:text-cb-gray max-w-2xl mx-auto">
            Conheça os membros que fazem parte do Café Bugado — desenvolvedores, designers e profissionais de tecnologia de todo o Brasil.
          </p>
          {!loading && members.length >= 50 && (
            <p className="mt-2 text-sm text-cb-gray-dark dark:text-cb-gray">
              {members.length} membros cadastrados
            </p>
          )}
          <a
            href="https://talentos.cafebugado.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-white font-medium hover:shadow-lg hover:shadow-cb-purple/20 transition-all hover:-translate-y-0.5"
          >
            Quero fazer parte da comunidade
          </a>
        </div>

        {/* Search + Filters — só exibe com 50+ membros */}
        {members.length >= 50 && <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cb-gray-dark dark:text-cb-gray" />
              <input
                type="text"
                placeholder="Buscar por nome, cidade, cargo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-cb-gray-light dark:border-[#26262C] bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text placeholder:text-cb-gray-dark dark:placeholder:text-cb-gray focus:outline-none focus:ring-2 focus:ring-cb-purple/50 transition"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition font-medium text-sm ${
                showFilters || filterArea !== 'Todos' || filterLevel !== 'Todos'
                  ? 'border-cb-purple bg-cb-purple/10 text-cb-purple'
                  : 'border-cb-gray-light dark:border-[#26262C] bg-light-card dark:bg-dark-card text-cb-gray-dark dark:text-cb-gray hover:border-cb-purple hover:text-cb-purple'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtros
              {(filterArea !== 'Todos' || filterLevel !== 'Todos') && (
                <span className="w-2 h-2 rounded-full bg-cb-purple" />
              )}
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 p-4 rounded-lg border border-cb-gray-light dark:border-[#26262C] bg-light-card dark:bg-dark-card">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-cb-gray-dark dark:text-cb-gray mb-1.5">
                  Área de interesse
                </label>
                <select
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-cb-gray-light dark:border-[#26262C] bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-cb-purple/50"
                >
                  {INTEREST_AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-cb-gray-dark dark:text-cb-gray mb-1.5">
                  Nível de experiência
                </label>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-cb-gray-light dark:border-[#26262C] bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-cb-purple/50"
                >
                  {EXPERIENCE_LEVELS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              {(filterArea !== 'Todos' || filterLevel !== 'Todos') && (
                <div className="flex items-end">
                  <button
                    onClick={() => { setFilterArea('Todos'); setFilterLevel('Todos') }}
                    className="px-3 py-2 text-sm text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple transition"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>
          )}
        </div>}

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-52 rounded-xl bg-light-card dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-cb-gray-dark dark:text-cb-gray">
            <p className="text-lg font-medium">Nenhum membro encontrado</p>
            <p className="text-sm mt-1">Tente ajustar os filtros ou a busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
