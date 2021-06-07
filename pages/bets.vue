<template>
  <main class="container is-max-desktop mb-5">
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
        <BetsTable :items="wonBets" title="bets_won" user />
        <hr />
      </template>
      <template v-if="pendingBets.length">
        <BetsTable :items="pendingBets" title="bets_pending" user />
        <hr />
      </template>
      <template v-if="inProgressBets.length">
        <BetsTable :items="inProgressBets" title="bets_in_progress" user />
        <hr />
      </template>
      <template v-if="lostBets.length">
        <BetsTable :items="lostBets" title="bets_lost" user />
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
      return this.bets.filter(({ status }) => status === BET_STATUS.PENDING)
    },
    inProgressBets() {
      return this.bets.filter(({ status }) => status === BET_STATUS.IN_PROGRESS)
    },
    wonBets() {
      return this.bets.filter(({ status }) => status === BET_STATUS.WON)
    },
    lostBets() {
      return this.bets.filter(({ status }) => status === BET_STATUS.LOST)
    },
  },
  methods: {
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
  },
}
</script>
