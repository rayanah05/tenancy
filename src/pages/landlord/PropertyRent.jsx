import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../../context/AppContext'
import { Button, Card, Dialog, EmptyState, Field, FilterChips, Icon, List, ListRow, StatusBadge } from '../../components/ui'
import { months } from '../../data/mock'

export default function PropertyRent() {
  const { t } = useTranslation()
  const { notify } = useApp()
  const { property: p } = useOutletContext()
  const [filter, setFilter] = useState('all')
  const [reviewed, setReviewed] = useState(null)
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  if (!p.tenant) return <EmptyState icon="receipt" title={t('landlord.noTenant')} text={t('property.inviteSent', { email: p.tenantEmail })} />

  const pending = months[0]
  const list = months.slice(1).filter((m) => filter === 'all' || m.status === filter)
  const reject = () => {
    if (!reason.trim()) { setError(t('rent.errReason')); return }
    setOpen(false); setReviewed('rejected'); notify(t('rent.rejectedMsg'))
  }
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section aria-labelledby="review" className="lg:col-span-3">
        <h2 id="review" className="h-section mb-3">{t('rent.toReview')}</h2>
        {reviewed ? (
          <Card><div className="flex items-center justify-between gap-3"><span className="font-semibold">{pending.label}</span><StatusBadge status={reviewed} /></div></Card>
        ) : (
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3"><span className="font-semibold">{pending.label}</span><StatusBadge status="proofUploaded" /></div>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-ink-muted">{t('property.tenant')}</dt><dd className="text-end font-medium">{p.tenant}</dd>
              <dt className="text-ink-muted">{t('rent.amount')}</dt><dd className="text-end font-medium">{t('common.bhd', { amount: pending.amount })}</dd>
              <dt className="text-ink-muted">{t('rent.uploaded')}</dt><dd className="text-end font-medium">{pending.uploaded}</dd>
            </dl>
            <div role="img" aria-label={t('rent.proof')} className="grid h-40 place-items-center rounded-xl border border-dashed border-ink-line bg-ink-soft text-ink-muted">
              <span className="flex items-center gap-2 text-sm"><Icon name="receipt" />{t('rent.proof')} · transfer-nov.png</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={() => { setReason(''); setError(''); setOpen(true) }}>{t('common.reject')}</Button>
              <Button onClick={() => { setReviewed('paid'); notify(t('rent.confirmed')) }}>{t('common.confirm')}</Button>
            </div>
          </Card>
        )}
      </section>
      <section aria-labelledby="months" className="lg:col-span-2">
        <h2 id="months" className="h-section mb-3">{t('rent.months')}</h2>
        <FilterChips label={t('rent.months')} value={filter} onChange={setFilter}
          options={[{ value: 'all', label: t('common.all') }, { value: 'paid', label: t('status.paid') }, { value: 'late', label: t('status.late') }]} />
        <div className="mt-3"><List>{list.map((m) => <ListRow key={m.id} icon="receipt" title={m.label} subtitle={m.paidOn} trailing={<StatusBadge status={m.status} />} />)}</List></div>
      </section>

      <Dialog open={open} onClose={() => setOpen(false)} title={t('rent.rejectTitle')}>
        <p className="muted mb-4">{t('rent.rejectText')}</p>
        <Field as="textarea" label={t('rent.reason')} required placeholder={t('rent.reasonPh')} value={reason}
          onChange={(e) => { setReason(e.target.value); setError('') }} error={error} />
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={() => setOpen(false)}>{t('common.cancel')}</Button>
          <Button variant="danger" onClick={reject}>{t('rent.rejectPayment')}</Button>
        </div>
      </Dialog>
    </div>
  )
}
