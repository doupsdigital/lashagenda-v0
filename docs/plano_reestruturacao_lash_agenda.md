# Plano: Reestruturação Lash Hub → Lash Agenda

## Objetivo

Duas mudanças independentes, executadas em etapas pequenas e testáveis:

1. **Rebranding**: renomear "Lash Hub" para "Lash Agenda" em todo o sistema, **exceto** nas landing pages (que serão ajustadas depois, separadamente, quando os vídeos/criativos novos estiverem prontos).
2. **Inversão dos planos**: hoje o **Básico (R$ 59,90)** tem CRM completo (clientes, serviços, relatórios, faturamento) mas **não tem** agendamento automático; o **Premium (R$ 99,90)** tem tudo. Isso vai virar: o novo **Plano Agenda (R$ 59,90)** foca só no agendamento automático + o mínimo de CRM necessário para ele funcionar (clientes e serviços), com a tela inicial simplificada. O novo **Plano Premium (R$ 89,90)** mantém tudo (CRM completo + relatórios + análises), oferecido como upsell — sem cadeados nos menus.

Nenhuma funcionalidade nova precisa ser criada — é reorganização e mudança de regra de acesso em cima do que já existe e funciona.

**Confirmado com o usuário (2026-07-10):** não há clientes reais pagantes no plano Básico em produção hoje (é ambiente de teste), então a inversão de plano pode ser feita sem plano de migração/comunicação para assinantes existentes. Nome escolhido para o plano de entrada: **"Plano Agenda"** (mantendo o slug `basico` no banco por compatibilidade — só o texto exibido muda).

## Como usar este documento

Cada Fase é independente e testável isoladamente. As caixas de seleção (`- [ ]`) marcam o progresso entre sessões — ao retomar o trabalho, veja aqui onde paramos.

## Processo de execução de cada etapa

Para cada etapa (ou subgrupo de etapas) executada:

1. Eu implemento as mudanças da etapa.
2. Antes de qualquer commit, eu reporto aqui no chat:
   - **O que foi feito** — lista objetiva dos arquivos alterados e o que mudou em cada um.
   - **Como testar** — passo a passo do que você precisa clicar/verificar no navegador. Deixo explícito se é um teste **visual** (só olhar se ficou como esperado), **funcional** (ex: gerar um Pix de teste, criar um estabelecimento com `plano='premium'` e outro com `'basico'` e navegar pelas rotas) ou puramente automático (build/typecheck, sem necessidade de você testar nada manualmente).
3. Eu só crio o commit **depois** da sua aprovação explícita.
4. Só avançamos para a próxima etapa depois do commit aprovado.

---

## Fase 1 — Rebranding "Lash Hub" → "Lash Agenda"

Não mexe em regra de negócio nenhuma, só em texto/branding. Baixo risco.

### 1.1 — Casca do app / PWA
- [x] `index.html` — `<title>` e `apple-mobile-web-app-title`
- [x] `public/manifest.json` — `name`/`short_name`
- [x] `public/sw.js` — comentário do cabeçalho e título padrão da notificação push
- [x] `src/index.css` — comentário do bloco de estilos do onboarding

### 1.2 — Telas da profissional
- [x] `src/components/layout/Sidebar.tsx:90` — fallback `'Lash Hub'` quando não há nome de negócio configurado
- [x] `src/pages/profissional/Login.tsx`
- [x] `src/pages/profissional/CadastroProfissional.tsx`
- [x] `src/pages/profissional/RecuperarSenha.tsx`
- [x] `src/pages/profissional/RedefinirSenha.tsx`
- [x] `src/pages/profissional/Tutoriais.tsx`
- [x] `src/components/common/ProfissionalRoute.tsx` — encontrado durante a execução (tela de loading), não estava listado originalmente

### 1.3 — Portal da cliente
- [x] `src/pages/portal-clientes/PortalLogin.tsx`
- [x] `src/pages/portal-clientes/CadastroCliente.tsx`
- [x] `src/components/layout/PortalLayout.tsx`
- [x] `src/components/common/ClienteRoute.tsx`

### 1.4 — Componentes comuns
- [x] `src/components/common/PushPermissionBanner.tsx` — só tinha uma chave de `localStorage` (`lashhub_push_banner_dismissed`), nenhum texto visível; mantida como está (ver nota abaixo)
- [x] `src/components/common/InstallBanner.tsx`
- [x] `src/components/common/InstallAppCard.tsx`
- [x] `src/hooks/useOnboarding.ts`

