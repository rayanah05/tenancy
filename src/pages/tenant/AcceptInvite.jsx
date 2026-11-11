import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Card, PageTitle } from '../../components/ui'
import { tenantLease as l } from '../../data/mock'

export default function AcceptInvite() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className="mx-auto max-w-lg">
      <PageTitle sub={t('tenant.inviteText', { name: l.landlord })}>{t('tenant.inviteTitle')}</PageTitle>
      <Card>
        <h2 className="h-section">{l.property}, {l.area}</h2>
        <dl className="mt-3 divide-y divide-ink-line text-sm">
          {[[t('tenant.landlord'), l.landlord], [t('property.monthlyRent'), t('common.bhd', { amount: l.rent })], [t('property.rentDue'), t('property.dueDay', { day: l.dueDay })], [t('property.leasePeriod'), 'Jan – Dec 2026']].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-ink-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
          ))}
        </dl>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={() => navigate('/welcome')}>{t('tenant.decline')}</Button>
          <Button onClick={() => navigate('/tenant/lease')}>{t('tenant.accept')}</Button>
        </div>
      </Card>
    </div>
  )
}
