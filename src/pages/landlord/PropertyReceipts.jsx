import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Card, EmptyState, Icon, List, ListRow } from '../../components/ui'
import { receipts } from '../../data/mock'

export function ReceiptList({ allLabel }) {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <List label={t('receipts.title')}>
          {receipts.map((r) => (
            <ListRow key={r.no} icon="receipt" title={t('receipts.receipt', { no: r.no })} subtitle={`${r.month} · ${t('common.bhd', { amount: r.amount })}`}
              trailing={<Button variant="ghost" className="!min-h-[36px] px-2" aria-label={`${t('common.downloadPdf')}: ${t('receipts.receipt', { no: r.no })}`}><Icon name="download" className="h-4 w-4" /><span className="hidden sm:inline">PDF</span></Button>} />
          ))}
        </List>
      </div>
      <Card className="h-fit space-y-3 lg:col-span-2">
        <h2 className="h-section">{t('receipts.statement')}</h2>
        <p className="muted">{t('receipts.statementText')}</p>
        <Button variant="secondary" full><Icon name="download" className="h-4 w-4" />{allLabel}</Button>
      </Card>
    </div>
  )
}

export default function PropertyReceipts() {
  const { t } = useTranslation()
  const { property: p } = useOutletContext()
  if (!p.tenant) return <EmptyState icon="receipt" title={t('receipts.title')} text={t('receipts.empty')} />
  return <ReceiptList allLabel={t('receipts.downloadStatement')} />
}
