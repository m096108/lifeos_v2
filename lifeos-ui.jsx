// LifeOS Shared UI Primitives

const T = {
  bg: '#FAFAF8',
  bgSoft: '#F2F1EE',
  card: '#FFFFFF',
  ac: '#4C65E4',
  acSoft: '#ECEFFE',
  acMid: '#A5AFFC',
  tx: '#18181A',
  txM: '#6B6B7B',
  txS: '#9898A8',
  border: '#E8E8EF',
  danger: '#E03434',
  dangerSoft: '#FEF2F2',
  success: '#16A34A',
  successSoft: '#F0FDF4',
  warn: '#D97706',
  warnSoft: '#FFFBEB',
};
window.T = T;

// Priority colors
const PCOL = { 1: '#E03434', 2: '#D97706', 3: '#9898A8' };
window.PCOL = PCOL;

// Helpers
function todayStr() { return new Date().toISOString().split('T')[0]; }
function daysUntil(d) {
  const t = new Date(); t.setHours(0,0,0,0);
  const x = new Date(d); x.setHours(0,0,0,0);
  return Math.ceil((x - t) / 86400000);
}
function fmtDate(d) { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }
function fmtTime(s) { if (!s && s !== 0) return '—'; return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`; }
function taskSort(a, b) {
  const aD = a.due_date ? daysUntil(a.due_date) : 999, bD = b.due_date ? daysUntil(b.due_date) : 999;
  if ((aD < 0) !== (bD < 0)) return aD < 0 ? -1 : 1;
  if ((a.priority||2) !== (b.priority||2)) return (a.priority||2) - (b.priority||2);
  return aD - bD;
}
function dueTag(t) {
  if (!t.due_date) return null;
  const d = daysUntil(t.due_date);
  if (d < 0) return { text: `${Math.abs(d)}d overdue`, color: T.danger, bg: T.dangerSoft };
  if (d === 0) return { text: 'Today', color: T.warn, bg: T.warnSoft };
  if (d === 1) return { text: 'Tomorrow', color: T.warn, bg: T.warnSoft };
  return { text: fmtDate(t.due_date), color: T.txS, bg: 'transparent' };
}
const CHIP_PAL = [
  { bg:'#EEF0FD', c:'#3B4FD8' }, { bg:'#FFF7ED', c:'#C2410C' },
  { bg:'#F0FDF4', c:'#15803D' }, { bg:'#FDF2F8', c:'#BE185D' },
  { bg:'#F5F3FF', c:'#7C3AED' }, { bg:'#FEF9C3', c:'#854D0E' },
];
function chipStyle(cat) {
  const m = { home: CHIP_PAL[0], out: CHIP_PAL[1], anywhere: CHIP_PAL[2], work: CHIP_PAL[4] };
  if (m[cat]) return m[cat];
  let h = 0; for (const c of (cat||'')) h = (h*31 + c.charCodeAt(0)) >>> 0;
  return CHIP_PAL[h % CHIP_PAL.length];
}
window.LOS_HELPERS = { todayStr, daysUntil, fmtDate, fmtTime, taskSort, dueTag, chipStyle };

// ── UI Components ──────────────────────────────────────────

function Card({ children, onClick, accent, className='', style={} }) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: T.card,
        borderRadius: 16,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
        borderLeft: accent ? `3px solid ${T.ac}` : undefined,
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >{children}</div>
  );
}

function Btn({ children, onClick, variant='primary', size='md', full, disabled, style={} }) {
  const base = {
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
    borderRadius:12, fontWeight:700, border:'none', cursor: disabled?'default':'pointer',
    transition:'all .15s', fontFamily:'inherit', letterSpacing:'-0.01em',
    width: full?'100%':undefined,
    opacity: disabled ? 0.5 : 1,
    fontSize: size==='sm' ? 13 : 14,
    padding: size==='sm' ? '8px 16px' : '12px 20px',
    minHeight: size==='sm' ? 36 : 44,
  };
  const variants = {
    primary: { background: T.ac, color: '#fff' },
    ghost: { background: T.acSoft, color: T.ac },
    soft: { background: T.bgSoft, color: T.txM },
    danger: { background: T.dangerSoft, color: T.danger },
    dark: { background: T.tx, color: '#fff' },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

function Inp({ label, ...props }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div>
      {label && <label style={{ display:'block', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:T.txS, marginBottom:6 }}>{label}</label>}
      <input
        {...props}
        style={{
          width:'100%', boxSizing:'border-box',
          background: T.bgSoft, border: `2px solid ${focus ? T.ac : 'transparent'}`,
          borderRadius:12, padding:'11px 14px', fontSize:14, color:T.tx,
          outline:'none', fontFamily:'inherit', transition:'border-color .15s',
        }}
        onFocus={e => { setFocus(true); props.onFocus?.(e); }}
        onBlur={e => { setFocus(false); props.onBlur?.(e); }}
      />
    </div>
  );
}

function Textarea({ label, rows=4, ...props }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div>
      {label && <label style={{ display:'block', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:T.txS, marginBottom:6 }}>{label}</label>}
      <textarea
        {...props} rows={rows}
        style={{
          width:'100%', boxSizing:'border-box', resize:'none',
          background: T.bgSoft, border: `2px solid ${focus ? T.ac : 'transparent'}`,
          borderRadius:12, padding:'11px 14px', fontSize:14, color:T.tx,
          outline:'none', fontFamily:'inherit', lineHeight:1.6, transition:'border-color .15s',
        }}
        onFocus={e => { setFocus(true); props.onFocus?.(e); }}
        onBlur={e => { setFocus(false); props.onBlur?.(e); }}
      />
    </div>
  );
}

function Sel({ label, children, ...props }) {
  return (
    <div>
      {label && <label style={{ display:'block', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:T.txS, marginBottom:6 }}>{label}</label>}
      <select
        {...props}
        style={{ width:'100%', boxSizing:'border-box', background:T.bgSoft, border:'2px solid transparent', borderRadius:12, padding:'11px 14px', fontSize:14, color:T.tx, outline:'none', fontFamily:'inherit' }}
      >{children}</select>
    </div>
  );
}

function Chip({ label, cat }) {
  const s = chipStyle(cat || label);
  return (
    <span style={{ fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:8, background:s.bg, color:s.c, textTransform:'capitalize', display:'inline-block' }}>
      {label}
    </span>
  );
}

function Pill({ label, active, onClick, dashed, count }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize:12, fontWeight:700, padding:'7px 14px', borderRadius:10,
        border: dashed ? `1.5px dashed ${T.ac}` : 'none',
        background: dashed ? 'transparent' : active ? T.ac : T.bgSoft,
        color: dashed ? T.ac : active ? '#fff' : T.txM,
        cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:4,
        textTransform:'capitalize',
      }}
    >{label}{count != null ? ` ${count}` : ''}</button>
  );
}

function Check({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width:22, height:22, borderRadius:7, flexShrink:0, border:`2px solid ${on ? T.ac : T.border}`,
        background: on ? T.ac : 'transparent', display:'flex', alignItems:'center', justifyContent:'center',
        cursor:'pointer', transition:'all .15s',
      }}
    >
      {on && <span style={{ color:'#fff', fontSize:11, fontWeight:900, lineHeight:1 }}>✓</span>}
    </button>
  );
}

function Bar({ value, max, h=6, color }) {
  const p = max > 0 ? Math.min(100, (value/max)*100) : 0;
  return (
    <div style={{ width:'100%', height:h, background:T.bgSoft, borderRadius:99, overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${p}%`, background: color||T.ac, borderRadius:99, transition:'width .6s cubic-bezier(.4,0,.2,1)' }} />
    </div>
  );
}

