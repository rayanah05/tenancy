import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Alert, Button, ButtonLink, Icon } from '../../components/ui'
import AuthCard from './AuthCard'

export default function VerifyEmail() {
  const { t } = useTranslation()
  const email = useLocation().state?.email || 'name@email.com'
  const [resent, setResent] = useState(false)
  return (
    <AuthCard title={t('auth.verifyTitle')}>
      <div className="space-y-4">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700"><Icon name="bell" className="h-7 w-7" /></span>
        <p className="text-sm">{t('auth.verifyText', { email })}</p>
        {resent && <Alert tone="success">{t('auth.resent')}</Alert>}
        <ButtonLink to="/welcome" full>{t('auth.openEmail')}</ButtonLink>
        <Button variant="secondary" full onClick={() => setResent(true)}>{t('auth.resend')}</Button>
      </div>
    </AuthCard>
  )
}
