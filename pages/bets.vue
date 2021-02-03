<template>
  <main class="container is-max-desktop">
    
    <NextGame :next-game="nextGame" class="next-game" />

    <h1 class="title is-1 mt-4">Realtime bets</h1>
    <p class="subtitle is-3 mb-0">Bets</p>
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr class="has-text-centered is-size-5 is-selected">
          <th>Participante</th>
          <th>Colombia </th>
          <th>Brasil</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in bets" :key="index" class="is-size-5">
          <td>
            {{item.user}}
          </td>
          <td class="has-text-centered">
            {{item.homeScore}}
          </td>
          <td class="has-text-centered">
            {{item.awayScore}}
          </td>
        </tr>
      </tbody>
    </table>
    
    <p class="subtitle is-3 mb-0">Losers</p>
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr class="has-text-centered is-size-5 has-background-danger">
          <th class=" has-text-white">Participante</th>
          <th class=" has-text-white">Colombia </th>
          <th class=" has-text-white">Brasil</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in losers" :key="index" class="is-size-5">
          <td>
            {{item.user}}
          </td>
          <td class="has-text-centered">
            {{item.homeScore}}
          </td>
          <td class="has-text-centered">
            {{item.awayScore}}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import { getNextMatch } from '~/endpoints/matches'

export default {
  name: 'Bets',
  components: {
    NextGame: () => import('~/components/NextGame'),
  },
  data() {
    return {
      nextGame: undefined,
      bets: [
        {
          user: 'Lorena Sandoval',
          homeScore: 1,
          awayScore: 1,
        },
        {
          user: 'Pilar Gonzalez',
          homeScore: 2,
          awayScore: 1,
        },
        {
          user: 'Alfredo Forero',
          homeScore: 3,
          awayScore: 1,
        },
        {
          user: 'Javier Albadán',
          homeScore: 4,
          awayScore: 1,
        },
      ],
      losers: [
        {
          user: 'Juan Quintero',
          homeScore: 0,
          awayScore: 2,
        },
        {
          user: 'Sandra Aguilera',
          homeScore: 1,
          awayScore: 0,
        },
        {
          user: 'Emilio Romero',
          homeScore: 0,
          awayScore: 0,
        },
        {
          user: 'Derly Carrillo',
          homeScore: 2,
          awayScore: 0,
        },
      ]
    }
  },
  created() {
    getNextMatch()
    // realtime listener
    this.$nuxt.$on('next-match', (detail) => this.nextGame = detail)
  },
  beforeDestroy() {
    this.$nuxt.$off('next-match')
  }
}
</script>