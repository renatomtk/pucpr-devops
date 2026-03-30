# PUCPR - DevOps

Student: Renato Hideki Motikawa

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
