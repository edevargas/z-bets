<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">{{ $t("bets_approval_title") }}</h1>
    <p class="subtitle is-3 mb-3">{{ $t("bets_approval_subtitle") }}</p>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table class="table is-hoverable is-fullwidth">
        <tbody>
          <template v-for="(item, index) in bets">
            <tr :key="index">
              <td class="has-text-left is-size-5">
                <div class="bet-timestamp">
                  {{ item.timestamp.toDate() | formatDate }}
                </div>
                <div class="bet-info">
                  <div class="user">
                    <Avatar :user="item.user" />
                    {{ item.user.displayName }}
                  </div>
                  <div class="bet">
                    <img :src="item.match.homeFlag" class="mx-2" />
                    <div class="score">
                      {{ item.homeScore }}
                      -
                      {{ item.awayScore }}
                    </div>
                    <img :src="item.match.awayFlag" class="mx-2" />
                  </div>
                  <div class="actions">
                    <div class="status">{{ getStatus(item.status) }}</div>
                    <button
                      type="button"
                      :class="[zButton, 'is-primary is-small result']"
                      @click="(betDetail = item), (openModal = true)"
                    >
                      {{ $t("check_voucher") }}
                    </button>
                  </div>
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
    <ApprovalModal
      :bet="betDetail"
      :open="openModal"
      @approve="approve"
      @close="(betDetail = undefined), (openModal = false)"
    />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNextMatch } from '~/endpoints/matches'
import { getBetsByMatch } from '~/endpoints/bets'

export default {
  layout: 'admin',
  name: 'BetsApproval',
  meta: {
    requiresAuth: true,
    onlyAdmin: true
  },
  components: {
    Avatar: () => import('~/components/utils/Avatar'),
    ApprovalModal: () => import('~/components/bets/ApprovalModal')
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      loading: true,
      nextGame: undefined,
      bets: [],
      betDetail: undefined,
      openModal: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  created() {
    getNextMatch()
    // realtime listener
    this.$nuxt.$on('next-match', (data) => {
      this.nextGame = data
      getBetsByMatch(data.id, false)
    })
    this.$nuxt.$on('bets-by-match', (data) => {
      this.bets = data
      if (this.loading) this.loading = false
    })
  },
  methods: {
    getStatus(status) {
      const types = {
        pending: 'Pending',
        approved: 'Approved',
        denied: 'Denied'
      }
      return types[status]
    },
    approve() {}
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

.bet-timestamp {
  margin-bottom: 0.5rem;
}

.bet-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  .bet {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .user {
    width: 100%;
  }

  .actions {
    min-width: 160px;
    text-align: right;
  }
}

@media (max-width: 767px) {
  .bet-info {
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