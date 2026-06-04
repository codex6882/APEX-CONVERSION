import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Shield, Zap, Globe, CheckCircle,
  Star, UserPlus, BarChart2, Wallet, ChevronRight, Lock, TrendingUp
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingNotifications from '../components/FloatingNotifications'

const testimonials = [
  { quote: "Apex Conversion Affiliates changed the way I earn online. Transparent, fast, and professional.", name: "Marcus T.", role: "Affiliate Marketer" },
  { quote: "I've tried many platforms but none come close to Apex. The deposit system is seamless.", name: "Priya S.", role: "Online Entrepreneur" },
  { quote: "What I love most is how easy it is to track my earnings. Withdrawal process is fast.", name: "Daniel K.", role: "Digital Marketer" },
  { quote: "Joining Apex was the best decision I made this year. The team is professional.", name: "Sarah M.", role: "Content Creator" },
  { quote: "The referral system is brilliant. I've been earning passively just by bringing in new members.", name: "James O.", role: "Business Developer" },
  { quote: "Fast, reliable, and secure. Apex is exactly what the affiliate industry needed.", name: "Linda C.", role: "Freelancer" },
  { quote: "Apex Conversion Affiliates changed the way I earn online. Transparent, fast, and professional.", name: "Marcus T.", role: "Affiliate Marketer" },
  { quote: "I've tried many platforms but none come close to Apex. The deposit system is seamless.", name: "Priya S.", role: "Online Entrepreneur" },
]

