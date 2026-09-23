/**
 * Thread memory — the site practicing its own thesis on the visitor.
 *
 * Each room you enter, the knots you tie reading it, and the point you left
 * from are carried across route handoffs. Kept in this tab's sessionStorage
 * only: nothing is sent anywhere, and it disappears when the tab closes.
 */

export interface RoomVisit {
  path: string;
  title: string;
  knots: number;
  total: number;
  lastKnot?: string;
}

export interface Departure {
  from: string;
  fromTitle: string;
  section?: string;
  to: string;
  x: number;
  y: number;
  at: number;
}

interface ThreadState {
  rooms: RoomVisit[];
  departure?: Departure;
}

const KEY = "hope.thread.v1";
export const THREAD_EVENT = "thread:update";

function read(): ThreadState {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ThreadState;
      if (Array.isArray(parsed.rooms)) return parsed;
    }
  } catch {
    /* storage unavailable: the thread still renders, it just forgets */
  }
  return { rooms: [] };
}

let memo: ThreadState | null = null;
function state(): ThreadState {
  if (!memo) memo = read();
  return memo;
}

function write() {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(state()));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(THREAD_EVENT));
}

/** Short room name from a document title ("Selected work — Hope Atina" → "Selected work"). */
export function roomTitle(title: string, path: string) {
  if (path === "/") return "Home";
  const head = title.split(/\s[—–|-]\s/)[0].trim();
  return head.replace(/^Hope Atina\s*[—–-]?\s*/, "") || path;
}

export function enterRoom(path: string, title: string) {
  const s = state();
  const last = s.rooms[s.rooms.length - 1];
  if (last && last.path === path) return;
  s.rooms.push({ path, title: roomTitle(title, path), knots: 0, total: 0 });
  if (s.rooms.length > 24) s.rooms = s.rooms.slice(-24);
  write();
}

export function tieKnots(path: string, knots: number, total: number, lastKnot?: string) {
  const s = state();
  const room = s.rooms[s.rooms.length - 1];
  if (!room || room.path !== path) return;
  if (knots <= room.knots && total === room.total) return;
  room.knots = Math.max(room.knots, knots);
  room.total = total;
  if (lastKnot) room.lastKnot = lastKnot;
  write();
}

export function depart(d: Omit<Departure, "at">) {
  state().departure = { ...d, at: Date.now() };
  write();
}

/** The departure that led to `path`, if this arrival is a fresh handoff. */
export function arrivalFor(path: string): Departure | undefined {
  const d = state().departure;
  if (!d || d.to !== path) return undefined;
  if (Date.now() - d.at > 20000) return undefined;
  return d;
}

export function rooms(): RoomVisit[] {
  return state().rooms;
}
