import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Bell, Calendar, BookOpen, TrendingUp, Clock, ShieldCheck, Sparkles } from 'lucide-react';

// ── Animation presets ──────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: 'spring', stiffness: 300, damping: 24 } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const wordReveal = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

const stagger = (delay = 0.09, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren } },
});

// ── Palette ────────────────────────────────────────────────────────────────
const P = {
  bg: '#0d0d12',
  card1: '#141420',
  card2: '#18181f',
  border: '#22222e',
  accent: '#f72585',
  accentDim: 'rgba(247,37,133,0.1)',
  accentGlow: 'rgba(247,37,133,0.15)',
  text: '#f2f2f8',
  muted: '#7a7a92',
  faint: '#28282e',
};

// ── Hero words ─────────────────────────────────────────────────────────────
const heroLine1 = ['A', 'ferramenta', 'que', 'faltava'];
const heroLine2 = ['pra'];
const heroLine3 = ['Lash', 'Designer', 'de', 'verdade.'];

export default function LandingPage_v7() {
  const navigate = useNavigate();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 80));
  }, [scrollY]);

  const orb1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div style={{ background: P.bg, color: P.text, minHeight: '100vh', fontFamily: 'inherit', overflowX: 'hidden' }}>

      {/* ── AMBIENT ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <motion.div style={{ position: 'absolute', top: '-10%', left: '20%', width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle, ${P.accentGlow} 0%, transparent 65%)`, filter: 'blur(80px)', y: orb1Y }} />
        <motion.div style={{ position: 'absolute', bottom: '-5%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,37,133,0.06) 0%, transparent 70%)', filter: 'blur(80px)', y: orb2Y }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* ── HEADER ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        style={{ position: 'fixed', top: 16, left: '50%', x: '-50%', width: 'calc(100% - 32px)', maxWidth: 1040, zIndex: 100 }}
      >
        <motion.header
          animate={{
            background: scrolled ? 'rgba(13,13,18,0.96)' : 'rgba(13,13,18,0.72)',
            boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.6)' : 'none',
          }}
          transition={{ duration: 0.35 }}
          style={{ backdropFilter: 'blur(24px)', border: `1px solid ${P.border}`, borderRadius: 999, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${P.accent}, #ff85b3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, color: '#fff' }}>LH</div>
            <span className="hidden min-[380px]:inline" style={{ fontWeight: 800, fontSize: 17, background: `linear-gradient(135deg, ${P.accent}, #ff85b3)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lash Hub</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/login" style={{ color: P.muted, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Entrar</Link>
            <motion.button
              onClick={() => navigate('/cadastro')}
              whileHover={{ scale: 1.06, boxShadow: `0 0 32px rgba(247,37,133,0.55)` }}
              whileTap={{ scale: 0.95 }}
              transition={SPRING}
              style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 999, padding: '9px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              Começar grátis <ArrowRight size={13} />
            </motion.button>
          </div>
        </motion.header>
      </motion.div>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '130px 20px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: P.accentDim, border: `1px solid rgba(247,37,133,0.28)`, borderRadius: 999, fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 32 }}
          >
            ✦ Feito só pra Lash Designer
          </motion.div>

          {/* Word-by-word title */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={stagger(0.07, 0.5)}
            style={{ fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 900, lineHeight: 1.06, letterSpacing: -2, marginBottom: 20 }}
          >
            {heroLine1.map((w, i) => (
              <motion.span key={i} variants={wordReveal} style={{ display: 'inline-block', marginRight: '0.22em' }}>{w}</motion.span>
            ))}
            <br className="hidden sm:block" />
            {heroLine2.map((w, i) => (
              <motion.span key={`b${i}`} variants={wordReveal} style={{ display: 'inline-block', marginRight: '0.22em' }}>{w}</motion.span>
            ))}
            {heroLine3.map((w, i) => (
              <motion.span
                key={`p${i}`}
                variants={wordReveal}
                style={{ display: 'inline-block', marginRight: '0.22em', background: `linear-gradient(135deg, ${P.accent}, #ff85b3)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
            style={{ fontSize: 16, color: P.muted, maxWidth: 540, lineHeight: 1.8, margin: '0 auto 40px' }}
          >
            Não é sistema de salão. Não é pra clínica. É pra quem atende cílios por conta própria e quer organizar tudo num lugar só.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: EASE }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.button
              onClick={() => navigate('/cadastro')}
              whileHover={{ scale: 1.05, boxShadow: `0 16px 56px rgba(247,37,133,0.55)` }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 14, padding: '15px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: `0 10px 40px rgba(247,37,133,0.35)` }}
            >
              Testar 14 dias grátis <ArrowRight size={16} />
            </motion.button>
            <Link to="/login" style={{ color: P.muted, fontSize: 14, textDecoration: 'none', padding: '15px 24px', border: `1px solid ${P.border}`, borderRadius: 14, display: 'flex', alignItems: 'center', fontWeight: 500 }}>
              Já tenho conta
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── BENTO GRID ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '20px 20px 80px' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>

          {/* Row 1 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger(0.1)}
          >
            {/* Big hero card */}
            <motion.div
              className="md:col-span-2"
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: `0 24px 60px rgba(247,37,133,0.14)`, borderColor: 'rgba(247,37,133,0.35)' }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              style={{ background: `linear-gradient(135deg, rgba(247,37,133,0.12), rgba(247,37,133,0.04))`, border: `1px solid rgba(247,37,133,0.2)`, borderRadius: 20, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 240 }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: P.accentDim, color: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={22} /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: P.accent }}>Agenda online 24h</span>
                </div>
                <h2 style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 12 }}>
                  Suas clientes agendam sozinhas.<br />A qualquer hora.
                </h2>
                <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.7, maxWidth: 420 }}>
                  Elas acessam o link do seu estúdio, escolhem o serviço e o horário. Você recebe o aviso no celular na hora — sem precisar trocar nenhuma mensagem.
                </p>
              </div>
              <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['Sem WhatsApp pra agendar', 'Aviso instantâneo no celular', 'Disponível de madrugada'].map(t => (
                  <span key={t} style={{ fontSize: 11, color: P.accent, background: P.accentDim, border: `1px solid rgba(247,37,133,0.2)`, borderRadius: 999, padding: '4px 12px', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Small card — aviso */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: `0 20px 50px rgba(247,37,133,0.12)`, borderColor: 'rgba(247,37,133,0.3)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              style={{ background: P.card1, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: P.accentDim, color: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Bell size={20} /></div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Aviso na hora</h3>
                <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.6 }}>Notificação no celular assim que alguém agendar. Zero espera.</p>
              </div>
              <div style={{ marginTop: 20, fontSize: 32 }}>📲</div>
            </motion.div>
          </motion.div>

          {/* Row 2 */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger(0.1)}
          >
            {/* App clientes */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: 'rgba(247,37,133,0.3)', boxShadow: `0 20px 50px rgba(247,37,133,0.1)` }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              style={{ background: P.card1, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28 }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: P.accentDim, color: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Sparkles size={20} /></div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>App para as clientes</h3>
              <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.6 }}>Elas salvam o link do seu estúdio no celular como ícone. Parece app — porque é. Mas sem baixar de loja.</p>
            </motion.div>

            {/* Ficha da cliente — card destaque */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: `0 28px 64px rgba(247,37,133,0.18)` }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              style={{ background: P.card1, border: `2px solid rgba(247,37,133,0.28)`, borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: P.accentDim, filter: 'blur(20px)' }} />
              <div style={{ width: 44, height: 44, borderRadius: 12, background: P.accentDim, color: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><BookOpen size={20} /></div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Ficha de cada cliente</h3>
              <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.6, marginBottom: 16 }}>Curvatura, espessura, mapping, histórico. Tudo salvo e acessível na palma da sua mão.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[['Curvatura', 'D'], ['Espessura', '0.07'], ['Último atendimento', '28 dias']].map(([k, v]) => (
                  <div key={k} style={{ background: P.faint, borderRadius: 8, padding: '6px 10px', fontSize: 10, color: P.muted, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{k}</span>
                    <span style={{ color: P.accent, fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bloqueio de horários */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: 'rgba(247,37,133,0.3)', boxShadow: `0 20px 50px rgba(247,37,133,0.1)` }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              style={{ background: P.card1, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28 }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: P.accentDim, color: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Clock size={20} /></div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Bloqueio de horários</h3>
              <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.6 }}>Folga, almoço, compromisso pessoal. Bloqueia e ninguém consegue agendar nesse período.</p>
            </motion.div>
          </motion.div>

          {/* Row 3 */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger(0.1)}
          >
            {/* Stat card — R$0 taxa */}
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.03, boxShadow: `0 24px 60px rgba(247,37,133,0.3)` }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{ background: `linear-gradient(135deg, ${P.accent}, #b5006a)`, borderRadius: 20, padding: 28 }}
            >
              <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 8 }}>R$0</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)', fontWeight: 600, marginBottom: 4 }}>de taxa por atendimento</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Mensalidade fixa. O que você ganha é 100% seu.</div>
            </motion.div>

            {/* Ganhos card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: 'rgba(247,37,133,0.3)', boxShadow: `0 20px 50px rgba(247,37,133,0.1)` }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              style={{ background: P.card1, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28 }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: P.accentDim, color: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><TrendingUp size={20} /></div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Controle dos seus ganhos</h3>
              <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.6, marginBottom: 16 }}>Veja quanto faturou hoje, essa semana, esse mês. Sem planilha.</p>
              <div style={{ background: P.faint, borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 9, color: P.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Este mês</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: P.accent }}>R$ 4.320</div>
                <div style={{ fontSize: 9, color: '#10b981', marginTop: 4 }}>↑ 18% vs. mês anterior</div>
              </div>
            </motion.div>

            {/* CTA card */}
            <motion.div
              variants={fadeUp}
              style={{ background: P.card2, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: P.accent, marginBottom: 12 }}>Pronto pra começar?</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.3, marginBottom: 10 }}>14 dias grátis pra testar sem compromisso.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {['Sem cartão de crédito', 'Cancele quando quiser', 'Garantia de 7 dias'].map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: P.muted }}>
                      <Check size={13} color={P.accent} /> {b}
                    </div>
                  ))}
                </div>
              </div>
              <motion.button
                onClick={() => navigate('/cadastro')}
                whileHover={{ scale: 1.04, boxShadow: `0 12px 40px rgba(247,37,133,0.5)` }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                style={{ width: '100%', background: P.accent, color: '#fff', border: 'none', borderRadius: 12, padding: '13px 0', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                Começar grátis <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '60px 20px 80px', background: 'rgba(247,37,133,0.04)', borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger(0.08)}
            style={{ marginBottom: 48 }}
          >
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: P.accent, marginBottom: 12 }}>Como funciona pra sua cliente</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 900, letterSpacing: -0.5 }}>Do link ao agendamento em 3 passos</motion.h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.13)}
          >
            {[
              { n: '01', title: 'Você compartilha seu link', desc: 'Cole na bio do Instagram, mande no WhatsApp. É o endereço digital do seu estúdio.' },
              { n: '02', title: 'Sua cliente salva como app', desc: 'Ela abre o link e salva na tela inicial do celular com um toque. Fica o ícone do seu estúdio ali.' },
              { n: '03', title: 'Ela agenda, você recebe o aviso', desc: 'Ela escolhe o serviço e o horário. Você recebe notificação no celular na hora.' },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                style={{ background: P.card1, border: `1px solid ${P.border}`, borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 10, right: 14, fontSize: 52, fontWeight: 900, color: 'rgba(247,37,133,0.05)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: P.accent, marginBottom: 14 }}>{s.n}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 900, letterSpacing: -0.5 }}>O que dizem as Lash Designers</h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.11)}
          >
            {[
              { text: 'Minha agenda nunca mais ficou bagunçada. As clientes agendam sozinhas e eu só apareço pra atender.', name: 'Mariana Silva', role: 'Lash Designer • Mariana Cílios' },
              { text: 'Antes abria o WhatsApp e tinha 30 mensagens pra marcar horário. Hoje não existe mais isso.', name: 'Beatriz Oliveira', role: 'Lash Designer • Bia Lash' },
              { text: 'A ficha de cada cliente fica salva. Lembro da curvatura e do mapping sem precisar anotar em papel.', name: 'Gabriela Costa', role: 'Lash Designer • Gabi Cílios' },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -6, rotateZ: 0.4, boxShadow: '0 20px 60px rgba(0,0,0,0.35)', transition: { type: 'spring', stiffness: 300 } }}
                style={{ background: P.card1, border: `1px solid ${P.border}`, borderRadius: 16, padding: 24 }}
              >
                <div style={{ color: P.accent, fontSize: 14, marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.8, fontStyle: 'italic', marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ paddingTop: 14, borderTop: `1px solid ${P.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: P.muted, marginTop: 2 }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '60px 20px 80px', background: 'rgba(247,37,133,0.03)', borderTop: `1px solid ${P.border}` }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger(0.08)}
            style={{ marginBottom: 48 }}
          >
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 900, letterSpacing: -0.5, marginBottom: 12 }}>Planos sem taxa por atendimento</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 14, color: P.muted }}>14 dias grátis, sem cadastrar cartão.</motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.14)}
          >
            <motion.div variants={fadeUp} style={{ background: P.card1, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: P.muted, marginBottom: 8 }}>Plano Básico</div>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 11, color: P.muted }}>R$ </span>
                <span style={{ fontSize: 40, fontWeight: 900 }}>59,90</span>
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
              <motion.button
                onClick={() => navigate('/cadastro')}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ width: '100%', padding: '12px 0', border: `1px solid rgba(247,37,133,0.4)`, borderRadius: 12, background: 'transparent', color: P.accent, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                Criar conta grátis
              </motion.button>
            </motion.div>
            <motion.div variants={fadeUp} style={{ background: P.card1, border: `2px solid ${P.accent}`, borderRadius: 20, padding: 28, position: 'relative', boxShadow: `0 0 48px rgba(247,37,133,0.1)` }}>
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: P.accent, color: '#fff', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, padding: '4px 16px', borderRadius: 999, whiteSpace: 'nowrap' }}>Mais completo</div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: P.accent, marginBottom: 8 }}>Plano Premium</div>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 11, color: P.accent }}>R$ </span>
                <span style={{ fontSize: 40, fontWeight: 900, color: P.accent }}>99,90</span>
                <span style={{ fontSize: 11, color: P.muted }}>/mês</span>
              </div>
              <div style={{ paddingTop: 20, borderTop: `1px solid ${P.border}`, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {['Tudo do plano básico', 'Agenda online 24h', 'App para suas clientes', 'Avisos no celular'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <Check size={14} color={P.accent} /> {f}
                  </div>
                ))}
              </div>
              <motion.button
                onClick={() => navigate('/cadastro')}
                whileHover={{ scale: 1.02, boxShadow: `0 8px 36px rgba(247,37,133,0.55)` }} whileTap={{ scale: 0.98 }}
                style={{ width: '100%', padding: '12px 0', border: 'none', borderRadius: 12, background: P.accent, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                Testar 14 dias grátis
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── GUARANTEE + CTA ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px', textAlign: 'center' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger(0.1)}
          style={{ maxWidth: 640, margin: '0 auto' }}
        >
          <motion.div variants={scaleIn} style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <ShieldCheck size={22} color="#10b981" />
          </motion.div>
          <motion.h3 variants={fadeUp} style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>7 dias de garantia incondicional</motion.h3>
          <motion.p variants={fadeUp} style={{ fontSize: 14, color: P.muted, lineHeight: 1.8, marginBottom: 40 }}>
            Use na sua rotina. Se em até 7 dias não ajudou, devolvemos seu dinheiro. Sem burocracia.
          </motion.p>
          <motion.div variants={fadeUp}>
            <motion.button
              onClick={() => navigate('/cadastro')}
              whileHover={{ scale: 1.05, boxShadow: `0 20px 64px rgba(247,37,133,0.6)` }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 16, padding: '18px 40px', fontWeight: 800, fontSize: 16, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: `0 16px 48px rgba(247,37,133,0.4)` }}
            >
              Começar agora, é grátis <ArrowRight size={18} />
            </motion.button>
            <p style={{ marginTop: 14, fontSize: 12, color: P.faint }}>Sem cartão. Cancele quando quiser.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 1, padding: '32px 20px', borderTop: `1px solid ${P.border}`, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${P.accent}, #ff85b3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: '#fff' }}>LH</div>
          <span style={{ fontWeight: 800, fontSize: 14, background: `linear-gradient(135deg, ${P.accent}, #ff85b3)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lash Hub</span>
        </div>
        <p style={{ fontSize: 11, color: P.faint }}>© {new Date().getFullYear()} Lash Hub. Todos os direitos reservados.</p>
        <div style={{ marginTop: 12, display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/login" style={{ fontSize: 11, color: P.faint, textDecoration: 'none' }}>Login</Link>
          <span style={{ color: P.faint }}>•</span>
          <Link to="/cadastro" style={{ fontSize: 11, color: P.faint, textDecoration: 'none' }}>Cadastro</Link>
        </div>
      </footer>

    </div>
  );
}
