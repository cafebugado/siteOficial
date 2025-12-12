import React from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight, ExternalLink } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  time: string;
  attendees: number;
  image: string;
  tag: string;
  link: string;
  delay: number;
}

function EventCard({ title, date, location, time, attendees, image, tag, link, delay }: EventCardProps) {
  return (
    <div 
      className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeIn"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-cyan-500 text-white">
            {tag}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 z-20">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 mr-2 text-cyan-500" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="w-4 h-4 mr-2 text-cyan-500" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Users className="w-4 h-4 mr-2 text-cyan-500" />
            <span>{attendees} participantes</span>
          </div>
        </div>
        
        <div className="pt-2">
          <a 
            href={link}
            className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors"
          >
            Saiba mais
            <ExternalLink className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const events = [
    {
      title: "Workshop: React Avançado",
      date: "25 de Outubro, 2025",
      location: "Online",
      time: "19:00 - 21:00",
      attendees: 120,
      image: "https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tag: "Workshop",
      link: "#"
    },
    {
      title: "Meetup: DevOps na Prática",
      date: "10 de Novembro, 2025",
      location: "São Paulo, SP",
      time: "18:30 - 21:30",
      attendees: 85,
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tag: "Meetup",
      link: "#"
    },
    {
      title: "Hackathon: Soluções Sustentáveis",
      date: "05-07 de Dezembro, 2025",
      location: "Rio de Janeiro, RJ",
      time: "Fim de semana",
      attendees: 200,
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tag: "Hackathon",
      link: "#"
    },
    {
      title: "Palestra: IA e o Futuro do Desenvolvimento",
      date: "15 de Janeiro, 2026",
      location: "Online",
      time: "20:00 - 21:30",
      attendees: 350,
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tag: "Palestra",
      link: "#"
    }
  ];

  return (
    <section id="events" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeIn">
              Próximos <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">Eventos</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              Participe dos nossos eventos e conecte-se com a comunidade. Workshops, meetups, hackathons e muito mais!
            </p>
          </div>
          
          <a 
            href="#" 
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group animate-fadeIn"
            style={{ animationDelay: '0.2s' }}
          >
            Ver todos os eventos
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <EventCard 
              key={index}
              title={event.title}
              date={event.date}
              location={event.location}
              time={event.time}
              attendees={event.attendees}
              image={event.image}
              tag={event.tag}
              link={event.link}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}