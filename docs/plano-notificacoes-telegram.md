# Plano: Notificações Telegram — Novo cadastro de profissional

## Objetivo

O dono do sistema (Doni) recebe uma mensagem no Telegram sempre que uma nova
Lash Designer se cadastrar no Lash Hub — independente de ter vindo da landing
page, link direto ou qualquer outra origem.

Exemplo da mensagem recebida:

```
🎉 Nova profissional cadastrada!

👤 Ana Lima
📧 ana@studioana.com.br
📱 (11) 98877-6655
🏠 Studio da Ana
🔗 /portal/studio-da-ana
🕐 01/07/2026, 14:32:10
```

**Custo:** R$0 — Telegram Bot API é gratuito. Edge Functions do Supabase têm
500 mil invocações/mês no plano free.

---

## Arquitetura

```
Profissional preenche /cadastro
        ↓
INSERT em public.usuarios (role = 'profissional')
        ↓
Database Webhook do Supabase (dispara no INSERT)
        ↓
Edge Function: notify-new-professional
        ↓
Telegram Bot API → mensagem no celular do dono
```

Nenhuma alteração no banco de dados (sem migration).  
Nenhuma alteração no frontend.  
Tudo acontece no servidor.

---

## Pré-requisitos manuais (fazer uma única vez)

### 1. Criar o bot no Telegram

1. Abrir o Telegram e pesquisar `@BotFather`
2. Enviar `/newbot`
3. Seguir as instruções (nome do bot, username)
4. Copiar o **BOT_TOKEN** retornado (formato: `123456789:AAHdqTcvCH1vGWJxfSeofSEs4eH48fyBFMg`)

### 2. Descobrir o seu chat_id (dono do sistema)

1. No Telegram, pesquisar `@userinfobot`
2. Enviar qualquer mensagem (ex: `/start`)
3. O bot responde com seu `id` numérico — esse é o **TELEGRAM_OWNER_CHAT_ID**
   (ex: `987654321`)

### 3. Adicionar os secrets no Supabase

No painel do Supabase → **Settings → Edge Functions → Secrets**:

| Nome do secret             | Valor                        |
|----------------------------|------------------------------|
| `TELEGRAM_BOT_TOKEN`       | Token do BotFather           |
| `TELEGRAM_OWNER_CHAT_ID`   | Seu chat_id numérico         |

> `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` já existem automaticamente
> em todas as Edge Functions — não precisam ser adicionados.

---

## Arquivos a criar

### `supabase/functions/notify-new-professional/index.ts`

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const BOT_TOKEN  = Deno.env.get('TELEGRAM_BOT_TOKEN')!;
const CHAT_ID    = Deno.env.get('TELEGRAM_OWNER_CHAT_ID')!;
const SUPA_URL   = Deno.env.get('SUPABASE_URL')!;
const SUPA_KEY   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  // Verifica assinatura do webhook (opcional mas recomendado)
  const secret = Deno.env.get('SUPABASE_WEBHOOK_SECRET');
  if (secret && req.headers.get('x-webhook-secret') !== secret) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = await req.json();
  const record  = payload?.record;

  // Ignora se não for um cadastro de profissional
  if (!record || record.role !== 'profissional') {
    return new Response('OK', { status: 200 });
  }

  // Busca o nome do estúdio (slug)
  const supabase = createClient(SUPA_URL, SUPA_KEY);
  const { data: estudio } = await supabase
    .from('estabelecimentos')
    .select('nome_negocio, slug')
    .eq('id', record.estabelecimento_id)
    .single();

  const agora = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  const texto = [
    '🎉 *Nova profissional cadastrada!*',
    '',
    `👤 ${record.nome}`,
    `📧 ${record.email}`,
    `📱 ${record.telefone || 'Não informado'}`,
    `🏠 ${estudio?.nome_negocio || 'Sem nome'}`,
    `🔗 /portal/${estudio?.slug || ''}`,
    `🕐 ${agora}`,
  ].join('\n');

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: texto,
      parse_mode: 'Markdown',
    }),
  });

  return new Response('OK', { status: 200 });
});
```

---

## Configuração no Supabase Dashboard

### Deploy da Edge Function

Pelo terminal (na raiz do projeto, com Supabase CLI instalado e projeto linkado):

```bash
# Instalar Supabase CLI (se não tiver)
npm install -g supabase

# Linkar ao projeto (precisará do project ref e service role key)
supabase login
supabase link --project-ref <SEU_PROJECT_REF>

