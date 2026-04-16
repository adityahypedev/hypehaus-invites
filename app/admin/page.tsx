'use client'
import { useEffect, useState, useCallback } from 'react'

interface Inf { id:string;name:string;handle:string;category:string;followers:string;event_name:string;event_date:string;venue:string;custom_message:string;token:string;link_opened:boolean;rsvp:string;plus_ones:number;plus_handles:string;creators_type:string;gmail:string;ticket_number:string;notes:string;created_at:string }

const RC:Record<string,string>={CONFIRMED:'#00CC88',DECLINED:'#FF4444',MAYBE:'#8899FF',PENDING:'#FFB300'}
const pk='#FF006E',mg='#C800FF',cy='#00FFDD'
const PW='Aditya@021'
const inp:React.CSSProperties={background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.1)',color:'#fff',fontFamily:'Space Mono,monospace',fontSize:11,padding:'10px 14px',outline:'none',width:'100%'}
const btn:React.CSSProperties={background:`linear-gradient(135deg,${pk},${mg})`,color:'#fff',fontFamily:'Space Mono,monospace',fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',padding:'10px 20px',border:'none',cursor:'pointer'}
const ghost:React.CSSProperties={background:'transparent',border:'1px solid rgba(255,255,255,.1)',color:'rgba(255,255,255,.5)',fontFamily:'Space Mono,monospace',fontSize:10,letterSpacing:'.1em',textTransform:'uppercase',padding:'10px 20px',cursor:'pointer'}

export default function Admin() {
  const [ok,setOk]=useState(false)
  const [pw,setPw]=useState('')
  const [err,setErr]=useState(false)
  const [data,setData]=useState<Inf[]>([])
  const [loading,setLoading]=useState(false)
  const [showAdd,setShowAdd]=useState(false)
  const [copied,setCopied]=useState<string|null>(null)
  const [edit,setEdit]=useState<{id:string;field:string}|null>(null)
  const [ev,setEv]=useState('')
  const [adding,setAdding]=useState(false)
  const [search,setSearch]=useState('')
  const [filter,setFilter]=useState('ALL')
  const [form,setForm]=useState({name:'',handle:'',category:'',followers:'',event_name:'',event_date:'',venue:'',custom_message:''})

  useEffect(()=>{ if(localStorage.getItem('hp_admin')==='ok') setOk(true) },[])
  const login=()=>{ if(pw===PW){localStorage.setItem('hp_admin','ok');setOk(true)}else{setErr(true);setTimeout(()=>setErr(false),2000)} }
  const load=useCallback(async()=>{ setLoading(true);const r=await fetch('/api/admin');const j=await r.json();if(Array.isArray(j))setData(j);setLoading(false) },[])
  useEffect(()=>{ if(ok){load();const iv=setInterval(load,30000);return()=>clearInterval(iv)} },[ok,load])
  const copy=(token:string,id:string)=>{ navigator.clipboard.writeText(`https://hypehaus.org/invite?t=${token}`);setCopied(id);setTimeout(()=>setCopied(null),2000) }
  const saveEdit=async()=>{ if(!edit)return;await fetch('/api/admin',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:edit.id,[edit.field]:ev})});setData(p=>p.map(r=>r.id===edit!.id?{...r,[edit!.field]:ev}:r));setEdit(null) }
  const add=async()=>{ if(!form.name)return;setAdding(true);const r=await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const n=await r.json();if(n.id)setData(p=>[n,...p]);setForm({name:'',handle:'',category:'',followers:'',event_name:'',event_date:'',venue:'',custom_message:''});setShowAdd(false);setAdding(false) }
  const exportCSV=()=>{ const h=['Name','Handle','Category','Followers','Event','Date','Venue','Custom Msg','Token','Opened','RSVP','+Ones','+Handles','Creators','Gmail','Ticket#','Notes'];const rows=data.map(r=>[r.name,r.handle,r.category,r.followers,r.event_name,r.event_date,r.venue,r.custom_message,r.token,r.link_opened?'Yes':'No',r.rsvp,r.plus_ones,r.plus_handles,r.creators_type,r.gmail,r.ticket_number,r.notes].map(v=>`"${v||''}"`).join(','));const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([[h.join(','),...rows].join('\n')],{type:'text/csv'}));a.download=`hypehaus_${Date.now()}.csv`;a.click() }

  const filtered=data.filter(r=>(!search||(r.name+r.handle).toLowerCase().includes(search.toLowerCase()))&&(filter==='ALL'||r.rsvp===filter))
  const st={total:data.length,conf:data.filter(r=>r.rsvp==='CONFIRMED').length,dec:data.filter(r=>r.rsvp==='DECLINED').length,may:data.filter(r=>r.rsvp==='MAYBE').length,pend:data.filter(r=>r.rsvp==='PENDING').length,plus:data.filter(r=>r.rsvp==='CONFIRMED').reduce((s,r)=>s+(r.plus_ones||0),0),gmails:data.filter(r=>r.gmail).length}
  const head=st.conf+st.plus

  if(!ok)return(
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:20,background:'#04000A'}}>
      <div style={{fontFamily:'Bebas Neue',fontSize:32,letterSpacing:'.15em',background:`linear-gradient(90deg,${pk},${mg})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>HYPEHAUS ADMIN</div>
      <div style={{width:320,display:'flex',flexDirection:'column',gap:12}}>
        <input style={{...inp,textAlign:'center',fontSize:16,letterSpacing:'.2em',borderColor:err?'rgba(255,68,68,.5)':'rgba(255,255,255,.1)'}} type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()}/>
        {err&&<div style={{fontSize:10,color:'#FF4444',textAlign:'center'}}>WRONG PASSWORD</div>}
        <button style={btn} onClick={login}>Enter</button>
      </div>
    </div>
  )

  return(
    <div style={{minHeight:'100vh',background:'#04000A',paddingBottom:60}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 28px',borderBottom:'1px solid rgba(255,255,255,.06)',backdropFilter:'blur(14px)',background:'rgba(4,0,10,.95)',position:'sticky',top:0,zIndex:100,flexWrap:'wrap',gap:10}}>
        <div style={{fontFamily:'Bebas Neue',fontSize:20,letterSpacing:'.18em',background:`linear-gradient(90deg,${pk},${mg})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>HYPEHAUS ADMIN</div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button style={ghost} onClick={load}>{loading?'...':'Refresh'}</button>
          <button style={ghost} onClick={exportCSV}>Export CSV</button>
          <button style={btn} onClick={()=>setShowAdd(!showAdd)}>+ Add Influencer</button>
          <button style={{...ghost,fontSize:9}} onClick={()=>{localStorage.removeItem('hp_admin');setOk(false)}}>Logout</button>
        </div>
      </div>
      <div style={{padding:'24px 28px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(8,1fr)',gap:2,marginBottom:24}}>
          {[['Invited',st.total,'#fff'],['Confirmed',st.conf,'#00CC88'],['Declined',st.dec,'#FF4444'],['Maybe',st.may,'#8899FF'],['Pending',st.pend,'#FFB300'],['Plus Ones',st.plus,mg],['Headcount',head,pk],['Gmails',st.gmails,cy]].map(([l,v,c])=>(
            <div key={l as string} style={{background:'#12001F',border:'1px solid rgba(255,255,255,.05)',padding:'14px 12px',textAlign:'center'}}>
              <div style={{fontSize:8,letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(255,255,255,.3)',marginBottom:6}}>{l as string}</div>
              <div style={{fontFamily:'Bebas Neue',fontSize:28,color:c as string}}>{v as number}</div>
            </div>
          ))}
        </div>
        {showAdd&&(
          <div style={{background:'#12001F',border:`1px solid rgba(255,0,110,.2)`,padding:24,marginBottom:24}}>
            <div style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:pk,marginBottom:20}}>Add Influencer</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:12}}>
              {[['name','Name *'],['handle','Handle'],['category','Category'],['followers','Followers'],['event_name','Event Name'],['event_date','Date (YYYY-MM-DD)'],['venue','Venue']].map(([f,l])=>(
                <div key={f}><div style={{fontSize:8,letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(255,255,255,.3)',marginBottom:4}}>{l}</div><input style={inp} value={(form as any)[f]} onChange={e=>setForm(p=>({...p,[f]:e.target.value}))}/></div>
              ))}
            </div>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:8,letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(255,255,255,.3)',marginBottom:4}}>Custom Message</div>
              <textarea style={{...inp,height:72,resize:'vertical'}} value={form.custom_message} onChange={e=>setForm(p=>({...p,custom_message:e.target.value}))} placeholder="Write something personal just for them..."/>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button style={btn} onClick={add} disabled={adding}>{adding?'Adding...':'Generate Link & Add'}</button>
              <button style={ghost} onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        )}
        <div style={{display:'flex',gap:10,marginBottom:16,flexWrap:'wrap'}}>
          <input style={{...inp,width:220}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
          <div style={{display:'flex',gap:4}}>
            {['ALL','CONFIRMED','DECLINED','MAYBE','PENDING'].map(v=>(
              <button key={v} style={{...ghost,borderColor:filter===v?(RC[v]||'rgba(255,0,110,.5)'):'rgba(255,255,255,.1)',color:filter===v?(RC[v]||pk):'rgba(255,255,255,.4)',fontSize:9}} onClick={()=>setFilter(v)}>{v}</button>
            ))}
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:11,fontFamily:'Space Mono,monospace'}}>
            <thead><tr>{['Name','Handle','Category','Event','Custom Msg','Token','Invite Link','Opened','RSVP','+1s','+Handles','Gmail','Ticket #','Notes'].map(h=><th key={h} style={{background:'#12001F',color:cy,fontSize:8,letterSpacing:'.2em',textTransform:'uppercase',padding:'10px 12px',textAlign:'left',border:'1px solid rgba(255,255,255,.05)',whiteSpace:'nowrap'}}>{h}</th>)}</tr></thead>
            <tbody>
              {filtered.length===0&&<tr><td colSpan={14} style={{textAlign:'center',padding:40,color:'rgba(255,255,255,.2)'}}>No influencers yet. Add one above.</td></tr>}
              {filtered.map((r,i)=>(
                <tr key={r.id} style={{background:i%2===0?'#04000A':'#0D001A'}}>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',color:'#fff',fontWeight:700,whiteSpace:'nowrap'}}>{r.name}</td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',color:mg,whiteSpace:'nowrap'}}>{r.handle}</td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',color:'rgba(255,255,255,.4)',whiteSpace:'nowrap'}}>{r.category}</td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',color:'rgba(255,255,255,.6)',whiteSpace:'nowrap'}}>{r.event_name}</td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',color:'rgba(255,255,255,.4)',maxWidth:160,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.custom_message}</td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',color:pk,fontSize:10,whiteSpace:'nowrap'}}>{r.token}</td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',whiteSpace:'nowrap'}}><button onClick={()=>copy(r.token,r.id)} style={{...ghost,fontSize:9,padding:'6px 12px',borderColor:copied===r.id?'#00CC88':'rgba(255,255,255,.1)',color:copied===r.id?'#00CC88':'rgba(255,255,255,.5)'}}>{copied===r.id?'Copied':'Copy'}</button></td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',whiteSpace:'nowrap'}}><span style={{fontSize:9,color:r.link_opened?'#00CC88':'#FFB300'}}>{r.link_opened?'OPENED':'PENDING'}</span></td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',whiteSpace:'nowrap'}}><span style={{fontWeight:700,color:RC[r.rsvp]||'#fff',fontSize:10}}>{r.rsvp}</span></td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',textAlign:'center',color:r.plus_ones>0?mg:'rgba(255,255,255,.2)'}}>{r.plus_ones||0}</td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',color:'rgba(255,255,255,.4)',maxWidth:140,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.plus_handles}</td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',color:cy,whiteSpace:'nowrap',fontSize:10}}>{r.gmail}</td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',whiteSpace:'nowrap'}}>
                    {edit?.id===r.id&&edit.field==='ticket_number'?<input autoFocus style={{...inp,width:110,padding:'4px 8px'}} value={ev} onChange={e=>setEv(e.target.value)} onBlur={saveEdit} onKeyDown={e=>e.key==='Enter'&&saveEdit()}/>:<span style={{color:r.ticket_number?mg:'rgba(255,255,255,.15)',cursor:'pointer',fontWeight:700}} onClick={()=>{setEdit({id:r.id,field:'ticket_number'});setEv(r.ticket_number||'')}}>{r.ticket_number||'+ Add'}</span>}
                  </td>
                  <td style={{padding:'10px 12px',border:'1px solid rgba(255,255,255,.04)',whiteSpace:'nowrap'}}>
                    {edit?.id===r.id&&edit.field==='notes'?<input autoFocus style={{...inp,width:180,padding:'4px 8px'}} value={ev} onChange={e=>setEv(e.target.value)} onBlur={saveEdit} onKeyDown={e=>e.key==='Enter'&&saveEdit()}/>:<span style={{color:'rgba(255,255,255,.35)',cursor:'pointer',fontSize:10}} onClick={()=>{setEdit({id:r.id,field:'notes'});setEv(r.notes||'')}}>{r.notes||'+ Note'}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:12,fontSize:9,color:'rgba(255,255,255,.15)',textTransform:'uppercase'}}>{filtered.length} of {data.length} shown - Auto-refreshes every 30s</div>
      </div>
    </div>
  )
}