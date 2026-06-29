import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, Check, Bell, Calendar, BookOpen,
  TrendingUp, Clock, ShieldCheck, Sparkles,
} from 'lucide-react';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.getAttribute('data-delay') ?? '0');
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, delay);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-sr6]').forEach((el) => {
      const h = el as HTMLElement;
      h.style.opacity = '0';
      h.style.transform = 'translateY(28px)';
      h.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

function useCounter(target: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (frame >= totalFrames) { setValue(target); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return value;
}

const P = {
  bg: '#faf8f5',
  card: '#ffffff',
  border: '#ede9e3',
  borderDark: '#ddd5cc',
  accent: '#c84b72',
  accentLight: '#fbedf2',
  accentDark: '#a33a5c',
  text: '#1a1220',
  muted: '#7a6b78',
  faint: '#c4b8c0',
};

const features = [
  { icon: <Calendar size={20} />, title: 'Agenda aberta 24h', desc: 'Suas clientes agendam sozinhas pelo link do seu estúdio. De madrugada. No feriado. Quando quiserem.' },
  { icon: <Bell size={20} />, title: 'Aviso na hora', desc: 'Receba notificação no celular assim que uma cliente agendar. Você não precisa checar nada.' },
  { icon: <BookOpen size={20} />, title: 'Ficha de cada cliente', desc: 'Curvatura, espessura, mapping. Histórico de todos os atendimentos. Consultável em segundos.' },
  { icon: <TrendingUp size={20} />, title: 'Seus ganhos do mês', desc: 'Acompanhe seu faturamento por dia, semana e mês. Sem planilha. Sem complicação.' },
  { icon: <Clock size={20} />, title: 'Horários bloqueados', desc: 'Folga, almoço, compromisso. Bloqueia o horário e ninguém consegue agendar nesse período.' },
  { icon: <Sparkles size={20} />, title: 'App para as suas clientes', desc: 'Elas salvam o link do seu estúdio no celular como ícone. Parece um app — porque é, mas sem baixar de loja.' },
];

const testimonials = [
  { text: 'Nunca mais fui acordada às 23h por mensagem de agendamento. As clientes resolvem tudo sozinhas pelo app do estúdio.', name: 'Mariana Silva', role: 'Lash Designer • Mariana Cílios' },
  { text: 'O que mais amo é a ficha de cada cliente. Chego no atendimento já sabendo a curvatura, espessura e tudo do histórico dela.', name: 'Beatriz Oliveira', role: 'Lash Designer • Bia Lash' },
  { text: 'Minha agenda nunca mais ficou bagunçada. E ver o quanto faturei no mês sem precisar contar no papel é incrível.', name: 'Gabriela Costa', role: 'Lash Designer • Gabi Cílios' },
];

export default function LandingPage_v6() {
  const navigate = useNavigate();
  useScrollReveal();

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const c24 = useCounter(24, 1000, statsVisible);
  const c3 = useCounter(3, 600, statsVisible);
  const c0 = useCounter(0, 400, statsVisible);

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.setAttribute('id', 'v6-keyframes');
    styleTag.textContent = `
      @keyframes v6float {
        0%, 100% { transform: translateY(0px) rotate(-1.5deg); }
        50% { transform: translateY(-18px) rotate(1.5deg); }
      }
      @keyframes v6floatB {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes v6pulse {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.04); }
      }
    `;
    document.head.appendChild(styleTag);
    return () => { const s = document.getElementById('v6-keyframes'); if (s) s.remove(); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true);
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: P.bg, color: P.text, minHeight: '100vh', fontFamily: 'inherit', overflowX: 'hidden' }}>

      {/* Decorative blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,75,114,0.08) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,75,114,0.06) 0%, transparent 70%)' }} />
      </div>

      {/* ── HEADER ── */}
      <header style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 32px)', maxWidth: 1040, background: 'rgba(250,248,245,0.88)', backdropFilter: 'blur(20px)', border: `1px solid ${P.border}`, borderRadius: 999, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${P.accent}, #e88faa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, color: '#fff' }}>LH</div>
          <span className="hidden min-[380px]:inline" style={{ fontWeight: 800, fontSize: 17, background: `linear-gradient(135deg, ${P.accent}, #e88faa)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lash Hub</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/login" style={{ color: P.muted, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Entrar</Link>
          <button onClick={() => navigate('/cadastro')} style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 999, padding: '9px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: `0 4px 16px rgba(200,75,114,0.3)` }}>
            Começar grátis <ArrowRight size={13} />
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', padding: '120px 20px 80px', maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
        <div className="flex flex-col lg:flex-row items-center gap-12 w-full">

          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: P.accentLight, border: `1px solid rgba(200,75,114,0.2)`, borderRadius: 999, fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 28 }}>
              ✦ Feito só pra Lash Designer
            </div>

            <h1 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: -1.5, marginBottom: 20, color: P.text }}>
              Enquanto você aplica o{' '}
              <span style={{ color: P.accent }}>Volume Russo,</span>
              {' '}sua próxima cliente já agendou.
            </h1>

            <p style={{ fontSize: 16, color: P.muted, lineHeight: 1.8, marginBottom: 36, maxWidth: 520 }}>
              Com o Lash Hub, suas clientes marcam horário pelo app do seu estúdio. Sem precisar te chamar no WhatsApp. Sem depender de você estar disponível.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
              <button onClick={() => navigate('/cadastro')} style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 14, padding: '15px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: `0 8px 32px rgba(200,75,114,0.35)` }}>
                Testar 14 dias grátis <ArrowRight size={16} />
              </button>
              <Link to="/login" style={{ color: P.muted, fontSize: 14, fontWeight: 500, textDecoration: 'none', padding: '15px 20px', border: `1px solid ${P.border}`, borderRadius: 14, display: 'flex', alignItems: 'center' }}>
                Já tenho conta
              </Link>
            </div>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['14 dias grátis', 'Sem cartão de crédito', 'Garantia 7 dias'].map(b => (
                <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: P.muted }}>
                  <Check size={13} color={P.accent} /> {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Floating Mockup */}
          <div className="flex-1 flex justify-center" style={{ position: 'relative', minHeight: 400 }}>
            {/* Floating decorative circles — hidden on mobile to avoid overflow */}
            <div className="hidden sm:block" style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', border: `2px dashed rgba(200,75,114,0.2)`, animation: 'v6pulse 4s ease-in-out infinite' }} />
            <div className="hidden sm:block" style={{ position: 'absolute', bottom: 20, left: -30, width: 80, height: 80, borderRadius: '50%', background: P.accentLight, animation: 'v6floatB 3s ease-in-out infinite' }} />

            {/* Main mockup card */}
            <div style={{ width: '100%', maxWidth: 380, background: P.card, border: `1px solid ${P.border}`, borderRadius: 20, padding: 20, boxShadow: '0 32px 80px rgba(0,0,0,0.1)', animation: 'v6float 5s ease-in-out infinite', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${P.border}` }}>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: P.accent, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>App do Estúdio</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: P.text }}>Mari Lash Studio</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />
              </div>

              <div style={{ background: P.accentLight, border: `1px solid rgba(200,75,114,0.15)`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: P.accent, marginBottom: 6 }}>✦ Volume Russo — R$ 180</div>
                <div style={{ fontSize: 9, color: P.muted }}>Escolha a data e horário disponíveis</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                {['Segunda — 09:00', 'Segunda — 11:00', 'Terça — 14:00'].map((slot, i) => (
                  <div key={i} style={{ background: i === 0 ? P.accentLight : P.bg, border: `1px solid ${i === 0 ? 'rgba(200,75,114,0.3)' : P.border}`, borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? P.accent : P.muted }}>📅 {slot}</span>
                    {i === 0 && <span style={{ width: 6, height: 6, borderRadius: '50%', background: P.accent, display: 'inline-block' }} />}
                  </div>
                ))}
              </div>

              <button style={{ width: '100%', background: P.accent, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 0', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                Confirmar agendamento
              </button>

              <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${P.border}`, fontSize: 9, color: P.faint, textAlign: 'center' }}>
                Sua cliente agenda sozinha — você recebe o aviso na hora
              </div>
            </div>

            {/* Floating notification chip — hidden on mobile to avoid overflow */}
            <div className="hidden sm:flex" style={{ position: 'absolute', top: 10, left: -10, background: P.card, border: `1px solid ${P.border}`, borderRadius: 12, padding: '8px 14px', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', zIndex: 3, animation: 'v6floatB 4s ease-in-out infinite 1s' }}>
              <Bell size={14} color={P.accent} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: P.text }}>Nova marcação!</div>
                <div style={{ fontSize: 9, color: P.muted }}>Volume Russo • Segunda 09h</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── COUNTER STATS ── */}
      <section ref={statsRef} style={{ position: 'relative', zIndex: 1, padding: '60px 20px', background: P.accent }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
            <div>
              <div style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>
                {c24}h
              </div>
              <div style={{ fontSize: 14, opacity: 0.85 }}>Sua agenda aberta todo dia, o tempo todo</div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>
                {c3}
              </div>
              <div style={{ fontSize: 14, opacity: 0.85 }}>Cliques pra sua cliente agendar</div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>
                R${c0}
              </div>
              <div style={{ fontSize: 14, opacity: 0.85 }}>De taxa sobre cada atendimento</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px', background: '#f3f0eb' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div data-sr6="" style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: P.accent, marginBottom: 12 }}>Por que o Lash Hub é diferente</p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: -0.5 }}>
              Sistemas de salão não foram feitos<br />pra Lash Designer.
            </h2>
            <p style={{ fontSize: 15, color: P.muted, maxWidth: 520, margin: '12px auto 0', lineHeight: 1.7 }}>
              Eles têm comissões, equipes, múltiplos profissionais. Você atende por conta própria. Você precisa de outra coisa.
            </p>
          </div>

          <div data-sr6="" data-delay="100" className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            <div style={{ background: '#fff0f0', border: '1px solid #ffd0d0', borderRadius: 20, padding: 28 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#b91c1c', marginBottom: 16 }}>✗ Sistemas genéricos de salão</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Feitos pra equipes com 10, 20 funcionários', 'Cheios de menus que você nunca vai usar', 'Cobram porcentagem de cada atendimento', 'Você precisa de um computador pra usar direito'].map(i => (
                  <li key={i} style={{ fontSize: 13, color: '#7f1d1d', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#b91c1c', fontWeight: 700, marginTop: 1 }}>×</span> {i}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: P.accentLight, border: `2px solid ${P.accent}`, borderRadius: 20, padding: 28 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: P.accent, marginBottom: 16 }}>✓ Lash Hub</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Pensado pra quem trabalha com Lash por conta própria', 'Só o que você realmente precisa no dia a dia', 'Mensalidade fixa — 0% de taxa por atendimento', 'Feito pro celular, funciona de qualquer lugar'].map(i => (
                  <li key={i} style={{ fontSize: 13, color: P.accentDark, display: 'flex', alignItems: 'flex-start', gap: 8, fontWeight: 500 }}>
                    <Check size={14} color={P.accent} style={{ marginTop: 2, flexShrink: 0 }} /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <div data-sr6="" style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: -0.5 }}>
              Tudo que você precisa.<br />
              <span style={{ color: P.accent }}>Exatamente do jeito que você precisa.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} data-sr6="" data-delay={String(i * 80)} style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(200,75,114,0.12)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,75,114,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.borderColor = P.border; }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: P.accentLight, color: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: P.text }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px', background: '#f3f0eb' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <div data-sr6="" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 900, letterSpacing: -0.5 }}>O que dizem as Lash Designers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} data-sr6="" data-delay={String(i * 100)} style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ color: P.accent, fontSize: 14, marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.8, fontStyle: 'italic', marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ paddingTop: 14, borderTop: `1px solid ${P.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: P.text }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: P.faint, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px' }}>
        <div style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
          <div data-sr6="" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900, letterSpacing: -0.5, marginBottom: 12 }}>Planos sem taxa por atendimento</h2>
            <p style={{ fontSize: 14, color: P.muted }}>14 dias grátis pra testar. Sem precisar colocar cartão.</p>
          </div>
          <div data-sr6="" data-delay="100" className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: P.muted, marginBottom: 8 }}>Plano Básico</div>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 11, color: P.muted }}>R$ </span>
                <span style={{ fontSize: 40, fontWeight: 900, color: P.text }}>59,90</span>
                <span style={{ fontSize: 11, color: P.muted }}>/mês</span>
              </div>
              <div style={{ paddingTop: 20, borderTop: `1px solid ${P.border}`, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {['Ficha de cada cliente', 'Histórico de atendimentos', 'Controle dos seus ganhos'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: P.muted }}>
                    <Check size={14} color={P.accent} /> {f}
                  </div>
                ))}
                <div style={{ fontSize: 12, color: P.faint, marginTop: 4 }}>× Sem agenda online</div>
              </div>
              <button onClick={() => navigate('/cadastro')} style={{ width: '100%', padding: '12px 0', border: `1px solid ${P.accent}`, borderRadius: 12, background: 'transparent', color: P.accent, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                Criar conta grátis
              </button>
            </div>
            <div style={{ background: P.card, border: `2px solid ${P.accent}`, borderRadius: 20, padding: 28, position: 'relative', boxShadow: `0 8px 40px rgba(200,75,114,0.15)` }}>
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: P.accent, color: '#fff', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, padding: '4px 16px', borderRadius: 999, whiteSpace: 'nowrap' }}>Mais completo</div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: P.accent, marginBottom: 8 }}>Plano Premium</div>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 11, color: P.accent }}>R$ </span>
                <span style={{ fontSize: 40, fontWeight: 900, color: P.accent }}>99,90</span>
                <span style={{ fontSize: 11, color: P.muted }}>/mês</span>
              </div>
              <div style={{ paddingTop: 20, borderTop: `1px solid ${P.border}`, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {['Tudo do plano básico', 'Agenda online 24h', 'App para suas clientes', 'Avisos no celular'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: P.text }}>
                    <Check size={14} color={P.accent} /> {f}
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/cadastro')} style={{ width: '100%', padding: '12px 0', border: 'none', borderRadius: 12, background: P.accent, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: `0 4px 16px rgba(200,75,114,0.35)` }}>
                Testar 14 dias grátis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '56px 20px', textAlign: 'center', background: '#f3f0eb' }}>
        <div data-sr6="" style={{ maxWidth: 540, margin: '0 auto' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <ShieldCheck size={24} color="#10b981" />
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: P.text }}>7 dias de garantia incondicional</h3>
          <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.8 }}>
            Use na sua rotina real. Se em até 7 dias você achar que o Lash Hub não ajudou no seu dia a dia, devolvemos seu dinheiro integralmente. Sem burocracia, sem pergunta.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px', background: P.accent, textAlign: 'center' }}>
        <div data-sr6="" style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 52px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: -1, marginBottom: 20, color: '#fff' }}>
            Chega de perder horário<br />respondendo WhatsApp.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 40, lineHeight: 1.7 }}>
            Deixa o Lash Hub cuidar da agenda enquanto você cuida das clientes.
          </p>
          <button onClick={() => navigate('/cadastro')} style={{ background: '#fff', color: P.accent, border: 'none', borderRadius: 16, padding: '18px 40px', fontWeight: 800, fontSize: 16, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 16px 48px rgba(0,0,0,0.15)' }}>
            Criar conta grátis agora <ArrowRight size={18} />
          </button>
          <p style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Sem cartão de crédito. Cancele quando quiser.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 1, padding: '32px 20px', background: P.accentDark, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: P.accent }}>LH</div>
          <span style={{ fontWeight: 800, fontSize: 14, color: '#fff' }}>Lash Hub</span>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>© {new Date().getFullYear()} Lash Hub. Todos os direitos reservados.</p>
        <div style={{ marginTop: 12, display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/login" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Login</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
          <Link to="/cadastro" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Cadastro</Link>
        </div>
      </footer>

    </div>
  );
}
