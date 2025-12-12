# Café Bugado - Style Guide

Este documento contém as diretrizes de design e cores para o projeto Café Bugado.

## 📑 Índice

1. [Paleta de Cores](#-paleta-de-cores)
2. [Modos de Tema](#-modos-de-tema)
3. [Gradientes](#-gradientes)
4. [Tipografia](#️-tipografia)
   - [Famílias de Fonte](#famílias-de-fonte)
   - [Hierarquia Tipográfica](#hierarquia-tipográfica)
   - [Classes Tailwind](#classes-tailwind-de-tipografia)
5. [Espaçamentos](#-espaçamentos)
   - [Sistema de Espaçamento](#sistema-de-espaçamento)
   - [Guia de Uso por Contexto](#guia-de-uso-por-contexto)
   - [Exemplos Completos](#exemplos-completos)
6. [Uso no Tailwind](#-uso-no-tailwind)
7. [Componentes Padronizados](#-componentes-padronizados)
   - [Botões](#botões)
     - [Especificações Visuais](#especificações-visuais)
     - [Variantes Disponíveis](#variantes-disponíveis)
   - [Cards](#cards)
   - [Inputs](#inputs)
   - [Badges](#badges)
   - [Navbar](#navbar)
   - [Textos](#textos)
8. [Guia de Uso de Botões](#-guia-de-uso-de-botões)
9. [Responsividade](#-responsividade)
10. [Boas Práticas](#-boas-práticas)
11. [O que Evitar](#-evite)

## 🎨 Paleta de Cores

### Purple Palette (Principal)
```css
--cb-purple: #8B5CF6        /* Roxo principal - Ações e destaques */
--cb-purple-dark: #6D28D9   /* Roxo escuro - Variações e dark mode */
--cb-purple-deep: #4C1D95   /* Roxo profundo - Gradientes escuros */
```

### Neutrals (Neutras)
```css
--cb-white-soft: #F8F8FA    /* Branco suave - Fundos claros */
--cb-white: #FFFFFF         /* Branco puro - Cards e elementos */
--cb-gray-light: #E7E7EB    /* Cinza claro - Bordas e divisores */
--cb-gray: #C4C4C9          /* Cinza médio - Textos secundários */
--cb-gray-dark: #3A3A3F     /* Cinza escuro - Textos em light mode */
--cb-black-soft: #1A1A1D    /* Preto suave - Textos principais */
```

### Accents (Acentos)
```css
--cb-pink: #F472B6          /* Rosa - Alertas e destaques secundários */
--cb-blue: #60A5FA          /* Azul - Informações e links */
--cb-green: #34D399         /* Verde - Sucesso e confirmações */
--cb-red: #EF4444           /* Vermelho - Erros e avisos */
```

## 🌗 Modos de Tema

### Light Mode
```css
Background: #F8F8FA         /* var(--light-bg) */
Cards: #FFFFFF              /* var(--light-card) */
Text: #1A1A1D               /* var(--light-text) */
Action: #8B5CF6             /* var(--light-action) */
```

### Dark Mode
```css
Background: #0F0F12         /* var(--dark-bg) */
Cards: #18181C              /* var(--dark-card) */
Text: #F5F5F7               /* var(--dark-text) */
Action: #6D28D9             /* var(--dark-action) */
```

## 🎭 Gradientes

### Gradiente Primário
```css
linear-gradient(135deg, #8B5CF6, #6D28D9)
```
**Uso:** Botões principais, headers, elementos de destaque

### Gradiente Profundo
```css
linear-gradient(135deg, #6D28D9, #4C1D95)
```
**Uso:** Elementos secundários, backgrounds alternativos

## ✍️ Tipografia

### Famílias de Fonte

```css
--font-heading: 'Inter', system-ui, sans-serif
--font-body: 'Inter', system-ui, sans-serif
--font-mono: 'JetBrains Mono', 'Fira Code', monospace
```

**Fontes Recomendadas:**
- **Títulos:** Inter (Bold, SemiBold)
- **Texto geral:** Inter (Regular)
- **Código:** JetBrains Mono ou Fira Code

### Hierarquia Tipográfica

| Elemento | Tamanho | Peso | Line Height | Uso |
|----------|---------|------|-------------|-----|
| **H1** | 32px (2rem) | 700 | 2.5rem | Títulos principais de páginas |
| **H2** | 26px (1.625rem) | 600 | 2rem | Títulos de seções |
| **H3** | 22px (1.375rem) | 600 | 1.875rem | Subtítulos e cards |
| **H4** | 18px (1.125rem) | 500 | 1.625rem | Títulos menores |
| **Large** | 16px (1rem) | 400 | 1.5rem | Texto destacado |
| **Body** | 15px (0.9375rem) | 400 | 1.5rem | Texto padrão |
| **Label** | 13px (0.8125rem) | 500 | 1.25rem | Labels de formulário |
| **Button** | 15px (0.9375rem) | 600 | 1.5rem | Texto de botões |

### Classes Tailwind de Tipografia

```tsx
// Títulos
<h1 className="text-h1">Título Principal</h1>
<h2 className="text-h2">Seção</h2>
<h3 className="text-h3">Subtítulo</h3>
<h4 className="text-h4">Título Menor</h4>

// Textos
<p className="text-body">Texto padrão do corpo</p>
<p className="text-large">Texto destacado maior</p>
<label className="text-label">Label de formulário</label>

// Fontes especiais
<code className="font-mono">código aqui</code>
<h1 className="font-heading">Título</h1>
```

### Exemplos de Uso

#### Página com Hierarquia Clara
```tsx
<div>
  {/* Título principal */}
  <h1 className="text-h1 font-heading text-light-text dark:text-dark-text mb-4">
    Desafios de Programação
  </h1>

  {/* Descrição */}
  <p className="text-large text-cb-gray-dark dark:text-cb-gray mb-8">
    Teste suas habilidades e compita com outros desenvolvedores
  </p>

  {/* Seção */}
  <h2 className="text-h2 font-heading text-light-text dark:text-dark-text mb-6">
    Desafios Ativos
  </h2>

  {/* Card com título */}
  <div className="card">
    <h3 className="text-h3 font-heading mb-2">
      Nome do Desafio
    </h3>
    <p className="text-body text-cb-gray-dark dark:text-cb-gray">
      Descrição do desafio aqui
    </p>
  </div>
</div>
```

#### Formulário
```tsx
<form>
  <div className="mb-4">
    <label className="text-label text-cb-gray-dark dark:text-cb-gray block mb-2">
      Nome Completo
    </label>
    <input
      type="text"
      className="text-body w-full px-4 py-2"
      placeholder="Digite seu nome"
    />
  </div>
</form>
```

#### Código e Mono
```tsx
<div>
  <p className="text-body mb-2">
    Execute o comando:
  </p>
  <code className="font-mono text-label bg-cb-gray/10 px-2 py-1 rounded">
    npm install
  </code>
</div>
```

## 📐 Uso no Tailwind

### Classes de Cores
```tsx
// Cores principais
className="bg-cb-purple text-cb-white"
className="bg-cb-purple-dark text-cb-white"

// Cores com transparência
className="bg-cb-purple/10"  // 10% de opacidade
className="bg-cb-blue/20"    // 20% de opacidade

// Modo claro/escuro
className="bg-light-bg dark:bg-dark-bg"
className="text-light-text dark:text-dark-text"
```

### Classes de Gradientes
```tsx
// Gradiente primário
className="bg-gradient-primary"

// Gradiente profundo
className="bg-gradient-deep"

// Gradiente personalizado
className="bg-gradient-to-r from-cb-purple to-cb-purple-dark"
```

## 🎯 Componentes Padronizados

### Resumo Rápido

| Componente | Border Radius | Padding/Altura | Borda | Sombra |
|------------|---------------|----------------|-------|--------|
| **Botão Primary** | 8px (`rounded-lg`) | 12px × 20px (`py-3 px-5`) | none | - |
| **Botão Secondary** | 8px (`rounded-lg`) | 12px × 20px (`py-3 px-5`) | 2px roxo | - |
| **Card** | 12px (`rounded-xl`) | 24px (`p-6`) | 1px cinza | Leve (`shadow-md`) |
| **Input** | 8px (`rounded-lg`) | 42px altura (`h-[42px]`) | 1px cinza | Focus: anel roxo |
| **Badge** | full (`rounded-full`) | 8px × 12px (`py-1 px-3`) | none | - |
| **Navbar** | - | 64px altura (`h-16`) | inferior 1px | - |

### Botões

#### Especificações Visuais

##### Botão Primário (CTA)
**Design:**
- Fundo: `var(--cb-purple)` (#8B5CF6)
- Hover: `var(--cb-purple-dark)` (#6D28D9)
- Texto: Branco (#FFFFFF)
- Borda: none
- Border Radius: 8px
- Font Weight: 600
- Padding: 12px × 20px (`py-3 px-5`)

```tsx
<button className="bg-cb-purple hover:bg-cb-purple-dark text-white font-semibold px-5 py-3 rounded-lg transition-colors">
  Clique Aqui
</button>
```

##### Botão Secundário (Outline)
**Design:**
- Fundo: Transparente
- Borda: 2px sólido `var(--cb-purple)` (#8B5CF6)
- Texto: `var(--cb-purple)` (#8B5CF6)
- Hover: Fundo roxo claro com opacidade (#8B5CF610)
- Border Radius: 8px
- Font Weight: 600
- Padding: 12px × 20px (`py-3 px-5`)

```tsx
<button className="bg-transparent border-2 border-cb-purple text-cb-purple hover:bg-cb-purple/10 font-semibold px-5 py-3 rounded-lg transition-colors">
  Cancelar
</button>
```

#### Importação dos Componentes
```tsx
import Button from '@/components/ui/Button';
import LinkButton from '@/components/ui/LinkButton';
```

#### Variantes Disponíveis

##### Primary (Padrão)
Usado para ações principais e CTAs
```tsx
<Button variant="primary">
  Clique Aqui
</Button>
```

##### Secondary
Usado para ações secundárias
```tsx
<Button variant="secondary">
  Cancelar
</Button>
```

##### Outline
Usado para ações terciárias ou menos importantes
```tsx
<Button variant="outline">
  Ver Mais
</Button>
```

##### Ghost
Usado para ações sutis ou dentro de cards
```tsx
<Button variant="ghost">
  Opções
</Button>
```

##### Danger
Usado para ações destrutivas ou de alerta
```tsx
<Button variant="danger">
  Excluir
</Button>
```

#### Tamanhos Disponíveis

```tsx
<Button size="sm">Pequeno</Button>
<Button size="md">Médio (padrão)</Button>
<Button size="lg">Grande</Button>
```

#### Largura Total

```tsx
<Button fullWidth>
  Botão com largura total
</Button>
```

#### Estados

##### Loading
```tsx
<Button isLoading>
  Salvando...
</Button>
```

##### Disabled
```tsx
<Button disabled>
  Indisponível
</Button>
```

#### Link Button (Para Links Externos)

```tsx
// Link interno
<LinkButton href="/desafios" variant="primary">
  Ver Desafios
</LinkButton>

// Link externo
<LinkButton
  href="https://example.com"
  variant="primary"
  external
>
  Visitar Site
</LinkButton>
```

#### Exemplos Completos

```tsx
// Botão primário com ícone
<Button variant="primary" size="lg">
  <Icon className="w-5 h-5" />
  Participar do Desafio
</Button>

// Botão de ação em formulário
<Button
  variant="primary"
  fullWidth
  onClick={handleSubmit}
>
  Enviar Formulário
</Button>

// Botão de loading
<Button
  variant="primary"
  isLoading={isSubmitting}
  disabled={isSubmitting}
>
  Salvar
</Button>

// Link externo estilizado como botão
<LinkButton
  href="https://notion.so/desafio"
  variant="primary"
  external
>
  Ver Detalhes no Notion
</LinkButton>
```

#### Classes CSS Diretas (quando necessário)

Se não puder usar o componente, use estas classes:

```tsx
// Botão primário
<button className="bg-gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
  Clique aqui
</button>

// Botão secundário
<button className="bg-cb-purple/10 text-cb-purple px-6 py-3 rounded-lg font-semibold hover:bg-cb-purple/20 transition-all duration-200">
  Secundário
</button>

// Botão outline
<button className="border-2 border-cb-purple text-cb-purple px-6 py-3 rounded-lg font-semibold hover:bg-cb-purple/10 transition-all duration-200">
  Outline
</button>
```

### Cards

#### Especificações Visuais

**Design:**
- **Light Mode:** Fundo #FFFFFF, Borda 1px `var(--cb-gray-light)` (#E7E7EB)
- **Dark Mode:** Fundo #18181C, Borda 1px #26262C
- Border Radius: 12px
- Padding: 24px (`p-6`)
- Sombra: Leve (`shadow-sm` ou `shadow-md`)

```tsx
// Card padrão
<div className="bg-light-card dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C] rounded-xl p-6 shadow-md">
  <h3 className="text-h3 text-light-text dark:text-dark-text mb-2">Título do Card</h3>
  <p className="text-body text-cb-gray-dark dark:text-cb-gray">Descrição do card</p>
</div>
```

#### Card com Hover
```tsx
<div className="bg-light-card dark:bg-dark-card border border-cb-gray-light dark:border-[#26262C] rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
  <h3 className="text-h3 text-light-text dark:text-dark-text mb-2">Card Interativo</h3>
  <p className="text-body text-cb-gray-dark dark:text-cb-gray">Hover para ver efeito</p>
</div>
```

### Inputs

#### Especificações Visuais

**Design:**
- **Light Mode:** Fundo #FFFFFF, Borda 1px `var(--cb-gray)` (#C4C4C9)
- **Dark Mode:** Fundo #18181C, Borda 1px `var(--cb-gray)` (#C4C4C9)
- Border Radius: 8px
- Altura: 42px
- Padding: 12px × 16px (`py-3 px-4`)
- **Focus:** Borda `var(--cb-purple)` (#8B5CF6)

```tsx
// Input padrão
<input
  type="text"
  className="w-full h-[42px] px-4 py-3 bg-white dark:bg-dark-card border border-cb-gray rounded-lg text-body text-light-text dark:text-dark-text focus:outline-none focus:border-cb-purple focus:ring-2 focus:ring-cb-purple/20 transition-colors"
  placeholder="Digite aqui..."
/>
```

#### Input com Label
```tsx
<div className="space-y-2">
  <label className="text-label text-cb-gray-dark dark:text-cb-gray block">
    Nome Completo
  </label>
  <input
    type="text"
    className="w-full h-[42px] px-4 py-3 bg-white dark:bg-dark-card border border-cb-gray rounded-lg text-body focus:outline-none focus:border-cb-purple focus:ring-2 focus:ring-cb-purple/20"
    placeholder="João Silva"
  />
</div>
```

### Badges

#### Especificações Visuais

##### Badge Roxo (Padrão)
- Fundo: #8B5CF622 (roxo com 13% opacidade)
- Texto: #6D28D9 (`var(--cb-purple-dark)`)

##### Badge Verde (Sucesso)
- Fundo: #34D39922 (verde com 13% opacidade)
- Texto: #059669

##### Badge Vermelho (Erro/Alerta)
- Fundo: #EF444422 (vermelho com 13% opacidade)
- Texto: #B91C1C

```tsx
// Badge roxo
<span className="bg-[#8B5CF622] text-cb-purple-dark px-3 py-1 rounded-full text-xs font-semibold">
  Padrão
</span>

// Badge verde
<span className="bg-[#34D39922] text-[#059669] px-3 py-1 rounded-full text-xs font-semibold">
  Sucesso
</span>

// Badge vermelho
<span className="bg-[#EF444422] text-[#B91C1C] px-3 py-1 rounded-full text-xs font-semibold">
  Erro
</span>

// Usando classes do Tailwind (alternativa)
<span className="bg-cb-green/10 text-cb-green px-3 py-1 rounded-full text-xs font-semibold">
  Sucesso
</span>
```

### Navbar

#### Especificações Visuais

**Design:**
- **Light Mode:** Fundo #FFFFFF (`var(--light-card)`)
- **Dark Mode:** Fundo #0F0F12 (`var(--dark-bg)`)
- Borda inferior: Suave, 1px (#E7E7EB no light, #26262C no dark)
- Logo: Pequeno e compacto
- Menu: Compacto
- **Hover dos links:** Sublinhado curto + cor roxa

```tsx
<nav className="bg-light-card dark:bg-dark-bg border-b border-cb-gray-light dark:border-[#26262C] fixed w-full top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src="/logo.svg" alt="Logo" className="h-8" />
      </div>

      {/* Menu */}
      <div className="flex gap-6">
        <a
          href="/desafios"
          className="text-body text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple transition-colors relative group"
        >
          Desafios
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cb-purple group-hover:w-full transition-all duration-300"></span>
        </a>
        <a
          href="/sobre"
          className="text-body text-cb-gray-dark dark:text-cb-gray hover:text-cb-purple dark:hover:text-cb-purple transition-colors relative group"
        >
          Sobre
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cb-purple group-hover:w-full transition-all duration-300"></span>
        </a>
      </div>
    </div>
  </div>
</nav>
```

### Textos
```tsx
// Título principal
<h1 className="text-h1 text-light-text dark:text-dark-text">
  Título Principal
</h1>

// Texto secundário
<p className="text-body text-cb-gray-dark dark:text-cb-gray">
  Descrição ou texto secundário
</p>

// Texto com gradiente
<h1 className="text-h1 bg-clip-text text-transparent bg-gradient-primary">
  Título com Gradiente
</h1>
```

## 📏 Espaçamentos

### Sistema de Espaçamento

O projeto utiliza um sistema baseado em múltiplos de 4px para consistência:

| Valor | Pixels | Tailwind | Uso Recomendado |
|-------|--------|----------|----------------|
| **1** | 4px | `gap-1`, `p-1`, `m-1` | Espaçamento mínimo |
| **2** | 8px | `gap-2`, `p-2`, `m-2` | Listas, itens próximos |
| **3** | 12px | `gap-3`, `p-3`, `m-3` | Componentes internos, botões (padding horizontal) |
| **4** | 16px | `gap-4`, `p-4`, `m-4` | Componentes internos, gap padrão |
| **5** | 20px | `gap-5`, `p-5`, `m-5` | Cards (padding), seções pequenas |
| **6** | 24px | `gap-6`, `p-6`, `m-6` | Cards (padding), seções pequenas |
| **8** | 32px | `gap-8`, `p-8`, `m-8` | Seções médias |
| **10** | 40px | `gap-10`, `p-10`, `m-10` | Seções médias |
| **12** | 48px | `gap-12`, `p-12`, `m-12` | Seções médias a grandes |
| **16** | 64px | `gap-16`, `p-16`, `m-16` | Seções grandes |

### Guia de Uso por Contexto

#### Seções Grandes
```tsx
// Espaçamento entre seções principais (64px)
<section className="mb-16">
  <div className="py-16">
    {/* Conteúdo */}
  </div>
</section>
```

#### Cards
```tsx
// Padding interno de cards (20-24px)
<div className="p-5">  {/* 20px */}
  {/* ou */}
</div>
<div className="p-6">  {/* 24px */}
  {/* Conteúdo do card */}
</div>
```

#### Botões
```tsx
// Padding de botões (12px vertical x 20px horizontal)
<button className="px-5 py-3">  {/* 20px x 12px */}
  Clique Aqui
</button>

// Botão grande
<button className="px-6 py-4">  {/* 24px x 16px */}
  Botão Grande
</button>
```

#### Componentes Internos
```tsx
// Gap entre elementos relacionados (12-16px)
<div className="flex gap-3">  {/* 12px */}
  <Icon />
  <span>Texto</span>
</div>

<div className="grid grid-cols-3 gap-4">  {/* 16px */}
  <Card />
  <Card />
  <Card />
</div>
```

#### Listas
```tsx
// Gap entre itens de lista (8px)
<ul className="flex flex-col gap-2">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

### Exemplos Completos

#### Layout de Página
```tsx
<div className="min-h-screen py-16 px-4">  {/* 64px vertical, 16px horizontal */}
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <header className="mb-12">  {/* 48px */}
      <h1 className="mb-4">Título</h1>  {/* 16px */}
      <p className="mb-8">Descrição</p>  {/* 32px */}
    </header>

    {/* Stats Grid */}
    <div className="grid grid-cols-3 gap-6 mb-16">  {/* 24px gap, 64px margin */}
      {/* Cards */}
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-3 gap-8">  {/* 32px */}
      {/* Cards */}
    </div>
  </div>
</div>
```

#### Card Completo
```tsx
<div className="p-6 space-y-4">  {/* 24px padding, 16px entre filhos */}
  <div className="flex items-center justify-between mb-4">  {/* 16px */}
    <Icon />
    <Badge />
  </div>

  <h3 className="mb-3">Título do Card</h3>  {/* 12px */}

  <p className="mb-6">Descrição do card</p>  {/* 24px */}

  <div className="flex gap-2">  {/* 8px entre botões */}
    <Button>Ação 1</Button>
    <Button>Ação 2</Button>
  </div>
</div>
```

#### Formulário
```tsx
<form className="space-y-6">  {/* 24px entre campos */}
  <div className="space-y-2">  {/* 8px entre label e input */}
    <label className="block">Nome</label>
    <input className="px-4 py-3" />  {/* 16px x 12px */}
  </div>

  <div className="space-y-2">
    <label className="block">Email</label>
    <input className="px-4 py-3" />
  </div>

  <div className="flex gap-3 pt-4">  {/* 12px entre botões */}
    <Button variant="ghost">Cancelar</Button>
    <Button variant="primary">Enviar</Button>
  </div>
</form>
```

### Utilitários Tailwind

#### space-y / space-x
```tsx
// Aplica margin-bottom automaticamente entre filhos
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### gap (para Flexbox e Grid)
```tsx
// Espaçamento em flex containers
<div className="flex gap-3">
  <Item />
  <Item />
</div>

// Espaçamento em grid
<div className="grid grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

## 📱 Responsividade

Todas as classes Tailwind suportam breakpoints:
```tsx
className="text-sm sm:text-base md:text-lg lg:text-xl"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="px-4 sm:px-6 lg:px-8"  // Espaçamento responsivo
className="gap-4 sm:gap-6 lg:gap-8"  // Gap responsivo
```

## 📋 Guia de Uso de Botões

### Quando usar cada variante:

| Variante | Uso Recomendado | Exemplos |
|----------|----------------|----------|
| **Primary** | Ação principal da página/seção | "Participar do Desafio", "Enviar", "Salvar" |
| **Secondary** | Ação alternativa ou secundária | "Cancelar", "Voltar", "Ver Menos" |
| **Outline** | Ação menos importante ou filtros | "Ver Mais", "Filtrar", "Baixar PDF" |
| **Ghost** | Ações sutis dentro de cards | "Editar", "Compartilhar", "..." (menu) |
| **Danger** | Ações destrutivas ou irreversíveis | "Excluir", "Remover", "Descartar" |

### Hierarquia Visual

Em uma mesma tela/seção:
1. **1 botão Primary** - Ação principal
2. **0-2 botões Secondary** - Ações alternativas
3. **N botões Outline/Ghost** - Ações terciárias

### Exemplo de Composição

```tsx
{/* Header de formulário */}
<div className="flex gap-3 justify-end">
  <Button variant="ghost" onClick={handleCancel}>
    Cancelar
  </Button>
  <Button variant="secondary" onClick={handleSaveAsDraft}>
    Salvar Rascunho
  </Button>
  <Button variant="primary" onClick={handleSubmit}>
    Publicar
  </Button>
</div>

{/* Card de desafio */}
<div className="card">
  <h3>Desafio</h3>
  <p>Descrição...</p>
  <div className="flex gap-2">
    <Button variant="outline" size="sm">
      Ver Regras
    </Button>
    <LinkButton href="/desafio/1" variant="primary" size="sm" external>
      Participar
    </LinkButton>
  </div>
</div>
```

## ✅ Boas Práticas

### Geral
1. **Sempre use as variáveis CSS** ao invés de cores hardcoded
2. **Prefira classes Tailwind** quando disponíveis
3. **Mantenha consistência** com os modos claro/escuro
4. **Use transparência** para variações sutis (ex: `bg-cb-purple/10`)
5. **Teste em ambos os modos** (light e dark) antes de commitar

### Espaçamentos
1. **Siga o sistema de múltiplos de 4** (4px, 8px, 12px, 16px, etc.)
2. **Use `gap` para Flexbox e Grid** ao invés de margin nos filhos
3. **Use `space-y` e `space-x`** para espaçamento automático entre filhos
4. **Seções grandes: 64px** (`py-16`, `mb-16`)
5. **Cards: padding de 20-24px** (`p-5` ou `p-6`)
6. **Botões: 12px vertical x 20px horizontal** (`px-5 py-3`)
7. **Componentes internos: gap de 12-16px** (`gap-3` ou `gap-4`)
8. **Listas: gap de 8px** (`gap-2`)
9. **Seja consistente** - use os mesmos valores para contextos similares

### Botões
1. **Use o componente Button/LinkButton** sempre que possível
2. **Máximo 1 botão primary** por seção visível
3. **Botões de ação devem ter textos claros** ("Salvar" ao invés de "OK")
4. **Use estados de loading** em operações assíncronas
5. **Disabled + loading juntos** para prevenir cliques duplicados
6. **Botões full-width** apenas em mobile ou formulários
7. **Links externos devem usar LinkButton** com `external` prop

### Tipografia
1. **Use as classes customizadas** (`text-h1`, `text-h2`, etc.)
2. **Respeite a hierarquia** (H1 > H2 > H3 > H4)
3. **Máximo um H1** por página
4. **Use `font-heading`** para títulos quando necessário peso extra
5. **Use `font-mono`** apenas para código
6. **Body text padrão:** `text-body`
7. **Labels:** `text-label`

### Componentes
1. **Cards: sempre use padding de 24px** (`p-6`)
2. **Cards: border-radius de 12px** (`rounded-xl`)
3. **Inputs: altura de 42px** com `h-[42px]`
4. **Inputs: sempre mostre estado focus** com anel roxo
5. **Badges: use cores específicas** conforme o tipo (sucesso, erro, padrão)
6. **Navbar: altura fixa de 64px** (`h-16`)
7. **Navbar: sempre fixo no topo** com `fixed top-0`
8. **Efeito hover suave:** use `transition-colors` ou `transition-all`

## 🚫 Evite

### Cores
- Cores hardcoded não documentadas
- Misturar sistemas de cores (use apenas o style guide)
- Esquecer o suporte ao dark mode
- Usar gradientes fora do padrão estabelecido

### Espaçamentos
- Valores que não são múltiplos de 4px
- Usar margin nos filhos quando `gap` ou `space-y/x` funcionaria
- Espaçamentos inconsistentes para o mesmo tipo de elemento
- Espaçamentos arbitrários (ex: `p-[13px]`)

### Tipografia
- Tamanhos de fonte personalizados (use as classes padrão)
- Pular níveis de hierarquia (ex: H1 → H3)
- Misturar diferentes pesos de fonte sem razão
- Usar Bold (700) onde SemiBold (600) é suficiente

### Componentes
- Cards com padding inconsistente (sempre use `p-6` = 24px)
- Inputs sem estado de focus visível
- Border-radius inconsistente em cards (sempre use `rounded-xl` = 12px)
- Botões sem hover ou transições
- Badges com cores arbitrárias (use as cores específicas)
- Navbar com altura variável (sempre `h-16` = 64px)

---

**Última atualização:** 2025-12-03
**Versão:** 1.1.0
