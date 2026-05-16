import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { ApexLogo } from './Navbar'

const Footer = () => (
  <footer className="bg-navy-900 text-white pt-16 pb-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        <div className="space-y-4">
          <ApexLogo white />
          <p className="text-white/50 text-sm font-body leading-relaxed">Connecting affiliates worldwide with real earning opportunities.</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-white mb-4 text-sm">Quick Links</h4>
          <ul className="space-y-2">
            {[['Home','/'],['About','/#about'],['How It Works','/#howitworks']].map(([l,h])=>(
              <li key={l}><Link to={h} className="text-white/50 hover:text-white text-sm font-body transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-white mb-4 text-sm">Account</h4>
          <ul className="space-y-2">
            {[['Login','/login'],['Register','/register']].map(([l,h])=>(
              <li key={l}><Link to={h} className="text-white/50 hover:text-white text-sm font-body transition-colors">{l}</Link></li>
            ))}
            <li><h4 className="font-heading font-semibold text-white mt-4 mb-2 text-sm">Legal</h4></li>
            {[['Terms','/terms'],['Privacy','/privacy'],['Cookies','/cookies']].map(([l,h])=>(
              <li key={l}><Link to={h} className="text-white/50 hover:text-white text-sm font-body transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-white mb-4 text-sm">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-white/50 text-sm font-body"><Phone size={14}/><span>+1 (800) 000-0000</span></li>
            <li className="flex items-center gap-2 text-white/50 text-sm font-body"><Mail size={14}/><span>support@apexconversion.com</span></li>
            <li className="flex items-start gap-2 text-white/50 text-sm font-body"><MapPin size={14} className="mt-0.5 flex-shrink-0"/><span>123 Business Avenue, New York, NY 10001</span></li>
          </ul>
        </div>
      </div>
      <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/30 text-xs font-body">© 2026 Apex Conversion Affiliates. All Rights Reserved.</p>
        <p className="text-white/30 text-xs font-body">🔒 Your data and funds are always secure</p>
      </div>
    </div>
  </footer>
)

export default Footer
