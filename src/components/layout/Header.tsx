import { useState, useEffect } from 'react';
import { Menu, X, Code, Coffee } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Início', href: '/' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Desafios', href: '/desafios' },
    { name: 'Blog', href: '/blog' },
    { name: 'Comunidade', href: '/comunidade' },
    { name: 'Contato', href: '/form' }
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'bg-light-card/90 dark:bg-dark-bg/90 backdrop-blur-lg border-b border-cb-gray-light dark:border-[#26262C] shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-primary opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Coffee className="w-6 h-6 text-white relative z-10" />
              <Code className="w-6 h-6 text-white relative z-10 absolute transform translate-x-4 -translate-y-3 opacity-70" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-primary hidden sm:block">
              Café Bugado
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple font-medium transition-colors group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cb-purple group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right side - Theme toggle + Mobile menu button */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-cb-purple/10 dark:hover:bg-cb-purple/20"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-cb-gray-dark dark:text-cb-gray" />
              ) : (
                <Menu className="w-6 h-6 text-cb-gray-dark dark:text-cb-gray" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-light-card/95 dark:bg-dark-bg/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
      >
        <div className="flex flex-col h-full pt-20 p-8 space-y-8">
          {navItems.map(item => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-medium text-light-text dark:text-dark-text hover:text-cb-purple dark:hover:text-cb-purple transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}