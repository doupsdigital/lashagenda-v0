-- =========================================================================
-- LASH HUB — MARIANA LIMA: DADOS DE JULHO 2026
-- 1. Atendimentos manuais de hoje → faturamento do mês ~R$ 1.580,00
--    (usa DATE sem hora, funciona mesmo cedo pois é registro manual)
-- 2. Agendamentos espaçados para amanhã e depois de amanhã
-- 3. Imagens padrão dos serviços (o seed bypassou o trigger que as adiciona)
--
-- Pré-requisito: seed_demo.sql e seed_mariana_extra.sql já executados.
-- =========================================================================

DO $$
DECLARE
  v_est UUID;

  -- Serviços
  v_fio UUID; v_vr  UUID; v_vh  UUID;
  v_lft UUID; v_spa UUID; v_sob UUID; v_hen UUID; v_man UUID; v_rem UUID;

  -- Clientes originais (seed_demo)
  c_larissa     UUID; c_anacarolina UUID; c_juliana  UUID;
  c_patricia    UUID; c_rafaela     UUID; c_thais    UUID;
  c_isabela     UUID; c_marcia      UUID; c_vanessa  UUID;

  -- Clientes extras (seed_mariana_extra)
  c_beatriz     UUID; c_camila      UUID; c_daniela  UUID;
  c_giovanna    UUID; c_helena      UUID; c_karina   UUID;

  ag UUID;
