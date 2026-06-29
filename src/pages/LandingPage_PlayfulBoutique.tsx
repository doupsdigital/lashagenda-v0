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

export default function LandingPage_PlayfulBoutique() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Preciso baixar o aplicativo pela loja?',
      answer: 'Não. É muito mais simples! Você e suas clientes adicionam o link do seu estúdio na tela inicial do celular com 1 clique. Funciona igual a um aplicativo, sem ocupar a memória do celular.'
    },
    {
      question: 'O sistema cobra taxas ou comissão por agendamento?',
      answer: 'De jeito nenhum. O dinheiro do seu trabalho é 100% seu. Nós cobramos apenas uma assinatura mensal fixa para manter o aplicativo no ar.'
    },
    {
      question: 'Como funciona o teste grátis?',
      answer: 'Você pode testar todas as funcionalidades Premium por 14 dias sem pagar nada e sem precisar cadastrar cartão de crédito.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9FA] text-[#4A3B40] font-sans antialiased selection:bg-[#FCDDEC] selection:text-[#9C4D76]">
      
      {/* CUTE DECORATIVE BLOBS */}
      <div className="absolute top-[-5%] left-[-10%] w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-[#FFE3E8] blur-[80px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] rounded-full bg-[#EBF0FF] blur-[100px] pointer-events-none" />

      {/* HEADER */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-5xl px-5 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-[#FFE3E8] shadow-sm flex items-center justify-between z-50">
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-full bg-[#D45D8C] flex items-center justify-center shadow-inner text-white font-black text-sm">
            LH
          </div>
          <span className="font-bold text-lg text-[#D45D8C] tracking-wide">
            Lash Hub
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-xs sm:text-sm font-semibold text-[#8A797F] hover:text-[#D45D8C] transition-colors">
            Entrar
          </Link>
          <button
            onClick={() => navigate('/cadastro')}
            className="text-xs sm:text-sm font-bold bg-[#D45D8C] hover:bg-[#B64271] text-white px-4.5 py-2 rounded-xl shadow-md shadow-[#D45D8C]/10 transition-all cursor-pointer flex items-center gap-1"
          >
            Fazer Cadastro
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 px-4 max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF0F3] text-[#D45D8C] rounded-full text-xs font-bold tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          Feito com carinho para Lash Designers Solo
        </div>

        <h1 className="font-sans font-extrabold text-3xl sm:text-5xl text-[#3D2C31] tracking-tight leading-[1.15] mb-5">
          Tenha o seu próprio aplicativo de agendamentos e valorize sua marca
        </h1>

        <p className="text-sm sm:text-base text-[#7D666E] max-w-xl mx-auto mb-8 leading-relaxed">
          Suas clientes agendam sozinhas em segundos pelo link do seu estúdio. Um sistema fofo, prático e muito simples de usar no dia a dia.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto mb-16">
          <button
            onClick={() => navigate('/cadastro')}
            className="py-3 px-6 bg-[#D45D8C] hover:bg-[#B64271] text-white rounded-xl font-bold shadow-lg transition-all cursor-pointer"
          >
            Experimentar 14 Dias Grátis
          </button>
        </div>

        {/* Visual Mockups */}
        <div className="relative rounded-3xl border border-[#FFE3E8] bg-white p-3.5 shadow-md max-w-2xl mx-auto">
          <div className="rounded-2xl overflow-hidden bg-[#FFF9FA] aspect-video flex items-center justify-center p-5 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
              
              <div className="bg-white border border-[#FFE3E8] rounded-xl p-4.5 flex flex-col justify-between text-left shadow-sm">
                <div>
                  <div className="flex items-center gap-2 text-[#D45D8C] mb-2.5">
                    <Smartphone className="w-4.5 h-4.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Celular da Cliente</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#3D2C31] mb-1">Seu Link Exclusivo</h3>
                  <p className="text-xs text-[#7D666E] leading-relaxed">
                    A cliente entra no seu link, seleciona a aplicação de cílios e escolhe a data livre na sua agenda. Muito fofo e fácil!
                  </p>
                </div>
                <div className="text-[9px] text-[#A8949B] border-t border-[#FFF9FA] pt-2">
                  ✓ Muito mais profissional que o WhatsApp
                </div>
              </div>

              <div className="hidden md:flex bg-white border border-[#FFE3E8] rounded-xl p-4.5 flex-col justify-between text-left shadow-sm">
                <div>
                  <div className="flex items-center gap-2 text-[#D45D8C] mb-2.5">
                    <Calendar className="w-4.5 h-4.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Sua Agenda Solo</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#3D2C31] mb-1">Organização Simples</h3>
                  <p className="text-xs text-[#7D666E] leading-relaxed">
                    Você recebe um aviso no celular a cada novo agendamento. Sem telas de contabilidade complexas de grandes clínicas.
                  </p>
                </div>
                <div className="text-[9px] text-[#A8949B] border-t border-[#FFF9FA] pt-2">
                  ✓ Controle de faltas e anamnese rápida
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* COMPARATIVE */}
      <section className="py-16 bg-[#FFF2F4] border-y border-[#FFE3E8]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D2C31]">
              Por que usar sistemas complicados de salão?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/70 border border-[#FFE3E8] text-left">
              <h3 className="font-bold text-sm text-red-600 mb-3 flex items-center gap-2">
                <XCircle className="w-4.5 h-4.5" />
                Sistemas Tradicionais
              </h3>
              <ul className="space-y-2 text-xs text-[#7D666E]">
                <li>• Feitos para grandes clínicas com comissões de funcionários.</li>
                <li>• Telas com dezenas de botões complexos.</li>
                <li>• Processo de agendamento cansativo para a cliente.</li>
                <li>• Cobram taxas por agendamento ou comissões extras.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-[#D45D8C] text-left shadow-sm">
              <h3 className="font-bold text-sm text-[#D45D8C] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5" />
                Lash Hub (Foco Solo)
              </h3>
              <ul className="space-y-2 text-xs text-[#4A3B40] font-medium">
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> 100% pensado na Lash que atende sozinha.</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> Painel simples e amigável: agenda e clientes.</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> Cliente marca horário sozinha em 3 cliques.</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> Mensalidade fixa e transparente, sem nenhuma taxa.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D2C31]">
            Facilidade no seu dia a dia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-5 bg-white border border-[#FFE3E8] rounded-2xl shadow-sm text-left">
            <div className="w-9 h-9 bg-[#FFF0F3] text-[#D45D8C] rounded-lg flex items-center justify-center mb-3.5">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-sm text-[#3D2C31] mb-1">Agendamento 24h</h3>
            <p className="text-xs text-[#7D666E] leading-relaxed">
              Sua cliente agenda sozinha pelo link, mesmo de madrugada ou enquanto você atende.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#FFE3E8] rounded-2xl shadow-sm text-left">
            <div className="w-9 h-9 bg-[#FFF0F3] text-[#D45D8C] rounded-lg flex items-center justify-center mb-3.5">
              <Bell className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-sm text-[#3D2C31] mb-1">Avisos na hora</h3>
            <p className="text-xs text-[#7D666E] leading-relaxed">
              Você recebe avisos na tela do celular a cada novo agendamento, sem pagar tarifas de WhatsApp.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#FFE3E8] rounded-2xl shadow-sm text-left">
            <div className="w-9 h-9 bg-[#FFF0F3] text-[#D45D8C] rounded-lg flex items-center justify-center mb-3.5">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-sm text-[#3D2C31] mb-1">Prontuário de Lash</h3>
            <p className="text-xs text-[#7D666E] leading-relaxed">
              Guarde os detalhes de curvatura, espessura e mapping preferidos de cada cliente de forma rápida.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 bg-[#FFF9FA] border-t border-[#FFE3E8]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D2C31] mb-3">
            Nossos Planos
          </h2>
          <p className="text-xs text-[#7D666E] mb-10">
            Experimente por 14 dias grátis, sem cartão de crédito cadastrado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
            
            {/* Plano Básico */}
            <div className="bg-white border border-[#FFE3E8] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[10px] font-bold text-[#A8949B] uppercase tracking-wider mb-1">Básico</p>
                <h3 className="text-sm font-bold text-[#3D2C31] mb-3">Gestão de Lash</h3>
                <div className="flex items-baseline mb-5">
                  <span className="text-xs text-[#7D666E]">R$</span>
                  <span className="text-3xl font-extrabold text-[#3D2C31] ml-0.5">59,90</span>
                  <span className="text-xs text-[#7D666E] ml-0.5">/mês</span>
                </div>
                <ul className="space-y-2 text-xs text-[#7D666E] border-t border-[#FFF9FA] pt-4">
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> Clientes ilimitadas</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> Fichas e prontuários de Lash</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> Resumo de faturamento</li>
                  <li className="text-[#A8949B] line-through">× Sem Portal de Agendamento</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/cadastro')}
                className="w-full mt-6 py-2.5 border border-[#D45D8C] text-[#D45D8C] hover:bg-[#FFF0F3] rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cadastrar Grátis
              </button>
            </div>

            {/* Plano Premium */}
            <div className="bg-white border-2 border-[#D45D8C] rounded-2xl p-6 flex flex-col justify-between relative shadow-md">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D45D8C] text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                Mais Pedido
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#D45D8C] uppercase tracking-wider mb-1">Premium</p>
                <h3 className="text-sm font-bold text-[#3D2C31] mb-3">Automação Completa</h3>
                <div className="flex items-baseline mb-5">
                  <span className="text-xs text-[#D45D8C]">R$</span>
                  <span className="text-3xl font-extrabold text-[#D45D8C] ml-0.5">99,90</span>
                  <span className="text-xs text-[#7D666E] ml-0.5">/mês</span>
                </div>
                <ul className="space-y-2 text-xs text-[#4A3B40] font-medium border-t border-[#FFF9FA] pt-4">
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> Tudo do Plano Básico</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> Portal de Agendamento Online 24h</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> Avisos diretos na tela do celular</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D45D8C]" /> Controle de folgas e bloqueios</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/cadastro')}
                className="w-full mt-6 py-2.5 bg-[#D45D8C] hover:bg-[#B64271] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Testar 14 Dias Grátis
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-14 px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-[#3D2C31] mb-2">
          7 dias de garantia total
        </h2>
        <p className="text-xs text-[#7D666E] leading-relaxed max-w-xl mx-auto">
          Use o Lash Hub no seu estúdio. Se em até 7 dias você decidir que o aplicativo não serve para você, devolvemos seu dinheiro integralmente, de forma amigável.
        </p>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg font-bold text-[#3D2C31]">Dúvidas Comuns</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="border border-[#FFE3E8] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-[#4A3B40] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-[#D45D8C]">{isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
                </button>
                {isOpen && (
                  <div className="p-4 border-t border-[#FFE3E8] bg-[#FFF0F3]/20 text-xs text-[#7D666E] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#FFE3E8] py-10 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 px-6">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-[#D45D8C] flex items-center justify-center text-white font-bold text-xs">
              LH
            </div>
            <span className="font-bold text-sm text-[#D45D8C] tracking-wide">
              Lash Hub
            </span>
          </div>
          <p className="text-[10px] text-[#A8949B]">
            © {new Date().getFullYear()} Lash Hub. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
