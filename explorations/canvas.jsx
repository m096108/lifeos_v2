/* global React, DesignCanvas, DCSection, DCArtboard, DCPostIt,
   TodayA, TodayB, TodayC,
   CalendarA, CalendarB, CalendarC,
   SearchA, SearchB,
   FormsA, FormsB,
   NotesA, NotesB,
   SettingsA */

const W = 360;
const H = 740;

function App() {
  return (
    <DesignCanvas>

      <DCSection id="today" title="1 · Today view — make it actionable"
        subtitle="The Today screen is currently read-only. Tap a task → it dumps you into Tasks. Three ways to fix.">

        <DCArtboard id="today-a" label="A · Inline checkboxes" width={W} height={H}>
          <TodayA />
        </DCArtboard>

        <DCArtboard id="today-b" label="B · Quick capture + swipe" width={W} height={H}>
          <TodayB />
        </DCArtboard>

        <DCArtboard id="today-c" label="C · Right-now focus" width={W} height={H}>
          <TodayC />
        </DCArtboard>

        <DCPostIt x={0} y={H + 24} width={280}>
          <b>Recommendation:</b> A or B. C is bold but might be polarizing — some
          users want the overview, not a single forced task. B adds the most new
          utility (quick-capture, trip countdowns, swipe).
        </DCPostIt>
      </DCSection>

      <DCSection id="calendar" title="2 · Replace the Calendar shell"
        subtitle="Today's Calendar is a month grid with no data and two dead 'Connect…' buttons.">

        <DCArtboard id="cal-a" label="A · Upcoming agenda" width={W} height={H}>
          <CalendarA />
        </DCArtboard>

        <DCArtboard id="cal-b" label="B · Real month grid" width={W} height={H}>
          <CalendarB />
        </DCArtboard>

        <DCArtboard id="cal-c" label="C · Remove it" width={W} height={H}>
          <CalendarC />
        </DCArtboard>

        <DCPostIt x={0} y={H + 24} width={280}>
          <b>Recommendation:</b> A. It's the rare case where the answer is
          "do less" — most people glance at a calendar to see what's next, not
          to pick a date. B is more work for less payoff. C is honest but
          loses a section.
        </DCPostIt>
      </DCSection>

      <DCSection id="search" title="3 · Global search"
        subtitle="No way to find a task, note, or trip by name right now.">

        <DCArtboard id="search-a" label="A · Persistent top bar" width={W} height={H}>
          <SearchA />
        </DCArtboard>

        <DCArtboard id="search-b" label="B · Command palette" width={W} height={H}>
          <SearchB />
        </DCArtboard>

        <DCPostIt x={0} y={H + 24} width={280}>
          <b>Recommendation:</b> B. Mobile screens are small — a persistent
          search bar steals 50px every screen. A swipe-down command palette
          stays out of the way until invoked, and the "Add task" action
          shortcut is a huge productivity win.
        </DCPostIt>
      </DCSection>

      <DCSection id="forms" title="4 · Unify the add forms"
        subtitle="Tasks expand inline. Projects/Trips use card forms. Books too. Edit uses a bottom sheet. Pick one.">

        <DCArtboard id="forms-a" label="A · Universal bottom sheet" width={W} height={H}>
          <FormsA />
        </DCArtboard>

        <DCArtboard id="forms-b" label="B · Universal inline expand" width={W} height={H}>
          <FormsB />
        </DCArtboard>

        <DCPostIt x={0} y={H + 24} width={280}>
          <b>Recommendation:</b> A. Bottom sheets are familiar (the iOS share
          sheet, every modern mobile UI). They also unify with the existing
          edit sheet → one pattern for create AND edit. Inline expand is
          marginally faster but visually noisier and conflicts with lists.
        </DCPostIt>
      </DCSection>

      <DCSection id="notes" title="5 · A Notes / Journal section"
        subtitle="A 'Life OS' without a notes surface feels incomplete. Two flavors:">

        <DCArtboard id="notes-a" label="A · Daily journal" width={W} height={H}>
          <NotesA />
        </DCArtboard>

        <DCArtboard id="notes-b" label="B · Freeform notes" width={W} height={H}>
          <NotesB />
        </DCArtboard>

        <DCPostIt x={0} y={H + 24} width={280}>
          <b>Up to you:</b> A is reflective and ties together your other
          activity. B is general-purpose and what most people mean by "notes".
          They could co-exist (Journal as a special pinned note), but pick a
          starting point.
        </DCPostIt>
      </DCSection>

      <DCSection id="settings" title="6 · Settings (fixes the PFT gender bug)"
        subtitle="Adds a profile screen. Fixes the hardcoded 'Female' label. Adds data export — your seed data already lives in localStorage.">

        <DCArtboard id="settings-a" label="Settings screen" width={W} height={H}>
          <SettingsA />
        </DCArtboard>

        <DCPostIt x={0} y={H + 24} width={280}>
          Once you pick the rest, this slots in via the More menu. The Sex
          toggle drives PFT/CFT scoring brackets (the app already has the
          female tables — male tables are a 6-line addition).
        </DCPostIt>
      </DCSection>

    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
