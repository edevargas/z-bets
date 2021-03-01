<template>
  <div class="wrap-payment">
    <progress v-if="loading" class="progress is-primary mt-3" />
    <template v-else>
      <button type="button" :class="[zButton, 'is-warning']">
        Copy receiver number
      </button>

      <div class="title is-5 my-5">
        Remember to pay {{ payments.amount | currency }}
      </div>
      <a
        target="_blank"
        :href="`${payments.nequi}`"
        :class="[zButton, 'is-link mx-2']"
      >
        Nequi
      </a>
      <a
        target="_blank"
        :href="`${payments.daviplata}`"
        :class="[zButton, 'is-danger mx-2']"
      >
        Daviplata
      </a>

      <div class="title is-5 my-5">¿Have you already paid?</div>
      <button
        type="button"
        :class="[zButton, 'is-danger is-inverted mx-2']"
        @click="$emit('back')"
      >
        ← Back
      </button>
      <button
        type="button"
        :class="[zButton, 'is-primary mx-2']"
        @click="$emit('next')"
      >
        Next →
      </button>
    </template>
  </div>
</template>

<script>
import { getPaymentSettings } from '~/endpoints/settings'

export default {
  name: 'BetPayment',
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      payments: {}
    }
  },
  mounted() {
    getPaymentSettings()
    // realtime listener
    this.$nuxt.$on('payments', (data) => (this.payments = data))
  },
  computed: {
    loading() {
      return !Object.keys(this.payments).length
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('payments')
  }
}
</script>