import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export const ApexLogo = ({ white = false }: { white?: boolean }) => (
  <Link to="/" className="flex items-center gap-3">
    <svg width="40" height="40" viewBox="0 0 200 200" fill="none">
      <polygon points="100,10 185,185 15,185" fill="none" stroke={white ? 'white' : '#0A1628'} strokeWidth="14" strokeLinejoin="round"/>
      <line x1="45" y1="145" x2="155" y2="145" stroke={white ? 'white' : '#0A1628'} strokeWidth="12"/>
      <rect x="80" y="120" width="10" height="25" fill="#2563eb"/>
      <rect x="95" y="105" width="10" height="40" fill="#2563eb"/>
      <rect x="110" y="115" width="10" height="30" fill="#2563eb"/>
      <polyline points="95,60 140,20 170,50" fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points="170,50 145,30 160,65" fill="#2563eb"/>
    </svg>
    <div>
      <div className={`font-heading font-bold text-base leading-tight ${white ? 'text-white' : 'text-navy-900'}`}>
        Apex<span className="text-blue-600">Conversion</span>
      </div>
      <div className={`font-body text-xs tracking-widest ${white ? 'text-white/60' : 'text-gray-500'}`}>AFFILIATES</div>
    </div>
  </Link>
)

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6">
      <ApexLogo white />
      <button onClick={() => setOpen(!open)} className="text-white p-2">
        {open ? <X size={24}/> : <Menu size={24}/>}
      </button>
      {open && (
        <div className="absolute top-16 right-0 left-0 bg-navy-900 border-t border-white/10 px-6 py-4 space-y-3 z-50">
          <a href="/#about" onClick={() => setOpen(false)} className="block text-white/80 hover:text-white py-2 font-body text-sm border-b border-white/10">About</a>
          <Link to="/login" onClick={() => setOpen(false)} className="block text-white/80 hover:text-white py-2 font-body text-sm border-b border-white/10">Login</Link>
          <Link to="/register" onClick={() => setOpen(false)} className="block bg-blue-600 text-white px-4 py-2.5 rounded-xl font-body font-semibold text-sm text-center">Register Free</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
