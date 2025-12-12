# Rotas do Site - Café Bugado

Este documento lista todas as rotas disponíveis no site.

## 📍 Rotas Principais

| Rota | Descrição | Componente |
|------|-----------|------------|
| `/` | Página inicial com Hero e Features | [Home.tsx](src/pages/Home.tsx) |
| `/eventos` | Página de eventos da comunidade | [Events.tsx](src/pages/Events.tsx) |
| `/desafios` | Página com desafios de programação | [Challenges.tsx](src/pages/Challenges.tsx) |
| `/blog` | Página com artigos e tutoriais | [Blog.tsx](src/pages/Blog.tsx) |
| `/comunidade` | Página da comunidade | [Community.tsx](src/pages/Community.tsx) |
| `/form` | Formulário de contato (Google Forms) | [ContactForm.tsx](src/pages/ContactForm.tsx) |

## 🧭 Navegação

O menu de navegação está disponível no [Header](src/components/layout/Header.tsx) e contém os seguintes links:

- **Início** → `/`
- **Eventos** → `/eventos`
- **Desafios** → `/desafios`
- **Blog** → `/blog`
- **Comunidade** → `/comunidade`
- **Contato** → `/form`

## 🔧 Configuração

As rotas são gerenciadas no arquivo [main.tsx](src/main.tsx) através de um sistema simples de roteamento baseado em `window.location.pathname`.

### Como funciona:

```tsx
const getPage = () => {
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
    <div className="min-h-screen">
      <Header />
      <main>
        <PageContent />
      </main>
      <Footer />
    </div>
  );
};
```

## ➕ Adicionando Novas Rotas

Para adicionar uma nova rota:

1. **Crie a página** em `src/pages/NomeDaPagina.tsx`
2. **Adicione a rota** no switch case do `main.tsx`
3. **Adicione o link** no array `navItems` do `Header.tsx`

### Exemplo:

```tsx
// 1. Criar src/pages/Sobre.tsx
export default function Sobre() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <h1>Sobre Nós</h1>
    </div>
  );
}

// 2. Importar e adicionar no main.tsx
import Sobre from './pages/Sobre.tsx';

case '/sobre':
  return <Sobre />;

// 3. Adicionar no Header.tsx
{ name: 'Sobre', href: '/sobre' }
```

## 📱 Responsividade

Todas as rotas são responsivas e adaptam-se a diferentes tamanhos de tela:
- Mobile: Menu hamburguer
- Tablet/Desktop: Menu horizontal completo

---

**Última atualização:** 2025-12-03
