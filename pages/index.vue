<template>
  <div>
    <NextGame :next-game="nextGame" />
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    NextGame: () => import('~/components/NextGame'),
  },
  data() {
    return {
      nextGame: undefined,
    }
  },
  mounted() {
    this.retrieveData()
  },
  methods: {
    async retrieveData() {
      const { firestore } = this.$fire
      const today = new Date()
      const docRef = firestore.collection('matches')
      const { docs } = await docRef.where("date", ">", today).limit(1).get()
      const [ item ] = docs
      this.nextGame = item.data()
    }
  }
}
</script>