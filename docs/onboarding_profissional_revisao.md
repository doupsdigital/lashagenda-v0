# Revisão do Onboarding da Profissional (tours + checklist "Primeiros Passos")

## Contexto

O sistema mudou muito de layout/funcionalidades desde que os tours de onboarding
(driver.js) foram escritos originalmente, e vários passos apontavam pra elementos
que não existiam mais na tela — na prática, quebrados. Além disso, o produto tem
dois planos (**Agenda/básico** e **Premium**) com telas diferentes, e os tours não
tratavam essa diferença.

Depois de corrigir os tours existentes, veio uma segunda mudança de estratégia:
parar de mostrar esses tours automaticamente a cada tela na primeira visita, e no
lugar disso mostrar **uma única vez**, no primeiro acesso, um checklist guiado
baseado em tarefa real (preencher dados do negócio, ter serviços, cadastrar uma
cliente-teste, criar um agendamento), pra reduzir a fricção de uso logo de cara.
Os tours por tela continuam existindo, só que agora só abrem via botão **Ajuda**.

Esse documento cobre as duas frentes, feitas na mesma leva de trabalho:

1. Revisão/correção dos tours existentes + diferenciação por plano (commit `13aed5d`)
2. Checklist "Primeiros Passos" + remoção do disparo automático dos tours (a commitar)

---

## Parte 1 — Revisão dos tours existentes

Arquivo principal: `src/hooks/useOnboarding.ts`.

### Bugs corrigidos (tours que praticamente nunca funcionavam)

- **Meu Estúdio**: o Dashboard tem layout bem diferente por plano, mas havia um
  tour único. Pra quem está no plano Agenda, 6 dos 12 passos apontavam pra
  elementos que não existem no DOM (ações rápidas, cards que só existem no
  Premium). Agora existem dois roteiros — `MEU_ESTUDIO_STEPS_PREMIUM` e
  `MEU_ESTUDIO_STEPS_BASICO` — escolhidos automaticamente via
  `useOnboarding('meu_estudio', { isPremium })`.
- **Agendamentos**: o passo "Grade de horários" (`#ob-agend-grid`) só existia na
  visualização Semanal, que nunca é o padrão (Mensal no desktop, Diária no
  mobile) — ou seja, esse passo nunca era exibido corretamente na prática. O
  mesmo id foi adicionado nas 3 visualizações (`Agendamentos.tsx`). O passo
  "Aguardando confirmação" (`#ob-agend-pendentes`) só existe no DOM quando há
  pelo menos 1 pendente — agora é pulado dinamicamente quando não há nenhum,
  via `useOnboarding('agendamentos', { hasPending })`.
- **Menu principal** (último passo do tour de Meu Estúdio): alternava entre
  Sidebar (desktop) e TabBar (mobile), mas um dos dois sempre está com
  `display:none` dependendo do tamanho de tela, e driver.js não lida bem com
  elemento invisível. Agora escolhe em tempo real qual dos dois está visível
  (`menuPrincipalElement()` em `useOnboarding.ts`).

### Textos desatualizados corrigidos

- **Clientes**: removida menção a "Ficha Clínica (Anamnese)" no formulário de
  cadastro — esse campo nunca existiu ali, e é um recurso à parte do Premium.
- **Serviços**: removida menção a um botão de ativar/desativar serviço que não
  existe mais na lista (hoje só tem editar/excluir).
- **Configurações**: ordem dos passos do tour ajustada pra bater com a ordem
  visual dos cards na tela (Perfil → Negócio → Agendamento → Visual).
- **Fichas de Anamnese**: essa tela (Premium) não tinha nenhum tour — foi
  adicionado um com 3 passos.

### Diferenciação por plano

`useOnboarding(pageKey, options)` agora aceita `isPremium` e `hasPending` em
`options`. Relatórios e Fichas de Anamnese já são bloqueados por plano na rota
(`PlanGuard` em `App.tsx`), então esses tours só rodam mesmo pra quem é Premium
sem precisar de lógica extra — só o Dashboard precisa de ramificação explícita,
porque é a única tela cuja estrutura muda de verdade entre os planos.

