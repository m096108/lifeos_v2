/* ── TODAY VIEW VARIATIONS ─────────────────────────────────── */

/* A · Direct — original Today layout, but tasks are completable inline,
   trip countdown added, swipe hint, FAB for quick capture. */
function TodayA(){
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <PageTitle sub="Wednesday, May 13">Good afternoon</PageTitle>

      {/* countdown row — fitness AND next trip */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        <div style={{background:T.ac,borderRadius:18,padding:'18px 16px'}}>
          <p style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.6)',textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:6}}>PFT TEST</p>
          <p style={{fontSize:38,fontWeight:700,color:'#fff',fontFamily:T.serif,lineHeight:1}}>33</p>
          <p style={{fontSize:11,color:'rgba(255,255,255,0.7)',marginTop:4,fontWeight:500}}>days to go</p>
        </div>
        <div style={{background:T.tx,borderRadius:18,padding:'18px 16px'}}>
          <p style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.55)',textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:6}}>Next Trip · NYC</p>
          <p style={{fontSize:38,fontWeight:700,color:'#fff',fontFamily:T.serif,lineHeight:1}}>28</p>
          <p style={{fontSize:11,color:'rgba(255,255,255,0.6)',marginTop:4,fontWeight:500}}>days · Jun 10</p>
        </div>
      </div>

      {/* fitness streak strip */}
      <Card style={{padding:'14px 16px'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:38,height:38,borderRadius:10,background:'#FFF7ED',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🔥</div>
          <div style={{flex:1}}>
            <p style={{fontSize:14,fontWeight:600,color:T.tx}}>4-day streak · log today's workout</p>
            <p style={{fontSize:12,color:T.txS,marginTop:2}}>12 workouts this month</p>
          </div>
          <span style={{fontSize:18,color:T.txS}}>›</span>
        </div>
      </Card>

      {/* Today's tasks — INLINE COMPLETABLE */}
      <div>
        <SecLabel right="All →">Today's Focus · 3</SecLabel>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[
            {t:'Review Q3 budget proposal',ctx:'work',p:1,due:'2d overdue',c:T.r},
            {t:'Call Mom back',ctx:'home',p:2,due:'Today',c:T.w},
            {t:'Pick up dry cleaning',ctx:'out',p:3,due:null},
          ].map((it,i)=><div key={i} style={{
            background:T.card,borderRadius:14,padding:'12px 14px',
            borderLeft:`3px solid ${PC[it.p]}`,
            boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
            display:'flex',alignItems:'flex-start',gap:12
          }}>
            <div style={{paddingTop:1}}><Check on={false}/></div>
            <div style={{flex:1,minWidth:0}}>
              <p style={{fontSize:14,fontWeight:600,color:T.tx}}>{it.t}</p>
              <div style={{display:'flex',gap:6,marginTop:6,alignItems:'center'}}>
                <Chip label={it.ctx}/>
                {it.due&&<span style={{fontSize:11,fontWeight:700,padding:'2px 7px',borderRadius:6,color:it.c,background:it.c===T.r?T.rS:T.wS}}>{it.due}</span>}
              </div>
            </div>
          </div>)}
        </div>
        <p style={{fontSize:11,color:T.txS,textAlign:'center',marginTop:10}}>← swipe to complete · tap to edit</p>
      </div>

      {/* return reminder */}
      <div style={{background:T.rS,borderRadius:14,padding:'12px 16px',borderLeft:`3px solid ${T.r}`,display:'flex',alignItems:'center',gap:12}}>
        <span style={{fontSize:18}}>⚠️</span>
        <div><p style={{fontSize:13,fontWeight:700,color:'#991B1B'}}>Return: Blue blazer – Zara</p><p style={{fontSize:12,color:'#B91C1C',marginTop:2}}>3d left</p></div>
      </div>
    </Screen>
    <FAB/>
    <BottomNav active="today"/>
  </Phone>;
}

/* B · Focus — single hero "next action" card, then collapsed stats.
   Inverts hierarchy: one thing to do RIGHT NOW. */
