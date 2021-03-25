<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">{{ $t('south_america_qualifiers') }}</h1>
    <p class="subtitle is-3 mb-3">{{$t('matches')}}</p>

    <progress v-if="loading" class="progress is-primary mt-6" />
    <template v-else>
      <table class="table is-hoverable is-fullwidth">
        <tbody>
          <tr v-for="(item, index) in matches" :key="index">
            <td class="is-vcentered is-size-5">
              <div class="info">
                {{ item.city }}
                <br />
                {{ item.date.toDate() | formatDate }}
              </div>
              <Match :match="item" keep-row />
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </main>
</template>

<script>
import { getAllMatches } from '~/endpoints/matches'

export default {
  name: 'Matches',
  components: {
    Match: () => import('~/components/bets/Match')
  },
  data() {
    return {
      loading: true,
      matches: []
    }
  },
  async created() {
    this.matches = await getAllMatches()
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
td {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: 767px) {
  td {
    flex-direction: column;
  }
}
</style>