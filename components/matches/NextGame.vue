<template>
  <div class="wrapper is-flex is-flex-direction-column">
    <section class="hero transparent is-dark">
      <h1 class="title has-text-centered mt-5 mb-0">
        {{ title }}
      </h1>
      <div class="hero-body pt-2">
        <div
          v-if="isAvailable"
          class="container has-text-centered vivify fadeIn"
        >
          <TournamentTag :tournament="nextGame.tournament" class="my-3" />
          <Match :match="nextGame" is-title />

          <div
            v-if="isStarted"
            class="is-flex is-justify-content-center subtitle is-4 my-2 vivify fadeIn"
          >
            <div class="vivify pulsate infinite mr-2">⚽️</div>
            {{ $t("realtime") }}
          </div>
          <p v-else class="subtitle is-4 my-2">
            {{ nextGame.date.toDate() | formatDate }}
          </p>
          <p class="subtitle is-4 mb-5">{{ nextGame.city }}</p>

          <button
            type="button"
            :class="['button is-rounded', isEnabled ? 'is-primary' : 'is-warning']"
            :disabled="!isEnabled"
            @click="$store.commit('setMatchToBet', nextGame)"
          >
            {{ $t(isEnabled ? "bet_here" : "coming_soon") }}
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
import { MATCH_STATUS } from '~/plugins/constants'

export default {
  name: 'NextGame',
  components: {
    Match: () => import('~/components/matches/Match'),
    TournamentTag: () => import('~/components/matches/TournamentTag'),
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      enabledBets: false,
      nextGame: {},
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
    title() {
      const mapper = {
        [MATCH_STATUS.PENDING]: 'next_game',
        [MATCH_STATUS.STARTED]: 'game_in_progress',
        [MATCH_STATUS.FINISHED]: 'final_score',
      }
      return this.$t(mapper[this.nextGame.status])
    },
    isAvailable() {
      return Object.keys(this.nextGame).length
    },
    isPending() {
      return this.nextGame.status === MATCH_STATUS.PENDING
    },
    isStarted() {
      return this.nextGame.status === MATCH_STATUS.STARTED
    },
    isFinished() {
      return this.nextGame.status === MATCH_STATUS.FINISHED
    },
    isEnabled() {
      return this.enabledBets ? this.user && this.isPending : false
    },
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
