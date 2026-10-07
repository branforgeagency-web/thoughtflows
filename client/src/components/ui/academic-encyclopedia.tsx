import * as React from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight,
  Atom,
  BookOpen,
  Brain,
  ChevronLeft,
  ChevronRight,
  Cog,
  Cpu,
  Dna,
  Feather,
  FlaskConical,
  Hourglass,
  Landmark,
  Lightbulb,
  Palette,
  Scale,
  Sigma,
  Stethoscope,
  Volume2,
  VolumeX,
} from "lucide-react"
import { ACADEMIC_BRANCHES } from "@/data/academicBranches"

gsap.registerPlugin(ScrollTrigger)

/*
 * Academic Encyclopedia: a leather-bound volume that opens, turns and closes
 * as you scroll. The stage is sticky (the book stays pinned in the centre)
 * and one scrubbed ScrollTrigger drives a single number `t`:
 *
 *   desktop  t: 0 → N+2   unit 0 opens the cover, unit k (1..N) turns leaf k,
 *                         unit N+1 closes the back board. At rest on integer
 *                         t = k the open spread shows branch k.
 *   mobile   t: 0 → N+1   single pages that flip upward over the top edge.
 *
 * Every leaf is a two-faced element rotated around the spine. Transforms are
 * written straight to the DOM (no React renders while scrolling), only the
 * leaves next to the open spread stay visible, and snapping lands each scroll
 * gesture on a whole page.
 */

export type AcademicBranch = {
  id: string
  name: string
  epithet?: string
  /** A lucide icon name from ICONS below, or any icon component. */
  icon?: string | React.ComponentType<{ size?: number | string; strokeWidth?: number }>
  intro: string
  subjects: string[]
  careers: string[]
  href?: string
}

export type AcademicEncyclopediaProps = {
  branches?: AcademicBranch[]
  /** Cover title, split at " of " onto two lines. */
  title?: string
  publisher?: string
  ctaLabel?: string
  finisCta?: { label: string; href: string }
  /** Client-side navigation for internal links (e.g. react-router's navigate). */
  onNavigate?: (href: string) => void
  /** Scroll distance per page turn, in vh. */
  scrollPerPage?: number
  /** Height of any fixed site header the pinned stage must clear, in px. */
  topOffset?: number
  id?: string
  className?: string
}

const ICONS: Record<string, AcademicBranch["icon"]> = {
  Sigma, Atom, FlaskConical, Dna, Stethoscope, Cog, Cpu, Landmark, Scale, Brain, Hourglass, Feather, Lightbulb, Palette, BookOpen,
}

const DEFAULT_FINIS_CTA = { label: "Begin Your Chapter", href: "/courses" }
const DESKTOP_QUERY = "(min-width: 900px) and (min-height: 560px)"
/** Fraction of each scroll unit that is a pause before/after the turn. */
const PAD = 0.12
const MAX_EDGE = 8

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const pad2 = (n: number) => String(n).padStart(2, "0")

function roman(n: number) {
  const map: [number, string][] = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]]
  let out = ""
  for (const [v, s] of map) while (n >= v) { out += s; n -= v }
  return out
}

/** Stacked 1px offsets drawn as box-shadows: the visible page edges of a block. */
function edgeShadow(n: number, dir: 1 | -1) {
  if (n <= 0) return "none"
  const out: string[] = []
  for (let i = 1; i <= n; i++) out.push(`${dir * i}px ${i * 0.6}px 0 ${i % 2 ? "#e9dcbc" : "#c9b48b"}`)
  out.push(`${dir * (n + 2)}px ${n * 0.6 + 3}px 6px rgba(0,0,0,.35)`)
  return out.join(",")
}

/* ------------------------------------------------------------------ */
/* Page-turn sound: synthesised paper rustle, muted until asked for.   */
/* ------------------------------------------------------------------ */

function useRustle() {
  const ctxRef = React.useRef<AudioContext | null>(null)
  const bufRef = React.useRef<AudioBuffer | null>(null)
  const [muted, setMuted] = React.useState(true)
  const mutedRef = React.useRef(true)

  const toggle = React.useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AC) return
      const ctx = new AC()
      const len = Math.floor(ctx.sampleRate * 0.6)
      const buf = ctx.createBuffer(1, len, ctx.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (0.35 + 0.65 * Math.pow(Math.random(), 7))
      ctxRef.current = ctx
      bufRef.current = buf
    }
    void ctxRef.current.resume()
    mutedRef.current = !mutedRef.current
    setMuted(mutedRef.current)
  }, [])

  const play = React.useCallback(() => {
    const ctx = ctxRef.current
    if (mutedRef.current || !ctx || !bufRef.current) return
    const now = ctx.currentTime
    const src = ctx.createBufferSource()
    src.buffer = bufRef.current
    const bp = ctx.createBiquadFilter()
    bp.type = "bandpass"
    bp.Q.value = 0.9
    bp.frequency.setValueAtTime(900, now)
    bp.frequency.exponentialRampToValueAtTime(3400, now + 0.16)
    bp.frequency.exponentialRampToValueAtTime(1300, now + 0.45)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.2, now + 0.04)
    g.gain.exponentialRampToValueAtTime(0.06, now + 0.22)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.55)
    src.connect(bp).connect(g).connect(ctx.destination)
    src.start(now)
    src.stop(now + 0.6)
  }, [])

  React.useEffect(() => () => void ctxRef.current?.close(), [])
  return { muted, toggle, play }
}

/* ------------------------------------------------------------------ */
/* Ornaments                                                           */
/* ------------------------------------------------------------------ */

function Corner({ className }: { className: string }) {
  return (
    <svg className={`aen-corner ${className}`} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M3 3H40M3 3V40M9 9H30M9 9V30" />
      <path d="M9 9c13 0 17 12 8 15c-6 2-8-6-3-7" />
      <path d="M9 9c0 13 12 17 15 8c2-6-6-8-7-3" />
      <circle cx="9" cy="9" r="2.6" />
      <path d="M40 3c5 0 7 3 12 3M3 40c0 5 3 7 3 12" />
    </svg>
  )
}

function Rule({ className = "" }: { className?: string }) {
  return (
    <svg className={`aen-rule ${className}`} viewBox="0 0 200 14" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <path d="M4 7H82M118 7H196" />
      <path d="M82 7c6-6 10-6 14 0c-4 6-8 6-14 0zM118 7c-6-6-10-6-14 0c4 6 8 6 14 0z" />
      <path d="M100 1l6 6l-6 6l-6-6z" className="aen-rule__gem" />
    </svg>
  )
}

function BranchIcon({ icon, size }: { icon: AcademicBranch["icon"]; size: string }) {
  const Icon = (typeof icon === "string" ? ICONS[icon] : icon) as React.ComponentType<{ size?: number | string; strokeWidth?: number }> | undefined
  const Comp = Icon ?? BookOpen
  return <Comp size={size} strokeWidth={1.1} />
}

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

type LinkProps = { href?: string; onNavigate?: (href: string) => void; className?: string; children: React.ReactNode }