const Landing = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//code.jivosite.com/widget/k2cLFGxtnF'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
      const jivo = document.getElementById('jivo-iframe-container')
      if (jivo) jivo.remove()
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ fontFamily: 'inherit' }}>
      <Navbar />
      <FloatingNotifications />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: '#06101f' }}
      >
        {/* Background image with strong overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />

        {/* Fine grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Top horizontal rule */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-32 pb-24">
          {/* Eyebrow */}
          <p
            className="font-body font-semibold uppercase tracking-widest mb-8"
            style={{ fontSize: '11px', color: '#3b82f6', letterSpacing: '3px' }}
          >
            Affiliate Marketing Platform
          </p>

          {/* Main headline */}
          <h1
            className="font-heading font-bold text-white mb-8"
            style={{
              fontSize: 'clamp(52px, 9vw, 108px)',
              letterSpacing: '-4px',
              lineHeight: 0.90,
              maxWidth: '820px',
            }}
          >
            Connect.<br />
            Promote.<br />
            <span style={{ color: '#3b82f6' }}>Earn.</span>
          </h1>

          {/* Divider */}
          <div className="w-12 h-px mb-8" style={{ background: 'rgba(255,255,255,0.20)' }} />

          <p
            className="font-body mb-12"
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '440px',
              lineHeight: '1.75',
            }}
          >
            Apex empowers you to grow, earn, and succeed through a seamless affiliate experience built for everyone.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-24">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 font-body font-bold text-white rounded-lg transition-all hover:opacity-90 hover:gap-3"
              style={{
                background: '#2563eb',
                padding: '14px 32px',
                fontSize: '14px',
                letterSpacing: '0.2px',
                whiteSpace: 'nowrap',
              }}
            >
              Join for Free <ArrowRight size={16} />
            </Link>
            <a
              href="#howitworks"
              className="inline-flex items-center gap-2 font-body font-semibold rounded-lg transition-all hover:bg-white/5"
              style={{
                border: '1px solid rgba(255,255,255,0.14)',
                padding: '14px 32px',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                whiteSpace: 'nowrap',
              }}
            >
              Learn More
            </a>
          </div>

          {/* Stats — horizontal ruled */}
          <div
            className="flex flex-wrap"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[
              ['$12M+', 'Total Paid Out'],
              ['10,000+', 'Active Affiliates'],
              ['4.9 / 5', 'Satisfaction Score'],
            ].map(([value, label], i) => (
              <div
                key={label}
                className="py-6 pr-12"
                style={{
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  marginRight: i < 2 ? '48px' : '0',
                }}
              >
                <p
                  className="font-heading font-bold text-white"
                  style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-1.5px', lineHeight: 1 }}
                >
                  {value}
                </p>
                <p
                  className="font-body mt-1.5 uppercase tracking-widest"
                  style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </section>

      {/* ══════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════ */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #e8ecf4' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: <Lock size={18} />, label: 'SSL Secured', sub: 'Bank-level protection' },
              { icon: <Zap size={18} />, label: 'Fast Payouts', sub: 'Withdraw anytime' },
              { icon: <Globe size={18} />, label: 'Global Access', sub: 'No restrictions' },
              { icon: <CheckCircle size={18} />, label: 'Verified Platform', sub: 'Trusted & transparent' },
            ].map(({ icon, label, sub }, i) => (
              <div
                key={label}
                className="flex items-center gap-4 py-7 px-6"
                style={{
                  borderRight: i < 3 ? '1px solid #e8ecf4' : 'none',
                  color: '#2563eb',
                }}
              >
                <div className="flex-shrink-0">{icon}</div>
                <div>
                  <p className="font-heading font-bold text-sm" style={{ color: '#0a1628' }}>{label}</p>
                  <p className="font-body text-xs mt-0.5" style={{ color: '#9ca3af' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section id="howitworks" style={{ background: '#ffffff', padding: '120px 0' }}>
        <div className="max-w-6xl mx-auto px-6">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20"
            style={{ borderBottom: '1px solid #e8ecf4', paddingBottom: '40px' }}
          >
            <div>
              <p className="font-body font-semibold uppercase tracking-widest mb-3"
                style={{ fontSize: '11px', color: '#2563eb', letterSpacing: '3px' }}>
                Simple Process
              </p>
              <h2
                className="font-heading font-bold"
                style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-2px', lineHeight: 1, color: '#06101f' }}
              >
                How It Works
              </h2>
            </div>
            <p className="font-body mt-4 md:mt-0" style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '260px' }}>
              Three steps to start earning with Apex Conversion Affiliates.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                num: '01',
                icon: <UserPlus size={22} color="#2563eb" />,
                title: 'Create Account',
                desc: 'Sign up for free and receive your $8 welcome bonus instantly upon registration.',
              },
              {
                num: '02',
                icon: <BarChart2 size={22} color="#2563eb" />,
                title: 'Start Promoting',
                desc: 'Access your affiliate dashboard, make deposits and start earning commissions.',
              },
              {
                num: '03',
                icon: <Wallet size={22} color="#2563eb" />,
                title: 'Withdraw Earnings',
                desc: 'Request withdrawals anytime to your crypto wallet. Fast and transparent payouts.',
              },
            ].map(({ num, icon, title, desc }, i) => (
              <div
                key={num}
                className="py-10 px-8"
                style={{
                  borderLeft: i > 0 ? '1px solid #e8ecf4' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(37,99,235,0.07)' }}
                  >
                    {icon}
                  </div>
                  <span
                    className="font-heading font-bold"
                    style={{ fontSize: '56px', letterSpacing: '-3px', color: '#f0f4ff', lineHeight: 1 }}
                  >
                    {num}
                  </span>
                </div>
                <h3
                  className="font-heading font-bold mb-3"
                  style={{ fontSize: '20px', color: '#06101f', letterSpacing: '-0.5px' }}
                >
                  {title}
                </h3>
                <p className="font-body leading-relaxed" style={{ fontSize: '14px', color: '#6b7280' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT — dark section
      ══════════════════════════════════════════ */}
      <section id="about" style={{ background: '#06101f', padding: '120px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <div>
              <p className="font-body font-semibold uppercase tracking-widest mb-6"
                style={{ fontSize: '11px', color: '#3b82f6', letterSpacing: '3px' }}>
                About Us
              </p>
              <h2
                className="font-heading font-bold text-white mb-8"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-2px', lineHeight: 1.05 }}
              >
                Why Apex Conversion Affiliates?
              </h2>
              <div className="w-12 h-px mb-8" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <p className="font-body leading-relaxed mb-5"
                style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.45)' }}>
                Apex Conversion Affiliates is designed to empower affiliates with a seamless earning experience. Our platform combines cutting-edge security with intuitive tools, so you can connect, promote, and grow your income effortlessly.
              </p>
              <p className="font-body leading-relaxed mb-12"
                style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.45)' }}>
                From flexible deposit plans to multi-level affiliate rewards, Apex gives you the flexibility to manage your portfolio your way — anytime, anywhere.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Designed for everyone',
                  'Earn as you go',
                  'All the tools you need',
                  'Flexible plans',
                  'Multiple earning levels',
                  'Simple to manage',
                  'Connect. Promote. Pay.',
                  'Quick to set up',
                ].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#3b82f6' }} />
                    <span className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.50)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop"
                alt="Team"
                className="w-full object-cover"
                style={{ borderRadius: '12px', height: '240px' }}
              />
              <div className="grid grid-cols-2 gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
                  alt="Professional"
                  className="w-full object-cover"
                  style={{ borderRadius: '12px', height: '155px' }}
                />
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=200&fit=crop"
                  alt="Business"
                  className="w-full object-cover"
                  style={{ borderRadius: '12px', height: '155px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PLATFORM FEATURES — light section
      ══════════════════════════════════════════ */}
      <section style={{ background: '#f8faff', padding: '120px 0', borderTop: '1px solid #e8ecf4', borderBottom: '1px solid #e8ecf4' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16" style={{ borderBottom: '1px solid #e8ecf4', paddingBottom: '40px' }}>
            <p className="font-body font-semibold uppercase tracking-widest mb-3"
              style={{ fontSize: '11px', color: '#2563eb', letterSpacing: '3px' }}>
              Platform
            </p>
            <h2
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-2px', color: '#06101f', lineHeight: 1 }}
            >
              Built for Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                icon: <Shield size={20} color="#2563eb" />,
                title: 'Enterprise Security',
                desc: 'SSL encryption and bank-level data protection keeps your account and earnings safe at all times.',
              },
              {
                icon: <TrendingUp size={20} color="#2563eb" />,
                title: 'Real-Time Earnings',
                desc: 'Track your commissions and referral income live from your dashboard — full transparency, always.',
              },
              {
                icon: <Wallet size={20} color="#2563eb" />,
                title: 'Instant Withdrawals',
                desc: 'Request payouts directly to your crypto wallet with no delays. BTC and USDT supported.',
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className="py-10 px-8"
                style={{ borderLeft: i > 0 ? '1px solid #e8ecf4' : 'none' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
                  style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.12)' }}
                >
                  {icon}
                </div>
                <h3
                  className="font-heading font-bold mb-3"
                  style={{ fontSize: '17px', color: '#06101f', letterSpacing: '-0.3px' }}
                >
                  {title}
                </h3>
                <p className="font-body leading-relaxed" style={{ fontSize: '14px', color: '#6b7280' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS — dark section
      ══════════════════════════════════════════ */}
      <section style={{ background: '#06101f', padding: '100px 0', overflow: 'hidden' }}>
        <div className="max-w-6xl mx-auto px-6 mb-14">
          <p className="font-body font-semibold uppercase tracking-widest mb-4"
            style={{ fontSize: '11px', color: '#3b82f6', letterSpacing: '3px' }}>
            What They Say
          </p>
          <h2
            className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-2px', lineHeight: 1 }}
          >
            Client Testimonials
          </h2>
        </div>

        {/* Scrolling strip */}
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-scroll w-max">
            {[...testimonials, ...testimonials].map(({ quote, name, role }, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{
                  width: '300px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '28px',
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p
                  className="font-body leading-relaxed mb-6"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.50)' }}
                >
                  "{quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-white text-sm flex-shrink-0"
                    style={{ background: '#2563eb', fontSize: '13px' }}
                  >
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white" style={{ fontSize: '13px' }}>{name}</p>
                    <p className="font-body mt-0.5" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — full-width dark band
      ══════════════════════════════════════════ */}
      <section style={{ background: '#0f1e38', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body font-semibold uppercase tracking-widest mb-5"
                style={{ fontSize: '11px', color: '#3b82f6', letterSpacing: '3px' }}>
                Get Started
              </p>
              <h2
                className="font-heading font-bold text-white"
                style={{ fontSize: 'clamp(28px, 5vw, 52px)', letterSpacing: '-2px', lineHeight: 1.05 }}
              >
                Ready to Start Earning?
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p
                className="font-body"
                style={{ fontSize: '16px', color: 'rgba(255,255,255,0.40)', lineHeight: '1.7' }}
              >
                Join thousands of affiliates already earning with Apex Conversion Affiliates. Sign up free in under a minute.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 font-body font-bold text-white rounded-lg transition-all hover:opacity-90"
                  style={{
                    background: '#2563eb',
                    padding: '14px 32px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Get Started Free <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SUBSCRIBE
      ══════════════════════════════════════════ */}
      <section style={{ background: '#f8faff', padding: '72px 0', borderTop: '1px solid #e8ecf4' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3
                className="font-heading font-bold"
                style={{ fontSize: '22px', letterSpacing: '-0.5px', color: '#06101f' }}
              >
                Stay Informed
              </h3>
              <p className="font-body mt-1" style={{ color: '#9ca3af', fontSize: '14px' }}>
                Never miss an Apex update.
              </p>
            </div>
            <div
              className="flex gap-2 p-1.5 rounded-lg"
              style={{ background: '#fff', border: '1px solid #e8ecf4', maxWidth: '420px', width: '100%' }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 font-body text-sm focus:outline-none bg-transparent px-3"
                style={{ color: '#06101f' }}
              />
              <button
                className="font-body font-bold text-white text-sm rounded-md px-5 py-2.5 transition-all hover:opacity-90"
                style={{ background: '#2563eb', whiteSpace: 'nowrap' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Landing
