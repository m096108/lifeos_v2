/* ── GLOBAL SEARCH VARIATIONS ─────────────────────────────── */

/* A · Persistent — sticky search bar at top of every section.
   Always visible, always one tap away. Filters whatever section you're on. */
function SearchA(){
  const results=[
    {section:'Tasks',title:'Review Q3 budget proposal',meta:'work · 2d overdue',c:T.r},
    {section:'Tasks',title:'Submit Q2 budget review',meta:'work · done',muted:true},
    {section:'Projects',title:'Q3 Budget Planning',meta:'2 open tasks',c:T.ac},
    {section:'Books',title:'Atomic Habits',meta:'James Clear · To read'},
  ];
  return <Phone>
    <StatusBar/>
    <div style={{padding:'12px 20px 0'}}>
      <div style={{
        display:'flex',alignItems:'center',gap:10,background:T.card,
        borderRadius:14,padding:'11px 14px',
        boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
        border:`2px solid ${T.ac}`
      }}>
        <span style={{fontSize:14,color:T.ac}}>⌕</span>
        <input value="budget" readOnly style={{
          flex:1,background:'transparent',border:'none',outline:'none',
          fontSize:15,color:T.tx,fontFamily:'inherit',fontWeight:600
        }}/>
        <span style={{fontSize:12,fontWeight:700,color:T.txS,cursor:'pointer'}}>×</span>
      </div>
    </div>
    <Screen scroll padTop={12}>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:4}}>
        {['Everything','Tasks · 2','Projects · 1','Books · 1'].map((f,i)=><button key={i} style={{
          fontSize:12,fontWeight:700,padding:'6px 11px',borderRadius:10,border:'none',
          background:i===0?T.tx:T.bgS,color:i===0?'#fff':T.txM,cursor:'pointer',fontFamily:'inherit'
        }}>{f}</button>)}
      </div>

      {['Tasks','Projects','Books'].map(sec=>{
        const items=results.filter(r=>r.section===sec);
        return <div key={sec}>
          <SecLabel>{sec}</SecLabel>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {items.map((r,i)=><div key={i} style={{
              background:T.card,borderRadius:12,padding:'11px 14px',
              boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
              opacity:r.muted?.5:1,
              display:'flex',alignItems:'center',gap:10,
              borderLeft:r.c?`3px solid ${r.c}`:`3px solid transparent`
            }}>
              <div style={{flex:1}}>
                <p style={{fontSize:14,fontWeight:600,color:T.tx,textDecoration:r.muted?'line-through':'none'}}>
                  {hl(r.title,'budget')}
                </p>
                <p style={{fontSize:12,color:T.txS,marginTop:2}}>{r.meta}</p>
              </div>
              <span style={{fontSize:16,color:T.txS}}>›</span>
            </div>)}
          </div>
        </div>;
      })}
    </Screen>
    <BottomNav active="today"/>
  </Phone>;
}

function hl(s,q){
  const i=s.toLowerCase().indexOf(q.toLowerCase());if(i<0)return s;
  return <>{s.slice(0,i)}<mark style={{background:T.acS,color:T.ac,fontWeight:700,padding:'0 2px',borderRadius:3}}>{s.slice(i,i+q.length)}</mark>{s.slice(i+q.length)}</>;
}
window.hl=hl;

/* B · Command palette — full-screen overlay invoked from a mag-glass icon
   anywhere. Shows recent searches + jump-to suggestions when empty,
   live grouped results when typing. */