function BookLink({ href = "#", onNavigate, className, children }: LinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (onNavigate && href.startsWith("/")) {
          e.preventDefault()
          onNavigate(href)
        }
      }}
    >
      {children}
    </a>
  )
}

function LeftPage({ b, index, total }: { b: AcademicBranch; index: number; total: number }) {
  return (
    <div className="aen-page aen-page--left">
      <p className="aen-runhead">Chapter {roman(index + 1)} <span>of {roman(total)}</span></p>
      <Rule />
      <h3 className="aen-title">{b.name}</h3>
      {b.epithet && <p className="aen-epithet">{b.epithet}</p>}
      <div className="aen-medallion" aria-hidden="true">
        <span className="aen-medallion__ring" />
        <BranchIcon icon={b.icon} size="46%" />
      </div>
      <p className="aen-intro">{b.intro}</p>
      <span className="aen-folio">{(index + 1) * 2}</span>
    </div>
  )
}

function RightPage({ b, index, title, ctaLabel, onNavigate }: { b: AcademicBranch; index: number; title: string; ctaLabel: string; onNavigate?: (href: string) => void }) {
  return (
    <div className="aen-page aen-page--right">
      <p className="aen-runhead aen-runhead--italic">{title}</p>
      <h4 className="aen-label"><span>Key Subjects</span></h4>
      <ul className="aen-subjects">
        {b.subjects.map((s) => <li key={s}>{s}</li>)}
      </ul>
      <Rule className="aen-rule--soft" />
      <h4 className="aen-label"><span>Career Opportunities</span></h4>
      <ol className="aen-careers">
        {b.careers.map((c, i) => (
          <li key={c}><em>{roman(i + 1).toLowerCase()}.</em> {c}</li>
        ))}
      </ol>
      <div className="aen-cta-row">
        <BookLink href={b.href} onNavigate={onNavigate} className="aen-cta">
          {ctaLabel} <span className="sr-only">: {b.name}</span>
          <ArrowRight size="1.05em" strokeWidth={1.5} aria-hidden="true" />
        </BookLink>
      </div>
      <span className="aen-folio">{(index + 1) * 2 + 1}</span>
    </div>
  )
}

function MobilePage({ b, index, total, ctaLabel, onNavigate }: { b: AcademicBranch; index: number; total: number; ctaLabel: string; onNavigate?: (href: string) => void }) {
  return (
    <div className="aen-page aen-page--mobile">
      <div className="aen-m-head">
        <span className="aen-m-icon" aria-hidden="true"><BranchIcon icon={b.icon} size="58%" /></span>
        <p className="aen-runhead">Chapter {roman(index + 1)} <span>of {roman(total)}</span></p>
      </div>
      <h3 className="aen-title">{b.name}</h3>
      {b.epithet && <p className="aen-epithet">{b.epithet}</p>}
      <Rule />
      <p className="aen-intro">{b.intro}</p>
      <h4 className="aen-label"><span>Key Subjects</span></h4>
      <p className="aen-inline">{b.subjects.join(" · ")}</p>
      <h4 className="aen-label"><span>Career Opportunities</span></h4>
      <p className="aen-inline aen-inline--italic">{b.careers.join(" · ")}</p>
      <div className="aen-cta-row">
        <BookLink href={b.href} onNavigate={onNavigate} className="aen-cta">
          {ctaLabel} <span className="sr-only">: {b.name}</span>
          <ArrowRight size="1.05em" strokeWidth={1.5} aria-hidden="true" />
        </BookLink>
      </div>
      <span className="aen-folio">{index + 1}</span>
    </div>
  )
}

function CoverFront({ title, publisher, total, year }: { title: string; publisher: string; total: number; year: string }) {
  const cut = title.indexOf(" of ")
  const top = cut > 0 ? title.slice(0, cut) : ""
  const main = cut > 0 ? title.slice(cut + 1) : title
  return (
    <div className="aen-leather aen-cover">
      <span className="aen-hinge" />
      <span className="aen-frame aen-frame--outer" />
      <span className="aen-frame aen-frame--inner" />
      <Corner className="is-tl" /><Corner className="is-tr" /><Corner className="is-bl" /><Corner className="is-br" />
      <div className="aen-cover__body">
        <p className="aen-cover__vol">Volume {roman(1)} · {year}</p>
        <Rule className="aen-rule--gold" />
        <h2 className="aen-cover__title">
          {top && <span className="aen-cover__top">{top}</span>}
          <span className="aen-cover__main">{main}</span>
        </h2>
        <div className="aen-crest" aria-hidden="true">
          <span className="aen-crest__rays" />
          <span className="aen-crest__ring" />
          <BookOpen size="40%" strokeWidth={1} />
        </div>
        <p className="aen-cover__sub">{total} Branches of Learning</p>
        <Rule className="aen-rule--gold" />
        <p className="aen-cover__imprint">{publisher}</p>
      </div>
    </div>
  )
}

function BackCover({ publisher }: { publisher: string }) {
  return (
    <div className="aen-leather aen-cover aen-cover--back">
      <span className="aen-hinge aen-hinge--right" />
      <span className="aen-frame aen-frame--outer" />
      <Corner className="is-tl" /><Corner className="is-tr" /><Corner className="is-bl" /><Corner className="is-br" />
      <div className="aen-cover__body">
        <div className="aen-crest aen-crest--small" aria-hidden="true">
          <span className="aen-crest__ring" />
          <Feather size="44%" strokeWidth={1} />
        </div>
        <p className="aen-cover__imprint">{publisher}</p>
      </div>
    </div>
  )
}

