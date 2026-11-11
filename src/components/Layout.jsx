import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'
import { Icon, LogoMark } from './ui'

function Logo({ to = '/' }) {
  const { t } = useTranslation()
  return (
    <Link to={to} className="flex min-h-[44px] items-center gap-2 rounded-xl font-bold text-ink">
      <LogoMark className="h-8 w-8" />
      <span className="text-[19px] tracking-tight">{t('app.name')}</span>
    </Link>
  )
}

function LangToggle() {
  const { t, i18n } = useTranslation()
  const next = i18n.language === 'ar' ? 'en' : 'ar'
  return (
    <button type="button" onClick={() => i18n.changeLanguage(next)}
      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-ink hover:bg-ink-soft">
      <Icon name="globe" className="h-4 w-4" /><span className="sr-only">{t('nav.langPrefix')} </span><span lang={next}>{t('nav.switchLang')}</span>
    </button>
  )
}

function SkipLink() {
  const { t } = useTranslation()
  return <a href="#main" className="sr-only z-50 rounded-xl bg-white px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:start-3 focus:top-3">{t('nav.skip')}</a>
}

function Toast() {
  const { t } = useTranslation()
  const { toast, clearToast } = useApp()
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-20 z-40 flex justify-center px-4 lg:bottom-6">
      {toast && (
        <div className="pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-lg">
          <Icon name="check" className="h-5 w-5 shrink-0 text-brand-100" /><span>{toast}</span>
          <button type="button" onClick={clearToast} className="ms-2 rounded p-1 hover:bg-white/10" aria-label={t('common.close')}><Icon name="x" className="h-4 w-4" /></button>
        </div>
      )}
    </div>
  )
}

/* ---------- Public pages (landing, auth) ---------- */
export function PublicLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-canvas">
      <SkipLink />
      <header>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <div className="flex items-center gap-1">
            <LangToggle />
            {pathname === '/' && <Link to="/login" className="inline-flex min-h-[44px] items-center rounded-xl px-3 text-sm font-semibold text-brand-700 hover:bg-brand-50">{t('landing.login')}</Link>}
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-4 py-8 sm:py-12 focus:outline-none"><Outlet /></main>
    </div>
  )
}

/* ---------- Signed-in pages ---------- */
const NAV = {
  landlord: [
    { to: '/landlord', end: true, icon: 'home', key: 'nav.dashboard', short: 'nav.home' },
    { to: '/landlord/properties', icon: 'building', key: 'nav.properties' },
    { to: '/notifications', icon: 'bell', key: 'nav.notifications', desktopOnly: true },
    { to: '/settings', icon: 'cog', key: 'nav.settings' },
  ],
  tenant: [
    { to: '/tenant', end: true, icon: 'home', key: 'nav.dashboard', short: 'nav.home' },
    { to: '/tenant/lease', icon: 'key', key: 'nav.myLease' },
    { to: '/notifications', icon: 'bell', key: 'nav.notifications', desktopOnly: true },
    { to: '/settings', icon: 'cog', key: 'nav.settings' },
  ],
}
// Top-level pages show the logo on mobile; deeper pages show a back button
const TOP = ['/landlord', '/landlord/properties', '/tenant', '/tenant/lease', '/settings', '/notifications']
const parentOf = (path) => path.replace(/\/[^/]+$/, '') || '/'

export function RoleSwitch({ className = '' }) {
  const { t } = useTranslation()
  const { mode, user } = useApp()
  if (!user.roles.includes('landlord') || !user.roles.includes('tenant')) return null
  const opt = (m, to) => (
    <Link to={to} aria-current={mode === m ? 'true' : undefined}
      className={`flex min-h-[40px] flex-1 items-center justify-center rounded-xl px-3 text-sm font-semibold ${mode === m ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-muted hover:text-ink'}`}>
      {t(`nav.${m}`)}
    </Link>
  )
  return (
    <div role="group" aria-label={t('nav.mode')} className={`flex rounded-2xl bg-brand-50 p-1 ${className}`}>
      {opt('landlord', '/landlord')}{opt('tenant', '/tenant')}
    </div>
  )
}

export function AppLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { mode, setMode } = useApp()
  useEffect(() => {
    if (pathname.startsWith('/landlord')) setMode('landlord')
    else if (pathname.startsWith('/tenant')) setMode('tenant')
  }, [pathname, setMode])
  // After in-app navigation, move focus to the new page content (screen readers announce it).
  // Not on first load, so the first Tab still reaches the skip link.
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    document.getElementById('main')?.focus({ preventScroll: true }); window.scrollTo(0, 0)
  }, [pathname])
  const items = NAV[mode]
  const isTop = TOP.includes(pathname)
  const home = mode === 'landlord' ? '/landlord' : '/tenant'

  return (
    <div className="min-h-screen lg:flex">
      <SkipLink />
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-e border-ink-line bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center px-5"><Logo to={home} /></div>
        <div className="px-4"><RoleSwitch /></div>
        <nav aria-label={t('nav.main')} className="mt-4 flex-1 px-3">
          <ul className="space-y-1">
            {items.map((it) => (
              <li key={it.to}>
                <NavLink to={it.to} end={it.end} className={({ isActive }) => `flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-medium ${isActive ? 'bg-brand-50 font-semibold text-brand-800' : 'text-ink hover:bg-ink-soft'}`}>
                  <Icon name={it.icon} />{t(it.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 bg-canvas/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-4">
            <div className="lg:hidden">
              {isTop ? <Logo to={home} /> : (
                <button type="button" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate(parentOf(pathname)))}
                  className="inline-flex min-h-[44px] items-center gap-1 rounded-xl pe-3 text-sm font-semibold text-ink hover:bg-ink-soft">
                  <Icon name="back" flip /> {t('nav.back')}
                </button>
              )}
            </div>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-1">
              <LangToggle />
              <Link to="/notifications" className="relative grid h-11 w-11 place-items-center rounded-full border border-ink-line bg-white hover:bg-ink-soft" aria-label={`${t('nav.openNotifications')}, ${t('nav.unread', { count: 2 })}`}>
                <Icon name="bell" />
                <span className="absolute end-2 top-2 h-2.5 w-2.5 rounded-full bg-bad-fg ring-2 ring-white" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>

        <main id="main" tabIndex={-1} className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-6 focus:outline-none lg:pb-12">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom tabs */}
      <nav aria-label={t('nav.main')} className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-line bg-white lg:hidden">
        <ul className="mx-auto flex max-w-md justify-around">
          {items.filter((i) => !i.desktopOnly).map((it) => (
            <li key={it.to} className="flex-1">
              <NavLink to={it.to} end={it.end} className={({ isActive }) => `group flex min-h-[64px] flex-col items-center justify-center gap-1 text-xs ${isActive ? 'font-semibold text-brand-700' : 'font-medium text-ink-muted'}`}>
                <span className="rounded-full px-4 py-0.5 group-aria-[current=page]:bg-brand-50"><Icon name={it.icon} /></span>{t(it.short || it.key)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Toast />
    </div>
  )
}

export { Toast }
