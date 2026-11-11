import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ButtonLink, EmptyState, Icon, PageTitle, StatusBadge } from '../../components/ui'
import { properties } from '../../data/mock'

// The wallet: every property is a key tag, stacked with a small overlap
const looks = ['bg-brand-600 text-white', 'bg-brand-500 text-white', 'bg-brand-200 text-ink']
const subLooks = ['text-brand-100', 'text-white', 'text-[#3E3342]']

export default function Properties() {
  const { t } = useTranslation()
  const add = <ButtonLink to="/landlord/properties/new"><Icon name="plus" className="h-4 w-4" />{t('landlord.addProperty')}</ButtonLink>
  return (
    <div className="max-w-xl">
      <PageTitle action={properties.length ? add : null}>{t('nav.properties')}</PageTitle>
      {properties.length === 0 ? (
        <EmptyState title={t('landlord.emptyTitle')} text={t('landlord.emptyText')} action={add} />
      ) : (
        <>
          <ul aria-label={t('nav.properties')} className="flex flex-col">
            {properties.map((p, i) => (
              <li key={p.id} className={i ? '-mt-4' : ''}>
                <Link to={`/landlord/properties/${p.id}`}
                  className={`block rounded-[20px] px-[18px] pt-4 shadow-[0_-4px_12px_rgba(36,30,38,0.10)] ${i === properties.length - 1 ? 'pb-4' : 'pb-8'} ${looks[i % 3]}`}>
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-base font-bold"><span className="tag-ring" aria-hidden="true" />{p.name}</span>
                    <StatusBadge status={p.status} />
                  </span>
                  <span className={`mt-1.5 block text-sm ${subLooks[i % 3]}`}>{p.area} · {t(`landlord.${p.type}`)} · {p.bedrooms} {t('landlord.bedrooms')}</span>
                  <span className="mt-1.5 flex justify-between gap-3 text-sm">
                    <span>{p.tenant || t('landlord.noTenant')}</span>
                    <span className="font-bold">{t('common.bhd', { amount: p.rent })}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/landlord/properties/new" className="mt-4 flex min-h-[64px] items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-ink-field font-semibold text-brand-700 hover:bg-white">
            <Icon name="plus" className="h-4 w-4" />{t('landlord.addTitle')}
          </Link>
        </>
      )}
    </div>
  )
}
