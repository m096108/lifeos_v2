/* ── CALENDAR REPLACEMENT VARIATIONS ──────────────────────── */

/* A · Upcoming — chronological agenda list of EVERYTHING with a date:
   trips, due tasks, workouts (planned), returns. Replaces month grid. */
function CalA(){
  const days=[
    {label:'TODAY · May 13',items:[
      {t:'Call Mom back',type:'task',ctx:'home',p:2},
      {t:'Pick up dry cleaning',type:'task',ctx:'out',p:3},
    ]},
    {label:'Tomorrow · May 14',items:[
      {t:'Strength workout',type:'workout',color:'#8B5CF6'},
    ]},
    {label:'Fri · May 15',items:[
      {t:'Return Blue blazer – Zara',type:'return',ctx:'out',color:T.r},
    ]},
    {label:'Mon · May 18',items:[
      {t:'Submit Q3 budget',type:'task',ctx:'work',p:1},
    ]},
    {label:'Jun 10 – 14',items:[
      {t:'✈ Trip to New York City',type:'trip'},
    ]},
    {label:'Jun 15',items:[
      {t:'PFT Test',type:'milestone'},
    ]},
  ];
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <PageTitle sub="Next 30 days">Upcoming</PageTitle>

      <div style={{display:'flex',gap:6,marginBottom:4}}>
        {['All','Tasks','Trips','Fitness'].map((f,i)=><button key={i} style={{
          fontSize:12,fontWeight:700,padding:'7px 13px',borderRadius:10,border:'none',
          background:i===0?T.tx:T.bgS,color:i===0?'#fff':T.txM,cursor:'pointer',fontFamily:'inherit'
        }}>{f}</button>)}
      </div>

      {days.map((d,i)=><div key={i}>
        <p style={{fontSize:10,fontWeight:800,color:T.txS,letterSpacing:'0.12em',marginBottom:8,marginTop:i===0?0:6}}>{d.label}</p>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {d.items.map((it,j)=><div key={j} style={{
            background:T.card,borderRadius:12,padding:'11px 14px',
            boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
            display:'flex',alignItems:'center',gap:10,
            borderLeft:it.type==='task'?`3px solid ${PC[it.p]}`:
                       it.type==='return'?`3px solid ${it.color}`:
                       it.type==='workout'?`3px solid ${it.color}`:
                       it.type==='trip'?`3px solid ${T.ac}`:
                       it.type==='milestone'?`3px solid ${T.tx}`:'none',
          }}>
            {it.type==='task'&&<Check on={false}/>}
            {it.type==='workout'&&<span style={{fontSize:16}}>💪</span>}
            {it.type==='return'&&<span style={{fontSize:16}}>⚠️</span>}
            {it.type==='trip'&&<span style={{fontSize:16}}>✈</span>}
            {it.type==='milestone'&&<span style={{fontSize:16}}>🎯</span>}
            <p style={{flex:1,fontSize:14,fontWeight:600,color:T.tx}}>{it.t}</p>
            {it.ctx&&<Chip label={it.ctx}/>}
          </div>)}
        </div>
      </div>)}
    </Screen>
    <FAB/>
    <BottomNav active="more" tabs={[
      {id:'today',label:'Today',icon:'⊙'},
      {id:'tasks',label:'Tasks',icon:'✓'},
      {id:'upcoming',label:'Upcoming',icon:'◷'},
      {id:'projects',label:'Projects',icon:'◫'},
      {id:'more',label:'More',icon:'···'},
    ]}/>
  </Phone>;
}

/* B · Live Month — keep the month grid but actually populate it with dots
   for events, tap a day → see what's on it. */
function CalB(){
  const startDay=3; // May 1 is Thursday → Mon-start grid offset
  const daysInMonth=31;
  const today=13;
  // Sparse event map (1-indexed day → array of colored dots)
  const events={
    1:[T.ac],
    3:['#22C55E'],
    5:['#8B5CF6'],
    13:[T.r,T.w,T.ac], // today: overdue, due, workout
    14:['#8B5CF6'],
    15:[T.r],
    18:[T.r],
    20:['#22C55E'],
    22:[T.ac],
    25:['#8B5CF6'],
    27:[T.w],
    29:['#22C55E'],
  };
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <PageTitle>Calendar</PageTitle>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
        <button style={{background:T.bgS,border:'none',borderRadius:10,width:36,height:36,cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>‹</button>
        <p style={{fontSize:16,fontWeight:700,fontFamily:T.serif}}>May 2026</p>
        <button style={{background:T.bgS,border:'none',borderRadius:10,width:36,height:36,cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>›</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4,marginBottom:6}}>
        {['M','T','W','T','F','S','S'].map((d,i)=><div key={i} style={{textAlign:'center',fontSize:10,fontWeight:700,color:T.txS,padding:'4px 0'}}>{d}</div>)}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4}}>
        {Array(startDay).fill(null).map((_,i)=><div key={`e${i}`}/>)}
        {Array(daysInMonth).fill(null).map((_,i)=>{
          const d=i+1;const isT=d===today;const dots=events[d]||[];
          return <div key={d} style={{
            aspectRatio:'1',display:'flex',flexDirection:'column',alignItems:'center',
            justifyContent:'center',gap:3,borderRadius:10,
            background:isT?T.ac:T.card,
            fontSize:13,fontWeight:isT?700:500,color:isT?'#fff':T.tx,
            boxShadow:isT?'0 4px 12px rgba(68,88,224,0.3)':'0 1px 2px rgba(0,0,0,0.03)',
            position:'relative'
          }}>
            {d}
            {dots.length>0&&<div style={{display:'flex',gap:2,position:'absolute',bottom:4}}>
              {dots.slice(0,3).map((c,k)=><div key={k} style={{width:4,height:4,borderRadius:99,background:isT?'#fff':c}}/>)}
            </div>}
          </div>;
        })}
      </div>

      {/* selected day detail */}
      <div style={{marginTop:14}}>
        <SecLabel>Today · May 13</SecLabel>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {[
            {t:'Review Q3 budget proposal',sub:'work · 2d overdue',c:T.r},
            {t:'Call Mom back',sub:'home · due today',c:T.w},
            {t:'Run · 30 min',sub:'fitness',c:'#22C55E'},
          ].map((it,i)=><div key={i} style={{
            background:T.card,borderRadius:12,padding:'10px 14px',
            borderLeft:`3px solid ${it.c}`,
            boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
            display:'flex',alignItems:'center',gap:10
          }}>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:600,color:T.tx}}>{it.t}</p>
              <p style={{fontSize:11,color:T.txS,marginTop:2}}>{it.sub}</p>
            </div>
          </div>)}
        </div>
      </div>
    </Screen>
    <FAB/>
    <BottomNav active="more"/>
  </Phone>;
}

