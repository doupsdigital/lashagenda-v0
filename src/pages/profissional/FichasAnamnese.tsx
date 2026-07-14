import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Search, ClipboardPen, ChevronRight, AlertCircle } from 'lucide-react';
import type { Cliente } from '../../types';

type ClienteListItem = Pick<Cliente, 'id' | 'nome' | 'sobrenome' | 'whatsapp' | 'alergias' | 'medicamentos' | 'doencas_cronicas' | 'anamnese_lash'>;

function temFichaPreenchida(cliente: ClienteListItem): boolean {
  if (cliente.alergias || cliente.medicamentos || cliente.doencas_cronicas) return true;
  const lash = cliente.anamnese_lash;
  if (!lash) return false;
  return Object.values(lash).some((v) => {
    if (typeof v === 'boolean') return v === true;
    if (typeof v === 'number') return v !== null;
    return !!v;
  });
}

export default function FichasAnamnese() {
  const navigate = useNavigate();
  const { estabelecimentoId } = useAuth();
  const [clientes, setClientes] = useState<ClienteListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      if (!estabelecimentoId) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('clientes')
          .select('id, nome, sobrenome, whatsapp, alergias, medicamentos, doencas_cronicas, anamnese_lash')
          .eq('estabelecimento_id', estabelecimentoId)
          .order('nome', { ascending: true });

        if (error) throw error;
        setClientes(data || []);
      } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        setErrorMessage('Falha ao carregar a lista de clientes.');
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, [estabelecimentoId]);

  const clientesFiltrados = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return clientes;
    return clientes.filter((c) =>
      `${c.nome} ${c.sobrenome || ''}`.toLowerCase().includes(term)
    );
  }, [clientes, searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-title font-bold text-2xl text-text-primary flex items-center gap-2">
          <ClipboardPen className="w-6 h-6 text-rose-600" />
          Fichas de Anamnese
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Selecione uma cliente para ver ou preencher a ficha clínica e as preferências técnicas de lash.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <div id="ob-fichas-search" className="relative max-w-md">
        <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar cliente pelo nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 border border-border rounded-xl bg-white text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-text-muted"
        />
      </div>

      <div id="ob-fichas-lista" className="bg-white border border-border rounded-[14px] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-text-secondary">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mb-2" />
            <p className="text-sm">Carregando clientes...</p>
          </div>
        ) : clientesFiltrados.length === 0 ? (
          <div className="py-16 text-center text-text-secondary">
            <ClipboardPen className="w-10 h-10 text-rose-200 mx-auto mb-2" />
            <p className="font-title font-medium text-text-primary">
              {searchTerm ? 'Nenhuma cliente encontrada.' : 'Nenhuma cliente cadastrada ainda.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {clientesFiltrados.map((cliente) => {
              const initials = `${cliente.nome[0] || ''}${(cliente.sobrenome || '')[0] || ''}`.toUpperCase();
              const preenchida = temFichaPreenchida(cliente);
              return (
                <button
                  key={cliente.id}
                  onClick={() => navigate(`/fichas-anamnese/${cliente.id}`)}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-rose-50/40 transition-colors cursor-pointer text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-rose-100 border border-rose-200 text-rose-800 flex items-center justify-center font-title font-semibold text-sm flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">
                      {cliente.nome} {cliente.sobrenome}
                    </p>
                    <p className="text-xs text-text-secondary truncate">{cliente.whatsapp}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap
                    ${preenchida ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {preenchida ? 'Ficha preenchida' : 'Ficha pendente'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
