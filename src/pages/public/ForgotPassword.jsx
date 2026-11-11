import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Alert, Button, Field } from '../../components/ui'
import AuthCard from './AuthCard'

export default function ForgotPassword() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(t('auth.errEmail')); return }
    setError(''); setSent(true) // same message whether or not the account exists
  }
  return (
    <AuthCard title={t('auth.resetTitle')} sub={t('auth.resetText')}>
      <form noValidate onSubmit={submit} className="space-y-4">
        {sent && <Alert tone="success">{t('auth.resetSent')}</Alert>}
        <Field label={t('auth.email')} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} error={error} placeholder="name@email.com" />
        <Button type="submit" full>{t('auth.sendLink')}</Button>
      </form>
      <p className="mt-6 text-center text-sm"><Link to="/login" className="font-semibold text-brand-700 underline-offset-2 hover:underline">{t('auth.backToLogin')}</Link></p>
    </AuthCard>
  )
}
