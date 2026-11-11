import { useTranslation } from 'react-i18next'
import { ReceiptList } from '../landlord/PropertyReceipts'

export default function TenantReceipts() {
  const { t } = useTranslation()
  return <ReceiptList allLabel={t('receipts.downloadAll')} />
}
