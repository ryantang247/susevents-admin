// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { Buffer } from 'buffer'
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig:{
    public:{
      workspaceKey: process.env.workspaceKey
    }
  },
  build: {
    transpile: ['vuetify','veaury'],
  },
  // alias: {
  //   'veaury': 'veaury/dist/veaury.esm.js'
  // },

  modules: [
    '@nuxt/content','@element-plus/nuxt',
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
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    }

  },
  elementPlus: { /** Options */ },
  devtools: { enabled: false }
})