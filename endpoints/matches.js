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
