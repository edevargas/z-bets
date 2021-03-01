<template>
  <div class="wrap-payment">
    <Match :match="match" :score="score" is-title />
    <p v-if="voucher" class="mt-2 mb-5">Voucher ✅</p>
    <p v-else>Please, send the voucher to admin ⚠️</p>
    <button
      type="button"
      :class="[zButton, 'is-danger is-inverted mx-2']"
      @click="$emit('back')"
    >
      ← Back
    </button>
    <button
      type="button"
      :class="[zButton, 'is-primary mx-2', confirming ? 'is-loading' : null]"
      @click="confirm"
    >
      Finish 🤞🏼
    </button>
  </div>
</template>

<script>
export default {
  name: 'BetConfirm',
  components: {
    Match: () => import('~/components/bets/Match')
  },
  props: {
    match: {
      type: Object,
      required: true,
      default: () => ({})
    },
    homeScore: {
      type: [Number, String],
      required: true
    },
    awayScore: {
      type: [Number, String],
      required: true
    },
    voucher: {
      type: File,
      required: true
    }
  },
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      confirming: false
    }
  },
  computed: {
    score() {
      const { homeScore, awayScore } = this
      return { homeScore, awayScore }
    }
  },
  methods: {
    confirm() {
      this.confirming = true
      this.$emit('finish')
    }
  }
}
</script>