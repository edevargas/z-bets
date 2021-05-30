export function getBetSettings() {
  const { firestore } = $nuxt.$fire
  const betSettings = firestore.collection('settings').doc('bets')
  betSettings.onSnapshot((doc) => {
    $nuxt.$emit('bet-settings', doc.data())
  })
}

export function getPaymentSettings() {
  const { firestore } = $nuxt.$fire
  const paymentSettings = firestore.collection('settings').doc('payments')
  paymentSettings.onSnapshot((doc) => {
    $nuxt.$emit('payment-settings', doc.data())
  })
}
