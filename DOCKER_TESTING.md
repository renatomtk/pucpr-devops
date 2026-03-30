# Guia: Testando o Container Docker Localmente

## Prerequisites (Pré-requisitos)
Antes de continuar, você precisa instalar o **Docker Desktop**.

### 1. Instalar Docker Desktop

#### Windows:
1. Acesse: https://www.docker.com/products/docker-desktop
2. Clique em "Download for Windows"
3. Execute o instalador e siga as instruções
4. Reinicie o computador quando solicitado
5. Docker Desktop será iniciado automaticamente após a reinicialização

#### Verificar instalação:
```powershell
docker --version
```

## Construir a Imagem Docker

Abra o PowerShell ou Terminal na raiz do projeto e execute:

```powershell
docker build -t pucpr-devops:latest .
```

Isso vai:
- Usar Node.js 20-Alpine como base (imagem mínima)
- Instalar as dependências do projeto (npm ci)
- Fazer o build da aplicação (npm run build)
- Criar uma imagem otimizada com a aplicação pronta para produção

## Executar o Container

```powershell
docker run -p 8080:8080 --name pucpr-devops pucpr-devops:latest
```

Ou, se já existe um container com esse nome:

```powershell
docker run -p 8080:8080 --name pucpr-devops-$(Get-Random) pucpr-devops:latest
```

Isso vai:
- Executar o container mapeando a porta 8080 (local) para 8080 (container)
- Iniciar o servidor `serve` que está configurado no Dockerfile

### Acessar a aplicação

Abra seu navegador e acesse:
```
http://localhost:8080
```

Você deve ver sua aplicação React carregada normalmente!

## Verificar Containers em Execução

### Ver containers rodando:
```powershell
docker ps
```

Você verá uma saída como:
```
CONTAINER ID   IMAGE               COMMAND                  CREATED        STATUS       PORTS                    NAMES
abc1234def56   pucpr-devops:latest "serve -s dist -l 80..." 2 minutes ago  Up 2 minutes 0.0.0.0:8080->8080/tcp   pucpr-devops
```

**Tirar um screenshot desta linha é uma das provas que você precisa entregar!**

### Ver logs do container:
```powershell
docker logs pucpr-devops
```

### Parar o container:
```powershell
docker stop pucpr-devops
```

### Remover o container:
```powershell
docker rm pucpr-devops
```

## Entendendo o Dockerfile

Nosso `Dockerfile` usa a estratégia de **multi-stage build**:

1. **Stage 1 (Builder)**: 
   - Usa Node.js 20-Alpine
   - Instala dependências
   - Faz o build da aplicação

2. **Stage 2 (Production)**:
   - Usa Node.js 20-Alpine (imagem menor)
   - Copia apenas os arquivos compilados (dist/)
   - Instala `serve` para servir a aplicação estática
   - Expõe a porta 8080

**Benefícios**:
- ✅ Imagem final menor (sem código-fonte, apenas output compilado)
- ✅ Segurança melhorada (menos ferramentas no ambiente de produção)
- ✅ Build rápido e cache otimizado
- ✅ Health check configurado

## Troubleshooting

### Erro: "Docker daemon is not running"
- Abra o Docker Desktop manualmente
- Aguarde 30 segundos para inicializar completamente

### Erro: "Port 8080 is already allocated"
- Outra aplicação está usando a porta 8080
- Use: `docker run -p 8081:8080 pucpr-devops:latest` (muda a porta local para 8081)

### Erro: "Cannot find module"
- Execute: `npm ci` localmente antes (melhor para builds reproduzíveis)
- Ou modifique o Dockerfile para usar `npm install` em vez de `npm ci`

## Próximas Etapas (Desafio Opcional)

Para publicar no DockerHub:
1. Crie uma conta em https://hub.docker.com
2. Login: `docker login`
3. Tag: `docker tag pucpr-devops:latest seu-usuario/pucpr-devops:latest`
4. Push: `docker push seu-usuario/pucpr-devops:latest`
5. Configure seu pipeline CI/CD para fazer isso automaticamente
