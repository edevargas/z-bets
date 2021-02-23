<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">My bets</h1>
    <p class="subtitle is-3 mb-0">Results</p>
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr class="has-text-centered is-size-5 is-selected">
          <th>Bet</th>
          <th>Match</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in bets" :key="index" class="has-text-left">
          <td class="has-text-centered is-size-5">
            {{ item.matchId }}
          </td>
          <td class="has-text-centered is-size-5">
            {{ item.homeScore }} vs {{ item.awayScore }}
          </td>
          <td class="has-text-centered is-size-5">
            {{ item.status }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBetsByUser } from '~/endpoints/bets'

export default {
  name: 'MyBets',
  meta: {
    requiresAuth: true,
  },
  components: {
    Match: () => import('~/components/Match'),
  },
  data() {
    return {
      bets: [],
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
  },
  async created() {
    this.bets = await getBetsByUser(this.user.uid)
  },
}
</script>