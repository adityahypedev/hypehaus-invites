'use client'
import { useEffect, useState, useCallback } from 'react'

interface Inf { id:string;name:string;handle:string;category:string;followers:string;event_name:string;event_date:string;venue:string;custom_message:string;token:string;link_opened:boolean;rsvp:string;plus_ones:number;plus_handles:string;creators_type:string;gmail:string;ticket_number:string;notes:string;created_at:string }

const RC:Record<string,string>={CONFIRMED:'#00CC88',DECLINED:'#FF4444',MAYBE:'#8899FF',PENDING:'#FFB300'}
const pk='#FF006E',mg='#C800FF',cy='#00FFDD'
const S={inp:{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.1)',color:'#fff',fontFamily:'Space Mono,monospace',fontSize:11,padding:'10px 14px',outline:'none',width:'100%'} as React.CSSProperties};
const PW='Aditya@021';
export default function Admin() { return <div>Admin</div> }
