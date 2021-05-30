<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">
      <img src="~/assets/svg/live.svg" alt="" class="title-image" />
      {{ $t("realtime_bets") }}
    </h1>
    <h2
      class="title is-4 has-background-dark has-text-centered has-text-primary py-2 mb-2"
    >
      {{ $t("amount_collected") }} {{ totalAmount | currency }}
    </h2>
    <h2 class="title is-3 has-text-centered has-text-primary py-2 mb-5">
      <Match :match="nextGame" is-title />
    </h2>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <p class="subtitle is-3 mt-1 mb-3">{{ $t("bets_in_progress") }}</p>
      <BetsTable :items="inProgressBets" user keep-row />
      <hr />
      <template v-if="lostBets.length">
        <p class="subtitle is-3 mt-1 mb-3">{{ $t("bets_lost") }}</p>
        <BetsTable :items="lostBets" user keep-row />
      </template>
    </template>
  </main>
</template>

<script>
import { getBetSettings } from '~/endpoints/settings'
import { getNextMatch } from '~/endpoints/matches'
import { getBetsByMatch } from '~/endpoints/bets'

export default {
  name: 'Bets',
  meta: {
    requiresAuth: true,
  },
  components: {
    Match: () => import('~/components/bets/Match'),
    BetsTable: () => import('~/components/bets/BetsTable'),
  },
  data() {
    return {
      loading: true,
      nextGame: undefined,
      betSettings: {},
      bets: [],
    }
  },
  created() {
    getBetSettings()
    getNextMatch()
    // realtime listener
    this.$nuxt.$on('bet-settings', (data) => (this.betSettings = data))
    this.$nuxt.$on('next-match', (data) => {
      this.nextGame = data
      getBetsByMatch(data.id)
    })
    this.$nuxt.$on('bets-by-match', (data) => {
      this.bets = data
      if (this.loading) this.loading = false
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('bet-settings')
    this.$nuxt.$off('next-match')
    this.$nuxt.$off('bets-by-match')
  },
  computed: {
    totalAmount() {
      if (!this.betSettings) {
        return 0
      }

      return this.bets.length * this.betSettings.amount || 0
    },
    inProgressBets() {
      return this.bets.filter(this.currentScoreLower).sort(this.sorter)
    },
    lostBets() {
      return this.bets.filter(this.currentScoreBigger).sort(this.sorter)
    },
  },
  methods: {
    currentScoreLower({ homeScore, awayScore }) {
      return this.nextGame.homeScore <= homeScore && this.nextGame.awayScore <= awayScore
    },
    currentScoreBigger({ homeScore, awayScore }) {
      return this.nextGame.homeScore > homeScore || this.nextGame.awayScore > awayScore
    },
    sorter(firstEl, secondEl) {
      return firstEl.homeScore - secondEl.homeScore
    },
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
  },
}
</script>