### Cor dos botões do popover

Os botões do driver.js (Próximo/Anterior/Fechar) usavam um hex fixo
(`#9B5A66`) que não batia com a cor "Cherry" padrão do sistema. Trocado por
`var(--rose-600)` em `src/index.css` (classe `.lashhub-onboarding-popover`),
que já é a variável usada em todo o resto do app e muda sozinha conforme a
paleta escolhida pela profissional em Configurações (inclusive dark mode). A
mesma classe CSS é compartilhada com os tours do **portal da cliente**, então o
ajuste vale pros dois lados.

---

## Parte 2 — Checklist "Primeiros Passos"

### O que mudou

- **Os 9 tours da profissional não abrem mais sozinhos.** Foi removida a
  chamada `useOnboarding(...)` + o `useEffect` que disparava `autoStart()` de:
  `Dashboard.tsx`, `Agendamentos.tsx`, `Clientes.tsx`, `Servicos.tsx`,
  `MeusHorarios.tsx`, `Relatorios.tsx`, `LinkAgendamento.tsx`,
  `Configuracoes.tsx`, `FichasAnamnese.tsx`. O botão **Ajuda** (flutuante,
  `FloatingHelpButton.tsx`) continua funcionando normalmente em todas — ele
  sempre teve sua própria instância do hook, independente do `autoStart`.
  De quebra, foi adicionado o mapeamento de `/fichas-anamnese` no
  `FloatingHelpButton.tsx`, que estava faltando (essa tela não tinha nem botão
  Ajuda antes).
- **Os tours do portal da cliente continuam automáticos**, sem mudança — o
  pedido era só sobre o lado da profissional.
- **Novo widget flutuante "Primeiros Passos"**, visível em todas as telas da
  profissional (montado em `Layout.tsx`), com 5 passos:

  | # | Passo | Tela | Como detecta que foi concluído |
  |---|---|---|---|
  | 1 | Dados do negócio | Configurações | `configuracao_negocio.descricao`, `.instagram` ou `.endereco` preenchido |
  | 2 | Serviços prontos | Serviços | Sempre marcado — já existem 2 serviços de exemplo desde o cadastro |
  | 3 | Cliente-teste | Clientes | `clientes` da profissional, `count > 0` |
  | 4 | Criar um agendamento | Agendamentos | `agendamentos` com `origem = 'admin'`, `count > 0` |
  | 5 | Bônus: ver pelo lado da cliente | Link de Agendamento | `agendamentos` com `origem = 'portal'`, `count > 0` — não bloqueia nem esconde o widget, é só um cartão extra |

  Cada item tem um botão "Ir" que navega até a tela certa e rola até o
  elemento correspondente (reaproveita os mesmos ids `#ob-*` já usados pelos
  tours, sem markup novo).

### Regras de exibição

- Só aparece se os 3 passos "core" (1, 3 e 4 — o 2 é sempre `true`) ainda não
  estiverem todos concluídos **e** ela não tiver fechado o widget antes.
- Assim que os 3 passos core ficam `true`, o widget marca a si mesmo como
  "visto" (mesmo mecanismo de `usuarios.onboarding_paginas_vistas` já usado
  pelos tours e pelo aviso de serviços de exemplo — chave
  `primeiros_passos_widget`) e some pra sempre — não volta a aparecer mesmo
  que ela depois apague a cliente-teste, por exemplo.
- O X de fechar manual faz a mesma marcação — some pra sempre também.
- **Contas antigas nunca veem o widget**: como a detecção é 100% baseada em
  dado real (sem coluna nova nem flag de "conta nova"), qualquer estúdio que já
  usa o sistema há tempo já tem esses 3 dados preenchidos, então o widget nunca
  chega a aparecer pra ele.
- Não depende de plano — os 5 passos existem tanto no Agenda quanto no
  Premium.

### Arquivos novos

