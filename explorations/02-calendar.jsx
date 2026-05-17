/* global React, Card, Chip, Check, Btn, SecLabel, DueBadge, Frame, PageTitle, Note */
// SECTION 2 — Calendar replacement
// Goal: today's Calendar is a shell. Make it real or remove it.

const T = window.LOS.T;
const PC = window.LOS.PC;

// ── Calendar A: Agenda timeline ────────────────────────────────────
// Replace the month grid with a chronological feed that unifies trips,
// due tasks, project deadlines, and PFT/CFT. This is what people actually
// want when they tap "Calendar" — what's coming up?
function CalendarA() {
  const days = [
    { label: 'TODAY · WED MAY 13', items: [
      { kind: 'task', title: 'Review Q3 budget proposal', meta: 'work · Critical', color: T.r },
      { kind: 'task', title: 'Call Mom back', meta: 'home', color: T.w },
    ]},
    { label: 'TOMORROW · THU MAY 14', items: [
      { kind: 'task', title: 'Pick up dry cleaning', meta: 'out', color: T.w },
    ]},
    { label: 'NEXT WEEK', items: [
      { kind: 'return', title: 'Return blue blazer to Zara', meta: 'May 20', color: T.r },
    ]},
    { kind: 'big', label: 'JUN 10 — TRIP STARTS', items: [
      { kind: 'trip', title: 'New York City', meta: 'Jun 10 – Jun 14 · 5 days', color: T.ac },
    ]},
    { label: 'JUN 15', items: [
      { kind: 'event', title: 'PFT Test', meta: 'Semi-annual fitness test', color: T.ac },
    ]},
  ];
  return (
    <Frame navActive="more" scroll>
      <h1 style={{ fontSize: 28, fontWeight: 400, fontFamily: T.serif, marginBottom: 16, marginTop: 4 }}>Upcoming</h1>

      <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
        {['All', 'Tasks', 'Trips', 'Tests'].map((f, i) => (
          <span key={f} style={{
            fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 10,
            background: i === 0 ? T.tx : T.bgS, color: i === 0 ? '#fff' : T.txM
          }}>{f}</span>
        ))}
      </div>

      {days.map((d, i) => (
        <div key={i} style={{ marginBottom: 18 }}>
          <p style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
            color: i === 0 ? T.ac : T.txS, marginBottom: 8
          }}>{d.label}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.items.map((it, j) => (
              <div key={j} style={{
                background: T.card, borderRadius: 12, padding: '12px 14px',
                borderLeft: `3px solid ${it.color}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex', alignItems: 'center', gap: 10
              }}>
                <span style={{ fontSize: 14, opacity: 0.7 }}>
                  {it.kind === 'task' ? '✓' : it.kind === 'trip' ? '✈' : it.kind === 'return' ? '↩' : '◉'}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{it.title}</p>
                  <p style={{ fontSize: 11, color: T.txS, marginTop: 2 }}>{it.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Frame>
  );
}

// ── Calendar B: Functional month grid with data ────────────────────
// Keep the grid because it's spatially useful for picking dates, but
// populate every day with dots representing tasks/trips. Tap a date to
// see a day sheet at the bottom. NO empty-promise sync buttons.
function CalendarB() {
  // Days 1-31, with markers for a few
  const markers = {
    3: ['t'], 5: ['t', 't'], 7: ['t'], 10: ['t'], 13: ['t', 'h'], 14: ['t'],
    20: ['r'], 22: ['t'], 27: ['t', 't'],
  };
  const COLORS = { t: T.ac, h: T.r, r: T.w, e: T.g };
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffset = 3; // May 1 is Thursday → 3 empty before
  const todayD = 13;

  return (
    <Frame navActive="more" scroll>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, marginTop: 4 }}>
        <span style={{ background: T.bgS, borderRadius: 10, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>‹</span>
        <h1 style={{ fontSize: 22, fontWeight: 400, fontFamily: T.serif }}>May 2026</h1>
        <span style={{ background: T.bgS, borderRadius: 10, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>›</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3, marginBottom: 4 }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: T.txS, padding: '4px 0' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3, marginBottom: 16 }}>
        {Array(startOffset).fill(null).map((_, i) => <div key={`e${i}`} />)}
        {days.map(d => {
          const isToday = d === todayD;
          const m = markers[d];
          return (
            <div key={d} style={{
              aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              borderRadius: 10, background: isToday ? T.ac : T.card, fontSize: 13,
              fontWeight: isToday ? 700 : 500, color: isToday ? '#fff' : T.tx,
              boxShadow: isToday ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
              border: d === 13 ? `2px solid ${T.tx}` : 'none', position: 'relative'
            }}>
              <span>{d}</span>
              {m && (
                <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                  {m.slice(0, 3).map((k, i) => (
                    <div key={i} style={{ width: 4, height: 4, borderRadius: 99, background: isToday ? 'rgba(255,255,255,0.8)' : COLORS[k] }} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected day sheet */}
      <div style={{ background: T.card, borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ fontSize: 14, fontWeight: 700 }}>Today · May 13</p>
          <p style={{ fontSize: 11, color: T.txS, fontWeight: 600 }}>2 items</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: 99, background: T.ac }} />
            <p style={{ fontSize: 13, fontWeight: 600 }}>Review Q3 budget proposal</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: 99, background: T.r }} />
            <p style={{ fontSize: 13, fontWeight: 600 }}>Call Mom back</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', gap: 12, fontSize: 11, color: T.txS }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 6, height: 6, borderRadius: 99, background: T.ac }} />Task</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 6, height: 6, borderRadius: 99, background: T.r }} />Urgent</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 6, height: 6, borderRadius: 99, background: T.w }} />Other</span>
      </div>
    </Frame>
  );
}

// ── Calendar C: Remove it, fold into Today + Tasks ──────────────────
// Most honest answer: Calendar wasn't pulling its weight. Remove the tab,
// gain a real Notes tab in its place, and let Today + Tasks own time.
function CalendarC() {
  return (
    <Frame navActive="more" scroll noNav={false}>
      <h1 style={{ fontSize: 24, fontWeight: 400, fontFamily: T.serif, marginBottom: 16, marginTop: 4 }}>More</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { icon: '◉', label: 'Fitness', active: false },
          { icon: '▤', label: 'Books', active: false },
          { icon: '✎', label: 'Notes', active: false, badge: 'NEW' },
          { icon: '⚙', label: 'Settings', active: false },
        ].map(n => (
          <div key={n.label} style={{
            display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderRadius: 14,
            background: T.card, boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}>
            <span style={{ fontSize: 18, width: 22, textAlign: 'center', color: T.txM }}>{n.icon}</span>
            <span style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{n.label}</span>
            {n.badge && <span style={{ fontSize: 9, fontWeight: 800, padding: '3px 7px', borderRadius: 6, background: T.acS, color: T.ac, letterSpacing: '0.08em' }}>{n.badge}</span>}
            <span style={{ color: T.txS, fontSize: 16 }}>›</span>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 24, padding: '16px', background: T.bgS, borderRadius: 14,
        border: `1px dashed ${T.border}`
      }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: T.txS, marginBottom: 6 }}>WHAT HAPPENED TO CALENDAR?</p>
        <p style={{ fontSize: 13, color: T.txM, lineHeight: 1.5 }}>
          Removed. The new <b style={{ color: T.tx }}>Today</b> screen shows your countdowns and what's due. Tasks have due dates and lists. That covers the calendar use case without the empty grid.
        </p>
      </div>

      <p style={{ fontSize: 10, color: T.txS, textAlign: 'center', marginTop: 18, fontStyle: 'italic' }}>
        (This caption is for the design canvas only — wouldn't ship.)
      </p>
    </Frame>
  );
}

Object.assign(window, { CalendarA, CalendarB, CalendarC });
