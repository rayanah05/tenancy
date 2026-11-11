import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Alert, Button, Field } from '../../components/ui'
import AuthCard from './AuthCard'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [wrong, setWrong] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!EMAIL.test(form.email)) errs.email = t('auth.errEmail')
    if (form.password.length < 8) errs.password = t('auth.errPassword')
    setErrors(errs)
    if (Object.keys(errs).length) { setWrong(false); return }
    if (form.password !== 'tenancy123') { setWrong(true); return }
    navigate('/landlord')
  }

  return (
    <AuthCard title={t('auth.welcomeBack')} sub={t('auth.loginSub')}>
      <form noValidate onSubmit={submit} className="space-y-4">
        {wrong && <Alert>{t('auth.errWrong')}</Alert>}
        <Field label={t('auth.email')} type="email" autoComplete="email" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="name@email.com" />
        <Field label={t('auth.password')} type="password" autoComplete="current-password" required value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} invalid={wrong} />
        <div className="text-end"><Link to="/forgot-password" className="text-sm font-semibold text-brand-700 underline-offset-2 hover:underline">{t('auth.forgot')}</Link></div>
        <Button type="submit" full>{t('auth.login')}</Button>
        <p className="text-center text-xs text-ink-muted">{t('auth.demo')}</p>
      </form>
      <p className="mt-6 text-center text-sm">{t('auth.noAccount')} <Link to="/register" className="font-semibold text-brand-700 underline-offset-2 hover:underline">{t('auth.register')}</Link></p>
    </AuthCard>
  )
}
