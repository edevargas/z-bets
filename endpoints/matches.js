
export async function getNextMatch() {
    const { firestore } = $nuxt.$fire
    return new Promise((resolve, reject) => {
        const today = new Date()
        const matches = firestore.collection('matches')
        const query = matches.where("date", ">", today).limit(1)
        console.log("🚀 ~ file: matches.js ~ line 7 ~ getNextMatch ~ query", query)
        // let final
        query.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                resolve(doc.data())
            });
        });
    })
}


