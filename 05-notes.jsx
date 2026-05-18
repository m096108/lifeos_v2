/* global React, Card, Chip, Check, Btn, SecLabel, DueBadge, Frame, PageTitle */
// SECTION 3 — Global search

const T = window.LOS.T;
const PC = window.LOS.PC;

// ── Search A: Persistent search bar at top of every screen ──────────
// Always-visible search at the top of each screen, scoped to the section
// you're on but with a chip to expand to "everything". Familiar (Notes,
// Mail, etc.) and low-friction.
function SearchA() {
  return (
    <Frame navActive="tasks" scroll>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, marginTop: 4 }}>
        <h1 style={{ fontSize: 26, fontWeight: 400, fontFamily: T.serif, flex: 1 }}>Tasks</h1>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: T.bgS,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: T.tx
        }}>+</div>
      </div>

      <div style={{
        background: T.card, borderRadius: 12, padding: '10px 12px', marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        border: `2px solid ${T.bgS}`
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke={T.txS} strokeWidth="1.8" />
          <path d="M11 11L14 14" stroke={T.txS} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 14, color: T.txS, flex: 1 }}>Search tasks…</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.ac, padding: '3px 7px', background: T.acS, borderRadius: 6 }}>EVERYTHING</span>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {['All 12', 'work 5', 'home 3', 'out 2'].map((p, i) => (
          <span key={p} style={{
            fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 10,
            background: i === 0 ? T.ac : T.bgS, color: i === 0 ? '#fff' : T.txM
          }}>{p}</span>
        ))}
      </div>

      {[
        { title: 'Review Q3 budget proposal', ctx: 'work', p: 1, due: 0 },
        { title: 'Call Mom back', ctx: 'home', p: 2, due: 0 },
        { title: 'Schedule team retro', ctx: 'work', p: 2, due: 2 },
      ].map((t, i) => (
        <div key={i} style={{
          background: T.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8,
          borderLeft: `3px solid ${PC[t.p]}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'flex-start', gap: 12
        }}>
          <Check on={false} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600 }}>{t.title}</p>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <Chip label={t.ctx} />
              <DueBadge days={t.due} />
            </div>
          </div>
        </div>
      ))}
    </Frame>
  );
}

// ── Search B: Command palette overlay ──────────────────────────────
// Tap a search icon anywhere (lives in the bottom nav, replacing one slot
// or as a center FAB) → full-screen palette. Searches across everything
// and shows action results: "Add task: 'Q3 budget'", jump to project, etc.
// Power-user pattern (think Linear, Raycast).
function SearchB() {
  return (
    <div style={{
      width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', system-ui, sans-serif", color: T.tx, position: 'relative', overflow: 'hidden'
    }}>
      {/* Dimmed background hint */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,20,25,0.5)', pointerEvents: 'none' }} />

      <div style={{
        margin: '40px 16px 0', background: T.card, borderRadius: 18, padding: '0',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)', overflow: 'hidden',
        position: 'relative', zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: `1px solid ${T.bgS}` }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke={T.txS} strokeWidth="1.8" />
            <path d="M11 11L14 14" stroke={T.txS} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span style={{ flex: 1, fontSize: 16, color: T.tx, fontWeight: 500 }}>budget<span style={{ background: T.tx, color: 'transparent', width: 1, marginLeft: 1, animation: 'blink 1s infinite' }}>|</span></span>
          <kbd style={{ fontSize: 10, fontWeight: 700, color: T.txS, padding: '3px 6px', background: T.bgS, borderRadius: 4 }}>ESC</kbd>
        </div>

        <div style={{ padding: '8px 0' }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: T.txS, padding: '8px 16px 6px' }}>ACTIONS</p>
          <div style={{ padding: '10px 16px', background: T.acS, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 14, color: T.ac }}>+</span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>Add task <span style={{ color: T.txM, fontWeight: 500 }}>"budget"</span></span>
            <kbd style={{ fontSize: 9, fontWeight: 700, color: T.ac, padding: '2px 5px', background: '#fff', borderRadius: 4 }}>⏎</kbd>
          </div>

          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: T.txS, padding: '12px 16px 6px' }}>TASKS · 2</p>
          {[
            { title: 'Review Q3 budget proposal', meta: 'work · Today', p: 1 },
            { title: 'Forecast 2027 budget draft', meta: 'work · May 22', p: 2 },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px' }}>
              <div style={{ width: 4, height: 28, borderRadius: 99, background: PC[t.p] }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{t.title}</p>
                <p style={{ fontSize: 11, color: T.txS }}>{t.meta}</p>
              </div>
            </div>
          ))}

          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: T.txS, padding: '12px 16px 6px' }}>PROJECTS · 1</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px' }}>
            <span style={{ fontSize: 14, color: T.txM }}>◫</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>Career Development</p>
              <p style={{ fontSize: 11, color: T.txS }}>"…leadership <b style={{ color: T.ac }}>budget</b> for course…"</p>
            </div>
          </div>

          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: T.txS, padding: '12px 16px 6px' }}>NOTES · 1</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px 14px' }}>
            <span style={{ fontSize: 14, color: T.txM }}>✎</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>Apr 22 journal</p>
              <p style={{ fontSize: 11, color: T.txS }}>"…thinking about <b style={{ color: T.ac }}>budget</b> tradeoffs…"</p>
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11, color: '#fff', textAlign: 'center', marginTop: 'auto', marginBottom: 18, opacity: 0.7, position: 'relative', zIndex: 1 }}>
        Trigger: long-press tab bar, or swipe down on any screen
      </p>
    </div>
  );
}

Object.assign(window, { SearchA, SearchB });
