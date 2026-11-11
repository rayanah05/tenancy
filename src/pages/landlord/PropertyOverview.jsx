import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, Icon, List, ListRow, StatusBadge } from '../../components/ui'

export function PhotoPlaceholder({ label, className = 'h-48' }) {
  return (
    <div role="img" aria-label={label} className={`grid place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-ink-soft text-brand-700 ${className}`}>
      <Icon name="building" className="h-12 w-12 opacity-60" />
    </div>
  )
}
const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })

export default function PropertyOverview() {
  const { t } = useTranslation()
  const { property: p, base } = useOutletContext()
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <PhotoPlaceholder label={`${p.name}, ${p.area}`} className="h-56 lg:h-full" />
      <div className="space-y-4">
        <Card>
          <dl className="divide-y divide-ink-line text-sm">
            {[[t('property.tenant'), p.tenant || t('landlord.noTenant')], [t('property.monthlyRent'), t('common.bhd', { amount: p.rent })],
              [t('property.rentDue'), t('property.dueDay', { day: p.dueDay })], [t('property.leasePeriod'), `${fmt(p.start)} – ${fmt(p.end)}`]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-ink-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
          </dl>
        </Card>
        <List>
          <ListRow to={`${base}/rent`} icon="receipt" title={t('property.thisMonth')} trailing={<StatusBadge status={p.status === 'inviteSent' ? 'pending' : p.status} />} />
          <ListRow to={`${base}/requests`} icon="wrench" title={t('landlord.openRequests')} trailing={<span className="text-sm font-semibold">{p.openRequests}</span>} />
        </List>
      </div>
    </div>
  )
}