BEGIN

  SELECT id INTO v_est FROM public.estabelecimentos WHERE slug = 'mari-lash';
  IF v_est IS NULL THEN
    RAISE EXCEPTION 'Estabelecimento mari-lash não encontrado. Rode o seed_demo.sql antes.';
  END IF;

  -- ── Serviços ────────────────────────────────────────────────────────────
  SELECT id INTO v_fio FROM public.servicos WHERE estabelecimento_id = v_est AND nome = 'Fio a Fio Clássico';
  SELECT id INTO v_vr  FROM public.servicos WHERE estabelecimento_id = v_est AND nome = 'Volume Russo';
  SELECT id INTO v_vh  FROM public.servicos WHERE estabelecimento_id = v_est AND nome = 'Volume Híbrido';
  SELECT id INTO v_lft FROM public.servicos WHERE estabelecimento_id = v_est AND nome = 'Lash Lifting Completo';
  SELECT id INTO v_spa FROM public.servicos WHERE estabelecimento_id = v_est AND nome = 'Spa de Cílios';
  SELECT id INTO v_sob FROM public.servicos WHERE estabelecimento_id = v_est AND nome = 'Design de Sobrancelhas';
  SELECT id INTO v_hen FROM public.servicos WHERE estabelecimento_id = v_est AND nome = 'Design com Henna';
  SELECT id INTO v_man FROM public.servicos WHERE estabelecimento_id = v_est AND nome = 'Manutenção de Extensão';
  SELECT id INTO v_rem FROM public.servicos WHERE estabelecimento_id = v_est AND nome = 'Remoção de Extensão';

  -- ── Clientes ────────────────────────────────────────────────────────────
  SELECT id INTO c_larissa     FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'larissa.fernandes@gmail.com';
  SELECT id INTO c_anacarolina FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'anacarolina.silva@hotmail.com';
  SELECT id INTO c_juliana     FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'juliana.santos@outlook.com';
  SELECT id INTO c_patricia    FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'patricia.mendes@gmail.com';
  SELECT id INTO c_rafaela     FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'rafaela.sousa@gmail.com';
  SELECT id INTO c_thais       FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'thais.carvalho@icloud.com';
  SELECT id INTO c_isabela     FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'isabela.rocha@gmail.com';
  SELECT id INTO c_marcia      FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'marcia.lima@yahoo.com.br';
  SELECT id INTO c_vanessa     FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'vanessa.pinto@gmail.com';
  SELECT id INTO c_beatriz     FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'beatriz.nogueira@gmail.com';
  SELECT id INTO c_camila      FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'camila.rezende@hotmail.com';
  SELECT id INTO c_daniela     FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'daniela.prado@gmail.com';
  SELECT id INTO c_giovanna    FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'giovanna.tavares@icloud.com';
  SELECT id INTO c_helena      FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'helena.brandao@gmail.com';
  SELECT id INTO c_karina      FROM public.clientes WHERE estabelecimento_id = v_est AND email = 'karina.lacerda@gmail.com';

  IF c_larissa IS NULL OR c_beatriz IS NULL THEN
    RAISE EXCEPTION 'Clientes não encontrados. Rode seed_demo.sql e seed_mariana_extra.sql antes.';
  END IF;

  -- ======================================================================
  -- 1. ATENDIMENTOS MANUAIS — total exato R$ 1.580,00
  --    data_atendimento é DATE (sem hora), válido qualquer hora do dia
  -- ======================================================================
  INSERT INTO public.atendimentos (estabelecimento_id, cliente_id, servico_id, data_atendimento, valor_cobrado, observacoes) VALUES
    -- Volume Russo × 3 = R$ 600,00
    (v_est, c_larissa,     v_vr,  CURRENT_DATE, 200.00, 'Volume Russo — manutenção do mês'),
    (v_est, c_patricia,    v_vr,  CURRENT_DATE, 200.00, 'Volume Russo — renovação completa'),
    (v_est, c_beatriz,     v_vr,  CURRENT_DATE, 200.00, 'Volume Russo'),
    -- Fio a Fio × 2 = R$ 300,00
    (v_est, c_juliana,     v_fio, CURRENT_DATE, 150.00, 'Fio a Fio Clássico'),
    (v_est, c_camila,      v_fio, CURRENT_DATE, 150.00, 'Fio a Fio Clássico'),
    -- Volume Híbrido × 1 = R$ 180,00
    (v_est, c_daniela,     v_vh,  CURRENT_DATE, 180.00, 'Volume Híbrido'),
    -- Lash Lifting × 1 = R$ 120,00
    (v_est, c_rafaela,     v_lft, CURRENT_DATE, 120.00, 'Lash Lifting completo'),
    -- Manutenção × 1 = R$ 100,00
    (v_est, c_marcia,      v_man, CURRENT_DATE, 100.00, 'Manutenção de extensão'),
    -- Design com Henna × 2 = R$ 140,00
    (v_est, c_thais,       v_hen, CURRENT_DATE,  70.00, 'Design com henna'),
    (v_est, c_giovanna,    v_hen, CURRENT_DATE,  70.00, 'Design com henna'),
    -- Design de Sobrancelhas × 1 = R$ 50,00
    (v_est, c_anacarolina, v_sob, CURRENT_DATE,  50.00, 'Design de sobrancelha'),
    -- Spa de Cílios × 1 = R$ 50,00
    (v_est, c_vanessa,     v_spa, CURRENT_DATE,  50.00, 'Spa de cílios'),
    -- Remoção de Extensão × 1 = R$ 40,00
    (v_est, c_helena,      v_rem, CURRENT_DATE,  40.00, 'Remoção de extensão');
  -- ─────────────────────────────────────────────────────────────────────────
  -- TOTAL: R$ 200×3 + R$150×2 + R$180 + R$120 + R$100 + R$70×2 + R$50 + R$50 + R$40
  --       = 600 + 300 + 180 + 120 + 100 + 140 + 50 + 50 + 40 = R$ 1.580,00 ✓

  -- ======================================================================
  -- 2a. AGENDAMENTOS AMANHÃ (CURRENT_DATE + 1) — 5 slots espaçados
  --     09:00 → 10:30 | pausa | 11:30 → 12:15 | almoço | 13:30 → 16:00 | pausa | 16:30 → 17:30
  -- ======================================================================
  ag := gen_random_uuid();
  INSERT INTO public.agendamentos
    (id, estabelecimento_id, cliente_id, data_hora, duracao_minutos, status, origem, valor_cobrado, observacoes) VALUES
    (ag, v_est, c_isabela,
     ((CURRENT_DATE+1)::timestamp + TIME '09:00') AT TIME ZONE 'America/Sao_Paulo',
     90, 'confirmado', 'admin', 100.00, 'Manutenção de extensão');
  INSERT INTO public.agendamento_servicos (agendamento_id, servico_id, valor_cobrado) VALUES (ag, v_man, 100.00);
  -- termina 10:30, pausa até 11:30

  ag := gen_random_uuid();
  INSERT INTO public.agendamentos
    (id, estabelecimento_id, cliente_id, data_hora, duracao_minutos, status, origem, valor_cobrado, observacoes) VALUES
    (ag, v_est, c_thais,
     ((CURRENT_DATE+1)::timestamp + TIME '11:30') AT TIME ZONE 'America/Sao_Paulo',
     45, 'confirmado', 'admin', 50.00, 'Design de sobrancelha');
  INSERT INTO public.agendamento_servicos (agendamento_id, servico_id, valor_cobrado) VALUES (ag, v_sob, 50.00);
  -- termina 12:15, almoço até 13:30

  ag := gen_random_uuid();
  INSERT INTO public.agendamentos
    (id, estabelecimento_id, cliente_id, data_hora, duracao_minutos, status, origem, valor_cobrado, observacoes) VALUES
    (ag, v_est, c_patricia,
     ((CURRENT_DATE+1)::timestamp + TIME '13:30') AT TIME ZONE 'America/Sao_Paulo',
     150, 'confirmado', 'portal', 200.00, 'Volume Russo');
  INSERT INTO public.agendamento_servicos (agendamento_id, servico_id, valor_cobrado) VALUES (ag, v_vr, 200.00);
  -- termina 16:00, pausa até 16:30

  ag := gen_random_uuid();
  INSERT INTO public.agendamentos
    (id, estabelecimento_id, cliente_id, data_hora, duracao_minutos, status, origem, valor_cobrado, observacoes) VALUES
    (ag, v_est, c_anacarolina,
     ((CURRENT_DATE+1)::timestamp + TIME '16:30') AT TIME ZONE 'America/Sao_Paulo',
     60, 'confirmado', 'admin', 70.00, 'Design com henna');
  INSERT INTO public.agendamento_servicos (agendamento_id, servico_id, valor_cobrado) VALUES (ag, v_hen, 70.00);
  -- termina 17:30

  ag := gen_random_uuid();
  INSERT INTO public.agendamentos
    (id, estabelecimento_id, cliente_id, data_hora, duracao_minutos, status, origem, valor_cobrado, observacoes) VALUES
    (ag, v_est, c_camila,
     ((CURRENT_DATE+1)::timestamp + TIME '17:30') AT TIME ZONE 'America/Sao_Paulo',
     30, 'pendente', 'portal', 50.00, 'Spa de cílios');
  INSERT INTO public.agendamento_servicos (agendamento_id, servico_id, valor_cobrado) VALUES (ag, v_spa, 50.00);
  -- termina 18:00 (fim do expediente)

  -- ======================================================================
  -- 2b. AGENDAMENTOS DEPOIS DE AMANHÃ (CURRENT_DATE + 2) — 5 slots espaçados
  --     09:00 → 11:30 | pausa | 12:00 → 14:00 | almoço | 14:30 → 16:45 | pausa | 17:00 → 17:45
  -- ======================================================================
  ag := gen_random_uuid();
  INSERT INTO public.agendamentos
    (id, estabelecimento_id, cliente_id, data_hora, duracao_minutos, status, origem, valor_cobrado, observacoes) VALUES
    (ag, v_est, c_daniela,
     ((CURRENT_DATE+2)::timestamp + TIME '09:00') AT TIME ZONE 'America/Sao_Paulo',
     150, 'confirmado', 'portal', 200.00, 'Volume Russo');
  INSERT INTO public.agendamento_servicos (agendamento_id, servico_id, valor_cobrado) VALUES (ag, v_vr, 200.00);
  -- termina 11:30, pausa até 12:00

  ag := gen_random_uuid();
  INSERT INTO public.agendamentos
    (id, estabelecimento_id, cliente_id, data_hora, duracao_minutos, status, origem, valor_cobrado, observacoes) VALUES
    (ag, v_est, c_beatriz,
     ((CURRENT_DATE+2)::timestamp + TIME '12:00') AT TIME ZONE 'America/Sao_Paulo',
     120, 'confirmado', 'admin', 150.00, 'Fio a Fio Clássico');
  INSERT INTO public.agendamento_servicos (agendamento_id, servico_id, valor_cobrado) VALUES (ag, v_fio, 150.00);
  -- termina 14:00, almoço até 14:30

  ag := gen_random_uuid();
  INSERT INTO public.agendamentos
    (id, estabelecimento_id, cliente_id, data_hora, duracao_minutos, status, origem, valor_cobrado, observacoes) VALUES
    (ag, v_est, c_vanessa,
     ((CURRENT_DATE+2)::timestamp + TIME '14:30') AT TIME ZONE 'America/Sao_Paulo',
     135, 'confirmado', 'portal', 180.00, 'Volume Híbrido');
  INSERT INTO public.agendamento_servicos (agendamento_id, servico_id, valor_cobrado) VALUES (ag, v_vh, 180.00);
  -- termina 16:45, pausa até 17:00

  ag := gen_random_uuid();
  INSERT INTO public.agendamentos
    (id, estabelecimento_id, cliente_id, data_hora, duracao_minutos, status, origem, valor_cobrado, observacoes) VALUES
    (ag, v_est, c_marcia,
     ((CURRENT_DATE+2)::timestamp + TIME '11:30') AT TIME ZONE 'America/Sao_Paulo',
     60, 'confirmado', 'portal', 120.00, 'Lash Lifting completo');
  INSERT INTO public.agendamento_servicos (agendamento_id, servico_id, valor_cobrado) VALUES (ag, v_lft, 120.00);
  -- termina 12:30, almoço até 13:00

  ag := gen_random_uuid();
  INSERT INTO public.agendamentos
    (id, estabelecimento_id, cliente_id, data_hora, duracao_minutos, status, origem, valor_cobrado, observacoes) VALUES
    (ag, v_est, c_karina,
     ((CURRENT_DATE+2)::timestamp + TIME '17:15') AT TIME ZONE 'America/Sao_Paulo',
     45, 'pendente', 'portal', 50.00, 'Design de sobrancelha');
  INSERT INTO public.agendamento_servicos (agendamento_id, servico_id, valor_cobrado) VALUES (ag, v_sob, 50.00);
  -- termina 18:00 (fim do expediente)

  RAISE NOTICE 'Atendimentos e agendamentos inseridos com sucesso.';
