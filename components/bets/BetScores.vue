<template>
  <div class="wrap-scores">
    <Match :match="match" is-title gambling />
    <div class="wrap-inputs is-flex is-align-items-center title is-4">
      <input
        v-model="homeScore"
        type="number"
        class="input is-medium"
        :placeholder="match.homeId"
      />
      vs
      <input
        v-model="awayScore"
        type="number"
        class="input is-medium"
        :placeholder="match.awayId"
      />
    </div>
    <button
      type="button"
      :class="[zButton, 'is-danger mx-2']"
      @click="$emit('cancel')"
    >
      {{ $t('cancel') }}
    </button>
    <button
      type="button"
      :class="[zButton, 'is-primary mx-2']"
      :disabled="!validateHomeScore || !validateAwayScore"
      @click="next"
    >
      {{ $t('next') }} →
    </button>
  </div>
</template>

<script>
export default {
  name: 'BetScores',
  components: {
    Match: () => import('~/components/bets/Match')
  },
  props: {
    match: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      homeScore: '',
      awayScore: ''
    }
  },
  computed: {
    validateHomeScore() {
      const { homeScore } = this
      return homeScore !== '' && this.validateNumber(homeScore)
    },
    validateAwayScore() {
      const { awayScore } = this
      return awayScore !== '' && this.validateNumber(awayScore)
    }
  },
  methods: {
    next() {
      if (!this.validateHomeScore || !this.validateAwayScore) {
        const notification = { type: 'error', body: this.$t('check_scores') }
        this.$nuxt.$emit('show-notification', notification)
      }

      const { homeScore, awayScore } = this
      this.$emit('update-scores', { homeScore, awayScore })
    },
    validateNumber(num) {
      const number = Number(num)
      if (number >= 0 && number <= 9) {
        return true
      }

      const notification = { type: 'info', body: this.$t('validate_number') }
      this.$nuxt.$emit('show-notification', notification)
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-inputs {
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
