/* ── NOTES / JOURNAL VARIATIONS ───────────────────────────── */

/* A · Daily — one entry per day, auto-created. Calendar strip of past days
   with a written-dot. Today's entry expands inline. */
function NotesA(){
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <PageTitle sub="Wednesday · May 13">Journal</PageTitle>

      {/* mini week strip */}
      <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:4}}>
        {[
          {d:7,wd:'THU',written:true},
          {d:8,wd:'FRI',written:true},
          {d:9,wd:'SAT',written:false},
          {d:10,wd:'SUN',written:true},
          {d:11,wd:'MON',written:true},
          {d:12,wd:'TUE',written:true},
          {d:13,wd:'WED',today:true},
        ].map((day,i)=><div key={i} style={{
          background:day.today?T.tx:T.card, borderRadius:12, padding:'10px 12px',
          flexShrink:0, textAlign:'center', minWidth:48,
          boxShadow:'0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <p style={{fontSize:9,fontWeight:800,color:day.today?'rgba(255,255,255,0.6)':T.txS,letterSpacing:'0.08em'}}>{day.wd}</p>
          <p style={{fontSize:16,fontWeight:700,fontFamily:T.serif,color:day.today?'#fff':T.tx,marginTop:2}}>{day.d}</p>
          <div style={{height:4,marginTop:4,display:'flex',justifyContent:'center'}}>
            {day.written&&!day.today&&<div style={{width:4,height:4,borderRadius:99,background:T.ac}}/>}
            {day.today&&<div style={{width:4,height:4,borderRadius:99,background:'#fff'}}/>}
          </div>
        </div>)}
      </div>

      {/* today's entry */}
      <Card style={{padding:'18px 18px 20px'}}>
        <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:12}}>
          <p style={{fontSize:13,fontWeight:700,color:T.txS,letterSpacing:'0.04em'}}>TODAY</p>
          <p style={{fontSize:11,color:T.txS}}>auto-saving</p>
        </div>
        <textarea defaultValue="Long meeting day. Q3 budget review pushed back to Friday — feels overdue and I'm anxious about it. Mom called twice — need to call back tonight. Bright spot: settled on the cabinet finish for the kitchen.

Tomorrow I need to start with the budget so it stops looming." readOnly style={{
          width:'100%',boxSizing:'border-box',background:'transparent',border:'none',
          outline:'none',resize:'none',fontSize:15,color:T.tx,fontFamily:T.serif,
          lineHeight:1.6,letterSpacing:'-0.005em',minHeight:200
        }}/>
        <div style={{display:'flex',gap:8,marginTop:14,paddingTop:14,borderTop:`1px solid ${T.bgS}`}}>
          <span style={{fontSize:11,fontWeight:700,padding:'4px 9px',borderRadius:7,background:T.bgS,color:T.txM}}>👤 work</span>
          <span style={{fontSize:11,fontWeight:700,padding:'4px 9px',borderRadius:7,background:T.bgS,color:T.txM}}>👤 family</span>
          <span style={{fontSize:11,fontWeight:700,padding:'4px 9px',borderRadius:7,border:`1.5px dashed ${T.border}`,color:T.txS}}>+ tag</span>
        </div>
      </Card>

      <SecLabel right="All →">Recent</SecLabel>
      {[
        {d:'Tue · May 12',preview:'Slow start. Skipped run because of the rain — guilty about it but the rest day might be needed…'},
        {d:'Mon · May 11',preview:'Kicked the week off with the contractor walkthrough. Three quotes by Friday is the goal…'},
      ].map((e,i)=><div key={i} style={{
        background:T.card,borderRadius:14,padding:'12px 16px',
        boxShadow:'0 1px 3px rgba(0,0,0,0.04)',marginBottom:6
      }}>
        <p style={{fontSize:11,fontWeight:700,color:T.txS,letterSpacing:'0.06em'}}>{e.d.toUpperCase()}</p>
        <p style={{fontSize:13,color:T.txM,marginTop:4,fontFamily:T.serif,lineHeight:1.5}}>{e.preview}</p>
      </div>)}
    </Screen>
    <BottomNav active="more" tabs={[
      {id:'today',label:'Today',icon:'⊙'},
      {id:'tasks',label:'Tasks',icon:'✓'},
      {id:'projects',label:'Projects',icon:'◫'},
      {id:'more',label:'Notes',icon:'✎'},
      {id:'menu',label:'More',icon:'···'},
    ]}/>
  </Phone>;
}

