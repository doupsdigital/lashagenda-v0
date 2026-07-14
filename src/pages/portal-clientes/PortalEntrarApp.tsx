import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

// Rota de entrada do app instalado (PWA) na tela inicial da cliente.
//
// O app instalado no iOS roda numa instância de armazenamento local isolada
// do Safari, então a sessão anônima criada durante o agendamento como
// convidada não é herdada por ele — ele abre "zerado". Para resolver isso, o
// manifest.json usado na instalação (ver Edge Function portal-manifest)
// aponta start_url para cá, com o token permanente da cliente embutido na
// URL. Esta tela valida esse token e recria a sessão, sem pedir nada dela.
export default function PortalEntrarApp() {
  const { slug, token } = useParams<{ slug: string; token: string }>();
  const navigate = useNavigate();
  const { user, isCliente, loading: authLoading } = useAuth();
  const started = useRef(false);

  useEffect(() => {
    if (authLoading || started.current) return;
    started.current = true;

    // Já existe sessão de cliente válida neste app (reaberturas seguintes) —
    // não precisa recriar nada.
    if (user && isCliente) {
      navigate(`/portal/${slug}/catalogo`, { replace: true });
      return;
    }

    async function entrar() {
      if (!slug || !token) {
        navigate(`/portal/${slug}/agendar`, { replace: true });
        return;
      }

      const { data, error } = await supabase.rpc('get_cliente_by_portal_token', {
        p_slug: slug,
        p_token: token,
      });

      const cliente = Array.isArray(data) ? data[0] : data;

      if (error || !cliente) {
        navigate(`/portal/${slug}/agendar`, { replace: true });
        return;
      }

      const { error: authError } = await supabase.auth.signInAnonymously({
        options: {
          data: {
            role: 'cliente',
            nome: cliente.nome,
            cliente_id: cliente.cliente_id,
            estabelecimento_id: cliente.estabelecimento_id,
          },
        },
      });

      if (authError) {
        navigate(`/portal/${slug}/agendar`, { replace: true });
        return;
      }

      navigate(`/portal/${slug}/catalogo`, { replace: true });
    }

    entrar();
  }, [authLoading, user, isCliente, slug, token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 animate-pulse">
      <img src="/icon-192.png" alt="Lash Agenda" className="w-16 h-16 rounded-2xl shadow-md" />
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-bounce"></div>
      </div>
    </div>
  );
}
