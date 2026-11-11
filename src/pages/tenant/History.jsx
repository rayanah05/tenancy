import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterChips, List, ListRow, Stat, StatusBadge } from '../../components/ui'
import { months } from '../../data/mock'

export default function History() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const list = months.filter((m) => filter === 'all' || m.status === filter)
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <FilterChips label={t('rent.months')} value={filter} onChange={setFilter}
          options={[{ value: 'all', label: t('common.all') }, { value: 'paid', label: t('status.paid') }, { value: 'pending', label: t('status.pending') }, { value: 'late', label: t('status.late') }]} />
        <div className="mt-3"><List label={t('rent.months')}>{list.map((m) => <ListRow key={m.id} icon="receipt" title={m.label} subtitle={m.paidOn} trailing={<StatusBadge status={m.status} />} />)}</List></div>
      </div>
      <div className="lg:col-span-2"><Stat label={t('tenant.onTime')} value={t('tenant.onTimeValue', { n: 10, total: 11 })} /></div>
    </div>
  )
}
