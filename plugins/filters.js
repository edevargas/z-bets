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
