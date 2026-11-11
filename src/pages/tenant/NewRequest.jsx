import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../../context/AppContext'
import { Alert, Button, Card, Field, FileField } from '../../components/ui'

export default function NewRequest() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { notify } = useApp()
  const [form, setForm] = useState({ title: '', category: 'plumbing', description: '', photo: '' })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.title.trim()) errs.title = t('requests.errTitle')
    if (!form.photo) errs.photo = t('requests.errPhoto')
    setErrors(errs)
    if (!Object.keys(errs).length) { notify(t('requests.sent')); navigate('/tenant/lease/requests/r1') }
  }
  const count = Object.keys(errors).length
  return (
    <>
      <h2 className="text-lg font-semibold">{t('requests.newRequest')}</h2>
      <form noValidate onSubmit={submit} className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          {count > 0 && <Alert>{t('auth.errSummary', { count })}</Alert>}
          <Field label={t('requests.what')} required placeholder={t('requests.whatPh')} value={form.title} onChange={set('title')} error={errors.title} />
          <Field as="select" label={t('requests.category')} required value={form.category} onChange={set('category')}>
            {['plumbing', 'electrical', 'ac', 'appliance', 'other'].map((c) => <option key={c} value={c}>{t(`requests.${c}`)}</option>)}
          </Field>
          <Field as="textarea" label={t('requests.description')} placeholder={t('requests.descriptionPh')} value={form.description} onChange={set('description')} />
        </Card>
        <div className="space-y-4">
          <Card><FileField label={t('requests.photo')} required file={form.photo} onChange={(f) => setForm({ ...form, photo: f })} error={errors.photo} /></Card>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => navigate('/tenant/lease/requests')}>{t('common.cancel')}</Button>
            <Button type="submit">{t('requests.submitRequest')}</Button>
          </div>
        </div>
      </form>
    </>
  )
}
