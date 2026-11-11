import { useTranslation } from 'react-i18next'
import { Button, Card, Icon } from '../../components/ui'
import { PhotoPlaceholder } from '../landlord/PropertyOverview'
import { tenantLease as l } from '../../data/mock'

export default function LeaseOverview() {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <PhotoPlaceholder label={`${l.property}, ${l.area}`} className="h-56 lg:h-full" />
      <Card className="space-y-4">
        <dl className="divide-y divide-ink-line text-sm">
          {[[t('tenant.landlord'), l.landlord], [t('property.monthlyRent'), t('common.bhd', { amount: l.rent })], [t('property.rentDue'), t('property.dueDay', { day: l.dueDay })], [t('property.leasePeriod'), 'Jan – Dec 2026']].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-ink-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
          ))}
        </dl>
        <Button variant="secondary" full><Icon name="download" className="h-4 w-4" />{t('tenant.downloadSummary')}</Button>
      </Card>
    </div>
  )
}
