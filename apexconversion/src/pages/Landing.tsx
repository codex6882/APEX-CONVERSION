import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Star, TrendingUp, Shield, Zap, Globe } from 'lucide-react'
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
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop')" }}/>
        {/* Rich layered overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.85) 50%, rgba(30,58,95,0.75) 100%)' }}/>
        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '80px 80px' }}/>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fadeInUp pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full text-sm font-body font-semibold"
            style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.4)', color: '#93c5fd' }}>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-dot"/>
            Trusted by 10,000+ Affiliates Worldwide
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold text-white leading-none mb-6"
            style={{ fontSize: 'clamp(48px, 8vw, 88px)', letterSpacing: '-2px' }}>
            Connect.<br/>
            Promote.<br/>
            <span style={{ color: '#3b82f6' }}>Earn.</span>
          </h1>

          <p className="font-body text-white/60 mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(16px, 2vw, 19px)' }}>
            Apex Conversion Affiliates empowers you to grow, earn, and succeed through a seamless affiliate experience built for everyone.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link to="/register"
              className="inline-flex items-center justify-center gap-2 font-body font-bold text-white rounded-xl transition-all"
              style={{ background: '#2563eb', padding: '16px 36px', fontSize: '15px', boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}>
              Join for Free <ArrowRight size={18}/>
            </Link>
            <a href="#howitworks"
              className="inline-flex items-center justify-center gap-2 font-body font-semibold text-white/80 rounded-xl transition-all hover:text-white"
              style={{ border: '1.5px solid rgba(255,255,255,0.2)', padding: '16px 36px', fontSize: '15px', background: 'rgba(255,255,255,0.05)' }}>
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 flex-wrap">
            {[['$12M+','Paid Out'],['10K+','Active Affiliates'],['4.9/5','Satisfaction Rating']].map(([n,l]) => (
              <div key={l} className="text-center px-6" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="font-heading font-bold text-white" style={{ fontSize: '32px', letterSpacing: '-1px' }}>{n}</p>
                <p className="font-body text-white/40 text-xs mt-1 tracking-widest uppercase">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, white, transparent)' }}/>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="howitworks" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="font-body font-bold text-xs tracking-widest uppercase text-blue-600 block mb-4">Simple Process</span>
            <h2 className="font-heading font-bold text-navy-900 mb-4" style={{ fontSize: 'clamp(32px,5vw,52px)', letterSpacing: '-1px' }}>
              How It Works
            </h2>
            <p className="font-body text-gray-400 max-w-md mx-auto text-lg">Three simple steps to start earning with Apex</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step:'01', icon: <TrendingUp size={28} className="text-blue-600"/>, title:'Create Account', desc:'Sign up for free and receive your $8 welcome bonus instantly upon registration.' },
              { step:'02', icon: <Zap size={28} className="text-blue-600"/>, title:'Start Promoting', desc:'Access your affiliate dashboard, make deposits and start earning commissions.' },
              { step:'03', icon: <Globe size={28} className="text-blue-600"/>, title:'Withdraw Earnings', desc:'Request withdrawals anytime to your wallet. Fast and transparent payouts.' },
            ].map(({step,icon,title,desc}) => (
              <div key={step} className="relative group"
                style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: '20px', padding: '36px 32px', transition: 'all 0.3s ease', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2563eb'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(37,99,235,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
                {/* Step number */}
                <div className="font-heading font-bold text-gray-100 absolute top-6 right-8" style={{ fontSize: '64px', letterSpacing: '-2px', lineHeight: 1 }}>{step}</div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10" style={{ background: '#eff6ff' }}>{icon}</div>
                <h3 className="font-heading font-bold text-navy-900 mb-3 relative z-10" style={{ fontSize: '20px' }}>{title}</h3>
                <p className="font-body text-gray-500 leading-relaxed relative z-10" style={{ fontSize: '14px' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: '#f8faff', padding: '112px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="font-body font-bold text-xs tracking-widest uppercase text-blue-600 block mb-4">About Us</span>
              <h2 className="font-heading font-bold text-navy-900 mb-8" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1px', lineHeight: 1.1 }}>
                Why Apex Conversion Affiliates?
              </h2>
              <p className="font-body text-gray-500 leading-relaxed mb-5" style={{ fontSize: '16px' }}>
                Apex Conversion Affiliates is designed to empower affiliates with a seamless earning experience. Our platform combines cutting-edge security with intuitive tools, so you can connect, promote, and grow your income effortlessly.
              </p>
              <p className="font-body text-gray-500 leading-relaxed mb-10" style={{ fontSize: '16px' }}>
                From flexible deposit plans to multi-level affiliate rewards, Apex gives you the flexibility to manage your portfolio your way — anytime, anywhere.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Designed for everyone','Earn as you go','All the tools you need','Flexible plans','Multiple earning levels','Simple to manage','Connect. Promote. Pay.','Quick to set up'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={12} className="text-white"/>
                    </div>
                    <span className="font-body text-gray-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop" alt="Team"
                className="w-full object-cover" style={{ borderRadius: '20px', height: '220px', boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }}/>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop" alt="Pro"
                  className="w-full object-cover" style={{ borderRadius: '16px', height: '150px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}/>
                <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=200&fit=crop" alt="Business"
                  className="w-full object-cover" style={{ borderRadius: '16px', height: '150px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section style={{ background: '#0a1628', padding: '64px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={24} className="text-blue-400"/>, title: 'Bank-Level Security', desc: 'Your funds and data are protected with enterprise-grade encryption.' },
              { icon: <Zap size={24} className="text-blue-400"/>, title: 'Instant Payouts', desc: 'Withdraw your earnings fast to any wallet or payment method.' },
              { icon: <Globe size={24} className="text-blue-400"/>, title: 'Global Access', desc: 'Earn from anywhere in the world — no restrictions, no borders.' },
            ].map(({icon,title,desc}) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(37,99,235,0.15)' }}>{icon}</div>
                <div>
                  <h4 className="font-heading font-bold text-white mb-1" style={{ fontSize: '16px' }}>{title}</h4>
                  <p className="font-body text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ background: '#fff', padding: '112px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-body font-bold text-xs tracking-widest uppercase text-blue-600 block mb-4">Our People</span>
            <h2 className="font-heading font-bold text-navy-900" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1px' }}>Our Affiliate Experts</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({name,role,img}) => (
              <div key={name} className="text-center group">
                <div className="relative mb-4 mx-auto" style={{ width: '88px', height: '88px' }}>
                  <img src={img} alt={name} className="w-full h-full object-cover rounded-full"
                    style={{ border: '3px solid #e5e7eb', transition: 'border-color 0.3s' }}/>
                  <div className="absolute inset-0 rounded-full" style={{ border: '3px solid #2563eb', opacity: 0, transition: 'opacity 0.3s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0'}/>
                </div>
                <h4 className="font-heading font-bold text-navy-900" style={{ fontSize: '14px' }}>{name}</h4>
                <p className="font-body text-gray-400 text-xs mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: '#0a1628', padding: '96px 0', overflow: 'hidden' }}>
        <div className="max-w-6xl mx-auto px-6 mb-14 text-center">
          <span className="font-body font-bold text-xs tracking-widest uppercase text-blue-400 block mb-4">What They Say</span>
          <h2 className="font-heading font-bold text-white" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1px' }}>Client Testimonials</h2>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-5 animate-scroll w-max">
            {[...testimonials,...testimonials].map(({quote,name,role},i) => (
              <div key={i} className="flex-shrink-0"
                style={{ width: '300px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px 24px' }}>
                <div className="text-blue-400 font-heading mb-3" style={{ fontSize: '40px', lineHeight: 1 }}>"</div>
                <p className="font-body text-white/70 leading-relaxed mb-5" style={{ fontSize: '14px' }}>{quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{name[0]}</div>
                  <div>
                    <p className="font-heading font-bold text-white text-xs">{name}</p>
                    <p className="font-body text-white/40 text-xs">{role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">{[...Array(5)].map((_,i) => <Star key={i} size={11} className="text-yellow-400 fill-yellow-400"/>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '112px 0', background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading font-bold text-white mb-5" style={{ fontSize: 'clamp(28px,5vw,52px)', letterSpacing: '-1px' }}>
            Ready to Start Earning?
          </h2>
          <p className="font-body text-white/75 mb-10" style={{ fontSize: '18px' }}>
            Join thousands of affiliates already earning with Apex Conversion Affiliates
          </p>
          <Link to="/register"
            className="inline-flex items-center gap-2 font-body font-bold text-blue-700 rounded-xl transition-all hover:scale-105"
            style={{ background: '#fff', padding: '18px 44px', fontSize: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            Get Started Free <ArrowRight size={18}/>
          </Link>
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
      <section style={{ background: '#f8faff', padding: '72px 0', borderTop: '1px solid #e5e7eb' }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <h3 className="font-heading font-bold text-navy-900 mb-8" style={{ fontSize: '22px', letterSpacing: '-0.5px' }}>
            Stay Informed — Never Miss An Apex Update!
          </h3>
          <div className="flex gap-3 flex-wrap justify-center">
            <input type="email" placeholder="Enter your email address"
              className="flex-1 font-body focus:outline-none"
              style={{ minWidth: '200px', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '14px', background: '#fff' }}/>
            <button className="font-body font-bold text-white transition-colors"
              style={{ background: '#2563eb', borderRadius: '12px', padding: '14px 24px', fontSize: '14px' }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer/>

      {/* WhatsApp Floating Button */}
      <a href={`https://wa.me/18262460563?text=${encodeURIComponent('This is LetterHub Support how can we be of help?')}`}
        target="_blank" rel="noopener noreferrer"
        style={{ position:'fixed', bottom:'24px', right:'16px', zIndex:9999, width:'56px', height:'56px', borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 20px rgba(37,211,102,0.5)', textDecoration:'none' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}

export default Landing
