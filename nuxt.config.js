import firebaseConfig from './firebase.config'
import i18nConfig from './i18n.config'
import * as PACKAGE from './package.json'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'es',
    },
    title: 'Z-Bets',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'keywords', content: 'Zemoga, FED, grupo de estudio, apuestas internas' },
      { name: 'theme-color', content: '#00D1B2' },
      { name: 'msapplication-navbutton-color', content: '#00D1B2' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#00D1B2' },
      { property: 'og:site_name', content: 'Z-Bets' },
      { property: 'og:title', content: 'Z-Bets' },
      { property: 'og:type', content: 'webapp' },
      { property: 'og:url', content: 'https://z-bets.web.app/' },
      { property: 'og:image', content: '/favicon.png' },
      { property: 'og:description', content: 'Z-FED · JAMstack group study' },
      { property: 'og:locale', content: 'es_CO' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ],
  },

  /*
	 ** Customize the progress-bar color
	 */
  loading: { color: '#00D1B2' },

  env: {
    Z_BUTTON: 'button is-outlined is-rounded is-small',
    VERSION: PACKAGE.version,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/vivify.min.css',
    '~/assets/scss/main.scss',
  ],

  router: {
    middleware: 'router-auth',
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/after-each',
    '~/plugins/filters',
    '~/plugins/vue-progressive',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    '@nuxtjs/bulma',
    '@nuxtjs/firebase',
    'nuxt-i18n',
  ],

  firebase: firebaseConfig,
  i18n: i18nConfig,

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
}

// THIS IS JUST A TEST, THIS COMMENT SHOULD BE DELETED