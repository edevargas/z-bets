<template>  
  <div class="wrapper is-flex is-flex-direction-column">
    <h1 class="title has-text-centered my-4">
      Next Game
    </h1>
    <section class="hero is-dark mt-1">
      <div class="hero-body">
        <div v-if="isAvailable" class="container">
          <p class="title is-1 has-text-centered">
            {{ nextGame.homeTeam }} <img :src="nextGame.homeFlag" :alt="nextGame.homeTeam">
            {{ nextGame.homeScore }} - {{ nextGame.awayScore }}
            <img :src="nextGame.awayFlag" :alt="nextGame.awayTeam"> {{ nextGame.awayTeam }}
          </p>
          <p class="subtitle is-4 has-text-centered mb-1">{{ nextGame.date.toDate() | formatDate }}</p>
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
  props: {
    nextGame: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isAvailable() {
      return Object.keys(this.nextGame).length
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  background: rgba($color: #111, $alpha: 0.7) !important;
}
</style>