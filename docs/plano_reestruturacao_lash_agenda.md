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
- [ ] `index.html` — `<title>` e `apple-mobile-web-app-title`
- [ ] `public/manifest.json` — `name`/`short_name`
- [ ] `public/sw.js` — textos de notificação push, se houver
- [ ] `src/index.css` — comentários/referências, se houver

### 1.2 — Telas da profissional
- [ ] `src/components/layout/Sidebar.tsx:90` — fallback `'Lash Hub'` quando não há nome de negócio configurado
- [ ] `src/pages/profissional/Login.tsx`
- [ ] `src/pages/profissional/CadastroProfissional.tsx`
- [ ] `src/pages/profissional/RecuperarSenha.tsx`
- [ ] `src/pages/profissional/RedefinirSenha.tsx`
- [ ] `src/pages/profissional/Tutoriais.tsx`

### 1.3 — Portal da cliente
- [ ] `src/pages/portal-clientes/PortalLogin.tsx`
- [ ] `src/pages/portal-clientes/CadastroCliente.tsx`
- [ ] `src/components/layout/PortalLayout.tsx`
- [ ] `src/components/common/ClienteRoute.tsx`

### 1.4 — Componentes comuns
- [ ] `src/components/common/PushPermissionBanner.tsx`
- [ ] `src/components/common/InstallBanner.tsx`
- [ ] `src/components/common/InstallAppCard.tsx`
- [ ] `src/hooks/useOnboarding.ts`

### 1.5 — Backend (Edge Functions)
- [ ] `supabase/functions/send-push/index.ts` — texto das notificações
- [ ] `supabase/functions/asaas-checkout/index.ts:80` — descrição enviada ao Asaas (`'Lash Hub — Plano...'`) — **atenção**: só afeta assinaturas novas, ver Fase 3

### 1.6 — Scripts e seeds (impacto zero em produção, mas mantém consistência)
- [ ] `scripts/seed_demo.sql`, `scripts/seed_mariana_extra.sql`, `scripts/seed_mariana_julho.sql`
- [ ] `scripts/schema_definitivo.sql` (comentários)
- [ ] `scripts/create_demo_auth_users.mjs`
- [ ] `scripts/cleanup_demo.sql`

### 1.7 — Documentação interna
- [ ] `docs/PRD - Lash Hub.md` → renomear arquivo para `docs/PRD - Lash Agenda.md` e atualizar conteúdo (também recebe a tabela de planos nova na Fase 3)
- [ ] `docs/web_push_notifications.md`, `docs/manual_profissional.md`, `docs/manual_cliente.md`, `docs/guia_deploy_producao.md`, `docs/dados_videos.md`, `docs/dados_teste_manual.md`, `docs/processo_integracao_asaas.md`, `docs/plano_notificacoes_trial.md`, `docs/plano_migracao_asaas_producao.md`, `docs/plano_login_google.md`, `docs/plano-notificacoes-telegram.md`, `docs/prompt agente.md`

### Explicitamente FORA da Fase 1 (não tocar, não apagar — ficam exatamente como estão)
- `src/pages/LandingPage_*.tsx` (todas as variações) — o usuário vai editar essas páginas pessoalmente depois (vídeos, criativos, textos), por isso não sofrem nenhuma alteração agora, nem de branding. Nenhum arquivo é removido do projeto.
- `LashHub Tela Inicial (standalone).html` — arquivo solto de referência/protótipo, não faz parte do build; permanece no repositório sem alteração.

---

## Fase 2 — Preparação: textos e preços dos planos (sem mudar regra de acesso ainda)

Mudança visual/textual isolada, ainda sem tocar em `useSubscription`/gating. Assim dá pra validar preço e copy antes de mexer em permissão.

- [ ] `src/pages/profissional/Faturamento.tsx` — renomear cards de plano: "Plano Básico (CRM)" → **"Plano Agenda"**, "Plano Premium (Agenda)" → **"Plano Premium"**; atualizar preços: R$ 59,90 (Agenda) e R$ 89,90 (Premium, era 99,90); reescrever a lista de benefícios de cada card conforme a nova divisão de features (ver Fase 3)
- [ ] `supabase/functions/asaas-checkout/index.ts:79-80` — atualizar `valor` do premium de `99.90` para `89.90` e a `descricao` para `Lash Agenda — Plano ...`
- [ ] Redeploy da Edge Function (`npx supabase functions deploy asaas-checkout`)
- [ ] Teste manual: gerar um checkout Pix de cada plano em ambiente de teste do Asaas e conferir o valor cobrado

> **Nota:** como confirmado, não há assinantes reais hoje, então não existe assinatura antiga em valor divergente para se preocupar.

