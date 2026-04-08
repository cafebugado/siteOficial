import { useEffect, useState } from 'react'
import { useParams, Link } from '@tanstack/react-router'
import {
  Github,
  Linkedin,
  Globe,
  MapPin,
  Briefcase,
  MessageCircle,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react'
import { supabaseCommunity } from '../lib/supabaseCommunity'

interface Member {
  id: string
  full_name: string
  city: string
  uf: string
  interest_area: string
  about: string | null
  linkedin_url: string | null
  github_url: string | null
  portfolio_url: string | null
  whatsapp: string | null
  job_title: string | null
  experience_level: string | null
  availability: string | null
}

function getGithubUsername(url: string | null): string | null {
  if (!url) return null
  try {
    const path = new URL(url).pathname.replace(/^\//, '').replace(/\/$/, '')
    return path.split('/')[0] || null
  } catch {
    return null
  }
}

function getGithubAvatarUrl(url: string | null): string | null {
  const username = getGithubUsername(url)
  return username ? `https://avatars.githubusercontent.com/${username}` : null
}

function getWhatsappUrl(phone: string | null): string | null {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/55${digits}`
}

function availabilityStyle(availability: string | null) {
  if (availability === 'Disponível para trabalho')
    return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  if (availability === 'Aberto a oportunidades')
    return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
  return 'bg-cb-gray-light text-cb-gray-dark dark:bg-[#26262C] dark:text-cb-gray'
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
        className="w-28 h-28 rounded-full object-cover border-4 border-light-card dark:border-dark-card shadow-lg relative"
      />
    )
  }

  const initials = member.full_name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="w-28 h-28 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-3xl shadow-lg border-4 border-light-card dark:border-dark-card select-none">
      {initials}
    </div>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-cb-gray-light dark:border-[#26262C]">
      <span className="text-xs text-cb-gray-dark dark:text-cb-gray">{label}</span>
      <span className="font-medium text-light-text dark:text-dark-text">{value}</span>
    </div>
  )
}

export default function MemberProfile() {
  const { id } = useParams({ strict: false }) as { id: string }
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchMember() {
      const { data, error } = await supabaseCommunity
        .from('community_members')
        .select(
          'id, full_name, city, uf, interest_area, about, linkedin_url, github_url, portfolio_url, whatsapp, job_title, experience_level, availability'
        )
        .eq('id', id)
        .single()

      if (error || !data) {
        setNotFound(true)
      } else {
        setMember(data)
      }
      setLoading(false)
    }

    if (id) fetchMember()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-light-bg dark:bg-dark-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-8 w-32 rounded-lg bg-light-card dark:bg-dark-card animate-pulse" />
          <div className="h-48 rounded-xl bg-light-card dark:bg-dark-card animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-lg bg-light-card dark:bg-dark-card animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !member) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-light-bg dark:bg-dark-bg flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium text-light-text dark:text-dark-text">Membro não encontrado.</p>
        <Link
          to="/comunidade"
          className="flex items-center gap-2 text-cb-purple hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a comunidade
        </Link>
      </div>
    )
  }

  const whatsappUrl = getWhatsappUrl(member.whatsapp)

  return (
    <div className="min-h-screen pt-20 pb-16 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Voltar */}
        <Link
          to="/comunidade"
          className="inline-flex items-center gap-2 text-sm text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a comunidade
        </Link>

        {/* Hero do perfil */}
        <div className="relative rounded-2xl overflow-hidden bg-light-card dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C] mb-6">
          {/* Banner degradê */}
          <div className="h-28 bg-gradient-primary opacity-80" />

          {/* Avatar sobreposto */}
          <div className="px-6 pb-6">
            <div className="-mt-14 mb-4">
              <Avatar member={member} />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
                  {member.full_name}
                </h1>
                {member.job_title && (
                  <p className="flex items-center gap-1.5 text-cb-gray-dark dark:text-cb-gray mt-1">
                    <Briefcase className="w-4 h-4 shrink-0" />
                    {member.job_title}
                  </p>
                )}
                <p className="flex items-center gap-1.5 text-cb-gray-dark dark:text-cb-gray mt-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {member.city}, {member.uf}
                </p>
              </div>

              {/* Disponibilidade */}
              {member.availability && (
                <span className={`self-start px-3 py-1 text-sm rounded-full font-medium whitespace-nowrap ${availabilityStyle(member.availability)}`}>
                  {member.availability}
                </span>
              )}
            </div>

            {/* Links sociais */}
            <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-cb-gray-light dark:border-[#26262C]">
              {member.linkedin_url && (
                <a
                  href={member.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cb-gray-light dark:border-[#26262C] text-sm font-medium text-cb-gray-dark dark:text-cb-gray hover:border-cb-purple hover:text-cb-purple dark:hover:border-cb-purple dark:hover:text-cb-purple transition-colors"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cb-gray-light dark:border-[#26262C] text-sm font-medium text-cb-gray-dark dark:text-cb-gray hover:border-cb-purple hover:text-cb-purple dark:hover:border-cb-purple dark:hover:text-cb-purple transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cb-gray-light dark:border-[#26262C] text-sm font-medium text-cb-gray-dark dark:text-cb-gray hover:border-green-500 hover:text-green-500 dark:hover:border-green-400 dark:hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
              {member.portfolio_url && (
                <a
                  href={member.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cb-gray-light dark:border-[#26262C] text-sm font-medium text-cb-gray-dark dark:text-cb-gray hover:border-cb-purple hover:text-cb-purple dark:hover:border-cb-purple dark:hover:text-cb-purple transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Portfólio
                  <Globe className="w-3.5 h-3.5 opacity-50" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Sobre */}
        {member.about && (
          <div className="p-5 rounded-xl bg-light-card dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C] mb-6">
            <h2 className="text-sm font-semibold text-cb-gray-dark dark:text-cb-gray uppercase tracking-wide mb-3">
              Sobre
            </h2>
            <p className="text-light-text dark:text-dark-text leading-relaxed whitespace-pre-line">
              {member.about}
            </p>
          </div>
        )}

        {/* Informações profissionais */}
        <div className="p-5 rounded-xl bg-light-card dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C]">
          <h2 className="text-sm font-semibold text-cb-gray-dark dark:text-cb-gray uppercase tracking-wide mb-4">
            Informações profissionais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard label="Área de interesse" value={member.interest_area} />
            {member.experience_level && (
              <InfoCard label="Nível de experiência" value={member.experience_level} />
            )}
            {member.job_title && (
              <InfoCard label="Cargo atual" value={member.job_title} />
            )}
            <InfoCard label="Localização" value={`${member.city}, ${member.uf}`} />
            {member.availability && (
              <InfoCard label="Disponibilidade" value={member.availability} />
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
