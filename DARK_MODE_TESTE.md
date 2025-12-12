# 🌙 Guia de Teste do Dark Mode

## ✅ O que foi implementado:

Todas as cores do projeto foram padronizadas seguindo o [STYLE_GUIDE.md](STYLE_GUIDE.md).

### Cores Configuradas:

#### Light Mode:
- Background: `#F8F8FA` (`bg-light-bg`)
- Cards: `#FFFFFF` (`bg-light-card`)
- Texto: `#1A1A1D` (`text-light-text`)
- Texto Secundário: `#3A3A3F` (`text-cb-gray-dark`)

#### Dark Mode:
- Background: `#0F0F12` (`bg-dark-bg`)
- Cards: `#18181C` (`bg-dark-card`)
- Texto: `#F5F5F7` (`text-dark-text`)
- Texto Secundário: `#C4C4C9` (`text-cb-gray`)

## 🧪 Como Testar:

### 1. Iniciar o Servidor
```bash
npm run dev
```

### 2. Abrir no Navegador
Acesse `http://localhost:5173` (ou a porta indicada)

### 3. Alternar Dark Mode

**Método 1: Botão do Site**
- Clique no ícone de sol/lua no canto superior direito do header

**Método 2: DevTools do Navegador**
Abra o console (F12) e execute:
```javascript
// Ativar Dark Mode
document.documentElement.classList.add('dark');

// Desativar Dark Mode
document.documentElement.classList.remove('dark');

// Alternar
document.documentElement.classList.toggle('dark');
```

**Método 3: localStorage**
Abra o console (F12) e execute:
```javascript
// Forçar Dark Mode
localStorage.setItem('theme', 'dark');
location.reload();

// Forçar Light Mode
localStorage.setItem('theme', 'light');
location.reload();
```

### 4. Verificar Elementos

Após alternar o tema, verifique se os seguintes elementos mudam de cor:

#### ✅ Header
- [ ] Background fica escuro (#0F0F12)
- [ ] Texto dos links fica claro (#C4C4C9)
- [ ] Hover permanece roxo (#8B5CF6)

#### ✅ Hero Section
- [ ] Background fica escuro
- [ ] Título principal fica claro
- [ ] Descrição fica em cinza claro (#C4C4C9)
- [ ] Badge fica com fundo escuro roxo

#### ✅ Botões
- [ ] Botão Primary mantém gradiente roxo
- [ ] Botão Secondary (outline) mantém borda roxa
- [ ] Hover effects funcionam

## 🔧 Troubleshooting

### Problema 1: Dark Mode não alterna
**Solução:**
1. Abra o console do navegador (F12)
2. Verifique se há erros JavaScript
3. Verifique se a classe `dark` está sendo adicionada ao `<html>`:
```javascript
console.log(document.documentElement.classList);
```

### Problema 2: Cores não mudam
**Solução:**
1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Faça hard reload (Ctrl+Shift+R)
3. Verifique se o Tailwind está carregando:
```javascript
console.log(getComputedStyle(document.body).getPropertyValue('--cb-purple'));
```

### Problema 3: Algumas cores ainda estão erradas
**Soluções Possíveis:**

**A) Rebuild do CSS:**
```bash
# Pare o servidor (Ctrl+C)
rm -rf node_modules/.vite
npm run dev
```

**B) Verificar se as classes Tailwind estão corretas:**
Abra o DevTools (F12) e inspecione um elemento. Verifique se as classes CSS estão sendo aplicadas:
- `dark:bg-dark-bg` deve resultar em `background-color: #0F0F12` no dark mode
- `dark:text-dark-text` deve resultar em `color: #F5F5F7` no dark mode

## 📋 Checklist de Validação

Teste em ambos os modos (Light e Dark):

### Header
- [ ] Background com blur correto
- [ ] Logo visível e com gradiente roxo
- [ ] Links legíveis
- [ ] Hover nos links funciona
- [ ] Menu mobile funciona
- [ ] Botão de theme toggle funciona

### Home Page
- [ ] Hero section legível
- [ ] Botões visíveis e funcionais
- [ ] Terminal animado funciona
- [ ] Animações suaves

### Páginas Secundárias
- [ ] `/eventos` - Legível e cores corretas
- [ ] `/desafios` - Cards legíveis, badges corretos
- [ ] `/blog` - Artigos legíveis
- [ ] `/comunidade` - Elementos visíveis
- [ ] `/form` - Formulário legível

## 🐛 Relatando Problemas

Se encontrar problemas específicos, anote:

1. **Qual página?** (Home, Eventos, etc.)
2. **Qual elemento?** (Header, botão, card, etc.)
3. **Qual modo?** (Light, Dark, ou ambos)
4. **O que deveria acontecer?**
5. **O que está acontecendo?**
6. **Print screen** (se possível)

### Exemplo de Relatório:
```
Página: Home
Elemento: Título do Hero
Modo: Dark
Esperado: Texto branco (#F5F5F7)
Atual: Texto cinza escuro (não mudou)
```

## 🔍 Inspeção Manual

Para verificar se uma cor específica está correta:

1. Clique com botão direito no elemento
2. Selecione "Inspecionar"
3. Veja as classes CSS aplicadas
4. Verifique os estilos computados
5. Compare com o [STYLE_GUIDE.md](STYLE_GUIDE.md)

## ✨ Ferramentas Úteis

### Extension Chrome: Dark Reader
Pode ajudar a visualizar como seria um dark mode automático.
**Nota:** Desative para testar nosso dark mode nativo!

### Extension Chrome: CSS Peeper
Ajuda a ver rapidamente as cores aplicadas.

---

**Última atualização:** 2025-12-03
