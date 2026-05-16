import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { Home, History, User, LogOut, Eye, EyeOff, DollarSign, Gift, ArrowUpRight, ArrowDownLeft, Upload, ChevronDown, Copy, CheckCircle2, Shield, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { ApexLogo } from '../components/Navbar'

const BTC_ADDRESS = 'bc1q9x56tf5ludyyulwvvy6c0pgkje2n5hu459zlhj'

const KycBadge = ({ status }: { status: string }) => {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    not_submitted: { bg: 'bg-red-50', text: 'text-red-500', label: '🔴 KYC Not Submitted' },
    pending: { bg: 'bg-yellow-50', text: 'text-yellow-600', label: '🟡 KYC Pending' },
    verified: { bg: 'bg-green-50', text: 'text-green-600', label: '🟢 KYC Verified' },
    rejected: { bg: 'bg-red-50', text: 'text-red-500', label: '🔴 KYC Rejected' },
  }
  const c = config[status] || config.not_submitted
  return (
    <Link to="/dashboard/kyc">
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body font-semibold border ${c.bg} ${c.text} border-current/20`}>
        <Shield size={14}/>{c.label}
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
        <p className="text-gray-400 text-sm font-body">{new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
        <h1 className="text-2xl font-heading font-bold text-navy-900 mt-1">Hello {profile.username} 👋</h1>
        <div className="mt-3"><KycBadge status={profile.kyc_status}/></div>
      </div>

      {/* Balance Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <p className="text-gray-400 text-sm font-body">Account Balance</p>
          <button onClick={()=>setShowBalance(!showBalance)} className="text-gray-400 hover:text-gray-600">
            {showBalance ? <Eye size={18}/> : <EyeOff size={18}/>}
          </button>
        </div>
        <p className="text-4xl font-heading font-bold text-navy-900 mb-1">
          {showBalance ? `$${Number(profile.balance).toFixed(2)}` : '••••••'}
        </p>
        <p className="text-gray-400 text-xs font-body mb-4">Last updated: {new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}</p>
        <div className="flex gap-3">
          <Link to="/dashboard/deposit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-body font-bold text-center flex items-center justify-center gap-2 transition-colors">
            <ArrowDownLeft size={16}/> Deposit
          </Link>
          <Link to="/dashboard/withdraw" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-body font-bold text-center flex items-center justify-center gap-2 transition-colors">
            <ArrowUpRight size={16}/> Withdraw
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-400 text-xs font-body">Total Profit</p>
            <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
              <DollarSign size={15} className="text-green-500"/>
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-navy-900">${Number(profile.balance).toFixed(2)}</p>
          <p className="text-green-500 text-xs font-body mt-1">+0.0% from last period</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-400 text-xs font-body">Welcome Bonus</p>
            <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
              <Gift size={15} className="text-orange-400"/>
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-navy-900">${Number(profile.bonus).toFixed(2)}</p>
          <p className="text-orange-400 text-xs font-body mt-1">Welcome Bonus</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-400 text-xs font-body">Total Deposit</p>
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
              <ArrowDownLeft size={15} className="text-blue-500"/>
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-navy-900">$0.00</p>
          <p className="text-gray-400 text-xs font-body mt-1">All time</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-400 text-xs font-body">Total Withdrawal</p>
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
              <ArrowUpRight size={15} className="text-blue-500"/>
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-navy-900">$0.00</p>
          <p className="text-gray-400 text-xs font-body mt-1">All time</p>
        </div>
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
    <div className="space-y-6 max-w-lg">
      <h2 className="text-2xl font-heading font-bold text-navy-900">Make a Deposit</h2>
      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm font-body">✅ Deposit submitted! Admin will confirm and update your balance shortly.</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm font-body">{error}</div>}
      <div className="bg-navy-900 rounded-2xl p-6 text-white">
        <p className="text-white/60 text-xs font-body uppercase tracking-widest mb-3">Wallet Address</p>
        <div className="bg-white/10 rounded-xl p-3 mb-3">
          <p className="text-white text-xs font-body break-all leading-relaxed">{BTC_ADDRESS}</p>
        </div>
        <button onClick={copyAddress} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-body font-bold w-full justify-center transition-colors">
          {copied ? <><CheckCircle2 size={16}/>Copied!</> : <><Copy size={16}/>Copy Address</>}
        </button>
        <p className="text-yellow-300 text-xs font-body mt-3 leading-relaxed">⚠️ Send payment to the address above then fill the form below and upload your payment proof.</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div>
          <label className="text-gray-700 text-sm font-body font-semibold block mb-1">Amount Sent ($)</label>
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter amount"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-blue-500"/>
        </div>
        <div>
          <label className="text-gray-700 text-sm font-body font-semibold block mb-1">Upload Payment Proof</label>
          <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-400 transition-colors">
            <Upload size={24} className="text-gray-400"/>
            <span className="text-sm font-body text-gray-500">{proofFile ? proofFile.name : 'Click to upload'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={e=>setProofFile(e.target.files?.[0]||null)}/>
          </label>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-body font-bold text-sm transition-colors">
          {loading ? 'Submitting...' : 'Submit Deposit'}
        </button>
      </form>
    </div>
  )
}

const ActionsPage = () => {
  return (
    <div className="space-y-4 max-w-lg">
      <h2 className="text-2xl font-heading font-bold text-navy-900">Actions</h2>
      <div className="grid grid-cols-1 gap-4">
        <Link to="/dashboard/deposit" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-blue-200 transition-colors card-hover">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center"><ArrowDownLeft size={22} className="text-blue-600"/></div>
          <div><p className="font-heading font-bold text-navy-900">Make a Deposit</p><p className="text-gray-400 text-sm font-body">Fund your account</p></div>
        </Link>
        <Link to="/dashboard/withdraw" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-blue-200 transition-colors card-hover">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center"><ArrowUpRight size={22} className="text-blue-600"/></div>
          <div><p className="font-heading font-bold text-navy-900">Request Withdrawal</p><p className="text-gray-400 text-sm font-body">Withdraw your earnings</p></div>
        </Link>
        <Link to="/dashboard/kyc" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-blue-200 transition-colors card-hover">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center"><Shield size={22} className="text-blue-600"/></div>
          <div><p className="font-heading font-bold text-navy-900">KYC Verification</p><p className="text-gray-400 text-sm font-body">Verify your identity</p></div>
        </Link>
      </div>
    </div>
  )
}

const WithdrawPage = () => {
  const { profile, refreshProfile, user } = useAuth()
  const [form, setForm] = useState({ amount:'', btcAddress:'', swiftCode:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!form.amount || !form.btcAddress || !form.swiftCode) { setError('Please fill all fields.'); return }
    const amount = parseFloat(form.amount)
    if (isNaN(amount)||amount<=0) { setError('Enter a valid amount.'); return }
    if (profile && amount > profile.balance) { setError('Insufficient balance.'); return }
    if (form.swiftCode.length < 4) { setError('Invalid Swift Code.'); return }
    setLoading(true)
    const { error: err } = await supabase.from('withdrawals').insert({ user_id: user?.id, amount, btc_address: form.btcAddress, swift_code: form.swiftCode, status: 'pending' })
    setLoading(false)
    if (err) { setError('Failed. Please try again.'); return }
    setSuccess(true); setForm({ amount:'', btcAddress:'', swiftCode:'' }); refreshProfile()
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-2xl font-heading font-bold text-navy-900">Request Withdrawal</h2>
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <p className="text-gray-400 text-sm font-body">Available Balance</p>
        <p className="text-2xl font-heading font-bold text-navy-900">${Number(profile?.balance||0).toFixed(2)}</p>
      </div>
      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm font-body">✅ Withdrawal request submitted! Admin will review shortly.</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm font-body">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
        {[{label:'Amount ($)',key:'amount',type:'number',ph:'Enter withdrawal amount'},{label:'Wallet Address',key:'btcAddress',type:'text',ph:'Enter your wallet address'},{label:'Swift Code',key:'swiftCode',type:'text',ph:'Enter Swift Code'}].map(({label,key,type,ph})=>(
          <div key={key}>
            <label className="text-gray-700 text-sm font-body font-semibold block mb-1">{label}</label>
            <input type={type} value={form[key as keyof typeof form]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} placeholder={ph}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-blue-500"/>
          </div>
        ))}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-body font-bold text-sm transition-colors">
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
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
    <div className="max-w-lg space-y-6">
      <h2 className="text-2xl font-heading font-bold text-navy-900">KYC Verification</h2>
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <p className="text-yellow-800 font-body leading-relaxed">Your KYC documents have been submitted and are under review. Our compliance team will verify your identity within 24-48 hours.</p>
      </div>
    </div>
  )

  if (profile?.kyc_status==='verified') return (
    <div className="max-w-lg space-y-6">
      <h2 className="text-2xl font-heading font-bold text-navy-900">KYC Verification</h2>
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <p className="text-green-800 font-body font-bold">✅ Your identity has been verified!</p>
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
    <div className="max-w-lg space-y-6">
      <h2 className="text-2xl font-heading font-bold text-navy-900">KYC Verification</h2>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm font-body">{error}</div>}
      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <p className="text-green-800 font-body leading-relaxed">Your KYC documents have been successfully submitted. Our compliance team will verify your identity within 24-48 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div>
            <label className="text-gray-700 text-sm font-body font-semibold block mb-1">Document Type</label>
            <div className="relative">
              <select value={docType} onChange={e=>setDocType(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-blue-500 appearance-none bg-white">
                <option value="">Select document type</option>
                <option value="national_id">National ID</option>
                <option value="drivers_license">Driver's License</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          {docType && (
            <>
              {[['Front',setFrontFile,frontFile],['Back',setBackFile,backFile]].map(([label,setter,file])=>(
                <div key={label as string}>
                  <label className="text-gray-700 text-sm font-body font-semibold block mb-1">{label as string} of Document</label>
                  <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-400 transition-colors">
                    <Upload size={24} className="text-gray-400"/>
                    <span className="text-sm font-body text-gray-500">{(file as File|null)?.name || `Upload ${(label as string).toLowerCase()}`}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e=>(setter as Function)(e.target.files?.[0]||null)}/>
                  </label>
                </div>
              ))}
            </>
          )}
          <button type="submit" disabled={loading||!docType} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-body font-bold text-sm">
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

  const statusColors: Record<string,string> = { pending:'bg-yellow-100 text-yellow-700', approved:'bg-green-100 text-green-700', rejected:'bg-red-100 text-red-700' }
  const data = tab==='deposits' ? deposits : withdrawals

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-navy-900">History</h2>
      <div className="flex gap-2 bg-gray-100 rounded-xl p-1 w-fit">
        {(['deposits','withdrawals'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-body font-semibold capitalize transition-colors ${tab===t?'bg-white text-navy-900 shadow-sm':'text-gray-500'}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-3">
        {data.length===0 ? <p className="text-gray-400 font-body text-sm">No {tab} yet.</p> :
          data.map((item:any)=>(
            <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between shadow-sm">
              <div>
                <p className="font-body font-semibold text-navy-900 text-sm capitalize">{tab==='deposits'?'Deposit':'Withdrawal'}</p>
                <p className="text-gray-400 text-xs font-body">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-navy-900 font-heading font-bold">${item.amount}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-body font-medium ${statusColors[item.status]}`}>{item.status}</span>
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
    <div className="max-w-lg space-y-6">
      <h2 className="text-2xl font-heading font-bold text-navy-900">My Profile</h2>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-heading font-bold shadow">
            {profile.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-heading font-bold text-navy-900 text-lg">{profile.full_name}</p>
            <p className="text-gray-500 text-sm font-body">@{profile.username}</p>
            <KycBadge status={profile.kyc_status}/>
          </div>
        </div>
        {[['Username',profile.username],['Full Name',profile.full_name],['Email',profile.email],['Phone',profile.phone],['Country',profile.country],['Member Since',new Date(profile.created_at).toLocaleDateString()],['Account Balance',`$${Number(profile.balance).toFixed(2)}`],['Welcome Bonus',`$${Number(profile.bonus).toFixed(2)}`]].map(([label,value])=>(
          <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-500 text-sm font-body">{label}</span>
            <span className="text-navy-900 text-sm font-body font-semibold">{value}</span>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 shadow-sm">
        <ApexLogo/>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-navy-900 text-sm font-heading font-bold">
            {profile?.username?.[0]?.toUpperCase()||'U'}
          </div>
          <button onClick={signOut} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm font-body transition-colors">
            <LogOut size={16}/><span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="pt-16 pb-20 px-4 max-w-2xl mx-auto">
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

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex justify-around z-50 shadow-lg">
        {navItems.map(({to,label,icon:Icon})=>{
          const active = location.pathname===to||(to!=='/dashboard'&&location.pathname.startsWith(to))
          return (
            <Link key={to} to={to} className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${active?'text-blue-600':'text-gray-400'}`}>
              <Icon size={20}/><span className="text-xs font-body">{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Dashboard
