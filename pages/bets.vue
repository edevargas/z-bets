<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">{{ $t('realtime_bets') }}</h1>
    <p class="subtitle is-3 mb-3">{{ $t('scores') }}</p>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table class="table is-hoverable is-fullwidth">
        <tbody>
          <template v-for="(item, index) in bets">
            <tr :key="index">
              <td class="is-size-5">
                <div class="user">
                  <Avatar :user="item.user" />
                  {{ item.user.displayName }}
                </div>
                <div class="bet">
                  <img
                    :src="item.match.homeFlag"
                    :alt="item.match.homeTeam"
                    class="mx-2"
                  />
                  <div class="score">
                    {{ item.homeScore }}
                    -
                    {{ item.awayScore }}
                  </div>
                  <img :src="item.match.awayFlag" class="mx-2" />
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <p v-if="bets.length === 0" class="has-text-centered is-size-5">
        {{ $t('still_no_items') }}
      </p>
    </template>
  </main>
</template>

<script>
import { getNextMatch } from '~/endpoints/matches'
import { getBetsByMatch } from '~/endpoints/bets'

export default {
  name: 'Bets',
  meta: {
    requiresAuth: true
  },
  components: {
    NextGame: () => import('~/components/bets/NextGame'),
    Avatar: () => import('~/components/utils/Avatar')
  },
  data() {
    return {
      loading: true,
      nextGame: undefined,
      bets: []
    }
  },
  created() {
    getNextMatch()
    // realtime listener
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
    this.$nuxt.$off('next-match')
    this.$nuxt.$off('bets-by-match')
  }
}
</script>

<style lang="scss" scoped>
td {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .user,
  .bet {
    display: flex;
    align-items: center;
  }

  .score {
    display: inline-flex;
    min-width: 50px;
    justify-content: center;
  }
}

@media (max-width: 767px) {
  td {
    flex-direction: column;

    .user {
      width: 100%;
      justify-content: flex-start;
    }

    .bet {
      width: 100%;
      justify-content: flex-end;
    }
  }
}
</style>