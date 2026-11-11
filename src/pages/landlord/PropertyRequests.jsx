import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { EmptyState, FilterChips, List, ListRow, StatusBadge } from '../../components/ui'
import { requests } from '../../data/mock'

export default function PropertyRequests() {
  const { t } = useTranslation()
  const { property: p, base } = useOutletContext()
  const [filter, setFilter] = useState('all')
  if (!p.tenant) return <EmptyState icon="wrench" title={t('requests.title')} text={t('landlord.noTenant')} />
  const list = requests.filter((r) => filter === 'all' || (filter === 'open' ? r.status !== 'fixed' : r.status === 'fixed'))
  return (
    <>
      <FilterChips label={t('requests.title')} value={filter} onChange={setFilter}
        options={[{ value: 'all', label: t('common.all') }, { value: 'open', label: t('common.open') }, { value: 'fixed', label: t('status.fixed') }]} />
      <p className="muted mt-3">{t('requests.statusHelp')}</p>
      <div className="mt-4"><List label={t('requests.title')}>
        {list.map((r) => <ListRow key={r.id} to={`${base}/requests/${r.id}`} icon="wrench" title={r.title} subtitle={`${r.by} · ${r.date}`} trailing={<StatusBadge status={r.status} />} />)}
      </List></div>
    </>
  )
}
