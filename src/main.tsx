import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import global_fa from './translations/fa/global.json'
import global_en from './translations/en/global.json'

i18next.init({
 interpolation: { escapeValue: false },
  lng: 'auto',
  fallbackLng: 'en',
 resources: {
  en: {
   global: global_en,
  },
  fa: {
   global: global_fa,
  },
 },
})

createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
)
