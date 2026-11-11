import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../../context/AppContext'
import { Button, Card, Field, FileField, PageTitle } from '../../components/ui'

export default function AddProperty() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { notify } = useApp()
  const [form, setForm] = useState({ name: '', address: '', type: 'flat', bedrooms: '2', photo: '' })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = t('landlord.errPropName')
    if (!form.address.trim()) errs.address = t('landlord.errAddress')
    setErrors(errs)
    if (Object.keys(errs).length) return
    notify(`${form.name} ✓`)
    navigate('/landlord/properties/flat-12')
  }
  return (
    <>
      <PageTitle>{t('landlord.addTitle')}</PageTitle>
      <form noValidate onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <Field label={t('landlord.propertyName')} required placeholder={t('landlord.propertyNamePh')} value={form.name} onChange={set('name')} error={errors.name} />
          <Field label={t('landlord.address')} required placeholder={t('landlord.addressPh')} value={form.address} onChange={set('address')} error={errors.address} />
          <div className="grid grid-cols-2 gap-3">
            <Field as="select" label={t('landlord.type')} required value={form.type} onChange={set('type')}>
              <option value="flat">{t('landlord.flat')}</option><option value="villa">{t('landlord.villa')}</option><option value="studio">{t('landlord.studio')}</option>
            </Field>
            <Field label={t('landlord.bedrooms')} required type="number" min="0" max="10" inputMode="numeric" value={form.bedrooms} onChange={set('bedrooms')} />
          </div>
        </Card>
        <div className="space-y-4">
          <Card><FileField label={t('landlord.photo')} file={form.photo} onChange={(f) => setForm({ ...form, photo: f })} /></Card>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => navigate('/landlord/properties')}>{t('common.cancel')}</Button>
            <Button type="submit">{t('landlord.saveProperty')}</Button>
          </div>
        </div>
      </form>
    </>
  )
}
