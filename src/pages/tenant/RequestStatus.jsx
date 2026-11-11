import { Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, StatusBadge, Steps } from '../../components/ui'
import { PhotoPlaceholder } from '../landlord/PropertyOverview'
import { findRequest } from '../../data/mock'

const ORDER = ['submitted', 'accepted', 'inProgress', 'fixed']

export default function RequestStatus() {
  const { t } = useTranslation()
  const r = findRequest(useParams().reqId)
  if (!r) return <Navigate to="/tenant/lease/requests" replace />
  const current = r.status === 'new' ? 0 : ORDER.indexOf(r.status)
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="space-y-4">
        <div className="flex items-start justify-between gap-3"><h2 className="text-lg font-semibold">{r.title}</h2><StatusBadge status={r.status} /></div>
        <h3 className="text-sm font-semibold">{t('requests.progress')}</h3>
        <Steps label={t('requests.progress')} current={r.status === 'fixed' ? 4 : current}
          steps={ORDER.map((s, i) => ({ label: t(`status.${s}`), date: i <= current ? r.date : '' }))} />
      </Card>
      <div className="space-y-4">
        <Card>
          <h3 className="text-sm font-semibold">{t('requests.landlordReply')}</h3>
          <p className="mt-2 text-sm">{r.reply || <span className="text-ink-muted">{t('requests.noReply')}</span>}</p>
        </Card>
        <PhotoPlaceholder label={t('requests.photo')} className="h-44" />
      </div>
    </div>
  )
}
