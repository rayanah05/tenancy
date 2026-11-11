import { useState } from 'react'
import { Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../../context/AppContext'
import { Button, Card, Field, StatusBadge } from '../../components/ui'
import { findRequest } from '../../data/mock'
import { PhotoPlaceholder } from './PropertyOverview'

export default function RequestDetails() {
  const { t } = useTranslation()
  const { reqId } = useParams()
  const { base } = useOutletContext()
  const navigate = useNavigate()
  const { notify } = useApp()
  const r = findRequest(reqId)
  const [status, setStatus] = useState(r?.status === 'new' ? 'accepted' : r?.status)
  const [reply, setReply] = useState(r?.reply || '')
  if (!r) return <Navigate to={`${base}/requests`} replace />
  const save = (e) => { e.preventDefault(); notify(t('requests.updated')); navigate(`${base}/requests`) }
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="space-y-3">
        <div className="flex items-start justify-between gap-3"><h2 className="text-lg font-semibold">{r.title}</h2><StatusBadge status={r.status} /></div>
        <p className="muted">{t('requests.reportedBy', { name: r.by, date: r.date })}</p>
        <PhotoPlaceholder label={t('requests.photo')} className="h-48" />
        <p className="text-sm">{r.description}</p>
      </Card>
      <Card>
        <form onSubmit={save} className="space-y-4">
          <Field as="select" label={t('requests.statusLabel')} required value={status} onChange={(e) => setStatus(e.target.value)} hint={t('requests.statusHelp')}>
            {['accepted', 'inProgress', 'fixed'].map((s) => <option key={s} value={s}>{t(`status.${s}`)}</option>)}
          </Field>
          <Field as="textarea" label={t('requests.reply')} placeholder={t('requests.replyPh')} value={reply} onChange={(e) => setReply(e.target.value)} />
          <Button type="submit" full>{t('requests.saveUpdate')}</Button>
        </form>
      </Card>
    </div>
  )
}
