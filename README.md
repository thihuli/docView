# Documentação Técnica - Visualizador Markdown

Este projeto é um visualizador de documentação técnica que consome arquivos Markdown do Bitbucket e os apresenta em uma interface web moderna e responsiva.

## 🚀 Funcionalidades

- ✨ Visualização de documentos Markdown com formatação completa
- 📱 Interface responsiva (desktop e mobile)
- 🌓 Tema claro/escuro
- ✏️ Edição local de documentos
- 💾 Armazenamento local das alterações
- 🔍 Visualização de diferenças entre versões
- 📊 Área administrativa para gerenciar alterações locais

## 📋 Pré-requisitos

- Node.js >= 18.17.0
- NPM ou Yarn
- Git

## 🛠️ Tecnologias Principais

- Next.js 13
- React 18
- Tailwind CSS
- Radix UI
- Marked (para renderização Markdown)
- Highlight.js (para syntax highlighting)

## 📦 Estrutura do Projeto

```
├── app/
│   ├── api/              # Endpoints da API
│   ├── docs/             # Páginas de documentação
│   ├── admin/            # Interface administrativa
│   └── layout.tsx        # Layout principal
├── components/
│   ├── ui/              # Componentes de UI reutilizáveis
│   ├── doc-viewer.tsx   # Visualizador de documentos
│   ├── doc-layout.tsx   # Layout das páginas de documentação
│   └── sidebar.tsx      # Navegação lateral
├── lib/
│   └── markdown.ts      # Utilitários para processamento Markdown
```

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd [NOME_DO_PROJETO]
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_BITBUCKET_WORKSPACE=seu_workspace
NEXT_PUBLIC_BITBUCKET_REPO=seu_repositorio
NEXT_PUBLIC_BITBUCKET_BRANCH=main
```

## 🎮 Executando o Projeto

### Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O servidor de desenvolvimento será iniciado em `http://localhost:3000`

### Produção

```bash
npm run build
npm start
# ou
yarn build
yarn start
```

## 📝 Uso

### Navegação
- Use o menu lateral para navegar entre os documentos
- No mobile, acesse o menu através do ícone no canto superior esquerdo
- Alterne entre temas claro/escuro no botão do canto superior direito

### Edição de Documentos
1. Clique no botão "Editar" no documento
2. Faça suas alterações no editor Markdown
3. Clique em "Salvar" para armazenar localmente

### Área Administrativa
1. Acesse através do botão "Admin" no cabeçalho
2. Visualize todas as alterações locais
3. Compare versões modificadas com as originais

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🐛 Problemas Conhecidos

- A edição é apenas local (não sincroniza com o Bitbucket)
- Necessário recarregar a página após alternar entre temas em alguns casos

## 🔍 Notas Importantes

- Este projeto é otimizado para Node.js >= 18.17.0
- Todas as alterações são salvas apenas localmente no navegador
- O projeto assume uma estrutura específica de arquivos Markdown no Bitbucket
- A navegação é construída a partir do arquivo `_sidebar.md`

Desenvolvido com ❤️ para o teste técnico da Allintra