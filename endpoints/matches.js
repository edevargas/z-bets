import { MATCH_STATUS } from '~/plugins/constants'

export async function getNextMatch() {
  const nextMatch = $nuxt.$fire.firestore.collection('settings').doc('next-match')
  const doc = await nextMatch.get()
  const { matchId } = doc.data()

  const matches = $nuxt.$fire.firestore.collection('matches').doc(matchId)
  matches.onSnapshot((doc) => {
    $nuxt.$emit('next-match', { ...doc.data(), id: doc.id })
  })
}

export async function getAllMatches() {
  const matches = $nuxt.$fire.firestore.collection('matches')
  const { docs } = await matches.orderBy('date', 'asc').get()
  // TODO Check reactivity in UI
  return docs.map((item) => ({ ...item.data(), id: item.id }))
}

export async function getFinishedMatches() {
  const MATCHES_WITH_BETS = new Date('2021-06-01')
  const matches = $nuxt.$fire.firestore.collection('matches')
  const { docs } = await matches
    .where('status', '==', MATCH_STATUS.FINISHED)
    .where('date', '>', MATCHES_WITH_BETS)
    .orderBy('date', 'asc').get()

  return docs.map((item) => ({ ...item.data(), id: item.id }))
}