function SectionLabel({ children, action, onAction }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
      <span style={{ fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em', color:T.txS }}>{children}</span>
      {action && <button onClick={onAction} style={{ fontSize:12, fontWeight:700, color:T.ac, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>{action}</button>}
    </div>
  );
}

function PageTitle({ children }) {
  return (
    <h1 style={{ fontSize:28, fontWeight:800, color:T.tx, letterSpacing:'-0.03em', fontFamily:"'DM Serif Display', serif", lineHeight:1.1, marginBottom:20, marginTop:4 }}>
      {children}
    </h1>
  );
}

function ScoreBar({ label, raw, score }) {
  const sc = score>=80 ? T.success : score>=60 ? T.ac : score>=40 ? T.warn : T.danger;
  return (
    <div style={{ padding:'12px 0', borderBottom:`1px solid ${T.bgSoft}` }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8 }}>
        <div>
          <span style={{ fontSize:14, fontWeight:700, color:T.tx }}>{label}</span>
          <span style={{ fontSize:12, color:T.txS, marginLeft:8 }}>{raw}</span>
        </div>
        <span style={{ fontSize:22, fontWeight:800, color:sc, fontFamily:"'DM Serif Display', serif" }}>{score}</span>
      </div>
      <Bar value={score} max={100} h={5} color={sc} />
    </div>
  );
}

function Stars({ rating, onRate }) {
  return (
    <div style={{ display:'flex', gap:4, marginTop:6 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => onRate(n)} style={{ fontSize:18, lineHeight:1, background:'none', border:'none', cursor:'pointer', color: n<=(rating||0) ? '#F59E0B' : T.border }}>
          {n<=(rating||0) ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display:'flex', gap:4, padding:4, borderRadius:14, background:T.bgSoft, marginBottom:20 }}>
      {tabs.map(([k,l]) => (
        <button key={k} onClick={() => onChange(k)}
          style={{
            flex:1, fontSize:12, fontWeight:700, padding:'9px 4px', borderRadius:10, border:'none', cursor:'pointer',
            fontFamily:'inherit', transition:'all .15s',
            background: active===k ? T.card : 'transparent',
            color: active===k ? T.ac : T.txS,
            boxShadow: active===k ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
          }}
        >{l}</button>
      ))}
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div style={{ textAlign:'center', padding:'48px 20px' }}>
      <div style={{ fontSize:36, marginBottom:12 }}>{icon}</div>
      <p style={{ fontSize:14, color:T.txS, fontWeight:500 }}>{text}</p>
    </div>
  );
}

function InlineEdit({ value, onSave, style: extraStyle={}, multiline=false }) {
  const [editing, setEditing] = React.useState(false);
  const [val, setVal] = React.useState(value);
  React.useEffect(() => setVal(value), [value]);
  function commit() { setEditing(false); if (val !== value) onSave(val); }
  const shared = {
    fontSize:'inherit', fontWeight:'inherit', color:'inherit', fontFamily:'inherit',
    background: editing ? T.acSoft : 'transparent',
    border: editing ? `2px solid ${T.ac}` : '2px solid transparent',
    borderRadius:8, outline:'none', width:'100%', boxSizing:'border-box',
    padding: editing ? '2px 8px' : '2px 0',
    transition:'all .15s', lineHeight:'inherit',
    ...extraStyle,
  };
  if (multiline) return (
    <textarea value={val} rows={3} onChange={e=>setVal(e.target.value)}
      onFocus={()=>setEditing(true)} onBlur={commit}
      style={{ ...shared, resize:'none', display:'block' }}
    />
  );
  return (
    <input value={val} onChange={e=>setVal(e.target.value)}
      onFocus={()=>setEditing(true)} onBlur={commit}
      onKeyDown={e=>e.key==='Enter'&&commit()}
      style={{ ...shared, display:'block' }}
    />
  );
}

Object.assign(window, {
  T, PCOL, LOS_HELPERS,
  Card, Btn, Inp, Textarea, Sel, Chip, Pill, Check, Bar, SectionLabel, PageTitle,
  ScoreBar, Stars, TabBar, EmptyState, InlineEdit,
});
