import { BET_STATUS } from '~/plugins/constants'

export function getBetsByMatch(matchId, onlyApproved = true) {
  const bets = $nuxt.$fire.firestore.collection('bets')
  let query = bets.where('matchId', '==', matchId)
  if (onlyApproved) {
    query = query.where('status', '==', BET_STATUS.APPROVED)
  }
  query.onSnapshot((querySnapshot) => {
    const data = []
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
    $nuxt.$emit('bets-by-match', data)
  })
}

export async function getBetsByUser(userId) {
  const bets = $nuxt.$fire.firestore.collection('bets')
  const { docs } = await bets.where('userId', '==', userId).get()
  // TODO Check reactivity in UI
  return docs.map((item) => item.data())
}

export function betting(payload) {
  return new Promise((resolve, reject) => {
    const finalBet = {
      ...payload,
      timestamp: $nuxt.$fireModule.firestore.Timestamp.now()
    }
    $nuxt.$fire.firestore.collection('bets').add(finalBet)
      .then((docRef) => resolve({ error: null, data: docRef.id }))
      .catch((error) => reject({ error, data: null }))
  })
}