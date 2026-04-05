import { useEffect, useState } from 'react'
import { Github, Linkedin, Globe, MapPin, Briefcase, Search, Filter } from 'lucide-react'
import { supabaseCommunity } from '../lib/supabaseCommunity'

interface Member {
  id: string
  full_name: string
  city: string
  uf: string
  interest_area: string
  about: string
  linkedin_url: string | null
  github_url: string | null
  portfolio_url: string | null
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

function availabilityColor(availability: string | null) {
  if (!availability) return 'bg-cb-gray-light text-cb-gray-dark dark:bg-[#26262C] dark:text-cb-gray'
  if (availability === 'Disponível para trabalho') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  if (availability === 'Aberto a oportunidades') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
  return 'bg-cb-gray-light text-cb-gray-dark dark:bg-[#26262C] dark:text-cb-gray'
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-primary rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-500 pointer-events-none" />
      <div className="relative flex flex-col h-full p-6 bg-light-card dark:bg-dark-card rounded-xl border border-cb-gray-light dark:border-[#26262C] transition-all duration-300">
        {/* Avatar + info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg shrink-0 select-none">
            {getInitials(member.full_name)}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-light-text dark:text-dark-text truncate">{member.full_name}</h3>
            {member.job_title && (
              <p className="text-sm text-cb-gray-dark dark:text-cb-gray truncate flex items-center gap-1">
                <Briefcase className="w-3 h-3 shrink-0" />
                {member.job_title}
              </p>
            )}
            <p className="text-sm text-cb-gray-dark dark:text-cb-gray flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              {member.city}, {member.uf}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-0.5 text-xs rounded-full bg-cb-purple/10 text-cb-purple font-medium">
            {member.interest_area}
          </span>
          {member.experience_level && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-cb-gray-light dark:bg-[#26262C] text-cb-gray-dark dark:text-cb-gray font-medium">
              {member.experience_level}
            </span>
          )}
        </div>

        {/* About */}
        {member.about && (
          <p className="text-sm text-cb-gray-dark dark:text-cb-gray line-clamp-3 mb-4 flex-1">
            {member.about}
          </p>
        )}

        {/* Availability */}
        {member.availability && (
          <span className={`self-start px-2 py-0.5 text-xs rounded-full font-medium mb-4 ${availabilityColor(member.availability)}`}>
            {member.availability}
          </span>
        )}

        {/* Links */}
        <div className="flex gap-3 mt-auto pt-2 border-t border-cb-gray-light dark:border-[#26262C]">
          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
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
              className="text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple transition-colors"
              aria-label={`GitHub de ${member.full_name}`}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {member.portfolio_url && (
            <a
              href={member.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple transition-colors"
              aria-label={`Portfólio de ${member.full_name}`}
            >
              <Globe className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
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
          'id, full_name, city, uf, interest_area, about, linkedin_url, github_url, portfolio_url, job_title, experience_level, availability'
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
      (m.job_title ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (m.about ?? '').toLowerCase().includes(search.toLowerCase())

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
          {!loading && (
            <p className="mt-2 text-sm text-cb-gray-dark dark:text-cb-gray">
              {members.length} {members.length === 1 ? 'membro cadastrado' : 'membros cadastrados'}
            </p>
          )}
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
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
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-light-card dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C] animate-pulse" />
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
