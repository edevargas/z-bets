<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">Realtime bets</h1>
    <p class="subtitle is-3 mb-0">Bets</p>
    
    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <NextGame v-if="nextGame.status === 'pending'" :next-game="nextGame" class="my-4" />
      <Match v-else wrapper-classes="is-flex-wrap-nowrap my-4" :match="nextGame" is-title />

      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr class="has-text-centered is-size-5 is-selected">
            <th>User</th>
            <th>Betting</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in bets" >
            <tr :key="index">
              <td class="is-flex has-text-left is-vcentered is-size-5">
                <Avatar :user="item.user" />
                {{ item.user.displayName }}
              </td>
              <td class="has-text-centered is-vcentered is-size-5">
                {{ item.homeScore }}
                -
                {{ item.awayScore }}
              </td>
              <td class="has-text-centered is-vcentered is-size-5" width="25%">
                <div class="status">{{ item.status }}</div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
  </main>
</template>

<script>
import { getNextMatch } from '~/endpoints/matches'
import { getBetsByMatch } from '~/endpoints/bets'

export default {
  name: 'Bets',
  meta: {
    requiresAuth: true,
  },
  components: {
    NextGame: () => import('~/components/NextGame'),
    Avatar: () => import('~/components/Avatar'),
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
      this.loading = false
      this.nextGame = data
      getBetsByMatch(data.id)
    })
    this.$nuxt.$on('bets-by-match', (data) => this.bets = data)
  },
  beforeDestroy() {
    this.$nuxt.$off('next-match')
    this.$nuxt.$off('bets-by-match')
  }
}
</script>