/* B · Notebook — freeform titled notes, taggable, searchable.
   No daily structure. Closest to Bear / Apple Notes. */
function NotesB(){
  const notes=[
    {pin:true,title:'Q3 budget questions for Sarah',preview:'• Why did the marketing spend nearly double?\n• Hiring timeline alignment with finance…',tags:['work'],date:'2h ago',c:'#7C3AED'},
    {title:'Kitchen reno · vendor list',preview:'Three contractors so far: Maya, Daniel, and the referral from Pat. Aiming for quotes by Friday…',tags:['home'],date:'Yesterday',c:'#3B4FD8'},
    {title:'Books to read after Educated',preview:'Atomic Habits, Thinking Fast and Slow… also want something fiction next.',tags:['reading'],date:'2 days',c:'#0369A1'},
    {title:'NYC trip itinerary draft',preview:'Tue: arrive, dinner Lower East Side. Wed: conference 9-5, drinks…',tags:['trip','nyc'],date:'4 days',c:'#15803D'},
  ];
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <PageTitle>Notes</PageTitle>
        <span style={{fontSize:18,color:T.txM,padding:8}}>⌕</span>
      </div>

      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
        {['All · 24','work','home','reading','trip','+'].map((t,i)=><button key={i} style={{
          fontSize:12,fontWeight:700,padding:'6px 11px',borderRadius:9,border:'none',
          background:i===0?T.tx:T.bgS,color:i===0?'#fff':T.txM,cursor:'pointer',
          fontFamily:'inherit',textTransform:i===0?'none':'capitalize'
        }}>{t}</button>)}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {notes.map((n,i)=><div key={i} style={{
          background:T.card,borderRadius:14,padding:'14px 14px 12px',
          boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
          borderTop:`3px solid ${n.c}`,
          display:'flex',flexDirection:'column',gap:6,minHeight:130,position:'relative'
        }}>
          {n.pin&&<span style={{position:'absolute',top:8,right:10,fontSize:11,color:T.w}}>📌</span>}
          <p style={{fontSize:13,fontWeight:700,color:T.tx,fontFamily:T.serif,lineHeight:1.2,paddingRight:n.pin?14:0}}>{n.title}</p>
          <p style={{flex:1,fontSize:11,color:T.txM,lineHeight:1.5,whiteSpace:'pre-line',overflow:'hidden'}}>{n.preview}</p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'auto',paddingTop:6}}>
            <div style={{display:'flex',gap:3}}>{n.tags.map(t=><span key={t} style={{fontSize:9,fontWeight:700,padding:'2px 6px',borderRadius:5,background:T.bgS,color:T.txS}}>#{t}</span>)}</div>
            <span style={{fontSize:9,color:T.txS,fontWeight:600}}>{n.date}</span>
          </div>
        </div>)}
      </div>
    </Screen>
    <FAB/>
    <BottomNav active="more" tabs={[
      {id:'today',label:'Today',icon:'⊙'},
      {id:'tasks',label:'Tasks',icon:'✓'},
      {id:'projects',label:'Projects',icon:'◫'},
      {id:'notes',label:'Notes',icon:'✎'},
      {id:'menu',label:'More',icon:'···'},
    ]}/>
  </Phone>;
}

/* C · Reflect — structured morning + evening prompts.
   Closest to Stoic / Daylio. Less freeform, more habit-forming. */
