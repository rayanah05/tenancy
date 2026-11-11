import { useTranslation } from 'react-i18next'
import { Alert, ButtonLink, Card, StatusBadge } from '../../components/ui'
import { tenantLease as l } from '../../data/mock'

export default function ProofSubmitted() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <Alert tone="success" title={t('tenant.submittedTitle')}>{t('tenant.submittedText')}</Alert>
      <Card>
        <div className="flex items-center justify-between"><span className="font-semibold">{l.nextMonth}</span><StatusBadge status="pending" /></div>
        <p className="muted mt-1">{t('common.bhd', { amount: l.rent })}</p>
      </Card>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ButtonLink to="/tenant">{t('tenant.backDashboard')}</ButtonLink>
        <ButtonLink to="/tenant/lease/history" variant="secondary">{t('tenant.viewHistory')}</ButtonLink>
      </div>
    </div>
  )
}
