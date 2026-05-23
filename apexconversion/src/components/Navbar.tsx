import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export const ApexLogo = ({ white = false }: { white?: boolean }) => {
  const navy = white ? '#ffffff' : '#0A1628'
  const blue = '#2563eb'
  return (
    <Link to="/" className="flex items-center gap-1 no-underline">
      {/* A with Saturn ring */}
      <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Clean bold letter A */}
        <text
          x="50" y="82"
          textAnchor="middle"
          fontFamily="Sora, Arial, sans-serif"
          fontWeight="900"
          fontSize="80"
          fill={navy}
        >A</text>
        {/* Saturn ring — ellipse going diagonally around the A */}
        {/* Back half of ring (behind A) — drawn first */}
        <ellipse cx="50" cy="52" rx="46" ry="14"
          fill="none"
          stroke={blue}
          strokeWidth="4"
          strokeDasharray="145 145"
          strokeDashoffset="0"
          transform="rotate(-20 50 52)"
          opacity="0.5"
        />
        {/* Front half of ring (in front of A) — drawn on top */}
        <ellipse cx="50" cy="52" rx="46" ry="14"
          fill="none"
          stroke={blue}
          strokeWidth="4"
          strokeDasharray="145 145"
          strokeDashoffset="145"
          transform="rotate(-20 50 52)"
        />
      </svg>
      {/* PEX text completing APEX */}
      <span style={{
        fontFamily: 'Sora, sans-serif',
        fontWeight: 900,
        fontSize: '26px',
        color: navy,
        letterSpacing: '1px',
        lineHeight: 1,
      }}>PEX</span>
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
