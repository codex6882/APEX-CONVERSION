import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle, Star, Shield, Zap, Globe,
  UserPlus, BarChart2, Wallet, ChevronRight
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

const team = [
  { name: "Franklin Hart", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face" },
  { name: "Olivia Bennett", role: "Head of Operations", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face" },
  { name: "Wei Zhang", role: "Senior Affiliate Manager", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face" },
  { name: "Jack Doe", role: "Growth Strategist", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face" },
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <FloatingNotifications />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop')" }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.90) 60%, rgba(20,48,90,0.85) 100%)' }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '72px 72px'
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-20">
          <h1
            className="font-heading font-bold text-white leading-none mb-6"
            style={{ fontSize: 'clamp(56px, 10vw, 100px)', letterSpacing: '-3px', lineHeight: 0.93 }}
          >
            Connect.<br />
            Promote.<br />
            <span style={{ color: '#3b82f6' }}>Earn.</span>
          </h1>

          <p
            className="font-body text-white/55 mb-12 max-w-lg mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(15px, 2vw, 18px)' }}
          >
            Apex Conversion Affiliates empowers you to grow, earn, and succeed through a seamless affiliate experience built for everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-20">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 font-body font-bold text-white rounded-xl transition-all hover:scale-105 hover:brightness-110"
              style={{
                background: '#2563eb',
                padding: '15px 36px',
                fontSize: '15px',
                boxShadow: '0 8px 28px rgba(37,99,235,0.40)',
                letterSpacing: '0.2px',
                whiteSpace: 'nowrap'
              }}
            >
              Join for Free <ArrowRight size={17} />
            </Link>
            <a
              href="#howitworks"
              className="inline-flex items-center justify-center gap-2 font-body font-semibold rounded-xl transition-all hover:bg-white/8"
              style={{
                border: '1.5px solid rgba(255,255,255,0.18)',
                padding: '15px 36px',
                fontSize: '15px',
                color: 'rgba(255,255,255,0.70)',
                whiteSpace: 'nowrap'
              }}
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center flex-wrap">
            {[['$12M+', 'Paid Out'], ['10K+', 'Active Affiliates'], ['4.9/5', 'Satisfaction']].map(([n, l], i) => (
              <div
                key={l}
                className="text-center px-8 py-2"
                style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
              >
                <p className="font-heading font-bold text-white" style={{ fontSize: '32px', letterSpacing: '-1px' }}>{n}</p>
                <p className="font-body text-white/30 text-xs mt-1 tracking-widest uppercase">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ background: '#f8faff', padding: '40px 0', borderBottom: '1px solid #e8ecf4' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Shield size={20} style={{ color: '#2563eb' }} />, label: 'SSL Secured', sub: 'Bank-level protection' },
              { icon: <Zap size={20} style={{ color: '#2563eb' }} />, label: 'Fast Payouts', sub: 'Withdraw anytime' },
              { icon: <Globe size={20} style={{ color: '#2563eb' }} />, label: 'Global Access', sub: 'No restrictions' },
              { icon: <CheckCircle size={20} style={{ color: '#2563eb' }} />, label: 'Verified Platform', sub: 'Trusted & transparent' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.10)' }}
                >
                  {icon}
                </div>
                <div>
                  <p className="font-heading font-bold text-sm" style={{ color: '#0a1628' }}>{label}</p>
                  <p className="font-body text-xs mt-0.5" style={{ color: '#9ca3af' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="howitworks" style={{ background: '#ffffff', padding: '96px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span
              className="inline-block font-body font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ color: '#2563eb', background: 'rgba(37,99,235,0.07)' }}
            >
              Simple Process
            </span>
            <h2
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(28px, 5vw, 50px)', letterSpacing: '-1.5px', lineHeight: 1.05, color: '#0a1628' }}
            >
              How It Works
            </h2>
            <p className="font-body mt-3 max-w-sm mx-auto" style={{ fontSize: '16px', color: '#9ca3af' }}>
              Three simple steps to start earning with Apex
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                icon: <UserPlus size={26} color="#2563eb" />,
                title: 'Create Account',
                desc: 'Sign up for free and receive your $8 welcome bonus instantly upon registration.',
                featured: false
              },
              {
                step: '02',
                icon: <BarChart2 size={26} color="#fff" />,
                title: 'Start Promoting',
                desc: 'Access your affiliate dashboard, make deposits and start earning commissions.',
                featured: true
              },
              {
                step: '03',
                icon: <Wallet size={26} color="#2563eb" />,
                title: 'Withdraw Earnings',
                desc: 'Request withdrawals anytime to your wallet. Fast and transparent payouts.',
                featured: false
              },
            ].map(({ step, icon, title, desc, featured }) => (
              <div
                key={step}
                className="relative overflow-hidden rounded-2xl p-7 transition-all duration-300"
                style={{
                  background: featured ? 'linear-gradient(145deg, #0a1628, #1e3a5f)' : '#fff',
                  border: featured ? 'none' : '1.5px solid #e8ecf4',
                  boxShadow: featured
                    ? '0 20px 56px rgba(10,22,40,0.22)'
                    : '0 2px 12px rgba(0,0,0,0.04)',
                  transform: featured ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                <div
                  className="absolute top-5 right-6 font-heading font-bold select-none"
                  style={{
                    fontSize: '68px',
                    letterSpacing: '-3px',
                    lineHeight: 1,
                    color: featured ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
                  }}
                >
                  {step}
                </div>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10"
                  style={{ background: featured ? 'rgba(59,130,246,0.25)' : 'rgba(37,99,235,0.07)', border: featured ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(37,99,235,0.10)' }}
                >
                  {icon}
                </div>

                <div
                  className="font-body font-bold text-xs tracking-widest uppercase mb-2 relative z-10"
                  style={{ color: featured ? '#60a5fa' : '#2563eb' }}
                >
                  Step {step}
                </div>
                <h3
                  className="font-heading font-bold mb-2 relative z-10"
                  style={{ fontSize: '19px', color: featured ? '#fff' : '#0a1628' }}
                >
                  {title}
                </h3>
                <p
                  className="font-body leading-relaxed relative z-10"
                  style={{ fontSize: '14px', color: featured ? 'rgba(255,255,255,0.50)' : '#6b7280' }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: '#f8faff', padding: '96px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="inline-block font-body font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
                style={{ color: '#2563eb', background: 'rgba(37,99,235,0.07)' }}
              >
                About Us
              </span>
              <h2
                className="font-heading font-bold mb-7"
                style={{ fontSize: 'clamp(26px, 4vw, 44px)', letterSpacing: '-1.5px', lineHeight: 1.08, color: '#0a1628' }}
              >
                Why Apex Conversion Affiliates?
              </h2>
              <p className="font-body leading-relaxed mb-4" style={{ fontSize: '15px', lineHeight: '1.8', color: '#6b7280' }}>
                Apex Conversion Affiliates is designed to empower affiliates with a seamless earning experience. Our platform combines cutting-edge security with intuitive tools, so you can connect, promote, and grow your income effortlessly.
              </p>
              <p className="font-body leading-relaxed mb-9" style={{ fontSize: '15px', lineHeight: '1.8', color: '#6b7280' }}>
                From flexible deposit plans to multi-level affiliate rewards, Apex gives you the flexibility to manage your portfolio your way — anytime, anywhere.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {['Designed for everyone', 'Earn as you go', 'All the tools you need', 'Flexible plans', 'Multiple earning levels', 'Simple to manage', 'Connect. Promote. Pay.', 'Quick to set up'].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#2563eb' }}
                    >
                      <CheckCircle size={10} color="#fff" />
                    </div>
                    <span className="font-body text-gray-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop"
                alt="Team"
                className="w-full object-cover"
                style={{ borderRadius: '20px', height: '230px', boxShadow: '0 16px 48px rgba(0,0,0,0.10)' }}
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
                  alt="Pro"
                  className="w-full object-cover"
                  style={{ borderRadius: '16px', height: '150px', boxShadow: '0 10px 28px rgba(0,0,0,0.09)' }}
                />
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=200&fit=crop"
                  alt="Business"
                  className="w-full object-cover"
                  style={{ borderRadius: '16px', height: '150px', boxShadow: '0 10px 28px rgba(0,0,0,0.09)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ background: '#fff', padding: '96px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span
              className="inline-block font-body font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ color: '#2563eb', background: 'rgba(37,99,235,0.07)' }}
            >
              Our People
            </span>
            <h2
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(26px, 4vw, 44px)', letterSpacing: '-1.5px', color: '#0a1628' }}
            >
              Our Affiliate Experts
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map(({ name, role, img }) => (
              <div
                key={name}
                className="group text-center rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1.5px solid #e8ecf4', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fff' }}
              >
                <div className="overflow-hidden" style={{ height: '170px' }}>
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-bold text-sm" style={{ color: '#0a1628' }}>{name}</h4>
                  <p className="font-body text-xs mt-1" style={{ color: '#9ca3af' }}>{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: '#0a1628', padding: '80px 0', overflow: 'hidden' }}>
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
          <span
            className="inline-block font-body font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
            style={{ color: '#60a5fa', background: 'rgba(96,165,250,0.10)' }}
          >
            What They Say
          </span>
          <h2
            className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(26px, 4vw, 44px)', letterSpacing: '-1.5px' }}
          >
            Client Testimonials
          </h2>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-scroll w-max">
            {[...testimonials, ...testimonials].map(({ quote, name, role }, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{
                  width: '290px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '24px'
                }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p
                  className="font-body leading-relaxed mb-5"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.60)' }}
                >
                  "{quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-white text-sm flex-shrink-0"
                    style={{ background: '#2563eb' }}
                  >
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white text-sm">{name}</p>
                    <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.30)' }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '96px 0', background: '#fff' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="relative overflow-hidden rounded-2xl p-12 text-center"
            style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 60%, #2563eb 100%)' }}
          >
            <div className="relative z-10">
              <h2
                className="font-heading font-bold text-white mb-4"
                style={{ fontSize: 'clamp(24px, 5vw, 46px)', letterSpacing: '-1.5px' }}
              >
                Ready to Start Earning?
              </h2>
              <p
                className="font-body text-white/55 mb-8"
                style={{ fontSize: '16px' }}
              >
                Join thousands of affiliates already earning with Apex Conversion Affiliates
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 font-body font-bold rounded-xl transition-all hover:scale-105"
                style={{
                  background: '#fff',
                  color: '#1e40af',
                  padding: '15px 40px',
                  fontSize: '15px',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
                  whiteSpace: 'nowrap'
                }}
              >
                Get Started Free <ChevronRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
      <section style={{ background: '#f8faff', padding: '64px 0', borderTop: '1px solid #e8ecf4' }}>
        <div className="max-w-lg mx-auto px-6 text-center">
          <h3
            className="font-heading font-bold mb-2"
            style={{ fontSize: '22px', letterSpacing: '-0.5px', color: '#0a1628' }}
          >
            Stay Informed
          </h3>
          <p className="font-body mb-7" style={{ color: '#9ca3af', fontSize: '14px' }}>
            Never miss an Apex update!
          </p>
          <div
            className="flex gap-2 p-1.5 rounded-xl"
            style={{ background: '#fff', border: '1.5px solid #e8ecf4' }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 font-body text-sm focus:outline-none bg-transparent px-3 text-navy-900 placeholder-gray-400"
              style={{ color: '#0a1628' }}
            />
            <button
              className="font-body font-bold text-white text-sm rounded-lg px-5 py-2.5 transition-all hover:opacity-90"
              style={{ background: '#2563eb', whiteSpace: 'nowrap' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Landing
