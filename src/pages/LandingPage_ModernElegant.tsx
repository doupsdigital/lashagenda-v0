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
} from 'lucide-react';

export default function LandingPage_ModernElegant() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Preciso baixar o aplicativo pela App Store ou Google Play?',
      answer: 'Não. O Lash Hub funciona de forma muito mais moderna. Tanto você quanto suas clientes salvam o link do seu estúdio na tela inicial do celular com 1 clique. Funciona igual a um aplicativo comum, sem gastar memória.'
    },
    {
      question: 'O sistema cobra taxa por agendamento?',
      answer: 'Não. Você não paga nenhuma comissão sobre seus agendamentos ou procedimentos. O faturamento do seu trabalho é 100% seu.'
    },
    {
      question: 'Como funciona o teste gratuito?',
      answer: 'Você ganha 14 dias de teste completo no Plano Premium para experimentar todas as funções. Não solicitamos dados de cartão de crédito para começar.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3A3330] font-sans antialiased selection:bg-[#F3E1DC] selection:text-[#5C3E35]">
      
      {/* HEADER */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-5xl px-6 py-3.5 bg-white/70 backdrop-blur-md rounded-full border border-[#EDE3DE] shadow-md flex items-center justify-between z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#C5A880] to-[#E6D5B8] flex items-center justify-center shadow text-white font-serif font-bold text-base">
            LH
          </div>
          <span className="font-serif font-bold text-xl tracking-wide text-[#8C6D42]">
            Lash Hub
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-[#6B5E59] hover:text-[#8C6D42] transition-colors">
            Entrar
          </Link>
          <button
            onClick={() => navigate('/cadastro')}
            className="text-xs sm:text-sm font-bold bg-[#8C6D42] text-white hover:bg-[#6E5431] px-5 py-2.5 rounded-full shadow-sm hover:scale-[1.02] transition-all cursor-pointer"
          >
            Começar Grátis
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 px-4 max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F6EDE6] text-[#8C6D42] rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#8C6D42]" />
          Design Inteligente para Lash Designers Solo
        </div>

        <h1 className="font-serif font-light text-4xl sm:text-6xl text-[#3A3330] tracking-tight leading-[1.1] mb-6">
          Valorize o seu tempo e <span className="font-serif italic font-normal text-[#8C6D42]">automatize</span> seus agendamentos
        </h1>

        <p className="text-base sm:text-lg text-[#6B5E59] max-w-2xl mx-auto mb-10 leading-relaxed">
          Suas clientes marcam horário sozinhas em um aplicativo personalizado com a sua marca. Simples, moderno e feito para libertar você de conversas infinitas no WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            onClick={() => navigate('/cadastro')}
            className="py-4 px-8 bg-[#8C6D42] hover:bg-[#6E5431] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Experimentar 14 Dias Grátis
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Mockups */}
        <div className="relative rounded-3xl border border-[#EDE3DE] bg-white p-4 shadow-xl max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden bg-[#FAF6F0] aspect-video flex items-center justify-center p-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
              
              <div className="bg-white border border-[#EDE3DE] rounded-xl p-5 flex flex-col justify-between text-left shadow-sm">
                <div>
                  <div className="flex items-center gap-2 text-[#8C6D42] mb-3">
                    <Smartphone className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Seu Link de Agendamento</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#3A3330] mb-2">Interface da Cliente</h3>
                  <p className="text-xs text-[#6B5E59] leading-relaxed">
                    Um portal simples e elegante onde a cliente seleciona o procedimento e escolhe a data livre na sua agenda em menos de 1 minuto.
                  </p>
                </div>
                <div className="text-[10px] text-[#A6938A] border-t border-[#FAF6F0] pt-3">
                  ✓ Sem necessidade de cadastro complexo
                </div>
              </div>

              <div className="hidden md:flex bg-white border border-[#EDE3DE] rounded-xl p-5 flex-col justify-between text-left shadow-sm">
                <div>
                  <div className="flex items-center gap-2 text-[#8C6D42] mb-3">
                    <Calendar className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Painel Administrativo</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#3A3330] mb-2">Sua Agenda em Ordem</h3>
                  <p className="text-xs text-[#6B5E59] leading-relaxed">
                    Veja seus horários confirmados, controle faltas de clientes e tenha o histórico completo de curvatura, espessura e mapping.
                  </p>
                </div>
                <div className="text-[10px] text-[#A6938A] border-t border-[#FAF6F0] pt-3">
                  ✓ Notificações automáticas na tela do celular
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* WHY LASH HUB IS DIFFERENT */}
      <section className="py-20 bg-white border-y border-[#EDE3DE]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif font-light text-3xl sm:text-5xl text-[#3A3330]">
              Esqueça os sistemas de beleza complexos
            </h2>
            <p className="text-sm sm:text-base text-[#6B5E59] mt-3">
              Desenvolvemos a ferramenta ideal para a profissional autônoma de Lash.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#EDE3DE]">
              <h3 className="font-serif font-bold text-lg text-[#3A3330] mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                Sistemas tradicionais
              </h3>
              <ul className="space-y-3.5 text-sm text-[#6B5E59]">
                <li className="flex gap-2"><span>•</span> Feitos para grandes clínicas com múltiplos funcionários.</li>
                <li className="flex gap-2"><span>•</span> Telas com relatórios financeiros de contabilidade pesados.</li>
                <li className="flex gap-2"><span>•</span> Configurações de taxas e comissões difíceis.</li>
                <li className="flex gap-2"><span>•</span> Cobram por agendamento ou tiram comissão do seu serviço.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border-2 border-[#8C6D42] shadow-sm relative">
              <div className="absolute -top-3 right-6 bg-[#8C6D42] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                Foco na Lash Solo
              </div>
              <h3 className="font-serif font-bold text-lg text-[#8C6D42] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#8C6D42]" />
                Lash Hub
              </h3>
              <ul className="space-y-3.5 text-sm text-[#3A3330] font-medium">
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#8C6D42] mt-0.5" /> Focado 100% no atendimento individual da Lash Designer.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#8C6D42] mt-0.5" /> Layout simplificado com agenda, clientes e ganhos rápidos.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#8C6D42] mt-0.5" /> Cliente agenda em 3 toques diretamente do celular.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#8C6D42] mt-0.5" /> Mensalidade fixa e transparente, sem cobrar taxas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif font-light text-3xl sm:text-5xl text-[#3A3330]">
            Tudo em um único lugar, sem complicação
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 bg-white border border-[#EDE3DE] rounded-2xl shadow-sm text-left">
            <div className="w-10 h-10 bg-[#FAF6F0] text-[#8C6D42] rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#3A3330] mb-2">Agendamento Online</h3>
            <p className="text-xs text-[#6B5E59] leading-relaxed">
              Disponibilize seu portal de horários 24 horas por dia. Suas clientes agendam sem precisar de você.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EDE3DE] rounded-2xl shadow-sm text-left">
            <div className="w-10 h-10 bg-[#FAF6F0] text-[#8C6D42] rounded-xl flex items-center justify-center mb-4">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#3A3330] mb-2">Avisos de Marcação</h3>
            <p className="text-xs text-[#6B5E59] leading-relaxed">
              Receba notificações gratuitas direto no seu celular sempre que um novo horário for agendado.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EDE3DE] rounded-2xl shadow-sm text-left">
            <div className="w-10 h-10 bg-[#FAF6F0] text-[#8C6D42] rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#3A3330] mb-2">Ficha de Lash</h3>
            <p className="text-xs text-[#6B5E59] leading-relaxed">
              Controle rápido de anamnese de cílios (salve curvaturas, espessuras e mappings preferidos da cliente).
            </p>
          </div>

        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="py-20 bg-[#FAF6F0] border-t border-[#EDE3DE]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-[#3A3330] mb-4">
            Escolha o plano ideal para o seu estúdio
          </h2>
          <p className="text-sm text-[#6B5E59] mb-12">
            Comece a usar grátis por 14 dias. Sem cartão de crédito necessário.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            
            {/* Plano Básico */}
            <div className="bg-white border border-[#EDE3DE] rounded-2xl p-8 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-[#A6938A] uppercase tracking-wider mb-2">Básico</p>
                <h3 className="font-serif text-xl font-bold text-[#3A3330] mb-4">Gestão de Agenda</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-sm text-[#6B5E59]">R$</span>
                  <span className="font-serif font-bold text-4xl text-[#3A3330] ml-1">59,90</span>
                  <span className="text-xs text-[#6B5E59] ml-1">/mês</span>
                </div>
                <ul className="space-y-3 text-xs text-[#6B5E59] border-t border-[#FAF6F0] pt-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8C6D42]" /> Clientes ilimitados</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8C6D42]" /> Fichas e prontuários de Lash</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8C6D42]" /> Controle financeiro simplificado</li>
                  <li className="text-[#A6938A] line-through">× Portal de Agendamento Online</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/cadastro')}
                className="w-full mt-8 py-3 border border-[#8C6D42] text-[#8C6D42] hover:bg-[#FAF6F0] rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Criar Conta Grátis
              </button>
            </div>

            {/* Plano Premium */}
            <div className="bg-white border-2 border-[#8C6D42] rounded-2xl p-8 flex flex-col justify-between shadow-md relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8C6D42] text-white text-[10px] font-bold px-4 py-1.5 rounded-full">
                Recomendado
              </div>
              <div>
                <p className="text-xs font-bold text-[#8C6D42] uppercase tracking-wider mb-2">Premium</p>
                <h3 className="font-serif text-xl font-bold text-[#3A3330] mb-4">Automação Completa</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-sm text-[#8C6D42]">R$</span>
                  <span className="font-serif font-bold text-4xl text-[#8C6D42] ml-1">99,90</span>
                  <span className="text-xs text-[#8C6D42] ml-1">/mês</span>
                </div>
                <ul className="space-y-3 text-xs text-[#3A3330] font-medium border-t border-[#FAF6F0] pt-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8C6D42]" /> Tudo do Plano Básico</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8C6D42]" /> Portal de Agendamento Online 24h</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8C6D42]" /> Notificações diretas no celular</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#8C6D42]" /> Agenda e horários dinâmicos</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/cadastro')}
                className="w-full mt-8 py-3 bg-[#8C6D42] hover:bg-[#6E5431] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Testar 14 Dias Grátis
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif font-light text-2xl sm:text-3xl text-[#3A3330]">Dúvidas Frequentes</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="border border-[#EDE3DE] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#3A3330] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-[#8C6D42]">{isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
                </button>
                {isOpen && (
                  <div className="p-4 border-t border-[#FAF6F0] bg-[#FAF6F0]/30 text-xs text-[#6B5E59] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#EDE3DE] py-12 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 px-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#8C6D42] flex items-center justify-center text-white font-serif font-bold text-xs">
              LH
            </div>
            <span className="font-serif font-bold text-base text-[#8C6D42] tracking-wide">
              Lash Hub
            </span>
          </div>
          <p className="text-xs text-[#A6938A]">
            © {new Date().getFullYear()} Lash Hub. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}

// Para evitar erro de importação de XCircle que não existia no import original
import { XCircle } from 'lucide-react';
