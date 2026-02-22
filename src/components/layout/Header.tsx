import { useState, useEffect } from 'react';
import { Home, Calendar, Zap, BookOpen, Users, Mail, Lock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Eventos', href: '#', badge: 'Em breve', icon: Calendar },
    { name: 'Desafios', href: '#', badge: 'Em breve', icon: Zap },
    { name: 'Blog', href: '#', badge: 'Em breve', icon: BookOpen },
    { name: 'Comunidade', href: '#', badge: 'Em breve', icon: Users },
    { name: 'Contato', href: '#', badge: 'Em breve', icon: Mail },
  ];

  return (
    <>
      {/* Header desktop */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-light-card/90 dark:bg-dark-bg/90 backdrop-blur-lg border-b border-cb-gray-light dark:border-[#26262C] shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 group">
              <img src="/logo.png" alt="Café Bugado" className="w-10 h-10 rounded-lg shadow-lg object-contain" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-primary">
                Café Bugado
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative flex items-center text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple font-medium transition-colors group"
                >
                  {item.badge && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-cb-purple text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {item.badge}
                    </span>
                  )}
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cb-purple group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            {/* Right side - Theme toggle */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
        <div className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-lg border border-cb-gray-light dark:border-[#26262C] rounded-2xl shadow-xl px-2 py-2 flex items-center justify-around">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple hover:bg-cb-purple/10 transition-all group"
                onClick={item.badge ? (e) => {
                  e.preventDefault();
                  setActiveTooltip(activeTooltip === item.name ? null : item.name);
                  setTimeout(() => setActiveTooltip(null), 2000);
                } : undefined}
              >
                {item.badge && (
                  <Lock className="absolute -top-1 -right-1 w-3 h-3 text-cb-purple" />
                )}
                {item.badge && activeTooltip === item.name && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-semibold rounded-lg bg-cb-purple text-white whitespace-nowrap shadow-lg z-10">
                    Em breve
                  </span>
                )}
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium leading-none">{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
