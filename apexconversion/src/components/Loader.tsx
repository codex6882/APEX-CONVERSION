import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const LogoIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="82" textAnchor="middle" fontFamily="Sora, Arial, sans-serif" fontWeight="900" fontSize="80" fill="white">A</text>
    <ellipse cx="50" cy="52" rx="46" ry="14" fill="none" stroke="#60a5fa" strokeWidth="4"
      strokeDasharray="145 145" strokeDashoffset="0" transform="rotate(-20 50 52)" opacity="0.5"/>
    <ellipse cx="50" cy="52" rx="46" ry="14" fill="none" stroke="#60a5fa" strokeWidth="4"
      strokeDasharray="145 145" strokeDashoffset="145" transform="rotate(-20 50 52)"/>
  </svg>
)

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
    <div className="loader-overlay">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin-a"><LogoIcon /></div>
        <div className="flex gap-1.5 mt-1">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-dot" style={{ animationDelay: `${i*0.2}s` }}/>
          ))}
        </div>
      </div>
    </div>
  )
}

const Loader = () => {
  const [hiding, setHiding] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHiding(true), 1000)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className={`loader-overlay transition-opacity duration-500 ${hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin-a"><LogoIcon /></div>
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
