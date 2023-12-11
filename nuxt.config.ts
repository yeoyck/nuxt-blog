// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
    shim: false
  },
  modules: ['@vueuse/nuxt', '@unocss/nuxt'],
  unocss: {
    // https://github.com/antfu/unocss/tree/main/packages/nuxt
    uno: false,
    attributify: false,
    icons: {
      scale: 1.5,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }
  },
  css: [
    'xterm/css/xterm.css'
  ],
  routeRules: {
    '/*': { ssr: false }
  }
})
