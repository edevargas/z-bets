<template>
  <div class="wrapper is-flex is-flex-direction-column">
    <section class="hero transparent is-dark">
      <h1 class="title has-text-centered mt-5 mb-0">{{ $t('next_game') }}</h1>
      <div class="hero-body pt-5">
        <div v-if="isAvailable" class="container has-text-centered vivify fadeIn">
          <Match :match="nextGame" is-title />
          <p class="subtitle is-4 mt-2 mb-2">
            {{ nextGame.date.toDate() | formatDate }}
          </p>
          <p class="subtitle is-4 mb-5">{{ nextGame.city }}</p>

          <button
            v-if="user"
            type="button"
            :class="[zButton, 'is-primary']"
            @click="$store.commit('setMatchToBet', nextGame)"
          >
            {{ $t('bet_now') }}
          </button>
        </div>
        <progress v-else class="progress is-primary my-6" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNextMatch } from '~/endpoints/matches'

export default {
  name: 'NextGame',
  components: {
    Match: () => import('~/components/bets/Match')
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      nextGame: {},
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
  created() {
    getNextMatch()
    // realtime listener
    this.$nuxt.$on('next-match', (data) => (this.nextGame = data))
  },
  beforeDestroy() {
    this.$nuxt.$off('next-match')
  },
}
</script>