# Deploy
supabase functions deploy notify-new-professional --no-verify-jwt
```

> A flag `--no-verify-jwt` é necessária porque o webhook do Supabase não
> envia JWT — ele usa o header `x-webhook-secret` para autenticação.

O **project ref** está na URL do painel do Supabase:
`https://supabase.com/dashboard/project/<PROJECT_REF>`

### Criar o Database Webhook

No painel do Supabase → **Database → Webhooks → Create a new hook**:

| Campo            | Valor                                                    |
|------------------|----------------------------------------------------------|
| Nome             | `notify-new-professional`                               |
| Tabela           | `public.usuarios`                                        |
| Eventos          | `INSERT` apenas                                          |
| Tipo             | Supabase Edge Functions                                  |
| Edge Function    | `notify-new-professional`                               |

> Não é necessário filtro de linha — a edge function já ignora roles que não
> sejam `profissional`.

Após criar o webhook, copie o **Webhook Secret** gerado e adicione como secret
`SUPABASE_WEBHOOK_SECRET` nas Edge Functions (mesmo painel de secrets do passo anterior).

---

## Testando

Depois de tudo configurado:

1. Acesse `/cadastro` no Lash Hub e crie uma conta de profissional de teste
2. Em ~2–5 segundos a mensagem deve aparecer no Telegram do dono
3. Se não aparecer, verificar os **logs da Edge Function** em:
   Supabase Dashboard → Edge Functions → `notify-new-professional` → Logs

---

## Troubleshooting comum

| Problema                          | Causa provável                              | Solução                                          |
|-----------------------------------|---------------------------------------------|--------------------------------------------------|
| Mensagem não chega                | Secrets não salvos ou com typo             | Verificar nomes exatos dos secrets               |
| Edge Function retorna 401         | Webhook secret errado                       | Comparar `SUPABASE_WEBHOOK_SECRET` com o gerado  |
| Edge Function retorna 200 mas sem msg | `role` não é `'profissional'` no registro | Verificar se o cadastro grava `role` corretamente|
| Erro no Telegram API              | BOT_TOKEN inválido ou CHAT_ID errado        | Testar com curl (ver abaixo)                     |

**Testar o bot manualmente via curl:**

```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "<CHAT_ID>", "text": "Teste Lash Hub ✅"}'
```

---

## Extensão futura (não implementar agora)

Usando a mesma estrutura, é simples adicionar depois:

- **Novo agendamento:** webhook na tabela `agendamentos` INSERT → mesma edge function com rota diferente
- **Trial expirando:** Cron job do Supabase que roda diariamente e notifica

---

## Instruções para o Claude Code (implementar em outra conversa)

> **Leia este bloco antes de começar a implementar.**

### Contexto do projeto

- **Projeto:** Lash Hub — SaaS para Lash Designers solo
- **Stack:** React + Vite + TypeScript + Supabase + Tailwind CSS
- **Repositório:** `https://github.com/doupsdigital/lashhub-v03`
- **Working directory:** raiz do projeto (onde está `package.json`)

### O que implementar

1. Criar o arquivo `supabase/functions/notify-new-professional/index.ts`
   com o código TypeScript desta documentação (seção "Arquivos a criar")

2. **NÃO alterar** nenhum arquivo do frontend (`src/`)

3. **NÃO alterar** nenhuma migration SQL existente

4. Após criar o arquivo, fazer **commit e push** para o GitHub

### O que NÃO fazer

- Não hardcodar `BOT_TOKEN` ou `CHAT_ID` em nenhum arquivo — eles são secrets do Supabase
- Não criar arquivo `.env` para esses valores
- Não modificar arquivos do frontend
- Não criar migration SQL (não há alteração de schema)

### Passos de implementação sugeridos

```
1. Criar pasta supabase/functions/notify-new-professional/
2. Criar supabase/functions/notify-new-professional/index.ts (código acima)
3. git add + commit + push
4. Avisar o usuário para fazer os passos manuais (BotFather, secrets, webhook no dashboard)
```

### Dependências

A edge function usa `https://esm.sh/@supabase/supabase-js@2` — import via URL
(padrão Deno). Não requer `npm install`.

### Verificar se o campo `role` existe

Antes de implementar, confirme no schema do banco que `public.usuarios` tem uma
coluna `role` do tipo `text` com valor `'profissional'` para profissionais.
Pode verificar com:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'usuarios'
  AND column_name = 'role';
```

Se não existir, o webhook precisaria ser na tabela `estabelecimentos` INSERT
(sem filtro de role), e o edge function já possui o nome do estúdio diretamente.
