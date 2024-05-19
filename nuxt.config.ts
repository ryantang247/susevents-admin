// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// import veauryVitePlugins from 'veaury/vite/index.js'

// const veaury = veauryVitePlugins({
//   type: 'vue',
// });
export default defineNuxtConfig({

  runtimeConfig:{
    public:{
      workspaceKey: process.env.workspaceKey
    }
  },
  build: {
    transpile: ['vuetify','veaury'],
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
  devtools: { enabled: false }
})
