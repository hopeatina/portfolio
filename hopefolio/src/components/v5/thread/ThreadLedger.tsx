import { useEffect, useState } from "react";
import { invalidateAnchors } from "./anchors";
import { RoomVisit, rooms as readRooms, THREAD_EVENT } from "./memory";

/**
 * ThreadLedger — where every page's thread ends: in the visitor's own route.
 *
 * The page stitch terminates into the first node here. Each room visited this
 * session is a knot on one woven line; the heat and cold registration strands
 * converge on the room you are in now. Client-only — it is your thread, not
 * the page's.
 */

const SHOWN = 6;

function weave(n: number) {
  const pts = Array.from({ length: n }, (_, i) => [((i + 0.5) / n) * 1000, i % 2 ? 40 : 20] as const);
  // the page's own thread arrives at the first node; this line only carries it onward
  if (n === 1) return { pts, d: "", heat: "", cold: "" };
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < n; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += `C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
  }
  const strand = (sign: number) => {
    let s = `M${pts[0][0]} ${pts[0][1] + sign * 9}`;
    for (let i = 1; i < n; i++) {
      const spread = 9 * (1 - i / (n - 1));
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const mx = (x0 + x1) / 2;
      const prevSpread = 9 * (1 - (i - 1) / (n - 1));
      s += `C${mx} ${y0 + sign * prevSpread} ${mx} ${y1 + sign * spread} ${x1} ${y1 + sign * spread}`;
    }
    return s;
  };
  return { pts, d, heat: strand(-1), cold: strand(1) };
}

function mailto(route: RoomVisit[]) {
  const trail = route
    .map((r) => (r.lastKnot && r.path !== "/" ? `${r.title} (${r.lastKnot})` : r.title))
    .join(" → ");
  const subject = "I followed the thread";
  const body = `The route I took: ${trail}\n\nWhat I'm working on:\n`;
  return `mailto:hopeatina@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ThreadLedger() {
  const [route, setRoute] = useState<RoomVisit[] | null>(null);

  useEffect(() => {
    const sync = () => setRoute([...readRooms()]);
    sync();
    window.addEventListener(THREAD_EVENT, sync);
    return () => window.removeEventListener(THREAD_EVENT, sync);
  }, []);

  // the page stitch ends on our first node; re-route it whenever the weave moves
  const shape = route ? route.length : 0;
  useEffect(() => {
    if (shape) invalidateAnchors();
  }, [shape]);

  if (!route || route.length === 0) return <div className="thread-ledger is-empty" data-thread-end="" />;

  const shown = route.slice(-SHOWN);
  const earlier = route.length - shown.length;
  const knots = route.reduce((sum, r) => sum + r.knots, 0);
  const { pts, d, heat, cold } = weave(shown.length);
  const handoffs = route.length - 1;

  return (
    <section className="thread-ledger" aria-labelledby="thread-ledger-title">
      <div className="thread-ledger-head">
        <span id="thread-ledger-title">Your thread</span>
        {handoffs === 0 ? (
          <p>You just got here. Click anywhere and this comes with you.</p>
        ) : (
          <p>
            {route.length} pages, {knots} knots. Nothing dropped at the handoff.
          </p>
        )}
      </div>

      <div className="thread-ledger-weave" style={{ ["--rooms" as string]: shown.length }}>
        <svg viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
          {heat ? <path d={heat} className="is-heat" /> : null}
          {cold ? <path d={cold} className="is-cold" /> : null}
          {d ? (
            <>
              <path d={d} className="ts-edge" />
              <path d={d} className="ts-face" />
              <path d={d} className="ts-inlay-solid" />
            </>
          ) : null}
        </svg>
        <ol>
          {shown.map((room, i) => {
            const current = i === shown.length - 1;
            return (
              <li
                key={`${room.path}-${i}`}
                className={current ? "is-current" : ""}
                style={{ ["--y" as string]: (pts[i][1] / 60).toFixed(3) }}
              >
                <i aria-hidden="true" data-thread-end={i === 0 ? "" : undefined} />
                <strong>{room.title}</strong>
                <span>
                  {room.total ? `${room.knots}/${room.total} knots` : "arriving"}
                  {current ? " · here" : ""}
                </span>
              </li>
            );
          })}
        </ol>
        {earlier > 0 ? <small className="thread-ledger-earlier">+{earlier} earlier</small> : null}
      </div>

      <div className="thread-ledger-close">
        <a href={mailto(route)} className="v4-text-link">
          Hand me the thread <span aria-hidden="true">↗</span>
        </a>
        <small>Stays in this tab. Only leaves if you send it.</small>
      </div>
    </section>
  );
}
