import Vue from 'vue'

Vue.filter('formatDate', (timestamp) => {
  const dateOptions = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
  }
  return timestamp.toLocaleDateString('en-US', dateOptions)
})

Vue.filter('initials', (str) => {
  return str.substring(0, 3)
})

Vue.filter('currency', (value) => {
  const currencyOptions = { style: 'currency', currency: 'COP', maximumSignificantDigits: 3 }
  const amount = new Intl.NumberFormat('es-CO', currencyOptions).format(value)
  return `${amount} COP`
})
