import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import {
  ArrowLeft,
  Eye,
  Sparkles,
  Clock,
  Moon,
  HeartPulse,
  ShieldAlert,
  Save,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import type { Cliente } from '../../types';
import { registrarLog } from '../../utils/log';

export default function FichaAnamneseDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { estabelecimentoId } = useAuth();

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Alergias & Detalhes Clínicos (colunas diretas da tabela clientes)
  const [alergias, setAlergias] = useState('');
  const [medicamentos, setMedicamentos] = useState('');
  const [doencasCronicas, setDoencasCronicas] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [gestante, setGestante] = useState(false);

  // Histórico & Cuidados Oculares
  const [fezExtensaoAntes, setFezExtensaoAntes] = useState(false);
  const [reacaoAlergicaAnterior, setReacaoAlergicaAnterior] = useState(false);
  const [usaLentesContato, setUsaLentesContato] = useState(false);
  const [olhosSensiveis, setOlhosSensiveis] = useState(false);
  const [doencasOculares, setDoencasOculares] = useState(false);
  const [habitoEsfregarOlhos, setHabitoEsfregarOlhos] = useState(false);

  // Condições Clínicas & Fatores Hormonais
  const [problemasTireoide, setProblemasTireoide] = useState(false);
  const [quimioterapiaRecente, setQuimioterapiaRecente] = useState(false);
  const [quedaCabeloAlopecia, setQuedaCabeloAlopecia] = useState(false);

  // Perfil do Olho & Cílios Naturais
  const [formatoOlho, setFormatoOlho] = useState<NonNullable<Cliente['anamnese_lash']>['formato_olho']>('');
  const [espacamentoOlhos, setEspacamentoOlhos] = useState<NonNullable<Cliente['anamnese_lash']>['espacamento_olhos']>('');
  const [densidadeCiliosNaturais, setDensidadeCiliosNaturais] = useState<NonNullable<Cliente['anamnese_lash']>['densidade_cilios_naturais']>('');
  const [comprimentoCiliosNaturais, setComprimentoCiliosNaturais] = useState<NonNullable<Cliente['anamnese_lash']>['comprimento_cilios_naturais']>('');
  const [curvaturaNatural, setCurvaturaNatural] = useState<NonNullable<Cliente['anamnese_lash']>['curvatura_natural']>('');

  // Preferências Técnicas
  const [tecnicaPreferida, setTecnicaPreferida] = useState<NonNullable<Cliente['anamnese_lash']>['tecnica_preferida']>('');
  const [mappingPreferido, setMappingPreferido] = useState<NonNullable<Cliente['anamnese_lash']>['mapping_preferido']>('');
  const [curvaturaPreferida, setCurvaturaPreferida] = useState<NonNullable<Cliente['anamnese_lash']>['curvatura_preferida']>('');
  const [espessuraPreferida, setEspessuraPreferida] = useState<NonNullable<Cliente['anamnese_lash']>['espessura_preferida']>('');
  const [comprimentoPredominante, setComprimentoPredominante] = useState('');
  const [efeitoDesejado, setEfeitoDesejado] = useState<NonNullable<Cliente['anamnese_lash']>['efeito_desejado']>('');

  // Retenção & Cuidados
  const [posicaoDormir, setPosicaoDormir] = useState<'lado' | 'costas' | 'de_brucos' | 'variada' | ''>('');
  const [maquiagemProvaAgua, setMaquiagemProvaAgua] = useState(false);
  const [exposicaoCalorAgua, setExposicaoCalorAgua] = useState(false);
  const [tempoMedioRetencaoDias, setTempoMedioRetencaoDias] = useState<string>('');
  const [frequenciaManutencaoDias, setFrequenciaManutencaoDias] = useState<string>('');
  const [tipoAdesivo, setTipoAdesivo] = useState<NonNullable<Cliente['anamnese_lash']>['tipo_adesivo']>('');
  const [observacoesRetencao, setObservacoesRetencao] = useState('');

  const showTemporaryError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  useEffect(() => {
    const fetchCliente = async () => {
      if (!id || !estabelecimentoId) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('clientes')
          .select('*')
          .eq('id', id)
          .eq('estabelecimento_id', estabelecimentoId)
          .single();

        if (error) throw error;
        setCliente(data);

        setAlergias(data.alergias || '');
        setMedicamentos(data.medicamentos || '');
        setDoencasCronicas(data.doencas_cronicas || '');
        setObservacoes(data.observacoes || '');
        setGestante(!!data.gestante);

        const lash = data.anamnese_lash || {};
        setFezExtensaoAntes(!!lash.fez_extensao_antes);
        setReacaoAlergicaAnterior(!!lash.reacao_alergica_anterior);
        setUsaLentesContato(!!lash.usa_lentes_contato);
        setOlhosSensiveis(!!lash.olhos_sensiveis);
        setDoencasOculares(!!lash.doencas_oculares);
        setHabitoEsfregarOlhos(!!lash.habito_esfregar_olhos);
        setProblemasTireoide(!!lash.problemas_tireoide);
        setQuimioterapiaRecente(!!lash.quimioterapia_recente);
        setQuedaCabeloAlopecia(!!lash.queda_cabelo_alopecia);

        setFormatoOlho(lash.formato_olho || '');
        setEspacamentoOlhos(lash.espacamento_olhos || '');
        setDensidadeCiliosNaturais(lash.densidade_cilios_naturais || '');
        setComprimentoCiliosNaturais(lash.comprimento_cilios_naturais || '');
        setCurvaturaNatural(lash.curvatura_natural || '');

        setTecnicaPreferida(lash.tecnica_preferida || '');
        setMappingPreferido(lash.mapping_preferido || '');
        setCurvaturaPreferida(lash.curvatura_preferida || '');
        setEspessuraPreferida(lash.espessura_preferida || '');
        setComprimentoPredominante(lash.comprimento_predominante || '');
        setEfeitoDesejado(lash.efeito_desejado || '');

        setPosicaoDormir(lash.posicao_dormir || '');
        setMaquiagemProvaAgua(!!lash.maquiagem_prova_agua);
        setExposicaoCalorAgua(!!lash.exposicao_calor_agua);
        setTempoMedioRetencaoDias(lash.tempo_medio_retencao_dias != null ? String(lash.tempo_medio_retencao_dias) : '');
        setFrequenciaManutencaoDias(lash.frequencia_manutencao_dias != null ? String(lash.frequencia_manutencao_dias) : '');
        setTipoAdesivo(lash.tipo_adesivo || '');
        setObservacoesRetencao(lash.observacoes_retencao || '');
      } catch (err) {
        console.error('Erro ao buscar ficha da cliente:', err);
        showTemporaryError('Falha ao carregar a ficha de anamnese.');
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, [id, estabelecimentoId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('clientes')
        .update({
          alergias: alergias.trim() || null,
          medicamentos: medicamentos.trim() || null,
          doencas_cronicas: doencasCronicas.trim() || null,
          observacoes: observacoes.trim() || null,
          gestante,
          anamnese_lash: {
            fez_extensao_antes: fezExtensaoAntes,
            reacao_alergica_anterior: reacaoAlergicaAnterior,
            usa_lentes_contato: usaLentesContato,
            olhos_sensiveis: olhosSensiveis,
            doencas_oculares: doencasOculares,
            habito_esfregar_olhos: habitoEsfregarOlhos,
            problemas_tireoide: problemasTireoide,
            quimioterapia_recente: quimioterapiaRecente,
            queda_cabelo_alopecia: quedaCabeloAlopecia,

            formato_olho: formatoOlho,
            espacamento_olhos: espacamentoOlhos,
            densidade_cilios_naturais: densidadeCiliosNaturais,
            comprimento_cilios_naturais: comprimentoCiliosNaturais,
            curvatura_natural: curvaturaNatural,

            tecnica_preferida: tecnicaPreferida,
            mapping_preferido: mappingPreferido,
            curvatura_preferida: curvaturaPreferida,
            espessura_preferida: espessuraPreferida,
            comprimento_predominante: comprimentoPredominante.trim() || null,
            efeito_desejado: efeitoDesejado,

            posicao_dormir: posicaoDormir,
            maquiagem_prova_agua: maquiagemProvaAgua,
            exposicao_calor_agua: exposicaoCalorAgua,
            tempo_medio_retencao_dias: tempoMedioRetencaoDias ? Number(tempoMedioRetencaoDias) : null,
            frequencia_manutencao_dias: frequenciaManutencaoDias ? Number(frequenciaManutencaoDias) : null,
            tipo_adesivo: tipoAdesivo,
            observacoes_retencao: observacoesRetencao.trim() || null,
          },
        })
        .eq('id', cliente.id);

      if (error) throw error;

      await registrarLog('editou', 'cliente', cliente.id, `Atualizou a ficha de anamnese de "${cliente.nome} ${cliente.sobrenome}"`);
      setSuccessMessage('Ficha de anamnese atualizada com sucesso!');
    } catch (err) {
      console.error(err);
      showTemporaryError('Falha ao salvar a ficha de anamnese.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-text-secondary bg-white border border-border rounded-[14px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mb-2" />
        <p className="text-sm">Carregando ficha de anamnese...</p>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="bg-white border border-border rounded-[14px] p-12 text-center text-text-secondary">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="font-title font-medium text-lg text-text-primary">Cliente não encontrada</p>
        <Link
          to="/fichas-anamnese"
          className="mt-4 inline-flex items-center gap-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-medium hover:bg-rose-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a lista
        </Link>
      </div>
    );
  }

  const initials = `${cliente.nome[0] || ''}${(cliente.sobrenome || '')[0] || ''}`.toUpperCase();

  const selectClass = "w-full px-3 py-2 border border-border rounded-lg bg-bg text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-rose-400 cursor-pointer";
  const inputClass = "w-full px-3 py-2 border border-border rounded-lg bg-bg text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-text-muted";
  const checkboxLabelClass = "flex items-center gap-3 p-2.5 bg-bg/25 rounded-lg border border-border/40 cursor-pointer select-none w-full transition-colors hover:bg-bg/40";
  const checkboxClass = "w-4.5 h-4.5 accent-rose-600 cursor-pointer";
  const cardClass = "bg-bg/10 border border-border/80 rounded-xl p-5 space-y-4 shadow-sm";

  return (
    <div className="space-y-6">
      {/* Floating Alerts */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 bg-black/20 backdrop-blur-[1px]">
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl max-w-md">
            <AlertCircle className="w-6 h-6 flex-shrink-0 text-red-600" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-[14px] border border-border shadow-xl w-full max-w-sm p-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600">
              <CheckCircle className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <h3 className="font-title font-bold text-xl text-text-primary">Salvo com Sucesso!</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{successMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Concluir
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-border rounded-[14px] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-rose-100 border-2 border-rose-200 text-rose-800 flex items-center justify-center font-title font-bold text-xl flex-shrink-0">
            {initials}
          </div>
          <div>
            <h2 className="font-title font-semibold text-2xl text-text-primary">
              {cliente.nome} {cliente.sobrenome}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <Link to="/fichas-anamnese" className="text-xs text-text-secondary hover:text-rose-600 font-medium flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                Voltar para a lista
              </Link>
              <Link to={`/clientes/${cliente.id}`} className="text-xs text-text-secondary hover:text-rose-600 font-medium transition-colors">
                Ver perfil completo →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Perfil do Olho & Cílios Naturais */}
          <div className={`${cardClass} md:col-span-2`}>
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <Eye className="w-4 h-4 text-rose-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Perfil do Olho & Cílios Naturais</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Formato do olho</label>
                <select value={formatoOlho} onChange={(e) => setFormatoOlho(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="amendoado">Amendoado</option>
                  <option value="redondo">Redondo</option>
                  <option value="caido">Caído</option>
                  <option value="fundo">Fundo</option>
                  <option value="protruso">Protruso</option>
                  <option value="monolid">Monolid</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Espaçamento entre os olhos</label>
                <select value={espacamentoOlhos} onChange={(e) => setEspacamentoOlhos(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="proximos">Próximos</option>
                  <option value="afastados">Afastados</option>
                  <option value="normal">Normal</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Densidade dos cílios naturais</label>
                <select value={densidadeCiliosNaturais} onChange={(e) => setDensidadeCiliosNaturais(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="ralos">Ralos</option>
                  <option value="medios">Médios</option>
                  <option value="densos">Densos</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Comprimento dos cílios naturais</label>
                <select value={comprimentoCiliosNaturais} onChange={(e) => setComprimentoCiliosNaturais(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="curtos">Curtos</option>
                  <option value="medios">Médios</option>
                  <option value="longos">Longos</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Curvatura natural</label>
                <select value={curvaturaNatural} onChange={(e) => setCurvaturaNatural(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="retos">Retos</option>
                  <option value="levemente_curvados">Levemente curvados</option>
                  <option value="bem_curvados">Bem curvados</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preferências Técnicas */}
          <div className={`${cardClass} md:col-span-2`}>
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Preferências Técnicas</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Técnica preferida</label>
                <select value={tecnicaPreferida} onChange={(e) => setTecnicaPreferida(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="fio_a_fio_classico">Fio a Fio Clássico</option>
                  <option value="volume_russo">Volume Russo</option>
                  <option value="hibrido">Híbrido</option>
                  <option value="volume_brasileiro">Volume Brasileiro</option>
                  <option value="mega_volume">Mega Volume</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Mapping preferido</label>
                <select value={mappingPreferido} onChange={(e) => setMappingPreferido(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="natural">Natural</option>
                  <option value="gatinho">Gatinho (Cat Eye)</option>
                  <option value="boneca">Boneca (Dolly Eye)</option>
                  <option value="esquilo">Esquilo (Squirrel)</option>
                  <option value="aberto_no_meio">Aberto no Meio</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Curvatura preferida</label>
                <select value={curvaturaPreferida} onChange={(e) => setCurvaturaPreferida(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="J">J</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="CC">CC</option>
                  <option value="D">D</option>
                  <option value="DD_L">D+ / L</option>
                  <option value="L_plus_M">L+ / M</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Espessura preferida</label>
                <select value={espessuraPreferida} onChange={(e) => setEspessuraPreferida(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="0.03">0.03mm</option>
                  <option value="0.05">0.05mm</option>
                  <option value="0.07">0.07mm</option>
                  <option value="0.10">0.10mm</option>
                  <option value="0.15">0.15mm</option>
                  <option value="0.20">0.20mm</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Comprimento predominante</label>
                <input
                  type="text"
                  placeholder="Ex: 8-13mm"
                  value={comprimentoPredominante}
                  onChange={(e) => setComprimentoPredominante(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Efeito desejado</label>
                <select value={efeitoDesejado} onChange={(e) => setEfeitoDesejado(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="natural">Natural</option>
                  <option value="glamouroso">Glamouroso</option>
                  <option value="boneca">Boneca</option>
                  <option value="marcante">Marcante</option>
                </select>
              </div>
            </div>
          </div>

          {/* Retenção & Cuidados */}
          <div className={`${cardClass} md:col-span-2`}>
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <Clock className="w-4 h-4 text-rose-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Retenção & Cuidados</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Como costuma dormir?</label>
                <select value={posicaoDormir} onChange={(e) => setPosicaoDormir(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="lado">De Lado (impacta lateral da extensão)</option>
                  <option value="costas">De Costas (ideal para retenção)</option>
                  <option value="de_brucos">De Bruços (atrito severo)</option>
                  <option value="variada">Variada / Alternada</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Tempo médio de retenção (dias)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Ex: 21"
                  value={tempoMedioRetencaoDias}
                  onChange={(e) => setTempoMedioRetencaoDias(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Frequência ideal de manutenção (dias)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Ex: 15"
                  value={frequenciaManutencaoDias}
                  onChange={(e) => setFrequenciaManutencaoDias(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Adesivo mais adequado</label>
                <select value={tipoAdesivo} onChange={(e) => setTipoAdesivo(e.target.value as any)} className={selectClass}>
                  <option value="">Selecione...</option>
                  <option value="sensivel">Sensível / Hipoalergênico</option>
                  <option value="padrao">Padrão</option>
                  <option value="secagem_rapida">Secagem Rápida</option>
                </select>
              </div>
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={maquiagemProvaAgua} onChange={(e) => setMaquiagemProvaAgua(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Usa rímel ou maquiagem à prova d'água?</span>
              </label>
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={exposicaoCalorAgua} onChange={(e) => setExposicaoCalorAgua(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Contato frequente com vapor, calor ou piscina?</span>
              </label>
              <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Observações sobre retenção</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Perde mais fios no canto externo. Boa retenção no geral."
                  value={observacoesRetencao}
                  onChange={(e) => setObservacoesRetencao(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Histórico & Cuidados Oculares */}
          <div className={cardClass}>
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <Moon className="w-4 h-4 text-rose-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Histórico & Cuidados Oculares</h3>
            </div>
            <div className="space-y-3">
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={fezExtensaoAntes} onChange={(e) => setFezExtensaoAntes(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Já realizou extensão de cílios anteriormente?</span>
              </label>
              {fezExtensaoAntes && (
                <label className="flex items-center gap-3 p-2.5 bg-rose-50/20 rounded-lg border border-rose-100/40 cursor-pointer select-none w-full transition-colors hover:bg-rose-50/35 pl-6 animate-slide-up">
                  <input type="checkbox" checked={reacaoAlergicaAnterior} onChange={(e) => setReacaoAlergicaAnterior(e.target.checked)} className={checkboxClass} />
                  <span className="text-xs font-semibold text-rose-800">Teve reação alérgica a extensões anteriores?</span>
                </label>
              )}
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={usaLentesContato} onChange={(e) => setUsaLentesContato(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Usa lentes de contato?</span>
              </label>
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={olhosSensiveis} onChange={(e) => setOlhosSensiveis(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Olhos sensíveis, lacrimejamento fácil ou olho seco?</span>
              </label>
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={doencasOculares} onChange={(e) => setDoencasOculares(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Infecção ocular recente (blefarite, conjuntivite, terçol)?</span>
              </label>
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={habitoEsfregarOlhos} onChange={(e) => setHabitoEsfregarOlhos(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Hábito de esfregar ou tocar os olhos/cílios?</span>
              </label>
            </div>
          </div>

          {/* Condições Clínicas & Fatores Hormonais */}
          <div className={cardClass}>
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Condições Clínicas & Fatores Hormonais</h3>
            </div>
            <div className="space-y-3">
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={gestante} onChange={(e) => setGestante(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Gestante ou Lactante?</span>
              </label>
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={problemasTireoide} onChange={(e) => setProblemasTireoide(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Problemas de tireoide ou alteração hormonal recente?</span>
              </label>
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={quimioterapiaRecente} onChange={(e) => setQuimioterapiaRecente(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Passou por quimioterapia nos últimos 6 meses?</span>
              </label>
              <label className={checkboxLabelClass}>
                <input type="checkbox" checked={quedaCabeloAlopecia} onChange={(e) => setQuedaCabeloAlopecia(e.target.checked)} className={checkboxClass} />
                <span className="text-xs font-medium text-text-secondary">Queda acentuada de cabelo ou diagnóstico de alopecia?</span>
              </label>
            </div>
          </div>

          {/* Alergias & Detalhes Clínicos */}
          <div className={`${cardClass} md:col-span-2`}>
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Alergias & Detalhes Clínicos</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Alergias conhecidas</label>
                <input
                  type="text"
                  placeholder="Ex: Esmalte, cosméticos, cianoacrilato (cola), fita micropore, látex..."
                  value={alergias}
                  onChange={(e) => setAlergias(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Medicamentos em uso</label>
                <input
                  type="text"
                  placeholder="Ex: Roacutan, colírios frequentes, corticoides..."
                  value={medicamentos}
                  onChange={(e) => setMedicamentos(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Doenças Crônicas</label>
                <input
                  type="text"
                  placeholder="Ex: Diabetes, labirintite (dificulta ficar deitada muito tempo), asma..."
                  value={doencasCronicas}
                  onChange={(e) => setDoencasCronicas(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Notas gerais</label>
                <textarea
                  rows={3}
                  placeholder="Qualquer observação adicional relevante sobre a cliente..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-1.5 px-6 py-2.5 bg-rose-600 hover:bg-rose-800 disabled:bg-rose-400 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Salvando...' : 'Salvar Ficha de Anamnese'}
          </button>
        </div>
      </form>
    </div>
  );
}
