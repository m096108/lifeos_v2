/* ── SHARED TOKENS + PRIMITIVES ──────────────────────────── */
const T = {
  bg:'#F7F6F3', bgS:'#EFEDE9', card:'#FFFFFF',
  ac:'#4458E0', acS:'#EBEDFC', acM:'#A5B0F5',
  tx:'#1A1A1F', txM:'#6B6975', txS:'#A09FA8',
  border:'#E5E3E0',
  r:'#E03434', rS:'#FEF2F2',
  g:'#16A34A', gS:'#F0FDF4',
  w:'#CA8A04', wS:'#FEFCE8',
  serif:"'DM Serif Display',serif",
};
const PC = {1:'#E03434',2:'#CA8A04',3:'#A09FA8'};

const CHIP = {
  home:{bg:'#EEF0FD',c:'#3B4FD8'},
  out:{bg:'#FFF7ED',c:'#C2410C'},
  anywhere:{bg:'#F0FDF4',c:'#15803D'},
  work:{bg:'#F5F3FF',c:'#7C3AED'},
};

function Phone({children, bg=T.bg}){
  return <div style={{
    width:390, height:780, background:bg, borderRadius:0, overflow:'hidden',
    fontFamily:"'Inter',sans-serif", color:T.tx,
    display:'flex', flexDirection:'column', position:'relative',
    WebkitFontSmoothing:'antialiased'
  }}>{children}</div>;
}

function Screen({children, padTop=20, scroll}){
  return <div style={{
    flex:1, padding:`${padTop}px 20px 90px`, overflowY:scroll?'auto':'hidden',
    display:'flex', flexDirection:'column', gap:16
  }}>{children}</div>;
}

function StatusBar(){
  return <div style={{
    height:44, display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'0 24px', fontSize:13, fontWeight:600, color:T.tx, flexShrink:0
  }}>
    <span>9:41</span>
    <div style={{display:'flex',gap:4,alignItems:'center'}}>
      <span style={{fontSize:10}}>●●●●●</span>
      <span style={{fontSize:11}}>􀙇</span>
      <span style={{fontSize:11}}>􀛪</span>
    </div>
  </div>;
}

function BottomNav({active='today', tabs=null}){
  const def=[
    {id:'today',label:'Today',icon:'⊙'},
    {id:'tasks',label:'Tasks',icon:'✓'},
    {id:'projects',label:'Projects',icon:'◫'},
    {id:'trips',label:'Trips',icon:'✈'},
    {id:'more',label:'More',icon:'···'},
  ];
  const nav=tabs||def;
  return <div style={{
    position:'absolute', bottom:0, left:0, right:0, background:T.card,
    borderTop:`1px solid ${T.border}`, display:'flex'
  }}>
    {nav.map(n=>{const a=n.id===active;return <button key={n.id} style={{
      flex:1, display:'flex', flexDirection:'column', alignItems:'center',
      padding:'10px 0 12px', gap:3, background:'none', border:'none',
      position:'relative', cursor:'pointer'
    }}>
      {a&&<div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:20,height:3,borderRadius:99,background:T.ac}}/>}
      <span style={{fontSize:16,lineHeight:1,color:a?T.ac:T.txS}}>{n.icon}</span>
      <span style={{fontSize:10,fontWeight:700,color:a?T.ac:T.txS}}>{n.label}</span>
    </button>;})}
  </div>;
}

function Card({children, style={}, accent, onClick}){
  return <div onClick={onClick} style={{
    background:T.card, borderRadius:18,
    boxShadow:'0 1px 3px rgba(0,0,0,0.05),0 6px 20px rgba(0,0,0,0.04)',
    borderLeft:accent?`3px solid ${accent}`:undefined,
    ...style
  }}>{children}</div>;
}

function Chip({label, ctx}){
  const s=CHIP[ctx||label]||{bg:T.bgS,c:T.txM};
  return <span style={{
    fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:8,
    background:s.bg, color:s.c, textTransform:'capitalize'
  }}>{label}</span>;
}

function Check({on, color=T.ac}){
  return <div style={{
    width:22, height:22, borderRadius:7, flexShrink:0,
    border:`2px solid ${on?color:T.border}`, background:on?color:'transparent',
    display:'flex', alignItems:'center', justifyContent:'center'
  }}>
    {on&&<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
  </div>;
}

function PriDot({p}){
  return <div style={{width:8,height:8,borderRadius:99,background:PC[p],flexShrink:0}}/>;
}

function SecLabel({children, right}){
  return <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
    <span style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'0.12em',color:T.txS}}>{children}</span>
    {right&&<span style={{fontSize:12,fontWeight:700,color:T.ac}}>{right}</span>}
  </div>;
}

function PageTitle({children, sub}){
  return <div style={{marginBottom:4}}>
    {sub&&<p style={{fontSize:12,fontWeight:500,color:T.txS,letterSpacing:'0.04em',marginBottom:4}}>{sub}</p>}
    <h1 style={{fontSize:28,fontWeight:400,color:T.tx,fontFamily:T.serif,lineHeight:1.1,letterSpacing:'-0.02em',margin:0}}>{children}</h1>
  </div>;
}

function Btn({children, v='primary', size='md', full, style={}}){
  const base={
    display:'inline-flex',alignItems:'center',justifyContent:'center',gap:6,
    borderRadius:12,fontWeight:700,border:'none',cursor:'pointer',
    fontFamily:'inherit',letterSpacing:'-0.01em',width:full?'100%':undefined,
    fontSize:size==='sm'?13:14,padding:size==='sm'?'8px 16px':'11px 20px',
    minHeight:size==='sm'?36:44,
  };
  const vs={
    primary:{background:T.ac,color:'#fff'},
    ghost:{background:T.acS,color:T.ac},
    soft:{background:T.bgS,color:T.txM},
    dark:{background:T.tx,color:'#fff'},
    danger:{background:T.rS,color:T.r},
  };
  return <button style={{...base,...vs[v],...style}}>{children}</button>;
}

function FAB({onClick, style={}}){
  return <button onClick={onClick} style={{
    position:'absolute', right:18, bottom:84, width:56, height:56,
    borderRadius:'50%', background:T.tx, color:'#fff', border:'none',
    boxShadow:'0 6px 20px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.1)',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:24, cursor:'pointer', fontWeight:300, zIndex:5, ...style
  }}>+</button>;
}

Object.assign(window, {T, PC, CHIP, Phone, Screen, StatusBar, BottomNav, Card, Chip, Check, PriDot, SecLabel, PageTitle, Btn, FAB});
