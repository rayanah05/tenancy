import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Two big key tags: one for each role
export default function Welcome() {
  const { t } = useTranslation()
  const Option = ({ title, text, to, label, dark }) => (
    <li>
      <Link to={to} className={`flex h-full min-h-[220px] flex-col gap-3 rounded-[22px] p-5 ${dark ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-brand-200 text-ink hover:bg-brand-100'}`}>
        <span aria-hidden="true" className={`tag-ring h-4 w-4 border-[3px] ${dark ? '' : 'text-brand-600'}`} />
        <span className="text-[22px] font-bold">{title}</span>
        <span className={`text-sm leading-relaxed ${dark ? 'text-brand-100' : 'text-[#3E3342]'}`}>{text}</span>
        <span className={`mt-auto self-start rounded-xl px-4 py-2.5 text-sm font-bold ${dark ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'}`}>{label}</span>
      </Link>
    </li>
  )
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="h-page">{t('welcome.title')}</h1>
      <p className="muted mt-2">{t('welcome.sub')}</p>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Option dark title={t('welcome.landlordTitle')} text={t('welcome.landlordText')} to="/landlord/properties/new" label={t('welcome.addProperty')} />
        <Option title={t('welcome.tenantTitle')} text={t('welcome.tenantText')} to="/tenant/invite" label={t('welcome.haveInvite')} />
      </ul>
    </div>
  )
}
