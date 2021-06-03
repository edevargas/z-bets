<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">{{ $t("bets_history") }}</h1>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <BetsTable v-else :items="bets" user timestamp keep-row>
      <template v-slot="{ item }">
        <BetEditButtons
          :key="item.id"
          :item="item"
          edit-button
          @edit="editBet()"
        />
      </template>
    </BetsTable>
  </main>
</template>

<script>
import { getAllBets } from '~/endpoints/bets'

export default {
  name: 'BetsApproval',
  meta: {
    requiresAuth: true,
    adminAccess: 'bets_history',
  },
  components: {
    BetsTable: () => import('~/components/bets/BetsTable'),
    BetEditButtons: () => import('~/components/bets/BetEditButtons'),
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      loading: true,
      bets: [],
    }
  },
  created() {
    getAllBets()
    // realtime listener
    this.$nuxt.$on('bets', (data) => {
      this.bets = data
      if (this.loading) this.loading = false
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('bets')
  },
  methods: {
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
  },
}
</script>

<style lang="scss">
// TODO: Edit bet
tr:hover {
  .status {
    display: block !important;
  }
}
</style>