function NotesC(){
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <PageTitle sub="Wednesday · May 13">Reflect</PageTitle>

      {/* progress strip */}
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <div style={{flex:1,height:6,background:T.bgS,borderRadius:99,overflow:'hidden'}}>
          <div style={{height:'100%',width:'50%',background:T.ac,borderRadius:99}}/>
        </div>
        <span style={{fontSize:11,fontWeight:700,color:T.txS}}>Morning done · Evening pending</span>
      </div>

      {/* morning - completed */}
      <Card style={{padding:'16px 18px',opacity:.7}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <span style={{fontSize:18}}>☀️</span>
          <p style={{fontSize:13,fontWeight:700,color:T.tx,flex:1}}>Morning · 7:42 AM</p>
          <span style={{fontSize:11,fontWeight:700,color:T.g,padding:'3px 8px',background:T.gS,borderRadius:7}}>✓ Done</span>
        </div>
        <Q label="One thing I want to feel proud of by tonight">Finishing the budget review draft.</Q>
        <Q label="What might get in the way?">The pull of email — I'll keep it closed until 11.</Q>
      </Card>

      {/* evening - to fill */}
      <Card style={{padding:'16px 18px'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
          <span style={{fontSize:18}}>🌙</span>
          <p style={{fontSize:13,fontWeight:700,color:T.tx,flex:1}}>Evening reflection</p>
          <span style={{fontSize:11,fontWeight:700,color:T.w,padding:'3px 8px',background:T.wS,borderRadius:7}}>Tonight</span>
        </div>

        <div style={{marginBottom:14}}>
          <p style={{fontSize:11,fontWeight:700,color:T.txS,letterSpacing:'0.08em',marginBottom:8}}>HOW DID THE DAY FEEL?</p>
          <div style={{display:'flex',gap:8,justifyContent:'space-between'}}>
            {['😞','🙁','😐','🙂','😄'].map((e,i)=><button key={i} style={{
              flex:1,fontSize:26,padding:'10px 0',borderRadius:12,border:'none',
              background:i===3?T.acS:T.bgS,cursor:'pointer',transition:'all .15s'
            }}>{e}</button>)}
          </div>
        </div>

        <div style={{marginBottom:12}}>
          <p style={{fontSize:11,fontWeight:700,color:T.txS,letterSpacing:'0.08em',marginBottom:6}}>WHAT WENT WELL?</p>
          <div style={{background:T.bgS,borderRadius:10,padding:'10px 12px',fontSize:13,color:T.txS,fontStyle:'italic',fontFamily:T.serif}}>Tap to write…</div>
        </div>

        <div>
          <p style={{fontSize:11,fontWeight:700,color:T.txS,letterSpacing:'0.08em',marginBottom:6}}>WHAT TO CARRY INTO TOMORROW?</p>
          <div style={{background:T.bgS,borderRadius:10,padding:'10px 12px',fontSize:13,color:T.txS,fontStyle:'italic',fontFamily:T.serif}}>Tap to write…</div>
        </div>
      </Card>

      <button style={{
        background:'transparent',border:'none',color:T.ac,fontSize:13,fontWeight:700,
        padding:8,cursor:'pointer',fontFamily:'inherit'
      }}>Past entries →</button>
    </Screen>
    <BottomNav active="more" tabs={[
      {id:'today',label:'Today',icon:'⊙'},
      {id:'tasks',label:'Tasks',icon:'✓'},
      {id:'reflect',label:'Reflect',icon:'☾'},
      {id:'projects',label:'Projects',icon:'◫'},
      {id:'menu',label:'More',icon:'···'},
    ]}/>
  </Phone>;
}

function Q({label, children}){
  return <div style={{marginBottom:10}}>
    <p style={{fontSize:11,fontWeight:700,color:T.txS,letterSpacing:'0.06em',marginBottom:4}}>{label}</p>
    <p style={{fontSize:14,color:T.tx,fontFamily:T.serif,lineHeight:1.5}}>{children}</p>
  </div>;
}
window.Q=Q;

Object.assign(window, {NotesA, NotesB, NotesC});
