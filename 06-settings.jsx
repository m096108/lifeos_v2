/* global React, Card, Chip, Check, Btn, SecLabel, DueBadge, Frame, PageTitle */
// SECTION 4 — Unified add forms
// Goal: pick one pattern. Currently Tasks/Projects/Trips/Books/Clothing
// each use a different approach.

const T = window.LOS.T;
const PC = window.LOS.PC;

// ── Forms A: Universal bottom sheet ────────────────────────────────
// Every "+" anywhere opens a bottom sheet. Same chrome, same close gesture,
// same submit button placement. Sheet rises with iOS-native physics.
function FormsA() {
  return (
    <div style={{
      width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', system-ui, sans-serif", color: T.tx, position: 'relative', overflow: 'hidden'
    }}>
      {/* Background screen: Trips list, dimmed */}
      <div style={{ flex: 1, padding: '16px 20px', opacity: 0.4 }}>
        <h1 style={{ fontSize: 26, fontWeight: 400, fontFamily: T.serif, marginBottom: 12 }}>Trips</h1>
        <div style={{ background: T.card, borderRadius: 14, padding: '14px', marginBottom: 8 }}>
          <p style={{ fontSize: 15, fontWeight: 700, fontFamily: T.serif }}>New York City</p>
          <p style={{ fontSize: 11, color: T.txS, marginTop: 2 }}>Jun 10 – Jun 14</p>
        </div>
        <div style={{ background: T.card, borderRadius: 14, padding: '14px' }}>
          <p style={{ fontSize: 15, fontWeight: 700, fontFamily: T.serif }}>Cancun</p>
          <p style={{ fontSize: 11, color: T.txS, marginTop: 2 }}>Aug 1 – Aug 8</p>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', pointerEvents: 'none' }} />

      {/* Sheet */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, background: T.card,
        borderRadius: '24px 24px 0 0', padding: '14px 20px 28px', boxShadow: '0 -8px 30px rgba(0,0,0,0.15)',
        zIndex: 2
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: T.border, margin: '0 auto 18px' }} />
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <p style={{ fontSize: 18, fontWeight: 700, fontFamily: T.serif }}>New trip</p>
          <span style={{ fontSize: 12, fontWeight: 700, color: T.txS }}>CANCEL</span>
        </div>

        {[
          { label: 'DESTINATION', value: 'Tokyo' },
          { label: 'START', value: '2026-09-12', short: true },
          { label: 'END', value: '2026-09-20', short: true },
        ].map((f, i) => (
          <div key={i} style={{ marginBottom: 12, display: f.short ? 'inline-block' : 'block', width: f.short ? 'calc(50% - 6px)' : '100%', marginRight: f.short && i === 1 ? 12 : 0 }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: T.txS, marginBottom: 6 }}>{f.label}</label>
            <div style={{
              background: T.bgS, borderRadius: 12, padding: '11px 14px', fontSize: 15,
              border: `2px solid ${i === 0 ? T.ac : 'transparent'}`
            }}>{f.value}</div>
          </div>
        ))}

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: T.txS, marginBottom: 6 }}>NOTES</label>
          <div style={{
            background: T.bgS, borderRadius: 12, padding: '11px 14px', fontSize: 14,
            color: T.txS, minHeight: 60
          }}>Cherry blossom season trip with parents…</div>
        </div>

        <Btn full v="primary">Save trip</Btn>
      </div>
    </div>
  );
}

// ── Forms B: Universal inline expand-in-place ──────────────────────
// Top of every list has a single-line "Add…" input. Tap it → it expands
// down into the full form right there (no overlay, no scroll-jump). Lower
// friction for repeated adds. Less visual disruption.
function FormsB() {
  return (
    <Frame navActive="trips" scroll>
      <h1 style={{ fontSize: 28, fontWeight: 400, fontFamily: T.serif, marginBottom: 16, marginTop: 4 }}>Trips</h1>

      <div style={{
        background: T.card, borderRadius: 16, padding: '0', marginBottom: 14,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: `2px solid ${T.ac}`,
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: `1px solid ${T.bgS}` }}>
          <span style={{ fontSize: 16, color: T.ac }}>+</span>
          <span style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>Tokyo</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.txS }}>↑ collapse</span>
        </div>
        <div style={{ padding: '12px 14px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: T.txS, marginBottom: 4, display: 'block' }}>START</label>
              <div style={{ background: T.bgS, borderRadius: 10, padding: '8px 10px', fontSize: 13 }}>Sep 12, 2026</div>
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: T.txS, marginBottom: 4, display: 'block' }}>END</label>
              <div style={{ background: T.bgS, borderRadius: 10, padding: '8px 10px', fontSize: 13 }}>Sep 20, 2026</div>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: T.txS, marginBottom: 4, display: 'block' }}>NOTES</label>
            <div style={{ background: T.bgS, borderRadius: 10, padding: '8px 10px', fontSize: 13, color: T.txS, minHeight: 40 }}>Cherry blossom season trip…</div>
          </div>
          <Btn size="sm" v="primary">Add trip</Btn>
        </div>
      </div>

      {/* Existing trips, normal */}
      {[
        { d: 'New York City', date: 'Jun 10 – Jun 14', dd: '28d' },
        { d: 'Cancun', date: 'Aug 1 – Aug 8', dd: '80d' },
      ].map(t => (
        <div key={t.d} style={{
          background: T.card, borderRadius: 14, padding: '14px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)', marginBottom: 8,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, fontFamily: T.serif }}>{t.d}</p>
            <p style={{ fontSize: 11, color: T.txS, marginTop: 2 }}>{t.date}</p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 10, background: T.acS, color: T.ac }}>{t.dd}</span>
        </div>
      ))}
    </Frame>
  );
}

Object.assign(window, { FormsA, FormsB });
