import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListChecks, CheckCircle2, Circle, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useFirstStepsProgress } from '../../hooks/useFirstStepsProgress';

const WIDGET_SEEN_KEY = 'primeiros_passos_widget';

interface StepConfig {
  id: string;
  label: string;
  description: string;
  route: string;
  scrollTargetId: string;
  isBonus?: boolean;
  done: boolean;
}

export default function FirstStepsWidget() {
  const navigate = useNavigate();
  const { isPaginaVista, markPageSeen } = useAuth();
  const progress = useFirstStepsProgress();
  const [open, setOpen] = useState(false);
  const [dismissedLocal, setDismissedLocal] = useState(false);
  const autoHideFiredRef = useRef(false);

  const steps: StepConfig[] = [
    {
      id: 'negocio',
      label: 'Complete os dados do seu negócio',
      description: 'Descrição, Instagram ou endereço — aparecem no portal das suas clientes.',
      route: '/configuracoes',
      scrollTargetId: 'ob-config-negocio',
      done: progress.negocioCompleto,
    },
    {
      id: 'servicos',
      label: 'Tenha seus serviços prontos',
      description: 'Já deixamos 2 serviços de exemplo — edite-os ou cadastre os seus.',
      route: '/servicos',
      scrollTargetId: 'ob-servico-form',
      done: true,
    },
    {
      id: 'clientes',
      label: 'Cadastre uma cliente-teste',
      description: 'Pra você já ter alguém disponível na hora de criar um agendamento.',
      route: '/clientes',
      scrollTargetId: 'ob-clientes-add-btn',
      done: progress.temCliente,
    },
    {
      id: 'agendamento',
      label: 'Crie um agendamento',
      description: 'Veja como funciona a agenda usando a cliente e o serviço que você já tem.',
      route: '/agendamentos',
      scrollTargetId: 'ob-agend-novo-btn',
      done: progress.temAgendamentoAdmin,
    },
    {
      id: 'agendamento_portal',
      label: 'Bônus: veja pelo lado da cliente',
      description: 'Compartilhe seu link e veja um agendamento chegando pela visão dela.',
      route: '/link-agendamento',
      scrollTargetId: 'ob-link-acoes',
      isBonus: true,
      done: progress.temAgendamentoPortal,
    },
  ];

  const coreDone = progress.negocioCompleto && progress.temCliente && progress.temAgendamentoAdmin;
  const coreSteps = steps.filter(s => !s.isBonus);
  const doneCount = coreSteps.filter(s => s.done).length;

  // Assim que os passos principais forem concluídos, marca como visto e some
  // pra sempre — é um empurrão de primeiro acesso, não um checklist reativo
  // que deve reaparecer se ela apagar a cliente-teste depois.
  useEffect(() => {
    if (coreDone && !autoHideFiredRef.current) {
      autoHideFiredRef.current = true;
      markPageSeen(WIDGET_SEEN_KEY);
    }
  }, [coreDone]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    setDismissedLocal(true);
    setOpen(false);
    markPageSeen(WIDGET_SEEN_KEY);
  };

  const handleGoToStep = (step: StepConfig) => {
    navigate(step.route);
    setTimeout(() => {
      document.getElementById(step.scrollTargetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    setOpen(false);
  };

  if (progress.loading || dismissedLocal || isPaginaVista(WIDGET_SEEN_KEY) || coreDone) {
    return null;
  }

  return (
    <div className="fixed left-4 z-40 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
      {open && (
        <div className="absolute bottom-[calc(100%+10px)] left-0 w-[300px] bg-white border border-border rounded-[16px] shadow-xl overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between gap-2 px-4 py-3 bg-rose-50 border-b border-rose-100">
            <p className="text-sm font-title font-semibold text-text-primary">Primeiros passos</p>
            <button
              onClick={handleClose}
              className="text-text-secondary hover:text-rose-600 p-1 rounded-full hover:bg-white/60 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-border max-h-[420px] overflow-y-auto">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-2.5 px-4 py-3">
                {step.done ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-4.5 h-4.5 text-text-muted flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${step.done ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                    {step.label}
                    {step.isBonus && !step.done && (
                      <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-600 no-underline">Bônus</span>
                    )}
                  </p>
                  {!step.done && (
                    <>
                      <p className="text-[11px] text-text-secondary mt-0.5 leading-snug">{step.description}</p>
                      <button
                        onClick={() => handleGoToStep(step)}
                        className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                      >
                        Ir <ArrowRight className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-border rounded-full shadow-md text-text-secondary hover:text-rose-600 hover:border-rose-300 text-xs font-medium transition-all hover:shadow-lg cursor-pointer"
      >
        <ListChecks className="w-4 h-4" />
        <span>Primeiros passos</span>
        <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full">
          {doneCount}/{coreSteps.length}
        </span>
      </button>
    </div>
  );
}
