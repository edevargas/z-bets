<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <div class="file is-link is-boxed">
      <label class="file-label">
        <input @change="onFileChange" type="file" class="file-input" />
        <span class="file-cta">
          <span class="file-label">📤 {{ $t('choose_image') }}</span>
        </span>
        <span class="file-name">{{ fileName || $t('without_selection') }}</span>
      </label>
    </div>

    <div class="title is-5 my-5">{{ $t('voucher_needed') }}</div>
    <div class="wrap-buttons">
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
        :disabled="disabled"
        @click="next"
      >
        {{ $t('next') }} →
      </button>
    </div>
  </div>
</template>

<script>
import { validateTypeFile, validateSizeFile } from '~/endpoints/storage'

export default {
  name: 'BetVoucher',
  data() {
    return {
      zButton: this.$nuxt.context.env.Z_BUTTON,
      voucher: '',
      fileName: ''
    }
  },
  computed: {
    disabled() {
      return !validateTypeFile(this.voucher)
    },
    isValidSizeFile() {
      return validateSizeFile(this.voucher)
    }
  },
  methods: {
    onFileChange(e) {
      this.voucher = e.target.files[0]
      if (this.disabled) {
        this.showError(this.$t('file_type_not_allowed'))
        return
      }

      if (!this.isValidSizeFile) {
        this.showError(this.$t('file_exceeds_size'))
        return
      }

      this.fileName = this.voucher.name
    },
    showError(message) {
      this.voucher = this.fileName = ''
      const notification = { type: 'error', body: message }
      this.$nuxt.$emit('show-notification', notification)
    },
    next() {
      const { voucher } = this
      this.$emit('set-voucher', { voucher, folder: 'vouchers' })
    }
  }
}
</script>

<style lang="scss" scoped>
.file-name {
  max-width: unset;
}
</style>