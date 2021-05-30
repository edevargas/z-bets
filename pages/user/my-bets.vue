<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4 mb4">
      <img src="~/assets/svg/bets.svg" alt="" class="title-image">
      {{ $t('my_bets') }}
    </h1>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <BetsTable v-else :items="bets" timestamp keep-row>
      <template v-slot="{ item }">
        <div class="actions">
          <div class="status" v-if="confirm !== item.id">{{ getStatus(item.status) }}</div>
          <template v-if="item.status === 'pending'">
            <template v-if="!confirm">
              <button :class="[zButton, 'is-primary action-buttons']">
                {{ $t('edit') }}
              </button>
              <button
                :class="[zButton, 'is-danger action-buttons']"
                @click="confirm = item.id"
              >
                {{ $t('delete') }}
              </button>
            </template>
            <div v-if="confirm === item.id" class="vivify flipInX">
              <button :class="[zButton, 'my-1']" @click="confirm = false">
                {{ $t('cancel') }}
              </button>
              <button :class="[zButton, 'is-danger my-1']" @click="deleteBet(item)">
                {{ $t('confirm_deleting') }} 🗑
              </button>
            </div>
          </template>
        </div>
      </template>
    </BetsTable>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBetsByUser, deleteBet } from '~/endpoints/bets'

export default {
  name: 'MyBets',
  meta: {
    requiresAuth: true
  },
  components: {
    BetsTable: () => import('~/components/bets/BetsTable'),
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      loading: true,
      bets: [],
      confirm: false,
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
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
    async deleteBet(item) {
      const { error, data } = await deleteBet(item.id)

      if (error && !data) {
        const notification = { type: 'error', body: error }
        this.$nuxt.$emit('show-notification', notification)
        return
      }

      const notification = { type: 'success', body: this.$t('bet_deleted'), time: 4000 }
      this.$nuxt.$emit('show-notification', notification)
    }
  }
}
</script>

<style lang="scss" scoped>
.action-buttons {
  display: none;
}

.status {
  display: initial;
}

tr:hover {
  .action-buttons {
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