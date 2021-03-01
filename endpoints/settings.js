export function getPaymentSettings() {
  const { firestore } = $nuxt.$fire
  const payments = firestore.collection('settings').doc('payments')
  payments.onSnapshot((doc) => {
    $nuxt.$emit('payments', doc.data())
  })
}
