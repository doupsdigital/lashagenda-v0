import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ShieldCheck, ChevronDown } from 'lucide-react';

// ── Animation presets ──────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: 'spring', stiffness: 300, damping: 24 } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const slideUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

const stagger = (delay = 0.09, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren } },
});

// ── Palette ────────────────────────────────────────────────────────────────
const P = {
  bg: '#f7f4ef',
  card: '#ffffff',
  cardAlt: '#f0ece5',
  border: '#e0d8cf',
  accent: '#9b1a3c',
  accentLight: '#fdf0f3',
  accentMid: '#c02a52',
  text: '#0f0a08',
  muted: '#6b5f5a',
  faint: '#b8afa8',
};

const faqs = [
  { q: 'Minha cliente precisa baixar algum app?', a: 'Não. Ela acessa o link do seu estúdio e, se quiser, salva na tela inicial do celular como ícone. Funciona igualzinho a um app, mas sem precisar ir em nenhuma loja.' },
  { q: 'O Lash Hub cobra taxa em cima de cada atendimento?', a: 'Não. O valor de cada procedimento é 100% seu. Você paga apenas a mensalidade fixa do plano.' },
  { q: 'Preciso configurar tudo do zero?', a: 'Não. Quando você entra, o sistema já vem com 10 serviços de Lash e sobrancelhas pré-cadastrados. É só ajustar e começar a usar.' },
  { q: 'Como funciona o período de teste?', a: 'Você ganha 14 dias de acesso completo. Não pedimos cartão de crédito pra começar.' },
];

