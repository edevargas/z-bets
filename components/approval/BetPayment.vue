<template>
  <div class="wrap-payment">
    <progress v-if="loading" class="progress is-primary mt-3" />
    <template v-else>
      <h1 class="title has-text-centered mb-5">
        {{ betSettings.amount | currency }}
      </h1>
      <button v-if="!error" type="button" :class="[zButton, 'is-warning']" @click="copyNumber">
        {{ $t('copy_receiver_number') }}
      </button>
      <div v-else class="title is-4 has-text-warning has-background-dark py-2">
        ⚠️ {{ $t('error_ocurred') }}. {{ $t('fallback_copy_number') }}
      </div>

      <div class="title is-5 my-5">
        {{ $t('transfer_options') }} 
      </div>
      <a
        v-for="(item, key) in paymentSettings"
        :key="key"
        target="_blank"
        :href="item.link"
        :class="[zButton, item.color, 'mx-2']"
      >
        {{ item.name }}
      </a>

      <div class="title is-5 my-5">{{ $t('already_paid') }}</div>
      <button
        type="button"
        :class="[zButton, 'is-danger is-inverted mx-2']"
        @click="$emit('back')"
      >
        ← {{ $t('back') }}
      </button>
      <button
        type="button"
        :class="[zButton, 'is-primary mx-2']"
        @click="$emit('next')"
      >
        {{ $t('next') }} →
      </button>
    </template>
  </div>
</template>

<script>
import { getBetSettings, getPaymentSettings } from '~/endpoints/settings'

export default {
  name: 'BetPayment',
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      betSettings: {},
      paymentSettings: {},
      error: false,
    }
  },
  mounted() {
    getBetSettings()
    getPaymentSettings()
    // realtime listener
    this.$nuxt.$on('bet-settings', (data) => (this.betSettings = data))
    this.$nuxt.$on('payment-settings', (data) => (this.paymentSettings = data))
  },
  computed: {
    loading() {
      return !Object.keys(this.paymentSettings).length
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('bet-settings')
    this.$nuxt.$off('payment-settings')
  },
  methods: {
    async copyNumber() {
      const { transferNumber } = this.betSettings
      const failedCopy = { type: 'error', body: this.$t('number_failed_copy') }

      if (!transferNumber) {
        this.$nuxt.$emit('show-notification', failedCopy)
        this.error = true
        return
      }
      
      navigator.clipboard.writeText(transferNumber).then(() => {
        const successfulCopy = { type: 'info', body: this.$t('number_succesful_copy') }
        this.$nuxt.$emit('show-notification', successfulCopy)
      }, () => {
        this.$nuxt.$emit('show-notification', failedCopy)
        this.error = true
      })
    }
  }
}
</script>