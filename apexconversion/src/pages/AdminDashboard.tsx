import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Users, ArrowUpRight, ShieldCheck, LayoutDashboard, LogOut, CheckCircle, XCircle, Eye, Wallet, ArrowDownLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { ApexLogo } from '../components/Navbar'

const useAdminAuth = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (!auth) { navigate('/admin/login'); return }
  }, [navigate])
}

export const AdminLogin = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username:'', password:'' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('admin_auth')) navigate('/admin/dashboard')
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (locked) return
    if (form.username==='PabloBTC' && form.password==='668899') {
      localStorage.setItem('admin_auth','true')
      navigate('/admin/dashboard')
    } else {
      const n = attempts + 1; setAttempts(n)
      if (n >= 5) { setLocked(true); setError('Too many attempts. Try again in 15 minutes.'); setTimeout(()=>{ setLocked(false); setAttempts(0); setError('') }, 900000) }
      else { setError(`Invalid credentials. ${5-n} attempts remaining.`) }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="flex justify-center mb-6"><ApexLogo/></div>
        <p className="text-center text-gray-400 text-xs font-body mb-6 uppercase tracking-widest">Admin Portal</p>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm font-body text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-600 text-xs font-body font-semibold block mb-1">Username</label>
            <input type="text" value={form.username} onChange={e=>setForm(p=>({...p,username:e.target.value}))} autoComplete="off"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-blue-500"/>
          </div>
          <div>
            <label className="text-gray-600 text-xs font-body font-semibold block mb-1">Password</label>
            <div className="relative">
              <input type={showPass?'text':'password'} value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm font-body focus:outline-none focus:border-blue-500"/>
              <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400">
                {showPass ? <XCircle size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>
          <button type="submit" disabled={locked} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl font-body font-bold text-sm mt-2 transition-colors">Login</button>
        </form>
      </div>
    </div>
  )
}