---

## Fase 3 — Inverter as regras de acesso (o core da mudança)

Esta é a fase que efetivamente muda quem vê o quê. Fazer com atenção e testar cada plano (crie/edite um estabelecimento de teste em cada `plano`).

- [ ] `src/hooks/useSubscription.ts` — reescrever `hasFeature`:
  - `scheduling` → `true` para **ambos** os planos (agenda automática deixa de ser exclusiva)
  - novo caso `'crm'` (ou `'relatorios'`) → `true` **somente** para `premium` (cobre Relatórios e qualquer análise avançada)
  - manter `dashboard` como está (ambos têm alguma tela inicial, só muda o conteúdo dela)
- [ ] `src/components/common/PlanGuard.tsx` — trocar a rota protegida: em vez de proteger `agendamentos`/`meus-horarios` com `requiredFeature="scheduling"`, proteger `relatorios` (e outras rotas de CRM avançado que definirmos) com `requiredFeature="crm"`
- [ ] `src/App.tsx` — mover `<Route path="agendamentos">` e `<Route path="meus-horarios">` para fora do `<PlanGuard requiredFeature="scheduling">` (viram acessíveis a todos os planos, só atrás do `BillingGuard`); envolver `<Route path="relatorios">` com `<PlanGuard requiredFeature="crm">`
- [ ] `src/pages/portal-clientes/PortalAgendar.tsx:168` — remover o redirect que bloqueia clientes de estabelecimentos `plano === 'basico'` de agendar online
- [ ] `src/pages/portal-clientes/PortalCatalogo.tsx:216` — remover/ajustar a flag `isBasico` que hoje esconde o CTA de agendar para clientes do plano básico
- [ ] `src/components/layout/Sidebar.tsx` e `src/components/layout/TabBar.tsx` — remover toda a lógica de `isLocked`/cadeado; itens de CRM avançado (Relatórios) somem do menu para quem é `basico` em vez de aparecer bloqueados
- [ ] `src/components/common/BillingGuard.tsx` — atualizar a lista de benefícios "O plano Premium inclui" (hoje cita "Portal de agendamento online" e "histórico financeiro" como exclusivos — isso muda)
- [ ] `src/components/common/UpgradeModal.tsx` — reescrever completamente: hoje vende "Agenda & Horários Online" como o gancho do Premium; o novo gancho é CRM/Relatórios/Análises
- [ ] Teste manual completo: criar 1 estabelecimento de teste `plano='basico'` e 1 `plano='premium'`, navegar por todas as rotas, confirmar que agendamento funciona nos dois e que CRM avançado só aparece no premium

---

## Fase 4 — Redesenho da tela inicial (Dashboard) no estilo do print de referência

A maior parte dos dados já existe em `Dashboard.tsx` (agendamentos de hoje, faturamento, próximos atendimentos) — é reorganização de layout, não nova lógica de dados.

- [ ] Adicionar card "Compartilhe sua Agenda" em destaque (cor da marca), com botão "Copiar Link Público" — reaproveitar a lógica de cópia que já existe em `LinkAgendamento.tsx` (`handleCopyLink`)
- [ ] Simplificar os KPIs no topo para o essencial do plano Agenda: "Agendas hoje" + "Caixa hoje" (faturamento do dia, não do mês — ajustar a query de `heroRevenue` para escopo diário quando for o plano Agenda, ou manter mensal se preferir manter como está — **decidir com o usuário na hora**)
- [ ] Reaproveitar a seção "Próximos atendimentos de hoje" já existente, renomeando para "Próximos Clientes" com link "Ver agenda →"
- [ ] Diferenciar o dashboard por plano: versão simplificada (Agenda) esconde gráfico de receita/crescimento de 7 dias e ações rápidas de CRM; versão completa (Premium) mantém o que já existe hoje
- [ ] Adicionar badge de plano ("AGENDA" / "PRO") ao lado da saudação, no estilo do print

---

## Fase 5 — Navegação mobile (TabBar) e Sidebar reorganizados

- [ ] `TabBar.tsx` — trocar para 5 itens fixos: Início, Clientes, **Agenda (botão central em destaque/FAB)**, Serviços, Config — remover o botão "Mais" atual ou decidir onde ficam Assinatura/Suporte (sugestão: dentro da própria tela de Configurações, como sub-itens, em vez de um menu "Mais" separado — **validar com o usuário**)
- [ ] `Sidebar.tsx` (desktop) — mesma reorganização de itens, remover ícones de cadeado, adicionar card de upsell Premium no rodapé em vez de item bloqueado
- [ ] Teste em mobile (viewport reduzido) e desktop

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
