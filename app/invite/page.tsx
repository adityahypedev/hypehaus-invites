'use client'
import { useEffect, useState, useRef } from 'react'

interface Inf { id:string;name:string;handle:string;token:string;event_name:string;event_date:string;venue:string;custom_message:string;link_opened:boolean }

const RANKS = ['SIGNAL CARRIER','FREQUENCY HOLDER','VIBE ANCHOR','WAVE MAKER','HYPE ORACLE']
const pk = '#FF006E', mg = '#C800FF', cy = '#00FFDD'

const GBtn = ({onClick,disabled,children}:any) => (
  <button onClick={onClick} disabled={disabled} style={{display:'