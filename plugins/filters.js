import Vue from 'vue'

Vue.filter('formatDate', (timestamp) => {
  const dateOptions = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
  }
  return timestamp.toLocaleDateString('es-CO', dateOptions)
})
