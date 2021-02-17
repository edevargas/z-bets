<template>  
  <div class="wrapper is-flex is-flex-direction-column">
    <h1 class="title has-text-centered my-4">
      Next Game
    </h1>
    <section class="hero is-dark mt-1">
      <div class="hero-body">
        <div v-if="isAvailable" class="container has-text-centered">
          <Match wrapper-classes="is-flex-wrap-nowrap" :match="nextGame" is-title />
          <p class="subtitle is-4 mt-1 mb-1">{{ nextGame.date.toDate() | formatDate }}</p>
          <p class="subtitle is-4 mb-4">{{ nextGame.city }}</p>
          
          <button v-if="user" type="button" class="button is-outlined is-rounded is-primary" @click="$emit('bet-now')">
            Bet now
          </button>
        </div>
      </div>
    </section>
  </div>    
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NextGame',
  components: {
    Match: () => import('~/components/Match'),
  },
  props: {
    nextGame: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    isAvailable() {
      return Object.keys(this.nextGame).length
    }
  },
}
</script>

<style lang="scss" scoped>
.hero {
  background: rgba($color: #111, $alpha: 0.7) !important;
}
</style>