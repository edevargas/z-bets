<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">{{ $t("bets_approval_title") }}</h1>
    <p class="subtitle is-3 mb-3">{{ $t("bets_approval_subtitle") }}</p>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table class="table is-hoverable is-fullwidth">
        <tbody>
          <template v-for="(item, index) in betsForApproval">
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
                    <img :src="item.match.homeId | flag" class="mx-2" />
                    <div class="score">
                      {{ item.homeScore }}
                      -
                      {{ item.awayScore }}
                    </div>
                    <img :src="item.match.awayId | flag" class="mx-2" />
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
      <p v-if="betsForApproval.length === 0" class="has-text-centered is-size-5">
        {{ $t('still_no_items') }}
      </p>
    </template>
    <ApprovalModal
      :bet="betDetail"
      :open="openModal"
      @approve="approve(true)"
      @deny="approve(false)"
      @close="closeModal"
    />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNextMatch } from '~/endpoints/matches'
import { getBetsByMatch, betApprove } from '~/endpoints/bets'

export default {
  name: 'BetsApproval',
  meta: {
    requiresAuth: true,
    adminAccess: 'bet_approval',
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
      betsForApproval: [],
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
      const onlyApproved = false
      getBetsByMatch(data.id, onlyApproved)
    })
    this.$nuxt.$on('bets-by-match', (data) => {
      this.betsForApproval = data
      if (this.loading) this.loading = false
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('next-match')
    this.$nuxt.$off('bets-by-match')
  },
  methods: {
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
    async approve(newStatus) {
      const { id } = this.betDetail
      const { error, data } = await betApprove(id, newStatus)

      if (error && !data) {
        const notification = { type: 'error', body: this.$t('error_updating_bet_status') }
        this.$nuxt.$emit('show-notification', notification)
        return
      }

      const notification = { type: 'success', body: this.$t(newStatus ? 'bet_approved' : 'bet_denied') }
      this.$nuxt.$emit('show-notification', notification)
      this.closeModal()
    },
    closeModal() {
      this.betDetail = undefined
      this.openModal = false
    }
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