- `src/hooks/useFirstStepsProgress.ts` — hook que consulta o Supabase (4
  queries leves, `count: 'exact', head: true` + 1 select simples) e retorna os
  booleans de progresso. Refaz a consulta a cada troca de rota, pra refletir
  uma ação feita em outra tela sem precisar recarregar a página.
- `src/components/common/FirstStepsWidget.tsx` — o botão flutuante (canto
  inferior esquerdo — o direito já é ocupado por Ajuda + WhatsApp do trial) e
  o painel expansível com os 5 itens.

### Arquivos alterados

`src/components/layout/Layout.tsx` (monta o widget),
`src/components/common/FloatingHelpButton.tsx` (mapeamento de Fichas de
Anamnese), e as 9 telas listadas acima (remoção do `autoStart`).

---

## Como testar

Pré-requisitos: `npm install`, `.env` com as variáveis do Supabase (mesmo banco
de produção — não existe banco de teste separado neste projeto, então qualquer
conta criada durante o teste fica salva de verdade).

```bash
npm run dev
```

### 1. Tours por tela (Parte 1)
1. Entre com uma conta de profissional já existente (ou crie uma nova).
2. Em cada tela (Meu Estúdio, Agendamentos, Clientes, Serviços, Meus Horários,
   Configurações, Link de Agendamento, e — só se for Premium — Relatórios e
   Fichas de Anamnese), **nenhum tour deve abrir sozinho**.
3. Clique no botão **Ajuda** (flutuante, canto inferior direito) em cada tela
   — o tour correspondente deve abrir, com os passos apontando pros elementos
   certos (sem popover "flutuando" sem destacar nada).
4. No Dashboard (Meu Estúdio), confira que o tour muda de conteúdo dependendo
   do plano da conta (Agenda = roteiro curto sem ações rápidas; Premium =
   roteiro completo com KPIs e ações rápidas).
5. Em Agendamentos, teste o botão Ajuda com e sem agendamentos pendentes — o
   passo "Aguardando confirmação" só deve aparecer quando existir pelo menos 1
   pendente.

### 2. Widget "Primeiros Passos" (Parte 2)
1. **Crie uma profissional nova** (via `/cadastro`) — é a única forma
   confiável de testar do zero, já que contas antigas nunca veem o widget.
2. Após o modal de boas-vindas, o botão flutuante "Primeiros passos" deve
   aparecer no canto inferior esquerdo, com contador `0/3`.
3. Clique nele pra abrir o painel — confira os 5 itens, com o passo de
   Serviços já marcado como concluído.
4. Clique em "Ir" no passo "Dados do negócio" — deve navegar pra
   Configurações e rolar até o card "Dados do Meu Negócio". Preencha
   descrição, Instagram ou endereço e salve.
5. Volte pro painel (ele deve continuar acessível em qualquer tela) — o passo
   1 deve aparecer marcado (pode levar uma navegação de página pra atualizar,
   já que o hook busca de novo a cada troca de rota).
6. Repita pra "Cliente-teste" (cadastre uma cliente) e "Criar um agendamento"
   (crie um agendamento manual pra essa cliente).
7. Quando os 3 passos core estiverem concluídos, o widget deve **sumir
   sozinho** — recarregue a página pra confirmar que não volta.
8. Teste o fechamento manual: em outra conta nova, clique no X do painel antes
   de completar tudo — o widget deve sumir e não reaparecer, mesmo recarregando
   a página.
9. (Opcional) Teste o passo bônus: compartilhe o link de agendamento, faça um
   agendamento pelo portal da cliente com essa conta, e confirme que o item
   "Bônus" fica marcado como concluído (sem esconder o widget nem os outros
   itens já concluídos, já que esse passo não conta pro auto-hide).
10. Confirme que uma **conta antiga** (que você já usa há tempo, com dados
    reais) nunca mostra o widget, em nenhuma tela.

### Checagens rápidas de build
```bash
npx tsc --noEmit -p .   # typecheck limpo
npx eslint .            # sem erros novos nos arquivos alterados
```
