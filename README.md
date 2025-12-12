# Café Bugado - Site Oficial

Este repositório contém o código-fonte do site oficial do **Café Bugado**, uma comunidade descontraída para desenvolvedores que compartilham códigos, bugs e muito café.

## ✨ Funcionalidades
- Página inicial com animações e efeitos de luz interativos
- Seções dedicadas para features, eventos, comunidade, blog e contato
- Formulário de contato com feedback visual de envio
- Alternância entre tema claro e escuro
- Layout responsivo construído com Tailwind CSS

## 🛠️ Tecnologias
- [React](https://react.dev) + [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) para ícones

## 📂 Estrutura de Pastas
```
src/
├── components/
│   ├── layout/      # Cabeçalho, rodapé e toggle de tema
│   └── home/        # Seções da página inicial (Hero, Eventos, Blog…)
├── context/         # Provedor de tema
├── App.tsx          # Composição das seções
├── main.tsx         # Entrada da aplicação
└── index.css        # Estilos globais
```

## 🚀 Começando
### Pré-requisitos
- Node.js 18+
- npm

### Instalação
```
npm install
```

### Ambiente de desenvolvimento
```
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` por padrão.

### Build de produção
```
npm run build
```
O build final será gerado na pasta `dist/`.

### Pré-visualização do build
```
npm run preview
```

### Lint
```
npm run lint
```

## 🤝 Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests com melhorias ou correções.

## 📄 Licença
Este projeto ainda não possui uma licença definida. Entre em contato com os mantenedores para mais informações.

