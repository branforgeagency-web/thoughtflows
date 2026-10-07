import * as React from "react"

/*
 * Polaroid Line Carousel — instant photos pegged to a sagging string. Drag the
 * line (or use the arrows) and the prints slide along it, swinging on their
 * pegs with the speed you give them and settling back with a little
 * overshoot; even at rest they sway in a light breeze. The one in the middle
 * is the one you're looking at.
 *
 * Drag, click a print, ←/→ and autoplay. `renderActions` adds links/buttons
 * for the active print under its caption.
 */

export type Slide = {
  image?: string
  title?: string
  /** Short line under the title in the caption bar. */
  subtitle?: string
  caption?: string
  alt?: string
  /** Small badge on the photo, e.g. "Station 01". */
  tag?: string
}

export type PolaroidLineCarouselProps<T extends Slide = Slide> = {
  slides: T[]
  /** Any CSS length. */
  height?: number | string
  /** Width of a print in px (it shrinks on narrow screens). */
  cardWidth?: number
  /** How far the string sags in the middle, px. */
  sag?: number
  /** How much the prints swing; 0 holds them still. */
  swing?: number
  /** ms per print; 0 turns autoplay off. It waits while someone is interacting. */
  autoplay?: number
  /** Colour of the string. */
  string?: string
  background?: string
  ink?: string
  accent?: string
  renderActions?: (slide: T, index: number) => React.ReactNode
  onChange?: (index: number) => void
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
}

// #region logic
function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v))
}

/** Height of a string sagging by `sag` between (0, y0) and (w, y0), at x. */
function stringY(x: number, w: number, y0: number, sag: number): number {
  const t = clamp(x / w, 0, 1)
  return y0 + 4 * sag * t * (1 - t)
}

/** One step of a critically damped spring toward target. */
function springStep(x: number, v: number, target: number, dt: number, k = 70): [number, number] {
  const c = 2 * Math.sqrt(k)
  const nv = v + (k * (target - x) - c * v) * dt
  return [x + nv * dt, nv]
}

/** One step of a print's swing. lineVel is the prints' on-screen speed (px/s, + = moving right); a print lags behind the motion, is pulled back by gravity and damped. */
function swingStep(a: number, w: number, lineVel: number, dt: number, gain: number): [number, number] {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt
  return [clamp(a + nw * dt, -0.6, 0.6), nw]
}

/** Index of the print nearest the centre for a line offset. */
function nearestAt(off: number, spacing: number, n: number): number {
  return clamp(Math.round(off / spacing), 0, Math.max(0, n - 1))
}

function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n)
}
// #endregion logic