const AdminOverview = () => {
  const [stats, setStats] = useState({ users:0, pendingKyc:0, pendingWithdrawals:0, totalDeposits:0, totalWithdrawals:0, pendingDeposits:0 })
  useEffect(() => {
    Promise.all([
      supabase.from('profiles').select('id',{count:'exact'}),
      supabase.from('kyc_submissions').select('id',{count:'exact'}).eq('status','pending'),
      supabase.from('withdrawals').select('id',{count:'exact'}).eq('status','pending'),
      supabase.from('deposits').select('amount').eq('status','approved'),
      supabase.from('withdrawals').select('amount').eq('status','approved'),
      supabase.from('deposits').select('id',{count:'exact'}).eq('status','pending'),
    ]).then(([u,k,w,td,tw,pd])=>{
      const totalDep = (td.data||[]).reduce((s:number,d:any)=>s+Number(d.amount),0)
      const totalWith = (tw.data||[]).reduce((s:number,d:any)=>s+Number(d.amount),0)
      setStats({ users:u.count||0, pendingKyc:k.count||0, pendingWithdrawals:w.count||0, totalDeposits:totalDep, totalWithdrawals:totalWith, pendingDeposits:pd.count||0 })
    })
  },[])
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-navy-900">Dashboard Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label:'Total Users', value:String(stats.users), icon:Users, color:'text-blue-600', bg:'bg-blue-50', to:'/admin/users' },
          { label:'Total Deposits', value:`$${stats.totalDeposits.toFixed(2)}`, icon:ArrowDownLeft, color:'text-green-600', bg:'bg-green-50', to:'/admin/deposits' },
          { label:'Total Withdrawals', value:`$${stats.totalWithdrawals.toFixed(2)}`, icon:ArrowUpRight, color:'text-orange-500', bg:'bg-orange-50', to:'/admin/withdrawals' },
          { label:'Pending KYC', value:String(stats.pendingKyc), icon:ShieldCheck, color:'text-yellow-600', bg:'bg-yellow-50', to:'/admin/kyc' },
          { label:'Pending Withdrawals', value:String(stats.pendingWithdrawals), icon:ArrowUpRight, color:'text-red-500', bg:'bg-red-50', to:'/admin/withdrawals' },
          { label:'Pending Deposits', value:String(stats.pendingDeposits), icon:Wallet, color:'text-purple-500', bg:'bg-purple-50', to:'/admin/deposits' },
        ].map(({label,value,icon:Icon,color,bg,to})=>(
          <Link key={label} to={to} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}><Icon size={20} className={color}/></div>
            <p className="text-2xl font-heading font-bold text-navy-900">{value}</p>
            <p className="text-gray-400 text-xs font-body mt-1">{label}</p>
          </Link>
        ))}
      </div>
      <div>
        <h3 className="font-heading font-bold text-navy-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { to:'/admin/kyc', label:'Review KYC Submissions', sub:`${stats.pendingKyc} pending`, icon:ShieldCheck, color:'text-yellow-500' },
            { to:'/admin/withdrawals', label:'Process Withdrawals', sub:`${stats.pendingWithdrawals} pending`, icon:ArrowUpRight, color:'text-orange-500' },
            { to:'/admin/deposits', label:'Review Deposits', sub:`${stats.pendingDeposits} pending`, icon:Wallet, color:'text-blue-500' },
            { to:'/admin/users', label:'Manage Users', sub:`${stats.users} total`, icon:Users, color:'text-green-500' },
          ].map(({to,label,sub,icon:Icon,color})=>(
            <Link key={to} to={to} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 hover:border-blue-200 shadow-sm transition-colors">
              <Icon size={20} className={color}/>
              <div><p className="font-body font-semibold text-navy-900 text-sm">{label}</p><p className="text-gray-400 text-xs font-body">{sub}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([])
  const [selected, setSelected] = useState<any|null>(null)
  const [editBalance, setEditBalance] = useState('')
  const [addAmount, setAddAmount] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  useEffect(()=>{ supabase.from('profiles').select('*').order('created_at',{ascending:false}).then(({data})=>{ if(data) setUsers(data) }) },[])
  const showMsg = (m:string) => { setMsg(m); setTimeout(()=>setMsg(''),3000) }
  const saveBalance = async () => {
    if (!selected) return; setSaving(true)
    const newBal = parseFloat(editBalance)
    await supabase.from('profiles').update({balance:newBal}).eq('id',selected.id)
    setUsers(p=>p.map(u=>u.id===selected.id?{...u,balance:newBal}:u))
    setSelected((p:any)=>p?{...p,balance:newBal}:null)
    showMsg('✅ Balance updated!'); setSaving(false)
  }
  const addProfit = async () => {
    if (!selected||!addAmount) return; setSaving(true)
    const amt = parseFloat(addAmount)
    const newBal = (Number(selected.balance)||0) + amt
    await supabase.from('profiles').update({balance:newBal}).eq('id',selected.id)
    setSelected((p:any)=>p?{...p,balance:newBal}:null)
    setAddAmount(''); showMsg('✅ Profit added!'); setSaving(false)
  }
  const verifyKyc = async () => {
    if (!selected) return; setSaving(true)
    await supabase.from('profiles').update({kyc_status:'verified'}).eq('id',selected.id)
    setSelected((p:any)=>p?{...p,kyc_status:'verified'}:null)
    showMsg('✅ KYC verified!'); setSaving(false)
  }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-navy-900">User Management</h2>
      {msg && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-sm font-body">{msg}</div>}
      {selected ? (
        <div className="space-y-4">
          <button onClick={()=>setSelected(null)} className="text-blue-600 text-sm font-body flex items-center gap-1">← Back to users</button>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-heading font-bold">{selected.username?.[0]?.toUpperCase()}</div>
              <div><p className="font-heading font-bold text-navy-900 text-lg">{selected.full_name}</p><p className="text-gray-500 text-sm font-body">@{selected.username}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[['Email',selected.email],['Phone',selected.phone],['Country',selected.country],['KYC',selected.kyc_status],['Balance',`$${Number(selected.balance).toFixed(2)}`],['Bonus',`$${Number(selected.bonus).toFixed(2)}`],['Joined',new Date(selected.created_at).toLocaleDateString()]].map(([k,v])=>(
                <div key={k} className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 text-xs font-body">{k}</p><p className="text-navy-900 text-sm font-body font-semibold">{v}</p></div>
              ))}
            </div>
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <div>
                <p className="font-body font-bold text-navy-900 text-sm mb-2">Edit Balance</p>
                <div className="flex gap-2">
                  <input type="number" value={editBalance} onChange={e=>setEditBalance(e.target.value)} placeholder="New balance" className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm font-body focus:outline-none focus:border-blue-500"/>
                  <button onClick={saveBalance} disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-body font-bold">Save</button>
                </div>
              </div>
              <div>
                <p className="font-body font-bold text-navy-900 text-sm mb-2">Add Balance / Profit</p>
                <div className="flex gap-2">
                  <input type="number" value={addAmount} onChange={e=>setAddAmount(e.target.value)} placeholder="Amount to add" className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm font-body focus:outline-none focus:border-blue-500"/>
                  <button onClick={addProfit} disabled={saving} className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-body font-bold">Add</button>
                </div>
              </div>
              {selected.kyc_status !== 'verified' && (
                <button onClick={verifyKyc} disabled={saving} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl text-sm font-body font-bold flex items-center justify-center gap-2">
                  <ShieldCheck size={16}/> Manually Verify KYC
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {users.length===0 ? <p className="text-gray-400 font-body text-sm">No users yet.</p> :
            users.map(u=>(
              <div key={u.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between shadow-sm">
                <div>
                  <p className="font-body font-semibold text-navy-900">{u.full_name}</p>
                  <p className="text-gray-400 text-xs font-body">@{u.username} · {u.email}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-green-600 text-xs font-body font-semibold">${Number(u.balance).toFixed(2)}</span>
                    <span className={`text-xs font-body ${u.kyc_status==='verified'?'text-green-600':'text-yellow-600'}`}>{u.kyc_status}</span>
                  </div>
                </div>
                <button onClick={()=>{setSelected(u);setEditBalance(String(u.balance))}} className="bg-blue-50 text-blue-600 px-3 py-2 rounded-xl text-xs font-body font-bold flex items-center gap-1">
                  <Eye size={14}/> Manage
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

const AdminDeposits = () => {
  const [deposits, setDeposits] = useState<any[]>([])
  const [msg, setMsg] = useState('')
  useEffect(()=>{ supabase.from('deposits').select('*, profiles(username,email)').order('created_at',{ascending:false}).then(({data})=>{ if(data) setDeposits(data) }) },[])
  const getUrl = (path:string) => supabase.storage.from('kyc-documents').getPublicUrl(path).data.publicUrl
  const showMsg = (m:string) => { setMsg(m); setTimeout(()=>setMsg(''),3000) }
  const approve = async (d:any) => {
    await supabase.from('deposits').update({status:'approved'}).eq('id',d.id)
    const {data:prof} = await supabase.from('profiles').select('balance').eq('id',d.user_id).single()
    if (prof) await supabase.from('profiles').update({balance:(prof.balance||0)+Number(d.amount)}).eq('id',d.user_id)
    setDeposits(p=>p.map(x=>x.id===d.id?{...x,status:'approved'}:x))
    showMsg('✅ Deposit approved and balance credited!')
  }
  const reject = async (id:string) => {
    await supabase.from('deposits').update({status:'rejected'}).eq('id',id)
    setDeposits(p=>p.map(x=>x.id===id?{...x,status:'rejected'}:x))
    showMsg('Deposit rejected.')
  }
  const statusColors:Record<string,string> = { pending:'bg-yellow-100 text-yellow-700', approved:'bg-green-100 text-green-700', rejected:'bg-red-100 text-red-700' }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-navy-900">Deposit Requests</h2>
      {msg && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-sm font-body">{msg}</div>}
      {deposits.length===0 ? <p className="text-gray-400 font-body text-sm">No deposits yet.</p> :
        deposits.map(d=>(
          <div key={d.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="font-heading font-bold text-navy-900">@{d.profiles?.username}</p><p className="text-gray-400 text-xs font-body">{d.profiles?.email} · {new Date(d.created_at).toLocaleDateString()}</p></div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-heading font-bold text-navy-900">${d.amount}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-body font-medium ${statusColors[d.status]}`}>{d.status}</span>
              </div>
            </div>
            {d.proof_url && <div><p className="text-xs font-body text-gray-400 mb-2">Payment Proof:</p><img src={getUrl(d.proof_url)} alt="Proof" className="w-full max-h-48 object-contain rounded-xl border"/></div>}
            {d.status==='pending' && (
              <div className="flex gap-3">
                <button onClick={()=>approve(d)} className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-body font-bold flex items-center justify-center gap-1"><CheckCircle size={14}/> Approve & Credit</button>
                <button onClick={()=>reject(d.id)} className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-sm font-body font-bold flex items-center justify-center gap-1"><XCircle size={14}/> Reject</button>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

const AdminKYC = () => {
  const [submissions, setSubmissions] = useState<any[]>([])
  useEffect(()=>{ supabase.from('kyc_submissions').select('*, profiles(username,email)').eq('status','pending').order('created_at',{ascending:false}).then(({data})=>{ if(data) setSubmissions(data) }) },[])
  const getUrl = (path:string) => supabase.storage.from('kyc-documents').getPublicUrl(path).data.publicUrl
  const update = async (sub:any, status:'approved'|'rejected') => {
    await supabase.from('kyc_submissions').update({status}).eq('id',sub.id)
    await supabase.from('profiles').update({kyc_status:status==='approved'?'verified':'rejected'}).eq('id',sub.user_id)
    setSubmissions(p=>p.filter(s=>s.id!==sub.id))
  }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-navy-900">KYC Submissions</h2>
      {submissions.length===0 ? <p className="text-gray-400 font-body text-sm">No pending KYC submissions.</p> :
        submissions.map(sub=>(
          <div key={sub.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="font-heading font-bold text-navy-900">@{sub.profiles?.username}</p><p className="text-gray-400 text-xs font-body">{sub.profiles?.email} · {sub.document_type?.replace('_',' ')}</p></div>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-body">Pending</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[['Front',sub.front_url],['Back',sub.back_url]].map(([label,url])=>(
                <div key={label}><p className="text-xs font-body text-gray-400 mb-1">{label}</p><img src={getUrl(url)} alt={label} className="w-full h-32 object-cover rounded-xl border"/></div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={()=>update(sub,'approved')} className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-body font-bold flex items-center justify-center gap-1"><CheckCircle size={14}/> Approve</button>
              <button onClick={()=>update(sub,'rejected')} className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-sm font-body font-bold flex items-center justify-center gap-1"><XCircle size={14}/> Reject</button>
            </div>
          </div>
        ))}
    </div>
  )
}

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState<any[]>([])
  useEffect(()=>{ supabase.from('withdrawals').select('*, profiles(username)').order('created_at',{ascending:false}).then(({data})=>{ if(data) setWithdrawals(data) }) },[])
  const update = async (id:string, status:'approved'|'rejected') => {
    await supabase.from('withdrawals').update({status}).eq('id',id)
    setWithdrawals(p=>p.map(w=>w.id===id?{...w,status}:w))
  }
  const statusColors:Record<string,string> = { pending:'bg-yellow-100 text-yellow-700', approved:'bg-green-100 text-green-700', rejected:'bg-red-100 text-red-700' }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-navy-900">Withdrawal Requests</h2>
      {withdrawals.length===0 ? <p className="text-gray-400 font-body text-sm">No withdrawals yet.</p> :
        withdrawals.map(w=>(
          <div key={w.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="font-heading font-bold text-navy-900">@{w.profiles?.username}</p><p className="text-gray-400 text-xs font-body">{new Date(w.created_at).toLocaleDateString()}</p></div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-heading font-bold text-navy-900">${w.amount}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-body font-medium ${statusColors[w.status]}`}>{w.status}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 space-y-2">
              <div className="flex justify-between"><span className="text-gray-400 text-xs font-body">Crypto Type</span><span className="text-navy-900 text-xs font-body font-semibold">{w.wallet_type || w.payment_method || 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-gray-400 text-xs font-body">Wallet Address</span><span className="text-navy-900 text-xs font-body font-semibold break-all max-w-xs text-right">{w.wallet_address || w.btc_address || 'N/A'}</span></div>
            </div>
            {w.status==='pending' && (
              <div className="flex gap-3">
                <button onClick={()=>update(w.id,'approved')} className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-body font-bold flex items-center justify-center gap-1"><CheckCircle size={14}/> Approve</button>
                <button onClick={()=>update(w.id,'rejected')} className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-sm font-body font-bold flex items-center justify-center gap-1"><XCircle size={14}/> Reject</button>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

const adminNav = [
  { to:'/admin/dashboard', label:'Overview', icon:LayoutDashboard },
  { to:'/admin/users', label:'Users', icon:Users },
  { to:'/admin/deposits', label:'Deposits', icon:Wallet },
  { to:'/admin/kyc', label:'KYC', icon:ShieldCheck },
  { to:'/admin/withdrawals', label:'Withdrawals', icon:ArrowUpRight },
]

const AdminDashboard = () => {
  useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const logout = () => { localStorage.removeItem('admin_auth'); navigate('/admin/login') }
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:flex flex-col w-56 bg-navy-900 fixed top-0 left-0 bottom-0 z-50">
        <div className="p-4 border-b border-white/10"><ApexLogo white/><p className="text-white/40 text-xs font-body mt-1">Admin</p></div>
        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map(({to,label,icon:Icon})=>(
            <Link key={to} to={to} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-colors ${location.pathname===to?'bg-blue-600 text-white':'text-white/60 hover:text-white hover:bg-white/10'}`}>
              <Icon size={16}/>{label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-white/60 hover:text-white hover:bg-white/10 w-full transition-colors">
            <LogOut size={16}/>Sign Out
          </button>
        </div>
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-navy-900 z-50 h-14 flex items-center justify-between px-4">
        <ApexLogo white/><button onClick={logout} className="text-white/60"><LogOut size={18}/></button>
      </div>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around px-2 py-2 z-50">
        {adminNav.map(({to,label,icon:Icon})=>(
          <Link key={to} to={to} className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl ${location.pathname===to?'text-blue-600':'text-gray-400'}`}>
            <Icon size={18}/><span className="text-xs font-body">{label}</span>
          </Link>
        ))}
      </nav>
      <main className="flex-1 md:ml-56 pt-14 md:pt-0 pb-20 md:pb-0 px-4 md:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route path="dashboard" element={<AdminOverview/>}/>
            <Route path="users" element={<AdminUsers/>}/>
            <Route path="deposits" element={<AdminDeposits/>}/>
            <Route path="kyc" element={<AdminKYC/>}/>
            <Route path="withdrawals" element={<AdminWithdrawals/>}/>
            <Route path="*" element={<Navigate to="/admin/dashboard" replace/>}/>
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