### 1.5 — Backend (Edge Functions)
- [x] `supabase/functions/send-push/index.ts` — verificado; só tinha o e-mail `lashhubapp@gmail.com` no `VAPID_SUBJECT` (identificador técnico, não texto de marca — mantido, ver nota abaixo). O título da notificação em si está em `public/sw.js`, já atualizado.
- [x] `supabase/functions/asaas-checkout/index.ts:80` — descrição enviada ao Asaas atualizada para `'Lash Agenda — Plano...'` (o valor cobrado continua igual, isso é Fase 2)

### 1.6 — Scripts e seeds (impacto zero em produção, mas mantém consistência)
- [x] `scripts/seed_demo.sql`, `scripts/seed_mariana_extra.sql`, `scripts/seed_mariana_julho.sql`
- [x] `scripts/schema_definitivo.sql` (comentário do cabeçalho)
- [x] `scripts/cleanup_demo.sql`
- [x] `scripts/create_demo_auth_users.mjs` — comentário do cabeçalho atualizado; a senha padrão `'LashHubDemo123!'` (linha 39) foi **mantida de propósito** (ver nota abaixo)

### 1.7 — Documentação interna
- [x] `docs/PRD - Lash Hub.md` → renomeado para `docs/PRD - Lash Agenda.md` e conteúdo atualizado (a tabela de planos em si só muda na Fase 3)
- [x] `docs/web_push_notifications.md`, `docs/manual_profissional.md`, `docs/manual_cliente.md`, `docs/guia_deploy_producao.md`, `docs/dados_videos.md`, `docs/dados_teste_manual.md`, `docs/processo_integracao_asaas.md`, `docs/plano_notificacoes_trial.md`, `docs/plano_migracao_asaas_producao.md`, `docs/plano_login_google.md`, `docs/plano-notificacoes-telegram.md`, `docs/prompt agente.md`

### Nota sobre o que foi deliberadamente NÃO alterado nesta fase
Em todos os arquivos acima, mantive intactos identificadores técnicos que continham "lashhub" mas não são texto de marca visível — mudá-los exigiria ações fora do código (renomear projeto no Supabase, recriar contas demo, etc.) ou causaria efeitos colaterais desnecessários:
- Refs de projeto Supabase: `lashhub-desenv`, `lashhub-prod`, `lashhub-prd`
- Domínios/e-mails: `lashhub.com`, `lashhub.com.br`, `lashhubapp@gmail.com`, e-mails de contas demo (`mariana.silva@lashhub.com`, etc.)
- Chaves internas sem exibição: classe CSS `.lashhub-onboarding-popover`, chaves de `localStorage` (`lashhub-app-card-dismissed`, `lashhub-install-banner-snoozed`, `lashhub_push_banner_dismissed`), nome de cache do service worker (`lashhub-v1`)
- Senha padrão de conta demo (`LashHubDemo123!`) — já pode estar em uso em contas já criadas
- Nome antigo do repositório GitHub mencionado em docs históricos (`lashhub-v03`) — registro histórico, não uma ação pendente

### Explicitamente FORA da Fase 1 (não tocar, não apagar — ficam exatamente como estão)
- `src/pages/LandingPage_*.tsx` (todas as variações) — o usuário vai editar essas páginas pessoalmente depois (vídeos, criativos, textos), por isso não sofrem nenhuma alteração agora, nem de branding. Nenhum arquivo é removido do projeto.
- `LashHub Tela Inicial (standalone).html` — arquivo solto de referência/protótipo, não faz parte do build; permanece no repositório sem alteração.

---

## Fase 2 — Preparação: textos e preços dos planos (sem mudar regra de acesso ainda)

Mudança visual/textual isolada, ainda sem tocar em `useSubscription`/gating. Assim dá pra validar preço e copy antes de mexer em permissão.

- [x] `src/pages/profissional/Faturamento.tsx` — renomeado "Plano Básico (CRM)" → **"Plano Agenda"** (ícone trocado de `Users` para `Calendar`), "Plano Premium (Agenda)" → **"Plano Premium"**; preços atualizados: R$ 59,90 (Agenda) e R$ 89,90 (Premium, era 99,90); benefícios de cada card reescritos refletindo a nova divisão (Agenda = agendamento + cadastro básico; Premium = tudo + relatórios/anamnese/histórico); rótulos "Básico"/"Premium" no painel de status e nas telas de checkout/sucesso também atualizados
- [x] `supabase/functions/asaas-checkout/index.ts:79-80` — `valor` do premium alterado de `99.90` para `89.90`; `descricao` atualizada para `Lash Agenda — Plano Agenda` / `Lash Agenda — Plano Premium`
- [x] `src/components/layout/Layout.tsx` — texto do toast de boas-vindas pós-checkout ("Plano Básico ativo!" → "Plano Agenda ativo!") — adicional encontrado durante a execução, não estava listado originalmente
- [ ] ~~Redeploy da Edge Function~~ — **adiado de propósito.** Decisão do usuário (2026-07-10): não redeployar Edge Functions a cada etapa; isso fica para o final do projeto, quando o sistema inteiro já estiver ajustado. Ver checklist consolidado em **"Lembretes — Deploy final de Edge Functions"** no fim deste documento.
- [ ] ~~Teste manual de checkout Pix~~ — depende do redeploy acima, também adiado para o final.

