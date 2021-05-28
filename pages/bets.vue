<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">{{ $t('realtime_bets') }}</h1>
    <h2 class="title is-3 has-background-dark has-text-centered has-text-primary py-2 mb-2">
      {{ $t('amount_collected') }} {{ totalAmount | currency }}
    </h2>
    <h2 class="title is-3 has-text-centered has-text-primary py-2 mb-5">
      <Match :match="nextGame" is-title />
    </h2>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <p class="subtitle is-3 mt-1 mb-3">{{ $t('bets_in_progress') }}</p>
      
      <table class="table is-hoverable is-fullwidth">
        <tbody>
          <BetItemRow v-for="(item, index) in inProgressBets" :key="index" :item="item" />
          <tr v-if="inProgressBets.length === 0" class="has-text-centered is-size-5">
            {{ $t('still_no_items') }}
          </tr>
        </tbody>
      </table>
      
      <p class="subtitle is-3 mt-1 mb-3">{{ $t('bets_lost') }}</p>
      <table class="table is-hoverable is-fullwidth">
        <tbody>
          <BetItemRow v-for="(item, index) in lostBets" :key="index" :item="item" />
          <tr v-if="lostBets.length === 0" class="has-text-centered is-size-5">
            {{ $t('still_no_items') }}
          </tr>
        </tbody>
      </table>
      
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
    BetItemRow: () => import('~/components/bets/BetItemRow'),
  },
  data() {
    return {
      loading: true,
      nextGame: undefined,
      betSettings: {},
      bets: []
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
      return this.bets
        .filter(this.currentScoreLower)
        .sort(this.sorter)
    },
    lostBets() {
      return this.bets
        .filter(this.currentScoreBigger)
        .sort(this.sorter)
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
    getScore(item) {
      const { homeScore, awayScore } = item
      return { homeScore, awayScore }
    },
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
  }
}
</script>
