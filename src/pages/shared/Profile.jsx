import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../../context/AppContext'
import { Button, Card, Field, PageTitle } from '../../components/ui'

export default function Profile() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, notify } = useApp()
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone })
  const [pw, setPw] = useState({ current: '', next: '' })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const save = (e) => {
    e.preventDefault()
    const errs = {}
    if (form.name.trim().length < 2) errs.name = t('auth.errName')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('auth.errEmail')
    setErrors(errs)
    if (!Object.keys(errs).length) { notify(t('profile.saved')); navigate('/settings') }
  }
  const savePw = (e) => {
    e.preventDefault()
    if (pw.next.length < 8) { setErrors({ ...errors, pw: t('auth.errPassword') }); return }
    setErrors({ ...errors, pw: undefined }); setPw({ current: '', next: '' }); notify(t('profile.saved'))
  }
  return (
    <>
      <PageTitle>{t('profile.title')}</PageTitle>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-5 flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-600 text-xl font-bold text-white" aria-hidden="true">KA</span>
            <Button type="button" variant="secondary">{t('profile.changePhoto')}</Button>
          </div>
          <form noValidate onSubmit={save} className="space-y-4">
            <Field label={t('auth.fullName')} required autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} />
            <Field label={t('auth.email')} required type="email" autoComplete="email" hint={t('profile.emailNote')} value={form.email} onChange={set('email')} error={errors.email} />
            <Field label={t('profile.phone')} type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
            <Button type="submit" full>{t('profile.saveChanges')}</Button>
          </form>
        </Card>
        <Card id="password">
          <h2 className="h-section mb-4">{t('profile.passwordTitle')}</h2>
          <form noValidate onSubmit={savePw} className="space-y-4">
            <Field label={t('profile.current')} required type="password" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
            <Field label={t('profile.new')} required type="password" autoComplete="new-password" hint={t('auth.passwordHint')} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} error={errors.pw} />
            <Button type="submit" variant="secondary" full>{t('profile.update')}</Button>
          </form>
        </Card>
      </div>
    </>
  )
}
