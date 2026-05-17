// LifeOS Data Layer — localStorage persistence

const DB_KEY = 'lifeos_v4';

function _uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function todayStr() { return new Date().toISOString().split('T')[0]; }
function dStr(daysAgo) {
  const d = new Date(); d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

const SEED = {
  user: { age: 22 },
  categories: ['home', 'out', 'anywhere', 'work'],
  workoutCats: [
    { id: 'run', name: 'Run', color: '#22C55E' },
    { id: 'strength', name: 'Strength', color: '#8B5CF6' },
    { id: 'hiit', name: 'HIIT', color: '#F97316' },
  ],
  tasks: [
    { id: _uid(), title: 'Review Q3 budget proposal', context: 'work', priority: 1, due_date: '2026-05-01', status: 'todo', project_id: null },
    { id: _uid(), title: 'Schedule dentist appointment', context: 'home', priority: 2, due_date: '2026-05-10', status: 'todo', project_id: null },
    { id: _uid(), title: 'Pick up dry cleaning', context: 'out', priority: 3, due_date: null, status: 'todo', project_id: null },
    { id: _uid(), title: 'Call Mom back', context: 'anywhere', priority: 2, due_date: '2026-04-30', status: 'todo', project_id: null },
  ],
  projects: [
    { id: 'p1', title: 'Home Renovation', notes: 'Planning the kitchen remodel. Need to get 3 quotes before end of May.', updated_at: '2026-04-20', status: 'active' },
    { id: 'p2', title: 'Career Development', notes: 'Study for promotion cycle. Leadership course by June.', updated_at: '2026-04-18', status: 'active' },
  ],
  workouts: [
    { id: 'w1', date: todayStr(), type: 'run', duration_minutes: 35, notes: '5k easy pace' },
    { id: 'w2', date: dStr(1), type: 'strength', duration_minutes: 50, notes: 'Upper body' },
    { id: 'w3', date: dStr(2), type: 'hiit', duration_minutes: 25, notes: '' },
    { id: 'w4', date: dStr(4), type: 'run', duration_minutes: 40, notes: '' },
    { id: 'w5', date: dStr(5), type: 'strength', duration_minutes: 55, notes: '' },
    { id: 'w6', date: dStr(6), type: 'run', duration_minutes: 30, notes: '' },
    { id: 'w7', date: dStr(8), type: 'hiit', duration_minutes: 20, notes: '' },
    { id: 'w8', date: dStr(9), type: 'strength', duration_minutes: 60, notes: '' },
  ],
  pft: [],
  cft: [],
  trips: [
    { id: 'tr1', destination: 'New York City', start_date: '2026-06-10', end_date: '2026-06-14', notes: 'Conference + exploring Brooklyn', status: 'planning', outfit_photos: [] },
    { id: 'tr2', destination: 'Cancun', start_date: '2026-08-01', end_date: '2026-08-08', notes: 'Beach vacation!', status: 'planning', outfit_photos: [] },
  ],
  checklist: [],
  clothing: [
    { id: 'cl1', type: 'need_to_return', title: 'Blue blazer from Zara', notes: 'Wrong size', deadline: '2026-05-05', done: false, photo: null, price: null, url: null },
    { id: 'cl2', type: 'want_to_buy', title: 'White linen trousers', notes: 'For summer trips', price: '85', url: '', done: false, photo: null, deadline: null },
    { id: 'cl3', type: 'outfit_idea', title: 'Sunday brunch look', notes: 'White top + wide leg jeans', done: false, photo: null, price: null, url: null, deadline: null },
  ],
  inspo: [],
  books: [
    { id: 'b1', title: 'Atomic Habits', author: 'James Clear', status: 'to_read', rating: null, categories: ['non-fiction'], notes: '', sort_order: 0 },
    { id: 'b2', title: 'The Alchemist', author: 'Paulo Coelho', status: 'to_read', rating: null, categories: ['fiction'], notes: '', sort_order: 1 },
    { id: 'b3', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', status: 'to_read', rating: null, categories: ['non-fiction'], notes: '', sort_order: 2 },
    { id: 'b4', title: 'Educated', author: 'Tara Westover', status: 'read', rating: 5, categories: ['non-fiction'], notes: 'Incredible memoir', sort_order: 0 },
    { id: 'b5', title: 'Normal People', author: 'Sally Rooney', status: 'read', rating: 4, categories: ['fiction'], notes: '', sort_order: 1 },
  ],
  bookCategories: ['fiction', 'non-fiction', 'self-help', 'biography'],
};

const LOS_DB = {
  uid: _uid,
  load() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return JSON.parse(JSON.stringify(SEED));
  },
  save(state) {
    try { localStorage.setItem(DB_KEY, JSON.stringify(state)); } catch(e) {}
  },
  reset() {
    localStorage.removeItem(DB_KEY);
    return JSON.parse(JSON.stringify(SEED));
  },
};

Object.assign(window, { LOS_DB });
