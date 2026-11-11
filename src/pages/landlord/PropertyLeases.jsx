import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Alert, Button, Card, Field, List, ListRow, StatusBadge } from '../../components/ui'

export default function PropertyLeases() {
  const { t } = useTranslation()
  const { property: p } = useOutletContext()
  const [form, setForm] = useState({ email: '', start: '', end: '', rent: '', due: '1' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('auth.errEmail')
    if (form.start && form.end && form.end <= form.start) errs.end = t('property.errDates')
    if (!form.start) errs.start = t('property.errDates')
    if (!(Number(form.rent) > 0)) errs.rent = t('property.errRent')
    if (!(Number(form.due) >= 1 && Number(form.due) <= 28)) errs.due = t('property.errDueDay')
    setErrors(errs)
    if (!Object.keys(errs).length) { setSent(form.email); setForm({ email: '', start: '', end: '', rent: '', due: '1' }) }
  }
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="h-section mb-4">{t('property.newLease')}</h2>
        <form noValidate onSubmit={submit} className="space-y-4">
          {sent && <Alert tone="success">{t('property.inviteSent', { email: sent })}</Alert>}
          <Field label={t('property.tenantEmail')} hint={t('property.tenantEmailHint')} type="email" required value={form.email} onChange={set('email')} error={errors.email} />
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('property.startDate')} type="date" required value={form.start} onChange={set('start')} error={errors.start} />
            <Field label={t('property.endDate')} type="date" required value={form.end} onChange={set('end')} error={errors.end} />
            <Field label={t('property.rentAmount')} type="number" inputMode="decimal" min="0" step="0.001" required value={form.rent} onChange={set('rent')} error={errors.rent} />
            <Field label={t('property.dueDayLabel')} type="number" inputMode="numeric" min="1" max="28" required value={form.due} onChange={set('due')} error={errors.due} />
          </div>
          <Button type="submit" full>{t('property.sendInvite')}</Button>
        </form>
      </Card>
      <section aria-labelledby="all-leases">
        <h2 id="all-leases" className="h-section mb-3">{t('property.allLeases')}</h2>
        <List>
          {p.tenant
            ? <ListRow icon="key" title={p.tenant} subtitle="Jan – Dec 2026" trailing={<StatusBadge status="active" />} />
            : <ListRow icon="key" title={p.tenantEmail} subtitle="Dec 2026 – Nov 2027" trailing={<StatusBadge status="inviteSent" />} />}
          <ListRow icon="key" title="Hasan Mahdi" subtitle="2025" trailing={<StatusBadge status="ended" />} />
        </List>
      </section>
    </div>
  )
}
