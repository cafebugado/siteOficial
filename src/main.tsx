import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home.tsx';
import Events from './pages/Events.tsx';
import Community from './pages/Community.tsx';
import Blog from './pages/Blog.tsx';
import ContactForm from './pages/ContactForm.tsx';
import Challenges from './pages/Challenges.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './index.css';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
const path = window.location.pathname;

const getPage = () => {
  // Páginas sem layout completo
  if (path === '/form') return <ContactForm />;

  // Páginas com layout completo
  const PageContent = () => {
    switch (path) {
      case '/eventos':
        return <Events />;
      case '/comunidade':
        return <Community />;
      case '/blog':
        return <Blog />;
      case '/desafios':
        return <Challenges />;
      case '/':
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
      <Header />
      <main>
        <PageContent />
      </main>
      <Footer />
    </div>
  );
};

root.render(
  <StrictMode>
    <ThemeProvider>
      {getPage()}
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  </StrictMode>,
);
