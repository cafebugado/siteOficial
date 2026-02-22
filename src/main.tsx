import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
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
  if (path !== '/') {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
      <Header />
      <main>
        <Home />
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
