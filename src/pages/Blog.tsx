import BlogComponent from '../components/home/Blog';

export default function Blog() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-h1 font-heading text-light-text dark:text-dark-text mb-4">
            Blog & Artigos
          </h1>
          <p className="text-large text-cb-gray-dark dark:text-cb-gray max-w-3xl mx-auto">
            Aprenda com tutoriais, artigos técnicos e dicas de desenvolvimento
          </p>
        </div>

        <BlogComponent />
      </div>
    </div>
  );
}
