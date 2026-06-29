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

export default function LandingPage_BoldEditorial() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Minha cliente precisa baixar o app?',
      answer: 'Não. O sistema funciona pelo navegador do celular. A cliente salva como atalho na tela inicial com 1 clique. Rápido e prático.'
    },
    {
      question: 'O Lash Hub cobra taxas por agendamento?',
      answer: 'Não. Você não paga nenhuma porcentagem sobre os procedimentos que realiza. O faturamento é 100% seu.'
    },
    {
      question: 'Como funciona o teste de 14 dias?',
      answer: 'É totalmente grátis. Você faz o cadastro rápido e usa todas as funções Premium por 14 dias sem precisar de cartão.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-[#111111] font-sans antialiased selection:bg-[#E5DFD3] selection:text-[#111111]">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 py-5 bg-[#F6F5F0]/90 backdrop-blur-sm border-b border-[#E5DFD3] flex items-center justify-between z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="font-serif font-black text-xl tracking-tighter text-[#111111]">
            LASH HUB.
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-xs font-bold uppercase tracking-wider text-[#111111] hover:underline">
            Entrar
          </Link>
          <button
            onClick={() => navigate('/cadastro')}
            className="text-xs font-bold uppercase tracking-wider bg-[#111111] text-white hover:bg-[#C2583F] px-5 py-3 rounded-none transition-colors cursor-pointer"
          >
            Testar Grátis
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-left relative z-10">
        <div className="inline-flex items-center gap-2 text-[#C2583F] text-xs font-bold tracking-widest uppercase mb-6">
          <span>// LASH DESIGNERS AUTÔNOMAS</span>
        </div>

        <h1 className="font-serif font-normal text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] mb-8">
          SEU AGENDAMENTO. <br />
          <span className="font-serif italic text-[#C2583F]">COMPLETAMENTE</span> <br />
          AUTOMÁTICO.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
          <p className="text-base sm:text-lg text-[#444444] leading-relaxed">
            Suas clientes marcam horários sozinhas em 3 cliques. Você recebe notificações direto no celular e se desfaz do WhatsApp para fechar datas livre na agenda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/cadastro')}
              className="py-4.5 px-8 bg-[#C2583F] hover:bg-[#111111] text-white font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer flex items-center justify-between gap-4"
            >
              <span>EXPERIMENTAR 14 DIAS GRÁTIS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Mockups */}
        <div className="border border-[#E5DFD3] bg-white p-3 rounded-none shadow-sm max-w-4xl">
          <div className="bg-[#F6F5F0] aspect-video flex items-center justify-center p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
              
              <div className="bg-white border border-[#E5DFD3] p-6 flex flex-col justify-between text-left rounded-none">
                <div>
                  <div className="flex items-center gap-2 text-[#C2583F] mb-3">
                    <Smartphone className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">// APP CLIENTE</span>
                  </div>
                  <h3 className="font-serif text-xl mb-2 text-[#111111]">Link Personalizado</h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Um portal minimalista com a sua identidade visual para as clientes escolherem serviços e marcarem horários rapidamente.
                  </p>
                </div>
                <div className="text-[10px] uppercase font-bold text-[#999999] border-t border-[#F6F5F0] pt-3">
                  ✓ Interface limpa e rápida
                </div>
              </div>

              <div className="hidden md:flex bg-white border border-[#E5DFD3] p-6 flex-col justify-between text-left rounded-none">
                <div>
                  <div className="flex items-center gap-2 text-[#C2583F] mb-3">
                    <Calendar className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">// AGENDA SOLO</span>
                  </div>
                  <h3 className="font-serif text-xl mb-2 text-[#111111]">Gestão Sem Complicações</h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Veja horários, bloqueie datas e salve detalhes de mapping, curvatura e espessura das extensões de forma rápida.
                  </p>
                </div>
                <div className="text-[10px] uppercase font-bold text-[#999999] border-t border-[#F6F5F0] pt-3">
                  ✓ Sem tabelas fiscais de grandes clínicas
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* WHY LASH HUB IS DIFFERENT */}
      <section className="py-20 bg-white border-y border-[#E5DFD3]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#111111]">
              DESENHADO APENAS PARA A LASH SOLO.
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#C2583F] mt-2">
              Compare as abordagens do mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-[#E5DFD3] text-left">
              <h3 className="font-serif text-lg text-red-600 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                SISTEMAS DE SALÃO COMUNS
              </h3>
              <ul className="space-y-3.5 text-xs text-[#555555]">
                <li>• Feitos para grandes clínicas com múltiplos profissionais cadastrados.</li>
                <li>• Telas com dezenas de gráficos financeiros difíceis de ler.</li>
                <li>• Exigem cadastros complexos e longos para marcar um horário.</li>
                <li>• Cobram porcentagens ou comissões adicionais por agendamento.</li>
              </ul>
            </div>

            <div className="p-8 border-2 border-[#111111] text-left relative">
              <div className="absolute -top-3 right-6 bg-[#C2583F] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                FOCO SOLO
              </div>
              <h3 className="font-serif text-lg text-[#111111] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C2583F]" />
                LASH HUB
              </h3>
              <ul className="space-y-3.5 text-xs text-[#111111] font-bold">
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#C2583F] flex-shrink-0 mt-0.5" /> Focado 100% no atendimento individual da Lash autônoma.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#C2583F] flex-shrink-0 mt-0.5" /> Apenas as telas de agenda, CRM simples e ganhos.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#C2583F] flex-shrink-0 mt-0.5" /> Agendamento em 3 cliques para a cliente.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#C2583F] flex-shrink-0 mt-0.5" /> Mensalidade fixa e transparente, sem cobrar taxas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111]">
            RECURSOS ESSENCIAIS.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 border border-[#E5DFD3] text-left bg-white">
            <div className="w-10 h-10 bg-[#F6F5F0] text-[#C2583F] flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg mb-2 text-[#111111]">Agendamento 24h</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Disponibilize seu portal de horários livres online. Suas clientes agendam sem precisar falar no WhatsApp.
            </p>
          </div>

          <div className="p-6 border border-[#E5DFD3] text-left bg-white">
            <div className="w-10 h-10 bg-[#F6F5F0] text-[#C2583F] flex items-center justify-center mb-4">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg mb-2 text-[#111111]">Notificações Grátis</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Receba avisos instantâneos na barra do celular a cada nova marcação realizada.
            </p>
          </div>

          <div className="p-6 border border-[#E5DFD3] text-left bg-white">
            <div className="w-10 h-10 bg-[#F6F5F0] text-[#C2583F] flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg mb-2 text-[#111111]">Histórico Rápido</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Consulte mappings, curvatura e espessura da cliente com poucos toques no celular.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-[#F6F5F0] border-t border-[#E5DFD3]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-3">
            ASSINATURA SIMPLES.
          </h2>
          <p className="text-xs uppercase tracking-widest text-[#C2583F] mb-12">
            Teste grátis por 14 dias sem cadastrar cartão de crédito.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
            
            {/* Plano Básico */}
            <div className="bg-white border border-[#E5DFD3] p-8 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold text-[#999999] uppercase tracking-wider mb-2">BÁSICO</p>
                <h3 className="font-serif text-xl mb-4 text-[#111111]">Gestão de Lash</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-xs text-[#555555]">R$</span>
                  <span className="font-serif text-3xl font-bold text-[#111111] ml-0.5">59,90</span>
                  <span className="text-xs text-[#555555] ml-0.5">/mês</span>
                </div>
                <ul className="space-y-3 text-xs text-[#555555] border-t border-[#F6F5F0] pt-6">
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#C2583F]" /> Clientes ilimitados</li>
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#C2583F]" /> Histórico de fichas de Lash</li>
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#C2583F]" /> Ganhos mensais simplificados</li>
                  <li className="text-[#A8949B] line-through">× Sem agendamento online</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/cadastro')}
                className="w-full mt-8 py-3 border border-[#111111] text-[#111111] font-bold uppercase tracking-wider text-xs hover:bg-[#F6F5F0] transition-colors cursor-pointer"
              >
                Cadastrar Grátis
              </button>
            </div>

            {/* Plano Premium */}
            <div className="bg-white border-2 border-[#111111] p-8 flex flex-col justify-between relative shadow-sm">
              <div className="absolute -top-3 right-6 bg-[#C2583F] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                RECOMENDADO
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#C2583F] uppercase tracking-wider mb-2">PREMIUM</p>
                <h3 className="font-serif text-xl mb-4 text-[#111111]">Automação Completa</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-xs text-[#C2583F]">R$</span>
                  <span className="font-serif text-3xl font-bold text-[#C2583F] ml-0.5">99,90</span>
                  <span className="text-xs text-[#555555] ml-0.5">/mês</span>
                </div>
                <ul className="space-y-3 text-xs text-[#111111] font-bold border-t border-[#F6F5F0] pt-6">
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#C2583F]" /> Tudo do Plano Básico</li>
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#C2583F]" /> Portal de Agendamento Online 24h</li>
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#C2583F]" /> Avisos imediatos na barra do celular</li>
                  <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-[#C2583F]" /> Bloqueio de horários e folgas</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/cadastro')}
                className="w-full mt-8 py-3 bg-[#C2583F] hover:bg-[#111111] text-white font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
              >
                Testar 14 Dias Grátis
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center relative z-10">
        <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h2 className="font-serif text-xl text-[#111111] mb-2">
          7 dias de garantia incondicional
        </h2>
        <p className="text-xs text-[#555555] leading-relaxed max-w-xl mx-auto">
          Teste o Lash Hub. Se em até 7 dias decidir que o sistema não facilita a sua rotina solo, devolvemos seu dinheiro integralmente, de forma rápida e transparente.
        </p>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-xl text-[#111111]">Perguntas Comuns</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="border border-[#E5DFD3] rounded-none overflow-hidden bg-white">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-xs uppercase tracking-wider text-[#111111] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-[#C2583F]">{isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
                </button>
                {isOpen && (
                  <div className="p-4 border-t border-[#E5DFD3] bg-[#F6F5F0] text-xs text-[#555555] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-white py-12 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 px-6">
          <span className="font-serif font-black text-lg tracking-tighter">
            LASH HUB.
          </span>
          <p className="text-[10px] text-[#777777] uppercase tracking-widest">
            © {new Date().getFullYear()} Lash Hub. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
