import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';

const P = {
  bg: '#ffffff',
  text: '#0a0a0a',
  muted: '#6b6b6b',
  faint: '#d4d4d4',
  border: '#e8e8e8',
  accent: '#e91e8c',
  accentLight: '#fff0f8',
  card: '#fafafa',
};

export default function LandingPage_v9() {
  const navigate = useNavigate();

  return (
    <div style={{ background: P.bg, color: P.text, minHeight: '100vh', fontFamily: 'inherit', overflowX: 'hidden' }}>

      {/* ── HEADER ── */}
      <header style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 32px)', maxWidth: 1040, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', border: `1px solid ${P.border}`, borderRadius: 999, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100, boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, color: '#fff' }}>LH</div>
          <span className="hidden min-[380px]:inline" style={{ fontWeight: 800, fontSize: 17, color: P.accent }}>Lash Hub</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/login" style={{ color: P.muted, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Entrar</Link>
          <button onClick={() => navigate('/cadastro')} style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 999, padding: '9px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            Começar grátis <ArrowRight size={13} />
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ padding: '120px 20px 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>

          {/* Giant stat */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-0" style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 'clamp(120px, 22vw, 260px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: -8, color: P.accent, marginRight: 24 }}>
              3
            </div>
            <div style={{ paddingBottom: 'clamp(12px, 2vw, 28px)' }}>
              <div style={{ fontSize: 'clamp(24px, 4vw, 52px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: -1, color: P.text, marginBottom: 12 }}>
                cliques.
              </div>
              <div style={{ fontSize: 'clamp(14px, 2vw, 20px)', color: P.muted, lineHeight: 1.6, maxWidth: 480 }}>
                É tudo que sua cliente precisa pra marcar horário com você. Sem te chamar no WhatsApp. Sem esperar resposta.
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: 1, background: P.border, marginBottom: 40 }} />

          {/* Sub statement */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start" style={{ marginBottom: 56 }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: P.accent, display: 'block', marginBottom: 12 }}>Feito só pra Lash Designer</span>
              <p style={{ fontSize: 'clamp(15px, 2vw, 19px)', color: P.muted, lineHeight: 1.7 }}>
                O Lash Hub é o sistema criado do zero pra quem atende cílios por conta própria. Não é sistema de salão. Não é pra equipe. É pra você.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 'clamp(15px, 2vw, 19px)', color: P.muted, lineHeight: 1.7 }}>
                Agenda das clientes, ficha de cada uma, controle dos seus ganhos. Tudo num lugar só, simples, no celular.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={() => navigate('/cadastro')} style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 14, padding: '16px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: `0 8px 32px rgba(233,30,140,0.3)` }}>
              Testar 14 dias de graça <ArrowRight size={16} />
            </button>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginLeft: 8 }}>
              {['Sem cartão', '14 dias grátis', 'Garantia 7 dias'].map(b => (
                <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: P.muted }}>
                  <Check size={13} color={P.accent} /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN SECTION ── */}
      <section style={{ padding: '80px 20px', borderTop: `1px solid ${P.border}`, marginTop: 80 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: P.muted, marginBottom: 24 }}>O problema</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: -1, marginBottom: 24 }}>
                Você trabalha com cílios.<br />
                <span style={{ color: P.accent }}>Não com burocracia.</span>
              </h2>
              <p style={{ fontSize: 16, color: P.muted, lineHeight: 1.8 }}>
                Mas o WhatsApp não para. Tem mensagem pra marcar horário, pra confirmar, pra remarcar. Tem cliente que some e não avisa. Tem horário que você não sabe se está preenchido.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: P.accent, marginBottom: 24 }}>A solução</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { title: 'Agenda automática', desc: 'Suas clientes agendam sozinhas pelo link do seu estúdio.' },
                  { title: 'Aviso no celular', desc: 'Você recebe notificação na hora que alguém agendar.' },
                  { title: 'Ficha de cada cliente', desc: 'Curvatura, espessura, mapping — tudo salvo e acessível.' },
                  { title: 'Controle dos ganhos', desc: 'Quanto faturou hoje, essa semana, esse mês.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', paddingBottom: 16, borderBottom: i < 3 ? `1px solid ${P.border}` : 'none' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: P.accent, marginTop: 8, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: P.muted, lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section style={{ padding: '0 20px', background: P.text }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ borderLeft: '1px solid #2a2a2a' }}>
            {[
              { num: '24h', label: 'Agenda aberta por dia', desc: 'Suas clientes agendam quando quiserem, sem depender de você estar disponível.' },
              { num: 'R$0', label: 'De taxa por atendimento', desc: 'Mensalidade fixa. Tudo que você ganha no estúdio é seu.' },
              { num: '14', label: 'Dias de teste grátis', desc: 'Sem cartão de crédito. Só entra e experimenta.' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '56px 40px', borderRight: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' }}>
                <div style={{ fontSize: 'clamp(48px, 7vw, 72px)', fontWeight: 900, color: P.accent, lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f0f0', marginBottom: 10 }}>{s.label}</div>
                <p style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 20px', borderTop: `1px solid ${P.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: P.accent, marginBottom: 40 }}>Como funciona</div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: `1px solid ${P.border}` }}>
            {[
              { n: '01', title: 'Você compartilha o link', desc: 'Cole na bio do Instagram ou mande no WhatsApp. É o link do seu estúdio digital.' },
              { n: '02', title: 'Sua cliente salva no celular', desc: 'Ela abre o link, salva como ícone na tela inicial. Fica lá, como um app, com o nome do seu estúdio.' },
              { n: '03', title: 'Ela agenda, você recebe o aviso', desc: 'Ela escolhe o serviço e horário. Você recebe notificação no celular. A agenda atualiza sozinha.' },
            ].map((s, i) => (
              <div key={i}
                className={i < 2 ? 'py-10 px-6 border-b md:border-b-0 md:border-r' : 'py-10 px-6'}
                style={{ borderColor: P.border }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: P.faint, lineHeight: 1, marginBottom: 20 }}>{s.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '80px 20px', background: P.card, borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: P.accent, marginBottom: 40 }}>O que dizem as Lash Designers</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: 'Minha agenda nunca mais ficou bagunçada. As clientes agendam sozinhas e eu só apareço pra atender.', name: 'Mariana Silva', role: 'Lash Designer • Mariana Cílios' },
              { text: 'Antes abria o WhatsApp e tinha 30 mensagens pra marcar horário. Hoje não existe mais isso na minha vida.', name: 'Beatriz Oliveira', role: 'Lash Designer • Bia Lash' },
              { text: 'A ficha de cada cliente fica salva. Lembro da curvatura e do mapping de todas sem precisar anotar em papel.', name: 'Gabriela Costa', role: 'Lash Designer • Gabi Cílios' },
            ].map((t, i) => (
              <div key={i} style={{ borderTop: `3px solid ${i === 0 ? P.accent : P.border}`, paddingTop: 24 }}>
                <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.8, fontStyle: 'italic', marginBottom: 24 }}>"{t.text}"</p>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: P.faint, marginTop: 2 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-start">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: P.accent, marginBottom: 16 }}>Planos</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: -1 }}>
                Mensalidade fixa.<br />Zero taxa por atendimento.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4" style={{ flex: 1.4 }}>
              <div style={{ flex: 1, background: P.card, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: P.muted, marginBottom: 12 }}>Básico</div>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 11, color: P.muted }}>R$ </span>
                  <span style={{ fontSize: 42, fontWeight: 900, letterSpacing: -2 }}>59,90</span>
                  <span style={{ fontSize: 11, color: P.muted }}>/mês</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20, borderTop: `1px solid ${P.border}`, marginBottom: 24 }}>
                  {['Ficha de cada cliente', 'Histórico de atendimentos', 'Controle dos ganhos'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: P.muted }}>
                      <Check size={13} color={P.accent} /> {f}
                    </div>
                  ))}
                  <div style={{ fontSize: 12, color: P.faint, marginTop: 4 }}>— Sem agenda online</div>
                </div>
                <button onClick={() => navigate('/cadastro')} style={{ width: '100%', padding: '12px 0', border: `1.5px solid ${P.accent}`, borderRadius: 12, background: 'transparent', color: P.accent, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  Criar conta grátis
                </button>
              </div>

              <div style={{ flex: 1, background: P.text, borderRadius: 20, padding: 28 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: P.accent, marginBottom: 12 }}>Premium</div>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 11, color: '#6b6b6b' }}>R$ </span>
                  <span style={{ fontSize: 42, fontWeight: 900, color: '#fff', letterSpacing: -2 }}>99,90</span>
                  <span style={{ fontSize: 11, color: '#6b6b6b' }}>/mês</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20, borderTop: '1px solid #2a2a2a', marginBottom: 24 }}>
                  {['Tudo do básico', 'Agenda online 24h', 'App para suas clientes', 'Avisos no celular'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#d4d4d4' }}>
                      <Check size={13} color={P.accent} /> {f}
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate('/cadastro')} style={{ width: '100%', padding: '12px 0', border: 'none', borderRadius: 12, background: P.accent, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  Testar 14 dias grátis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section style={{ padding: '60px 20px', background: P.accentLight, borderTop: `1px solid rgba(233,30,140,0.1)` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <ShieldCheck size={32} color={P.accent} style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>7 dias de garantia incondicional</h3>
            <p style={{ fontSize: 14, color: P.muted }}>Use na sua rotina. Se não ajudou, devolvemos seu dinheiro. Sem burocracia, sem pergunta.</p>
          </div>
          <button onClick={() => navigate('/cadastro')} style={{ marginLeft: 'auto', background: P.accent, color: '#fff', border: 'none', borderRadius: 999, padding: '12px 24px', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', flexShrink: 0 }}>
            Começar agora <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: -3, color: P.text, marginBottom: 24 }}>
            Comece<br />
            <span style={{ color: P.accent }}>hoje.</span>
          </div>
          <p style={{ fontSize: 17, color: P.muted, lineHeight: 1.7, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
            14 dias grátis. Sem cartão de crédito. Sua agenda já pode estar funcionando automaticamente ainda hoje.
          </p>
          <button onClick={() => navigate('/cadastro')} style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 16, padding: '20px 48px', fontWeight: 900, fontSize: 18, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: `0 20px 60px rgba(233,30,140,0.35)` }}>
            Criar conta grátis <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '32px 20px', borderTop: `1px solid ${P.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: '#fff' }}>LH</div>
          <span style={{ fontWeight: 800, fontSize: 14, color: P.accent }}>Lash Hub</span>
        </div>
        <p style={{ fontSize: 11, color: P.faint }}>© {new Date().getFullYear()} Lash Hub. Todos os direitos reservados.</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link to="/login" style={{ fontSize: 11, color: P.faint, textDecoration: 'none' }}>Login</Link>
          <span style={{ color: P.faint }}>•</span>
          <Link to="/cadastro" style={{ fontSize: 11, color: P.faint, textDecoration: 'none' }}>Cadastro</Link>
        </div>
      </footer>

    </div>
  );
}
