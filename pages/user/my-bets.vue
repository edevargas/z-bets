<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">My bets</h1>
    <p class="subtitle is-3 mb-3">Matches & statuses</p>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table class="table is-hoverable is-fullwidth">
        <tbody>
          <template v-for="(item, index) in bets">
            <tr :key="index">
              <td class="has-text-left is-size-5">
                <div class="match">
                  <div class="bet-timestamp">
                    {{ item.timestamp.toDate() | formatDate }}
                  </div>
                  <Match :match="item.match" :score="getScore(item)" keep-row />
                </div>
                <div class="actions">
                  <div class="status">{{ getStatus(item.status) }}</div>
                  <nuxt-link
                    to="/history"
                    :class="[zButton, 'is-primary result']"
                  >
                    View result
                  </nuxt-link>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <p v-if="bets.length === 0" class="has-text-centered is-size-5">
        · Still no items ·
      </p>
    </template>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBetsByUser } from '~/endpoints/bets'

export default {
  name: 'MyBets',
  meta: {
    requiresAuth: true
  },
  components: {
    Match: () => import('~/components/bets/Match')
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      loading: true,
      bets: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  async created() {
    this.bets = await getBetsByUser(this.user.uid)
    this.loading = false
  },
  methods: {
    getScore(item) {
      const { homeScore, awayScore } = item
      return { homeScore, awayScore }
    },
    getStatus(status) {
      const types = {
        pending: 'Pending',
        approved: 'Approved',
        denied: 'Denied'
      }
      return types[status]
    }
  }
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

td {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  .match {
    .bet-timestamp {
      margin-bottom: 0.5rem;
    }
  }

  .actions {
    min-width: 120px;
    text-align: center;
  }
}

@media (max-width: 767px) {
  td {
    flex-direction: column;

    .match {
      width: 100%;

      .bet-timestamp {
        margin-bottom: 0;
      }
    }

    .actions {
      min-width: 100%;
      margin-top: -0.5rem;
    }
  }
}
</style>