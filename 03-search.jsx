/* global React, Card, Chip, Check, Btn, SecLabel, DueBadge, Greeting, StatTile, Frame, PageTitle, Note, T_LOS, PC_LOS */
// SECTION 1 — Today view fixes
// Goal: Today screen should let you ACT, not just read. Today should own the day.

const T = window.LOS.T;
const PC = window.LOS.PC;

// ── Today A: Inline checkboxes ────────────────────────────────────────
// Smallest-possible change. Tasks on Today get a checkbox you can tap to
// complete in-place. Keeps existing layout — no learning curve.
function TodayA() {
  return (
    <Frame navActive="today" scroll>
      <Greeting />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <StatTile kicker="PFT TEST" value="33" label="days to go" />
        <StatTile bg="#FFF7ED" kicker="STREAK" value="5🔥" label="days"
          kickerColor="#92400E" valueColor="#EA580C" labelColor="#B45309" />
      </div>
      <Card style={{ padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: '#22C55E22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💪</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 600 }}>Run · 35min ✓</p>
          <p style={{ fontSize: 12, color: T.txS, marginTop: 2 }}>9 workouts this month</p>
        </div>
      </Card>
      <SecLabel action="All →">Today's Focus</SecLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { title: 'Review Q3 budget proposal', ctx: 'work', p: 1, due: 0 },
          { title: 'Call Mom back', ctx: 'home', p: 2, due: 0 },
          { title: 'Pick up dry cleaning', ctx: 'out', p: 3, due: null },
        ].map((t, i) => (
          <div key={i} style={{
            background: T.card, borderRadius: 14, padding: '12px 14px',
            borderLeft: `3px solid ${PC[t.p]}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'flex-start', gap: 12
          }}>
            <Check on={false} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{t.title}</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}>
                <Chip label={t.ctx} />
                <DueBadge days={t.due} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ── Today B: Quick capture + countdown row + swipe hint ──────────────
// Adds a sticky quick-capture input at the top, a horizontal countdown
// strip that includes trips, and shows a swipe-to-complete state for one
// task. Higher-impact change.
function TodayB() {
  return (
    <Frame navActive="today" scroll>
      <div style={{ marginBottom: 10 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: T.txS, letterSpacing: '0.04em', marginBottom: 4 }}>Wednesday, May 13</p>
        <h1 style={{ fontSize: 26, fontWeight: 400, fontFamily: T.serif, lineHeight: 1.1 }}>Good morning</h1>
      </div>

      {/* Quick capture */}
      <div style={{
        background: T.card, borderRadius: 14, padding: '10px 12px', marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        border: `2px solid ${T.bgS}`
      }}>
        <span style={{ fontSize: 18, color: T.txS }}>+</span>
        <span style={{ fontSize: 14, color: T.txS, flex: 1 }}>Add task, note, or book…</span>
        <kbd style={{ fontSize: 10, fontWeight: 700, color: T.txS, padding: '2px 6px', background: T.bgS, borderRadius: 4 }}>⏎</kbd>
      </div>

      {/* Horizontal countdown strip */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
        <div style={{ flex: '0 0 auto', background: T.ac, borderRadius: 14, padding: '10px 14px', minWidth: 110 }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.1em' }}>PFT</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: T.serif }}>33d</p>
        </div>
        <div style={{ flex: '0 0 auto', background: '#FFF7ED', borderRadius: 14, padding: '10px 14px', minWidth: 110 }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: '#92400E', letterSpacing: '0.1em' }}>STREAK</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#EA580C', fontFamily: T.serif }}>5🔥</p>
        </div>
        <div style={{ flex: '0 0 auto', background: T.bgS, borderRadius: 14, padding: '10px 14px', minWidth: 110 }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: T.txS, letterSpacing: '0.1em' }}>NYC TRIP</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: T.tx, fontFamily: T.serif }}>28d</p>
        </div>
        <div style={{ flex: '0 0 auto', background: T.bgS, borderRadius: 14, padding: '10px 14px', minWidth: 110 }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: T.txS, letterSpacing: '0.1em' }}>CANCUN</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: T.tx, fontFamily: T.serif }}>80d</p>
        </div>
      </div>

      <SecLabel action="All →">Today's Focus</SecLabel>

      {/* Swipe-revealed complete state on first card */}
      <div style={{ position: 'relative', marginBottom: 8, height: 70, overflow: 'hidden', borderRadius: 14 }}>
        <div style={{ position: 'absolute', inset: 0, background: T.g, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 22 }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6L6 11L15 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Complete
          </span>
        </div>
        <div style={{
          background: T.card, borderRadius: 14, padding: '12px 14px',
          borderLeft: `3px solid ${PC[1]}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          position: 'absolute', inset: 0, transform: 'translateX(-90px)',
        }}>
          <p style={{ fontSize: 14, fontWeight: 600 }}>Review Q3 budget proposal</p>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <Chip label="work" />
            <DueBadge days={0} />
          </div>
        </div>
      </div>

      {[
        { title: 'Call Mom back', ctx: 'home', p: 2, due: 0 },
        { title: 'Pick up dry cleaning', ctx: 'out', p: 3, due: null },
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
      <p style={{ fontSize: 10, color: T.txS, textAlign: 'center', marginTop: 8 }}>← Swipe to complete</p>
    </Frame>
  );
}

// ── Today C: "Right now" focus mode ─────────────────────────────────
// Throw out the multi-card layout entirely. One thing at a time: the next
// task is huge and front-and-center. Below it, a single "next up" peek and
// a stats footer. More opinionated.
function TodayC() {
  return (
    <Frame navActive="today" scroll>
      <div style={{ marginBottom: 8 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: T.txS, letterSpacing: '0.12em', textTransform: 'uppercase' }}>NOW · WED MAY 13 · 9:24 AM</p>
      </div>
      <p style={{ fontSize: 12, fontWeight: 700, color: T.r, marginBottom: 6, letterSpacing: '0.08em' }}>CRITICAL · DUE TODAY</p>
      <h1 style={{ fontSize: 30, fontWeight: 400, fontFamily: T.serif, lineHeight: 1.15, marginBottom: 14 }}>
        Review Q3 budget proposal
      </h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        <Chip label="work" />
        <span style={{ fontSize: 12, color: T.txS }}>15 min est.</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
        <Btn full v="primary" style={{ minHeight: 52 }}>
          <Check on color="#fff" size={18} /> Done
        </Btn>
        <Btn full v="soft" style={{ minHeight: 52 }}>Snooze →</Btn>
      </div>

      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 18, marginBottom: 14 }}>
        <SecLabel action="See 4 more →">UP NEXT</SecLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
          <Check on={false} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600 }}>Call Mom back</p>
            <Chip label="home" />
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14, display: 'flex', gap: 18 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: T.txS, letterSpacing: '0.12em' }}>STREAK</p>
          <p style={{ fontSize: 18, fontWeight: 700, fontFamily: T.serif, color: '#EA580C' }}>5🔥</p>
        </div>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: T.txS, letterSpacing: '0.12em' }}>PFT</p>
          <p style={{ fontSize: 18, fontWeight: 700, fontFamily: T.serif }}>33d</p>
        </div>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: T.txS, letterSpacing: '0.12em' }}>NYC</p>
          <p style={{ fontSize: 18, fontWeight: 700, fontFamily: T.serif }}>28d</p>
        </div>
      </div>
    </Frame>
  );
}

Object.assign(window, { TodayA, TodayB, TodayC });
