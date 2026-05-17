/* ── UNIFIED ADD FORMS ────────────────────────────────────── */

/* A · Bottom Sheet — every section uses the same Sheet pattern.
   Quick-add becomes a single tap on the FAB → sheet slides up. */
function FormsA(){
  return <Phone bg={T.tx}>
    <StatusBar/>
    {/* dimmed Projects behind */}
    <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.45)'}}/>

    {/* sheet */}
    <div style={{
      position:'absolute',bottom:0,left:0,right:0,
      background:T.card,borderRadius:'24px 24px 0 0',
      padding:'14px 20px 28px',zIndex:2
    }}>
      <div style={{width:36,height:4,borderRadius:99,background:T.border,margin:'0 auto 14px'}}/>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
        <p style={{fontSize:18,fontWeight:700,fontFamily:T.serif}}>New Task</p>
        <button style={{background:'none',border:'none',fontSize:13,fontWeight:700,color:T.txS,cursor:'pointer'}}>Cancel</button>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <input placeholder="What needs to get done?" defaultValue="Draft contractor email" style={{
          background:T.bgS,border:'2px solid transparent',borderRadius:12,
          padding:'13px 16px',fontSize:16,fontWeight:600,color:T.tx,outline:'none',
          fontFamily:'inherit'
        }}/>

        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <Row label="List">
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {['home','work','out','anywhere'].map((c,i)=><button key={c} style={{
                fontSize:12,fontWeight:700,padding:'6px 12px',borderRadius:9,border:'none',
                background:i===1?T.tx:T.bgS,color:i===1?'#fff':T.txM,cursor:'pointer',
                textTransform:'capitalize',fontFamily:'inherit'
              }}>{c}</button>)}
            </div>
          </Row>

          <Row label="Priority">
            <div style={{display:'flex',gap:6}}>
              {[{p:1,l:'Critical',c:T.r},{p:2,l:'Normal',c:T.w},{p:3,l:'Low',c:T.txS}].map((it,i)=><button key={it.p} style={{
                display:'flex',alignItems:'center',gap:6,
                fontSize:12,fontWeight:700,padding:'6px 12px',borderRadius:9,border:'none',
                background:i===0?T.rS:T.bgS,color:i===0?T.r:T.txM,cursor:'pointer',fontFamily:'inherit'
              }}><span style={{width:7,height:7,borderRadius:99,background:it.c}}/>{it.l}</button>)}
            </div>
          </Row>

          <Row label="Due">
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {['Today','Tomorrow','This week','Pick date'].map((c,i)=><button key={c} style={{
                fontSize:12,fontWeight:700,padding:'6px 12px',borderRadius:9,border:'none',
                background:i===0?T.tx:T.bgS,color:i===0?'#fff':T.txM,cursor:'pointer',fontFamily:'inherit'
              }}>{c}</button>)}
            </div>
          </Row>

          <Row label="Project">
            <button style={{
              fontSize:12,fontWeight:700,padding:'6px 12px',borderRadius:9,border:`1.5px dashed ${T.border}`,
              background:'transparent',color:T.txM,cursor:'pointer',fontFamily:'inherit'
            }}>+ Link project</button>
          </Row>
        </div>

        <Btn full v="primary" style={{marginTop:6}}>Add Task</Btn>
      </div>
    </div>
  </Phone>;
}

function Row({label, children}){
  return <div style={{display:'flex',alignItems:'center',gap:14,minHeight:36}}>
    <span style={{fontSize:11,fontWeight:800,color:T.txS,letterSpacing:'0.1em',width:64,textTransform:'uppercase'}}>{label}</span>
    <div style={{flex:1,display:'flex',alignItems:'center'}}>{children}</div>
  </div>;
}
window.Row=Row;

/* B · Inline Quick-Add — every section has a persistent quick-add bar at top.
   Tap the chevron for more options. Same pattern across all sections. */
function FormsB(){
  return <Phone>
    <StatusBar/>
    <Screen scroll>
      <PageTitle>Tasks</PageTitle>

      {/* quick-add card */}
      <Card style={{padding:14}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <span style={{fontSize:18,color:T.ac,fontWeight:700}}>+</span>
          <input placeholder="Add a task…" defaultValue="Draft contractor email" style={{
            flex:1,background:'transparent',border:'none',outline:'none',
            fontSize:15,color:T.tx,fontFamily:'inherit'
          }}/>
          <button style={{
            background:T.ac,color:'#fff',border:'none',borderRadius:10,
            padding:'8px 16px',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit'
          }}>Add</button>
        </div>
        <div style={{display:'flex',gap:6,marginTop:12,flexWrap:'wrap',paddingTop:12,borderTop:`1px solid ${T.bgS}`}}>
          <Pill v="solid">work</Pill>
          <Pill v="solid" color={T.r}>● Critical</Pill>
          <Pill>Today</Pill>
          <Pill dashed>+ Project</Pill>
        </div>
      </Card>

      <p style={{fontSize:11,color:T.txS,textAlign:'center'}}>same shape across all sections — projects, trips, books, clothing</p>

      {/* mock list below */}
      <div style={{display:'flex',flexDirection:'column',gap:6,opacity:.55}}>
        {['Review Q3 budget proposal','Call Mom back','Pick up dry cleaning'].map((t,i)=><div key={i} style={{
          background:T.card,borderRadius:14,padding:'12px 14px',
          borderLeft:`3px solid ${PC[i+1]}`,
          boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
          display:'flex',alignItems:'center',gap:12
        }}>
          <Check on={false}/>
          <p style={{flex:1,fontSize:14,fontWeight:600,color:T.tx}}>{t}</p>
        </div>)}
      </div>

      {/* paired demo: same shape on Projects */}
      <SecLabel>SAME SHAPE → PROJECTS</SecLabel>
      <Card style={{padding:14}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <span style={{fontSize:18,color:T.ac,fontWeight:700}}>+</span>
          <input placeholder="Add a project…" style={{
            flex:1,background:'transparent',border:'none',outline:'none',
            fontSize:15,color:T.tx,fontFamily:'inherit'
          }}/>
          <button style={{
            background:T.ac,color:'#fff',border:'none',borderRadius:10,
            padding:'8px 16px',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit'
          }}>Add</button>
        </div>
      </Card>
    </Screen>
    <BottomNav active="tasks"/>
  </Phone>;
}

function Pill({children, v, color, dashed}){
  if(dashed)return <span style={{fontSize:12,fontWeight:700,padding:'5px 10px',borderRadius:8,border:`1.5px dashed ${T.border}`,color:T.txM}}>{children}</span>;
  if(v==='solid')return <span style={{fontSize:12,fontWeight:700,padding:'5px 10px',borderRadius:8,background:T.bgS,color:color||T.txM}}>{children}</span>;
  return <span style={{fontSize:12,fontWeight:700,padding:'5px 10px',borderRadius:8,background:T.bgS,color:T.txM}}>{children}</span>;
}
window.Pill=Pill;

Object.assign(window, {FormsA, FormsB});
