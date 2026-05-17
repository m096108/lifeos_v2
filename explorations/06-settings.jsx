/* global React, Card, Chip, Check, Btn, SecLabel, DueBadge, Frame, PageTitle */
// SECTION 6 — Settings + gender fix
// Current bug: PFT scoring is hardcoded female. Need a real settings screen.

const T = window.LOS.T;
const PC = window.LOS.PC;

// ── Settings: Profile + fitness preferences ────────────────────────
function SettingsA() {
  return (
    <Frame navActive="more" scroll>
      <h1 style={{ fontSize: 28, fontWeight: 400, fontFamily: T.serif, marginBottom: 16, marginTop: 4 }}>Settings</h1>

      {/* Profile card */}
      <div style={{
        background: T.card, borderRadius: 16, padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)', marginBottom: 18
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28, background: T.ac,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 22, fontFamily: T.serif, fontWeight: 700
          }}>R</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: T.tx }}>You</p>
            <p style={{ fontSize: 12, color: T.txS }}>Tap to edit name</p>
          </div>
        </div>
      </div>

      {/* Fitness profile */}
      <SecLabel>FITNESS PROFILE</SecLabel>
      <div style={{
        background: T.card, borderRadius: 16, padding: '4px 0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)', marginBottom: 18
      }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${T.bgS}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 14, fontWeight: 500 }}>Age</p>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.tx }}>22</span>
        </div>

        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${T.bgS}` }}>
          <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Sex</p>
          <p style={{ fontSize: 11, color: T.txS, marginBottom: 8 }}>Used for PFT/CFT scoring standards</p>
          <div style={{ display: 'flex', gap: 6, padding: 3, background: T.bgS, borderRadius: 10 }}>
            {['Female', 'Male'].map((g, i) => (
              <button key={g} style={{
                flex: 1, fontSize: 13, fontWeight: 700, padding: '8px',
                border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
                background: i === 0 ? T.card : 'transparent',
                color: i === 0 ? T.ac : T.txM,
                boxShadow: i === 0 ? '0 1px 3px rgba(0,0,0,0.07)' : 'none'
              }}>{g}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${T.bgS}` }}>
          <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Plank vs Crunches</p>
          <p style={{ fontSize: 11, color: T.txS, marginBottom: 8 }}>Choose your PFT abdominal event</p>
          <div style={{ display: 'flex', gap: 6, padding: 3, background: T.bgS, borderRadius: 10 }}>
            {['Plank', 'Crunches'].map((g, i) => (
              <button key={g} style={{
                flex: 1, fontSize: 13, fontWeight: 700, padding: '8px',
                border: 'none', borderRadius: 8, fontFamily: 'inherit',
                background: i === 0 ? T.card : 'transparent',
                color: i === 0 ? T.ac : T.txM,
                boxShadow: i === 0 ? '0 1px 3px rgba(0,0,0,0.07)' : 'none'
              }}>{g}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 14, fontWeight: 500 }}>PFT/CFT test dates</p>
          <span style={{ fontSize: 13, color: T.txS }}>Jun 15 / Oct 15 ›</span>
        </div>
      </div>

      {/* Data */}
      <SecLabel>DATA</SecLabel>
      <div style={{
        background: T.card, borderRadius: 16, padding: '4px 0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)', marginBottom: 18
      }}>
        {[
          ['Export all data', 'Download a JSON backup'],
          ['Import from backup', null],
          ['Reset everything', null, 'danger'],
        ].map(([l, sub, kind], i, arr) => (
          <div key={l} style={{
            padding: '12px 16px',
            borderBottom: i < arr.length - 1 ? `1px solid ${T.bgS}` : 'none'
          }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: kind === 'danger' ? T.r : T.tx }}>{l}</p>
            {sub && <p style={{ fontSize: 11, color: T.txS, marginTop: 2 }}>{sub}</p>}
          </div>
        ))}
      </div>

      <p style={{ fontSize: 10, color: T.txS, textAlign: 'center', marginTop: 8 }}>LifeOS · v1.1</p>
    </Frame>
  );
}

Object.assign(window, { SettingsA });