> **Nota:** como confirmado, não há assinantes reais hoje, então não existe assinatura antiga em valor divergente para se preocupar. Até o redeploy final, o código local já está correto (R$ 89,90), mas a Edge Function rodando ao vivo no Supabase ainda cobra o valor antigo (R$ 99,90) — sem risco, pois não há cobranças reais em andamento.

---

## Fase 3 — Inverter as regras de acesso (o core da mudança)

Esta é a fase que efetivamente muda quem vê o quê. Fazer com atenção e testar cada plano (crie/edite um estabelecimento de teste em cada `plano`).

- [x] `src/hooks/useSubscription.ts` — `hasFeature` invertida: `scheduling`/`dashboard` → `true` para ambos os planos; `crm` → `true` somente para `premium`
- [x] `src/App.tsx` — `agendamentos` e `meus-horarios` saíram do `PlanGuard`, ficam só atrás do `BillingGuard` (acessíveis a todos os planos); `relatorios` agora está dentro de `<PlanGuard requiredFeature="crm">`
- [x] `src/pages/portal-clientes/PortalAgendar.tsx` — removido o redirect que bloqueava clientes de estabelecimentos `plano === 'basico'`
- [x] `src/pages/portal-clientes/PortalCatalogo.tsx` — removida a flag `isBasico`, o banner de WhatsApp e a variante do card de serviço só-WhatsApp; agora todo mundo vê o botão "Agendar" normal
- [x] `src/components/layout/PortalLayout.tsx` — **adicional encontrado durante a execução, não estava no plano original**: essa tela também escondia os itens "Agendar"/"Meus Agendamentos"/"Meu Perfil" e até o botão "Entrar" para clientes de estúdios básico. Removida a mesma restrição aqui.
- [x] `src/components/layout/Sidebar.tsx` e `src/components/layout/TabBar.tsx` — removida toda a lógica de cadeado/`UpgradeModal` disparado por clique; Sidebar agora filtra os itens de menu (Relatórios exige `feature: 'crm'`, some do menu para quem é básico em vez de aparecer bloqueado); TabBar simplificado (não tinha nenhum item exigindo `crm`, então perdeu toda a lógica de bloqueio)
- [x] `src/components/common/BillingGuard.tsx` — lista de benefícios do Premium atualizada para citar Relatórios/Histórico/Anamnese em vez de "Portal de agendamento" e "histórico financeiro"
- [x] `src/components/common/UpgradeModal.tsx` — pitch reescrito para CRM/Relatórios/Análises (o gatilho visual que abria esse modal foi removido nesta fase junto com os cadeados; ele volta a ser usado na Fase 6, com um ponto de entrada novo)
- [ ] Teste manual completo — **fazer antes de aprovar o commit**, ver instruções no chat

---

## Fase 4 — Redesenho da tela inicial (Dashboard) no estilo do print de referência

A maior parte dos dados já existe em `Dashboard.tsx` (agendamentos de hoje, faturamento, próximos atendimentos) — é reorganização de layout, não nova lógica de dados.

- [x] Adicionado card "Compartilhe sua Agenda" em destaque (cor da marca), com botão "Copiar Link Público" (mesma lógica de cópia + fallback do `LinkAgendamento.tsx`) — aparece para os dois planos, logo abaixo dos KPIs
- [x] KPIs simplificados para o plano Agenda: "Agendas Hoje" (contagem) + "Caixa Hoje" (soma dos agendamentos concluídos **do dia**, nova query separada da mensal). Plano Premium manteve os 4 cards originais (Faturamento do Mês, Agendamentos Hoje, Aguardando Confirmação, Novas Clientes) sem alteração
- [x] Seção renomeada para "Próximos Clientes" com link "Ver agenda →" ao lado do título, presente nos dois planos
- [x] Dashboard diferenciado por plano: Agenda esconde Ações Rápidas e o gráfico de receita/crescimento de 7 dias; Premium mantém tudo como estava
- [x] Badge de plano adicionado ao lado da saudação ("AGENDA" ou "PRO" com ícone de coroa)

