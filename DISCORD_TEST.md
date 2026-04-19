# 🧪 Teste de Alertas do Discord

Este PR foi criado para testar a configuração dos alertas do Discord com GitHub Actions.

## Objetivo
Validar se os webhooks do Discord estão funcionando corretamente e enviando notificações para o servidor Discord quando há eventos no repositório.

## Como testar:
1. Verifique se o secret `DISCORD_WEBHOOK` está configurado no repositório
2. Após o merge, um alerta será enviado para o Discord
3. Verifique no canal #github-alerts se a mensagem foi recebida

## Status
- ✅ Branch criada: `feat/test-discord-alerts`
- ⏳ Aguardando merge para ativar o workflow
