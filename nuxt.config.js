require('dotenv').config()
const path = require('path')

module.exports = {
  mode: 'universal',
  loading: {
    color: '#2b90d9',
    failedColor: '#bf5050',
    duration: 1500,
  },
  head: {
    title: 'Nuxt and Apollo Boilerplate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  plugins: ['@/plugins/element-ui'],
  css: [
    'normalize.css/normalize.css',
    '@/node_modules/element-ui/lib/theme-chalk/index.css',
    '@/assets/scss/main.scss',
  ],
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    [
      'nuxt-sass-resources-loader',
      [
        path.resolve(__dirname, 'assets/scss/variables.scss'),
        path.resolve(__dirname, 'assets/scss/mixins.scss'),
      ],
    ],
  ],
  apollo: {
    clientConfigs: {
      default: '@/plugins/apollo.js',
    },
    includeNodeModules: true,
  },
}
