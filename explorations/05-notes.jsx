/* global React, Card, Chip, Check, Btn, SecLabel, DueBadge, Frame, PageTitle */
// SECTION 5 — Notes / Journal

const T = window.LOS.T;
const PC = window.LOS.PC;

// ── Notes A: Daily journal ─────────────────────────────────────────
// One entry per day, dated. Big writing surface. Optional mood + linked
// items show what you did that day pulled from other parts of the app.
// Reflective use; pairs well with the "Life OS" framing.
function NotesA() {
  const days = [
    { d: 'WED, MAY 13', mood: '😊', preview: 'Big morning — finally pushed the budget through. NYC trip plan-ning is starting to feel real.', tags: 'Budget review · Mom call', current: true },
    { d: 'TUE, MAY 12', mood: '🙂', preview: 'Slow start. Got the run in though, and that felt good.', tags: '40min run · 2 tasks done' },
    { d: 'MON, MAY 11', mood: '😐', preview: 'Felt off all day. Saved drafting the proposal for tomorrow.', tags: '0 tasks done' },
    { d: 'SUN, MAY 10', mood: '😄', preview: 'Brunch with Sarah. Best part of the week so far.', tags: 'Rest day' },
  ];
  return (
    <Frame navActive="more" scroll>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, marginTop: 4 }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, fontFamily: T.serif }}>Journal</h1>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: T.ac, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
        }}>+</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <div style={{ flex: 1, background: T.bgS, borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
          <p style={{ fontSize: 22, fontFamily: T.serif, fontWeight: 700 }}>12</p>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: T.txS }}>DAY STREAK</p>
        </div>
        <div style={{ flex: 1, background: T.bgS, borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
          <p style={{ fontSize: 22, fontFamily: T.serif, fontWeight: 700 }}>84</p>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: T.txS }}>THIS YEAR</p>
        </div>
        <div style={{ flex: 1, background: T.bgS, borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
          <p style={{ fontSize: 22, fontFamily: T.serif, fontWeight: 700 }}>😊</p>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: T.txS }}>AVG MOOD</p>
        </div>
      </div>

      {days.map((day, i) => (
        <div key={i} style={{
          background: day.current ? T.card : 'transparent', borderRadius: 14,
          padding: day.current ? '14px 16px' : '14px 0',
          marginBottom: 8, borderBottom: !day.current ? `1px solid ${T.bgS}` : undefined,
          boxShadow: day.current ? '0 1px 3px rgba(0,0,0,0.04)' : 'none',
          borderLeft: day.current ? `3px solid ${T.ac}` : undefined
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: day.current ? T.ac : T.txS }}>
              {day.d}{day.current ? ' · TODAY' : ''}
            </p>
            <span style={{ fontSize: 14 }}>{day.mood}</span>
          </div>
          <p style={{
            fontSize: day.current ? 14 : 13, color: T.tx,
            lineHeight: 1.5,
            fontFamily: day.current ? T.serif : undefined,
            fontWeight: day.current ? 400 : 500,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>{day.preview}</p>
          {day.tags && <p style={{ fontSize: 11, color: T.txS, marginTop: 6, fontStyle: 'italic' }}>{day.tags}</p>}
        </div>
      ))}
    </Frame>
  );
}

// ── Notes B: Freeform notes with tags ─────────────────────────────
// Apple Notes-style: a list of separately-titled notes you can pin, tag,
// and link to projects/trips/books. More flexible than a journal — but
// less likely to be opened daily.
function NotesB() {
  const notes = [
    { title: 'Kitchen reno — contractor research', tag: 'Home Renovation', updated: '2h ago', preview: 'Three quotes: Vargas $24k, Reyes $19k…', pinned: true },
    { title: 'Things to remember for Tokyo', tag: 'Tokyo trip', updated: 'Yesterday', preview: 'JR pass, pocket wifi, the hotel near Shinjuku…' },
    { title: 'Book ideas after Atomic Habits', tag: 'Reading', updated: '3d ago', preview: 'Look up Cal Newport, Anders Ericsson on deliberate…' },
    { title: '1:1 talking points', tag: 'Work', updated: 'Apr 22', preview: 'Promo timeline, scope of next quarter…' },
    { title: 'Therapy thoughts', tag: null, updated: 'Apr 19', preview: 'Boundaries with mom — practice saying no without…' },
  ];
  return (
    <Frame navActive="more" scroll>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, marginTop: 4 }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, fontFamily: T.serif }}>Notes</h1>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: T.ac, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
        }}>+</div>
      </div>

      <div style={{
        background: T.card, borderRadius: 12, padding: '8px 12px', marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 10, border: `2px solid ${T.bgS}`
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke={T.txS} strokeWidth="1.8" />
          <path d="M11 11L14 14" stroke={T.txS} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 13, color: T.txS, flex: 1 }}>Search notes…</span>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {[
          ['All', 12, true],
          ['Pinned', 2, false],
          ['Home Renovation', 4, false],
          ['Work', 3, false],
        ].map(([l, c, a], i) => (
          <span key={l} style={{
            fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 8,
            background: a ? T.ac : T.bgS, color: a ? '#fff' : T.txM,
            display: 'inline-flex', alignItems: 'center', gap: 4
          }}>{l} <span style={{ opacity: 0.7 }}>{c}</span></span>
        ))}
      </div>

      {notes.map((n, i) => (
        <div key={i} style={{
          background: T.card, borderRadius: 14, padding: '12px 14px', marginBottom: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            {n.pinned && <span style={{ fontSize: 11, color: T.ac, marginTop: 3 }}>📌</span>}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: T.tx, marginBottom: 2 }}>{n.title}</p>
              <p style={{ fontSize: 12, color: T.txM, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{n.preview}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' }}>
                {n.tag && <Chip label={n.tag.toLowerCase().split(' ')[0]} />}
                <span style={{ fontSize: 10, color: T.txS }}>{n.updated}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Frame>
  );
}

Object.assign(window, { NotesA, NotesB });