/** Board interior: leather turn-in around a pasted-down sheet of paper. */
function Pastedown({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  return (
    <div className="aen-leather aen-inside">
      <div className={`aen-paper aen-pastedown aen-pastedown--${side}`}>{children}</div>
    </div>
  )
}

function FinisPage({ cta, onNavigate, compact }: { cta: { label: string; href: string }; onNavigate?: (href: string) => void; compact?: boolean }) {
  return (
    <div className={`aen-page aen-page--finis ${compact ? "is-compact" : ""}`}>
      <Rule />
      <p className="aen-finis">Finis</p>
      <p className="aen-epithet">Here ends the Encyclopedia of Academic Branches.</p>
      <p className="aen-intro aen-intro--center">Every branch began with a single question. Yours could begin with the next one you ask.</p>
      <Rule className="aen-rule--soft" />
      <div className="aen-cta-row">
        <BookLink href={cta.href} onNavigate={onNavigate} className="aen-cta">
          {cta.label} <ArrowRight size="1.05em" strokeWidth={1.5} aria-hidden="true" />
        </BookLink>
      </div>
    </div>
  )
}

function Colophon({ publisher, year }: { publisher: string; year: string }) {
  return (
    <div className="aen-page aen-page--colophon">
      <div className="aen-bookplate">
        <p className="aen-bookplate__ex">Ex Libris</p>
        <Rule />
        <p className="aen-bookplate__name">{publisher}</p>
        <p className="aen-epithet">Set in Cormorant &amp; Cinzel, bound in leather, {year}</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

type Leaf = { key: string; board?: boolean; front: React.ReactNode; back: React.ReactNode }

export default function AcademicEncyclopedia({
  branches = ACADEMIC_BRANCHES as AcademicBranch[],
  title = "The Encyclopedia of Academic Branches",
  publisher = "Thoughtflows Academy",
  ctaLabel = "Explore Branch",
  finisCta = DEFAULT_FINIS_CTA,
  onNavigate,
  scrollPerPage = 85,
  topOffset = 112,
  id,
  className = "",
}: AcademicEncyclopediaProps) {
  const N = branches.length
  const year = React.useMemo(() => roman(new Date().getFullYear()), [])

  const [desktop, setDesktop] = React.useState(() => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches)
  React.useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const on = () => setDesktop(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  const units = desktop ? N + 2 : N + 1
  const [current, setCurrent] = React.useState(0)
  const { muted, toggle, play } = useRustle()
  const playRef = React.useRef(play)
  playRef.current = play

  const sectionRef = React.useRef<HTMLElement>(null)
  const bookRef = React.useRef<HTMLDivElement>(null)
  const leafRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const fxRef = React.useRef<Record<string, HTMLElement | null>>({})
  const stRef = React.useRef<ScrollTrigger | null>(null)

  // Fonts for the volume only (not loaded site-wide).
  React.useEffect(() => {
    const href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
    if (document.querySelector(`link[href="${href}"]`)) return
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = href
    document.head.appendChild(link)
  }, [])

  // CSS smooth scrolling fights ScrollTrigger's snapping; turn it off while mounted.
  React.useEffect(() => {
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = "auto"
    return () => { html.style.scrollBehavior = prev }
  }, [])

  // Leaves are memoised so HUD state changes never re-render the pages.
  const leaves: Leaf[] = React.useMemo(() => {
    if (desktop) {
      return [
        { key: "cover", board: true, front: <CoverFront title={title} publisher={publisher} total={N} year={year} />, back: <Pastedown side="left"><LeftPage b={branches[0]} index={0} total={N} /></Pastedown> },
        ...branches.map((b, i) => ({
          key: b.id,
          front: <div className="aen-paper"><RightPage b={b} index={i} title={title} ctaLabel={ctaLabel} onNavigate={onNavigate} /></div>,
          back: <div className="aen-paper">{i < N - 1 ? <LeftPage b={branches[i + 1]} index={i + 1} total={N} /> : <FinisPage cta={finisCta} onNavigate={onNavigate} />}</div>,
        })),
        { key: "back", board: true, front: <Pastedown side="right"><Colophon publisher={publisher} year={year} /></Pastedown>, back: <BackCover publisher={publisher} /> },
      ]
    }
    return [
      { key: "cover", board: true, front: <CoverFront title={title} publisher={publisher} total={N} year={year} />, back: <div className="aen-leather aen-inside" /> },
      ...branches.map((b, i) => ({
        key: b.id,
        front: <div className="aen-paper"><MobilePage b={b} index={i} total={N} ctaLabel={ctaLabel} onNavigate={onNavigate} /></div>,
        back: <div className="aen-paper aen-paper--verso" />,
      })),
    ]
  }, [desktop, branches, title, publisher, ctaLabel, finisCta, onNavigate, N, year])

  React.useLayoutEffect(() => {
    const section = sectionRef.current
    const book = bookRef.current
    if (!section || !book) return
    const els = leafRefs.current.slice(0, leaves.length) as HTMLDivElement[]
    const last = els.length - 1
    const fx = fxRef.current
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const state = { t: 0 }
    const cache = els.map(() => ({ tr: "", z: -1, vis: "", l: "", o: "" }))
    let pw = 0
    let lastCurrent = -1
    let lastActive = -1
    let lastL = -1
    let lastR = -1
    let lastBook = ""

    const measure = () => { pw = desktop ? book.offsetWidth / 2 : book.offsetWidth }

    const progressOf = (j: number, t: number) => {
      const u = t - j
      const local = reduce ? (u >= 0.5 ? 1 : 0) : clamp01((u - PAD) / (1 - 2 * PAD))
      return easeInOut(local)
    }

    const render = () => {
      const t = state.t
      const fl = Math.floor(t)
      let active = -1
      let activeP = 0
      let flipped = 0
      let unflipped = 0
      for (let j = 0; j <= last; j++) {
        const el = els[j]
        const c = cache[j]
        const p = progressOf(j, t)
        const lift = Math.sin(Math.PI * p)
        if (p > 0 && p < 1) { active = j; activeP = p }
        if (j > 0 && j < last || !desktop) { if (p >= 1) flipped++; else if (p <= 0) unflipped++ }

        let tr: string, z: number, vis: boolean, o = "1"
        if (desktop) {
          tr = p <= 0 ? "none" : `rotateY(${(-180 * p).toFixed(2)}deg)`
          z = p <= 0 ? 300 - 2 * j : p >= 1 ? 20 + 2 * j : 500
          vis = j === 0 || j === last || (j >= fl - 1 && j <= fl + 1)
        } else {
          tr = p <= 0 ? "none" : `rotateX(${(172 * p).toFixed(2)}deg)`
          z = p <= 0 ? 300 - 2 * j : 500
          vis = p < 1 && j <= fl + 1
          o = (1 - clamp01((p - 0.45) / 0.4)).toFixed(3)
        }
        if (tr !== c.tr) { el.style.transform = tr; c.tr = tr }
        if (z !== c.z) { el.style.zIndex = String(z); c.z = z }
        const v = vis ? "visible" : "hidden"
        if (v !== c.vis) { el.style.visibility = v; c.vis = v }
        const l = lift.toFixed(3)
        if (l !== c.l) { el.style.setProperty("--l", l); c.l = l }
        if (o !== c.o) { el.style.opacity = o; c.o = o }
      }

      // Book position: closed centred → open spread → closed centred again.
      const p0 = progressOf(0, t)
      const pEnd = desktop ? progressOf(last, t) : 0
      const shift = desktop ? (-0.5 * (1 - p0) + 0.5 * pEnd) * pw : 0
      const scale = 1 - 0.07 * (1 - p0) - 0.07 * pEnd
      const bookTr = `translate3d(${shift.toFixed(1)}px,0,0) scale(${scale.toFixed(4)})`
      if (bookTr !== lastBook) { book.style.transform = bookTr; lastBook = bookTr }

      if (fx.shadowL) fx.shadowL.style.opacity = desktop ? p0.toFixed(3) : "0"
      if (fx.shadowR) fx.shadowR.style.opacity = desktop ? (1 - pEnd).toFixed(3) : "1"
      if (fx.spine) fx.spine.style.opacity = desktop ? (p0 * (1 - pEnd)).toFixed(3) : "0"

      // Cast shadow of the turning leaf onto the page beneath it.
      const lift = active >= 0 ? Math.sin(Math.PI * activeP) : 0
      const cos = Math.cos(Math.PI * activeP)
      if (desktop) {
        if (fx.castR) { fx.castR.style.opacity = activeP < 0.5 ? (lift * 0.85).toFixed(3) : "0"; fx.castR.style.transform = `scaleX(${Math.max(0, cos).toFixed(3)})` }
        if (fx.castL) { fx.castL.style.opacity = activeP >= 0.5 ? (lift * 0.85).toFixed(3) : "0"; fx.castL.style.transform = `scaleX(${Math.max(0, -cos).toFixed(3)})` }
        const n = last - 1
        const lN = flipped > 0 ? Math.max(1, Math.round((MAX_EDGE * flipped) / n)) : 0
        const rN = unflipped > 0 && p0 > 0 ? Math.max(1, Math.round((MAX_EDGE * unflipped) / n)) : 0
        if (lN !== lastL && fx.blockL) { fx.blockL.style.boxShadow = edgeShadow(lN, -1); fx.blockL.style.visibility = lN ? "visible" : "hidden"; lastL = lN }
        if (rN !== lastR && fx.blockR) { fx.blockR.style.boxShadow = edgeShadow(rN, 1); fx.blockR.style.visibility = rN ? "visible" : "hidden"; lastR = rN }
      } else if (fx.castR) {
        fx.castR.style.opacity = (lift * 0.7).toFixed(3)
      }

      if (active !== lastActive) {
        if (active >= 0) playRef.current()
        lastActive = active
      }

      const cur = Math.min(units, Math.max(0, Math.round(t)))
      if (cur !== lastCurrent) {
        lastCurrent = cur
        setCurrent(cur)
        // Only the pages facing the reader take focus and clicks.
        els.forEach((el, j) => {
          if (j === cur || (desktop && j === cur - 1)) el.removeAttribute("inert")
          else el.setAttribute("inert", "")
        })
      }
    }

    measure()
    const ctx = gsap.context(() => {
      const tween = gsap.to(state, {
        t: units,
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: reduce ? true : 0.7,
          snap: reduce
            ? undefined
            : { snapTo: 1 / units, inertia: false, duration: { min: 0.25, max: 0.9 }, delay: 0.08, ease: "power1.inOut" },
          onRefresh: () => { measure(); render() },
        },
      })
      stRef.current = tween.scrollTrigger ?? null
    }, section)
    render()

    return () => {
      ctx.revert()
      stRef.current = null
    }
  }, [desktop, leaves, units])

  const jump = React.useCallback((k: number) => {
    const st = stRef.current
    if (!st) return
    const target = Math.min(units, Math.max(0, k))
    window.scrollTo({ top: st.start + ((st.end - st.start) * target) / units, behavior: "smooth" })
  }, [units])

  const chapter = current >= 1 && current <= N ? current : 0
  const label =
    current === 0 ? "The Cover" : chapter ? branches[chapter - 1].name : desktop && current === N + 2 ? "Volume Closed" : "Finis"

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`aen ${desktop ? "is-desktop" : "is-mobile"} ${className}`}
      style={{ height: `calc(100vh + ${units * scrollPerPage}vh)`, "--top": `${topOffset}px` } as React.CSSProperties}
      aria-label={title}
    >
      <style>{CSS}</style>
      <div className="aen-stage">
        <div className="aen-ambient" aria-hidden="true">
          <span className="aen-glow" />
          {Array.from({ length: 14 }, (_, i) => <i key={i} className="aen-mote" style={{ "--i": i } as React.CSSProperties} />)}
        </div>

        <div className="aen-scene">
          <div ref={bookRef} className="aen-book">
            <span ref={(el) => { fxRef.current.shadowL = el }} className="aen-ground aen-ground--l" aria-hidden="true" />
            <span ref={(el) => { fxRef.current.shadowR = el }} className="aen-ground aen-ground--r" aria-hidden="true" />
            <span ref={(el) => { fxRef.current.spine = el }} className="aen-spine" aria-hidden="true" />
            {desktop && (
              <>
                <span ref={(el) => { fxRef.current.blockL = el }} className="aen-block aen-block--l" aria-hidden="true" />
                <span ref={(el) => { fxRef.current.blockR = el }} className="aen-block aen-block--r" aria-hidden="true" />
              </>
            )}
            {!desktop && (
              <div className="aen-base">
                <div className="aen-leather aen-inside">
                  <div className="aen-paper aen-pastedown aen-pastedown--m">
                    <FinisPage cta={finisCta} onNavigate={onNavigate} compact />
                  </div>
                </div>
              </div>
            )}

            {leaves.map((leaf, j) => (
              <div
                key={leaf.key}
                ref={(el) => { leafRefs.current[j] = el }}
                className={`aen-leaf ${leaf.board ? "is-board" : "is-paper"}`}
              >
                <div className="aen-face aen-face--front">{leaf.front}<i className="aen-light" /></div>
                <div className="aen-face aen-face--back">{leaf.back}<i className="aen-light" /></div>
              </div>
            ))}

            <span ref={(el) => { fxRef.current.castR = el }} className="aen-cast aen-cast--r" aria-hidden="true" />
            {desktop && <span ref={(el) => { fxRef.current.castL = el }} className="aen-cast aen-cast--l" aria-hidden="true" />}
          </div>
        </div>

        <p className={`aen-hint ${current === 0 ? "" : "is-hidden"}`} aria-hidden="true">
          <span>Scroll to open the volume</span>
          <i />
        </p>

        <div className="aen-hud">
          <button type="button" className="aen-btn aen-sound" onClick={toggle} aria-pressed={!muted} aria-label={muted ? "Turn page sound on" : "Turn page sound off"}>
            {muted ? <VolumeX size={16} strokeWidth={1.5} /> : <Volume2 size={16} strokeWidth={1.5} />}
          </button>

          <div className="aen-progress">
            <p className="aen-count" aria-live="polite">
              <span className="aen-count__num">{chapter ? pad2(chapter) : "—"}</span>
              <span className="aen-count__sep">/</span>
              <span>{pad2(N)}</span>
              <span className="aen-count__name">{label}</span>
            </p>
            <ol className="aen-ticks">
              {branches.map((b, i) => (
                <li key={b.id}>
                  <button
                    type="button"
                    className={i + 1 === chapter ? "is-on" : i + 1 < current ? "is-past" : ""}
                    onClick={() => jump(i + 1)}
                    aria-label={`Chapter ${i + 1}: ${b.name}`}
                    aria-current={i + 1 === chapter ? "step" : undefined}
                  />
                </li>
              ))}
            </ol>
          </div>

          <div className="aen-nav">
            <button type="button" className="aen-skip" onClick={() => jump(units)}>
              Skip
            </button>
            <button type="button" className="aen-btn" onClick={() => jump(current - 1)} disabled={current <= 0} aria-label="Previous page">
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button type="button" className="aen-btn" onClick={() => jump(current + 1)} disabled={current >= units} aria-label="Next page">
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='.045 .09' numOctaves='4' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")"

const CSS = `
.aen {
  --leather-1: #6a3f24; --leather-2: #432615; --leather-3: #22120a;
  --gold-1: #f6e3a1; --gold-2: #cfa650; --gold-3: #8c6727;
  --gold: linear-gradient(135deg, #8c6727 0%, #f6e3a1 28%, #b8893a 50%, #f1d68a 72%, #7f5c21 100%);
  --ink: #3b2717; --ink-soft: #6e5239; --ink-faint: #9b8061;
  --paper-1: #f7efdc; --paper-2: #ecdfc1; --paper-3: #dcc79e;
  --bg: #120b06;
  position: relative;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Cormorant Garamond', 'Iowan Old Style', Georgia, serif;
}
.aen *, .aen *::before, .aen *::after { box-sizing: border-box; }
.aen .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }

/* Stage ---------------------------------------------------------------- */
.aen-stage {
  position: sticky; top: 0; height: 100vh; height: 100svh; overflow: hidden;
  display: grid; place-items: center;
  padding: var(--top) 16px 92px;
}
.aen-ambient { position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 58% 52% at 50% 50%, rgba(120,78,40,.38) 0%, rgba(60,36,18,.18) 45%, transparent 75%),
    radial-gradient(ellipse at 50% 120%, rgba(0,0,0,.6), transparent 60%),
    linear-gradient(180deg, #0c0704 0%, #1a100a 45%, #0d0805 100%);
}
.aen-glow { position: absolute; left: 50%; top: -20%; width: 70vw; height: 90vh; transform: translateX(-50%);
  background: conic-gradient(from 180deg at 50% 0%, transparent 160deg, rgba(255,214,150,.07) 175deg, rgba(255,214,150,.11) 180deg, rgba(255,214,150,.07) 185deg, transparent 200deg);
  filter: blur(10px);
}
.aen-mote { position: absolute; left: calc(8% + var(--i) * 6.3%); top: 100%; width: 3px; height: 3px; border-radius: 50%;
  background: rgba(255,220,160,.55); box-shadow: 0 0 6px rgba(255,210,140,.6);
  animation: aen-float calc(14s + var(--i) * 1.3s) linear calc(var(--i) * -2.1s) infinite; opacity: 0; }
@keyframes aen-float {
  0% { transform: translate3d(0,0,0); opacity: 0 }
  15% { opacity: .7 } 85% { opacity: .5 }
  100% { transform: translate3d(calc((var(--i) - 7) * 6px), -105vh, 0); opacity: 0 }
}

.aen-scene { position: relative; display: grid; place-items: center; width: 100%; height: 100%; }

/* Book geometry -------------------------------------------------------- */
.aen.is-desktop { --pw: min(42vw, calc((100vh - var(--top) - 116px) / 1.38)); --ph: calc(var(--pw) * 1.38); }
.aen.is-mobile { --pw: min(88vw, calc((100svh - var(--top) - 108px) / 1.5)); --ph: calc(var(--pw) * 1.5); }
.aen { --inset: calc(var(--pw) * .028); --fs: calc(var(--pw) / 28); }
.aen.is-mobile { --fs: calc(var(--pw) / 25.5); --inset: calc(var(--pw) * .03); }

.aen-book { position: relative; height: var(--ph); width: calc(var(--pw) * 2);
  perspective: calc(var(--pw) * 4.2); perspective-origin: 50% 45%;
  transform-origin: 50% 50%; will-change: transform; }
.aen.is-mobile .aen-book { width: var(--pw); perspective: calc(var(--ph) * 3.4); perspective-origin: 50% 0%; }

.aen-leaf { position: absolute; transform-style: preserve-3d; will-change: transform; --l: 0; }
.aen.is-desktop .aen-leaf { left: 50%; transform-origin: 0 50%; }
.aen.is-desktop .aen-leaf.is-board { top: 0; width: var(--pw); height: var(--ph); }
.aen.is-desktop .aen-leaf.is-paper { top: var(--inset); width: calc(var(--pw) - var(--inset)); height: calc(var(--ph) - var(--inset) * 2); }
.aen.is-mobile .aen-leaf { transform-origin: 50% 0; }
.aen.is-mobile .aen-leaf.is-board { inset: 0; }
.aen.is-mobile .aen-leaf.is-paper { top: 0; left: var(--inset); right: var(--inset); bottom: var(--inset); }

.aen-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; overflow: hidden; contain: layout paint; }
.aen-face--back { transform: rotateY(180deg); }
.aen.is-mobile .aen-face--back { transform: rotateX(180deg); }
.aen-face > :first-child { position: absolute; inset: 0; }

/* Lighting on a turning leaf: darker as it faces away, a bright crease where it bends. */
.aen-light { position: absolute; inset: 0; pointer-events: none; opacity: var(--l); }
.aen.is-desktop .aen-face--front .aen-light { background: linear-gradient(90deg, rgba(30,16,6,.05) 0%, rgba(30,16,6,.28) 60%, rgba(255,246,222,.28) 84%, rgba(30,16,6,.42) 100%); }
.aen.is-desktop .aen-face--back .aen-light { background: linear-gradient(270deg, rgba(30,16,6,.05) 0%, rgba(30,16,6,.2) 60%, rgba(255,246,222,.32) 84%, rgba(30,16,6,.38) 100%); }
.aen.is-mobile .aen-light { background: linear-gradient(180deg, rgba(30,16,6,.05) 0%, rgba(30,16,6,.3) 70%, rgba(255,246,222,.25) 88%, rgba(30,16,6,.4) 100%); }

/* Ground shadow, spine, page blocks, cast shadows */
.aen-ground { position: absolute; top: 2%; bottom: -2%; width: 50%; pointer-events: none; z-index: 0;
  box-shadow: 0 calc(var(--pw) * .08) calc(var(--pw) * .14) rgba(0,0,0,.75), 0 calc(var(--pw) * .02) calc(var(--pw) * .03) rgba(0,0,0,.6); }
.aen-ground--l { left: 0; border-radius: 6px 0 0 6px; }
.aen-ground--r { left: 50%; border-radius: 0 6px 6px 0; }
.aen.is-mobile .aen-ground--l { display: none; }
.aen.is-mobile .aen-ground--r { left: 0; width: 100%; }
.aen-spine { position: absolute; z-index: 1; left: calc(50% - var(--pw) * .03); width: calc(var(--pw) * .06); top: -1%; bottom: -1%; border-radius: 4px;
  background: linear-gradient(90deg, #1d0f07, #4b2a17 30%, #6b4127 50%, #4b2a17 70%, #1d0f07); opacity: 0; }
.aen-block { position: absolute; top: var(--inset); width: calc(var(--pw) - var(--inset) - 2px); height: calc(var(--ph) - var(--inset) * 2);
  background: var(--paper-2); visibility: hidden; }
.aen-block--l { right: calc(50% + 2px); z-index: 21; border-radius: 2px 0 0 2px; }
.aen-block--r { left: calc(50% + 2px); z-index: 271; border-radius: 0 2px 2px 0; }
.aen-cast { position: absolute; pointer-events: none; z-index: 450; opacity: 0; }
.aen.is-desktop .aen-cast { top: var(--inset); height: calc(var(--ph) - var(--inset) * 2); width: calc(var(--pw) - var(--inset)); }
.aen-cast--r { left: 50%; transform-origin: 0 50%;
  background: linear-gradient(90deg, rgba(20,10,3,.5) 0%, rgba(20,10,3,.22) 55%, rgba(20,10,3,.45) 96%, rgba(20,10,3,0) 100%); }
.aen-cast--l { right: 50%; transform-origin: 100% 50%;
  background: linear-gradient(270deg, rgba(20,10,3,.5) 0%, rgba(20,10,3,.22) 55%, rgba(20,10,3,.45) 96%, rgba(20,10,3,0) 100%); }
.aen.is-mobile .aen-cast--r { inset: 0 var(--inset) var(--inset); transform: none;
  background: linear-gradient(180deg, rgba(20,10,3,.55), rgba(20,10,3,.12) 60%, transparent); }
.aen-base { position: absolute; inset: 0; z-index: 1; }
.aen-base > * { position: absolute; inset: 0; }

/* Leather -------------------------------------------------------------- */
.aen-leather {
  background:
    radial-gradient(ellipse 80% 60% at 30% 22%, rgba(255,190,120,.16), transparent 60%),
    radial-gradient(ellipse 90% 70% at 75% 90%, rgba(0,0,0,.35), transparent 70%),
    linear-gradient(160deg, var(--leather-1) 0%, var(--leather-2) 55%, var(--leather-3) 100%);
  border-radius: 3px 8px 8px 3px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.5), inset 0 0 calc(var(--pw) * .06) rgba(0,0,0,.55);
}
.aen-leather::before, .aen-leather::after { content: ""; position: absolute; inset: 0; pointer-events: none; border-radius: inherit; }
.aen-leather::before { background-image: ${GRAIN}; opacity: .2; mix-blend-mode: soft-light; }
.aen-leather::after { background-image: ${NOISE}; background-size: 180px; opacity: .14; }
.aen-face--back > .aen-leather { border-radius: 8px 3px 3px 8px; }

.aen-cover { color: var(--gold-1); }
.aen-hinge { position: absolute; z-index: 1; top: 0; bottom: 0; left: 5.5%; width: 1.8%;
  background: linear-gradient(90deg, rgba(0,0,0,.45), rgba(255,200,140,.12) 55%, rgba(0,0,0,.25)); }
.aen-hinge--right { left: auto; right: 5.5%; transform: scaleX(-1); }
.aen-frame { position: absolute; z-index: 1; pointer-events: none; border: 2px solid transparent;
  border-image: linear-gradient(135deg, #7f5c21, #f6e3a1 25%, #a37a33 50%, #f1d68a 75%, #7f5c21) 1; }
.aen-frame--outer { inset: 6.5% 6.5% 6.5% 10.5%; }
.aen-frame--inner { inset: 8.3% 8.3% 8.3% 12.3%; border-width: 1px; opacity: .85; }
.aen-cover--back .aen-frame--outer { inset: 6.5% 10.5% 6.5% 6.5%; }
.aen-corner { position: absolute; z-index: 2; width: 13%; fill: none; stroke: #e2c174; stroke-width: 1.6; stroke-linecap: round;
  filter: drop-shadow(0 1px 0 rgba(0,0,0,.6)); }
.aen-corner circle { fill: #e2c174; }
.aen-corner.is-tl { left: 10.5%; top: 6.5%; }
.aen-corner.is-tr { right: 6.5%; top: 6.5%; transform: scaleX(-1); }
.aen-corner.is-bl { left: 10.5%; bottom: 6.5%; transform: scaleY(-1); }
.aen-corner.is-br { right: 6.5%; bottom: 6.5%; transform: scale(-1); }
.aen-cover--back .aen-corner.is-tl, .aen-cover--back .aen-corner.is-bl { left: 6.5%; }
.aen-cover--back .aen-corner.is-tr, .aen-cover--back .aen-corner.is-br { right: 10.5%; }

.aen-cover__body { position: absolute; z-index: 3; inset: 14% 13% 14% 17%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: calc(var(--fs) * .9); }
.aen-cover--back .aen-cover__body { inset: 14% 17% 14% 13%; }
.aen-cover__vol, .aen-cover__sub, .aen-cover__imprint { margin: 0; font-family: 'Cinzel', serif; letter-spacing: .32em; text-transform: uppercase; font-size: calc(var(--fs) * .62); color: #d9b86a; text-shadow: 0 1px 0 rgba(0,0,0,.7); }
.aen-cover__imprint { letter-spacing: .24em; font-size: calc(var(--fs) * .7); }
.aen-cover__title { margin: 0; display: flex; flex-direction: column; gap: .25em; font-family: 'Cinzel', serif; font-weight: 600; line-height: 1.04;
  filter: drop-shadow(0 2px 0 rgba(0,0,0,.65)) drop-shadow(0 0 14px rgba(240,200,110,.18)); }
.aen-cover__title span { background: var(--gold); -webkit-background-clip: text; background-clip: text; color: transparent; }
.aen-cover__top { font-size: calc(var(--fs) * 1.25); letter-spacing: .14em; font-weight: 500; }
.aen-cover__main { font-size: calc(var(--fs) * 2.2); letter-spacing: .04em; }
.aen.is-mobile .aen-cover__main { font-size: calc(var(--fs) * 1.95); }
.aen-crest { position: relative; display: grid; place-items: center; width: 32%; aspect-ratio: 1; margin: calc(var(--fs) * .4) 0; color: #e8c97b;
  filter: drop-shadow(0 1px 0 rgba(0,0,0,.7)); }
.aen-crest--small { width: 26%; }
.aen-crest__ring { position: absolute; inset: 12%; border-radius: 50%; border: 1.5px solid #d6b263; box-shadow: inset 0 0 0 4px rgba(0,0,0,.15), inset 0 0 0 5px #b8913f; }
.aen-crest__rays { position: absolute; inset: 0; border-radius: 50%;
  background: repeating-conic-gradient(from 0deg, rgba(226,193,116,.75) 0deg 1.2deg, transparent 1.2deg 10deg);
  -webkit-mask: radial-gradient(circle, transparent 54%, #000 55%, #000 68%, transparent 69%); mask: radial-gradient(circle, transparent 54%, #000 55%, #000 68%, transparent 69%); }

.aen-inside { position: absolute; inset: 0; }
.aen-pastedown { position: absolute; top: var(--inset); bottom: var(--inset); }
.aen-pastedown--left { left: var(--inset); right: 0; }
.aen-pastedown--right { left: 0; right: var(--inset); }
.aen-pastedown--m { left: var(--inset); right: var(--inset); top: var(--inset); }

/* Paper ---------------------------------------------------------------- */
.aen-paper {
  background:
    radial-gradient(ellipse 120% 90% at 50% 45%, var(--paper-1) 0%, var(--paper-2) 72%, var(--paper-3) 100%);
}
.aen-paper::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image: ${NOISE}, radial-gradient(circle at 82% 14%, rgba(150,100,40,.12) 0 2%, transparent 6%), radial-gradient(circle at 12% 88%, rgba(150,100,40,.1) 0 3%, transparent 8%);
  background-size: 200px, auto, auto; opacity: .55; mix-blend-mode: multiply; }
/* Gutter shading toward the spine */
.aen.is-desktop .aen-face--front .aen-paper::before, .aen.is-desktop .aen-pastedown--right::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 14%; z-index: 1; pointer-events: none;
  background: linear-gradient(90deg, rgba(70,40,15,.32), rgba(70,40,15,.08) 45%, transparent); }
.aen.is-desktop .aen-face--back .aen-paper::before, .aen.is-desktop .aen-pastedown--left::before { content: ""; position: absolute; inset: 0 0 0 auto; width: 14%; z-index: 1; pointer-events: none;
  background: linear-gradient(270deg, rgba(70,40,15,.32), rgba(70,40,15,.08) 45%, transparent); }
.aen.is-mobile .aen-face--front .aen-paper::before { content: ""; position: absolute; inset: 0 0 auto; height: 6%; z-index: 1; pointer-events: none;
  background: linear-gradient(180deg, rgba(70,40,15,.3), transparent); }
.aen.is-desktop .aen-leaf.is-paper .aen-face { box-shadow: inset 0 0 0 1px rgba(120,85,45,.18); }
.aen.is-desktop .aen-leaf.is-paper .aen-face--front { border-radius: 0 3px 3px 0; }
.aen.is-desktop .aen-leaf.is-paper .aen-face--back { border-radius: 3px 0 0 3px; }
.aen-paper--verso { background: linear-gradient(180deg, var(--paper-2), var(--paper-3)); }

/* Page typography ------------------------------------------------------ */
.aen-page { position: absolute; inset: 0; z-index: 2; display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 8% 11% 9%; font-size: var(--fs); color: var(--ink); text-align: center; }
.aen-page::before { content: ""; position: absolute; inset: 4.2%; border: 1px solid rgba(140,103,39,.45); outline: 1px solid rgba(140,103,39,.22); outline-offset: 3px; pointer-events: none; }
.aen-page--left { padding-right: 13%; }
.aen-page--right { padding-left: 13%; }
.aen-pastedown--left .aen-page--left { padding-right: 11%; }
.aen-page--mobile { padding: 7.5% 9% 12%; }
.aen-runhead { margin: 0; font-family: 'Cinzel', serif; font-size: .6em; letter-spacing: .32em; text-transform: uppercase; color: var(--gold-3); }
.aen-runhead span { color: var(--ink-faint); }
.aen-runhead--italic { position: absolute; top: 7.5%; left: 13%; right: 11%; font-family: 'Cormorant Garamond', serif; font-style: italic; text-transform: none; letter-spacing: .06em; font-size: .78em; color: var(--ink-faint);
  padding-bottom: .5em; border-bottom: 1px solid rgba(140,103,39,.3); }
.aen-rule { width: 58%; height: .9em; margin: .55em auto; fill: none; stroke: var(--gold-3); stroke-width: 1.1; flex: none; }
.aen-rule__gem { fill: var(--gold-2); }
.aen-rule--soft { opacity: .6; width: 40%; margin: .9em auto .5em; }
.aen-rule--gold { stroke: #d6b263; width: 54%; margin: 0; }
.aen-rule--gold .aen-rule__gem { fill: #e7c878; }
.aen-title { margin: .15em 0 0; font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 2.15em; line-height: 1.02; letter-spacing: .005em; color: var(--ink); text-wrap: balance; }
.aen-epithet { margin: .35em 0 0; font-style: italic; font-size: 1em; color: var(--ink-soft); }
.aen-medallion { position: relative; display: grid; place-items: center; width: 38%; aspect-ratio: 1; margin: 1.3em 0 1.3em; flex: none; color: var(--ink);
  border-radius: 50%; background:
    radial-gradient(circle, rgba(255,250,236,.85) 0 52%, transparent 53%),
    repeating-linear-gradient(45deg, rgba(110,82,57,.22) 0 1px, transparent 1px 4px);
  box-shadow: inset 0 0 0 1.5px var(--gold-3), inset 0 0 0 5px transparent, 0 0 0 4px rgba(247,239,220,.9), 0 0 0 5px rgba(140,103,39,.6); }
.aen-medallion__ring { position: absolute; inset: -14%; border-radius: 50%; border: 1px dashed rgba(140,103,39,.55); animation: aen-spin 60s linear infinite; }
@keyframes aen-spin { to { transform: rotate(360deg) } }
.aen-intro { margin: 0; font-size: 1em; line-height: 1.5; text-align: justify; hyphens: auto; color: var(--ink); }
.aen-intro::first-letter { float: left; font-family: 'Cinzel', serif; font-weight: 600; font-size: 3.1em; line-height: .82; padding: .06em .1em 0 0; color: var(--gold-3); }
.aen-intro--center { text-align: center; }
.aen-intro--center::first-letter { all: unset; }
.aen-folio { position: absolute; bottom: 5.6%; left: 0; right: 0; font-family: 'Cinzel', serif; font-size: .62em; letter-spacing: .2em; color: var(--ink-faint); }
.aen-folio::before { content: "— "; } .aen-folio::after { content: " —"; }

.aen-label { margin: 0 0 .6em; width: 100%; display: flex; align-items: center; gap: .8em; font-family: 'Cinzel', serif; font-weight: 600; font-size: .7em; letter-spacing: .26em; text-transform: uppercase; color: var(--gold-3); }
.aen-label::before, .aen-label::after { content: ""; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(140,103,39,.55)); }
.aen-label::after { transform: scaleX(-1); }
.aen-subjects { list-style: none; margin: 0; padding: 0; width: 100%; columns: 2; column-gap: 1.4em; text-align: left; font-size: .98em; line-height: 1.32; }
.aen-subjects li { break-inside: avoid; position: relative; padding-left: 1em; margin-bottom: .42em; }
.aen-subjects li::before { content: ""; position: absolute; left: .1em; top: .52em; width: .36em; height: .36em; background: var(--gold-2); transform: rotate(45deg); }
.aen-careers { list-style: none; margin: 0; padding: 0; width: 100%; text-align: left; font-size: .98em; line-height: 1.3; }
.aen-careers li { display: flex; gap: .55em; padding: .32em 0; border-bottom: 1px dotted rgba(140,103,39,.35); }
.aen-careers em { min-width: 1.9em; color: var(--gold-3); font-family: 'Cinzel', serif; font-style: normal; font-size: .72em; letter-spacing: .08em; padding-top: .28em; }
.aen-inline { margin: 0 0 .8em; font-size: .94em; line-height: 1.42; }
.aen-inline--italic { font-style: italic; }
.aen-cta-row { padding-top: 1.7em; }
.aen-cta { display: inline-flex; align-items: center; gap: .55em; padding: .6em 1.4em; font-family: 'Cinzel', serif; font-weight: 600; font-size: .66em; letter-spacing: .22em; text-transform: uppercase; text-decoration: none;
  color: var(--ink); border: 1px solid var(--gold-3); background: linear-gradient(180deg, rgba(255,250,236,.7), rgba(236,223,193,.6));
  box-shadow: 0 0 0 3px rgba(247,239,220,.9), 0 0 0 4px rgba(140,103,39,.45), 0 4px 10px -4px rgba(60,35,15,.4);
  transition: background .35s, color .35s, box-shadow .35s; }
.aen-cta:hover { background: linear-gradient(180deg, #4a2b17, #2d190d); color: var(--gold-1); }
.aen-cta:focus-visible { outline: 2px solid var(--gold-2); outline-offset: 6px; }
.aen-cta svg { transition: transform .35s; } .aen-cta:hover svg { transform: translateX(3px); }

.aen-m-head { display: flex; align-items: center; gap: .7em; }
.aen-m-icon { display: grid; place-items: center; width: 2.3em; aspect-ratio: 1; border-radius: 50%; color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--gold-3), 0 0 0 2px rgba(247,239,220,.9), 0 0 0 3px rgba(140,103,39,.5); }
.aen-page--mobile .aen-title { font-size: 1.85em; margin-top: .45em; }
.aen-page--mobile .aen-intro { font-size: .95em; line-height: 1.45; margin-bottom: .9em; }
.aen-page--mobile .aen-intro::first-letter { font-size: 2.7em; }
.aen-page--mobile .aen-cta-row { padding-top: 1em; }

.aen-page--finis, .aen-page--colophon { justify-content: center; gap: .6em; }
.aen-finis { margin: 0; font-family: 'Cinzel', serif; font-weight: 600; font-size: 3em; letter-spacing: .12em; color: var(--ink); }
.aen-page--finis .aen-intro { max-width: 22em; }
.aen-page--finis .aen-cta-row { margin-top: .4em; }
.aen-page--finis.is-compact .aen-finis { font-size: 2.6em; }
.aen-bookplate { width: 78%; padding: 2.2em 1.4em; border: 1px solid var(--gold-3); outline: 1px solid rgba(140,103,39,.4); outline-offset: 5px;
  background: radial-gradient(ellipse, rgba(255,250,236,.8), transparent 75%); }
.aen-bookplate__ex { margin: 0; font-family: 'Cinzel', serif; font-size: .8em; letter-spacing: .4em; text-transform: uppercase; color: var(--gold-3); }
.aen-bookplate__name { margin: .2em 0 0; font-weight: 600; font-size: 1.9em; line-height: 1.1; }

/* HUD ------------------------------------------------------------------ */
.aen-hud { position: absolute; z-index: 10; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 14px clamp(16px, 4vw, 48px) 22px; color: #e6cf98; font-family: 'Cinzel', serif; }
.aen-btn { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(214,178,99,.45); background: rgba(30,18,10,.55); color: #e6cf98; cursor: pointer;
  transition: background .3s, border-color .3s, opacity .3s; backdrop-filter: blur(6px); }
.aen-btn:hover:not(:disabled) { background: rgba(214,178,99,.16); border-color: rgba(214,178,99,.8); }
.aen-btn:disabled { opacity: .3; cursor: default; }
.aen-btn:focus-visible, .aen-ticks button:focus-visible, .aen-skip:focus-visible { outline: 2px solid #e6cf98; outline-offset: 3px; }
.aen-nav { display: flex; gap: 10px; }
.aen-progress { display: flex; flex-direction: column; align-items: center; gap: 10px; min-width: 0; }
.aen-count { margin: 0; display: flex; align-items: baseline; gap: 8px; white-space: nowrap; font-size: 13px; letter-spacing: .18em; color: rgba(230,207,152,.6); }
.aen-count__num { font-size: 22px; color: #f1dca3; letter-spacing: .08em; }
.aen-count__sep { opacity: .6; }
.aen-count__name { margin-left: 14px; padding-left: 14px; border-left: 1px solid rgba(214,178,99,.35); font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 17px; letter-spacing: .02em; color: #e6cf98;
  max-width: 34vw; overflow: hidden; text-overflow: ellipsis; }
.aen-ticks { list-style: none; margin: 0; padding: 0; display: flex; gap: 6px; }
.aen-ticks button { display: block; width: 18px; height: 14px; padding: 0; border: 0; background: none; cursor: pointer; position: relative; }
.aen-ticks button::before { content: ""; position: absolute; left: 2px; right: 2px; top: 6px; height: 2px; border-radius: 1px; background: rgba(214,178,99,.25); transition: background .3s, transform .3s; }
.aen-ticks button.is-past::before { background: rgba(214,178,99,.6); }
.aen-ticks button.is-on::before { background: #f1dca3; transform: scaleY(1.8); box-shadow: 0 0 8px rgba(241,220,163,.6); }
.aen-ticks button:hover::before { background: rgba(241,220,163,.9); }
.aen-skip { margin-right: 8px; padding: 6px 0; border: 0; background: none; cursor: pointer; align-self: center;
  font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .26em; text-transform: uppercase; color: rgba(230,207,152,.55); border-bottom: 1px solid rgba(214,178,99,.3); transition: color .3s; }
.aen-skip:hover { color: #f1dca3; }
.aen-hint { position: absolute; z-index: 10; left: 50%; bottom: 96px; transform: translateX(-50%); margin: 0; display: flex; flex-direction: column; align-items: center; gap: 10px; pointer-events: none;
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 16px; color: rgba(230,207,152,.75); transition: opacity .6s; }
.aen-hint i { width: 1px; height: 34px; background: linear-gradient(180deg, rgba(230,207,152,.8), transparent); animation: aen-hint 2.2s ease-in-out infinite; transform-origin: top; }
@keyframes aen-hint { 0% { transform: scaleY(0); opacity: 1 } 60% { transform: scaleY(1); opacity: 1 } 100% { transform: scaleY(1); opacity: 0 } }
.aen-hint.is-hidden { opacity: 0; }
.aen.is-desktop .aen-hint { left: calc(50% + var(--pw) * .5 + 48px); top: 50%; bottom: auto; transform: translateY(-50%); align-items: flex-start; }

.aen.is-mobile .aen-stage { padding: var(--top) 12px 96px; }
.aen.is-mobile .aen-hud { padding: 10px 14px 18px; gap: 10px; }
.aen.is-mobile .aen-progress { flex: 1; }
.aen.is-mobile .aen-count__name { max-width: 40vw; font-size: 15px; margin-left: 8px; padding-left: 8px; }
.aen.is-mobile .aen-count__num { font-size: 19px; }
.aen.is-mobile .aen-ticks { gap: 2px; }
.aen.is-mobile .aen-ticks button { width: 12px; }
.aen.is-mobile .aen-btn { width: 34px; height: 34px; }
.aen.is-mobile .aen-nav { gap: 6px; }
.aen.is-mobile .aen-skip { display: none; }
.aen.is-mobile .aen-hint { bottom: 100px; }

@media (prefers-reduced-motion: reduce) {
  .aen-mote, .aen-medallion__ring, .aen-hint i { animation: none; }
}
`
