# Café Bugado — Site Oficial

Site oficial da comunidade **Café Bugado**, um espaço para desenvolvedores, designers e entusiastas de tecnologia que querem aprender, compartilhar e crescer juntos — com muito café e zero formalidade.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Roteamento | TanStack Router v1 |
| Estilização | Tailwind CSS v3 |
| Ícones | Lucide React |
| Banco de dados | Supabase (eventos) |
| E-mail | Resend |
| Notificações | Sonner |
| Validação | Zod |
| Deploy | Vercel |
| Gerenciador de pacotes | pnpm |

---

## Estrutura do projeto

```
src/
├── components/
│   ├── home/
│   │   ├── Hero.tsx          # Seção principal com animações e terminal
│   │   ├── Features.tsx      # Cards de funcionalidades da comunidade
│   │   └── Events.tsx        # Listagem de eventos via Supabase
│   ├── layout/
│   │   ├── Header.tsx        # Navegação desktop + mobile bottom bar
│   │   ├── Footer.tsx        # Rodapé com links e redes sociais
│   │   └── ThemeToggle.tsx   # Botão de alternância light/dark
│   └── ui/
│       ├── Button.tsx
│       ├── LinkButton.tsx
│       └── index.ts
├── context/
│   └── ThemeContext.tsx       # Contexto de tema (light/dark)
├── lib/
│   └── supabase.ts            # Cliente Supabase configurado
├── pages/
│   ├── Home.tsx               # Página inicial
│   ├── EventsPage.tsx         # Página de eventos (/eventos)
│   ├── ContactPage.tsx        # Página de contato (/contato)
│   └── NotFound.tsx           # Página 404
├── tokens/
│   └── index.ts               # Design tokens
└── main.tsx                   # Entry point + definição de rotas
```

---

## Rotas

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `Home` | Página inicial com Hero e Features |
| `/eventos` | `EventsPage` | Listagem de eventos futuros da comunidade |
| `/contato` | `ContactPage` | Formulário de contato |
| `*` | `NotFound` | Página 404 personalizada |

---

## Variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

```env
# Resend — envio de e-mails do formulário de contato
RESEND_API_KEY=sua_chave_aqui
CONTACT_TO_EMAIL=seu_email@gmail.com
CONTACT_FROM_EMAIL=Nome do Projeto <onboarding@resend.dev>

# Supabase — projeto agendas_eventos (somente leitura)
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui

# URL base da plataforma de eventos
VITE_EVENTOS_BASE_URL=https://eventos.cafebugado.com.br
```

> Nunca commite o arquivo `.env`. Ele já está no `.gitignore`.

---

## Integração de Eventos (Supabase)

Os eventos são lidos diretamente do banco de dados Supabase do projeto **agendas_eventos** usando a `anon key` (somente leitura). Nenhuma escrita é realizada por esta aplicação.

### Tabelas consumidas

| Tabela | Descrição |
|---|---|
| `eventos` | Dados do evento: nome, data, horário, imagem, modalidade, cidade etc. |
| `tags` | Categorias dos eventos (nome e cor) |
| `evento_tags` | Relação N:N entre eventos e tags |

### Comportamento na página `/eventos`

- Exibe apenas eventos **futuros** (a partir de hoje), ordenados pela data mais próxima
- Mostra **9 eventos** por vez
- Badge dinâmico na imagem do card: **Hoje** (pulsando) / **Amanhã** / **dia da semana** (para eventos em até 6 dias)
- Eventos sem tags recebem automaticamente a tag **Tech**
- Cada card redireciona para `eventos.cafebugado.com.br/eventos/{id}`
- O botão "Ver mais eventos" redireciona para `eventos.cafebugado.com.br/eventos`

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- pnpm

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

Acesse em `http://localhost:5173`.

### Build de produção

```bash
pnpm build
```

### Pré-visualização do build

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

---

## CI/CD e fluxo de desenvolvimento

### Branches

| Branch | Finalidade |
|---|---|
| `prod` | Produção (deploy automático na Vercel) |
| `dev` | Desenvolvimento / homologação (preview na Vercel) |

### Fluxo de uma feature

```bash
# Partir sempre de dev atualizado
git checkout dev && git pull
git checkout -b feature/minha-feature

# Após desenvolver, validar localmente
pnpm lint && pnpm build

# Subir a branch e abrir PR para dev
git push -u origin feature/minha-feature
```

- PR para `dev` → gera preview na Vercel
- PR de `dev` para `prod` → deploy em produção (exige 1 aprovação + CI verde)

### Hotfix

```bash
git checkout prod && git pull
git checkout -b hotfix/descricao
# Corrigir, abrir PR para prod
# Após merge, fazer back-merge de prod para dev
```

### Workflows GitHub Actions

| Workflow | Gatilho | O que faz |
|---|---|---|
| `ci.yml` | Push/PR em `dev` e `prod` | `pnpm install`, lint, build |
| `deploy.yml` | Push em `dev` ou `prod` | Deploy na Vercel (preview ou produção) |

### Secrets obrigatórias (GitHub → Settings → Secrets)

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## Comunidade

Entre pelo canal que preferir:

- [Discord](https://discord.gg/FkDb6PxH)
- [WhatsApp](https://chat.whatsapp.com/CSma4uQURpSFsTpQSS6m9V)
- [Telegram](https://t.me/jornadati/58)
- [LinkedIn](https://www.linkedin.com/company/cafebugado)
- [GitHub](https://github.com/cafebugado)
- [E-mail](mailto:comunidade.cafebugado@gmail.com)