/* C · Removed — calendar nav slot is gone entirely. Replaced by a small
   "What's coming" strip on Today, expanding into the Upcoming view of A. */
function CalC(){
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <PageTitle sub="Wednesday · May 13">Good afternoon</PageTitle>

      <div style={{
        background:T.tx, borderRadius:18, padding:'18px 20px', color:'#fff',
        display:'flex',alignItems:'center',gap:14
      }}>
        <div style={{flex:1}}>
          <p style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.55)',textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:6}}>Coming up</p>
          <p style={{fontSize:18,fontWeight:600,fontFamily:T.serif,lineHeight:1.25}}>3 due this week · NYC in 28d</p>
        </div>
        <span style={{fontSize:20,color:'rgba(255,255,255,0.6)'}}>›</span>
      </div>

      {/* week timeline strip */}
      <div>
        <SecLabel right="See all →">This week</SecLabel>
        <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:4}}>
          {[
            {d:13,wd:'WED',today:true,dots:3},
            {d:14,wd:'THU',dots:1},
            {d:15,wd:'FRI',dots:1,urgent:true},
            {d:16,wd:'SAT',dots:0},
            {d:17,wd:'SUN',dots:0},
            {d:18,wd:'MON',dots:1,urgent:true},
            {d:19,wd:'TUE',dots:0},
          ].map((day,i)=><div key={i} style={{
            background:day.today?T.ac:T.card, borderRadius:14, padding:'10px 12px',
            flexShrink:0, textAlign:'center', minWidth:54,
            boxShadow:day.today?'0 4px 12px rgba(68,88,224,0.25)':'0 1px 3px rgba(0,0,0,0.04)'
          }}>
            <p style={{fontSize:9,fontWeight:800,color:day.today?'rgba(255,255,255,0.7)':T.txS,letterSpacing:'0.08em'}}>{day.wd}</p>
            <p style={{fontSize:18,fontWeight:700,fontFamily:T.serif,color:day.today?'#fff':T.tx,marginTop:2}}>{day.d}</p>
            <div style={{display:'flex',gap:2,justifyContent:'center',marginTop:6,height:5}}>
              {Array(day.dots).fill(0).map((_,k)=><div key={k} style={{width:4,height:4,borderRadius:99,background:day.today?'#fff':day.urgent?T.r:T.ac}}/>)}
            </div>
          </div>)}
        </div>
      </div>

      {/* the rest of Today */}
      <div>
        <SecLabel right="All →">Today's Focus</SecLabel>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[
            {t:'Review Q3 budget proposal',ctx:'work',p:1,due:'Overdue',c:T.r},
            {t:'Call Mom back',ctx:'home',p:2,due:'Today',c:T.w},
          ].map((it,i)=><div key={i} style={{
            background:T.card,borderRadius:14,padding:'12px 14px',
            borderLeft:`3px solid ${PC[it.p]}`,
            boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
            display:'flex',alignItems:'flex-start',gap:12
          }}>
            <Check on={false}/>
            <div style={{flex:1}}>
              <p style={{fontSize:14,fontWeight:600,color:T.tx}}>{it.t}</p>
              <div style={{display:'flex',gap:6,marginTop:6}}>
                <Chip label={it.ctx}/>
                <span style={{fontSize:11,fontWeight:700,padding:'2px 7px',borderRadius:6,color:it.c,background:it.c===T.r?T.rS:T.wS}}>{it.due}</span>
              </div>
            </div>
          </div>)}
        </div>
      </div>

      <p style={{fontSize:11,color:T.txS,textAlign:'center',padding:'8px 0'}}>The Calendar tab is gone.<br/>This strip replaces it.</p>
    </Screen>
    <FAB/>
    <BottomNav active="today"/>
  </Phone>;
}

Object.assign(window, {CalA, CalB, CalC});
