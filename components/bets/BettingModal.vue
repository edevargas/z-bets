<template>
  <div :class="['modal', isOpen ? 'is-active' : null]">
    <div class="modal-background"></div>
    <div class="modal-card vivify swoopInBottom">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("give_score") }}</p>
        <button class="delete" aria-label="close" @click="closeModal" />
      </header>
      <section class="modal-card-body">
        <Match :match="match" is-title gambling />
        <div class="wrap-inputs is-flex is-align-items-center title is-4">
          <input
            v-model="homeScore"
            type="number"
            class="input is-medium"
            :placeholder="match.homeId"
            :disabled="confirm"
          />
          vs
          <input
            v-model="awayScore"
            type="number"
            class="input is-medium"
            :placeholder="match.awayId"
            :disabled="confirm"
          />
        </div>
        <div class="is-flex is-justify-content-center">
          <button
            v-if="!confirm"
            :class="[zButton, 'is-primary vivify flipInX']"
            :disabled="!validateHomeScore || !validateAwayScore"
            @click="confirm = true"
          >
            {{ $t("bet_now") }}
          </button>
          <div v-else-if="bettingInProgress" class="vivify flipInX">
            <p class="is-6 has-text-centered py-2">
              {{ $t("confirm_bet") }}
            </p>
            <button :class="[zButton, 'mx-2']" @click="confirm = false">
              {{ $t("edit") }}
            </button>
            <button :class="[zButton, 'is-primary mx-2']" @click="finish">
              {{ $t("confirm") }} 🤞🏼
            </button>
          </div>
          <progress v-else class="progress is-primary mt-2 mb-2" />
        </div>
        <p
          class="has-background-dark has-text-centered has-text-warning my-5 p-2"
        >
          {{ $t("payroll_discount") }}
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isTimeAvailable, betting, isDuplicatedScoreByUser } from '~/endpoints/bets'
import { BET_STATUS } from '~/plugins/constants'

export default {
  name: 'BettingModal',
  components: {
    Match: () => import('~/components/bets/Match'),
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      homeScore: '',
      awayScore: '',
      confirm: false,
      bettingInProgress: true,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      match: 'matchToBet',
    }),
    isOpen() {
      return Object.keys(this.match || {}).length
    },
    validateHomeScore() {
      const { homeScore } = this
      return homeScore !== '' && this.validateNumber(homeScore)
    },
    validateAwayScore() {
      const { awayScore } = this
      return awayScore !== '' && this.validateNumber(awayScore)
    },
  },
  methods: {
    validateNumber(num) {
      const number = Number(num)
      if (number >= 0 && number <= 9) {
        return true
      }

      const notification = { type: 'info', body: this.$t('validate_number') }
      this.$nuxt.$emit('show-notification', notification)
      return false
    },
    getPayload() {
      const { uid: userId } = this.user
      const { id: matchId } = this.match
      const { user, match, homeScore, awayScore } = this

      return {
        userId,
        matchId,
        user,
        match,
        awayScore: Number(awayScore),
        homeScore: Number(homeScore),
        status: BET_STATUS.PENDING,
      }
    },
    async finish() {
      if (!this.validateHomeScore || !this.validateAwayScore) {
        const notification = { type: 'error', body: this.$t('check_scores') }
        this.$nuxt.$emit('show-notification', notification)
        return
      }
      
      const payload = this.getPayload()

      const validateDuplicated = await isDuplicatedScoreByUser(payload)
      if(!validateDuplicated) {
        const notification = { type: 'error', body: this.$t('check_duplicated_score') }
        this.$nuxt.$emit('show-notification', notification)
        return
      }

      this.bettingInProgress = false
      const validateStatus = await isTimeAvailable(this.match)

      if (!validateStatus) {
        const notification = { type: 'error', body: this.$t('invalid_match_status') }
        this.$nuxt.$emit('show-notification', notification)
        this.closeModal()
        return
      }

      const { error, data } = await betting(payload)

      if (error && !data) {
        const notification = { type: 'error', body: error }
        this.$nuxt.$emit('show-notification', notification)
        this.closeModal()
        return
      }

      const notification = { type: 'success', body: this.$t('bet_done'), time: 5000 }
      this.$nuxt.$emit('show-notification', notification)
      this.closeModal()
    },
    closeModal() {
      this.homeScore = ''
      this.awayScore = ''
      this.confirm = false
      this.bettingInProgress = true
      this.$store.commit('setMatchToBet', {})
    },
  },
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
