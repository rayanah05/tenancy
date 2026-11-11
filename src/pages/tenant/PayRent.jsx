import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Alert, Field, FileField, Icon, MonthStrip } from '../../components/ui'
import { months, tenantLease as l } from '../../data/mock'

export default function PayRent() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form, setForm] = useState({ date: '', ref: '', file: '' })
  const [errors, setErrors] = useState({})
  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.date) errs.date = t('tenant.errDate')
    if (!form.file) errs.file = t('tenant.errFile')
    setErrors(errs)
    if (!Object.keys(errs).length) navigate('/tenant/lease/pay/submitted')
  }
  const count = Object.keys(errors).length
  const strip = [...months.slice(1, 4).reverse().map((m) => ({ label: m.label.split(' ')[0], status: m.status, statusText: t(`status.${m.status}`) })),
    { label: l.nextMonth, current: true }]
  return (
    <form noValidate onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <MonthStrip items={strip} label={t('tenant.history')} />
        <section aria-labelledby="amount" className="relative flex flex-col items-center gap-1 rounded-[22px] border border-ink-line bg-white px-5 py-6 text-center">
          <span aria-hidden="true" className="tag-ring absolute start-4 top-4 h-3.5 w-3.5 text-ink-line" />
          <h2 id="amount" className="text-sm font-medium text-ink-muted">{t('tenant.payFor', { month: l.nextMonth })}</h2>
          <p className="text-[40px] font-bold leading-tight">{t('common.bhd', { amount: l.rent })}</p>
          <p className="rounded-full bg-brand-50 px-3 py-0.5 text-sm font-semibold text-brand-700">{t('tenant.dueDate')} · <bdi>{l.nextDue}</bdi></p>
        </section>
        <Alert tone="info">{t('tenant.howToPay')}</Alert>
      </div>
      <div className="space-y-4">
        {count > 0 && <Alert>{t('auth.errSummary', { count })}</Alert>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={t('tenant.paymentDate')} type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} error={errors.date} />
          <Field label={t('tenant.reference')} value={form.ref} onChange={(e) => setForm({ ...form, ref: e.target.value })} placeholder="TRX12345" />
        </div>
        <FileField label={t('tenant.uploadProof')} required file={form.file} accept="image/*,application/pdf" onChange={(f) => setForm({ ...form, file: f })} error={errors.file} />
        <button type="submit" className="flex min-h-[60px] w-full items-center gap-3 rounded-full bg-brand-50 p-1.5 text-base font-bold text-brand-700 hover:bg-brand-100">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white"><Icon name="chevron" flip className="h-5 w-5" /></span>
          {t('tenant.submitProof')}
        </button>
      </div>
    </form>
  )
}
