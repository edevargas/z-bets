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
      <template v-if="wonBets.length">
        <p class="subtitle is-3 mt-1 mb-3">{{ $t("bets_won") }}</p>
        <BetsTable :items="wonBets" user keep-row />
        <hr />
      </template>
      <template v-if="pendingBets.length">
        <p class="subtitle is-3 mt-1 mb-3">{{ $t("bets_pending") }}</p>
        <BetsTable :items="pendingBets" user keep-row />
        <hr />
      </template>
      <template v-if="inProgressBets.length">
        <p class="subtitle is-3 mt-1 mb-3">{{ $t("bets_in_progress") }}</p>
        <BetsTable :items="inProgressBets" user keep-row />
        <hr />
      </template>
      <template v-if="lostBets.length">
        <p class="subtitle is-3 mt-1 mb-3">{{ $t("bets_lost") }}</p>
        <BetsTable :items="lostBets" user keep-row />
      </template>
      <table v-if="bets.length === 0" class="table is-fullwidth">
        <tbody>
          <tr class="has-text-centered is-size-5">
            {{
              $t("still_no_items")
            }}
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
import { BET_STATUS } from '~/plugins/constants'

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
    pendingBets() {
      return this.bets.filter(({ status }) => status === BET_STATUS.PENDING).sort(this.sorter)
    },
    inProgressBets() {
      return this.bets.filter(({ status }) => status === BET_STATUS.IN_PROGRESS).sort(this.sorter)
    },
    wonBets() {
      return this.bets.filter(({ status }) => status === BET_STATUS.WON).sort(this.sorter)
    },
    lostBets() {
      return this.bets.filter(({ status }) => status === BET_STATUS.LOST).sort(this.sorter)
    },
  },
  methods: {
    sorter(firstEl, secondEl) {
      return firstEl.homeScore - secondEl.homeScore
    },
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
  },
}
</script>
