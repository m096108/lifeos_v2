/* ── SETTINGS / GENDER FIX ────────────────────────────────── */

/* A · Settings screen — gender, age, units all live in one place.
   Accessible from "More" or a profile chip on Today. */
function SettingsA(){
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button style={{background:T.bgS,border:'none',borderRadius:10,width:36,height:36,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>‹</button>
        <PageTitle>Settings</PageTitle>
      </div>

      <SecLabel>FITNESS</SecLabel>
      <Card style={{padding:'4px 16px'}}>
        <Setting label="Age" value="22"/>
        <Setting label="Gender" custom={<div style={{display:'flex',gap:6}}>
          {['Female','Male'].map((g,i)=><button key={g} style={{
            fontSize:13,fontWeight:700,padding:'6px 14px',borderRadius:9,border:'none',
            background:i===0?T.tx:T.bgS,color:i===0?'#fff':T.txM,cursor:'pointer',fontFamily:'inherit'
          }}>{g}</button>)}
        </div>}/>
        <Setting label="Units" custom={<div style={{display:'flex',gap:6}}>
          {['mi','km'].map((u,i)=><button key={u} style={{
            fontSize:13,fontWeight:700,padding:'6px 14px',borderRadius:9,border:'none',
            background:i===0?T.tx:T.bgS,color:i===0?'#fff':T.txM,cursor:'pointer',fontFamily:'inherit'
          }}>{u}</button>)}
        </div>} last/>
      </Card>

      <SecLabel>UPCOMING TESTS</SecLabel>
      <Card style={{padding:'4px 16px'}}>
        <Setting label="Next PFT" value="Jun 15, 2026" small/>
        <Setting label="Next CFT" value="Oct 15, 2026" small last/>
      </Card>

      <SecLabel>DATA</SecLabel>
      <Card style={{padding:'4px 16px'}}>
        <Setting label="Export to JSON" value="↓" small/>
        <Setting label="Import" value="↑" small/>
        <Setting label="Reset all data" value="" small last danger/>
      </Card>

      <p style={{fontSize:11,color:T.txS,textAlign:'center',padding:'12px 0'}}>LifeOS · v0.4 · made with care</p>
    </Screen>
    <BottomNav active="more"/>
  </Phone>;
}

function Setting({label, value, custom, last, danger, small}){
  return <div style={{
    display:'flex',alignItems:'center',justifyContent:'space-between',
    padding:`${small?12:14}px 0`,borderBottom:last?'none':`1px solid ${T.bgS}`
  }}>
    <span style={{fontSize:14,fontWeight:500,color:danger?T.r:T.tx}}>{label}</span>
    {custom||<span style={{fontSize:14,fontWeight:600,color:T.txS}}>{value}</span>}
  </div>;
}
window.Setting=Setting;

/* B · Inline on Fitness — gender + age live on the PFT/CFT card header.
   No separate screen needed. Score tables update live. */
function SettingsB(){
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <PageTitle>Fitness</PageTitle>

      <div style={{display:'flex',gap:3,padding:4,borderRadius:14,background:T.bgS}}>
        {['Workouts','PFT','CFT'].map((t,i)=><button key={t} style={{
          flex:1,fontSize:12,fontWeight:700,padding:'9px 4px',borderRadius:10,border:'none',
          cursor:'pointer',fontFamily:'inherit',
          background:i===1?T.card:'transparent',color:i===1?T.ac:T.txS,
          boxShadow:i===1?'0 2px 8px rgba(0,0,0,0.07)':'none'
        }}>{t}</button>)}
      </div>

      <Card style={{padding:16}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:14}}>
          <div>
            <p style={{fontSize:11,fontWeight:700,color:T.txS,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:4}}>PFT · Jan–Jun</p>
            <p style={{fontSize:13,color:T.txM}}>33 days to test · Jun 15</p>
          </div>
          <div style={{textAlign:'right'}}>
            <p style={{fontSize:36,fontWeight:700,fontFamily:T.serif,color:T.ac,lineHeight:1}}>240</p>
            <p style={{fontSize:11,color:T.txS,marginTop:2}}>/300</p>
          </div>
        </div>

        {/* inline gender + age controls */}
        <div style={{
          display:'flex',gap:8,alignItems:'center',padding:'10px 12px',
          background:T.bgS,borderRadius:12,marginBottom:14
        }}>
          <span style={{fontSize:11,fontWeight:700,color:T.txS,letterSpacing:'0.08em'}}>SCORE TABLE</span>
          <div style={{display:'flex',gap:4,marginLeft:'auto'}}>
            {['F','M'].map((g,i)=><button key={g} style={{
              fontSize:12,fontWeight:700,padding:'4px 12px',borderRadius:7,border:'none',
              background:i===0?T.ac:'transparent',color:i===0?'#fff':T.txM,cursor:'pointer',fontFamily:'inherit'
            }}>{g}</button>)}
          </div>
          <span style={{color:T.border,fontSize:14}}>|</span>
          <span style={{fontSize:12,fontWeight:700,color:T.txM}}>Age</span>
          <input value="22" readOnly style={{
            width:34,background:T.card,border:'none',borderRadius:7,padding:'4px 6px',
            fontSize:12,fontWeight:700,color:T.tx,outline:'none',textAlign:'center',fontFamily:'inherit'
          }}/>
        </div>

        {/* score bars */}
        {[
          {l:'Pull-ups',r:'9 reps',s:90,c:T.g},
          {l:'Plank',r:'3:15',s:75,c:T.ac},
          {l:'3-Mile Run',r:'24:30',s:75,c:T.ac},
        ].map((sc,i)=><div key={i} style={{padding:'10px 0',borderBottom:i<2?`1px solid ${T.bgS}`:'none'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}}>
            <div><span style={{fontSize:14,fontWeight:600,color:T.tx}}>{sc.l}</span><span style={{fontSize:12,color:T.txS,marginLeft:8}}>{sc.r}</span></div>
            <span style={{fontSize:20,fontWeight:700,color:sc.c,fontFamily:T.serif}}>{sc.s}</span>
          </div>
          <div style={{width:'100%',height:5,background:T.bgS,borderRadius:99}}>
            <div style={{height:'100%',width:`${sc.s}%`,background:sc.c,borderRadius:99}}/>
          </div>
        </div>)}
      </Card>

      <p style={{fontSize:11,color:T.txS,textAlign:'center'}}>change M/F and the tables recalculate instantly</p>
    </Screen>
    <BottomNav active="more"/>
  </Phone>;
}

Object.assign(window, {SettingsA, SettingsB});
