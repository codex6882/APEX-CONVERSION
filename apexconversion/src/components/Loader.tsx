import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const LogoIcon = () => (
  <svg width="80" height="80" viewBox="0 0 200 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="100,8 192,195 8,195" fill="none" stroke="white" strokeWidth="18" strokeLinejoin="round" strokeLinecap="round"/>
    <line x1="42" y1="148" x2="158" y2="148" stroke="white" strokeWidth="14" strokeLinecap="round"/>
    <rect x="78" y="125" width="13" height="23" rx="2" fill="#60a5fa"/>
    <rect x="94" y="110" width="13" height="38" rx="2" fill="#60a5fa"/>
    <rect x="110" y="118" width="13" height="30" rx="2" fill="#60a5fa"/>
    <path d="M 55 155 Q 90 80 155 30" fill="none" stroke="#60a5fa" strokeWidth="9" strokeLinecap="round"/>
    <polygon points="155,30 132,38 148,58" fill="#60a5fa"/>
  </svg>
)

// Page transition loader — shows on every route change
export const PageLoader = () => {
  const location = useLocation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const t = setTimeout(() => setShow(false), 700)
    return () => clearTimeout(t)
  }, [location.pathname])

  if (!show) return null

  return (
    <div className="loader-overlay" style={{ transition: 'opacity 0.3s', opacity: show ? 1 : 0 }}>
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin-a">
          <LogoIcon />
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'22px', letterSpacing:'3px', color:'white' }}>AP</span>
            <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'22px', letterSpacing:'3px', color:'#60a5fa' }}>EX</span>
          </div>
          <p style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'10px', letterSpacing:'4px', color:'#60a5fa', marginTop:'2px' }}>CONVERSION</p>
          <p style={{ fontFamily:'DM Sans,sans-serif', fontWeight:400, fontSize:'8px', letterSpacing:'2px', color:'rgba(255,255,255,0.4)', marginTop:'3px' }}>CONNECT. PROMOTE. EARN.</p>
        </div>
        <div className="flex gap-1.5 mt-1">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-dot" style={{ animationDelay: `${i*0.2}s` }}/>
          ))}
        </div>
      </div>
    </div>
  )
}

// Initial app loader — shows on first load
const Loader = () => {
  const [hiding, setHiding] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHiding(true), 1000)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className={`loader-overlay transition-opacity duration-500 ${hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin-a">
          <LogoIcon />
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'22px', letterSpacing:'3px', color:'white' }}>AP</span>
            <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'22px', letterSpacing:'3px', color:'#60a5fa' }}>EX</span>
          </div>
          <p style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'10px', letterSpacing:'4px', color:'#60a5fa', marginTop:'2px' }}>CONVERSION</p>
          <p style={{ fontFamily:'DM Sans,sans-serif', fontWeight:400, fontSize:'8px', letterSpacing:'2px', color:'rgba(255,255,255,0.4)', marginTop:'3px' }}>CONNECT. PROMOTE. EARN.</p>
        </div>
        <div className="flex gap-1.5 mt-1">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-dot" style={{ animationDelay: `${i*0.2}s` }}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loader
