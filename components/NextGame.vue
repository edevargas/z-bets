<template>  
  <div class="is-flex is-flex-direction-column">
    <h1 class="title has-text-centered my-4">
      Next Game
    </h1>
    <section class="hero is-dark mt-1">
      <div class="hero-body">
        <div class="container">
          <p class="title is-1 has-text-centered">
            {{ nextGame.homeTeam }} <img :src="nextGame.homeFlag" :alt="nextGame.homeTeam">
            {{ nextGame.homeScore }} - {{ nextGame.awayScore }}
            <img :src="nextGame.awayFlag" :alt="nextGame.awayTeam"> {{ nextGame.awayTeam }}
          </p>
          <p class="subtitle is-4 has-text-centered mb-1">{{ nextGame.date }}</p>
          <p class="subtitle is-4 has-text-centered">{{ nextGame.city }}</p>
        </div>
      </div>
    </section>
  </div>    
</template>

<script>
export default {
  name: 'NextGame',
  components: {
      Team: () => import('~/components/Team'),
  },
  data() {
    return {
      nextGame: {}
    }
  },
  created() {
    this.loadNextGame()
  },
  methods: {
    async loadNextGame() {
      const { firestore } = this.$fire
      const today = new Date()
      const collectionRef = firestore.collection('matches')
      const query = await collectionRef.where("date", ">", today).limit(1)
      query.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.nextGame = doc.data();
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-teams {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 100px 1fr;
  column-gap: 1rem;
  align-items: center;
  justify-content: center;
}
</style>