<template>
  <div class="wrapper is-flex is-flex-direction-column">
    <section class="hero transparent is-dark">
      <h1 class="title has-text-centered mt-5 mb-0">{{ title }}</h1>
      <div class="hero-body pt-5">
        <div class="container has-text-centered">
          <BetScores
            v-if="step === 1"
            :match="match"
            @cancel="$emit('close')"
            @update-scores="updateScores"
          />
          <BetPayment v-if="step === 2" @back="step = 1" @next="step = 3" />
          <BetVoucher
            v-if="step === 3"
            @back="step = 2"
            @set-voucher="setVoucher"
          />
          <BetConfirm
            v-if="step === 4"
            :match="match"
            :home-score="homeScore"
            :away-score="awayScore"
            :voucher="voucher"
            @back="step = 3"
            @finish="finish"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { betting } from '~/endpoints/bets'
import { uploadFile } from '~/endpoints/storage'

export default {
  name: 'Betting',
  components: {
    BetScores: () => import('~/components/bets/BetScores'),
    BetScores: () => import('~/components/bets/BetScores'),
    BetScores: () => import('~/components/bets/BetScores'),
    BetScores: () => import('~/components/bets/BetScores')
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
      step: 1,
      homeScore: 0,
      awayScore: 0,
      voucher: '',
      folder: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    title() {
      const titles = ['give_score', 'make_payment', 'upload_voucher', 'betting_confirmation']
      return this.$t(titles[this.step - 1])
    }
  },
  methods: {
    updateScores({ homeScore, awayScore }) {
      this.homeScore = homeScore
      this.awayScore = awayScore
      this.step = 2
    },
    setVoucher({ voucher, folder }) {
      this.voucher = voucher
      this.folder = folder
      this.step = 4
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
        awayScore,
        homeScore,
        status: 'pending'
      }
    },
    async finish() {
      const payload = this.getPayload()
      const { error, data } = await betting(payload)

      if (error && !data) {
        const notification = { type: 'error', body: error }
        this.$nuxt.$emit('show-notification', notification)
        return
      }

      this.uploadFile(data)
    },
    async uploadFile(idBet) {
      const { voucher: file, folder } = this
      const { error, data } = await uploadFile({ file, folder, name: idBet })

      if (error && !data) {
        const notification = { type: 'error', body: error }
        this.$nuxt.$emit('show-notification', notification)
        this.$emit('close')
        return
      }

      const notification = { type: 'success', body: this.$t('bet_done'), time: 5000 }
      this.$nuxt.$emit('show-notification', notification)
      this.$emit('close')
    }
  }
}
</script>
