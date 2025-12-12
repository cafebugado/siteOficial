import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ContactForm = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSe8Z9duXYZ1234567890formID/viewform?embedded=true"
            width="100%"
            height="800"
            className="w-full max-w-3xl border rounded-lg shadow-lg bg-white dark:bg-gray-800"
            title="Formulário de Contato"
          >
            Carregando…
          </iframe>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ContactForm;