---

## Fase 5 — Navegação mobile (TabBar) e Sidebar reorganizados

- [x] `TabBar.tsx` — trocado para 5 itens fixos: Início, Clientes, **Agenda (botão central flutuante em destaque)**, Serviços, Config. O botão "Mais" foi removido — **descoberta durante a execução**: o `Header.tsx` já tinha um ícone de hambúrguer (canto superior esquerdo, mobile) que abre a Sidebar como gaveta, então essa era uma segunda porta de entrada redundante para a mesma coisa. Configurações/Assinatura/Suporte continuam acessíveis por ali, sem necessidade de decidir um novo lugar para eles.
- [x] `src/components/layout/Layout.tsx` — removida a prop `onMoreClick` do `<TabBar />` (não é mais necessária)
- [x] `Sidebar.tsx` (desktop) — itens reordenados para priorizar Agendamentos logo após Meu Estúdio (cadeados já tinham sido removidos na Fase 3). **Nota de escopo:** o card de upsell Premium no rodapé fica para a Fase 6, que já é dona desse entregável — evita fazer o mesmo trabalho duas vezes.
- [ ] Teste em mobile (viewport reduzido) e desktop — **fazer antes de aprovar o commit**

---

## Fase 6 — Upsell do Premium (substituir o modelo de cadeado)

- [ ] Definir onde entra o "link/CTA" de upsell: card na Sidebar, banner na tela inicial do plano Agenda, e/ou item "Conheça o Premium" no menu que abre o `UpgradeModal` redesenhado
- [ ] Reescrever `UpgradeModal.tsx` com o novo pitch (CRM/Relatórios/Análises em vez de Agenda Online)
- [ ] Página `Faturamento.tsx` já serve como página de upgrade — conferir que o fluxo "clicar no upsell → ver os 2 planos → assinar Premium" funciona ponta a ponta

---

## Fase 7 — Simplificação adicional do plano Agenda (opcional, avaliar necessidade)

Depende de quanto você quer simplificar a experiência de Clientes/Serviços para quem está no plano de entrada. Não decidir agora — revisar depois que as Fases 1-6 estiverem testadas e você tiver visto o app funcionando na nova estrutura.

- [ ] Avaliar se `PerfilCliente.tsx` (ficha de anamnese completa) deve ter uma versão reduzida no plano Agenda ou se fica igual para os dois
- [ ] Avaliar se `Clientes.tsx` deve esconder histórico de `atendimentos` (registro manual de atendimento, distinto do agendamento online) para o plano Agenda

---

## Fase 8 — Documentação final

- [ ] Atualizar `docs/PRD - Lash Agenda.md` com a tabela de planos definitiva (renomeada na Fase 1)
- [ ] Atualizar `docs/manual_profissional.md` e `docs/manual_cliente.md` com o novo fluxo

---

## Fora de escopo deste plano (tratar depois, separadamente)
- Landing pages (`LandingPage_*.tsx`) — não serão alteradas nem apagadas neste plano; o usuário vai editá-las pessoalmente depois, quando tiver os vídeos/criativos novos prontos
- Migração de assinantes reais — não aplicável (confirmado: sem clientes pagantes no básico hoje)

---

## Lembretes — Deploy final de Edge Functions

**Decisão do usuário (2026-07-10):** não fazer redeploy de Edge Functions do Supabase a cada etapa deste plano. O código-fonte é ajustado normalmente a cada fase (e commitado), mas o redeploy real no Supabase (que exige `supabase login` com credenciais do usuário) fica concentrado para **o final**, quando todo o sistema já estiver ajustado. Até lá, a versão rodando ao vivo no Supabase continua com o comportamento antigo — sem risco, pois não há assinantes reais hoje.

Checklist a executar no final (revisar e marcar conforme cada Edge Function for de fato alterada ao longo das fases):
- [ ] `asaas-checkout` — valor do Premium (R$ 89,90) e descrição ("Lash Agenda — Plano ...") — alterado na Fase 2
- [ ] Conferir se alguma outra Edge Function foi tocada nas Fases 3-8 e incluir aqui antes do deploy final
- [ ] Rodar `npx supabase functions deploy <nome-da-funcao>` para cada uma
- [ ] Teste manual pós-deploy: gerar um checkout Pix de cada plano em ambiente de teste do Asaas e conferir o valor cobrado