function SearchB(){
  return <Phone bg={T.tx}>
    <StatusBar/>
    {/* dimmed today behind */}
    <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.4)'}}/>

    {/* palette */}
    <div style={{
      margin:'56px 16px 0',background:T.card,borderRadius:18,
      boxShadow:'0 24px 60px rgba(0,0,0,0.4)',overflow:'hidden',
      position:'relative',zIndex:2
    }}>
      <div style={{display:'flex',alignItems:'center',gap:12,padding:'16px 18px',borderBottom:`1px solid ${T.bgS}`}}>
        <span style={{fontSize:18,color:T.txM}}>⌕</span>
        <input value="bud" readOnly style={{flex:1,background:'transparent',border:'none',outline:'none',fontSize:16,color:T.tx,fontFamily:'inherit'}}/>
        <span style={{fontSize:11,fontWeight:700,color:T.txS,padding:'3px 7px',background:T.bgS,borderRadius:6}}>esc</span>
      </div>

      <div style={{maxHeight:540,overflowY:'auto'}}>
        <div style={{padding:'12px 18px 8px'}}>
          <p style={{fontSize:10,fontWeight:800,color:T.txS,letterSpacing:'0.12em'}}>TASKS · 2</p>
        </div>
        {[
          {t:'Review Q3 budget proposal',sub:'work · 2d overdue',c:T.r,icon:'✓'},
          {t:'Submit Q2 budget review',sub:'work · done',icon:'✓',muted:true},
        ].map((it,i)=><div key={i} style={{
          padding:'10px 18px',display:'flex',alignItems:'center',gap:12,
          background:i===0?T.acS:'transparent',cursor:'pointer'
        }}>
          <span style={{fontSize:14,color:it.c||T.txM,width:18}}>{it.icon}</span>
          <div style={{flex:1}}>
            <p style={{fontSize:14,fontWeight:600,color:T.tx,textDecoration:it.muted?'line-through':'none',opacity:it.muted?.5:1}}>
              {hl(it.t,'bud')}
            </p>
            <p style={{fontSize:11,color:T.txS,marginTop:1}}>{it.sub}</p>
          </div>
          {i===0&&<span style={{fontSize:11,fontWeight:700,color:T.txS,padding:'3px 7px',background:T.bgS,borderRadius:6}}>↵</span>}
        </div>)}

        <div style={{padding:'12px 18px 8px'}}>
          <p style={{fontSize:10,fontWeight:800,color:T.txS,letterSpacing:'0.12em'}}>PROJECTS · 1</p>
        </div>
        <div style={{padding:'10px 18px',display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:14,color:T.ac,width:18}}>◫</span>
          <div style={{flex:1}}>
            <p style={{fontSize:14,fontWeight:600,color:T.tx}}>Q3 {hl('Budget','bud')} Planning</p>
            <p style={{fontSize:11,color:T.txS,marginTop:1}}>Project · 2 open tasks</p>
          </div>
        </div>

        <div style={{padding:'12px 18px 8px'}}>
          <p style={{fontSize:10,fontWeight:800,color:T.txS,letterSpacing:'0.12em'}}>ACTIONS</p>
        </div>
        <div style={{padding:'10px 18px',display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:14,color:T.txM,width:18}}>+</span>
          <p style={{flex:1,fontSize:14,fontWeight:600,color:T.tx}}>Create task "<span style={{color:T.ac}}>bud</span>"</p>
          <span style={{fontSize:10,fontWeight:700,color:T.txS}}>⌘N</span>
        </div>
      </div>
    </div>
  </Phone>;
}

/* C · Inline Expand — small ⌕ icon next to PageTitle on every section.
   Tap → header bar morphs into a search field, scoped to current section
   (with a "Search everywhere" link to broaden). */
function SearchC(){
  return <Phone>
    <StatusBar/>
    <div style={{padding:'12px 20px 0'}}>
      {/* the morphed header */}
      <div style={{
        display:'flex',alignItems:'center',gap:10,background:T.card,
        borderRadius:16,padding:'13px 16px',
        boxShadow:'0 4px 14px rgba(0,0,0,0.06),0 1px 3px rgba(0,0,0,0.04)',
        border:`2px solid ${T.ac}`
      }}>
        <span style={{fontSize:16,color:T.ac}}>⌕</span>
        <input value="budget" readOnly style={{
          flex:1,background:'transparent',border:'none',outline:'none',
          fontSize:16,color:T.tx,fontFamily:'inherit',fontWeight:600
        }}/>
        <span style={{fontSize:11,fontWeight:700,color:T.ac}}>Cancel</span>
      </div>
      <p style={{fontSize:11,color:T.txS,marginTop:8,marginLeft:4}}>Searching Tasks · <span style={{color:T.ac,fontWeight:700}}>Search everywhere →</span></p>
    </div>

    <Screen scroll padTop={12}>
      {[
        {t:'Review Q3 budget proposal',ctx:'work',p:1,due:'2d overdue',c:T.r},
        {t:'Submit Q2 budget review',ctx:'work',done:true},
      ].map((it,i)=><div key={i} style={{
        background:T.card,borderRadius:14,padding:'12px 14px',
        borderLeft:`3px solid ${it.done?T.border:PC[it.p]}`,
        boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
        display:'flex',alignItems:'flex-start',gap:12,
        opacity:it.done?.5:1
      }}>
        <Check on={it.done||false}/>
        <div style={{flex:1}}>
          <p style={{fontSize:14,fontWeight:600,color:T.tx,textDecoration:it.done?'line-through':'none'}}>{hl(it.t,'budget')}</p>
          <div style={{display:'flex',gap:6,marginTop:6}}>
            <Chip label={it.ctx}/>
            {it.due&&<span style={{fontSize:11,fontWeight:700,padding:'2px 7px',borderRadius:6,color:it.c,background:T.rS}}>{it.due}</span>}
          </div>
        </div>
      </div>)}

      <SecLabel>FROM OTHER SECTIONS</SecLabel>
      <div style={{
        background:T.bgS,borderRadius:14,padding:'12px 14px',
        display:'flex',alignItems:'center',gap:10
      }}>
        <span style={{fontSize:14,color:T.ac}}>◫</span>
        <div style={{flex:1}}>
          <p style={{fontSize:13,fontWeight:600,color:T.tx}}>{hl('Q3 Budget Planning','budget')}</p>
          <p style={{fontSize:11,color:T.txS,marginTop:1}}>Project · 2 open tasks</p>
        </div>
        <span style={{fontSize:14,color:T.txS}}>›</span>
      </div>
    </Screen>
    <BottomNav active="tasks"/>
  </Phone>;
}

Object.assign(window, {SearchA, SearchB, SearchC});
