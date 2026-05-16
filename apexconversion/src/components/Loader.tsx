import { useEffect, useState } from 'react'

const Loader = () => {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHiding(true), 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`loader-overlay transition-opacity duration-500 ${hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex flex-col items-center gap-4">
        <div className={`${hiding ? '' : 'animate-spin-a'}`}>
          <svg width="80" height="80" viewBox="0 0 200 200" fill="none">
            {/* Big A shape */}
            <polygon points="100,10 185,185 15,185" fill="none" stroke="white" strokeWidth="14" strokeLinejoin="round"/>
            {/* Crossbar */}
            <line x1="45" y1="145" x2="155" y2="145" stroke="white" strokeWidth="12"/>
            {/* Bar chart inside */}
            <rect x="80" y="120" width="10" height="25" fill="#60a5fa"/>
            <rect x="95" y="105" width="10" height="40" fill="#60a5fa"/>
            <rect x="110" y="115" width="10" height="30" fill="#60a5fa"/>
            {/* Arrow */}
            <polyline points="95,60 140,20 170,50" fill="none" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            <polygon points="170,50 145,30 160,65" fill="#60a5fa"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-white font-heading font-bold text-xl tracking-widest">APEX</p>
          <p className="text-blue-400 text-xs font-body tracking-widest uppercase mt-1">Conversion Affiliates</p>
        </div>
        <div className="flex gap-1.5">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-dot" style={{ animationDelay: `${i*0.2}s` }}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loader
