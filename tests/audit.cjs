// Visits every route in EN/AR on mobile/desktop: console errors, axe (WCAG 2.1 AA), horizontal overflow
const { chromium } = require('playwright')
const { AxeBuilder } = require('@axe-core/playwright')
const fs = require('fs')
const out = process.argv[2] || 'axe-results.json'
const ROUTES = ['/', '/login', '/register', '/verify-email', '/forgot-password', '/welcome',
  '/landlord', '/landlord/properties', '/landlord/properties/new', '/landlord/properties/flat-12', '/landlord/properties/flat-12/leases',
  '/landlord/properties/flat-12/rent', '/landlord/properties/flat-12/receipts', '/landlord/properties/flat-12/requests', '/landlord/properties/flat-12/requests/r1',
  '/landlord/properties/villa-2/receipts',
  '/tenant', '/tenant/invite', '/tenant/lease', '/tenant/lease/pay', '/tenant/lease/pay/submitted', '/tenant/lease/history', '/tenant/lease/receipts',
  '/tenant/lease/requests', '/tenant/lease/requests/new', '/tenant/lease/requests/r2', '/settings', '/settings/profile', '/notifications', '/does-not-exist']
;(async () => {
  const browser = await chromium.launch()
  const results = []
  for (const lang of ['en', 'ar']) for (const vp of [{ n: 'mobile', w: 390, h: 844 }, { n: 'desktop', w: 1440, h: 900 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } })
    await ctx.addInitScript((l) => localStorage.setItem('tenancy-lang', l), lang)
    const page = await ctx.newPage()
    for (const r of ROUTES) {
      const errors = []
      page.removeAllListeners('console'); page.removeAllListeners('pageerror')
      page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('ERR_TUNNEL')) errors.push(m.text()) })
      page.on('pageerror', (e) => errors.push(String(e)))
      await page.goto('http://localhost:4173' + r, { waitUntil: 'networkidle' })
      await page.waitForTimeout(150)
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      const dir = await page.evaluate(() => document.documentElement.dir)
      results.push({ route: r, lang, vp: vp.n, dir, overflow, errors, violations: axe.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: v.nodes[0]?.target?.join(' ') })) , passes: axe.passes.length })
    }
    await ctx.close()
  }
  await browser.close()
  fs.writeFileSync(out, JSON.stringify(results, null, 2))
  const v = results.flatMap((x) => x.violations.map((y) => `${x.lang}/${x.vp} ${x.route}: ${y.id} (${y.impact}) x${y.nodes} – ${y.sample}`))
  const e = results.filter((x) => x.errors.length).map((x) => `${x.lang}/${x.vp} ${x.route}: ${x.errors[0]}`)
  const o = results.filter((x) => x.overflow > 0).map((x) => `${x.lang}/${x.vp} ${x.route}: +${x.overflow}px`)
  const d = results.filter((x) => x.dir !== (x.lang === 'ar' ? 'rtl' : 'ltr')).map((x) => `${x.lang} ${x.route}`)
  console.log('page checks:', results.length, '| axe rules passed (avg):', Math.round(results.reduce((s, x) => s + x.passes, 0) / results.length))
  console.log('VIOLATIONS:', v.length); [...new Set(v.map((s) => s.replace(/^\S+ /, '')))].slice(0, 40).forEach((s) => console.log('  ', s))
  console.log('CONSOLE ERRORS:', e.length); e.slice(0, 10).forEach((s) => console.log('  ', s))
  console.log('OVERFLOW:', o.length); o.slice(0, 10).forEach((s) => console.log('  ', s))
  console.log('WRONG DIR:', d.length)
})()