function TodayB(){
  return <Phone bg={T.bg}>
    <StatusBar/>
    <Screen scroll>
      <PageTitle sub="Wed · May 13 · 2:14 PM">Good afternoon</PageTitle>

      {/* HERO: the next thing */}
      <div style={{
        background:'linear-gradient(135deg,#4458E0 0%, #6B7BE8 100%)',
        borderRadius:24, padding:'24px 22px', color:'#fff', position:'relative'
      }}>
        <p style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.65)',textTransform:'uppercase',letterSpacing:'0.14em',marginBottom:14}}>Up Next · Work</p>
        <p style={{fontSize:24,fontWeight:400,fontFamily:T.serif,lineHeight:1.2,marginBottom:18,letterSpacing:'-0.01em'}}>Review the Q3 budget proposal</p>
        <div style={{display:'flex',gap:8,marginBottom:18}}>
          <span style={{fontSize:11,fontWeight:700,padding:'4px 9px',borderRadius:7,background:'rgba(255,255,255,0.18)',color:'#fff'}}>2d overdue</span>
          <span style={{fontSize:11,fontWeight:700,padding:'4px 9px',borderRadius:7,background:'rgba(255,255,255,0.18)',color:'#fff'}}>Critical</span>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button style={{flex:1,padding:'12px',borderRadius:12,background:'#fff',color:T.ac,border:'none',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'inherit'}}>✓ Mark done</button>
          <button style={{padding:'12px 18px',borderRadius:12,background:'rgba(255,255,255,0.18)',color:'#fff',border:'none',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'inherit'}}>Snooze</button>
        </div>
      </div>

      {/* up next preview - 2 small */}
      <div>
        <SecLabel right="2 more →">Then</SecLabel>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {[
            {t:'Call Mom back',ctx:'home',p:2},
            {t:'Pick up dry cleaning',ctx:'out',p:3},
          ].map((it,i)=><div key={i} style={{
            display:'flex',alignItems:'center',gap:10,padding:'10px 14px',
            background:T.card,borderRadius:12,boxShadow:'0 1px 3px rgba(0,0,0,0.04)'
          }}>
            <PriDot p={it.p}/>
            <p style={{flex:1,fontSize:14,fontWeight:500,color:T.tx}}>{it.t}</p>
            <Chip label={it.ctx}/>
          </div>)}
        </div>
      </div>

      {/* tight stat row */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
        {[
          {n:'33d',l:'to PFT',bg:T.acS,c:T.ac},
          {n:'28d',l:'to NYC',bg:T.bgS,c:T.tx},
          {n:'🔥4',l:'streak',bg:'#FFF7ED',c:'#EA580C'},
        ].map((s,i)=><div key={i} style={{background:s.bg,borderRadius:14,padding:'12px',textAlign:'center'}}>
          <p style={{fontSize:18,fontWeight:700,fontFamily:T.serif,color:s.c,lineHeight:1}}>{s.n}</p>
          <p style={{fontSize:10,fontWeight:700,color:T.txS,marginTop:4,textTransform:'uppercase',letterSpacing:'0.08em'}}>{s.l}</p>
        </div>)}
      </div>
    </Screen>
    <FAB/>
    <BottomNav active="today"/>
  </Phone>;
}

/* C · Agenda — chronological timeline of today: tasks, workout, returns,
   merged into a single time-ordered list. Closest to "Day One" / Sunsama. */
function TodayC(){
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <PageTitle sub="Wednesday · May 13">Today</PageTitle>

      {/* day capsule summary */}
      <div style={{display:'flex',gap:10,padding:'4px 0'}}>
        <span style={{fontSize:12,fontWeight:700,color:T.tx}}>3 tasks</span>
        <span style={{fontSize:12,color:T.txS}}>·</span>
        <span style={{fontSize:12,fontWeight:700,color:T.tx}}>1 workout</span>
        <span style={{fontSize:12,color:T.txS}}>·</span>
        <span style={{fontSize:12,fontWeight:700,color:T.r}}>1 overdue</span>
      </div>

      {/* timeline */}
      <div style={{position:'relative',paddingLeft:0}}>
        {[
          {time:'NOW',type:'task',title:'Review Q3 budget proposal',meta:'work · 2d overdue',p:1,overdue:true},
          {time:'2 PM',type:'task',title:'Call Mom back',meta:'home',p:2},
          {time:'5 PM',type:'workout',title:'Run · 30 min',meta:'tap to log',color:'#22C55E'},
          {time:'EVE',type:'task',title:'Pick up dry cleaning',meta:'out',p:3},
          {time:'',type:'reminder',title:'Return: Blue blazer – Zara',meta:'3 days left',color:T.r},
        ].map((it,i)=><div key={i} style={{display:'flex',gap:12,marginBottom:10,position:'relative'}}>
          <div style={{width:44,paddingTop:14,flexShrink:0}}>
            <span style={{fontSize:10,fontWeight:800,color:T.txS,letterSpacing:'0.08em'}}>{it.time}</span>
          </div>
          <div style={{flex:1,background:T.card,borderRadius:14,padding:'12px 14px',
            borderLeft:`3px solid ${it.type==='workout'?it.color:it.type==='reminder'?it.color:PC[it.p]}`,
            boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
            display:'flex',alignItems:'center',gap:12
          }}>
            {it.type==='task'&&<Check on={false}/>}
            {it.type==='workout'&&<span style={{fontSize:18}}>💪</span>}
            {it.type==='reminder'&&<span style={{fontSize:16}}>⚠️</span>}
            <div style={{flex:1,minWidth:0}}>
              <p style={{fontSize:14,fontWeight:600,color:T.tx}}>{it.title}</p>
              <p style={{fontSize:12,color:it.overdue?T.r:T.txS,marginTop:2,fontWeight:it.overdue?700:400}}>{it.meta}</p>
            </div>
          </div>
        </div>)}
      </div>

      <button style={{
        background:'transparent',border:`1.5px dashed ${T.border}`,borderRadius:14,
        padding:'14px',fontSize:13,fontWeight:600,color:T.txM,cursor:'pointer',
        fontFamily:'inherit'
      }}>+ Add to today</button>
    </Screen>
    <FAB/>
    <BottomNav active="today"/>
  </Phone>;
}

Object.assign(window, {TodayA, TodayB, TodayC});
