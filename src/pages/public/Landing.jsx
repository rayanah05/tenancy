import { useTranslation } from 'react-i18next'
import { ButtonLink, Icon } from '../../components/ui'

export default function Landing() {
  const { t } = useTranslation()
  const features = [['rent', 'receipt', 'f1t', 'f1'], ['receipts', 'download', 'f2t', 'f2'], ['repairs', 'wrench', 'f3t', 'f3']]
  return (
    <>
      <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('landing.title')}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-muted">{t('landing.subtitle')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/register" className="sm:w-48">{t('landing.create')}</ButtonLink>
            <ButtonLink to="/login" variant="secondary" className="sm:w-48">{t('landing.login')}</ButtonLink>
          </div>
          <p className="muted mt-4">{t('landing.oneAccount')}</p>
        </div>
        {/* Illustration: a fanned wallet of key tags */}
        <div aria-hidden="true" className="relative mx-auto h-[250px] w-full max-w-[380px]">
          <div className="absolute inset-x-8 top-1 h-[120px] -rotate-6 rounded-[20px] bg-brand-200 px-5 py-3.5"><span className="flex items-center gap-2 font-bold"><span className="tag-ring text-brand-600" />Villa 2</span></div>
          <div className="absolute inset-x-4 top-11 h-[120px] rotate-3 rounded-[20px] bg-brand-300 px-5 py-3.5"><span className="flex items-center justify-between font-bold"><span className="flex items-center gap-2"><span className="tag-ring" />Flat 4</span><span className="rounded-full bg-warn-bg px-2.5 py-0.5 text-xs text-warn-fg">{t('status.pending')}</span></span></div>
          <div className="absolute inset-x-0 top-[100px] flex h-[140px] flex-col justify-between rounded-[22px] bg-brand-600 px-5 py-4 text-white shadow-[0_10px_24px_rgba(36,30,38,0.18)]">
            <span className="flex items-center justify-between font-bold"><span className="flex items-center gap-2"><span className="tag-ring" />Flat 12</span><span className="rounded-full bg-ok-bg px-2.5 py-0.5 text-xs text-ok-fg">{t('status.paid')}</span></span>
            <span className="text-3xl font-bold">BHD 300</span>
          </div>
        </div>
      </section>
      <section aria-labelledby="features" className="mt-16">
        <h2 id="features" className="sr-only">Features</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map(([k, icon, title, text]) => (
            <li key={k} className="card">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon name={icon} /></span>
              <h3 className="mt-3 font-semibold">{t(`landing.${title}`)}</h3>
              <p className="muted mt-1">{t(`landing.${text}`)}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