export default function LandingPage_v8() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 80));
  }, [scrollY]);

  return (
    <div style={{ background: P.bg, color: P.text, minHeight: '100vh', fontFamily: 'inherit', overflowX: 'hidden' }}>

      {/* ── HEADER ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        style={{ position: 'fixed', top: 16, left: '50%', x: '-50%', width: 'calc(100% - 32px)', maxWidth: 1040, zIndex: 100 }}
      >
        <motion.header
          animate={{
            background: scrolled ? 'rgba(247,244,239,0.97)' : 'rgba(247,244,239,0.82)',
            boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.1)' : '0 2px 16px rgba(0,0,0,0.04)',
          }}
          transition={{ duration: 0.35 }}
          style={{ backdropFilter: 'blur(20px)', border: `1px solid ${P.border}`, borderRadius: 999, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, color: '#fff' }}>LH</div>
            <span className="hidden min-[380px]:inline" style={{ fontWeight: 800, fontSize: 17, color: P.accent }}>Lash Hub</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/login" style={{ color: P.muted, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Entrar</Link>
            <motion.button
              onClick={() => navigate('/cadastro')}
              whileHover={{ scale: 1.06, boxShadow: `0 6px 28px rgba(155,26,60,0.35)` }}
              whileTap={{ scale: 0.95 }}
              transition={SPRING}
              style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 999, padding: '9px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              Começar grátis <ArrowRight size={13} />
            </motion.button>
          </div>
        </motion.header>
      </motion.div>

      {/* ── MANIFESTO HERO ── */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 20px 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%' }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
            style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: P.accent, marginBottom: 32 }}
          >
            Lash Hub — Feito só pra Lash Designer
          </motion.div>

          {/* Line 1 */}
          <div style={{ overflow: 'hidden', marginBottom: 0 }}>
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.75, ease: EASE }}
              style={{ fontSize: 'clamp(40px, 7.5vw, 96px)', fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em', color: P.text }}
            >
              Você não precisa de
            </motion.h1>
          </div>

          {/* Line 2 */}
          <div style={{ overflow: 'hidden', marginBottom: 8 }}>
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.68, duration: 0.75, ease: EASE }}
              style={{ fontSize: 'clamp(40px, 7.5vw, 96px)', fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em', color: P.text }}
            >
              sistema de salão.
            </motion.h1>
          </div>

          {/* Animated red divider — draws itself */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.95, duration: 0.7, ease: EASE }}
            style={{ width: '100%', height: 3, background: P.accent, borderRadius: 999, marginBottom: 28, transformOrigin: 'left' }}
          />

          {/* Punchline */}
          <div style={{ overflow: 'hidden', marginBottom: 40 }}>
            <motion.h2
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.75, ease: EASE }}
              style={{ fontSize: 'clamp(24px, 4.5vw, 56px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', color: P.accent }}
            >
              Você precisa do Lash Hub.
            </motion.h2>
          </div>

          {/* Body text + CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1, 1.35)}
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
          >
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: P.muted, lineHeight: 1.8, maxWidth: 480, flex: 1 }}>
              Você atende por conta própria. Trabalha com cílios. Não tem equipe, não tem comissão pra calcular. Você tem clientes, horários e resultados incríveis.
            </motion.p>
            <div style={{ flex: 1 }}>
              <motion.p variants={fadeUp} style={{ fontSize: 17, color: P.muted, lineHeight: 1.8, marginBottom: 32 }}>
                O Lash Hub foi feito pra isso. Só pra isso. Agenda das suas clientes, ficha de cada uma, controle dos seus ganhos — sem nada que você não vai usar.
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <motion.button
                  onClick={() => navigate('/cadastro')}
                  whileHover={{ scale: 1.04, boxShadow: `0 12px 40px rgba(155,26,60,0.4)` }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                  style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 14, padding: '15px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  Testar 14 dias de graça <ArrowRight size={16} />
                </motion.button>
                <Link to="/login" style={{ color: P.muted, fontSize: 14, fontWeight: 500, textDecoration: 'none', padding: '15px 20px', border: `1px solid ${P.border}`, borderRadius: 14, display: 'flex', alignItems: 'center' }}>
                  Já tenho conta
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS (dark) ── */}
      <section style={{ position: 'relative', zIndex: 1, background: P.text, padding: '80px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: P.accent, marginBottom: 40 }}
          >
            Na prática, isso significa
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.12)}
            style={{ background: '#2a2520', borderRadius: 16, overflow: 'hidden' }}
          >
            {[
              { num: '24h', label: 'Sua agenda aberta', desc: 'Suas clientes agendam sozinhas pelo link do seu estúdio, a qualquer hora do dia ou da noite. Você não precisa estar disponível pra isso.' },
              { num: '3', label: 'Cliques pra agendar', desc: 'É tudo que sua cliente precisa. Ela abre o link, escolhe o serviço, escolhe o horário. Feito. Você recebe o aviso no celular na hora.' },
              { num: 'R$0', label: 'De taxa por atendimento', desc: 'O que você ganha no seu estúdio é 100% seu. A Lash Hub cobra só a mensalidade. Nada em cima de cada atendimento.' },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ background: '#221e18' }}
                transition={{ duration: 0.2 }}
                style={{ background: '#1a1510', padding: 40 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: EASE }}
                  style={{ fontSize: 'clamp(44px, 6vw, 64px)', fontWeight: 900, color: P.accent, lineHeight: 1, marginBottom: 8 }}
                >
                  {s.num}
                </motion.div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f7f4ef', marginBottom: 12 }}>{s.label}</div>
                <p style={{ fontSize: 13, color: '#8a8278', lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE ROWS ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {[
            {
              tag: 'Agenda',
              title: 'Suas clientes agendam sozinhas. Sem depender do WhatsApp.',
              desc: 'Você compartilha o link do seu estúdio. Suas clientes abrem, escolhem o serviço e o horário disponível, e confirmam. Você recebe o aviso no celular na hora. A agenda atualiza automaticamente.',
              extra: 'Seu link funciona 24h por dia, 7 dias por semana.',
            },
            {
              tag: 'App da cliente',
              title: 'Um app com o nome do seu estúdio. Sem baixar de loja nenhuma.',
              desc: 'Sua cliente abre o link e salva na tela inicial do celular com um toque. Fica o ícone do seu estúdio ali, do lado dos outros apps dela. Parece um aplicativo — porque é. Só que sem passar pela loja.',
              extra: 'Ela acessa direto pelo celular, igual qualquer app.',
            },
            {
              tag: 'Ficha das clientes',
              title: 'Curvatura, espessura, mapping. Tudo anotado e sempre na sua mão.',
              desc: 'Para cada cliente, você tem o histórico completo de atendimentos, a curvatura usada, a espessura, o mapping — tudo registrado. Antes de atender, você já sabe tudo o que precisa sobre ela.',
              extra: 'Sem papel, sem bloco de notas, sem esquecer.',
            },
            {
              tag: 'Seus ganhos',
              title: 'Quanto você faturou hoje, essa semana, esse mês.',
              desc: 'Veja um resumo simples do seu faturamento por qualquer período. Não é planilha, não é sistema contábil. É só o número que você quer saber, na tela, de forma direta.',
              extra: 'Simples e direto como você precisa.',
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger(0.1)}
              style={{ padding: '40px 0', borderBottom: `1px solid ${P.border}` }}
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <motion.div variants={fadeUp} style={{ minWidth: 120 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: P.accent, background: P.accentLight, padding: '4px 12px', borderRadius: 999, border: `1px solid rgba(155,26,60,0.2)`, whiteSpace: 'nowrap' }}>{f.tag}</span>
                </motion.div>
                <div style={{ flex: 1 }}>
                  <motion.h3 variants={slideUp} style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 800, lineHeight: 1.25, marginBottom: 14, letterSpacing: -0.3 }}>{f.title}</motion.h3>
                  <motion.p variants={fadeUp} style={{ fontSize: 15, color: P.muted, lineHeight: 1.8, marginBottom: 12 }}>{f.desc}</motion.p>
                  <motion.p variants={fadeUp} style={{ fontSize: 13, color: P.accent, fontWeight: 600, fontStyle: 'italic' }}>→ {f.extra}</motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px', background: P.cardAlt, borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: P.accent, marginBottom: 40 }}
          >
            O que dizem as Lash Designers
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.11)}
          >
            {[
              { text: 'Minha agenda nunca mais ficou bagunçada. As clientes agendam sozinhas e eu só apareço pra atender.', name: 'Mariana Silva', role: 'Lash Designer • Mariana Cílios' },
              { text: 'O que mais amo é saber a curvatura e o mapping de cada cliente antes de ela chegar. Tudo salvo, tudo certo.', name: 'Beatriz Oliveira', role: 'Lash Designer • Bia Lash' },
              { text: 'Antes meu WhatsApp vivia cheio de mensagens pra marcar horário. Hoje isso não existe mais na minha rotina.', name: 'Gabriela Costa', role: 'Lash Designer • Gabi Cílios' },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.08)', transition: { type: 'spring', stiffness: 300 } }}
                style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: 16, padding: 28 }}
              >
                <div style={{ color: P.accent, fontSize: 14, marginBottom: 16 }}>★★★★★</div>
                <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.8, fontStyle: 'italic', marginBottom: 24 }}>"{t.text}"</p>
                <div style={{ paddingTop: 16, borderTop: `1px solid ${P.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: P.text }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: P.faint, marginTop: 3 }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger(0.1)}
            style={{ marginBottom: 48 }}
          >
            <motion.div variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: P.accent, marginBottom: 16 }}>Planos</motion.div>
            <motion.h2 variants={slideUp} style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 12 }}>
              Sem taxa por atendimento.<br />Nunca.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: P.muted }}>14 dias grátis pra testar. Sem colocar cartão.</motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.14)}
          >
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', transition: { type: 'spring', stiffness: 260 } }}
              style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: 20, padding: 36 }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: P.muted, marginBottom: 12 }}>Básico</div>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 11, color: P.muted }}>R$ </span>
                <span style={{ fontSize: 48, fontWeight: 900, color: P.text, letterSpacing: -2 }}>59,90</span>
                <span style={{ fontSize: 12, color: P.muted }}>/mês</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 24, borderTop: `1px solid ${P.border}`, marginBottom: 28 }}>
                {['Ficha de cada cliente', 'Histórico de atendimentos', 'Controle dos seus ganhos'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: P.muted }}>
                    <Check size={15} color={P.accent} /> {f}
                  </div>
                ))}
                <div style={{ fontSize: 13, color: P.faint, marginTop: 4, paddingLeft: 25 }}>Sem agenda online</div>
              </div>
              <motion.button
                onClick={() => navigate('/cadastro')}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ width: '100%', padding: '14px 0', border: `1.5px solid ${P.accent}`, borderRadius: 12, background: 'transparent', color: P.accent, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
              >
                Criar conta grátis
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: `0 24px 64px rgba(155,26,60,0.18)`, transition: { type: 'spring', stiffness: 260 } }}
              style={{ background: P.accent, borderRadius: 20, padding: 36, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>Premium — Mais completo</div>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>R$ </span>
                <span style={{ fontSize: 48, fontWeight: 900, color: '#fff', letterSpacing: -2 }}>99,90</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>/mês</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.2)', marginBottom: 28 }}>
                {['Tudo do plano básico', 'Agenda online 24h', 'App para suas clientes', 'Avisos no celular'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#fff' }}>
                    <Check size={15} color="#fff" /> {f}
                  </div>
                ))}
              </div>
              <motion.button
                onClick={() => navigate('/cadastro')}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }} whileTap={{ scale: 0.98 }}
                style={{ width: '100%', padding: '14px 0', border: 'none', borderRadius: 12, background: '#fff', color: P.accent, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}
              >
                Testar 14 dias grátis
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '60px 20px 80px', background: P.cardAlt, borderTop: `1px solid ${P.border}` }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: P.accent, marginBottom: 40 }}
          >
            Perguntas frequentes
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.08)}
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} style={{ borderTop: `1px solid ${P.border}` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
                >
                  <span style={{ fontSize: 15, fontWeight: 700, color: P.text }}>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ color: P.accent, flexShrink: 0, display: 'flex' }}
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                {/* Smooth accordion with AnimatePresence */}
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.8, paddingBottom: 20 }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div style={{ borderTop: `1px solid ${P.border}` }} />
          </motion.div>
        </div>
      </section>

      {/* ── GUARANTEE + FINAL CTA ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px', background: P.text }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger(0.1)}
          >
            <motion.div variants={scaleIn} style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <ShieldCheck size={22} color="#10b981" />
            </motion.div>
            <motion.div variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: P.accent, marginBottom: 16 }}>Garantia</motion.div>
            <motion.h2 variants={slideUp} style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#f7f4ef', marginBottom: 16 }}>
              7 dias de garantia.<br />
              <span style={{ color: P.accent }}>Sem pergunta.</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: '#8a8278', lineHeight: 1.8, marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}>
              Use o Lash Hub na sua rotina real. Se em até 7 dias você achar que não ajudou no seu dia a dia, devolvemos seu dinheiro integralmente. Simples assim.
            </motion.p>
            <motion.div variants={fadeUp}>
              <motion.button
                onClick={() => navigate('/cadastro')}
                whileHover={{ scale: 1.05, boxShadow: `0 20px 64px rgba(155,26,60,0.5)` }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                style={{ background: P.accent, color: '#fff', border: 'none', borderRadius: 16, padding: '18px 40px', fontWeight: 800, fontSize: 16, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10 }}
              >
                Começar agora, é grátis <ArrowRight size={18} />
              </motion.button>
              <p style={{ marginTop: 16, fontSize: 12, color: '#4a4038' }}>Sem cartão de crédito. Cancele quando quiser.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 1, padding: '32px 20px', background: '#0a0806', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: P.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: '#fff' }}>LH</div>
          <span style={{ fontWeight: 800, fontSize: 14, color: P.accent }}>Lash Hub</span>
        </div>
        <p style={{ fontSize: 11, color: '#3a3028' }}>© {new Date().getFullYear()} Lash Hub. Todos os direitos reservados.</p>
        <div style={{ marginTop: 12, display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/login" style={{ fontSize: 11, color: '#3a3028', textDecoration: 'none' }}>Login</Link>
          <span style={{ color: '#3a3028' }}>•</span>
          <Link to="/cadastro" style={{ fontSize: 11, color: '#3a3028', textDecoration: 'none' }}>Cadastro</Link>
        </div>
      </footer>

    </div>
  );
}
