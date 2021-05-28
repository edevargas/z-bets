<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">{{ $t('my_bets') }}</h1>
    <p class="subtitle is-3 mb-3">{{ $t('bets_results') }}</p>

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
                  <Match :item="item" :score="getScore(item)" keep-row />
                </div>
                <div class="actions">
                  <div class="status">{{ getStatus(item.status) }}</div>
                  <button
                    v-if="item.status === 'pending'"
                    :class="[zButton, 'is-primary result']"
                  >
                    {{ $t('edit') }}
                  </button>
                  <button
                    v-if="item.status === 'pending'"
                    :class="[zButton, 'is-danger result']"
                  >
                    {{ $t('delete') }}
                  </button>
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
  created() {
    getBetsByUser(this.user.uid)
    // realtime listener
    this.$nuxt.$on('bets-by-user', (data) => {
      this.bets = data
      if (this.loading) this.loading = false
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('bets-by-user')
  },
  methods: {
    getScore(item) {
      const { homeScore, awayScore } = item
      return { homeScore, awayScore }
    },
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
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