<template>  
  <div class="wrapper is-flex is-flex-direction-column">
    <section class="hero transparent is-dark">
      <h1 class="title has-text-centered mt-5 mb-0">
        Next Game
      </h1>
      <div class="hero-body">
        <div v-if="isAvailable" class="container has-text-centered">
          <Match wrapper-classes="is-flex-wrap-nowrap" :match="nextGame" is-title />
          <p class="subtitle is-4 mt-1 mb-1">{{ nextGame.date.toDate() | formatDate }}</p>
          <p class="subtitle is-4 mb-4">{{ nextGame.city }}</p>
          
          <button v-if="user" type="button" :class="[zButton, 'is-primary']" @click="$emit('bet-now')">
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
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON
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