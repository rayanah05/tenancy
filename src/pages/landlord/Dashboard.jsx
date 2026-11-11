import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../../context/AppContext'
import { RoleSwitch } from '../../components/Layout'
import { ButtonLink, Icon, List, ListRow, StatusBadge } from '../../components/ui'
import { properties } from '../../data/mock'

// Key wallet: properties are stacked key tags. The one that needs you sits in front, open.
export default function LandlordDashboard() {
  const { t } = useTranslation()
  const { user } = useApp()
  const front = properties.find((p) => p.status === 'pending') || properties[0]
  const back = properties.filter((p) => p.id !== front.id).reverse()
  const shades = ['bg-brand-200 text-ink', 'bg-brand-300 text-ink']
  return (
    <>
      <RoleSwitch className="mb-5 lg:hidden" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-sm font-medium text-ink-muted">{t('landlord.hello', { name: user.first })}</h1>
              <p className="text-3xl font-bold">{t('common.bhd', { amount: 600 })}</p>
              <p className="muted">{t('landlord.collected')}</p>
            </div>
          </div>

          <section aria-labelledby="wallet">
            <h2 id="wallet" className="sr-only">{t('landlord.myProperties')}</h2>
            <ul className="flex flex-col">
              {back.map((p, i) => (
                <li key={p.id} className={i ? '-mt-[18px]' : ''}>
                  <Link to={`/landlord/properties/${p.id}`} className={`flex min-h-[62px] items-start justify-between gap-3 rounded-t-[20px] px-[18px] pb-6 pt-3 ${shades[i % 2]}`}>
                    <span className="flex items-center gap-2 font-bold"><span className="tag-ring" aria-hidden="true" />{p.name}</span>
                    <StatusBadge status={p.status} />
                  </Link>
                </li>
              ))}
              <li className="-mt-[18px]">
                <div className="tag shadow-[0_-4px_14px_rgba(36,30,38,0.15)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-lg font-bold"><span className="tag-ring" aria-hidden="true" />{front.name}</span>
                    <StatusBadge status={front.status} />
                  </div>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div className="flex justify-between gap-3"><dt className="text-brand-100">{t('property.tenant')}</dt><dd className="font-semibold">{front.tenant}</dd></div>
                    <div className="flex justify-between gap-3"><dt className="text-brand-100">{t('property.thisMonth')}</dt><dd className="font-semibold">{t('common.bhd', { amount: front.rent })} · {t('status.proofUploaded')}</dd></div>
                  </dl>
                  <div className="mt-4 flex gap-2">
                    <Link to={`/landlord/properties/${front.id}/rent`} className="inline-flex min-h-[46px] flex-1 items-center justify-center rounded-xl bg-white px-3 text-sm font-bold text-brand-700 hover:bg-brand-50">{t('landlord.proofToReview')}</Link>
                    <Link to={`/landlord/properties/${front.id}`} className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-brand-300 px-4 text-sm font-semibold text-white hover:bg-brand-700">{t('common.open')}</Link>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <section aria-labelledby="action">
            <h2 id="action" className="h-section mb-3">{t('landlord.needsAction')}</h2>
            <List>
              <ListRow to="/landlord/properties/flat-12/requests/r1" icon="wrench" title={t('landlord.newRequest')} subtitle="Leaking kitchen tap · Flat 12" trailing={<StatusBadge status="new" />} />
              <ListRow to="/landlord/properties/flat-4/rent" icon="receipt" title={t('landlord.late')} subtitle="Ali Hasan · Flat 4" trailing={<StatusBadge status="late" />} />
            </List>
          </section>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/landlord/properties/flat-4/rent" className="card block hover:border-brand-300"><p className="muted">{t('landlord.late')}</p><p className="mt-1 text-2xl font-bold text-bad-fg">1</p></Link>
            <Link to="/landlord/properties/flat-12/requests" className="card block hover:border-brand-300"><p className="muted">{t('landlord.openRequests')}</p><p className="mt-1 text-2xl font-bold">2</p></Link>
          </div>
          <ButtonLink to="/landlord/properties" variant="secondary" full><Icon name="building" className="h-4 w-4" />{t('landlord.myProperties')}</ButtonLink>
        </div>
      </div>
    </>
  )
}
