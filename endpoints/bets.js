export function getBetsByMatch(matchId) {
  const { firestore } = $nuxt.$fire
  const bets = firestore.collection('bets')
  const query = bets.where('matchId', '==', matchId)
  query.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      $nuxt.$emit('bets-by-match', doc.data())
    })
  })
}

export async function getBetsByUser(userId) {
  const { firestore } = $nuxt.$fire
  const bets = firestore.collection('bets')
  const { docs } = await bets.where('userId', '==', userId).get()
  // TODO Check reactivity in UI
  return docs.map((item) => item.data())
}

export function betting(payload) {
  return new Promise((resolve, reject) => {
    const { firestore } = $nuxt.$fire
    firestore.collection('bets').add(payload)
      .then((docRef) => resolve({ error: null, data: docRef.id }))
      .catch((error) => reject({ error, data: null }))
  })
}