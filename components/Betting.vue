<template>  
  <div class="wrapper is-flex is-flex-direction-column">
    <section class="hero transparent is-dark">
      <h1 class="title has-text-centered mt-5 mb-0">
        Betting
      </h1>
      <div class="hero-body pt-5">
        <div class="container has-text-centered">
          <Match wrapper-classes="is-flex-wrap-nowrap" :match="match" is-title gambling />
          <div class="wrap-scores is-flex is-align-items-center title is-4">
            <input v-model="homeScore" type="number" class="input is-medium" :placeholder="match.homeTeam | initials">
            vs
            <input v-model="awayScore" type="number" class="input is-medium" :placeholder="match.awayTeam | initials">
          </div>
          
          <button
            type="button"
            :class="[zButton, 'is-danger mx-2']"
            @click="confirming ? confirming = false : $emit('close')"
          >
            Cancel
          </button>
          <button v-if="confirming" type="button" :class="[zButton, 'is-primary mx-2']" @click="betNow">
            Bet now
          </button>
          <button v-else type="button" :class="[zButton, 'is-primary mx-2']" @click="confirming = true">
            Finish
          </button>
        </div>
      </div>
    </section>
  </div>    
</template>

<script>
import { mapGetters } from 'vuex'
import { betting } from '~/endpoints/bets'

export default {
  name: 'Betting',
  components: {
    Match: () => import('~/components/Match'),
  },
  props: {
    match: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      confirming: false,
      homeScore: 0,
      awayScore: 0,
      voucher: '',
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
  },
  methods: {
    async betNow() {
      const { user, match, homeScore, awayScore, voucher } = this
      const payload = {
        userId: user.uid,
        matchId: match.id,
        match,
        user,
        awayScore,
        homeScore,
        voucher,
        status: 'pending',
      }

      const { error, data } = await betting(payload)
      if (!error && data) {
        const notification = { type: 'success', body: '¡Bet done! Pending approval', time: 5000 }
        this.$nuxt.$emit('show-notification', notification)
      } else {
        const notification = { type: 'error', body: error }
        this.$nuxt.$emit('show-notification', notification)
      }

      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-scores {
  width: 240px;
  margin: 1rem auto 2rem auto;
  display: flex;
  justify-content: space-between;

  .input {
    width: 80px;
    text-align: center;
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      appearance: none;
    }
  }
}
</style>