import { BET_STATUS, MATCH_STATUS } from '~/plugins/constants'

export function getAllBets() {
  const bets = $nuxt.$fire.firestore.collection('bets')
  bets.onSnapshot((querySnapshot) => {
    const data = []
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
    $nuxt.$emit('bets', data)
  })
}

export function getBetsByMatch(matchId) {
  const bets = $nuxt.$fire.firestore.collection('bets')
  const query = bets.where('matchId', '==', matchId)
  query.onSnapshot((querySnapshot) => {
    const data = []
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
    $nuxt.$emit('bets-by-match', data)
  })
}

export function getBetsByUser(userId) {
  const bets = $nuxt.$fire.firestore.collection('bets')
  const query = bets.where('userId', '==', userId)
  query.onSnapshot((querySnapshot) => {
    const data = []
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
    $nuxt.$emit('bets-by-user', data)
  })
}

export function isTimeAvailable({ id }) {
  return new Promise((resolve) => {
    const docRef = $nuxt.$fire.firestore.collection('matches').doc(id)
    docRef.get()
      .then((doc) => resolve(doc?.data()?.status === MATCH_STATUS.STARTED))
      .catch(() => resolve(false))
  })
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

export function betApprove(betId, approval) {
  return new Promise((resolve, reject) => {
    const betRef = $nuxt.$fire.firestore.collection('bets').doc(betId)
    betRef.update({
      status: approval ? BET_STATUS.APPROVED : BET_STATUS.DENIED
    })
      .then(() => resolve({ error: null, data: 'ok' }))
      .catch((error) => reject({ error, data: null }))
  })
}