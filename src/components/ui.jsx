import { useEffect, useId, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/* ---------- Icons (inline SVG, decorative) ---------- */
const PATHS = {
  home: 'M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  building: 'M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M8 8h3M8 12h3M8 16h3M3 21h18',
  key: 'M15 7a4 4 0 1 1-3.9 4.9L4 19v2h3v-2h2v-2h2l1.1-1.1A4 4 0 0 1 15 7zM16 9h.01',
  cog: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  chevron: 'm9 18 6-6-6-6',
  back: 'm15 18-6-6 6-6',
  receipt: 'M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM9 8h6M9 12h6',
  wrench: 'M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8-1.3-1.3a4 4 0 0 0-5-5L14 6zM3 21l6-6',
  plus: 'M12 5v14M5 12h14',
  upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  check: 'M20 6 9 17l-5-5',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  x: 'M18 6 6 18M6 6l12 12',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  user: 'M20 21a8 8 0 1 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
}
export function Icon({ name, className = 'h-5 w-5', flip = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false" className={`${className} ${flip ? 'rtl:-scale-x-100' : ''}`}>
      <path d={PATHS[name]} />
    </svg>
  )
}

/* ---------- Buttons ---------- */
const base = 'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'
const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'border border-ink-field bg-white text-ink hover:bg-ink-soft',
  danger: 'bg-bad-fg text-white hover:bg-[#6E2C23]',
  ghost: 'text-brand-700 hover:bg-brand-50',
}
export function Button({ variant = 'primary', className = '', full, ...props }) {
  return <button className={`${base} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`} {...props} />
}
export function ButtonLink({ variant = 'primary', className = '', full, ...props }) {
  return <Link className={`${base} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`} {...props} />
}

/* ---------- Form fields ---------- */
export function Field({ label, hint, error, invalid, required, as = 'input', children, className = '', ...props }) {
  const id = useId()
  const { t } = useTranslation()
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(' ') || undefined
  const Comp = as
  const cls = `mt-1.5 block w-full rounded-xl border bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-ink-muted ${error || invalid ? 'border-bad-fg ring-1 ring-bad-fg' : 'border-ink-field'} ${as === 'textarea' ? 'min-h-[96px]' : 'min-h-[48px]'}`
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}{!required && <span className="font-normal text-ink-muted"> ({t('common.optional')})</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="mt-0.5 text-xs text-ink-muted">{hint}</p>}
      <Comp id={id} className={cls} aria-invalid={error || invalid ? 'true' : undefined} aria-describedby={describedBy} required={required} {...props}>{children}</Comp>
      {error && <FieldError id={`${id}-err`}>{error}</FieldError>}
    </div>
  )
}
export function FieldError({ id, children }) {
  return <p id={id} className="mt-1 flex items-start gap-1 text-sm font-medium text-bad-fg"><Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />{children}</p>
}

export function FileField({ label, error, required, file, onChange, accept = 'image/*' }) {
  const id = useId()
  const { t } = useTranslation()
  return (
    <div>
      <span className="text-sm font-semibold" id={`${id}-l`}>{label}{!required && <span className="font-normal text-ink-muted"> ({t('common.optional')})</span>}</span>
      <label htmlFor={id} className={`mt-1.5 flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed bg-white p-4 text-center text-sm ${error ? 'border-bad-fg' : 'border-ink-field hover:border-brand-600'}`}>
        <Icon name="upload" className="h-6 w-6 text-brand-600" />
        <span className="font-semibold text-brand-700">{file ? t('common.chosen', { name: file }) : t('common.addPhoto')}</span>
        <span className="text-xs text-ink-muted">{t('common.photoTypes')}</span>
      </label>
      <input id={id} type="file" accept={accept} className="sr-only" aria-labelledby={`${id}-l`}
        aria-invalid={error ? 'true' : undefined} aria-describedby={error ? `${id}-err` : undefined}
        onChange={(e) => onChange(e.target.files?.[0]?.name || '')} />
      {error && <FieldError id={`${id}-err`}>{error}</FieldError>}
    </div>
  )
}

