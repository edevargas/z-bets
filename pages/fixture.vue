<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">
      <img src="~/assets/svg/fixture.svg" alt="" class="title-image" />
      {{ $t("fixture") }}
    </h1>
    <p class="subtitle is-3 mb-3">{{ $t("matches_colombia") }}</p>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table
        :class="[
          'table is-hoverable is-striped is-fullwidth vivify fadeIn',
          previousGames,
        ]"
      >
        <tbody>
          <tr v-if="!previousGames">
            <td
              class="is-vcentered is-size-6 load-previous"
              @click="showPrevious"
            >
              {{ $t("load_previous_games") }}
            </td>
          </tr>
          <tr
            v-for="(item, index) in matches"
            :key="index"
            :class="isFinished(item, index)"
          >
            <td class="is-vcentered is-size-5">
              <div class="info">
                {{ item.city }}
                <br />
                {{ item.date.toDate() | formatDate }}
                <div class="tags">
                  <span :class="getTagClasses(item.tournament)">{{
                    $t(item.tournament)
                  }}</span>
                  <span v-if="isFinished(item)" class="tag is-light">{{
                    $t("finished")
                  }}</span>
                </div>
              </div>
              <Match :match="item" keep-row />
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </main>
</template>

<script>
import { getAllMatches } from '~/endpoints/matches'
import { MATCH_STATUS } from '~/plugins/constants'

export default {
  name: 'Matches',
  components: {
    Match: () => import('~/components/bets/Match'),
  },
  data() {
    return {
      loading: true,
      previousGames: '',
      matches: [],
    }
  },
  async created() {
    this.matches = await getAllMatches()
    this.loading = false
  },
  methods: {
    getTagClasses(tournament) {
      const tagColor = tournament === 'qualifiers' ? 'is-success' : 'is-link'
      return `tag ${tagColor} is-light`
    },
    isFinished({ status }, index) {
      return status === MATCH_STATUS.FINISHED ? `is-finished vivify fadeInTop duration-200 delay-${index}00` : ''
    },
    showPrevious() {
      this.previousGames = 'show'
    },
  },
}
</script>

<style lang="scss" scoped>
tr {
  transition: 0.2s;

  &.is-finished {
    display: none;
  }
}

td {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &.load-previous:hover {
    cursor: pointer;
    background: #dfd;
  }
}

table {
  &.show {
    tr.is-finished {
      display: table-row;
      background: #eee;
    }
  }
}

@media (max-width: 767px) {
  td {
    flex-direction: column;
  }
}
</style>