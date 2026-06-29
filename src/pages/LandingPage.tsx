import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Bell,
  BookOpen,
  Smartphone,
  Check,
  XCircle,
  Sparkle,
  Wallet,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  // Estado para acordeões de dores
  const [activePain, setActivePain] = useState<number | null>(null);
  const pains = [
    {
      question: 'Por que outros agendadores parecem difíceis demais?',
      answer: 'Porque são feitos para grandes salões ou clínicas com muitos funcionários. Eles exigem configurações de comissões, relatórios contábeis e telas cheias de botões. O Lash Hub é direto ao ponto e feito apenas para quem trabalha sozinha.'
    },
    {
      question: 'Como o aplicativo economiza meu tempo no WhatsApp?',
      answer: 'Suas clientes agendam sozinhas pelo seu link. O sistema mostra apenas seus horários disponíveis (respeitando seus intervalos e bloqueios) e atualiza a agenda na hora, sem que você precise parar o atendimento para responder.'
    },
    {
      question: 'Como faço para controlar as faltas e no-shows?',
      answer: 'Você configura a antecedência mínima para cancelamento. Se a cliente faltar sem avisar, você registra como Falta no perfil dela no CRM simples, protegendo sua agenda e seu faturamento.'
    }
  ];

  // Estado para acordeões do FAQ
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const faqs = [
    {
      question: 'Minha cliente precisa baixar o aplicativo pela loja?',
      answer: 'Não. Basta salvar o link do seu estúdio na tela inicial do celular com 1 clique. Funciona igual a um aplicativo comum, mas não gasta a memória do telefone.'
    },
    {
      question: 'O Lash Hub cobra taxas ou comissão por agendamento?',
      answer: 'De forma alguma. O valor dos seus atendimentos de Lash é 100% seu. Nós cobramos apenas uma assinatura mensal fixa.'
    },
    {
      question: 'Como funciona o período de testes grátis?',
      answer: 'Ao se cadastrar, você ganha 14 dias de acesso completo no Plano Premium. Não pedimos cartão de crédito.'
    },
    {
      question: 'Preciso cadastrar todos os meus serviços do zero?',
      answer: 'Não. Assim que você entra, o sistema já vem configurado com 10 serviços padrão de Lash e sobrancelhas com preços e durações recomendadas. É só entrar e usar.'
    }
  ];

  // Depoimentos da massa de dados
  const testimonials = [
    {
      name: 'Mariana Silva',
      role: 'Lash Designer • Mari Cílios & Cia',
      stars: '★★★★★',
      text: 'Clientes agendam sozinhas no meu link, inclusive de madrugada. Recebo o aviso no celular na hora e trabalho em paz.',
    },
    {
      name: 'Beatriz Oliveira',
      role: 'Lash Designer • Bia Lash Deluxe',
      stars: '★★★★★',
      text: 'A ficha de Lash rápida é perfeita. Vejo a curvatura D, espessura 0.07 e mapping da cliente em 2 toques no celular.',
    },
    {
      name: 'Gabriela Costa',
      role: 'Lash Designer • Gabi Costa Cílios',
      stars: '★★★★★',
      text: 'O Lash Hub é direto ao ponto, simples e muito fofo. Minhas clientes amam a facilidade de agendar por ele.',
    }
  ];

  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans antialiased overflow-x-hidden selection:bg-rose-200 selection:text-rose-800">
      
      {/* ── BACKGROUND VISUAL ORBS ── */}
      <div className="absolute top-[-10%] left-[-15%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-rose-200/25 blur-3xl pointer-events-none" />
      <div className="absolute top-[35%] right-[-15%] w-[320px] sm:w-[650px] h-[320px] sm:h-[650px] rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-20%] w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />

      {/* ── HEADER ── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] sm:w-[calc(100%-32px)] max-w-5xl px-4 sm:px-6 py-2.5 sm:py-3 bg-white/80 dark:bg-surface/80 backdrop-blur-md rounded-full border border-border shadow-lg flex items-center justify-between z-50 transition-all duration-300">
        <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-7 h-7 sm:w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center shadow-md overflow-hidden text-white font-title font-bold text-sm sm:text-base">
            LH
          </div>
          <span className="font-title font-bold text-lg sm:text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400">
            Lash Hub
          </span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="text-xs sm:text-sm font-semibold text-text-secondary hover:text-rose-600 px-2.5 sm:px-3 rounded-full transition-colors"
          >
            Entrar
          </Link>
          <button
            onClick={() => navigate('/cadastro')}
            className="text-[11px] sm:text-xs md:text-sm font-bold bg-rose-600 text-white hover:bg-rose-800 px-3 sm:px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5"
          >
            Começar Grátis
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="pt-28 pb-10 sm:pt-36 sm:pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-full border border-rose-100 dark:border-rose-900/50 text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-5">
          <Sparkle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-600 fill-rose-600" />
          Exclusivo para Lash Designers Autônomas
        </div>

        <h1 className="font-title font-black text-3xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-[1.15] sm:leading-[1.1] mb-5 max-w-4xl mx-auto">
          Seu estúdio de Lash com agendamento automático
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed px-2">
          Suas clientes agendam sozinhas em 3 cliques. Você recebe notificações no celular e se livra do WhatsApp para marcar horários. Simples, rápido e sem complicações.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-14 px-2">
          <button
            onClick={() => navigate('/cadastro')}
            className="py-3.5 sm:py-4 px-6 sm:px-8 bg-rose-600 hover:bg-rose-800 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2 group text-sm sm:text-base"
          >
            Quero testar 14 dias grátis
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#funcionalidades"
            className="py-3.5 sm:py-4 px-6 sm:px-8 border border-border text-text-secondary hover:bg-white/50 dark:hover:bg-surface/50 rounded-2xl font-semibold transition-all flex items-center justify-center text-sm sm:text-base"
          >
            Ver recursos
          </a>
        </div>

        {/* Visual Mockups Section */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-border bg-white/40 dark:bg-surface/40 p-3 sm:p-4 shadow-2xl overflow-hidden max-w-3xl mx-auto backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-100/10 to-rose-400/5 dark:from-rose-950/10 dark:to-rose-800/5 pointer-events-none" />
          <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-border shadow-inner bg-bg/50 aspect-[4/3] sm:aspect-video flex items-center justify-center p-3 sm:p-5 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full opacity-95">
              
              {/* Card 1: Portal da Cliente */}
              <div className="bg-white dark:bg-surface border border-border rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-2">
                  <div className="flex items-center gap-1.5 text-rose-600">
                    <Smartphone className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">App da Cliente</span>
                  </div>
                  <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">No ar 24h</span>
                </div>
                <div className="space-y-2 flex-1 text-left">
                  <div className="h-7 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-lg flex items-center px-2.5 text-[10px] font-semibold text-rose-800 dark:text-rose-300">
                    ✨ Alongamento de Cílios
                  </div>
                  <div className="h-7 bg-bg rounded-lg flex items-center px-2.5 text-[10px] text-text-secondary">
                    📅 Escolha data e hora disponíveis
                  </div>
                </div>
                <div className="text-[9px] text-text-muted mt-2 border-t border-border/60 pt-2 text-center">
                  Sua cliente agenda sozinha em 3 cliques
                </div>
              </div>

              {/* Card 2: Agenda Simplificada (Escondido no mobile) */}
              <div className="hidden md:flex bg-white dark:bg-surface border border-border rounded-xl p-4 flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-2">
                  <div className="flex items-center gap-1.5 text-rose-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Sua Agenda Solo</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-6.5 bg-bg rounded-lg flex items-center justify-between px-2 text-[9px] font-medium">
                    <span>09:00 - Volume Russo</span>
                    <span className="font-bold text-rose-600">Confirmado</span>
                  </div>
                  <div className="h-6.5 bg-bg rounded-lg flex items-center justify-between px-2 text-[9px] font-medium">
                    <span>11:30 - Lash Lifting</span>
                    <span className="font-bold text-rose-600">Confirmado</span>
                  </div>
                </div>
                <div className="text-[9px] text-text-muted mt-2 border-t border-border/60 pt-2 text-center">
                  Você recebe o aviso no celular na hora
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO COMPARATIVA (Sistemas Comuns vs. Lash Hub) ── */}
      <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto relative z-10 border-t border-border/40">
        <div className="text-center mb-8">
          <h2 className="font-title font-extrabold text-2xl sm:text-3xl text-text-primary leading-tight">
            Por que sistemas comuns não funcionam para você?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Sistemas Comuns */}
          <div className="bg-red-50/20 dark:bg-red-950/5 border border-red-200/50 rounded-2xl p-5 text-left">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 mb-3">
              <XCircle className="w-4 h-4 flex-shrink-0" />
              <h3 className="font-sans font-bold text-sm">Sistemas de Salão Genéricos</h3>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li>• Feitos para grandes equipes e comissões complexas.</li>
              <li>• Telas cheias de botões e gráficos difíceis.</li>
              <li>• Cadastros demorados que irritam as clientes.</li>
              <li>• Cobram comissões sobre cada atendimento agendado.</li>
            </ul>
          </div>

          {/* Lash Hub */}
          <div className="bg-rose-50/20 dark:bg-rose-950/10 border-2 border-rose-400/60 rounded-2xl p-5 text-left shadow-sm">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-3">
              <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0 fill-rose-100 dark:fill-rose-900/30" />
              <h3 className="font-sans font-bold text-sm">Lash Hub (Focado Solo)</h3>
            </div>
            <ul className="space-y-2 text-xs text-text-primary font-medium">
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Exclusivo para quem atende Lash sozinha.</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Pronto para usar em 2 minutos após o cadastro.</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Agendamento em 3 cliques para a cliente.</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Mensalidade fixa e zero taxas por atendimento.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── SEÇÃO: COMO FUNCIONA O APLICATIVO DA CLIENTE (Foco em App sem baixar) ── */}
      <section className="py-10 bg-rose-50/40 dark:bg-rose-950/5 border-y border-border/40 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-1">Simplicidade de Uso</p>
            <h2 className="font-title font-extrabold text-2xl sm:text-3xl text-text-primary">
              Um aplicativo com a sua marca na tela da cliente
            </h2>
            <p className="text-xs text-text-secondary mt-1 max-w-md mx-auto">
              Sem precisar baixar nas lojas oficiais ou ocupar a memória do celular.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-3xl mx-auto">
            
            <div className="bg-white dark:bg-surface border border-border p-4.5 rounded-2xl shadow-sm relative">
              <span className="absolute top-3 right-4 text-xl font-black text-rose-100 dark:text-rose-900/25">01</span>
              <h3 className="font-bold text-xs sm:text-sm text-text-primary mb-1">Envie seu Link</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Você coloca seu link na bio do Instagram ou envia no WhatsApp.
              </p>
            </div>

            <div className="bg-white dark:bg-surface border border-border p-4.5 rounded-2xl shadow-sm relative">
              <span className="absolute top-3 right-4 text-xl font-black text-rose-100 dark:text-rose-900/25">02</span>
              <h3 className="font-bold text-xs sm:text-sm text-text-primary mb-1">Adicione na Tela</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                A cliente salva o link na tela inicial do celular com 1 clique.
              </p>
            </div>

            <div className="bg-white dark:bg-surface border border-border p-4.5 rounded-2xl shadow-sm relative">
              <span className="absolute top-3 right-4 text-xl font-black text-rose-100 dark:text-rose-900/25">03</span>
              <h3 className="font-bold text-xs sm:text-sm text-text-primary mb-1">Agende em 3 Cliques</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Ela marca o horário sozinha e você recebe o aviso no celular.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── GRADE DE RECURSOS (Totalmente Simplificada) ── */}
      <section id="funcionalidades" className="py-10 px-4 sm:px-6 max-w-4xl mx-auto relative z-10 text-center">
        <div className="mb-8">
          <h2 className="font-title font-extrabold text-2xl sm:text-3xl text-text-primary">
            Tudo o que você precisa em uma única tela
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          
          <div className="bg-white dark:bg-surface border border-border p-4 rounded-xl shadow-sm text-left flex gap-3 items-center">
            <div className="w-8 h-8 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xs text-text-primary">Agendamento 24h</h3>
              <p className="text-[10px] text-text-secondary">Sua cliente agenda sozinha a qualquer hora.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-surface border border-border p-4 rounded-xl shadow-sm text-left flex gap-3 items-center">
            <div className="w-8 h-8 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xs text-text-primary">Avisos no Celular</h3>
              <p className="text-[10px] text-text-secondary">Notificações grátis de novos horários na tela.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-surface border border-border p-4 rounded-xl shadow-sm text-left flex gap-3 items-center">
            <div className="w-8 h-8 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xs text-text-primary">Histórico de Lash</h3>
              <p className="text-[10px] text-text-secondary">Salve curvaturas, espessuras e mappings rápidos.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-surface border border-border p-4 rounded-xl shadow-sm text-left flex gap-3 items-center">
            <div className="w-8 h-8 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xs text-text-primary">Bloqueios de Agenda</h3>
              <p className="text-[10px] text-text-secondary">Feche horários de folga ou almoço com um toque.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-surface border border-border p-4 rounded-xl shadow-sm text-left flex gap-3 items-center">
            <div className="w-8 h-8 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xs text-text-primary">Resumo de Ganhos</h3>
              <p className="text-[10px] text-text-secondary">Acompanhe seu faturamento de forma bem simples.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-surface border border-border p-4 rounded-xl shadow-sm text-left flex gap-3 items-center">
            <div className="w-8 h-8 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xs text-text-primary">Serviços Inclusos</h3>
              <p className="text-[10px] text-text-secondary">Entre no sistema com 10 serviços de Lash já cadastrados.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SEÇÃO DE DORES DO DIA A DIA ── */}
      <section className="py-10 px-4 sm:px-6 max-w-3xl mx-auto relative z-10 border-t border-border/40">
        <div className="text-center mb-6">
          <h2 className="font-title font-extrabold text-2xl sm:text-3xl text-text-primary">
            Você passa por alguma dessas dores?
          </h2>
        </div>

        <div className="space-y-2">
          {pains.map((pain, index) => {
            const isOpen = activePain === index;
            return (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-white dark:bg-surface hover:border-rose-200 transition-colors"
              >
                <button
                  onClick={() => setActivePain(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left font-bold text-xs sm:text-sm text-text-primary cursor-pointer"
                >
                  <span className={isOpen ? 'text-rose-600' : ''}>{pain.question}</span>
                  <span className="text-rose-600 font-bold text-base">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-36 border-t border-border/40 p-4 opacity-100 bg-rose-50/10' : 'max-h-0 opacity-0 p-0 border-t-0'
                  }`}
                >
                  <p className="text-xs text-text-secondary leading-relaxed">{pain.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TESTEMUNHOS REAIS DE LASHES ── */}
      <section className="py-10 bg-rose-50/40 dark:bg-rose-950/5 border-y border-border/40 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-title font-extrabold text-2xl text-text-primary">
              O que dizem as Lash Designers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white dark:bg-surface border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-text-secondary italic leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div className="border-t border-border/60 pt-3 mt-auto">
                  <p className="text-xs font-bold text-text-primary">{t.name}</p>
                  <p className="text-[9px] sm:text-[10px] text-text-secondary mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANOS E PREÇOS ── */}
      <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto relative z-10 text-center">
        <div className="mb-8">
          <h2 className="font-title font-extrabold text-2xl sm:text-3xl text-text-primary">
            Planos sem taxas por agendamento
          </h2>
          <p className="text-text-secondary text-xs mt-2">
            Use grátis por 14 dias para testar, sem precisar de cartão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto text-left">
          
          {/* Plano Básico */}
          <div className="bg-white dark:bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1">Plano Básico</p>
              <h3 className="font-sans font-bold text-base text-text-primary mb-3">Gestão Essencial</h3>
              <div className="flex items-baseline gap-0.5 mb-4">
                <span className="text-xs font-semibold text-text-secondary">R$</span>
                <span className="font-title font-black text-3xl text-text-primary">59,90</span>
                <span className="text-xs font-semibold text-text-secondary">/mês</span>
              </div>
              
              <ul className="space-y-2 border-t border-border/60 pt-4 text-xs text-text-secondary">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Clientes ilimitadas</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Fichas e prontuários de Lash</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Histórico completo no CRM</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Faturamento financeiro simples</li>
                <li className="text-text-muted flex items-center gap-2">× Sem Agenda Online</li>
                <li className="text-text-muted flex items-center gap-2">× Sem Portal de Clientes</li>
              </ul>
            </div>
            
            <button
              onClick={() => navigate('/cadastro')}
              className="w-full py-2.5 border border-rose-600 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl text-xs font-bold transition-colors mt-6 cursor-pointer"
            >
              Criar Conta Grátis
            </button>
          </div>

          {/* Plano Premium */}
          <div className="bg-white dark:bg-surface border-2 border-rose-600 rounded-2xl p-6 flex flex-col justify-between shadow-md relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              Mais Recomendado
            </div>
            
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-1">Plano Premium</p>
              <h3 className="font-sans font-bold text-base text-text-primary mb-3">Automação Completa</h3>
              <div className="flex items-baseline gap-0.5 mb-4">
                <span className="text-xs font-semibold text-text-secondary">R$</span>
                <span className="font-title font-black text-3xl text-rose-600">99,90</span>
                <span className="text-xs font-semibold text-text-secondary">/mês</span>
              </div>
              
              <ul className="space-y-2 border-t border-border/60 pt-4 text-xs text-text-primary font-medium">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Tudo do Plano Básico</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Portal de Agendamento Online 24h</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Agenda e calendário dinâmico</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Bloqueios de horários e almoço</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" /> Avisos na tela do celular</li>
              </ul>
            </div>
            
            <button
              onClick={() => navigate('/cadastro')}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-800 text-white rounded-xl text-xs font-bold transition-all shadow-md mt-6 cursor-pointer"
            >
              Testar 14 Dias Grátis
            </button>
          </div>

        </div>
      </section>

      {/* ── GUARANTEE SECTION ── */}
      <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950/20 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <ShieldCheck className="w-5.5 h-5.5" />
        </div>
        <h2 className="font-title font-extrabold text-xl text-text-primary mb-2">
          7 dias de garantia incondicional
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl mx-auto px-2">
          Use o sistema na sua rotina. Se em até 7 dias você achar que o Lash Hub não ajuda no seu dia a dia, devolvemos seu dinheiro integralmente, de forma rápida e amigável.
        </p>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-10 bg-rose-50/40 dark:bg-rose-950/5 border-t border-border/40 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h2 className="font-title font-extrabold text-2xl text-text-primary">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-surface border border-border rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-4 text-left font-bold text-xs sm:text-sm text-text-primary cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-rose-600 font-bold text-base sm:text-lg leading-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  
                  <div
                    className={`transition-all duration-350 ease-in-out overflow-hidden ${
                      isOpen 
                        ? 'max-h-[300px] sm:max-h-40 border-t border-border/40 p-4 opacity-100 bg-rose-50/10 dark:bg-rose-950/5' 
                        : 'max-h-0 opacity-0 p-0 border-t-0'
                    }`}
                  >
                    <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CALL TO ACTION ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-rose-600 to-rose-400 dark:from-rose-950 dark:to-rose-800 text-white text-center relative z-10 overflow-hidden px-4">
        <div className="absolute top-[-10%] right-[-10%] w-[200px] h-[200px] rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[200px] h-[200px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="font-title font-black text-2xl sm:text-4xl tracking-tight leading-snug sm:leading-tight mb-4 px-2">
            Seu estúdio de Lash precisa trabalhar por você, não contra você.
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-8 max-w-sm sm:max-w-md mx-auto">
            Chega de passar o dia respondendo mensagens para agendar horários. Comece agora.
          </p>
          
          <button
            onClick={() => navigate('/cadastro')}
            className="w-full max-w-xs sm:max-w-sm py-3.5 bg-white text-rose-600 hover:bg-rose-50 hover:scale-[1.02] active:scale-100 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 group text-sm sm:text-base"
          >
            Quero Começar Grátis
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white dark:bg-surface border-t border-border py-8 sm:py-10 text-center relative z-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5.5 h-5.5 rounded bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white font-title font-bold text-xs animate-pulse">
              LH
            </div>
            <span className="font-title font-bold text-sm sm:text-base tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400">
              Lash Hub
            </span>
          </div>
          
          <p className="text-[10px] sm:text-xs text-text-muted">
            © {new Date().getFullYear()} Lash Hub. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3 text-[10px] sm:text-xs text-text-muted">
            <Link to="/login" className="hover:text-rose-600 transition-colors">Login Profissional</Link>
            <span>•</span>
            <Link to="/cadastro" className="hover:text-rose-600 transition-colors">Cadastrar Estúdio</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