/* ---------- Status and feedback ---------- */
const badge = {
  paid: 'bg-ok-bg text-ok-fg', fixed: 'bg-ok-bg text-ok-fg', active: 'bg-ok-bg text-ok-fg', accepted: 'bg-ok-bg text-ok-fg',
  late: 'bg-bad-bg text-bad-fg', rejected: 'bg-bad-bg text-bad-fg',
  due: 'bg-brand-50 text-brand-700', new: 'bg-brand-50 text-brand-700', inviteSent: 'bg-brand-50 text-brand-700', inProgress: 'bg-brand-50 text-brand-700', submitted: 'bg-brand-50 text-brand-700',
  pending: 'bg-warn-bg text-warn-fg', proofUploaded: 'bg-warn-bg text-warn-fg',
  ended: 'bg-ink-soft text-ink-muted',
}
export function StatusBadge({ status }) {
  const { t } = useTranslation()
  return <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge[status] || 'bg-ink-soft text-ink'}`}>{t(`status.${status}`)}</span>
}

export function Alert({ tone = 'error', title, children }) {
  const tones = { error: 'bg-bad-bg text-[#6E2C23]', success: 'bg-ok-bg text-[#1F3D2A]', info: 'bg-brand-50 text-brand-800' }
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`flex gap-3 rounded-xl p-3 text-sm ${tones[tone]}`}>
      <Icon name={tone === 'success' ? 'check' : 'alert'} className="mt-0.5 h-5 w-5 shrink-0" />
      <div>{title && <p className="font-semibold">{title}</p>}{children && <div className={title ? 'mt-0.5' : ''}>{children}</div>}</div>
    </div>
  )
}

/* ---------- Layout pieces ---------- */
export function Card({ className = '', children, ...props }) { return <section className={`card ${className}`} {...props}>{children}</section> }

export function Stat({ label, value, to }) {
  const inner = (<><p className="text-sm text-ink-muted">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p></>)
  return to
    ? <Link to={to} className="card block hover:border-brand-600">{inner}</Link>
    : <div className="card">{inner}</div>
}

export function ListRow({ to, icon = 'building', title, subtitle, trailing }) {
  const body = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon name={icon} /></span>
      <span className="min-w-0 flex-1">
        <span dir="auto" className="block truncate text-start text-sm font-semibold">{title}</span>
        {subtitle && <span dir="auto" className="block truncate text-start text-sm text-ink-muted">{subtitle}</span>}
      </span>
      {trailing}
      {to && <Icon name="chevron" flip className="h-4 w-4 shrink-0 text-ink-muted" />}
    </>
  )
  const cls = 'flex min-h-[64px] items-center gap-3 rounded-2xl border border-ink-line bg-white px-3.5 py-2.5'
  return <li>{to ? <Link to={to} className={`${cls} hover:border-brand-600`}>{body}</Link> : <div className={cls}>{body}</div>}</li>
}
export const List = ({ children, label }) => <ul className="space-y-2" aria-label={label}>{children}</ul>

export function Tabs({ items, label }) {
  return (
    <nav aria-label={label} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex min-w-max gap-2">
        {items.map((it) => (
          <li key={it.to}>
            <NavLink end={it.end} to={it.to} className={({ isActive }) => `inline-flex min-h-[44px] items-center rounded-xl px-4 text-sm ${isActive ? 'bg-ink font-semibold text-white' : 'border border-ink-line bg-white text-ink hover:border-brand-300'}`}>
              {it.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function FilterChips({ options, value, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}
          className={`min-h-[40px] rounded-full border px-3.5 text-sm font-medium ${value === o.value ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-line bg-white text-ink hover:border-brand-300'}`}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function EmptyState({ icon = 'building', title, text, action }) {
  return (
    <div className="card flex flex-col items-center gap-3 py-10 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700"><Icon name={icon} className="h-7 w-7" /></span>
      <h2 className="h-section">{title}</h2>
      <p className="muted max-w-sm">{text}</p>
      {action}
    </div>
  )
}

