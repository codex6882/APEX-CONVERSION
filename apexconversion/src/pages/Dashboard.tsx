import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { Home, History, User, LogOut, Eye, EyeOff, DollarSign, Gift, ArrowUpRight, ArrowDownLeft, Upload, ChevronDown, Copy, CheckCircle2, Shield, Zap, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { ApexLogo } from '../components/Navbar'

const BTC_ADDRESS = 'bc1q9x56tf5ludyyulwvvy6c0pgkje2n5hu459zlhj'

const KycBadge = ({ status }: { status: string }) => {
  const config: Record<string, { bg: string; color: string; label: string }> = {
    not_submitted: { bg: '#fef2f2', color: '#ef4444', label: '🔴 KYC Not Submitted' },
    pending: { bg: '#fffbeb', color: '#f59e0b', label: '🟡 KYC Pending' },
    verified: { bg: '#f0fdf4', color: '#22c55e', label: '🟢 KYC Verified' },
    rejected: { bg: '#fef2f2', color: '#ef4444', label: '🔴 KYC Rejected' },
  }
  const c = config[status] || config.not_submitted
  return (
    <Link to="/dashboard/kyc">
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-body font-semibold"
        style={{ background: c.bg, color: c.color, border: `1px solid ${c.color}25` }}>
        <Shield size={11}/>{c.label}
      </span>
    </Link>
  )
}

const DashboardHome = () => {
  const { profile } = useAuth()
  const [showBalance, setShowBalance] = useState(true)
  if (!profile) return null
  return (
    <div className="space-y-5">
      <div>
        <p className="font-body text-gray-400 text-sm">{new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
        <h1 className="font-heading font-bold text-navy-900 mt-1" style={{ fontSize: '24px', letterSpacing: '-0.5px' }}>Hello, {profile.username} 👋</h1>
        <div className="mt-2"><KycBadge status={profile.kyc_status}/></div>
      </div>

      {/* Balance Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 text-white"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%)', boxShadow: '0 12px 40px rgba(10,22,40,0.3)' }}>
        <div className="absolute w-56 h-56 rounded-full opacity-10 top-0 right-0"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', transform: 'translate(30%,-30%)' }}/>
        <div className="absolute w-32 h-32 rounded-full opacity-5 bottom-0 left-0"
          style={{ background: 'radial-gradient(circle, #60a5fa, transparent)', transform: 'translate(-30%,30%)' }}/>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <p className="font-body text-white/50 text-xs tracking-widest uppercase">Account Balance</p>
            <button onClick={() => setShowBalance(!showBalance)} className="text-white/30 hover:text-white/70 transition-colors">
              {showBalance ? <Eye size={16}/> : <EyeOff size={16}/>}
            </button>
          </div>
          <p className="font-heading font-bold text-white mt-1 mb-1" style={{ fontSize: '44px', letterSpacing: '-2px', lineHeight: 1 }}>
            {showBalance ? `$${Number(profile.balance).toFixed(2)}` : '••••••'}
          </p>
          <p className="font-body text-white/25 text-xs mb-6">Updated {new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}</p>
          <div className="flex gap-3">
            <Link to="/dashboard/deposit"
              className="flex-1 flex items-center justify-center gap-2 font-body font-bold text-sm text-white rounded-2xl py-3 transition-all hover:opacity-90"
              style={{ background: '#2563eb', boxShadow: '0 4px 16px rgba(37,99,235,0.45)' }}>
              <ArrowDownLeft size={15}/> Deposit
            </Link>
            <Link to="/dashboard/withdraw"
              className="flex-1 flex items-center justify-center gap-2 font-body font-bold text-sm text-white rounded-2xl py-3 transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <ArrowUpRight size={15}/> Withdraw
            </Link>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label:'Total Profit', value:`$${Number(profile.balance).toFixed(2)}`, sub:'All time', icon:<DollarSign size={15}/>, color:'#22c55e', bg:'#f0fdf4' },
          { label:'Welcome Bonus', value:`$${Number(profile.bonus).toFixed(2)}`, sub:'Welcome Gift', icon:<Gift size={15}/>, color:'#f59e0b', bg:'#fffbeb' },
          { label:'Total Deposit', value:'$0.00', sub:'All time', icon:<ArrowDownLeft size={15}/>, color:'#3b82f6', bg:'#eff6ff' },
          { label:'Total Withdrawal', value:'$0.00', sub:'All time', icon:<ArrowUpRight size={15}/>, color:'#8b5cf6', bg:'#f5f3ff' },
        ].map(({label,value,sub,icon,color,bg}) => (
          <div key={label} className="rounded-2xl p-4" style={{ background: '#fff', border: '1.5px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="font-body text-gray-400 text-xs">{label}</p>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: bg, color }}>{icon}</div>
            </div>
            <p className="font-heading font-bold text-navy-900" style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>{value}</p>
            <p className="font-body text-xs mt-1" style={{ color }}>{sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const DepositPage = () => {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [amount, setAmount] = useState('')
  const copyAddress = () => { navigator.clipboard.writeText(BTC_ADDRESS); setCopied(true); setTimeout(()=>setCopied(false),2000) }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!amount || !proofFile) { setError('Please enter amount and upload proof.'); return }
    setLoading(true)
    try {
      const filePath = `${user?.id}/proof-${Date.now()}`
      const { error: upErr } = await supabase.storage.from('kyc-documents').upload(filePath, proofFile)
      if (upErr) throw upErr
      const { error: insErr } = await supabase.from('deposits').insert({ user_id: user?.id, amount: parseFloat(amount), proof_url: filePath, status: 'pending' })
      if (insErr) throw insErr
      setSuccess(true); setAmount(''); setProofFile(null)
    } catch { setError('Failed to submit. Please try again.') }
    finally { setLoading(false) }
  }
  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h2 className="font-heading font-bold text-navy-900" style={{ fontSize: '22px', letterSpacing: '-0.5px' }}>Make a Deposit</h2>
        <p className="font-body text-gray-400 text-sm mt-1">Send payment and submit proof below</p>
      </div>
      {success && <div className="rounded-2xl p-4 text-sm font-body font-medium" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d' }}>✅ Deposit submitted! Admin will confirm shortly.</div>}
      {error && <div className="rounded-2xl p-4 text-sm font-body font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>{error}</div>}
      <div className="relative overflow-hidden rounded-3xl p-6"
        style={{ background: 'linear-gradient(135deg, #0a1628, #1e3a5f)' }}>
        <div className="absolute w-40 h-40 rounded-full opacity-10 top-0 right-0" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', transform: 'translate(30%,-30%)' }}/>
        <p className="font-body text-white/40 text-xs tracking-widest uppercase mb-3 relative z-10">BTC Wallet Address</p>
        <div className="rounded-2xl p-3 mb-3 relative z-10" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="font-body text-white/75 text-xs break-all leading-relaxed">{BTC_ADDRESS}</p>
        </div>
        <button onClick={copyAddress} className="w-full flex items-center justify-center gap-2 font-body font-bold text-sm text-white rounded-2xl py-2.5 relative z-10 transition-all"
          style={{ background: copied ? '#22c55e' : '#2563eb' }}>
          {copied ? <><CheckCircle2 size={15}/>Copied!</> : <><Copy size={15}/>Copy Address</>}
        </button>
        <p className="font-body text-yellow-300/70 text-xs mt-3 leading-relaxed relative z-10">⚠️ Send payment first, then fill the form below and upload proof.</p>
      </div>
      <div className="rounded-3xl p-5" style={{ background: '#fff', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body font-semibold text-gray-700 text-sm block mb-1.5">Amount Sent ($)</label>
            <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00"
              className="w-full font-body text-sm focus:outline-none transition-all"
              style={{ border: '1.5px solid #e5e7eb', borderRadius: '14px', padding: '13px 16px', background: '#f9fafb' }}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'}/>
          </div>
          <div>
            <label className="font-body font-semibold text-gray-700 text-sm block mb-1.5">Upload Payment Proof</label>
            <label className="flex flex-col items-center gap-3 cursor-pointer transition-all rounded-2xl p-6"
              style={{ border: '2px dashed #e5e7eb', background: '#f9fafb' }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: '#eff6ff' }}>
                <Upload size={18} className="text-blue-600"/>
              </div>
              <span className="font-body text-sm text-gray-500">{proofFile ? proofFile.name : 'Click to upload screenshot'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={e=>setProofFile(e.target.files?.[0]||null)}/>
            </label>
          </div>
          <button type="submit" disabled={loading} className="w-full font-body font-bold text-sm text-white rounded-2xl py-3.5 transition-all hover:opacity-90"
            style={{ background: '#2563eb', boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }}>
            {loading ? 'Submitting...' : 'Submit Deposit'}
          </button>
        </form>
      </div>
    </div>
  )
}

const ActionsPage = () => (
  <div className="space-y-4 max-w-lg">
    <div>
      <h2 className="font-heading font-bold text-navy-900" style={{ fontSize: '22px', letterSpacing: '-0.5px' }}>Actions</h2>
      <p className="font-body text-gray-400 text-sm mt-1">Manage your account</p>
    </div>
    <div className="space-y-3">
      {[
        { to:'/dashboard/deposit', icon:<ArrowDownLeft size={22}/>, title:'Make a Deposit', sub:'Fund your account', color:'#2563eb', bg:'#eff6ff' },
        { to:'/dashboard/withdraw', icon:<ArrowUpRight size={22}/>, title:'Request Withdrawal', sub:'Withdraw your earnings', color:'#8b5cf6', bg:'#f5f3ff' },
        { to:'/dashboard/kyc', icon:<Shield size={22}/>, title:'KYC Verification', sub:'Verify your identity', color:'#22c55e', bg:'#f0fdf4' },
        { to:'/dashboard/history', icon:<TrendingUp size={22}/>, title:'Transaction History', sub:'View all records', color:'#f59e0b', bg:'#fffbeb' },
      ].map(({to,icon,title,sub,color,bg}) => (
        <Link key={to} to={to} className="flex items-center gap-4 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: '#fff', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: bg, color }}>{icon}</div>
          <div>
            <p className="font-heading font-bold text-navy-900" style={{ fontSize: '15px' }}>{title}</p>
            <p className="font-body text-gray-400 text-sm">{sub}</p>
          </div>
          <div className="ml-auto flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#f8faff' }}>
            <ArrowUpRight size={14} className="text-gray-300" style={{ transform: 'rotate(45deg)' }}/>
          </div>
        </Link>
      ))}
    </div>
  </div>
)

const WithdrawPage = () => {
  const { profile, refreshProfile, user } = useAuth()
  const [paymentType, setPaymentType] = useState<'btc' | 'usdt' | ''>('')
  const [amount, setAmount] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [usdtNetwork, setUsdtNetwork] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!amount || parseFloat(amount) <= 0) { setError('Please enter a valid amount.'); return }
    if (profile && parseFloat(amount) > profile.balance) { setError('Insufficient balance.'); return }
    if (!paymentType) { setError('Please select a crypto type.'); return }
    if (!walletAddress.trim()) { setError('Please enter your wallet address.'); return }
    if (paymentType === 'usdt' && !usdtNetwork) { setError('Please select USDT network.'); return }
    setLoading(true)
    const { error: err } = await supabase.from('withdrawals').insert({
      user_id: user?.id, amount: parseFloat(amount),
      payment_method: paymentType === 'btc' ? 'BTC' : `USDT (${usdtNetwork})`,
      wallet_type: paymentType === 'btc' ? 'BTC' : `USDT (${usdtNetwork})`,
      wallet_address: walletAddress, status: 'pending'
    })
    setLoading(false)
    if (err) { setError('Failed. Please try again.'); return }
    setSuccess(true); setAmount(''); setPaymentType(''); setWalletAddress(''); setUsdtNetwork('')
    refreshProfile()
  }
  const iStyle = { border: '1.5px solid #e5e7eb', borderRadius: '14px', padding: '13px 16px', fontSize: '14px', width: '100%', fontFamily: 'inherit', outline: 'none', background: '#f9fafb' }
  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h2 className="font-heading font-bold text-navy-900" style={{ fontSize: '22px', letterSpacing: '-0.5px' }}>Request Withdrawal</h2>
        <p className="font-body text-gray-400 text-sm mt-1">Withdraw to your crypto wallet</p>
      </div>
      <div className="rounded-2xl p-5 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #0a1628, #1e3a5f)', boxShadow: '0 8px 24px rgba(10,22,40,0.2)' }}>
        <div>
          <p className="font-body text-white/40 text-xs tracking-widest uppercase">Available Balance</p>
          <p className="font-heading font-bold text-white mt-1" style={{ fontSize: '32px', letterSpacing: '-1px' }}>${Number(profile?.balance||0).toFixed(2)}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.3)' }}>
          <DollarSign size={22} className="text-blue-400"/>
        </div>
      </div>
      {success && <div className="rounded-2xl p-4 text-sm font-body font-medium" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d' }}>✅ Withdrawal submitted! Admin will review shortly.</div>}
      {error && <div className="rounded-2xl p-4 text-sm font-body font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>{error}</div>}
      <div className="rounded-3xl p-5" style={{ background: '#fff', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body font-semibold text-gray-700 text-sm block mb-1.5">Amount ($)</label>
            <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" style={iStyle}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'}/>
          </div>
          <div>
            <label className="font-body font-semibold text-gray-700 text-sm block mb-2">Select Crypto</label>
            <div className="grid grid-cols-2 gap-3">
              {[{id:'btc',label:'₿ Bitcoin (BTC)'},{id:'usdt',label:'₮ Tether (USDT)'}].map(({id,label}) => (
                <button key={id} type="button" onClick={() => { setPaymentType(id as any); setUsdtNetwork('') }}
                  className="py-3.5 rounded-2xl text-sm font-body font-semibold transition-all"
                  style={{ border: `2px solid ${paymentType===id ? '#2563eb' : '#e5e7eb'}`, background: paymentType===id ? '#eff6ff' : '#f9fafb', color: paymentType===id ? '#2563eb' : '#9ca3af' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          {paymentType === 'usdt' && (
            <div>
              <label className="font-body font-semibold text-gray-700 text-sm block mb-1.5">Select Network</label>
              <div className="relative">
                <select value={usdtNetwork} onChange={e=>setUsdtNetwork(e.target.value)} style={{ ...iStyle, appearance: 'none' }}>
                  <option value="">Choose network</option>
                  <option value="TRC20">USDT - TRC20 (Tron)</option>
                  <option value="ERC20">USDT - ERC20 (Ethereum)</option>
                  <option value="BEP20">USDT - BEP20 (BSC)</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-4 text-gray-400 pointer-events-none"/>
              </div>
            </div>
          )}
          {paymentType && (
            <div>
              <label className="font-body font-semibold text-gray-700 text-sm block mb-1.5">{paymentType === 'btc' ? 'BTC' : 'USDT'} Wallet Address</label>
              <input type="text" value={walletAddress} onChange={e=>setWalletAddress(e.target.value)} placeholder="Enter your wallet address" style={iStyle}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'}/>
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full font-body font-bold text-sm text-white rounded-2xl py-3.5 transition-all hover:opacity-90"
            style={{ background: '#2563eb', boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

const KycPage = () => {
  const { profile, user, refreshProfile } = useAuth()
  const [docType, setDocType] = useState('')
  const [frontFile, setFrontFile] = useState<File|null>(null)
  const [backFile, setBackFile] = useState<File|null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  if (profile?.kyc_status==='pending') return (
    <div className="max-w-lg space-y-5">
      <h2 className="font-heading font-bold text-navy-900" style={{ fontSize: '22px' }}>KYC Verification</h2>
      <div className="rounded-2xl p-6" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
        <p className="font-body text-yellow-800 leading-relaxed">Your documents are under review. Our compliance team will verify within 24-48 hours.</p>
      </div>
    </div>
  )
  if (profile?.kyc_status==='verified') return (
    <div className="max-w-lg space-y-5">
      <h2 className="font-heading font-bold text-navy-900" style={{ fontSize: '22px' }}>KYC Verification</h2>
      <div className="rounded-2xl p-6" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <p className="font-body text-green-800 font-bold">✅ Your identity has been verified!</p>
      </div>
    </div>
  )
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!docType||!frontFile||!backFile) { setError('Please select document type and upload both sides.'); return }
    setLoading(true)
    try {
      const up = async (f: File, p: string) => { const { data, error } = await supabase.storage.from('kyc-documents').upload(p, f); if (error) throw error; return data.path }
      const fp = await up(frontFile, `${user?.id}/front-${Date.now()}`)
      const bp = await up(backFile, `${user?.id}/back-${Date.now()}`)
      await supabase.from('kyc_submissions').insert({ user_id: user?.id, document_type: docType, front_url: fp, back_url: bp, status: 'pending' })
      await supabase.from('profiles').update({ kyc_status: 'pending' }).eq('id', user?.id)
      setSuccess(true); refreshProfile()
    } catch { setError('Upload failed. Please try again.') }
    finally { setLoading(false) }
  }
  return (
    <div className="max-w-lg space-y-5">
      <div>
        <h2 className="font-heading font-bold text-navy-900" style={{ fontSize: '22px' }}>KYC Verification</h2>
        <p className="font-body text-gray-400 text-sm mt-1">Upload your identity document</p>
      </div>
      {error && <div className="rounded-2xl p-4 text-sm font-body" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>{error}</div>}
      {success ? (
        <div className="rounded-2xl p-6" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="font-body text-green-800 leading-relaxed">Documents submitted. Our team will verify within 24-48 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl p-5" style={{ background: '#fff', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div>
            <label className="font-body font-semibold text-gray-700 text-sm block mb-1.5">Document Type</label>
            <div className="relative">
              <select value={docType} onChange={e=>setDocType(e.target.value)}
                className="w-full font-body text-sm focus:outline-none appearance-none bg-white"
                style={{ border: '1.5px solid #e5e7eb', borderRadius: '14px', padding: '13px 16px' }}>
                <option value="">Select document type</option>
                <option value="national_id">National ID</option>
                <option value="drivers_license">Driver's License</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          {docType && (
            <>
              {[['Front',setFrontFile,frontFile],['Back',setBackFile,backFile]].map(([label,setter,file])=>(
                <div key={label as string}>
                  <label className="font-body font-semibold text-gray-700 text-sm block mb-1.5">{label as string} of Document</label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer rounded-2xl p-6"
                    style={{ border: '2px dashed #e5e7eb', background: '#f9fafb' }}>
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: '#eff6ff' }}>
                      <Upload size={18} className="text-blue-600"/>
                    </div>
                    <span className="font-body text-sm text-gray-500">{(file as File|null)?.name || `Upload ${(label as string).toLowerCase()}`}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e=>(setter as Function)(e.target.files?.[0]||null)}/>
                  </label>
                </div>
              ))}
            </>
          )}
          <button type="submit" disabled={loading||!docType} className="w-full font-body font-bold text-sm text-white rounded-2xl py-3.5"
            style={{ background: loading||!docType ? '#93c5fd' : '#2563eb' }}>
            {loading ? 'Submitting...' : 'Submit KYC'}
          </button>
        </form>
      )}
    </div>
  )
}

const HistoryPage = () => {
  const { user } = useAuth()
  const [tab, setTab] = useState<'deposits'|'withdrawals'>('deposits')
  const [deposits, setDeposits] = useState<any[]>([])
  const [withdrawals, setWithdrawals] = useState<any[]>([])
  useEffect(() => {
    if (user) {
      supabase.from('deposits').select('*').eq('user_id',user.id).order('created_at',{ascending:false}).then(({data})=>{ if(data) setDeposits(data) })
      supabase.from('withdrawals').select('*').eq('user_id',user.id).order('created_at',{ascending:false}).then(({data})=>{ if(data) setWithdrawals(data) })
    }
  }, [user])
  const statusStyle: Record<string,any> = {
    pending: { background: '#fffbeb', color: '#d97706' },
    approved: { background: '#f0fdf4', color: '#16a34a' },
    rejected: { background: '#fef2f2', color: '#dc2626' },
  }
  const data = tab==='deposits' ? deposits : withdrawals
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading font-bold text-navy-900" style={{ fontSize: '22px', letterSpacing: '-0.5px' }}>History</h2>
        <p className="font-body text-gray-400 text-sm mt-1">Your transaction records</p>
      </div>
      <div className="flex gap-1 p-1 rounded-2xl w-fit" style={{ background: '#f1f5f9' }}>
        {(['deposits','withdrawals'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className="font-body font-semibold capitalize text-sm px-5 py-2 rounded-xl transition-all"
            style={{ background: tab===t ? '#fff' : 'transparent', color: tab===t ? '#0a1628' : '#9ca3af', boxShadow: tab===t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {data.length===0 ? (
          <div className="text-center py-14 rounded-2xl" style={{ background: '#f9fafb', border: '1.5px dashed #e5e7eb' }}>
            <p className="font-body text-gray-400 text-sm">No {tab} yet.</p>
          </div>
        ) : data.map((item:any)=>(
          <div key={item.id} className="flex items-center justify-between rounded-2xl p-4"
            style={{ background: '#fff', border: '1.5px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: tab==='deposits' ? '#eff6ff' : '#f5f3ff' }}>
                {tab==='deposits' ? <ArrowDownLeft size={16} className="text-blue-600"/> : <ArrowUpRight size={16} className="text-purple-600"/>}
              </div>
              <div>
                <p className="font-body font-semibold text-navy-900 text-sm capitalize">{tab==='deposits'?'Deposit':'Withdrawal'}</p>
                <p className="font-body text-gray-400 text-xs">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-heading font-bold text-navy-900" style={{ fontSize: '16px' }}>${item.amount}</p>
              <span className="px-3 py-1 rounded-xl text-xs font-body font-semibold" style={statusStyle[item.status]||statusStyle.pending}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ProfilePage = () => {
  const { profile } = useAuth()
  if (!profile) return null
  return (
    <div className="max-w-lg space-y-5">
      <div>
        <h2 className="font-heading font-bold text-navy-900" style={{ fontSize: '22px', letterSpacing: '-0.5px' }}>My Profile</h2>
        <p className="font-body text-gray-400 text-sm mt-1">Your account details</p>
      </div>
      <div className="relative overflow-hidden rounded-3xl p-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0a1628, #1e3a5f)', boxShadow: '0 12px 40px rgba(10,22,40,0.25)' }}>
        <div className="absolute w-48 h-48 rounded-full opacity-10 top-0 right-0" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', transform: 'translate(30%,-30%)' }}/>
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-heading font-bold mx-auto mb-3 relative z-10"
          style={{ boxShadow: '0 4px 16px rgba(37,99,235,0.4)' }}>{profile.username?.[0]?.toUpperCase()}</div>
        <p className="font-heading font-bold text-white relative z-10" style={{ fontSize: '18px' }}>{profile.full_name}</p>
        <p className="font-body text-white/40 text-sm relative z-10">@{profile.username}</p>
        <div className="mt-3 relative z-10"><KycBadge status={profile.kyc_status}/></div>
      </div>
      <div className="rounded-3xl overflow-hidden" style={{ border: '1.5px solid #e5e7eb' }}>
        {[['Username',profile.username],['Full Name',profile.full_name],['Email',profile.email],['Phone',profile.phone],['Country',profile.country],['Member Since',new Date(profile.created_at).toLocaleDateString()],['Account Balance',`$${Number(profile.balance).toFixed(2)}`],['Welcome Bonus',`$${Number(profile.bonus).toFixed(2)}`]].map(([label,value],idx) => (
          <div key={label} className="flex justify-between items-center px-5 py-3.5"
            style={{ background: idx%2===0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #f1f5f9' }}>
            <span className="font-body text-gray-400 text-sm">{label}</span>
            <span className="font-body font-semibold text-navy-900 text-sm">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const navItems = [
  { to:'/dashboard', label:'Home', icon:Home },
  { to:'/dashboard/actions', label:'Actions', icon:Zap },
  { to:'/dashboard/history', label:'History', icon:History },
  { to:'/dashboard/profile', label:'Profile', icon:User },
]

const Dashboard = () => {
  const { profile, signOut } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//code.jivosite.com/widget/k2cLFGxtnF'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
      const jivo = document.getElementById('jivo-iframe-container')
      if (jivo) jivo.remove()
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4"
        style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
        <ApexLogo/>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-heading font-bold"
            style={{ boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}>
            {profile?.username?.[0]?.toUpperCase()||'U'}
          </div>
          <button onClick={signOut} className="flex items-center gap-1.5 font-body text-sm text-gray-400 hover:text-gray-700 transition-colors">
            <LogOut size={15}/><span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="pt-16 pb-24 px-4 max-w-2xl mx-auto">
        <div className="py-6">
          <Routes>
            <Route index element={<DashboardHome/>}/>
            <Route path="deposit" element={<DepositPage/>}/>
            <Route path="actions" element={<ActionsPage/>}/>
            <Route path="withdraw" element={<WithdrawPage/>}/>
            <Route path="kyc" element={<KycPage/>}/>
            <Route path="history" element={<HistoryPage/>}/>
            <Route path="profile" element={<ProfilePage/>}/>
            <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
          </Routes>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around px-2 py-2"
        style={{ background: '#fff', borderTop: '1px solid #f1f5f9', boxShadow: '0 -4px 16px rgba(0,0,0,0.05)' }}>
        {navItems.map(({to,label,icon:Icon})=>{
          const active = location.pathname===to||(to!=='/dashboard'&&location.pathname.startsWith(to))
          return (
            <Link key={to} to={to} className="flex flex-col items-center gap-1 py-1.5 px-4 rounded-2xl transition-all"
              style={{ color: active ? '#2563eb' : '#9ca3af', background: active ? 'rgba(37,99,235,0.06)' : 'transparent' }}>
              <Icon size={20}/><span className="font-body text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Dashboard
