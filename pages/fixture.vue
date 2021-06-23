<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">
      <img src="~/assets/svg/fixture.svg" alt="" class="title-image" />
      {{ $t("fixture") }}
    </h1>
    <p class="subtitle is-3 mb-3">{{ $t("matches_colombia") }}</p>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table class="table is-hoverable is-striped is-fullwidth vivify fadeIn">
        <tbody>
          <tr v-if="!previousGames">
            <td
              class="is-vcentered is-size-6 load-previous"
              @click="showPrevious"
            >
              {{ $t("load_previous_games") }}
            </td>
          </tr>
          <template v-for="(item, index) in matches">
            <MatchRow
              :key="`match-${index}`"
              :item="item"
              :index="index"
              :previous-games="previousGames"
              hide-previous
              @show-bets="showBets(item)"
            />
            <div
              :key="`bets-${index}`"
              :class="['bets-table', matchIdToGetBets === item.id ? 'show' : '']"
            >
              <BetsTable
                :items="betsByMatch[item.id]"
                user
                allow-groups
                show-won
                subtitle="bets_results"
              />
            </div>
          </template>
        </tbody>
      </table>
    </template>
  </main>
</template>

<script>
import { getAllMatches } from '~/endpoints/matches'
import { getBetsByMatch } from '~/endpoints/bets'

export default {
  name: 'Fixture',
  components: {
    MatchRow: () => import('~/components/matches/MatchRow'),
  },
  data() {
    return {
      loading: true,
      previousGames: '',
      matches: [],
      matchIdToGetBets: '',
      betsByMatch: {},
    }
  },
  async created() {
    this.matches = await getAllMatches()
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
    showPrevious() {
      this.previousGames = 'show'
    },
    showBets({ id }) {
      if (!this.betsByMatch[id]) {
        getBetsByMatch(id)
      }
      this.matchIdToGetBets = this.matchIdToGetBets ? '' : id
    },
  },
}
</script>

<style lang="scss" scoped>
td {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &.load-previous:hover {
    cursor: pointer;
    background: #dfd;
  }
}

.bets-table {
  display: none;
  padding: 0.1rem 1rem 1rem 1rem;
  background: #ddd;

  &.show {
    display: block;
  }
}
</style>