# Café Bugado - Site Oficial

Este repositório contém o código-fonte do site oficial do **Café Bugado**, uma comunidade descontraída para desenvolvedores que compartilham códigos, bugs e muito café.

## ✨ Funcionalidades
- Página inicial com animações e efeitos de luz interativos
- Grid de features com cards responsivos
- Modal "Entrar na Comunidade" com links para Discord, WhatsApp e Telegram
- Alternância entre tema claro e escuro
- Layout totalmente responsivo (mobile-first)
- Navegação mobile: barra flutuante na parte inferior com ícones e tooltip "Em breve"
- Página 404 personalizada (sem header/footer) com terminal decorativo
- Scrollbar customizada roxa e fina
- Background com cor do projeto desde o carregamento (sem flash branco)

## 🛠️ Tecnologias
- [React](https://react.dev) + [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) para ícones

## 📂 Estrutura de Pastas
```
src/
├── components/
│   ├── layout/      # Header (com nav mobile flutuante), Footer e ThemeToggle
│   ├── home/        # Hero (com modal de comunidade) e Features (cards)
│   └── ui/          # Button, LinkButton e exports
├── context/         # ThemeContext (dark/light mode)
├── pages/
│   ├── Home.tsx     # Página inicial
│   └── NotFound.tsx # Página 404 personalizada
├── tokens/          # Design tokens (cores, tipografia, espaçamento)
├── main.tsx         # Entrada e roteamento por pathname
└── index.css        # Estilos globais, animações e scrollbar customizada
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


## CI/CD e Fluxo de Desenvolvimento

- Branches: `prod` (padrão, produção) e `dev` (homologação). Crie features a partir de `dev`; hotfixes a partir de `prod`.
- Como começar uma feature: `git checkout dev && git pull && git checkout -b feature/minha-feature`. Desenvolva, rode `npm run lint && npm run build`, abra PR para `dev` (1 aprovação obrigatória). O workflow `CI` roda lint/build; se ok, faça merge via PR.
- Deploy de homologação: merge/push em `dev` aciona `Deploy` no GitHub Actions, publica preview na Vercel.
- Promover para produção: abra PR de `dev` para `prod` (ou `git checkout prod && git pull && git merge --no-ff dev`). Exige 1 aprovação + CI. Ao merge em `prod`, o `Deploy` publica produção na Vercel.
- Hotfix: `git checkout prod && git pull && git checkout -b hotfix/descricao`; PR para `prod`, depois back-merge de `prod` para `dev`.

### Workflows GitHub Actions
- `.github/workflows/ci.yml`: `npm ci`, `npm run lint`, `npm run build` em push/PR para `dev` e `prod`.
- `.github/workflows/deploy.yml`: mesmo setup e deploy com `amondnet/vercel-action@v25`; branch `dev` gera preview, `prod` gera deploy de produção (controle via `prod: ${{ github.ref == 'refs/heads/prod' }}`).

### Secrets obrigatórias (GitHub → Settings → Secrets and variables → Actions)
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Env local
- Copie `.env.example` para `.env` e preencha os valores (não comitar `.env`).

### Resumo de comandos
- Criar feature: `git checkout dev && git pull && git checkout -b feature/minha-feature`
- Validar local: `npm run lint && npm run build`
- Subir branch: `git push -u origin feature/minha-feature`
- PR para dev → preview; PR para prod → produção

