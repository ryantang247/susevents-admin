// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { Buffer } from 'buffer'
export default defineNuxtConfig({
  ssr: true,
  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@element-plus/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },

  },
  elementPlus: { /** Options */ },
  vuetify: { /** Options */ },
  devtools: { enabled: false }
})
