<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">South America Qualifiers</h1>
    <p class="subtitle is-3">Matches</p>
    <table class="table is-hoverable is-fullwidth mb-5">
      <tbody>
        <tr v-for="(item, index) in matches" :key="index" class="has-text-left">
          <td class="is-flex is-vcentered is-justify-content-space-between is-size-5">
            <div class="info">
              {{ item.city }}
              <br>
              {{ item.date.toDate() | formatDate }}
            </div>
            <Match wrapper-classes="is-flex-wrap-nowrap" :match="item" />
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import { getAllMatches } from '~/endpoints/matches'

export default {
  name: 'History',
  components: {
    Match: () => import('~/components/Match'),
  },
  data() {
    return {
      matches: []
    }
  },
  async created() {
    this.matches = await getAllMatches()
  },
}
</script>

<style lang="scss" scoped>
.score {
  width: 50px;
}

.team {
  width: 200px;
}
</style>