import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home.tsx';
import Events from './pages/Events.tsx';
import Community from './pages/Community.tsx';
import Blog from './pages/Blog.tsx';
import ContactPage from './pages/ContactPage.tsx';
import Challenges from './pages/Challenges.tsx';
import CommunityPage from './pages/CommunityPage.tsx';
import MemberProfilePage from './pages/MemberProfilePage.tsx';
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
  if (path === '/contato') return <ContactPage />;

  const PageContent = () => {
    if (path.startsWith('/comunidade/')) {
      const id = path.replace('/comunidade/', '');
      return <MemberProfilePage id={id} />;
    }
    switch (path) {
      case '/eventos':
        return <Events />;
      case '/comunidade':
        return <CommunityPage />;
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
