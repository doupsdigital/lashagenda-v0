import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOnboarding } from '../../hooks/useOnboarding';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  AlertCircle,
  Sparkles,
  Clock,
  Coins,
  X,
  ImagePlus,
  Tag,
  ChevronDown,
  WandSparkles,
} from 'lucide-react';
import type { Servico, VariacaoServico } from '../../types';
import { registrarLog } from '../../utils/log';
import ConfirmModal from '../../components/common/ConfirmModal';
import { compressImage } from '../../utils/imageCompression';

interface ServicoWithRelations extends Servico {
  variacoes_servico?: VariacaoServico[];
  _count_atendimentos?: number;
  _count_agendamentos?: number;
}

export default function Servicos() {
  const { estabelecimentoId, profile } = useAuth();
  const { autoStart } = useOnboarding('servicos');
  useEffect(() => { if (profile) autoStart(); }, [profile]); // eslint-disable-line react-hooks/exhaustive-deps

  const formRef = useRef<HTMLDivElement>(null);

  const [servicos, setServicos] = useState<ServicoWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Selected item for editing (null = modo criação)
  const [editingServico, setEditingServico] = useState<ServicoWithRelations | null>(null);

  // Form states - Servico
  const [servicoNome, setServicoNome] = useState('');
  const [servicoDescricao, setServicoDescricao] = useState('');
  const [servicoDuracao, setServicoDuracao] = useState<number | ''>(30);
  const [servicoValor, setServicoValor] = useState<number | ''>(100.0);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // Imagem do serviço
  const [servicoImagemFile, setServicoImagemFile] = useState<File | null>(null);
  const [servicoImagemPreviewUrl, setServicoImagemPreviewUrl] = useState<string | null>(null);
  const [removerImagem, setRemoverImagem] = useState(false);
  const [uploadingImagem, setUploadingImagem] = useState(false);
  const imagemFileInputRef = useRef<HTMLInputElement>(null);

  // Tooltip / Notification state for delete locks
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Inline error no form
  const [servicoError, setServicoError] = useState<string | null>(null);

  // Confirm Modal States
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    title: string;
    description: string;
    warningText?: string;
    onConfirm: () => void;
  } | null>(null);

  const openConfirmModal = (config: typeof confirmModalConfig) => {
    setConfirmModalConfig(config);
    setConfirmModalOpen(true);
  };

  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
  }>({
    isOpen: false,
    title: '',
    description: ''
  });

  // "Limpar todos os serviços" (base de exemplo) state
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [clearAllConfirmText, setClearAllConfirmText] = useState('');
  const [isClearingAll, setIsClearingAll] = useState(false);

  // Fetch all services (com variações legadas, se houver)
  const fetchData = async () => {
    if (!estabelecimentoId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('servicos')
        .select('*, variacoes_servico(*)')
        .eq('estabelecimento_id', estabelecimentoId)
        .order('nome', { ascending: true });

      if (error) throw error;
      setServicos(data || []);
    } catch (err) {
      console.error('Erro ao buscar serviços:', err);
      showTemporaryError('Falha ao carregar dados do banco.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (estabelecimentoId) {
      fetchData();
    }
  }, [estabelecimentoId]);

  const showTemporaryError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  // FORM ACTIONS
  const resetForm = () => {
    setEditingServico(null);
    setServicoError(null);
    setServicoNome('');
    setServicoDescricao('');
    setServicoDuracao(30);
    setServicoValor(100.0);
    setServicoImagemFile(null);
    setServicoImagemPreviewUrl(null);
    setRemoverImagem(false);
    setShowOptionalFields(false);
    if (imagemFileInputRef.current) imagemFileInputRef.current.value = '';
  };

  const handleEditServico = (serv: ServicoWithRelations) => {
    setServicoError(null);
    setServicoImagemFile(null);
    setRemoverImagem(false);
    setEditingServico(serv);
    setServicoNome(serv.nome);
    setServicoDescricao(serv.descricao ?? '');
    setServicoDuracao(serv.duracao_minutos);
    setServicoValor(Number(serv.valor));
    setServicoImagemPreviewUrl(serv.imagem_url ?? null);
    setShowOptionalFields(!!(serv.descricao || serv.imagem_url));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleImagemSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setServicoImagemFile(compressed);
      setServicoImagemPreviewUrl(URL.createObjectURL(compressed));
      setRemoverImagem(false);
    } catch {
      showTemporaryError('Não foi possível processar a imagem.');
    }
  };

  const handleRemoverImagem = () => {
    setServicoImagemFile(null);
    setServicoImagemPreviewUrl(null);
    setRemoverImagem(true);
    if (imagemFileInputRef.current) imagemFileInputRef.current.value = '';
  };

  const handleSaveServico = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!servicoNome.trim()) return;

    const normalizar = (s: string) =>
      s.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const nomeNorm = normalizar(servicoNome);
    const duplicata = servicos.find(
      s => normalizar(s.nome) === nomeNorm && s.id !== editingServico?.id
    );
    if (duplicata) {
      setServicoError(`Já existe um serviço com o nome "${duplicata.nome}".`);
      return;
    }
    setServicoError(null);

    try {
      let servicoId = '';
      const duracaoFinal = servicoDuracao === '' ? 0 : servicoDuracao;
      const valorFinal = servicoValor === '' ? 0 : servicoValor;

      // Upload imagem se houver arquivo novo
      let imagemUrlFinal: string | null | undefined = undefined;
      if (servicoImagemFile && estabelecimentoId) {
        setUploadingImagem(true);
        const timestamp = Date.now();
        const filePath = `${estabelecimentoId}/servico-${timestamp}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('servicos-imagens')
          .upload(filePath, servicoImagemFile, { cacheControl: '3600', upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('servicos-imagens').getPublicUrl(filePath);
        imagemUrlFinal = urlData.publicUrl;
      } else if (removerImagem) {
        imagemUrlFinal = null;
      }

      if (editingServico) {
        const updatePayload: Record<string, unknown> = {
          nome: servicoNome,
          descricao: servicoDescricao.trim() || null,
          duracao_minutos: duracaoFinal,
          valor: valorFinal,
        };
        if (imagemUrlFinal !== undefined) updatePayload.imagem_url = imagemUrlFinal;

        const { error } = await supabase
          .from('servicos')
          .update(updatePayload)
          .eq('id', editingServico.id);

        if (error) throw error;
        servicoId = editingServico.id;
        await registrarLog('editou', 'servico', servicoId, `Editou serviço "${servicoNome}"`);
      } else {
        const { data, error } = await supabase
          .from('servicos')
          .insert({
            nome: servicoNome,
            descricao: servicoDescricao.trim() || null,
            duracao_minutos: duracaoFinal,
            valor: valorFinal,
            estabelecimento_id: estabelecimentoId,
            ...(imagemUrlFinal !== undefined ? { imagem_url: imagemUrlFinal } : {}),
          })
          .select()
          .single();

        if (error) throw error;
        if (!data) throw new Error('Falha ao criar serviço');
        servicoId = data.id;
        await registrarLog('criou', 'servico', servicoId, `Criou serviço "${servicoNome}"`);
      }

      const wasEditing = !!editingServico;
      resetForm();
      fetchData();
      setSuccessModal({
        isOpen: true,
        title: wasEditing ? 'Serviço atualizado!' : 'Serviço criado!',
        description: wasEditing
          ? `O serviço "${servicoNome}" foi atualizado com sucesso.`
          : `O serviço "${servicoNome}" foi criado com sucesso.`
      });
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : '';
      if (msg.toLowerCase().includes('storage') || msg.toLowerCase().includes('upload')) {
        showTemporaryError('Falha ao enviar imagem. Tente novamente.');
      } else {
        showTemporaryError('Falha ao salvar serviço.');
      }
    } finally {
      setUploadingImagem(false);
    }
  };

  const handleDeleteServico = async (serv: ServicoWithRelations) => {
    // Regra: não pode excluir serviço com atendimentos registrados
    try {
      const { count: atendimentosCount, error: atendimentosError } = await supabase
        .from('atendimentos')
        .select('*', { count: 'exact', head: true })
        .eq('servico_id', serv.id);

      if (atendimentosError) throw atendimentosError;

      const { count: agendamentoServicosCount, error: agendamentoServicosError } = await supabase
        .from('agendamento_servicos')
        .select('*', { count: 'exact', head: true })
        .eq('servico_id', serv.id);

      if (agendamentoServicosError) throw agendamentoServicosError;

      const totalVinculos = (atendimentosCount || 0) + (agendamentoServicosCount || 0);

      if (totalVinculos > 0) {
        showTemporaryError(`Não é permitido excluir o serviço "${serv.nome}" pois existem ${totalVinculos} atendimentos/agendamentos vinculados.`);
        return;
      }

      openConfirmModal({
        title: 'Excluir Serviço?',
        description: `Tem certeza que deseja excluir o serviço "${serv.nome}"?`,
        warningText: 'Esta ação é permanente e não pode ser desfeita.',
        onConfirm: async () => {
          try {
            const { error: delError } = await supabase
              .from('servicos')
              .delete()
              .eq('id', serv.id);

            if (delError) throw delError;

            await registrarLog('excluiu', 'servico', serv.id, `Excluiu serviço "${serv.nome}"`);
            if (editingServico?.id === serv.id) resetForm();
            fetchData();
          } catch (err) {
            console.error(err);
            showTemporaryError('Falha ao excluir o serviço.');
          }
        }
      });
    } catch (err) {
      console.error(err);
      showTemporaryError('Falha ao verificar atendimentos vinculados ou excluir.');
    }
  };

  // Exclui em massa apenas os serviços do estabelecimento logado (base de exemplo).
  // Nunca apaga imagens do Storage: os serviços de exemplo usam imagens compartilhadas
  // (bucket "defaults") reutilizadas por todas as profissionais.
  const handleClearAllServicos = async () => {
    if (!estabelecimentoId) return;
    if (servicos.length === 0) {
      setIsClearAllModalOpen(false);
      return;
    }

    setIsClearingAll(true);
    try {
      const serviceIds = servicos.map(s => s.id);

      const { data: atendimentosData, error: atendimentosError } = await supabase
        .from('atendimentos')
        .select('servico_id')
        .in('servico_id', serviceIds);
      if (atendimentosError) throw atendimentosError;

      const { data: agendamentoServicosData, error: agendamentoServicosError } = await supabase
        .from('agendamento_servicos')
        .select('servico_id')
        .in('servico_id', serviceIds);
      if (agendamentoServicosError) throw agendamentoServicosError;

      const linkedIds = new Set([
        ...(atendimentosData || []).map(r => r.servico_id),
        ...(agendamentoServicosData || []).map(r => r.servico_id),
      ]);

      const deletableIds = serviceIds.filter(id => !linkedIds.has(id));
      const skippedCount = serviceIds.length - deletableIds.length;

      if (deletableIds.length > 0) {
        const { error: delError } = await supabase
          .from('servicos')
          .delete()
          .in('id', deletableIds)
          .eq('estabelecimento_id', estabelecimentoId);
        if (delError) throw delError;
      }

      await registrarLog(
        'excluiu',
        'servico',
        estabelecimentoId,
        `Limpou base de serviços de exemplo (${deletableIds.length} excluídos, ${skippedCount} pulados)`
      );

      setIsClearAllModalOpen(false);
      setClearAllConfirmText('');
      resetForm();
      await fetchData();
      setSuccessModal({
        isOpen: true,
        title: 'Serviços removidos!',
        description: skippedCount > 0
          ? `${deletableIds.length} serviço(s) de exemplo excluído(s). ${skippedCount} não puderam ser excluídos por terem agendamentos/atendimentos vinculados.`
          : `${deletableIds.length} serviço(s) de exemplo excluído(s) com sucesso. Agora você já pode cadastrar os seus.`,
      });
    } catch (err) {
      console.error(err);
      showTemporaryError('Falha ao limpar os serviços de exemplo.');
    } finally {
      setIsClearingAll(false);
    }
  };

  // FILTER LOGIC
  const filteredServicos = servicos.filter(serv =>
    serv.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Só mostra o botão "Limpar todos os serviços" enquanto a base ainda parecer
  // ser 100% a base de exemplo (nenhum serviço editado, adicionado ou com imagem própria).
  const isDefaultServiceBase =
    servicos.length > 0 &&
    servicos.every(s => !!s.imagem_url && s.imagem_url.includes('/defaults/'));

  return (
    <div className="space-y-6">
      {/* Floating Toast for Errors */}
      {errorMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-4 pointer-events-none">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg animate-fade-in pointer-events-auto">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* FORM: Novo / Editar Serviço — sempre visível, sem modal */}
      <div id="ob-servico-form" ref={formRef} className="bg-white border border-border rounded-[14px] p-6 shadow-sm">
        <h2 className="font-title font-semibold text-xl text-text-primary mb-5 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-600" />
          {editingServico ? 'Editar Serviço' : 'Novo Serviço'}
        </h2>

        <form onSubmit={handleSaveServico} className="space-y-4">
          {/* Nome */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Nome do Serviço <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Volume Russo"
              value={servicoNome}
              onChange={(e) => setServicoNome(e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-xl bg-bg text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-text-muted"
            />
          </div>

          {/* Preço & Duração */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Preço (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                placeholder="0.00"
                value={servicoValor}
                onChange={(e) => setServicoValor(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 border border-border rounded-xl bg-bg text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-text-muted"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Duração (min) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={servicoDuracao}
                onChange={(e) => setServicoDuracao(e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2.5 border border-border rounded-xl bg-bg text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
            </div>
          </div>

          {/* Toggle: dados opcionais */}
          <button
            type="button"
            onClick={() => setShowOptionalFields(prev => !prev)}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showOptionalFields ? 'rotate-180' : ''}`} />
            {showOptionalFields ? 'Ocultar dados opcionais' : 'Adicionar mais detalhes (opcional)'}
          </button>

          {showOptionalFields && (
            <div className="space-y-5 pt-1 animate-fade-in">
              {/* Descrição */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Descrição <span className="text-text-muted font-normal normal-case">(aparece no portal da cliente)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: Fio sintético aplicado cílio a cílio. Efeito natural e discreto para o dia a dia."
                  value={servicoDescricao}
                  onChange={(e) => setServicoDescricao(e.target.value)}
                  maxLength={300}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-bg text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-text-muted resize-none"
                />
                <p className="text-[11px] text-text-muted text-right">{servicoDescricao.length}/300</p>
              </div>

              {/* Foto do serviço */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Foto do Serviço <span className="text-text-muted font-normal normal-case">(opcional)</span>
                </label>
                <input
                  ref={imagemFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagemSelect}
                />
                {servicoImagemPreviewUrl ? (
                  <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-border group">
                    <img src={servicoImagemPreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => imagemFileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-white text-text-primary rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Trocar foto
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoverImagem}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => imagemFileInputRef.current?.click()}
                    className="w-full max-w-sm aspect-video rounded-xl border-2 border-dashed border-border hover:border-rose-300 hover:bg-rose-50/30 transition-colors flex flex-col items-center justify-center gap-2 text-text-muted cursor-pointer"
                  >
                    <ImagePlus className="w-7 h-7" />
                    <span className="text-xs font-medium">Clique para adicionar uma foto</span>
                    <span className="text-[10px]">A imagem será comprimida automaticamente</span>
                  </button>
                )}
              </div>

              {/* Preview: como vai aparecer no portal */}
              <div className="space-y-3 bg-bg/40 border border-border rounded-xl p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-0.5">Como vai aparecer no portal</p>
                  <p className="text-[10px] text-text-muted">Atualiza em tempo real</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card preview — com imagem */}
                  <div>
                    <p className="text-[10px] font-medium text-text-muted mb-2 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                      Com foto
                    </p>
                    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
                      {servicoImagemPreviewUrl ? (
                        <img src={servicoImagemPreviewUrl} alt="Preview" className="w-full aspect-video object-cover" />
                      ) : (
                        <div className="w-full aspect-video bg-rose-50 flex items-center justify-center">
                          <ImagePlus className="w-8 h-8 text-rose-200" />
                        </div>
                      )}
                      <div className="p-3 space-y-2">
                        <p className="font-title font-semibold text-sm text-text-primary leading-snug">
                          {servicoNome || 'Nome do Serviço'}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-text-secondary">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-rose-400" />
                            {servicoDuracao || 0} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3 text-amber-500" />
                            R$ {Number(servicoValor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="w-full py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold text-center">
                          Agendar
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card preview — sem imagem */}
                  <div>
                    <p className="text-[10px] font-medium text-text-muted mb-2 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                      Sem foto
                    </p>
                    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm p-3 space-y-2">
                      <p className="font-title font-semibold text-sm text-text-primary leading-snug">
                        {servicoNome || 'Nome do Serviço'}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-rose-400" />
                          {servicoDuracao || 0} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3 text-amber-500" />
                          R$ {Number(servicoValor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="w-full py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold text-center">
                        Agendar
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-text-muted leading-relaxed pt-2 border-t border-border">
                  A foto é opcional. Serviços sem foto exibem o card no formato simples, como mostrado acima.
                </p>
              </div>
            </div>
          )}

          {servicoError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <p className="text-xs font-medium">{servicoError}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            {editingServico && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-3 border border-border rounded-xl text-sm font-medium text-text-secondary hover:bg-bg transition-colors cursor-pointer"
              >
                Cancelar edição
              </button>
            )}
            <button
              type="submit"
              disabled={uploadingImagem}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-rose-600 hover:bg-rose-800 disabled:bg-rose-400 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {uploadingImagem ? 'Enviando imagem...' : editingServico ? 'Salvar Alterações' : 'Adicionar Serviço'}
            </button>
          </div>
        </form>
      </div>

      {/* Aviso: base de serviços de exemplo */}
      {isDefaultServiceBase && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-amber-50 border border-amber-200 rounded-[14px] p-4 sm:p-5">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4.5 h-4.5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900">Esses são serviços de exemplo</p>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                Veja como funciona a lista de serviços. Quando quiser, apague todos de uma vez e cadastre os seus.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsClearAllModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-sm w-full sm:w-auto flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            Limpar todos os serviços
          </button>
        </div>
      )}

      {/* LISTA: Seus Serviços */}
      <div className="bg-white border border-border rounded-[14px] shadow-sm">
        <div className="px-6 py-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-title font-semibold text-lg text-text-primary flex items-center gap-2">
            Seus Serviços
            <span className="text-xs font-sans font-medium px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
              {servicos.length} cadastrado{servicos.length === 1 ? '' : 's'}
            </span>
          </h3>

          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted" />
            <input
              type="text"
              placeholder="Buscar serviço por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-bg text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-text-muted"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mb-2"></div>
            <p className="text-sm">Carregando serviços...</p>
          </div>
        ) : filteredServicos.length === 0 ? (
          <div className="p-12 text-center text-text-secondary">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-3">
              <WandSparkles className="w-7 h-7 text-rose-300" />
            </div>
            {servicos.length === 0 ? (
              <>
                <p className="font-title font-medium text-lg text-text-primary">Nenhum serviço ainda</p>
                <p className="text-sm text-text-muted mt-1">Cadastre seu primeiro serviço acima para as clientes começarem a agendar.</p>
              </>
            ) : (
              <>
                <p className="font-title font-medium text-lg text-text-primary">Nenhum serviço encontrado</p>
                <p className="text-sm text-text-muted mt-1">Experimente alterar os filtros de busca.</p>
              </>
            )}
          </div>
        ) : (
          <div id="ob-servicos-lista" className="divide-y divide-border rounded-b-[14px] overflow-hidden">
            {filteredServicos.map(serv => (
              <div
                key={serv.id}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 transition-colors duration-150 hover:bg-bg/30"
              >
                {/* Thumbnail */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0">
                  {serv.imagem_url ? (
                    <img src={serv.imagem_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <WandSparkles className="w-5 h-5 text-rose-300" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary text-sm sm:text-base truncate">{serv.nome}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-text-muted" />
                      {serv.duracao_minutos} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-text-muted" />
                      R$ {Number(serv.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    {serv.variacoes_servico && serv.variacoes_servico.length > 0 && (
                      <span className="bg-gold-light/40 text-gold text-[10px] font-medium px-2 py-0.5 rounded border border-gold-light/60">
                        {serv.variacoes_servico.length} variações
                      </span>
                    )}
                  </div>

                  {/* Variações legadas (não é mais possível criar novas por aqui) */}
                  {serv.variacoes_servico && serv.variacoes_servico.length > 0 && (
                    <div className="text-[11px] text-text-muted flex flex-wrap gap-x-2 gap-y-1 mt-1.5">
                      <span className="font-medium">Opções:</span>
                      {serv.variacoes_servico.map((v, i) => (
                        <span key={v.id}>
                          {v.nome} (R$ {Number(v.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                          {i < (serv.variacoes_servico?.length || 0) - 1 ? ' • ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleEditServico(serv)}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-text-secondary hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Editar Serviço"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteServico(serv)}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Excluir Serviço"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmModalConfig?.onConfirm || (() => {})}
        title={confirmModalConfig?.title || ''}
        description={confirmModalConfig?.description || ''}
        warningText={confirmModalConfig?.warningText}
        type="danger"
      />

      <ConfirmModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
        onConfirm={() => setSuccessModal({ ...successModal, isOpen: false })}
        title={successModal.title}
        description={successModal.description}
        type="success"
        confirmText="OK"
        singleAction
      />

      {/* Modal reforçado: limpar todos os serviços de exemplo */}
      {isClearAllModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[300] flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div
            className="bg-white rounded-[14px] border border-border shadow-xl w-full max-w-sm overflow-hidden p-6 flex flex-col items-center text-center animate-slide-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setIsClearAllModalOpen(false); setClearAllConfirmText(''); }}
              className="absolute top-4 right-4 text-text-secondary hover:text-rose-600 transition-colors p-1 rounded-full hover:bg-bg"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4">
              <Trash2 className="w-5 h-5" />
            </div>

            <h3 className="font-title font-semibold text-lg text-text-primary mb-2">
              Limpar todos os serviços?
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              Isso vai excluir os {servicos.length} serviço(s) de exemplo cadastrados no seu estúdio. Serviços com agendamentos ou atendimentos vinculados serão mantidos automaticamente.
            </p>

            <div className="w-full flex items-center gap-2 p-3 bg-amber-50/50 border border-amber-100 rounded-lg text-left text-[11px] text-amber-800 font-semibold mb-4">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Esta ação é permanente e não pode ser desfeita.</span>
            </div>

            <div className="w-full text-left mb-5">
              <label className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">
                Digite EXCLUIR para confirmar
              </label>
              <input
                type="text"
                value={clearAllConfirmText}
                onChange={(e) => setClearAllConfirmText(e.target.value)}
                placeholder="EXCLUIR"
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                type="button"
                onClick={() => { setIsClearAllModalOpen(false); setClearAllConfirmText(''); }}
                className="px-4 py-2 border border-border hover:bg-bg text-text-secondary rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleClearAllServicos}
                disabled={clearAllConfirmText.trim().toUpperCase() !== 'EXCLUIR' || isClearingAll}
                className="px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors w-full bg-rose-600 hover:bg-rose-800 disabled:bg-rose-200 disabled:cursor-not-allowed text-white"
              >
                {isClearingAll ? 'Excluindo...' : 'Excluir tudo'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