const PL_CSS = [
  ".pl-root{position:relative;width:100%;overflow:hidden;background:var(--pl-bg);color:var(--pl-ink);user-select:none;-webkit-user-select:none;touch-action:pan-y;outline:none;cursor:grab}",
  ".pl-root[data-drag='1']{cursor:grabbing}",
  ".pl-root:focus-visible{box-shadow:inset 0 0 0 2px var(--pl-accent);border-radius:24px}",
  ".pl-string{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}",
  ".pl-card{position:absolute;left:0;top:0;width:var(--pl-cw);transform-origin:50% 0;will-change:transform;cursor:inherit}",
  ".pl-print{margin-top:10px;background:#fff;padding:10px 10px 0;border-radius:3px;box-shadow:0 1px 2px rgba(6,59,122,.12),0 22px 36px -18px rgba(6,59,122,.45);transition:transform .5s cubic-bezier(.2,.7,.2,1),filter .5s ease}",
  ".pl-card[data-on='0'] .pl-print{transform:scale(.9);filter:saturate(.7) brightness(.97)}",
  ".pl-shot{position:relative;aspect-ratio:1;overflow:hidden;background:#dfe9f2}",
  ".pl-shot img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;pointer-events:none}",
  ".pl-tag{position:absolute;left:8px;top:8px;display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:999px;background:rgba(255,255,255,.95);font:700 9px/1 'Plus Jakarta Sans',system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--pl-ink);box-shadow:0 1px 3px rgba(0,0,0,.12)}",
  ".pl-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--pl-accent)}",
  ".pl-note{height:48px;display:flex;align-items:center;justify-content:center;padding:0 6px;font:600 24px/1 Caveat,'Segoe Print',cursive;color:var(--pl-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".pl-peg{position:absolute;left:50%;top:0;width:10px;height:26px;margin-left:-5px;border-radius:2px;background:linear-gradient(90deg,#c9a67a,#e3c9a1 45%,#b8915f);box-shadow:0 2px 3px rgba(0,0,0,.25)}",
  ".pl-peg::after{content:'';position:absolute;left:4px;top:8px;width:2px;height:7px;background:rgba(80,60,30,.45);border-radius:1px}",
  ".pl-bar{position:absolute;left:clamp(8px,2vw,24px);right:clamp(8px,2vw,24px);bottom:clamp(12px,3vh,28px);display:flex;align-items:flex-end;gap:clamp(12px,2vw,24px);cursor:default}",
  ".pl-info{flex:1;min-width:0}",
  ".pl-cap{overflow:hidden;padding-bottom:.15em}",
  ".pl-cap>*{display:block;animation:pl-in .55s cubic-bezier(.2,.8,.2,1) both}",
  ".pl-title{font:800 clamp(18px,2vw,24px)/1.15 'Plus Jakarta Sans',system-ui,sans-serif;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".pl-subtitle{margin-top:4px;font:700 11px/1.3 'Plus Jakarta Sans',system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--pl-accent-ink)}",
  ".pl-sub{margin-top:6px;font:400 13px/1.45 'Plus Jakarta Sans',system-ui,sans-serif;color:var(--pl-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".pl-actions{margin-top:10px;display:flex;flex-wrap:wrap;align-items:center;gap:8px 20px}",
  ".pl-nav{display:flex;align-items:center;gap:10px;flex-shrink:0}",
  ".pl-count{margin-right:4px;font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;color:var(--pl-muted)}",
  ".pl-count b{color:var(--pl-ink);font-weight:700}",
  ".pl-btn{appearance:none;width:44px;height:44px;border-radius:50%;border:1px solid var(--pl-line);background:#fff;color:inherit;display:grid;place-items:center;cursor:pointer;box-shadow:0 8px 20px -12px rgba(6,59,122,.35);transition:background .2s ease,color .2s ease,border-color .2s ease}",
  ".pl-btn:hover{background:var(--pl-ink);border-color:var(--pl-ink);color:#fff}",
  ".pl-btn:focus-visible{outline:2px solid var(--pl-accent);outline-offset:2px}",
  ".pl-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}",
  "@media (max-width:639px){.pl-bar{flex-direction:column;align-items:stretch;gap:12px}.pl-nav{justify-content:space-between}.pl-count{order:-1}}",
  "@keyframes pl-in{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}",
  "@media (prefers-reduced-motion:reduce){.pl-cap>*{animation:none}.pl-print{transition:none}}",
].join("\n")

export default function PolaroidLineCarousel<T extends Slide = Slide>({
  slides,
  height = "clamp(600px, 82vh, 720px)",
  cardWidth = 280,
  sag = 40,
  swing = 1,
  autoplay = 5000,
  string = "rgba(6,59,122,.45)",
  background = "transparent",
  ink = "#0A2540",
  accent = "#12BFD1",
  renderActions,
  onChange,
  className,
  style,
  ariaLabel = "Image carousel",
}: PolaroidLineCarouselProps<T>) {
  const n = slides.length
  const [active, setActive] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const [size, setSize] = React.useState({ w: 1200, h: 700, cw: cardWidth })
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const pathRef = React.useRef<SVGPathElement | null>(null)
  const cards = React.useRef<(HTMLDivElement | null)[]>([])
  const sim = React.useRef({ off: 0, vel: 0, target: 0, a: [] as number[], w: [] as number[] })
  const drag = React.useRef<null | { x: number; off: number; lx: number; lt: number; v: number; moved: boolean }>(null)
  const lastTouch = React.useRef(0)
  const activeRef = React.useRef(0)
  const opts = React.useRef({ sag, swing })
  opts.current = { sag, swing }

  const spacing = size.cw * 1.08
  const goTo = React.useCallback(
    (i: number) => {
      sim.current.target = clamp(i, 0, n - 1) * spacing
    },
    [n, spacing],
  )

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver(() => {
      const r = root.getBoundingClientRect()
      // narrow screens: a bigger print with just the neighbours peeking in
      const share = r.width < 640 ? 0.62 : 0.42
      const cw = Math.round(Math.max(150, Math.min(cardWidth, r.width * share, r.height * 0.42)))
      setSize({ w: r.width, h: r.height, cw })
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [cardWidth])

  // keep the target on the active print when the spacing changes
  React.useEffect(() => {
    sim.current.target = activeRef.current * spacing
    sim.current.off = activeRef.current * spacing
  }, [spacing])

  React.useEffect(() => {
    onChange?.(active)
  }, [active, onChange])

  // the simulation, written straight to the DOM each frame
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let visible = true
    let raf = 0
    let prev = performance.now()
    const S = sim.current
    const frame = (now: number) => {
      raf = 0
      if (!visible) return
      const dt = Math.min(0.033, (now - prev) / 1000)
      prev = now
      const { w, h, cw } = size
      const y0 = Math.max(28, h * 0.08)
      const d = drag.current
      let lineVel: number
      if (d && d.moved) {
        lineVel = d.v * 1000
      } else {
        const before = S.off
        ;[S.off, S.vel] = springStep(S.off, S.vel, S.target, dt)
        lineVel = -(S.off - before) / Math.max(dt, 1e-3)
      }
      const o = opts.current
      const g = reduce ? 0 : o.swing
      const near = nearestAt(S.off, spacing, n)
      for (let i = 0; i < n; i++) {
        const el = cards.current[i]
        if (!el) continue
        const x = w / 2 + i * spacing - S.off
        if (x < -cw * 1.5 || x > w + cw * 1.5) {
          el.style.visibility = "hidden"
          continue
        }
        el.style.visibility = "visible"
        let a = S.a[i] || 0
        let av = S.w[i] || 0
        ;[a, av] = swingStep(a, av, lineVel, dt, g)
        if (g) a += Math.sin(now / 1300 + i * 1.7) * 0.0009 * g
        S.a[i] = a
        S.w[i] = av
        const y = stringY(x, w, y0, o.sag) - 6
        el.style.transform = "translate(" + (x - cw / 2).toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + a.toFixed(4) + "rad)"
        el.style.zIndex = String(i === near ? n + 1 : n - Math.abs(i - near))
      }
      pathRef.current?.setAttribute("d", "M0 " + y0 + " Q" + w / 2 + " " + (y0 + 2 * o.sag) + " " + w + " " + y0)
      if (near !== activeRef.current) {
        activeRef.current = near
        setActive(near)
      }
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) {
        prev = performance.now()
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(root)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [size, spacing, n])

  // autoplay, back to the first print after the last
  React.useEffect(() => {
    if (!autoplay || n < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = window.setInterval(() => {
      if (document.hidden || drag.current || performance.now() - lastTouch.current < autoplay) return
      goTo(activeRef.current >= n - 1 ? 0 : activeRef.current + 1)
    }, autoplay)
    return () => window.clearInterval(t)
  }, [autoplay, n, goTo])

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".pl-bar")) return
    lastTouch.current = performance.now()
    drag.current = { x: e.clientX, off: sim.current.off, lx: e.clientX, lt: e.timeStamp, v: 0, moved: false }
  }
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      setDragging(true)
      rootRef.current?.setPointerCapture(e.pointerId)
    }
    if (!d.moved) return
    const dt = Math.max(1, e.timeStamp - d.lt)
    d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v
    d.lx = e.clientX
    d.lt = e.timeStamp
    const max = (n - 1) * spacing
    let off = d.off - dx
    if (off < 0) off *= 0.35
    if (off > max) off = max + (off - max) * 0.35
    sim.current.off = off
  }
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current
    drag.current = null
    lastTouch.current = performance.now()
    if (!d) return
    if (d.moved) {
      setDragging(false)
      sim.current.vel = -d.v * 1000
      goTo(nearestAt(sim.current.off - d.v * 180, spacing, n))
      return
    }
    const card = (e.target as HTMLElement).closest("[data-i]")
    if (card) goTo(Number(card.getAttribute("data-i")))
  }
  const step = (dir: number) => {
    lastTouch.current = performance.now()
    goTo(clamp(activeRef.current + dir, 0, n - 1))
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return
    if (e.key === "ArrowRight") step(1)
    else if (e.key === "ArrowLeft") step(-1)
    else return
    e.preventDefault()
  }

  if (!n) return null
  const s = slides[active] || slides[0]

  return (
    <div
      ref={rootRef}
      className={["pl-root", className].filter(Boolean).join(" ")}
      style={{
        height,
        ["--pl-bg" as string]: background,
        ["--pl-ink" as string]: ink,
        ["--pl-accent" as string]: accent,
        ["--pl-accent-ink" as string]: "color-mix(in srgb, var(--pl-accent) 70%, var(--pl-ink))",
        ["--pl-muted" as string]: "color-mix(in srgb, var(--pl-ink) 60%, transparent)",
        ["--pl-line" as string]: "color-mix(in srgb, var(--pl-ink) 14%, transparent)",
        ["--pl-cw" as string]: size.cw + "px",
        ...style,
      }}
      data-drag={dragging ? "1" : "0"}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <style>{PL_CSS}</style>
      <svg className="pl-string" aria-hidden="true">
        <path ref={pathRef} fill="none" stroke={string} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {slides.map((sl, i) => (
        <div
          key={i}
          className="pl-card"
          data-i={i}
          data-on={i === active ? "1" : "0"}
          ref={(el) => void (cards.current[i] = el)}
          aria-hidden={i === active ? undefined : true}
        >
          <div className="pl-print">
            <div className="pl-shot">
              {sl.image ? <img src={sl.image} alt={sl.alt || sl.title || ""} loading="lazy" draggable={false} /> : null}
              {sl.tag ? <span className="pl-tag">{sl.tag}</span> : null}
            </div>
            <div className="pl-note">{sl.title || ""}</div>
          </div>
          <div className="pl-peg" />
        </div>
      ))}
      <div className="pl-bar">
        <div className="pl-info">
          <div className="pl-cap" key={active} aria-hidden="true">
            {s.title ? <span className="pl-title">{s.title}</span> : null}
            {s.subtitle ? <span className="pl-subtitle">{s.subtitle}</span> : null}
            {s.caption ? <span className="pl-sub">{s.caption}</span> : null}
          </div>
          {renderActions ? <div className="pl-actions">{renderActions(s, active)}</div> : null}
        </div>
        <div className="pl-nav">
          <span className="pl-count" aria-hidden="true">
            <b>{pad2(active + 1)}</b> / {pad2(n)}
          </span>
          <span style={{ display: "flex", gap: 10 }}>
            <button type="button" className="pl-btn" aria-label="Previous" onClick={() => step(-1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <button type="button" className="pl-btn" aria-label="Next" onClick={() => step(1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </span>
        </div>
      </div>
      <div className="pl-sr" aria-live="polite">
        {"Print " + (active + 1) + " of " + n + (s.title ? ": " + s.title : "")}
      </div>
    </div>
  )
}
