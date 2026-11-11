import { useTranslation } from 'react-i18next'
import { ButtonLink, Icon, List, ListRow, StatusBadge } from '../../components/ui'
import { requests } from '../../data/mock'

export default function TenantRequests() {
  const { t } = useTranslation()
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="muted">{t('requests.statusHelp')}</p>
        <ButtonLink to="/tenant/lease/requests/new"><Icon name="plus" className="h-4 w-4" />{t('requests.newRequest')}</ButtonLink>
      </div>
      <List label={t('requests.title')}>
        {requests.map((r) => <ListRow key={r.id} to={`/tenant/lease/requests/${r.id}`} icon="wrench" title={r.title} subtitle={r.date} trailing={<StatusBadge status={r.status} />} />)}
      </List>
    </>
  )
}
