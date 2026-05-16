import { useEffect, useState } from 'react'

const notifications = [
  (u: string, a: number) => `${u} just requested a $${a.toLocaleString()} withdrawal`,
  (u: string) => `${u}'s KYC has been verified ✅`,
  (u: string, a: number) => `${u}'s withdrawal of $${a.toLocaleString()} confirmed`,
  (u: string) => `${u} just received an $8 sign up bonus 🎉`,
  (u: string, a: number) => `${u} deposited $${a.toLocaleString()} successfully`,
]

const names = ['James_W', 'Sarah_M', 'Daniel_K', 'Priya_S', 'Marcus_T', 'Linda_C', 'Chris_P', 'Amara_N', 'John_D', 'Emma_R']
const amounts = [32500, 45800, 61200, 38900, 52400, 47100, 33600, 58300, 42700, 67500]
const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

const FloatingNotifications = () => {
  const [current, setCurrent] = useState({ msg: '', visible: false })
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const show = () => {
      const fn = notifications[idx % notifications.length]
      const msg = fn(rand(names), rand(amounts))
      setCurrent({ msg, visible: true })
      setTimeout(() => {
        setCurrent(p => ({ ...p, visible: false }))
        setTimeout(() => setIdx(p => p + 1), 600)
      }, 4500)
    }
    const t = setTimeout(show, 2000)
    return () => clearTimeout(t)
  }, [idx])

  return (
    <div className={`fixed bottom-6 left-4 z-50 max-w-xs transition-all duration-500 ${current.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
      <div className="bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-3 border border-sky-100">
        <div className="w-2.5 h-2.5 bg-green-400 rounded-full flex-shrink-0 animate-pulse-dot shadow-sm"></div>
        <p className="text-xs text-gray-700 font-body font-medium leading-snug">{current.msg}</p>
      </div>
    </div>
  )
}

export default FloatingNotifications
