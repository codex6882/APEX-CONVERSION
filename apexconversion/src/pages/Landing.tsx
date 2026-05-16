import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'
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
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <FloatingNotifications />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop')" }}/>
        <div className="absolute inset-0 bg-navy-900/85"/>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fadeInUp pt-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full text-sm font-body font-medium mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-dot"></span>
            Trusted by 10,000+ Affiliates Worldwide
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
            Connect. Promote.<br/><span className="text-blue-400">Earn.</span>
          </h1>
          <p className="text-blue-200 font-heading font-semibold text-lg mb-4">The Smarter Way to Affiliate.</p>
          <p className="text-white/65 text-base md:text-lg font-body mb-10 max-w-2xl mx-auto leading-relaxed">
            Apex Conversion Affiliates empowers you to grow, earn, and succeed through a seamless affiliate experience built for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-body font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl">
              Join for Free <ArrowRight size={18}/>
            </Link>
            <a href="#howitworks" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-body font-semibold hover:bg-white/10 transition-all">
              Learn More
            </a>
          </div>
          <div className="flex justify-center gap-10 flex-wrap">
            {[['$12M+','Paid Out'],['10K+','Active Affiliates'],['4.9/5','Satisfaction']].map(([n,l])=>(
              <div key={l} className="text-center">
                <p className="text-2xl font-heading font-bold text-white">{n}</p>
                <p className="text-white/40 text-xs font-body mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howitworks" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-body font-bold text-xs uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">How It Works</h2>
            <p className="text-gray-500 font-body max-w-xl mx-auto">Three simple steps to start earning with Apex</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step:'01', icon:'📝', title:'Create Account', desc:'Sign up for free and receive your $8 welcome bonus instantly' },
              { step:'02', icon:'💼', title:'Start Promoting', desc:'Access your affiliate dashboard, make deposits and start earning commissions' },
              { step:'03', icon:'💰', title:'Withdraw Earnings', desc:'Request withdrawals anytime to your wallet. Fast and transparent payouts' },
            ].map(({step,icon,title,desc})=>(
              <div key={step} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <div className="text-blue-600 font-body font-bold text-xs uppercase tracking-widest mb-3">Step {step}</div>
                <h3 className="text-lg font-heading font-bold text-navy-900 mb-3">{title}</h3>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 font-body font-bold text-xs uppercase tracking-widest mb-3">About Us</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-6">Why Apex Conversion Affiliates?</h2>
              <p className="text-gray-600 font-body leading-relaxed mb-4">
                Apex Conversion Affiliates is designed to empower affiliates with a seamless earning experience. Our platform combines cutting-edge security with intuitive tools, so you can connect, promote, and grow your income effortlessly.
              </p>
              <p className="text-gray-600 font-body leading-relaxed mb-8">
                From flexible deposit plans to multi-level affiliate rewards, Apex gives you the flexibility to manage your portfolio your way — anytime, anywhere.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Designed for everyone','Earn as you go','All the tools you need','Flexible plans','Multiple earning levels','Simple to manage','Connect. Promote. Pay.','Quick to set up'].map(f=>(
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-blue-600 flex-shrink-0"/>
                    <span className="text-gray-700 text-sm font-body">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=250&fit=crop" alt="Team" className="rounded-2xl w-full object-cover h-52 shadow-md"/>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop" alt="Pro" className="rounded-2xl w-full object-cover h-36 shadow-md"/>
                <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=200&fit=crop" alt="Business" className="rounded-2xl w-full object-cover h-36 shadow-md"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-body font-bold text-xs uppercase tracking-widest mb-3">Our People</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900">Our Affiliate Experts</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({name,role,img})=>(
              <div key={name} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 card-hover">
                <img src={img} alt={name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-blue-100 shadow"/>
                <h4 className="font-heading font-bold text-navy-900 text-sm">{name}</h4>
                <p className="text-gray-400 text-xs font-body mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-navy-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
          <p className="text-blue-400 font-body font-bold text-xs uppercase tracking-widest mb-3">What They Say</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Client Testimonials</h2>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll w-max">
            {[...testimonials,...testimonials].map(({quote,name,role},i)=>(
              <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-6 w-72 flex-shrink-0">
                <div className="text-blue-400 text-3xl mb-3 font-serif">"</div>
                <p className="text-white/75 text-sm font-body leading-relaxed mb-4">{quote}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{name[0]}</div>
                  <div><p className="text-white text-xs font-heading font-semibold">{name}</p><p className="text-white/40 text-xs font-body">{role}</p></div>
                </div>
                <div className="flex gap-1 mt-3">{[...Array(5)].map((_,i)=><Star key={i} size={11} className="text-yellow-400 fill-yellow-400"/>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Ready to Start Earning?</h2>
          <p className="text-white/80 font-body mb-8 text-lg">Join thousands of affiliates already earning with Apex Conversion Affiliates</p>
          <Link to="/register" className="bg-white text-blue-700 px-10 py-4 rounded-xl font-body font-bold text-base inline-flex items-center gap-2 hover:bg-blue-50 transition-all hover:scale-105 shadow-xl">
            Get Started Free <ArrowRight size={18}/>
          </Link>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-xl font-heading font-bold text-navy-900 mb-6">Stay Informed — Never Miss An Apex Update!</h3>
          <div className="flex gap-3 flex-wrap justify-center">
            <input type="email" placeholder="Enter your email address" className="flex-1 min-w-48 border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-blue-500"/>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-body font-semibold text-sm hover:bg-blue-700 transition-colors">Subscribe</button>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}

export default Landing