END;
$$;

-- ======================================================================
-- 3. IMAGENS DOS SERVIÇOS
--    O seed bypassa o trigger handle_new_user_onboarding que normalmente
--    preenche imagem_url. Este UPDATE restaura as URLs padrão do Storage.
-- ======================================================================
DO $$
DECLARE
  v_est UUID;
  v_base TEXT := 'https://vgolovxcrsxnpcecvoyi.supabase.co/storage/v1/object/public/servicos-imagens/defaults/';
  v_count INT;
BEGIN
  SELECT id INTO v_est FROM public.estabelecimentos WHERE slug = 'mari-lash';

  UPDATE public.servicos SET imagem_url = v_base || 'Fio%20a%20Fio%20Classico.png'
    WHERE estabelecimento_id = v_est AND nome = 'Fio a Fio Clássico';
  UPDATE public.servicos SET imagem_url = v_base || 'Volume%20Russo.png'
    WHERE estabelecimento_id = v_est AND nome = 'Volume Russo';
  UPDATE public.servicos SET imagem_url = v_base || 'Volume%20Hibrido.png'
    WHERE estabelecimento_id = v_est AND nome = 'Volume Híbrido';
  UPDATE public.servicos SET imagem_url = v_base || 'Volume%20Brasileiro%20(Cilios%20Y).png'
    WHERE estabelecimento_id = v_est AND nome = 'Volume Brasileiro';
  UPDATE public.servicos SET imagem_url = v_base || 'Lash%20Lifting%20%20Completo.png'
    WHERE estabelecimento_id = v_est AND nome = 'Lash Lifting Completo';
  UPDATE public.servicos SET imagem_url = v_base || 'Spa%20de%20Cilios.png'
    WHERE estabelecimento_id = v_est AND nome = 'Spa de Cílios';
  UPDATE public.servicos SET imagem_url = v_base || 'Design%20de%20Sobrancelhas%20Simples.png'
    WHERE estabelecimento_id = v_est AND nome = 'Design de Sobrancelhas';
  UPDATE public.servicos SET imagem_url = v_base || 'Design%20com%20Henna.png'
    WHERE estabelecimento_id = v_est AND nome = 'Design com Henna';
  UPDATE public.servicos SET imagem_url = v_base || 'Manutencao%20de%20Extensao.png'
    WHERE estabelecimento_id = v_est AND nome = 'Manutenção de Extensão';
  UPDATE public.servicos SET imagem_url = v_base || 'Remocao%20de%20Extensao.png'
    WHERE estabelecimento_id = v_est AND nome = 'Remoção de Extensão';

  SELECT COUNT(*) INTO v_count
    FROM public.servicos
    WHERE estabelecimento_id = v_est AND imagem_url IS NOT NULL;

  RAISE NOTICE '% serviços do mari-lash agora têm imagem.', v_count;
END;
$$;
