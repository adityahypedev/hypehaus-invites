'use client'
import { useEffect, useState, useRef } from 'react'

interface Inf { id:string;name:string;handle:string;token:string;event_name:string;event_date:string;venue:string;custom_message:string;link_opened:boolean }

const RANKS = ['SIGNAL CARRIER','FREQUENCY HOLDER','VIBE ANCHOR','WAVE MAKER','HYPE ORACLE']
const pk = '#FF006E', mg = '#C800FF', cy = '#00FFDD'

const GBtn = ({onClick,disabled,children}:any) => (
  <button onClick={onClick} disabled={disabled} style={{display:'inline-flex',alignItems:'center',gap:12,background:disabled?'rgba(255,255,255,.06)':`linear-gradient(135deg,${pk},${mg})`,color:'#fff',fontFamily:'Space Mono,monospace',fontSize:12,letterSpacing:'.13em',textTransform:'uppercase',padding:'16px 34px',border:'none',cursor:disabled?'not-allowed':'pointer',opacity:disabled?.4:1,transition:'all .2s'}}>{children}</button>
)

const C = ({label,sel,onClick}:any) => (
  <button onClick={onClick} style={{background:sel?`linear-gradient(135deg,${pk},${mg})`:'transparent',border:`1px solid ${sel?'transparent':'rgba(255,255,255,.1)'}`,color:sel?'#fff':'rgba(255,255,255,.65)',fontFamily:'Space Mono,monospace',fontSize:11,letterSpacing:'.1em',padding:'13px 20px',cursor:'pointer',textTransform:'uppercase',transition:'all .2s'}}>{label}</button>
)

const NB = ({label,sel,onClick}:any) => (
  <button onClick={onClick} style={{width:54,height:54,background:sel?`linear-gradient(135deg,${pk},${mg})`:'transparent',border:`1px solid ${sel?'transparent':'rgba(255,255,255,.1)'}`,color:sel?'#fff':'rgba(255,255,255,.45)',fontFamily:'Bebas Neue,sans-serif',fontSize:20,cursor:'pointer',transition:'all .2s'}}>{label}</button>
)

export default function InvitePage() {
  const [booting,setBooting]=useState(true)
  const [lines,setLines]=useState<string[]>([])
  const [screen,setScreen]=useState<'invite'|'confirmed'|'declined'|'invalid'|'used'>('invite')
  const [inf,setInf]=useState<Inf|null>(null)
  const [step,setStep]=useState(1)
  const [coming,setComing]=useState<string|null>(null)
  const [plus,setPlus]=useState<number|null>(null)
  const [plusH,setPlusH]=useState('')
  const [ct,setCt]=useState<string|null>(null)
  const [gmail,setGmail]=useState('')
  const [gmailOk,setGmailOk]=useState(false)
  const [busy,setBusy]=useState(false)
  const [rank,setRank]=useState('')
  const [cd,setCd]=useState({d:'00',h:'00',m:'00',s:'00'})
  const amb=useRef<HTMLDivElement>(null)
  const token=typeof window!=='undefined'?new URLSearchParams(window.location.search).get('t')||'':''