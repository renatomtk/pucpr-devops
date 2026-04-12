# 🎯 Guia Completo: GitHub Actions + Discord Alerts

## 📋 Resumo do que foi feito

✅ **Arquivo de Workflow criado:** `.github/workflows/discord-alert.yml`

Este workflow:
- ✅ Executa a cada **push** nos branches `main` e `develop`
- ✅ Executa em **pull requests** para o branch `main`
- ✅ Executa **testes de build** automaticamente
- ✅ Envia **alertas formatados** para o Discord
- ✅ Mostra **autor, mensagem, status e link** do commit

---

## 🔧 PASSO 1: Criar Webhook do Discord

### 1️⃣ Acesse o Discord
- Abra o Discord
- Selecione o servidor onde quer receber alertas

### 2️⃣ Crie ou selecione um canal
- Exemplo: `#github-alerts`

### 3️⃣ Crie o Webhook
1. **Clique com botão direito no canal** → **Edit Channel**
   
   OU

1. **Clique no ícone de engrenagem** (Configurações do canal)

2. No menu lateral, vá para **Integrações**

3. Clique em **Webhooks**

4. Clique em **New Webhook**

5. Dê um nome: `GitHub Alerts`

6. Clique em **Copiar URL do Webhook**

**Exemplo de URL:**
```
https://discordapp.com/api/webhooks/123456789/abcdefg-hijklmn
```

---

## 🔑 PASSO 2: Adicionar Secret no GitHub

### 1️⃣ Acesse seu repositório
```
https://github.com/renatomtk/pucpr-devops
```

### 2️⃣ Vá para Settings
- Clique em **Settings** (Configurações)

### 3️⃣ Encontre Secrets
- No menu lateral esquerdo, vá para: **Secrets and variables** → **Actions**

### 4️⃣ Crie um novo Secret
- Clique em **New repository secret**
- **Name:** `DISCORD_WEBHOOK`
- **Secret:** Cole a URL que você copiou do Discord
- Clique em **Add secret**

---

## 📤 PASSO 3: Fazer primeiro commit

### Opção A: Via GitHub Desktop ou Git Bash
```bash
# Clone o repositório (se não tiver)
git clone https://github.com/renatomtk/pucpr-devops
cd pucpr-devops

# Faça uma alteração
echo "teste" >> README.md

# Commit
git add .
git commit -m "🧪 Testando GitHub Actions com Discord"
git push origin main
```

### Opção B: Via Git GUI/Visual Studio Code
1. Abra o repositório em VS Code
2. Faça uma pequena alteração em qualquer arquivo
3. Clique em "Commit" e escreva uma mensagem
4. Pressione "Sync" ou "Push"

### Opção C: Diretamente no GitHub
1. Clique em "Add file" → "Create new file"
2. Crie um arquivo `test.txt` com algum conteúdo
3. Clique em "Commit changes" com a mensagem: "🧪 Testando GitHub Actions"

---

## ✅ PASSO 4: Verificar Execução

### 1️⃣ Visualize no GitHub Actions
1. Vá para o repositório
2. Clique na aba **Actions**
3. Você verá o workflow "Discord Alert - Build & Deploy"
4. Clique para ver os detalhes

### 2️⃣ Verifique o Discord
- Vá para o canal `#github-alerts`
- Você deve receber uma mensagem similar a esta:

```
🚀 GitHub Actions Alert - PUCPR DevOps

Event Type: PUSH
Branch: main
Author: renatomtk
Status: ✅ SUCCESS

Message: 🧪 Testando GitHub Actions com Discord
Commit Link: abc1234

Repository: renatomtk/pucpr-devops
Workflow: View Details
```

---

## 🎨 Personalizações

### Enviar APENAS no main (não no develop)
Edite `.github/workflows/discord-alert.yml`:
```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

### Enviar APENAS em eventos específicos
```yaml
on:
  push:
    branches: [ main ]
```

### Adicionar emoji diferente
No arquivo `discord-alert.yml`, na seção `content`, mude:
```yaml
content: |
  🎉 **GitHub Alert - PUCPR DevOps**
  ...
```

### Enviar para múltiplos canais
Crie múltiplos secrets e steps:
```yaml
- name: Send to alertas channel
  uses: tsickert/discord-webhook@v5.3.0
  with:
    webhook-url: ${{ secrets.DISCORD_WEBHOOK_ALERTS }}
    
- name: Send to logs channel
  uses: tsickert/discord-webhook@v5.3.0
  with:
    webhook-url: ${{ secrets.DISCORD_WEBHOOK_LOGS }}
```

---

## 🔗 Alternativas (Slack, Teams, Telegram)

### 📱 Slack
**Secret:** `SLACK_WEBHOOK`
```yaml
- name: Send Slack notification
  uses: slackapi/slack-github-action@v1.24.0
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

### 🟦 Microsoft Teams
**Secret:** `TEAMS_WEBHOOK`
```yaml
- name: Send Teams notification
  uses: jdcargile/ms-teams-notification@v1.3
  with:
    ms-teams-webhook-uri: ${{ secrets.TEAMS_WEBHOOK }}
    status: ${{ job.status }}
```

### 📲 Telegram
**Secrets:** `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
```yaml
- name: Send Telegram notification
  run: |
    curl -X POST "https://api.telegram.org/bot${{ secrets.TELEGRAM_BOT_TOKEN }}/sendMessage" \
      -d "chat_id=${{ secrets.TELEGRAM_CHAT_ID }}" \
      -d "text=✅ Novo push no repositório"
```

---

## 📷 Screenshots para Entregar

### 1️⃣ Screenshot do Workflow
- Arquivo: `.github/workflows/discord-alert.yml`
- Caminho no repositório: `pucpr-devops/.github/workflows/discord-alert.yml`
- Mostre todo o conteúdo do arquivo

### 2️⃣ Screenshot do Alerta no Discord
- Mostre a mensagem no canal `#github-alerts`
- Mostre que contém: Status ✅, Branch, Author, Message, Link

### 3️⃣ Screenshot do GitHub Actions
- Aba **Actions** → Workflow "Discord Alert - Build & Deploy"
- Mostre o status final ✅

---

## 🐛 Solução de Problemas

| Problema | Solução |
|----------|---------|
| Webhook URL é inválida | Verifique se copiou a URL completa do Discord |
| Sem autorização para postar | Regenere o webhook no Discord |
| Workflow não dispara | Verifique se o arquivo está em `.github/workflows/` |
| Mensagem não chega | Verifique se o secret `DISCORD_WEBHOOK` está correto |
| Status sempre "FAILED" | Verifique se a build está passando: `npm run build` |

---

## 📚 Recursos Úteis

- 📖 [Documentação GitHub Actions](https://docs.github.com/en/actions)
- 🎛️ [Discord Webhooks](https://discord.com/developers/docs/resources/webhook)
- 🤖 [Discord Webhook Action](https://github.com/tsickert/discord-webhook)
- 🐍 [Slack GitHub Action](https://github.com/slackapi/slack-github-action)

