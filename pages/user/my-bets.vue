<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4 mb4">
      <img src="~/assets/svg/bets.svg" alt="" class="title-image" />
      {{ $t("my_bets") }}
    </h1>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <BetsTable v-else :items="bets" :sorter-provider="sortByTimestamp" timestamp>
      <template v-slot="{ item }">
        <BetEditButtons
          :key="item.id"
          :item="item"
          edit-button
          delete-button
          @edit="$store.commit('setBetToEdit', item)"
          @delete="deleteBet(item)"
        />
      </template>
    </BetsTable>

    <BettingModal is-edition />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBetsByUser, deleteBet } from '~/endpoints/bets'

export default {
  name: 'MyBets',
  meta: {
    requiresAuth: true,
  },
  components: {
    BetsTable: () => import('~/components/bets/BetsTable'),
    BetEditButtons: () => import('~/components/bets/BetEditButtons'),
  },
  data() {
    return {
      loading: true,
      bets: [],
      confirm: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
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
    async deleteBet(item) {
      const { error, data } = await deleteBet(item.id)

      if (error && !data) {
        const notification = { type: 'error', body: error }
        this.$nuxt.$emit('show-notification', notification)
        return
      }

      const notification = { type: 'success', body: this.$t('bet_deleted'), time: 4000 }
      this.$nuxt.$emit('show-notification', notification)
    },
    sortByTimestamp() {
      return (a, b) => a.timestamp.toDate() > b.timestamp.toDate()
    },
  },
}
</script>

<style lang="scss" scoped>
td {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

@media (max-width: 767px) {
  td {
    flex-direction: column;
  }
}
</style>