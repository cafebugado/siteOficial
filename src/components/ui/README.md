# UI Components - Café Bugado

Componentes reutilizáveis que seguem o [Style Guide](../../../STYLE_GUIDE.md) do projeto.

## 🚀 Quick Start

```tsx
// Importar componentes
import { Button, LinkButton } from '@/components/ui';

// Usar no seu componente
function MyComponent() {
  return (
    <div>
      <Button variant="primary" onClick={handleClick}>
        Clique Aqui
      </Button>

      <LinkButton href="/desafios" variant="secondary">
        Ver Desafios
      </LinkButton>
    </div>
  );
}
```

## 📦 Componentes Disponíveis

### Button
Botão padrão para ações.

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'`
- `size`: `'sm' | 'md' | 'lg'`
- `fullWidth`: `boolean`
- `isLoading`: `boolean`
- `disabled`: `boolean`
- Todas as props nativas de `<button>`

### LinkButton
Link estilizado como botão.

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'`
- `size`: `'sm' | 'md' | 'lg'`
- `fullWidth`: `boolean`
- `external`: `boolean` - Adiciona `target="_blank"` e `rel="noopener noreferrer"`
- Todas as props nativas de `<a>`

## 💡 Exemplos

### Botão com Loading
```tsx
const [isLoading, setIsLoading] = useState(false);

<Button
  variant="primary"
  isLoading={isLoading}
  disabled={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await saveData();
    setIsLoading(false);
  }}
>
  Salvar
</Button>
```

### Link Externo
```tsx
<LinkButton
  href="https://notion.so/desafio"
  variant="primary"
  external
>
  Ver no Notion
</LinkButton>
```

### Grupo de Botões
```tsx
<div className="flex gap-3">
  <Button variant="ghost" onClick={onCancel}>
    Cancelar
  </Button>
  <Button variant="secondary" onClick={onSaveAsDraft}>
    Rascunho
  </Button>
  <Button variant="primary" onClick={onPublish}>
    Publicar
  </Button>
</div>
```

### Botão Full Width (Mobile)
```tsx
<Button
  variant="primary"
  fullWidth
  className="md:w-auto"
>
  Continuar
</Button>
```

## 🎨 Customização

### Adicionar Classes Extras
```tsx
<Button
  variant="primary"
  className="shadow-2xl my-4"
>
  Custom
</Button>
```

### Sobrescrever Estilos (não recomendado)
Se absolutamente necessário, você pode sobrescrever:

```tsx
<Button
  variant="primary"
  className="!bg-red-500 !hover:bg-red-600"
>
  Customizado
</Button>
```

**⚠️ Atenção:** Sobrescrever estilos quebra a consistência do design system.

## 📖 Documentação Completa

Para guias detalhados, hierarquia de botões e melhores práticas, consulte o [Style Guide](../../../STYLE_GUIDE.md).

## 🤝 Contribuindo

Ao adicionar novos componentes:
1. Siga a estrutura de props existente
2. Use as cores do style guide
3. Suporte dark mode
4. Adicione TypeScript types
5. Documente no Style Guide
6. Exporte no `index.ts`