export function PageTitle({ children, sub, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div><h1 className="h-page">{children}</h1>{sub && <p className="muted mt-1">{sub}</p>}</div>
      {action}
    </div>
  )
}

/* ---------- Accessible dialog ---------- */
export function Dialog({ open, onClose, title, children }) {
  const ref = useRef(null)
  const titleId = useId()
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    const el = ref.current
    const focusables = () => el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    focusables()[0]?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const f = [...focusables()]; const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.() }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#241E26]/45 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId} className="w-full max-w-md rounded-t-[26px] bg-white p-5 shadow-xl sm:rounded-[26px]">
        <h2 id={titleId} className="text-lg font-semibold">{title}</h2>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  )
}

/* ---------- Progress steps ---------- */
export function Steps({ steps, current, label }) {
  return (
    <ol className="space-y-3" aria-label={label}>
      {steps.map((s, i) => {
        const done = i < current, now = i === current
        return (
          <li key={s.label} className="flex items-center gap-3" aria-current={now ? 'step' : undefined}>
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-xs font-bold ${done ? 'border-brand-600 bg-brand-600 text-white' : now ? 'border-[6px] border-brand-600 bg-white text-transparent' : 'border-ink-line text-ink-muted'}`}>
              {done ? <Icon name="check" className="h-4 w-4" /> : i + 1}
            </span>
            <span className={`flex-1 text-sm ${now ? 'font-semibold' : done ? '' : 'text-ink-muted'}`}>{s.label}</span>
            <span className="text-xs text-ink-muted">{s.date}</span>
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- Key wallet pieces ---------- */
// Logo: a landlord tag and a tenant tag on one ring (one shared record)
export function LogoMark({ className = 'h-8 w-8', tile = true }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      {tile && <rect width="64" height="64" rx="16" fill="#5E4B63" />}
      <g transform={tile ? 'translate(8 8) scale(.75)' : undefined} fill={tile ? '#fff' : '#5E4B63'} stroke="none">
        <circle cx="32" cy="12" r="7" fill="none" stroke={tile ? '#fff' : '#5E4B63'} strokeWidth="4" />
        <rect x="12" y="18" width="24" height="40" rx="9" opacity=".55" transform="rotate(-12 24 20)" />
        <rect x="28" y="18" width="24" height="40" rx="9" transform="rotate(12 40 20)" />
      </g>
    </svg>
  )
}

// A key tag used as a page header for one property or lease
export function KeyTag({ title, sub, badge, children, as: H = 'h1' }) {
  return (
    <div className="tag">
      <div className="flex items-center justify-between gap-3">
        <span className="tag-ring h-3.5 w-3.5" aria-hidden="true" />
        {badge}
      </div>
      <H dir="auto" className="mt-2 text-start text-2xl font-bold">{title}</H>
      {sub && <p dir="auto" className="mt-1 text-start text-sm text-brand-100">{sub}</p>}
      {children}
    </div>
  )
}

// Month strip: paid months as green chips, the current one in plum
export function MonthStrip({ items, label }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((m) => (
        <li key={m.label} className={`shrink-0 rounded-xl px-3.5 py-2 text-sm font-semibold ${m.current ? 'bg-brand-600 text-white' : m.status === 'paid' ? 'bg-ok-bg text-ok-fg' : m.status === 'late' ? 'bg-bad-bg text-bad-fg' : 'bg-warn-bg text-warn-fg'}`}>
          {m.label}{m.statusText && <span className="font-normal"> · {m.statusText}</span>}
        </li>
      ))}
    </ul>
  )
}
