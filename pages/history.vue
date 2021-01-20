<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">South America Qualifiers</h1>
    <p class="subtitle is-3">Matches</p>
    <table class="table is-hoverable is-fullwidth">
      <tbody>
        <tr v-for="(item, index) in matches" :key="index" class="has-text-centered">
          <td class="is-vcentered">
            {{ item.date }}
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
export default {
  name: 'History',
  data() {
    return {
      matches: [
        {
          date: '09 oct de 2020',
          homeTeam: 'Colombia',
          homeFlag: 'https://api.fifa.com/api/v1/picture/flags-sq-1/col',
          homeScore: '3',
          awayScore: '0',
          awayFlag: 'https://api.fifa.com/api/v1/picture/flags-sq-1/ven',
          awayTeam: 'Venezuela',
        },
        {
          date: '13 oct de 2020',
          homeTeam: 'Chile',
          homeFlag: 'https://api.fifa.com/api/v1/picture/flags-sq-1/chi',
          homeScore: '2',
          awayScore: '2',
          awayFlag: 'https://api.fifa.com/api/v1/picture/flags-sq-1/col',
          awayTeam: 'Colombia',
        },
        {
          date: '13 nov de 2020',
          homeTeam: 'Colombia',
          homeFlag: 'https://api.fifa.com/api/v1/picture/flags-sq-1/col',
          homeScore: '0',
          awayScore: '3',
          awayFlag: 'https://api.fifa.com/api/v1/picture/flags-sq-1/uru',
          awayTeam: 'Uruguay',
        },
        {
          date: '17 nov de 2020',
          homeTeam: 'Ecuador',
          homeFlag: 'https://api.fifa.com/api/v1/picture/flags-sq-1/ecu',
          homeScore: '6',
          awayScore: '1',
          awayFlag: 'https://api.fifa.com/api/v1/picture/flags-sq-1/col',
          awayTeam: 'Colombia',
        },
      ]
    }
  }
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