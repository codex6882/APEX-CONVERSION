import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export const ApexLogo = ({ white = false }: { white?: boolean }) => {
  const navy = white ? 'white' : '#0A1628'
  const blue = '#2563eb'
  return (
    <Link to="/" className="flex flex-col items-center gap-1 no-underline">
      {/* Icon */}
      <svg width="72" height="72" viewBox="0 0 200 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bold A shape - navy */}
        <polygon points="100,8 192,195 8,195" fill="none" stroke={navy} strokeWidth="18" strokeLinejoin="round" strokeLinecap="round"/>
        {/* Crossbar of A */}
        <line x1="42" y1="148" x2="158" y2="148" stroke={navy} strokeWidth="14" strokeLinecap="round"/>
        {/* Bar chart - 3 bars growing inside A */}
        <rect x="78" y="125" width="13" height="23" rx="2" fill={blue}/>
        <rect x="94" y="110" width="13" height="38" rx="2" fill={blue}/>
        <rect x="110" y="118" width="13" height="30" rx="2" fill={blue}/>
        {/* Swooping upward curved arrow */}
        <path d="M 55 155 Q 90 80 155 30" fill="none" stroke={blue} strokeWidth="9" strokeLinecap="round"/>
        {/* Arrowhead */}
        <polygon points="155,30 132,38 148,58" fill={blue}/>
      </svg>

      {/* Text block */}
      <div className="flex flex-col items-center leading-tight">
        {/* APEX — AP navy, EX blue */}
        <div className="flex items-center">
          <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'22px', letterSpacing:'3px', color: navy }}>AP</span>
          <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'22px', letterSpacing:'3px', color: blue }}>EX</span>
        </div>
        {/* CONVERSION */}
        <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'11px', letterSpacing:'4px', color: blue, marginTop:'1px' }}>CONVERSION</div>
        {/* — AFFILIATES — */}
        <div style={{ fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'9px', letterSpacing:'3px', color: navy, marginTop:'2px' }}>— AFFILIATES —</div>
        {/* Tagline */}
        <div style={{ fontFamily:'DM Sans,sans-serif', fontWeight:400, fontSize:'7px', letterSpacing:'2px', color: white ? 'rgba(255,255,255,0.5)' : '#6b7280', marginTop:'3px' }}>CONNECT. PROMOTE. EARN.</div>
      </div>
    </Link>
  )
}

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
