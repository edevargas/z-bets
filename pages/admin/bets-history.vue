<template>
  <main class="container is-max-desktop bet-history">
    <h1 class="title is-1 mt-4">{{ $t("bets_history") }}</h1>
    <p class="subtitle is-3 mb-3">{{ $t("bets_history_subtitle") }}</p>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table class="table is-hoverable is-striped is-fullwidth vivify fadeIn">
        <tbody>
          <template v-for="(item, index) in matches">
            <MatchRow
              :key="`match-${index}`"
              :item="item"
              :index="index"
              previous-games
              @show-bets="showBets(item)"
            />
            <div
              :key="`bets-${index}`"
              :class="['bets-table', matchIdToGetBets === item.id ? 'show' : '']"
            >
              <BetsTable
                :items="betsByMatch[item.id]"
                user
                timestamp
                show-won
                subtitle="bets_results"
              >
                <template v-slot="{ item }">
                  <BetEditButtons
                    :key="item.id"
                    :item="item"
                  />
                  <!-- TODO: Edit bet by admin -->
                  <!-- edit-button
                  @edit="editBet()" -->
                </template>
              </BetsTable>
            </div>
          </template>
        </tbody>
      </table>
    </template>

  </main>
</template>

<script>
import { getFinishedMatches } from '~/endpoints/matches'
import { getBetsByMatch } from '~/endpoints/bets'

export default {
  name: 'BetsHistory',
  meta: {
    requiresAuth: true,
    adminAccess: 'bets_history',
  },
  components: {
    MatchRow: () => import('~/components/matches/MatchRow'),
    BetsTable: () => import('~/components/bets/BetsTable'),
    BetEditButtons: () => import('~/components/bets/BetEditButtons'),
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      loading: true,
      matches: [],
      matchIdToGetBets: '',
      betsByMatch: {},
    }
  },
  async created() {
    this.matches = await getFinishedMatches()
    this.loading = false

    this.$nuxt.$on('bets-by-match', (data) => {
      if (data) {
        this.$set(this.betsByMatch, this.matchIdToGetBets, data)
      }
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('bets-by-match')
  },
  methods: {
    showBets({ id }) {
      if (!this.betsByMatch[id]) {
        getBetsByMatch(id)
      }
      this.matchIdToGetBets = this.matchIdToGetBets ? '' : id
    },
  },
}
</script>

<style lang="scss">
// TODO: Edit bet
.bets-table {
  display: none;
  padding: 0.1rem 1rem 1rem 1rem;
  background: #ddd;

  &.show {
    display: block;
  }
}
</style>