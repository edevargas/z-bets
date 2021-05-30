import en from './locales/en.json'
import es from './locales/es.json'

export default {
  locales: [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
    },
    {
      code: 'es',
      name: 'Español',
      flag: '🇨🇴',
    },
  ],
  defaultLocale: 'es',
  strategy: 'no_prefix',
  vueI18n: {
    fallbackLocale: 'es',
    lazy: true,
    langDir: 'locales/',
    messages: { en, es },
  },
}