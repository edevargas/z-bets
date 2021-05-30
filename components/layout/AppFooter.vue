<template>
  <footer
    :class="{ 'visible': isVisible, 'show-info': showInfo }"
    :style="finalHeight"
    v-click-outside="onClickOutside"
    @click="showInfo = !showInfo"
  >
    ® Zemoga SAS · About
    <div class="content">
      <p>Appweb desarrollada dentro del <a :href="link" target="_blank">grupo de estudio JAMstack</a></p>
      Devs: {{ devs.join(', ') }}
      <br>
      QA: {{ qa.join(', ') }}
    </div>
  </footer>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  name: 'AppFooter',
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return  {
      showInfo: false,
      link: 'https://zemoga.jira.com/wiki/spaces/ZEM/pages/1592164491/JAMstack',
      devs: [
        '@wbeimar.logatto',
        '@juan.castaneda',
        '@javier.albadan',
      ],
      qa: [
        '@lourdes.montes',
      ],
    }
  },
  computed: {
    isVisible() {
      return this.$nuxt.$route.name !== 'index'
    },
    finalHeight() {
      return `height: ${this.showInfo ? 'auto' : '1.4rem'};`
    },
  },
  methods: {
    onClickOutside() {
      this.showInfo = false
    },
  },
}
</script>

<style lang="scss" scoped>
footer {
  display: none;
  cursor: pointer;
  transition: 0.3s;

  .content {
    display: none;
  }

  &.visible {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    background: rgba($color: #111, $alpha: 0.6);
    color: #ccc;
  }

  &.show-info {
    .content {
      display: block;
    }
  }

  &:hover {
    background: rgba($color: #111, $alpha: 0.85);
  }

  a {
    color: #99e;

    &:hover {
      color: #eee;
    }
  }
}

@media (max-width: 1023px) {
  footer {
    &.visible {
      padding: 0.2rem;
    }
  }
}
</style>
