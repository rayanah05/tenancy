import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Alert, Button, Field } from '../../components/ui'
import AuthCard from './AuthCard'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Register() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (form.name.trim().length < 2) errs.name = t('auth.errName')
    if (!EMAIL.test(form.email)) errs.email = t('auth.errEmail')
    if (form.password.length < 8) errs.password = t('auth.errPassword')
    setErrors(errs)
    if (!Object.keys(errs).length) navigate('/verify-email', { state: { email: form.email } })
  }
  const count = Object.keys(errors).length

  return (
    <AuthCard title={t('auth.createTitle')} sub={t('auth.createSub')}>
      <form noValidate onSubmit={submit} className="space-y-4">
        {count > 0 && <Alert>{t('auth.errSummary', { count })}</Alert>}
        <Field label={t('auth.fullName')} autoComplete="name" required value={form.name} onChange={set('name')} error={errors.name} />
        <Field label={t('auth.email')} type="email" autoComplete="email" required value={form.email} onChange={set('email')} error={errors.email} placeholder="name@email.com" />
        <Field label={t('auth.password')} type="password" autoComplete="new-password" required hint={t('auth.passwordHint')} value={form.password} onChange={set('password')} error={errors.password} />
        <Button type="submit" full>{t('auth.createAccount')}</Button>
      </form>
      <p className="mt-6 text-center text-sm">{t('auth.haveAccount')} <Link to="/login" className="font-semibold text-brand-700 underline-offset-2 hover:underline">{t('auth.login')}</Link></p>
    </AuthCard>
  )
}
