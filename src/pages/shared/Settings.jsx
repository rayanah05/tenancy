import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Icon, List, ListRow, PageTitle } from '../../components/ui'

export default function Settings() {
  const { t, i18n } = useTranslation()
  const { user } = useApp()
  const other = i18n.language === 'ar' ? 'en' : 'ar'
  return (
    <div className="mx-auto max-w-2xl">
      <PageTitle sub={t('settings.oneSettings')}>{t('settings.title')}</PageTitle>
      <Link to="/settings/profile" className="card mb-4 flex items-center gap-4 hover:border-brand-600">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-lg font-bold text-white" aria-hidden="true">KA</span>
        <span className="flex-1"><span className="block font-semibold">{user.name}</span><span className="muted block">{user.email}</span></span>
        <Icon name="chevron" flip className="h-4 w-4 text-ink-muted" />
      </Link>
      <List>
        <ListRow to="/settings/profile" icon="user" title={t('settings.profile')} subtitle={t('settings.profileSub')} />
        <ListRow to="/notifications" icon="bell" title={t('settings.notifications')} subtitle={t('settings.notificationsSub')} />
        <li>
          <button type="button" onClick={() => i18n.changeLanguage(other)} className="flex min-h-[64px] w-full items-center gap-3 rounded-xl border border-ink-line bg-white px-3 py-2 text-start hover:border-brand-600">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon name="globe" /></span>
            <span className="flex-1"><span className="block text-sm font-semibold">{t('settings.language')}</span><span className="block text-sm text-ink-muted">{t('settings.languageSub')}</span></span>
            <span className="text-sm font-semibold text-brand-700" lang={other}>{t('nav.switchLang')}</span>
          </button>
        </li>
        <ListRow to="/settings/profile#password" icon="lock" title={t('settings.password')} subtitle={t('settings.passwordSub')} />
      </List>
      <Link to="/" className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-ink-field bg-white text-sm font-semibold text-bad-fg hover:bg-bad-bg">{t('nav.logout')}</Link>
    </div>
  )
}
