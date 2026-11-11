import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../../context/AppContext'
import { RoleSwitch } from '../../components/Layout'
import { List, ListRow, StatusBadge } from '../../components/ui'
import { months, requests, tenantLease as l } from '../../data/mock'

export default function TenantDashboard() {
  const { t } = useTranslation()
  const { user } = useApp()
  const onTime = months.filter((m) => m.status === 'paid').length
  return (
    <>
      <RoleSwitch className="mb-5 lg:hidden" />
      <h1 className="h-page mb-5">{t('tenant.hello', { name: user.first })}</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          {/* Your lease as a key tag, with the next rent on it */}
          <div className="flex flex-col">
            <div aria-hidden="true" className="mx-4 h-10 rounded-t-[18px] bg-brand-200" />
            <section aria-labelledby="next" className="tag -mt-4 shadow-[0_-4px_14px_rgba(36,30,38,0.15)]">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-bold"><span className="tag-ring" aria-hidden="true" />{l.property} · {l.area}</span>
                <StatusBadge status="due" />
              </div>
              <h2 id="next" className="mt-3 text-sm font-normal text-brand-100">{t('tenant.nextRentLabel')} · <bdi>{l.nextDue}</bdi></h2>
              <p className="text-[34px] font-bold leading-tight">{t('common.bhd', { amount: l.rent })}</p>
              <Link to="/tenant/lease/pay" className="mt-4 flex min-h-[48px] items-center justify-center rounded-xl bg-white text-[15px] font-bold text-brand-700 hover:bg-brand-50">{t('tenant.payRent')}</Link>
            </section>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-ok-bg p-3.5"><p className="text-xs text-ok-fg">{t('tenant.onTime')}</p><p className="mt-0.5 text-lg font-bold text-[#1F3D2A]">{t('tenant.onTimeValue', { n: onTime, total: months.length })}</p></div>
            <div className="card p-3.5 sm:p-3.5"><p className="text-xs text-ink-muted">{t('tenant.landlord')}</p><p className="mt-0.5 text-base font-bold">{l.landlord}</p></div>
          </div>
          <section aria-labelledby="reqs">
            <h2 id="reqs" className="h-section mb-3">{t('tenant.myRequests')}</h2>
            <List>{requests.filter((r) => r.status !== 'fixed').map((r) => (
              <ListRow key={r.id} to={`/tenant/lease/requests/${r.id}`} icon="wrench" title={r.title} subtitle={r.date} trailing={<StatusBadge status={r.status} />} />
            ))}</List>
          </section>
        </div>
        <section aria-labelledby="recent">
          <h2 id="recent" className="h-section mb-3">{t('tenant.recentPayments')}</h2>
          <List>{months.slice(0, 4).map((m) => (
            <ListRow key={m.id} to="/tenant/lease/history" icon="receipt" title={m.label} subtitle={m.paidOn} trailing={<StatusBadge status={m.status} />} />
          ))}</List>
        </section>
      </div>
    </>
  )
}
