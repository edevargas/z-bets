export function getNextMatch() {
    const { firestore } = $nuxt.$fire
    const matches = firestore.collection('matches')
    const today = new Date()
    const query = matches.where("date", ">", today).limit(1)
    query.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            $nuxt.$emit('next-match', doc.data())
        });
    });
}