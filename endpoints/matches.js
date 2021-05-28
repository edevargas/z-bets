import { MATCH_STATUS } from '~/plugins/constants'
const { PENDING, STARTED } = MATCH_STATUS

export function getNextMatch() {
  const matches = $nuxt.$fire.firestore.collection('matches')
  const query = matches.where('status', 'in', [PENDING, STARTED]).orderBy('date', 'asc').limit(1)
  query.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      $nuxt.$emit('next-match', { ...doc.data(), id: doc.id })
    })
  })
}

export async function getAllMatches() {
  const matches = $nuxt.$fire.firestore.collection('matches')
  const { docs } = await matches.orderBy('date', 'asc').get()
  // TODO Check reactivity in UI
  return docs.map((item) => ({ ...item.data(), id: item.id }))
}
