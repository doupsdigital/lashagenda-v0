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
} from 'lucide-react';

export default function LandingPage_DarkChic() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Preciso baixar o aplicativo pela loja?',
      answer: 'Não. É um aplicativo inteligente instalado diretamente no navegador. Com um toque, ele vira um ícone na tela inicial do celular das suas clientes, sem gastar memória.'
    },
    {
      question: 'O Lash Hub cobra taxas de comissão?',
      answer: 'Nenhuma. O valor dos seus procedimentos de Lash é 100% repassado a você. Cobramos apenas o valor da assinatura fixa mensal.'
    },
    {
      question: 'Como funciona o teste de 14 dias?',
      answer: 'Ao fazer o cadastro rápido, você ganha 14 dias de teste completo para experimentar na prática. Não pedimos cartão de crédito.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#E4E4E7] font-sans antialiased selection:bg-[#FF4D97]/30 selection:text-white">
      
      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FF4D97]/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-[#9E00FF]/5 blur-[120px] pointer-events-none" />

      {/* HEADER */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-5xl px-6 py-3 bg-[#16161A]/80 backdrop-blur-md rounded-full border border-[#27272A] shadow-2xl flex items-center justify-between z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF4D97] to-[#FFA3C4] flex items-center justify-center shadow text-black font-extrabold text-base">
            LH
          </div>
          <span className="font-extrabold text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D97] to-[#FFA3C4]">
            Lash Hub
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-xs sm:text-sm font-semibold text-[#A1A1AA] hover:text-white transition-colors">
            Entrar
          </Link>
          <button
            onClick={() => navigate('/cadastro')}
            className="text-xs sm:text-sm font-bold bg-[#FF4D97] hover:bg-[#E03A80] text-black px-4.5 py-2.5 rounded-full shadow-lg shadow-[#FF4D97]/20 hover:scale-[1.03] transition-all cursor-pointer"
          >
            Experimentar Grátis
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FF4D97]/10 text-[#FF4D97] rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border border-[#FF4D97]/20">
          <Sparkles className="w-3.5 h-3.5" />
          ESTILO PREMIUM PARA LASH DESIGNERS
        </div>

        <h1 className="font-sans font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.1] mb-6">
          Seu agendamento online de forma <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D97] to-[#FFA3C4]">profissional e rápida</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#A1A1AA] max-w-xl mx-auto mb-10 leading-relaxed">
          Chega de perder clientes pela demora do WhatsApp. Permita que elas marquem sozinhas em um aplicativo exclusivo para o seu estúdio.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xs mx-auto mb-16">
          <button
            onClick={() => navigate('/cadastro')}
            className="py-3.5 px-8 bg-gradient-to-r from-[#FF4D97] to-[#FFA3C4] hover:from-[#E03A80] hover:to-[#FF80B0] text-black rounded-xl font-bold shadow-lg shadow-[#FF4D97]/10 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
          >
            Quero Agendamento Rápido
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Mockups */}
        <div className="relative rounded-3xl border border-[#27272A] bg-[#16161A]/60 p-4 shadow-2xl max-w-3xl mx-auto backdrop-blur-sm">
          <div className="rounded-2xl overflow-hidden bg-[#0E0E10] aspect-video flex items-center justify-center p-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
              
              <div className="bg-[#16161A]/80 border border-[#27272A] rounded-xl p-5 flex flex-col justify-between text-left shadow-lg">
                <div>
                  <div className="flex items-center justify-between border-b border-[#27272A] pb-3 mb-3">
                    <span className="text-xs font-bold text-[#FF4D97] tracking-wider uppercase">App da Cliente</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Seu Link de Marcação</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Um portal escuro premium que combina com a sofisticação do seu estúdio. Suas clientes agendam horários sem atrito.
                  </p>
                </div>
                <div className="text-[10px] text-[#71717A] pt-3">
                  ● Funciona perfeitamente no celular
                </div>
              </div>

              <div className="hidden md:flex bg-[#16161A]/80 border border-[#27272A] rounded-xl p-5 flex-col justify-between text-left shadow-lg">
                <div>
                  <div className="flex items-center justify-between border-b border-[#27272A] pb-3 mb-3">
                    <span className="text-xs font-bold text-[#FFA3C4] tracking-wider uppercase">Seu Painel Solo</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D97]" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Controle da sua Agenda</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Notificações automáticas na tela toda vez que alguém agendar. Salve as curvaturas, espessuras e mappings em segundos.
                  </p>
                </div>
                <div className="text-[10px] text-[#71717A] pt-3">
                  ● Histórico completo de atendimentos
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* COMPARATIVE SECTION */}
      <section className="py-20 bg-[#121215] border-y border-[#27272A]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Feito para Lash Designers autônomas
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-2">
              Por que usar ferramentas complexas de clínicas quando você pode ter algo focado?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#16161A]/50 border border-[#27272A] text-left">
              <h3 className="font-bold text-base text-red-500 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Sistemas tradicionais de salão
              </h3>
              <ul className="space-y-3 text-xs text-[#A1A1AA]">
                <li>• Painéis contábeis de grandes clínicas com equipes grandes.</li>
                <li>• Cadastros lentos e cansativos para a sua cliente.</li>
                <li>• Exigem computadores e configurações complexas de taxas.</li>
                <li>• Cobram porcentagens ou comissões por agendamento.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#16161A] border-2 border-[#FF4D97] text-left shadow-lg">
              <h3 className="font-bold text-base text-[#FF4D97] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Lash Hub
              </h3>
              <ul className="space-y-3 text-xs text-white font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF4D97] flex-shrink-0" /> Desenhado 100% para o dia a dia solo.</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF4D97] flex-shrink-0" /> Sem menus complexos ou botões que você nunca usará.</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF4D97] flex-shrink-0" /> Links limpos que salvam horários em 3 cliques.</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF4D97] flex-shrink-0" /> Assinatura fixa e zero taxas sobre os seus serviços.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <div className="mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Automação prática para a sua rotina
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 bg-[#16161A]/40 border border-[#27272A] rounded-2xl text-left">
            <div className="w-9 h-9 bg-[#FF4D97]/10 text-[#FF4D97] rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-sm text-white mb-1.5">Portal de Lash 24h</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Deixe sua agenda aberta para receber agendamentos mesmo enquanto você dorme ou atende.
            </p>
          </div>

          <div className="p-6 bg-[#16161A]/40 border border-[#27272A] rounded-2xl text-left">
            <div className="w-9 h-9 bg-[#FF4D97]/10 text-[#FF4D97] rounded-xl flex items-center justify-center mb-4">
              <Bell className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-sm text-white mb-1.5">Notificações Grátis</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Receba avisos instantâneos na barra do celular a cada nova marcação realizada.
            </p>
          </div>

          <div className="p-6 bg-[#16161A]/40 border border-[#27272A] rounded-2xl text-left">
            <div className="w-9 h-9 bg-[#FF4D97]/10 text-[#FF4D97] rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-sm text-white mb-1.5">Histórico Rápido</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Consulte mappings, curvatura e espessura da cliente com poucos cliques no celular.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-[#121215] border-t border-[#27272A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            Planos sem comissões
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mb-12">
            Teste gratuitamente por 14 dias. Sem cartão de crédito cadastrado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            
            {/* Plano Básico */}
            <div className="bg-[#16161A]/50 border border-[#27272A] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1.5">Básico</p>
                <h3 className="text-base font-bold text-white mb-4">Gestão de Fichas</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-xs text-[#A1A1AA]">R$</span>
                  <span className="text-3xl font-black text-white ml-0.5">59,90</span>
                  <span className="text-xs text-[#A1A1AA] ml-0.5">/mês</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#A1A1AA] border-t border-[#27272A] pt-4">
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#FF4D97]" /> Clientes ilimitados</li>
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#FF4D97]" /> Histórico de fichas de Lash</li>
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#FF4D97]" /> Controle de caixa simples</li>
                  <li className="text-[#71717A] line-through">× Sem agendamento online</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/cadastro')}
                className="w-full mt-6 py-2.5 border border-[#FF4D97]/50 text-[#FF4D97] hover:bg-[#FF4D97]/10 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Criar Conta Grátis
              </button>
            </div>

            {/* Plano Premium */}
            <div className="bg-[#16161A] border-2 border-[#FF4D97] rounded-2xl p-6 flex flex-col justify-between relative shadow-lg shadow-[#FF4D97]/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF4D97] text-black text-[9px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                Mais Vendido
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#FF80B0] uppercase tracking-wider mb-1.5">Premium</p>
                <h3 className="text-base font-bold text-white mb-4">Agendamento & Notificações</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-xs text-[#FF4D97]">R$</span>
                  <span className="text-3xl font-black text-[#FF4D97] ml-0.5">99,90</span>
                  <span className="text-xs text-[#A1A1AA] ml-0.5">/mês</span>
                </div>
                <ul className="space-y-2.5 text-xs text-white font-medium border-t border-[#27272A] pt-4">
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#FF4D97]" /> Tudo do Plano Básico</li>
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#FF4D97]" /> Portal de Agendamento Online 24h</li>
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#FF4D97]" /> Avisos imediatos na barra do celular</li>
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#FF4D97]" /> Controle de folgas e bloqueios</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/cadastro')}
                className="w-full mt-6 py-2.5 bg-[#FF4D97] hover:bg-[#E03A80] text-black rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Testar 14 Dias Grátis
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="w-10 h-10 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mx-auto mb-4 border border-[#10B981]/20">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">
          7 dias de garantia incondicional
        </h2>
        <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-xl mx-auto">
          Use o sistema na sua rotina de Lash. Se em até 7 dias decidir que o Lash Hub não serve para você, devolvemos 100% do seu dinheiro, sem burocracia.
        </p>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white">Dúvidas Frequentes</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="border border-[#27272A] rounded-xl overflow-hidden bg-[#16161A]/30">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs text-[#D4D4D8] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-[#FF4D97]">{isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
                </button>
                {isOpen && (
                  <div className="p-4 border-t border-[#27272A] bg-[#16161A]/50 text-xs text-[#A1A1AA] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0C] border-t border-[#1C1C1F] py-10 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 px-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#FF4D97] flex items-center justify-center text-black font-black text-xs">
              LH
            </div>
            <span className="font-extrabold text-sm text-white tracking-wide">
              Lash Hub
            </span>
          </div>
          <p className="text-[10px] text-[#71717A]">
            © {new Date().getFullYear()} Lash Hub. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
