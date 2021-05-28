<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">{{ $t('fixture') }}</h1>
    <p class="subtitle is-3 mb-3">{{ $t('matches_colombia') }}</p>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table class="table is-hoverable is-fullwidth">
        <tbody>
          <tr v-for="(item, index) in matches" :key="index" :class="{ 'is-finished': isFinished(item)}">
            <td class="is-vcentered is-size-5">
              <div class="info">
                {{ item.city }}
                <br />
                {{ item.date.toDate() | formatDate }}
                <div class="tags">
                  <span :class="getTagClasses(item.tournament)">{{ $t(item.tournament) }}</span>
                  <span v-if="isFinished(item)" class="tag is-light">{{ $t('finished') }}</span>
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
    Match: () => import('~/components/bets/Match')
  },
  data() {
    return {
      loading: true,
      matches: []
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
    isFinished({ status }) {
      return status === MATCH_STATUS.FINISHED
    },
  }
}
</script>

<style lang="scss" scoped>
tr {
  transition: 0.2s;

  &.is-finished {
    background: #eee;
  }
}

td {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: 767px) {
  td {
    flex-direction: column;
  }
}
</style>