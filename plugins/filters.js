import Vue from 'vue'
import { FLAGS_API_FIFA } from './constants'

Vue.filter('formatDate', (timestamp) => {
  const dateOptions = {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric',
  }
  const dateCodes = {
    en: 'en-US',
    es: 'es-CO',
  }
  return timestamp.toLocaleDateString(dateCodes[$nuxt.$i18n.locale], dateOptions)
})

Vue.filter('currency', (value) => {
  const currencyOptions = { style: 'currency', currency: 'COP', maximumSignificantDigits: 3 }
  const amount = new Intl.NumberFormat('es-CO', currencyOptions).format(value)
  return `${amount} COP`
})

Vue.filter('flag', (teamId) => `${FLAGS_API_FIFA}${teamId}`)
