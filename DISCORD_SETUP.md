# 🔔 Configuração de Alertas no Discord com GitHub Actions

## Passo 1: Criar um Webhook do Discord

### 1.1 - Acesse seu servidor Discord
- Abra o Discord
- Vá para o servidor onde deseja receber os alertas

### 1.2 - Crie um canal (ou use um existente)
- Você pode criar um novo canal chamado `#github-alerts` ou usar um existente
- Apague todos os caracteres especiais do nome do canal para evitar problemas

### 1.3 - Gere o Webhook
1. Acesse as **Configurações do Canal** (ícone de engrenagem)
2. Vá em **Integrações** > **Webhooks**
3. Clique em **Novo Webhook**
4. Dê um nome (ex: "GitHub Alerts")
5. Pressione **Copiar URL do Webhook**

A URL terá um formato assim:
```
https://discordapp.com/api/webhooks/XXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXX
```

---

## Passo 2: Adicionar o Webhook como Secret no GitHub

### 2.1 - Acesse seu repositório no GitHub
- Vá para o seu repositório: `https://github.com/seu-usuario/pucpr-devops`

### 2.2 - Configure o Secret
1. Acesse **Settings** > **Secrets and variables** > **Actions**
2. Clique em **New repository secret**
3. **Name:** `DISCORD_WEBHOOK`
4. **Value:** Cole a URL do webhook que você copiou
5. Clique em **Add secret**

---

## Passo 3: Testar o Workflow

### Opção A: Via Push (recomendado)
```bash
# Faça uma alteração em um arquivo
echo "# Teste" >> test.txt

# Commit e push
git add .
git commit -m "🧪 Teste de alerta do Discord"
git push origin main
```

### Opção B: Visualizar Execução no GitHub
1. Vá para o repositório
2. Clique em **Actions**
3. Clique no workflow mais recente
4. Você verá o status do job

---

## 💡 Personalizações Possíveis

### Enviar apenas quando há merge no main
```yaml
on:
  push:
    branches: [ main ]
```

### Enviar apenas quando há commit
```yaml
on:
  push:
```

### Enviar para múltiplos canais Discord
Crie múltiplos secrets: `DISCORD_WEBHOOK_ALERTS`, `DISCORD_WEBHOOK_LOGS`, etc.
E adicione múltiplos steps de notificação

### Customizar a mensagem
Edite a seção `content` no arquivo `discord-alert.yml`

---

## 🔧 Alternativas (Slack, Microsoft Teams, Telegram)

### Slack
```yaml
- name: Send Slack notification
  uses: slackapi/slack-github-action@v1.24.0
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

### Microsoft Teams
```yaml
- name: Send Teams notification
  uses: jdcargile/ms-teams-notification@v1.3
  with:
    github-token: ${{ github.token }}
    ms-teams-webhook-uri: ${{ secrets.TEAMS_WEBHOOK }}
```

### Telegram
```yaml
- name: Send Telegram notification
  run: |
    curl -X POST "https://api.telegram.org/bot${{ secrets.TELEGRAM_BOT_TOKEN }}/sendMessage" \
      -d "chat_id=${{ secrets.TELEGRAM_CHAT_ID }}" \
      -d "text=${{ github.event.pusher.name }} fez push no repositório"
```

---

## ✅ Checklist de Configuração

- [ ] Webhook criado no Discord
- [ ] Secret `DISCORD_WEBHOOK` adicionado no GitHub
- [ ] Arquivo `.github/workflows/discord-alert.yml` commitado
- [ ] Primeiro teste realizado
- [ ] Alerta recebido no Discord

---

## 🐛 Troubleshooting

### "Webhook URL é inválida"
- Verifique se a URL foi copiada completamente
- Certifique-se que o secret no GitHub tem exatamente o nome `DISCORD_WEBHOOK`

### "Sem autorização para postar"
- Verifique se o webhook ainda é válido (pode ter sido deletado)
- Regenere um novo webhook no Discord

### "Workflow não dispara"
- Verifique se o arquivo está em `.github/workflows/discord-alert.yml`
- Confirme que está no repositório remoto (git push)
- Aguarde alguns minutos para o GitHub processar

