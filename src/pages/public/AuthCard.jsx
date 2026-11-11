import { LogoMark } from '../../components/ui'
export default function AuthCard({ title, sub, children }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-[26px] border border-ink-line bg-white p-6 sm:p-8">
        <LogoMark className="mb-4 h-14 w-14" />
        <h1 className="text-[26px] font-bold tracking-tight">{title}</h1>
        {sub && <p className="muted mt-1">{sub}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
