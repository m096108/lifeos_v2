// Today View
const { todayStr, daysUntil, fmtDate, taskSort, dueTag } = LOS_HELPERS;
const PFT_DATE = new Date('2026-06-15');
const CFT_DATE = new Date('2026-10-15');

function currentSeason() { return new Date().getMonth() < 6 ? 'pft' : 'cft'; }
function bracket(age) { if(age<=25)return 0;if(age<=30)return 1;if(age<=35)return 2;if(age<=40)return 3;if(age<=45)return 4;if(age<=50)return 5;return 6; }

function calcPFT(e, age) {
  const FP=[[1,11],[1,10],[1,9],[1,8],[1,7],[1,6],[1,5]];
  const FK=[[63,210],[63,205],[63,200],[63,195],[63,190],[63,185],[63,180]];
  const FR=[[1260,1860],[1320,1920],[1380,1980],[1440,2040],[1500,2100],[1560,2160],[1620,2220]];
  const b=bracket(age);
  const sPU=(r)=>{const[lo,hi]=FP[b];if(r<lo)return 0;if(r>=hi)return 100;return Math.round(40+((r-lo)/(hi-lo))*60);};
  const sPL=(s)=>{const[lo,hi]=FK[b];if(s<lo)return 0;if(s>=hi)return 100;return Math.round(40+((s-lo)/(hi-lo))*60);};
  const sRN=(s)=>{const[f,sl]=FR[b];if(s<=f)return 100;if(s>sl)return 0;return Math.round(40+((sl-s)/(sl-f))*60);};
  return sPU(e.pullups)+sPL(e.plank_s)+sRN(e.run_s);
}

function workoutStreak(workouts) {
  const s=[...workouts].sort((a,b)=>b.date.localeCompare(a.date));
  let c=0,p=null;
  for(const w of s){if(!p){c=1;p=w.date;continue;}if(Math.round((new Date(p)-new Date(w.date))/86400000)===1){c++;p=w.date;}else break;}
  return c;
}

window.currentSeason = currentSeason;
window.calcPFT = calcPFT;
window.workoutStreak = workoutStreak;

