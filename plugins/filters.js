import Vue from 'vue'

Vue.filter('formatDate', (timestamp) => {
  const dateOptions = {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
  }
  const dateCodes = {
    en: 'en-US',
    es: 'es-CO',
  }
  return timestamp.toLocaleDateString(dateCodes[$nuxt.$i18n.locale], dateOptions)
})

Vue.filter('initials', (str) => {
  return str.substring(0, 3)
})

Vue.filter('currency', (value) => {
  const currencyOptions = { style: 'currency', currency: 'COP', maximumSignificantDigits: 3 }
  const amount = new Intl.NumberFormat('es-CO', currencyOptions).format(value)
  return `${amount} COP`
})
