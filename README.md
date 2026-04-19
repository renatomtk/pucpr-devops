# PUCPR - DevOps

**Estudante:** Renato Hideki Motikawa

## Sobre o Projeto

Projeto acadêmico desenvolvido para a disciplina de DevOps na PUCPR. Uma aplicação React moderna que demonstra boas práticas de desenvolvimento, testes automatizados e deployment com Docker.

## Funcionalidades

- Interface de usuário responsiva com TailwindCSS
- Suite completa de testes automatizados (Vitest)
- Componentes reutilizáveis com TypeScript
- Containerização com Docker
- Build otimizado com Vite
- Linting automático com ESLint
- Testes com cobertura de código

## Stack de Tecnologia

- **React** 18 - Framework UI
- **Vite** - Build tool e desenvolvimento rápido
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Vitest** - Testing framework
- **React Query** - State management
- **React Router** - Routing
- **Sonner** - Toast notifications

## Quick Start Local

### Pré-requisitos
- **Node.js** 18+ e npm instalados
  - [Download Node.js](https://nodejs.org/)

### Passo 1: Clone o repositório
```bash
git clone https://github.com/renatomtk/pucpr-devops
cd pucpr-devops
```

### Passo 2: Instale dependências
```bash
npm install
```

### Passo 3: Inicie o servidor de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:8080`

### Scripts Disponíveis
```bash
npm run dev              # Inicia servidor de desenvolvimento
npm run build            # Build para produção
npm run build:dev        # Build com modo development
npm run preview          # Preview do build
npm run lint             # Verifica código com ESLint
npm test                 # Rodar testes uma vez
npm run test:ui          # Testes com interface visual
npm run test:watch       # Testes em modo watch
npm run test:coverage    # Cobertura de testes
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── ui/             # Componentes de UI base
│   ├── ApiCard.tsx
│   ├── CodeBlock.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utilitários e helpers
├── pages/              # Páginas principais
├── App.tsx             # Componente raiz
└── main.tsx            # Entry point
public/                 # Arquivos estáticos
```

## Quick Start com Docker

### Pré-requisitos
- **Docker Desktop** instalado no computador
  - [Download para Windows](https://www.docker.com/products/docker-desktop)
  - [Download para Mac](https://www.docker.com/products/docker-desktop)
  - [Download para Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

### Passo 1: Clone o repositório
```bash
git clone https://github.com/renatomtk/pucpr-devops
cd pucpr-devops
```

### Passo 2: Construa a imagem Docker
```bash
docker build -t pucpr-devops:latest .
```

### Passo 3: Execute o container
```bash
docker run -p 8080:8080 pucpr-devops:latest
```

### Passo 4: Acesse a aplicação
Abra seu navegador favorito e acesse:
```
http://localhost:8080
```

## Informações úteis

### Ver containers em execução
```bash
docker ps
```

### Parar o container
```bash
docker stop <CONTAINER_ID>
```

### Remover a imagem
```bash
docker rmi pucpr-devops:latest
```

### Ver logs
```bash
docker logs <CONTAINER_ID>
```

## O que a imagem faz
- Instala dependências do Node.js
- Compila a aplicação React usando Vite
- Serve a aplicação na porta 8080 com verificação de saúde automática

## Testes

### Executar testes
```bash
npm test              # Executa testes uma vez
```

### Modo watch
```bash
npm run test:watch    # Executa testes automaticamente ao salvar arquivos
```

### Interface visual
```bash
npm run test:ui       # Abre interface gráfica para visualizar testes
```

### Cobertura de código
```bash
npm run test:coverage # Gera relatório de cobertura
```

## Troubleshooting

### Porta 8080 já está em uso
```bash
# Para encontrar o processo usando a porta
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Altere a porta no vite.config.ts ou use:
VITE_PORT=3000 npm run dev
```

### Erro: "Node.js não encontrado"
- Certifique-se de que Node.js 18+ está instalado
- Verifique com: `node --version`

### Cache do npm corrompido
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Docker: Erro de permissão
```bash
# Windows: execute como administrador
# Linux: adicione seu usuário ao grupo docker
sudo usermod -aG docker $USER
```
