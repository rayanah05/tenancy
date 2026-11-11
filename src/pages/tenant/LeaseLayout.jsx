import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { KeyTag, StatusBadge, Tabs } from '../../components/ui'
import { tenantLease as l } from '../../data/mock'

// Every tenant feature for the lease lives under these tabs
export default function LeaseLayout() {
  const { t } = useTranslation()
  const base = '/tenant/lease'
  return (
    <>
      <div className="mb-4 max-w-xl"><KeyTag title={l.property} sub={`${l.area} · ${t('tenant.landlord')}: ${l.landlord}`} badge={<StatusBadge status="active" />} /></div>
      <Tabs label={t('nav.myLease')} items={[
        { to: base, end: true, label: t('property.overview') },
        { to: `${base}/pay`, label: t('tenant.payRent') },
        { to: `${base}/history`, label: t('tenant.history') },
        { to: `${base}/receipts`, label: t('property.receipts') },
        { to: `${base}/requests`, label: t('property.requests') },
      ]} />
      <div className="pt-6"><Outlet /></div>
    </>
  )
}
