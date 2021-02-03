<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">South America Qualifiers</h1>
    <p class="subtitle is-3">Matches</p>
    <table class="table is-hoverable is-fullwidth">
      <tbody>
        <tr v-for="(item, index) in matches" :key="index" class="has-text-centered">
          <td class="is-vcentered">
            {{ item.date.toDate() | formatDate }} <br>
          </td>
          <td class="is-vcentered">
            {{ item.city }}
          </td>
          <td class="is-flex">
            <div class="team is-flex is-justify-content-flex-end">
              {{ item.homeTeam }}
              <img :src="item.homeFlag" :alt="item.homeTeam" class="mx-2">
            </div>
            <div class="score">{{ item.homeScore }} - {{ item.awayScore }}</div>
            <div class="team is-flex is-justify-content-flex-start">
              <img :src="item.awayFlag" :alt="item.awayTeam" class="mx-2">
              {{ item.awayTeam }}
            </div>
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