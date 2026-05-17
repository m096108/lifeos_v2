/* global React */
// Shared LifeOS mock primitives for explorations
// Mirrors LifeOS.html visual language exactly.

const { useState, useRef, useEffect } = React;
const T = window.LOS.T;
const PC = window.LOS.PC;

// ─── Frame: a phone-shaped artboard with bottom nav and content ────────
function Frame({ children, title, navActive = 'today', noNav = false, scroll = false, search = false }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', system-ui, sans-serif", color: T.tx,
      WebkitFontSmoothing: 'antialiased', overflow: 'hidden', position: 'relative'
    }}>
      <div style={{ flex: 1, overflow: scroll ? 'auto' : 'hidden', padding: '16px 20px 16px' }}>
        {children}
      </div>
      {!noNav && <BottomNav active={navActive} />}
    </div>
  );
}

function BottomNav({ active = 'today', items }) {
  const def = items || [
    { id: 'today', label: 'Today', icon: '⊙' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'projects', label: 'Projects', icon: '◫' },
    { id: 'trips', label: 'Trips', icon: '✈' },
    { id: 'clothing', label: 'Clothing', icon: '◈' },
    { id: 'more', label: 'More', icon: '···' },
  ];
  return (
    <div style={{ background: T.card, borderTop: `1px solid ${T.border}`, display: 'flex' }}>
      {def.map(n => {
        const isActive = n.id === active;
        return (
          <div key={n.id} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '10px 0 12px', gap: 3, position: 'relative'
          }}>
            {isActive && <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 20, height: 3, borderRadius: 99, background: T.ac
            }} />}
            <span style={{ fontSize: 16, lineHeight: 1, color: isActive ? T.ac : T.txS }}>{n.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: isActive ? T.ac : T.txS }}>{n.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function PageTitle({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, marginTop: 4 }}>
      <h1 style={{
        fontSize: 28, fontWeight: 400, color: T.tx, letterSpacing: '-0.02em',
        fontFamily: T.serif, lineHeight: 1.1
      }}>{children}</h1>
      {action}
    </div>
  );
}

function Card({ children, style = {}, accent }) {
  return (
    <div style={{
      background: T.card, borderRadius: 14,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      borderLeft: accent ? `3px solid ${accent}` : undefined,
      padding: '12px 14px',
      ...style
    }}>{children}</div>
  );
}

function Chip({ label, bg, color }) {
  const palette = {
    home: { bg: '#EEF0FD', c: '#3B4FD8' },
    out: { bg: '#FFF7ED', c: '#C2410C' },
    anywhere: { bg: '#F0FDF4', c: '#15803D' },
    work: { bg: '#F5F3FF', c: '#7C3AED' },
  };
  const p = palette[label] || { bg: bg || '#F0FDF4', c: color || '#15803D' };
  return <span style={{
    fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 8,
    background: p.bg, color: p.c, textTransform: 'capitalize', display: 'inline-block'
  }}>{label}</span>;
}

function Check({ on, color = T.ac, size = 22 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 7, flexShrink: 0,
      border: `2px solid ${on ? color : T.border}`, background: on ? color : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {on && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function Btn({ children, v = 'primary', size = 'md', full, style = {} }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: 12, fontWeight: 700, border: 'none', fontFamily: 'inherit',
    letterSpacing: '-0.01em', width: full ? '100%' : undefined,
    fontSize: size === 'sm' ? 13 : 14, padding: size === 'sm' ? '8px 16px' : '11px 20px',
    minHeight: size === 'sm' ? 36 : 44,
  };
  const vs = {
    primary: { background: T.ac, color: '#fff' },
    ghost: { background: T.acS, color: T.ac },
    soft: { background: T.bgS, color: T.txM },
    danger: { background: T.rS, color: T.r },
    dark: { background: T.tx, color: '#fff' },
  };
  return <button style={{ ...base, ...vs[v], ...style }}>{children}</button>;
}

function SecLabel({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
      <span style={{
        fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
        letterSpacing: '0.12em', color: T.txS
      }}>{children}</span>
      {action && <span style={{ fontSize: 12, fontWeight: 700, color: T.ac }}>{action}</span>}
    </div>
  );
}

function DueBadge({ days }) {
  if (days == null) return null;
  let tx, c, bg;
  if (days < 0) { tx = `${Math.abs(days)}d overdue`; c = T.r; bg = T.rS; }
  else if (days === 0) { tx = 'Today'; c = T.w; bg = T.wS; }
  else if (days === 1) { tx = 'Tomorrow'; c = T.w; bg = T.wS; }
  else { tx = `${days}d`; c = T.txS; bg = 'transparent'; }
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6, color: c, background: bg }}>{tx}</span>
  );
}

function Greeting() {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 12, fontWeight: 500, color: T.txS, letterSpacing: '0.04em', marginBottom: 4 }}>
        Wednesday, May 13
      </p>
      <h1 style={{ fontSize: 28, fontWeight: 400, fontFamily: T.serif, lineHeight: 1.1 }}>
        Good morning
      </h1>
    </div>
  );
}

function StatTile({ kicker, value, label, bg = T.ac, kickerColor = 'rgba(255,255,255,0.65)', valueColor = '#fff', labelColor = 'rgba(255,255,255,0.7)' }) {
  return (
    <div style={{ background: bg, borderRadius: 18, padding: '16px 14px' }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: kickerColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>{kicker}</p>
      <p style={{ fontSize: 32, fontWeight: 700, color: valueColor, fontFamily: T.serif, lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 11, color: labelColor, marginTop: 4, fontWeight: 500 }}>{label}</p>
    </div>
  );
}

// Notebox primitive for design-canvas explanatory captions
function Note({ children, color = T.txM }) {
  return (
    <p style={{
      fontSize: 12, color, lineHeight: 1.5, padding: '8px 12px',
      background: '#FEFAE7', border: '1px solid #F2E6A5', borderRadius: 8,
      marginBottom: 10, fontFamily: 'inherit'
    }}>{children}</p>
  );
}

Object.assign(window, {
  Frame, BottomNav, PageTitle, Card, Chip, Check, Btn, SecLabel, DueBadge,
  Greeting, StatTile, Note,
  T_LOS: T, PC_LOS: PC,
});
