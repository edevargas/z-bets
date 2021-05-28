<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">{{ $t("bets_history") }}</h1>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table class="table is-hoverable is-fullwidth">
        <tbody>
          <BetItemRow v-for="(item, index) in bets" :key="index" :item="item" timestamp>
            <div class="actions">
              <div class="status">{{ getStatus(item.status) }}</div>
              <button
                type="button"
                :class="[zButton, 'is-primary is-small result']"
              >
                {{ $t("edit") }}
              </button>
            </div>  
          </BetItemRow>
          <tr v-if="bets.length === 0" class="has-text-centered is-size-5">
            {{ $t('still_no_items') }}
          </tr>
        </tbody>
      </table>

      <p v-if="bets.length === 0" class="has-text-centered is-size-5">
        {{ $t('still_no_items') }}
      </p>
    </template>
  </main>
</template>

<script>
import { getAllBets } from '~/endpoints/bets'

export default {
  name: 'BetsApproval',
  meta: {
    requiresAuth: true,
    adminAccess: 'bets_history',
  },
  components: {
    BetItemRow: () => import('~/components/bets/BetItemRow'),
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      loading: true,
      bets: [],
    }
  },
  created() {
    getAllBets()
    // realtime listener
    this.$nuxt.$on('bets', (data) => {
      this.bets = data
      if (this.loading) this.loading = false
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('bets')
  },
  methods: {
    getStatus(status) {
      return this.$t(`bet_${status}`) || ''
    },
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