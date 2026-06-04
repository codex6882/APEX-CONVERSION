import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import {
  Home, History, User, LogOut, Eye, EyeOff, DollarSign, Gift,
  ArrowUpRight, ArrowDownLeft, Upload, ChevronDown, Copy,
  CheckCircle2, Shield, Zap, TrendingUp, ChevronRight, Bell
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { ApexLogo } from '../components/Navbar'

const BTC_ADDRESS = 'bc1q9x56tf5ludyyulwvvy6c0pgkje2n5hu459zlhj'

/* ─── KYC Badge ─── */
const KycBadge = ({ status }: { status: string }) => {
  const config: Record<string, { bg: string; color: string; dot: string; label: string }> = {
    not_submitted: { bg: 'rgba(239,68,68,0.12)', color: '#f87171', dot: '#ef4444', label: 'KYC Not Submitted' },
    pending:       { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', dot: '#f59e0b', label: 'KYC Pending' },
    verified:      { bg: 'rgba(34,197,94,0.12)',  color: '#4ade80', dot: '#22c55e', label: 'KYC Verified' },
    rejected:      { bg: 'rgba(239,68,68,0.12)', color: '#f87171', dot: '#ef4444', label: 'KYC Rejected' },
  }
  const c = config[status] || config.not_submitted
  return (
    <Link to="/dashboard/kyc">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold"
        style={{ background: c.bg, color: c.color }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
        {c.label}
      </span>
    </Link>
  )
}

/* ─── Input style ─── */
const iStyle: React.CSSProperties = {
  border: '1px solid #e2e8f0', borderRadius: '10px',
  padding: '12px 14px', fontSize: '14px', width: '100%',
  fontFamily: 'inherit', outline: 'none',
  background: '#f8faff', color: '#0f172a',
}

/* ══════════════════════════════════════════
   DASHBOARD HOME
══════════════════════════════════════════ */
const DashboardHome = () => {
  const { profile } = useAuth()
  const [showBalance, setShowBalance] = useState(true)
  if (!profile) return null

  return (
    <div>
      {/* ── Dark hero zone — full width ── */}
      <div style={{ background: '#06101f', padding: '20px 16px 0' }}>

        {/* Top row: greeting + bell */}
        <div className="flex items-start justify-between mb-6 pt-2">
          <div>
            <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '2px' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
            <h1 className="font-heading font-bold text-white" style={{ fontSize: '20px', letterSpacing: '-0.3px' }}>
              Hello, {profile.username}
            </h1>
            <div className="mt-2"><KycBadge status={profile.kyc_status} /></div>
          </div>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Bell size={16} style={{ color: 'rgba(255,255,255,0.45)' }} />
          </div>
        </div>

        {/* Balance */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-body uppercase tracking-widest" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '2px' }}>
              Account Balance
            </p>
            <button onClick={() => setShowBalance(!showBalance)} style={{ color: 'rgba(255,255,255,0.28)' }}>
              {showBalance ? <Eye size={13} /> : <EyeOff size={13} />}
            </button>
          </div>
          <p className="font-heading font-bold text-white" style={{ fontSize: '48px', letterSpacing: '-3px', lineHeight: 1 }}>
            {showBalance ? `$${Number(profile.balance).toFixed(2)}` : '••••••'}
          </p>
          <p className="font-body mt-1" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.20)' }}>
            Updated {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-6">
          <Link to="/dashboard/deposit"
            className="flex-1 flex items-center justify-center gap-2 font-body font-bold text-white py-3.5 transition-all hover:opacity-90"
            style={{ background: '#2563eb', borderRadius: '12px', fontSize: '13px' }}>
            <ArrowDownLeft size={15} /> Deposit
          </Link>
          <Link to="/dashboard/withdraw"
            className="flex-1 flex items-center justify-center gap-2 font-body font-semibold py-3.5 transition-all hover:opacity-80"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '12px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.65)',
            }}>
            <ArrowUpRight size={15} /> Withdraw
          </Link>
        </div>

        {/* Dark bottom padding */}
        <div style={{ height: '20px' }} />
      </div>

      {/* ── Light content zone ── */}
      <div style={{ background: '#f4f6fb', padding: '20px 16px 0' }}>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Total Profit',     value: `$${Number(profile.balance).toFixed(2)}`, icon: <TrendingUp size={15}/>, color: '#16a34a', bg: '#f0fdf4', border: '#dcfce7' },
            { label: 'Welcome Bonus',    value: `$${Number(profile.bonus).toFixed(2)}`,   icon: <Gift size={15}/>,       color: '#d97706', bg: '#fffbeb', border: '#fef3c7' },
            { label: 'Total Deposited',  value: '$0.00',                                  icon: <ArrowDownLeft size={15}/>, color: '#2563eb', bg: '#eff6ff', border: '#dbeafe' },
            { label: 'Total Withdrawn',  value: '$0.00',                                  icon: <ArrowUpRight size={15}/>,  color: '#7c3aed', bg: '#f5f3ff', border: '#ede9fe' },
          ].map(({ label, value, icon, color, bg, border }) => (
            <div key={label} className="rounded-xl p-4"
              style={{ background: '#fff', border: '1px solid #e8edf5', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: bg, border: `1px solid ${border}`, color }}>
                {icon}
              </div>
              <p className="font-heading font-bold" style={{ fontSize: '20px', letterSpacing: '-0.5px', color: '#0f172a', lineHeight: 1 }}>
                {value}
              </p>
              <p className="font-body text-xs mt-1" style={{ color: '#94a3b8' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Quick links row */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #e8edf5', background: '#fff' }}>
          {[
            { to: '/dashboard/actions',  label: 'All Actions',         icon: <Zap size={15}/>,          color: '#2563eb' },
            { to: '/dashboard/history',  label: 'Transaction History', icon: <History size={15}/>,      color: '#7c3aed' },
            { to: '/dashboard/kyc',      label: 'KYC Verification',    icon: <Shield size={15}/>,       color: '#16a34a' },
          ].map(({ to, label, icon, color }, i, arr) => (
            <Link key={to} to={to}
              className="flex items-center justify-between px-4 py-3.5 transition-all hover:bg-gray-50"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}12`, color }}>
                  {icon}
                </div>
                <span className="font-body font-medium text-sm" style={{ color: '#334155' }}>{label}</span>
              </div>
              <ChevronRight size={14} style={{ color: '#cbd5e1' }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   PAGE HEADER — reusable
══════════════════════════════════════════ */
const PageHeader = ({ title, sub }: { title: string; sub: string }) => (
  <div style={{ paddingBottom: '16px', borderBottom: '1px solid #e8edf5', marginBottom: '20px' }}>
    <h2 className="font-heading font-bold" style={{ fontSize: '20px', letterSpacing: '-0.5px', color: '#0f172a' }}>{title}</h2>
    <p className="font-body text-sm mt-0.5" style={{ color: '#94a3b8' }}>{sub}</p>
  </div>
)

/* ══════════════════════════════════════════
   DEPOSIT PAGE
══════════════════════════════════════════ */
const DepositPage = () => {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [amount, setAmount] = useState('')

  const copyAddress = () => { navigator.clipboard.writeText(BTC_ADDRESS); setCopied(true); setTimeout(() => setCopied(false), 2000) }
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
    <div className="space-y-4 max-w-lg">
      <PageHeader title="Make a Deposit" sub="Send BTC and submit proof below" />
      {success && <div className="rounded-xl p-4 text-sm font-body" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d' }}>Deposit submitted. Admin will confirm shortly.</div>}
      {error && <div className="rounded-xl p-4 text-sm font-body" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>{error}</div>}

      {/* BTC Address */}
      <div className="rounded-2xl p-5" style={{ background: '#06101f' }}>
        <p className="font-body uppercase tracking-widest mb-3" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '2px' }}>BTC Wallet Address</p>
        <div className="rounded-xl p-3 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="font-body break-all leading-relaxed" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.60)' }}>{BTC_ADDRESS}</p>
        </div>
        <button onClick={copyAddress}
          className="w-full flex items-center justify-center gap-2 font-body font-bold text-sm text-white rounded-xl py-3 transition-all hover:opacity-90"
          style={{ background: copied ? '#16a34a' : '#2563eb', fontSize: '13px' }}>
          {copied ? <><CheckCircle2 size={14} /> Copied!</> : <><Copy size={14} /> Copy Address</>}
        </button>
        <p className="font-body mt-3 leading-relaxed" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>
          Send payment first, then fill the form below and upload proof.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #e8edf5' }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body font-semibold text-sm block mb-1.5" style={{ color: '#374151' }}>Amount Sent ($)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" style={iStyle}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e2e8f0'} />
          </div>
          <div>
            <label className="font-body font-semibold text-sm block mb-1.5" style={{ color: '#374151' }}>Upload Payment Proof</label>
            <label className="flex flex-col items-center gap-2 cursor-pointer rounded-xl p-5" style={{ border: '1.5px dashed #e2e8f0', background: '#f8faff' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#eff6ff' }}>
                <Upload size={16} className="text-blue-600" />
              </div>
              <span className="font-body text-sm" style={{ color: '#94a3b8' }}>{proofFile ? proofFile.name : 'Click to upload screenshot'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={e => setProofFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          <button type="submit" disabled={loading}
            className="w-full font-body font-bold text-sm text-white rounded-xl py-3.5 transition-all hover:opacity-90"
            style={{ background: '#2563eb' }}>
            {loading ? 'Submitting...' : 'Submit Deposit'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   ACTIONS PAGE
══════════════════════════════════════════ */
const ActionsPage = () => (
  <div className="space-y-3 max-w-lg">
    <PageHeader title="Actions" sub="Manage your account" />
    {[
      { to: '/dashboard/deposit',  icon: <ArrowDownLeft size={22}/>, title: 'Make a Deposit',      sub: 'Fund your account',       color: '#2563eb', bg: '#eff6ff', border: '#dbeafe' },
      { to: '/dashboard/withdraw', icon: <ArrowUpRight size={22}/>,  title: 'Request Withdrawal',  sub: 'Withdraw your earnings',  color: '#7c3aed', bg: '#f5f3ff', border: '#ede9fe' },
      { to: '/dashboard/kyc',      icon: <Shield size={22}/>,        title: 'KYC Verification',    sub: 'Verify your identity',    color: '#16a34a', bg: '#f0fdf4', border: '#dcfce7' },
      { to: '/dashboard/history',  icon: <TrendingUp size={22}/>,    title: 'Transaction History', sub: 'View all records',        color: '#d97706', bg: '#fffbeb', border: '#fef3c7' },
    ].map(({ to, icon, title, sub, color, bg, border }) => (
      <Link key={to} to={to}
        className="flex items-center gap-4 rounded-xl p-4 transition-all active:scale-98"
        style={{ background: '#fff', border: '1px solid #e8edf5', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: bg, border: `1px solid ${border}`, color }}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-heading font-bold text-sm" style={{ color: '#0f172a' }}>{title}</p>
          <p className="font-body text-xs mt-0.5" style={{ color: '#94a3b8' }}>{sub}</p>
        </div>
        <ChevronRight size={15} style={{ color: '#cbd5e1' }} />
      </Link>
    ))}
  </div>
)

/* ══════════════════════════════════════════
   WITHDRAW PAGE
══════════════════════════════════════════ */
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

  return (
    <div className="space-y-4 max-w-lg">
      <PageHeader title="Request Withdrawal" sub="Withdraw to your crypto wallet" />

      {/* Balance strip */}
      <div className="flex items-center justify-between rounded-xl p-4" style={{ background: '#06101f' }}>
        <div>
          <p className="font-body uppercase tracking-widest mb-1" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '2px' }}>Available Balance</p>
          <p className="font-heading font-bold text-white" style={{ fontSize: '30px', letterSpacing: '-1.5px', lineHeight: 1 }}>
            ${Number(profile?.balance || 0).toFixed(2)}
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.20)' }}>
          <DollarSign size={18} className="text-blue-400" />
        </div>
      </div>

      {success && <div className="rounded-xl p-4 text-sm font-body" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d' }}>Withdrawal submitted. Admin will review shortly.</div>}
      {error && <div className="rounded-xl p-4 text-sm font-body" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>{error}</div>}

      <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #e8edf5' }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body font-semibold text-sm block mb-1.5" style={{ color: '#374151' }}>Amount ($)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" style={iStyle}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e2e8f0'} />
          </div>
          <div>
            <label className="font-body font-semibold text-sm block mb-2" style={{ color: '#374151' }}>Select Crypto</label>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: 'btc', label: '₿ Bitcoin (BTC)' }, { id: 'usdt', label: '₮ Tether (USDT)' }].map(({ id, label }) => (
                <button key={id} type="button" onClick={() => { setPaymentType(id as any); setUsdtNetwork('') }}
                  className="py-3 rounded-xl text-sm font-body font-semibold transition-all"
                  style={{
                    border: `1.5px solid ${paymentType === id ? '#2563eb' : '#e2e8f0'}`,
                    background: paymentType === id ? '#eff6ff' : '#f8faff',
                    color: paymentType === id ? '#2563eb' : '#94a3b8',
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          {paymentType === 'usdt' && (
            <div>
              <label className="font-body font-semibold text-sm block mb-1.5" style={{ color: '#374151' }}>Select Network</label>
              <div className="relative">
                <select value={usdtNetwork} onChange={e => setUsdtNetwork(e.target.value)} style={{ ...iStyle, appearance: 'none' as any }}>
                  <option value="">Choose network</option>
                  <option value="TRC20">USDT — TRC20 (Tron)</option>
                  <option value="ERC20">USDT — ERC20 (Ethereum)</option>
                  <option value="BEP20">USDT — BEP20 (BSC)</option>
                </select>
                <ChevronDown size={15} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}
          {paymentType && (
            <div>
              <label className="font-body font-semibold text-sm block mb-1.5" style={{ color: '#374151' }}>
                {paymentType === 'btc' ? 'BTC' : 'USDT'} Wallet Address
              </label>
              <input type="text" value={walletAddress} onChange={e => setWalletAddress(e.target.value)}
                placeholder="Enter your wallet address" style={iStyle}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e2e8f0'} />
            </div>
          )}
          <button type="submit" disabled={loading}
            className="w-full font-body font-bold text-sm text-white rounded-xl py-3.5 transition-all hover:opacity-90"
            style={{ background: '#2563eb' }}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   KYC PAGE
══════════════════════════════════════════ */
const KycPage = () => {
  const { profile, user, refreshProfile } = useAuth()
  const [docType, setDocType] = useState('')
  const [frontFile, setFrontFile] = useState<File | null>(null)
  const [backFile, setBackFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (profile?.kyc_status === 'pending') return (
    <div className="max-w-lg">
      <PageHeader title="KYC Verification" sub="Identity verification" />
      <div className="rounded-xl p-5" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
        <p className="font-body text-sm leading-relaxed" style={{ color: '#92400e' }}>Your documents are under review. Our compliance team will verify within 24–48 hours.</p>
      </div>
    </div>
  )
  if (profile?.kyc_status === 'verified') return (
    <div className="max-w-lg">
      <PageHeader title="KYC Verification" sub="Identity verification" />
      <div className="rounded-xl p-5" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <p className="font-body text-sm font-semibold" style={{ color: '#15803d' }}>Identity verified successfully.</p>
      </div>
    </div>
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!docType || !frontFile || !backFile) { setError('Please select document type and upload both sides.'); return }
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
    <div className="max-w-lg">
      <PageHeader title="KYC Verification" sub="Upload your identity document" />
      {error && <div className="rounded-xl p-4 text-sm font-body mb-4" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>{error}</div>}
      {success ? (
        <div className="rounded-xl p-5" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="font-body text-sm" style={{ color: '#15803d' }}>Documents submitted. Our team will verify within 24–48 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #e8edf5' }}>
          <div>
            <label className="font-body font-semibold text-sm block mb-1.5" style={{ color: '#374151' }}>Document Type</label>
            <div className="relative">
              <select value={docType} onChange={e => setDocType(e.target.value)} className="w-full font-body text-sm focus:outline-none appearance-none" style={{ ...iStyle }}>
                <option value="">Select document type</option>
                <option value="national_id">National ID</option>
                <option value="drivers_license">Driver's License</option>
              </select>
              <ChevronDown size={15} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          {docType && (
            <>
              {([['Front', setFrontFile, frontFile], ['Back', setBackFile, backFile]] as const).map(([label, setter, file]) => (
                <div key={label as string}>
                  <label className="font-body font-semibold text-sm block mb-1.5" style={{ color: '#374151' }}>{label as string} of Document</label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer rounded-xl p-5" style={{ border: '1.5px dashed #e2e8f0', background: '#f8faff' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#eff6ff' }}>
                      <Upload size={16} className="text-blue-600" />
                    </div>
                    <span className="font-body text-sm" style={{ color: '#94a3b8' }}>{(file as File | null)?.name || `Upload ${(label as string).toLowerCase()}`}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => (setter as Function)(e.target.files?.[0] || null)} />
                  </label>
                </div>
              ))}
            </>
          )}
          <button type="submit" disabled={loading || !docType}
            className="w-full font-body font-bold text-sm text-white rounded-xl py-3.5 transition-all hover:opacity-90"
            style={{ background: loading || !docType ? '#93c5fd' : '#2563eb' }}>
            {loading ? 'Submitting...' : 'Submit KYC'}
          </button>
        </form>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   HISTORY PAGE
══════════════════════════════════════════ */
const HistoryPage = () => {
  const { user } = useAuth()
  const [tab, setTab] = useState<'deposits' | 'withdrawals'>('deposits')
  const [deposits, setDeposits] = useState<any[]>([])
  const [withdrawals, setWithdrawals] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      supabase.from('deposits').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => { if (data) setDeposits(data) })
      supabase.from('withdrawals').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => { if (data) setWithdrawals(data) })
    }
  }, [user])

  const statusColor: Record<string, { bg: string; color: string }> = {
    pending:  { bg: '#fffbeb', color: '#d97706' },
    approved: { bg: '#f0fdf4', color: '#16a34a' },
    rejected: { bg: '#fef2f2', color: '#dc2626' },
  }
  const data = tab === 'deposits' ? deposits : withdrawals

  return (
    <div>
      <PageHeader title="History" sub="Your transaction records" />
      <div className="flex gap-1 p-1 rounded-xl w-fit mb-4" style={{ background: '#f1f5f9' }}>
        {(['deposits', 'withdrawals'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="font-body font-semibold capitalize text-sm px-5 py-2 rounded-lg transition-all"
            style={{ background: tab === t ? '#fff' : 'transparent', color: tab === t ? '#0f172a' : '#94a3b8', boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {data.length === 0 ? (
          <div className="text-center py-14 rounded-xl" style={{ background: '#f8faff', border: '1px dashed #e2e8f0' }}>
            <p className="font-body text-sm" style={{ color: '#94a3b8' }}>No {tab} yet.</p>
          </div>
        ) : data.map((item: any) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl p-4"
            style={{ background: '#fff', border: '1px solid #e8edf5', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: tab === 'deposits' ? '#eff6ff' : '#f5f3ff' }}>
                {tab === 'deposits' ? <ArrowDownLeft size={15} className="text-blue-600" /> : <ArrowUpRight size={15} className="text-purple-600" />}
              </div>
              <div>
                <p className="font-body font-semibold text-sm capitalize" style={{ color: '#0f172a' }}>{tab === 'deposits' ? 'Deposit' : 'Withdrawal'}</p>
                <p className="font-body text-xs mt-0.5" style={{ color: '#94a3b8' }}>{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-heading font-bold" style={{ fontSize: '15px', color: '#0f172a' }}>${item.amount}</p>
              <span className="px-2.5 py-1 rounded-lg text-xs font-body font-semibold"
                style={statusColor[item.status] || statusColor.pending}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   PROFILE PAGE
══════════════════════════════════════════ */
const ProfilePage = () => {
  const { profile } = useAuth()
  if (!profile) return null

  const fields = [
    ['Username', profile.username],
    ['Full Name', profile.full_name],
    ['Email', profile.email],
    ['Phone', profile.phone],
    ['Country', profile.country],
    ['Member Since', new Date(profile.created_at).toLocaleDateString()],
    ['Account Balance', `$${Number(profile.balance).toFixed(2)}`],
    ['Welcome Bonus', `$${Number(profile.bonus).toFixed(2)}`],
  ]

  return (
    <div className="max-w-lg">
      <PageHeader title="My Profile" sub="Your account details" />

      {/* Profile hero */}
      <div className="rounded-2xl p-6 mb-4 text-center" style={{ background: '#06101f' }}>
        <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white font-heading font-bold mx-auto mb-3"
          style={{ fontSize: '22px' }}>
          {profile.username?.[0]?.toUpperCase()}
        </div>
        <p className="font-heading font-bold text-white" style={{ fontSize: '17px' }}>{profile.full_name}</p>
        <p className="font-body mt-0.5 mb-3" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.30)' }}>@{profile.username}</p>
        <KycBadge status={profile.kyc_status} />
      </div>

      {/* Info list */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #e8edf5' }}>
        {fields.map(([label, value], idx) => (
          <div key={label} className="flex justify-between items-center px-5 py-3.5"
            style={{ background: '#fff', borderBottom: idx < fields.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
            <span className="font-body text-sm" style={{ color: '#94a3b8' }}>{label}</span>
            <span className="font-body font-semibold text-sm" style={{ color: '#0f172a' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   NAV + WRAPPER
══════════════════════════════════════════ */
const navItems = [
  { to: '/dashboard',         label: 'Home',    icon: Home    },
  { to: '/dashboard/actions', label: 'Actions', icon: Zap     },
  { to: '/dashboard/history', label: 'History', icon: History },
  { to: '/dashboard/profile', label: 'Profile', icon: User    },
]

const Dashboard = () => {
  const { profile, signOut } = useAuth()
  const location = useLocation()
  const isHome = location.pathname === '/dashboard'

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
    <div className="min-h-screen" style={{ background: '#f4f6fb' }}>

      {/* Header — always white with logo visible */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5"
        style={{ background: '#fff', borderBottom: '1px solid #e8edf5', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <ApexLogo />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-heading font-bold"
            style={{ fontSize: '13px' }}>
            {profile?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <button onClick={signOut}
            className="flex items-center gap-1.5 font-body text-sm transition-colors"
            style={{ color: '#94a3b8', fontSize: '13px' }}>
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="pt-14 pb-20">
        <div className={isHome ? 'max-w-2xl mx-auto' : 'max-w-2xl mx-auto py-5 px-4'}>
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="deposit"  element={<DepositPage />} />
            <Route path="actions"  element={<ActionsPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="kyc"      element={<KycPage />} />
            <Route path="history"  element={<HistoryPage />} />
            <Route path="profile"  element={<ProfilePage />} />
            <Route path="*"        element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around px-2 py-1.5"
        style={{ background: '#fff', borderTop: '1px solid #e8edf5', boxShadow: '0 -2px 8px rgba(0,0,0,0.04)' }}>
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to))
          return (
            <Link key={to} to={to}
              className="flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all"
              style={{ color: active ? '#2563eb' : '#94a3b8', background: active ? 'rgba(37,99,235,0.06)' : 'transparent' }}>
              <Icon size={19} />
              <span className="font-body text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Dashboard
