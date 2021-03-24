import en from './locales/en.json'
import es from './locales/es.json'

export default {
  locales: [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'es',
      name: 'Español',
      flag: '🇨🇴'
    }
  ],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    messages: { en, es }
  }
}