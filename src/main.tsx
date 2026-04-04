import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import Home from './pages/Home.tsx';
import ContactPage from './pages/ContactPage.tsx';
import EventsPage from './pages/EventsPage.tsx';
import CommunityPage from './pages/CommunityPage.tsx';
import MemberProfilePage from './pages/MemberProfilePage.tsx';
import NotFound from './pages/NotFound.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from 'sonner';
import './index.css';

// Scroll para o topo ao mudar de rota
function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Layout raiz com Header e Footer
function RootLayout() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Rotas
const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const contatoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contato',
  component: ContactPage,
});

const eventosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/eventos',
  component: EventsPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

const comunidadeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/comunidade',
  component: CommunityPage,
});

const membroRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/comunidade/$id',
  component: MemberProfilePage,
});

const routeTree = rootRoute.addChildren([indexRoute, contatoRoute, eventosRoute, comunidadeRoute, membroRoute, notFoundRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  </StrictMode>,
);
