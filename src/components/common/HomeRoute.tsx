import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LandingPage_OfertaUm from '../../pages/LandingPage_OfertaUm';

// Detecta resquício de sessão do Supabase salva no navegador (chave padrão
// "sb-<project-ref>-auth-token"), sem depender do AuthContext já ter
// confirmado a sessão. Usado como rede de segurança: se existe um token
// salvo mas o AuthContext concluiu "sem sessão" (ex: falha pontual de rede
// bem na hora de abrir o app), não arriscamos mostrar a landing page pra
// quem já é cliente — mandamos pro login em vez disso.
function hasStoredSupabaseSession(): boolean {
  try {
    return Object.keys(localStorage).some(
      (key) => key.startsWith('sb-') && key.endsWith('-auth-token')
    );
  } catch {
    return false;
  }
}

// Rota raiz ("/"): pública por padrão (landing page de marketing), mas
// redireciona automaticamente quem já tem uma sessão ATIVA — cobre o caso
// do PWA instalado (start_url "/") e de quem digita o link principal de
// memória.
export default function HomeRoute() {
  const { user, isProfissional, estabelecimentoSlug, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <img src="/icon-192.png" alt="Lash Hub" className="w-16 h-16 rounded-2xl shadow-md" />
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    if (isProfissional) {
      return <Navigate to="/meu-estudio" replace />;
    }
    if (estabelecimentoSlug) {
      return <Navigate to={`/portal/${estabelecimentoSlug}/catalogo`} replace />;
    }
  } else if (hasStoredSupabaseSession()) {
    return <Navigate to="/login" replace />;
  }

  return <LandingPage_OfertaUm />;
}
