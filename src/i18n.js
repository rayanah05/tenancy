import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ar from './locales/ar.json'

const saved = (() => { try { return localStorage.getItem('tenancy-lang') } catch { return null } })()

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: saved || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

// Keep <html lang> and dir in sync so Arabic renders right-to-left
const applyDir = (lng) => {
  document.documentElement.lang = lng
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
  try { localStorage.setItem('tenancy-lang', lng) } catch { /* private mode */ }
}
applyDir(i18n.language)
i18n.on('languageChanged', applyDir)

export default i18n
