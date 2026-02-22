# Rotas do Site - Café Bugado

Este documento lista todas as rotas disponíveis no site.

## 📍 Rotas Principais

| Rota | Descrição | Componente |
|------|-----------|------------|
| `/` | Página inicial com Hero e Features | [Home.tsx](src/pages/Home.tsx) |
| `/*` (qualquer outra) | Página 404 personalizada | [NotFound.tsx](src/pages/NotFound.tsx) |

> **Nota:** Eventos, Desafios, Blog, Comunidade e Contato ainda não possuem páginas. Os itens do menu exibem um indicador de cadeado e tooltip "Em breve" ao serem clicados.

## 🧭 Navegação

### Desktop
Menu horizontal no header com os seguintes links:

- **Início** → `/`
- **Eventos** → `#` (Em breve)
- **Desafios** → `#` (Em breve)
- **Blog** → `#` (Em breve)
- **Comunidade** → `#` (Em breve)
- **Contato** → `#` (Em breve)

### Mobile
Barra de navegação flutuante na parte inferior da tela (`fixed bottom-4`), com ícone + nome para cada item. Itens "Em breve" exibem um ícone de cadeado e, ao toque, mostram tooltip "Em breve" por 2 segundos.

## 🔧 Configuração

As rotas são gerenciadas no arquivo [main.tsx](src/main.tsx) através de um sistema simples baseado em `window.location.pathname`.

### Como funciona:

```tsx
const path = window.location.pathname;

const getPage = () => {
  if (path !== '/') {
    // Sem header/footer na 404
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg ...">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg ...">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
};
```

### Configuração da Vercel

O arquivo [vercel.json](vercel.json) garante que rotas desconhecidas sejam servidas pelo `index.html`, preservando o pathname para que o JS identifique a rota 404:

```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

## ➕ Adicionando Novas Rotas

Para adicionar uma nova rota:

1. **Crie a página** em `src/pages/NomeDaPagina.tsx`
2. **Importe e adicione** no `main.tsx` dentro do `if` ou `switch`
3. **Adicione o link** no array `navItems` do `Header.tsx` (remova o `badge` para ativar)

### Exemplo:

```tsx
// 1. Criar src/pages/Eventos.tsx
export default function Eventos() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <h1>Eventos</h1>
    </div>
  );
}

// 2. Importar e adicionar no main.tsx
import Eventos from './pages/Eventos.tsx';

// Dentro de getPage(), antes do if (path !== '/'):
if (path === '/eventos') {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg ...">
      <Header />
      <main><Eventos /></main>
      <Footer />
    </div>
  );
}

// 3. No Header.tsx, remover o badge do item Eventos:
{ name: 'Eventos', href: '/eventos', icon: Calendar }
// (sem badge: 'Em breve')
```

## 📱 Responsividade

- **Mobile**: Barra flutuante no bottom com ícones (sem hamburger menu)
- **Tablet/Desktop**: Menu horizontal no header

---

**Última atualização:** 2026-02-22
