<template>
  <div>
    <NextGame />
    <div class="container">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    NextGame: () => import('~/components/NextGame'),
  },
  mounted() {
    this.retrieveData()
  },
  methods: {
    async retrieveData() {
      // this.$fire
      console.log("🚀 ~ file: index.vue ~ line 18 ~ mounted ~ this.$fire", this.$fire)
      const { firestore } = this.$fire
      const today = Date.now()
      console.log("🚀 ~ file: index.vue ~ line 24 ~ retrieveData ~ today", today)
      const docRef = firestore.collection('matches')
      const filterData = await docRef.where('date', '<', today)
      console.log("🚀 ~ file: index.vue ~ line 26 ~ retrieveData ~ filterData", filterData)
      const getData = await filterData.get()
      console.log("🚀 ~ file: index.vue ~ line 28 ~ retrieveData ~ getData", getData)
      getData.forEach((item) => {
        console.log("🚀 ~ file: index.vue ~ line 31 ~ getData.forEach ~ item", item)
        console.log("🚀 ~ file: index.vue ~ line 31 ~ getData.forEach ~ item", item.data())
      })

      // firestore.collection("matches").where("date", ">", today)
      //   .get()
      //   .then(function(querySnapshot) {
      //       querySnapshot.forEach(function(doc) {
      //           // doc.data() is never undefined for query doc snapshots
      //           console.log(doc.id, " => ", doc.data());
      //       });
      //   })
      //   .catch(function(error) {
      //       console.log("Error getting documents: ", error);
      //   });
    }
  }
}
</script>