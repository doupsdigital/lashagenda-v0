import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface FirstStepsProgress {
  loading: boolean;
  negocioCompleto: boolean;
  temCliente: boolean;
  temAgendamentoAdmin: boolean;
  temAgendamentoPortal: boolean;
}

// "Serviços" não entra aqui: toda profissional já sai do cadastro com 2 serviços
// de exemplo prontos pra usar, então não existe sinal real de pendência pra esse
// passo — ele aparece sempre concluído no checklist "Primeiros Passos".
export function useFirstStepsProgress(): FirstStepsProgress {
  const { estabelecimentoId } = useAuth();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [negocioCompleto, setNegocioCompleto] = useState(false);
  const [temCliente, setTemCliente] = useState(false);
  const [temAgendamentoAdmin, setTemAgendamentoAdmin] = useState(false);
  const [temAgendamentoPortal, setTemAgendamentoPortal] = useState(false);

  useEffect(() => {
    if (!estabelecimentoId) return;

    let cancelled = false;

    const fetchProgress = async () => {
      setLoading(true);
      try {
        const [negocioRes, clientesRes, agendAdminRes, agendPortalRes] = await Promise.all([
          supabase
            .from('configuracao_negocio')
            .select('descricao, instagram, endereco')
            .eq('estabelecimento_id', estabelecimentoId)
            .maybeSingle(),
          supabase
            .from('clientes')
            .select('id', { count: 'exact', head: true })
            .eq('estabelecimento_id', estabelecimentoId),
          supabase
            .from('agendamentos')
            .select('id', { count: 'exact', head: true })
            .eq('estabelecimento_id', estabelecimentoId)
            .eq('origem', 'admin'),
          supabase
            .from('agendamentos')
            .select('id', { count: 'exact', head: true })
            .eq('estabelecimento_id', estabelecimentoId)
            .eq('origem', 'portal'),
        ]);

        if (cancelled) return;

        const negocio = negocioRes.data;
        setNegocioCompleto(!!(negocio?.descricao || negocio?.instagram || negocio?.endereco));
        setTemCliente((clientesRes.count ?? 0) > 0);
        setTemAgendamentoAdmin((agendAdminRes.count ?? 0) > 0);
        setTemAgendamentoPortal((agendPortalRes.count ?? 0) > 0);
      } catch (err) {
        console.error('Erro ao carregar progresso dos primeiros passos:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProgress();

    return () => { cancelled = true; };
    // Recarrega a cada troca de rota, pra refletir uma ação feita em outra tela
    // (ex: salvar dados do negócio) sem precisar recarregar a página.
  }, [estabelecimentoId, location.pathname]);

  return { loading, negocioCompleto, temCliente, temAgendamentoAdmin, temAgendamentoPortal };
}
