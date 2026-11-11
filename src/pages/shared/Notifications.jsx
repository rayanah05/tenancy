import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '../../context/AppContext'
import { Button, Card, FilterChips, List, ListRow, PageTitle, StatusBadge } from '../../components/ui'

const ITEMS = [
  { key: 'n1', role: 'landlord', to: '/landlord/properties/flat-12/rent', icon: 'receipt', time: '2h' },
  { key: 'n2', role: 'landlord', to: '/landlord/properties/flat-4/requests', icon: 'wrench', time: '5h' },
  { key: 'n3', role: 'tenant', to: '/tenant/lease/receipts', icon: 'check', time: '1d' },
  { key: 'n4', role: 'tenant', to: '/tenant/lease/requests/r2', icon: 'wrench', time: '2d' },
]

export default function Notifications() {
  const { t } = useTranslation()
  const { notify } = useApp()
  const [filter, setFilter] = useState('all')
  const [read, setRead] = useState(false)
  const [email, setEmail] = useState(true)
  return (
    <div className="mx-auto max-w-2xl">
      <PageTitle action={<Button variant="secondary" onClick={() => { setRead(true); notify(t('notifs.marked')) }}>{t('notifs.markAll')}</Button>}>{t('notifs.title')}</PageTitle>
      <FilterChips label={t('notifs.title')} value={filter} onChange={setFilter}
        options={[{ value: 'all', label: t('common.all') }, { value: 'landlord', label: t('nav.landlord') }, { value: 'tenant', label: t('nav.tenant') }]} />
      <div className="mt-4"><List label={t('notifs.title')}>
        {ITEMS.filter((n) => filter === 'all' || n.role === filter).map((n, i) => (
          <ListRow key={n.key} to={n.to} icon={n.icon} title={t(`notifs.${n.key}`)} subtitle={`${t(`nav.${n.role}`)} · ${n.time}`}
            trailing={!read && i < 2 ? <StatusBadge status="new" /> : null} />
        ))}
      </List></div>
      <Card className="mt-6 flex items-center justify-between gap-4">
        <div><h2 className="h-section" id="email-rem">{t('notifs.emailReminders')}</h2><p className="muted mt-1">{t('notifs.remindersText')}</p></div>
        <button type="button" role="switch" aria-checked={email} aria-labelledby="email-rem" onClick={() => setEmail(!email)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${email ? 'bg-brand-600' : 'bg-ink-line'}`}>
          <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${email ? 'end-1' : 'start-1'}`} />
        </button>
      </Card>
    </div>
  )
}
