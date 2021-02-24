<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">My bets</h1>
    <p class="subtitle is-3 mb-0">Results</p>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr class="has-text-centered is-size-5 is-selected">
            <th>Match</th>
            <th>My Bet</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in bets" >
            <tr :key="index">
              <td class="has-text-left is-vcentered is-size-5">
                <div class="bet-timestamp mb-2">
                  {{ item.timestamp.toDate() | formatDate }}
                </div>
                <Match wrapper-classes="is-flex-wrap-nowrap" :match="item.match" />
              </td>
              <td class="has-text-centered is-vcentered is-size-5">
                {{ item.homeScore }} vs {{ item.awayScore }}
              </td>
              <td class="has-text-centered is-vcentered is-size-5" width="25%">
                <div class="status">{{ item.status }}</div>
                <nuxt-link to="/history" :class="[zButton, 'is-primary result']">
                  View result
                </nuxt-link>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
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
      zButton: this.$nuxt.context.env.Z_BUTTON,
      loading: true,
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
    this.loading = false
  },
}
</script>

<style lang="scss" scoped>
.result {
  display: none;
}

.status {
  display: initial;
}

tr:hover {
  .result {
    display: initial;
  }

  .status {
    display: none;
  }
}
</style>