function TodayView({ state, go }) {
  const { tasks, workouts, pft, user, clothing, workoutCats } = state;
  const season = currentSeason();
  const testDate = season === 'pft' ? PFT_DATE : CFT_DATE;
  const days = daysUntil(testDate);
  const open = tasks.filter(t => t.status === 'todo').sort(taskSort);
  const focus = open.slice(0, 4);
  const todayW = workouts.find(w => w.date === todayStr());
  const streak = workoutStreak(workouts);
  const monthW = workouts.filter(w => { const d=new Date(w.date),n=new Date(); return d.getMonth()===n.getMonth()&&d.getFullYear()===n.getFullYear(); }).length;
  const latestPFT = pft[0];
  const pftScore = latestPFT ? calcPFT(latestPFT, user.age) : null;
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const urgentReturns = clothing.filter(c => c.type==='need_to_return' && !c.done && c.deadline && daysUntil(c.deadline)<=5 && daysUntil(c.deadline)>=0);
  const catName = id => workoutCats.find(c=>c.id===id)?.name || id;
  const catColor = id => workoutCats.find(c=>c.id===id)?.color || T.ac;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Greeting */}
      <div style={{ paddingTop:4 }}>
        <p style={{ fontSize:12, fontWeight:600, color:T.txS, letterSpacing:'0.04em', marginBottom:4 }}>
          {now.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}
        </p>
        <h1 style={{ fontSize:30, fontWeight:800, color:T.tx, letterSpacing:'-0.03em', fontFamily:"'DM Serif Display',serif", lineHeight:1.1 }}>{greeting}</h1>
      </div>

      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        <div onClick={() => go('fitness')} style={{ background:T.ac, borderRadius:16, padding:'16px', cursor:'pointer' }}>
          <p style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.65)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>{season.toUpperCase()} Countdown</p>
          <p style={{ fontSize:34, fontWeight:800, color:'#fff', fontFamily:"'DM Serif Display',serif", lineHeight:1 }}>{days}</p>
          <p style={{ fontSize:11, color:'rgba(255,255,255,0.7)', marginTop:4, fontWeight:600 }}>days to test</p>
          {pftScore && <p style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.85)', marginTop:8 }}>Last score: {pftScore}/300</p>}
        </div>
        <div onClick={() => go('fitness')} style={{ background: streak>=3 ? '#FFF7ED' : T.bgSoft, borderRadius:16, padding:'16px', cursor:'pointer' }}>
          <p style={{ fontSize:10, fontWeight:700, color: streak>=3?'#92400E':T.txS, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>
            {streak>=2 ? 'Streak' : 'This Month'}
          </p>
          <p style={{ fontSize:34, fontWeight:800, color: streak>=3?'#EA580C':T.tx, fontFamily:"'DM Serif Display',serif", lineHeight:1 }}>
            {streak>=2 ? streak : monthW}
          </p>
          <p style={{ fontSize:11, color: streak>=3?'#B45309':T.txM, marginTop:4, fontWeight:600 }}>
            {streak>=2 ? `day${streak>1?'s':''} 🔥` : 'workouts'}
          </p>
        </div>
      </div>

      {/* Urgent returns */}
      {urgentReturns.map(item => (
        <div key={item.id} onClick={() => go('clothing')} style={{ background:T.dangerSoft, borderRadius:14, padding:'12px 14px', borderLeft:`3px solid ${T.danger}`, cursor:'pointer', display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:20 }}>⚠️</span>
          <div>
            <p style={{ fontSize:13, fontWeight:700, color:'#991B1B' }}>Return: {item.title}</p>
            <p style={{ fontSize:12, color:'#B91C1C' }}>{daysUntil(item.deadline)}d left · {fmtDate(item.deadline)}</p>
          </div>
        </div>
      ))}

      {/* Today's workout */}
      <Card onClick={() => go('fitness')} style={{ padding:'14px 16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:10, background: todayW ? catColor(todayW.type)+'18' : T.bgSoft, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ fontSize:18 }}>🏃</span>
          </div>
          <div style={{ flex:1 }}>
            {todayW
              ? <><p style={{ fontSize:14, fontWeight:700, color:T.tx }}>{catName(todayW.type)} — {todayW.duration_minutes} min ✓</p><p style={{ fontSize:12, color:T.txS, marginTop:2 }}>{monthW} workouts this month</p></>
              : <><p style={{ fontSize:14, fontWeight:600, color:T.txM }}>No workout logged today</p><p style={{ fontSize:12, color:T.txS, marginTop:2 }}>{monthW} this month</p></>
            }
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.txS} strokeWidth="2"><polyline points="9,18 15,12 9,6"/></svg>
        </div>
      </Card>

      {/* Focus tasks */}
      <div>
        <SectionLabel action="All tasks →" onAction={() => go('tasks')}>Today's Focus</SectionLabel>
        {focus.length === 0
          ? <p style={{ fontSize:14, color:T.txS, textAlign:'center', padding:'32px 0' }}>All clear — nothing urgent ✓</p>
          : <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {focus.map(t => {
              const du = dueTag(t);
              return (
                <div key={t.id} onClick={() => go('tasks')} style={{ background:T.card, borderRadius:14, padding:'12px 14px', borderLeft:`3px solid ${PCOL[t.priority||2]}`, boxShadow:'0 1px 3px rgba(0,0,0,0.04)', cursor:'pointer' }}>
                  <p style={{ fontSize:14, fontWeight:600, color:T.tx }}>{t.title}</p>
                  <div style={{ display:'flex', gap:6, marginTop:6, alignItems:'center' }}>
                    <Chip label={t.context} cat={t.context} />
                    {du && <span style={{ fontSize:11, fontWeight:700, padding:'2px 7px', borderRadius:6, color:du.color, background:du.bg }}>{du.text}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>
    </div>
  );
}

window.TodayView = TodayView;
