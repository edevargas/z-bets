import { BET_STATUS, MATCH_STATUS } from '~/plugins/constants'

export function getAllBets() {
  const bets = $nuxt.$fire.firestore.collection('bets')
  const query = bets.orderBy('timestamp', 'desc')
  query.onSnapshot((querySnapshot) => {
    const data = []
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
    $nuxt.$emit('bets', data)
  })
}

export function getBetsByMatch(matchId) {
  const bets = $nuxt.$fire.firestore.collection('bets')
  const query = bets.where('matchId', '==', matchId).orderBy('timestamp', 'desc')
  query.onSnapshot((querySnapshot) => {
    const data = []
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
    $nuxt.$emit('bets-by-match', data)
  })
}

export function getBetsByUser(userId) {
  const bets = $nuxt.$fire.firestore.collection('bets')
  const query = bets.where('userId', '==', userId).orderBy('timestamp', 'desc')
  query.onSnapshot((querySnapshot) => {
    const data = []
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
    $nuxt.$emit('bets-by-user', data)
  })
}

export function isDuplicatedScoreByUser({ matchId, userId, awayScore, homeScore }) {
  return new Promise((resolve) => {
    const bets = $nuxt.$fire.firestore.collection('bets')
    const query = bets.where('userId', '==', userId)
      .where('matchId', '==', matchId)
      .where('awayScore', '==', awayScore)
      .where('homeScore', '==', homeScore)
    query.get()
      .then((doc) => {
        resolve(doc?.empty)
      })
      .catch(() => resolve(false))
  })
}

export function isTimeAvailable({ id, matchId }) {
  const finalId = id || matchId
  return new Promise((resolve) => {
    const docRef = $nuxt.$fire.firestore.collection('matches').doc(finalId)
    docRef.get()
      .then((doc) => {
        const matchData = doc?.data()
        resolve(matchData.status === MATCH_STATUS.PENDING)
      })
      .catch(() => resolve(false))
  })
}

export function betting(payload) {
  return new Promise((resolve, reject) => {
    const finalBet = {
      ...payload,
      timestamp: $nuxt.$fireModule.firestore.Timestamp.now(),
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
      status: approval ? BET_STATUS.APPROVED : BET_STATUS.DENIED,
    })
      .then(() => resolve({ error: null, data: 'ok' }))
      .catch((error) => reject({ error, data: null }))
  })
}

export function deleteBet(betId) {
  return new Promise((resolve) => {
    const betRef = $nuxt.$fire.firestore.collection('bets').doc(betId)
    betRef.get()
      .then((doc) => {
        isTimeAvailable(doc.data())
          .then((validateStatus) => {
            if (validateStatus) {
              betRef.delete()
                .then(() => resolve({ error: null, data: 'ok' }))
                .catch((error) => resolve({ error, data: null }))
            } else {
              resolve({ error: $nuxt.$t('unavailable_bet_deletition'), data: null })
            }

          })
          .catch((error) => resolve({ error, data: null }))
      })
      .catch((error) => resolve({ error, data: null }))
  })
}