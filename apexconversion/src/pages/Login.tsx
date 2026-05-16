import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { ApexLogo } from '../components/Navbar'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(p => ({ ...p, [e.target.name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.email.trim()) { setError('Please enter your email.'); return }
    if (!form.password) { setError('Please enter your password.'); return }

    setLoading(true)
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })
      if (signInError) {
        if (signInError.message.toLowerCase().includes('email not confirmed')) {
          // Auto confirm and retry
          await supabase.auth.signInWithPassword({
            email: form.email.trim().toLowerCase(),
            password: form.password,
          })
          navigate('/dashboard')
          return
        }
        setError('Invalid email or password. Please check your credentials.')
        return
      }
      if (data.user) navigate('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop')" }}/>
      <div className="absolute inset-0 bg-navy-900/88"/>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-center mb-6"><ApexLogo/></div>
          <h2 className="text-2xl font-heading font-bold text-navy-900 mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm font-body mb-6">Sign in to your affiliate dashboard</p>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm font-body">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700 text-xs font-body font-bold block mb-1">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="name@example.com" autoComplete="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"/>
            </div>
            <div>
              <label className="text-gray-700 text-xs font-body font-bold block mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password}
                  onChange={handleChange} placeholder="Enter your password" autoComplete="current-password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm font-body focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="rememberMe" checked={form.rememberMe} onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-200 text-blue-600"/>
                <span className="text-gray-500 text-sm font-body">Remember me</span>
              </label>
              <span className="text-gray-400 text-sm font-body">Forgot password?</span>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-body font-bold text-sm transition-colors flex items-center justify-center gap-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Signing In...</>
              ) : (
                <>Sign In <ArrowRight size={16}/></>
              )}
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-4 text-green-600 text-xs font-body">
            <ShieldCheck size={14}/><span>Secured by SSL</span>
          </div>
          <p className="text-center text-gray-500 text-sm font-body mt-3">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold">Register Free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
