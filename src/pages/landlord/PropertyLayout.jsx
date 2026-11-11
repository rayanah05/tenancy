import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { KeyTag, StatusBadge, Tabs } from '../../components/ui'
import { findProperty } from '../../data/mock'

// Every landlord feature for one property lives under these tabs
export default function PropertyLayout() {
  const { t } = useTranslation()
  const { id } = useParams()
  const p = findProperty(id)
  if (!p) return <Navigate to="/landlord/properties" replace />
  const base = `/landlord/properties/${id}`
  return (
    <>
      <div className="mb-4 max-w-xl"><KeyTag title={p.name} sub={`${p.area} · ${t(`landlord.${p.type}`)} · ${p.bedrooms} ${t('landlord.bedrooms')}`} badge={<StatusBadge status={p.status} />} /></div>
      <Tabs label={t('property.tabs')} items={[
        { to: base, end: true, label: t('property.overview') },
        { to: `${base}/leases`, label: t('property.leases') },
        { to: `${base}/rent`, label: t('property.rent') },
        { to: `${base}/receipts`, label: t('property.receipts') },
        { to: `${base}/requests`, label: t('property.requests') },
      ]} />
      <div className="pt-6"><Outlet context={{ property: p, base }} /></div>
    </>
  )
}
