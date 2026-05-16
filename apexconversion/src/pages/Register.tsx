import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Gift, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { ApexLogo } from '../components/Navbar'

const countries = ["Afghanistan","Albania","Algeria","Argentina","Australia","Austria","Bangladesh","Belgium","Brazil","Canada","Chile","China","Colombia","Croatia","Czech Republic","Denmark","Egypt","Ethiopia","Finland","France","Germany","Ghana","Greece","Hungary","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Japan","Jordan","Kenya","Malaysia","Mexico","Morocco","Netherlands","New Zealand","Nigeria","Norway","Pakistan","Peru","Philippines","Poland","Portugal","Romania","Russia","Saudi Arabia","Singapore","South Africa","South Korea","Spain","Sri Lanka","Sweden","Switzerland","Tanzania","Thailand","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Vietnam","Zimbabwe"]

const Register = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: '', fullName: '', email: '', phone: '',
    password: '', confirmPassword: '', country: '', referralCode: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.username.trim()) { setError('Username is required.'); return }
    if (!form.fullName.trim()) { setError('Full name is required.'); return }
    if (!form.email.trim()) { setError('Email is required.'); return }
    if (!form.phone.trim()) { setError('Phone number is required.'); return }
    if (!form.country) { setError('Please select your country.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }

    setLoading(true)
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email.trim().toLowerCase(),
        password: form.password,
        options: {
          emailRedirectTo: undefined,
          data: {
            username: form.username.trim(),
            full_name: form.fullName.trim(),
            phone: form.phone.trim(),
            country: form.country,
            referral_code: form.referralCode.trim() || '',
          }
        }
      })

      if (signUpError) {
        if (signUpError.message.toLowerCase().includes('already registered') || signUpError.message.toLowerCase().includes('already exists')) {
          setError('This email is already registered. Please sign in instead.')
        } else if (signUpError.message.toLowerCase().includes('invalid email')) {
          setError('Please enter a valid email address.')
        } else {
          setError(signUpError.message)
        }
        return
      }

      if (data.user) {
        // Small delay for trigger to create profile
        await new Promise(r => setTimeout(r, 1200))
        navigate('/dashboard')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560472355-536de3962603?w=1920&h=1080&fit=crop')" }}/>
      <div className="absolute inset-0 bg-navy-900/88"/>
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-center mb-6"><ApexLogo/></div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center gap-3 mb-6">
            <Gift size={18} className="text-blue-600 flex-shrink-0"/>
            <p className="text-blue-700 text-sm font-body font-semibold">
              Get a <span className="text-blue-600 font-bold">$8 welcome bonus</span> instantly on signup!
            </p>
          </div>
          <h2 className="text-2xl font-heading font-bold text-navy-900 mb-1">Create your Account</h2>
          <p className="text-gray-500 text-sm font-body mb-6">Fill in your details to get started</p>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm font-body">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 text-xs font-body font-bold block mb-1">Username *</label>
                <input type="text" name="username" value={form.username} onChange={handleChange}
                  placeholder="Username" autoComplete="off"
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm font-body focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"/>
              </div>
              <div>
                <label className="text-gray-700 text-xs font-body font-bold block mb-1">Full Name *</label>
                <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                  placeholder="Full name" autoComplete="name"
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm font-body focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"/>
              </div>
            </div>
            <div>
              <label className="text-gray-700 text-xs font-body font-bold block mb-1">Email Address *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="name@example.com" autoComplete="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"/>
            </div>
            <div>
              <label className="text-gray-700 text-xs font-body font-bold block mb-1">Phone Number *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                placeholder="+1 000 000 0000" autoComplete="tel"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"/>
            </div>
            <div>
              <label className="text-gray-700 text-xs font-body font-bold block mb-1">Country *</label>
              <select name="country" value={form.country} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-blue-500 bg-white">
                <option value="">Select your country</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 text-xs font-body font-bold block mb-1">Password *</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} name="password" value={form.password}
                    onChange={handleChange} placeholder="Min 6 chars" autoComplete="new-password"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 pr-9 text-sm font-body focus:outline-none focus:border-blue-500"/>
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-2.5 top-3 text-gray-400">
                    {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-gray-700 text-xs font-body font-bold block mb-1">Confirm *</label>
                <div className="relative">
                  <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword}
                    onChange={handleChange} placeholder="Repeat" autoComplete="new-password"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 pr-9 text-sm font-body focus:outline-none focus:border-blue-500"/>
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-2.5 top-3 text-gray-400">
                    {showConfirm ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="text-gray-700 text-xs font-body font-bold block mb-1">Referral Code (optional)</label>
              <input type="text" name="referralCode" value={form.referralCode} onChange={handleChange}
                placeholder="Enter referral code if you have one"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-blue-500"/>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-body font-bold text-sm transition-colors flex items-center justify-center gap-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Creating Account...</>
              ) : (
                <><CheckCircle size={16}/>Create Account</>
              )}
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm font-body mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
