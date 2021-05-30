<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">{{ $t("bets_history") }}</h1>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <BetsTable v-else :items="bets" user timestamp keep-row>
      <template v-slot="{ item }">
        <div class="actions">
          <div class="status">{{ getStatus(item.status) }}</div>
          <button
            v-if="item.status === 'pending'"
            :class="[zButton, 'is-primary result']"
          >
            {{ $t("edit") }}
          </button>
        </div>
      </template>
    </BetsTable>
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
    BetsTable: () => import('~/components/bets/BetsTable'),
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