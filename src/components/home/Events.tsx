import { useEffect, useState } from 'react';
import { Calendar, CalendarDays, Clock, MapPin, ExternalLink, Monitor, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Tag {
  id: string;
  nome: string;
  cor: string;
}

interface Evento {
  id: string;
  nome: string;
  descricao: string | null;
  data_evento: string;
  horario: string;
  dia_semana: string | null;
  periodo: string | null;
  link: string | null;
  imagem: string | null;
  modalidade: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  tags: Tag[];
}

function parseEventDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  const [day, month, year] = dateStr.split('/');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function formatDateDisplay(dateStr: string): string {
  const date = parseEventDate(dateStr);
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(timeStr: string): string {
  if (!timeStr) return '';
  return timeStr.slice(0, 5);
}

function getEventDateLabel(dateStr: string): string | null {
  const date = parseEventDate(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Amanhã';
  if (diff <= 6) return date.toLocaleDateString('pt-BR', { weekday: 'long' }).replace(/^\w/, (c) => c.toUpperCase());
  return null;
}

const EVENTOS_BASE_URL = import.meta.env.VITE_EVENTOS_BASE_URL as string;

const periodoLabel: Record<string, string> = {
  Matinal: 'Manhã',
  Diurno: 'Dia todo',
  Vespertino: 'Tarde',
  Noturno: 'Noite',
};

const modalidadeIcon = {
  Online: <Monitor className="w-3.5 h-3.5" />,
  Presencial: <Users className="w-3.5 h-3.5" />,
  Híbrido: <Users className="w-3.5 h-3.5" />,
};

function EventCard({ event }: { event: Evento }) {
  const dateLabel = getEventDateLabel(event.data_evento);
  const eventoUrl = `${EVENTOS_BASE_URL}/eventos/${event.id}`;

  return (
    <a
      href={eventoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-cb-purple/50 dark:hover:border-cb-purple/40 hover:shadow-lg dark:hover:shadow-cb-purple/20 transition-all hover:-translate-y-1 overflow-hidden animate-fadeIn">
      {/* Imagem */}
      {event.imagem ? (
        <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
          <img
            src={event.imagem}
            alt={event.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {dateLabel && (
            <span className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold rounded-full text-white ${dateLabel === 'Hoje' ? 'bg-cb-purple animate-pulse' : 'bg-cb-purple/80'}`}>
              {dateLabel}
            </span>
          )}
        </div>
      ) : (
        <div className="relative h-44 shrink-0 bg-gradient-to-br from-cb-purple/20 to-cb-purple-dark/20 flex items-center justify-center">
          <Calendar className="w-12 h-12 text-cb-purple/40" />
          {dateLabel && (
            <span className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold rounded-full text-white ${dateLabel === 'Hoje' ? 'bg-cb-purple animate-pulse' : 'bg-cb-purple/80'}`}>
              {dateLabel}
            </span>
          )}
        </div>
      )}

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags — sempre exibe ao menos "Tech" */}
        <div className="flex flex-wrap gap-1.5 min-h-[22px]">
          {event.tags.length > 0 ? event.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-2 py-0.5 text-xs font-medium rounded-full text-white bg-cb-purple"
            >
              {tag.nome}
            </span>
          )) : (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full text-white bg-cb-purple">
              Tech
            </span>
          )}
        </div>

        {/* Título */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 min-h-[2.75rem]">
          {event.nome}
        </h3>

        {/* Metadados */}
        <div className="flex flex-col gap-1.5 mt-auto text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-cb-purple" />
            <span>{formatDateDisplay(event.data_evento)}</span>
          </div>

          {event.dia_semana && (
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 shrink-0 text-cb-purple" />
              <span>{event.dia_semana}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0 text-cb-purple" />
            <span>
              {formatTime(event.horario)}
              {event.periodo && ` · ${periodoLabel[event.periodo] ?? event.periodo}`}
            </span>
          </div>

          {event.modalidade && (
            <div className="flex items-center gap-1.5">
              <span className="text-cb-purple">
                {modalidadeIcon[event.modalidade as keyof typeof modalidadeIcon] ?? <Monitor className="w-3.5 h-3.5" />}
              </span>
              <span>{event.modalidade}</span>
            </div>
          )}

          {event.cidade && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-cb-purple" />
              <span>{event.cidade}{event.estado ? `/${event.estado}` : ''}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-cb-purple group-hover:text-cb-purple-dark transition-colors">
          Ver evento
          <ExternalLink className="w-3.5 h-3.5" />
        </span>
      </div>
    </a>
  );
}

const PAGE_SIZE = 9;

export default function Events() {
  const [events, setEvents] = useState<Evento[]>([]);
  const [visible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [eventsRes, tagsRes] = await Promise.all([
          supabase.from('eventos').select('*').order('data_evento', { ascending: true }),
          supabase.from('evento_tags').select('evento_id, tags(id, nome, cor)'),
        ]);

        if (eventsRes.error) throw eventsRes.error;
        if (tagsRes.error) throw tagsRes.error;

        const tagsMap: Record<string, Tag[]> = {};
        for (const row of tagsRes.data as unknown as { evento_id: string; tags: Tag }[]) {
          if (!tagsMap[row.evento_id]) tagsMap[row.evento_id] = [];
          tagsMap[row.evento_id].push(row.tags);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = eventsRes.data
          .filter((e) => parseEventDate(e.data_evento) >= today)
          .sort((a, b) => parseEventDate(a.data_evento).getTime() - parseEventDate(b.data_evento).getTime())
          .map((e) => ({ ...e, tags: tagsMap[e.id] || [] }));

        setEvents(upcoming);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section id="eventos" className="py-12 md:py-20 bg-white dark:bg-dark-bg relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Blob decorations */}
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-cb-purple/30 to-cb-purple-dark/30 rounded-full blur-3xl opacity-30 dark:opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-cb-purple/30 to-cb-purple-dark/30 rounded-full blur-3xl opacity-30 dark:opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16 animate-fadeIn">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="block md:inline">Próximos</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-primary">Eventos</span>
          </h2>
          <p className="text-sm md:text-xl text-center text-gray-600 dark:text-gray-300">
            Fique por dentro dos eventos da comunidade e não perca nenhuma novidade.
          </p>
        </div>

        {/* Estados */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-200 dark:bg-gray-700" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Não foi possível carregar os eventos. Tente novamente mais tarde.
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Nenhum evento disponível no momento. Fique ligado!
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {events.slice(0, visible).map((event, index) => (
                <div key={event.id} className="h-full" style={{ animationDelay: `${index * 0.08}s` }}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>

            {visible < events.length && (
              <div className="flex justify-center mt-10">
                <a
                  href={`${EVENTOS_BASE_URL}/eventos`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cb-purple/40 text-cb-purple font-semibold text-sm hover:bg-cb-purple hover:text-white transition-all duration-200"
                >
                  Ver mais eventos
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
