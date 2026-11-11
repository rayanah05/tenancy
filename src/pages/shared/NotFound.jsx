import { useTranslation } from 'react-i18next'
import { ButtonLink, EmptyState } from '../../components/ui'

export default function NotFound() {
  const { t } = useTranslation()
  return <div className="mx-auto max-w-md py-16"><EmptyState icon="alert" title={t('notFound.title')} text={t('notFound.text')} action={<ButtonLink to="/">{t('notFound.home')}</ButtonLink>} /></div>
}
