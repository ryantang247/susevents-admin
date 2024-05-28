// vitest.config.ts
import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'
import { configDefaults } from 'vitest/config'


export default defineVitestConfig({
    test: {
        reporter: ['text', 'json-summary', 'json'],
        environment: 'nuxt',
        exclude: [
            ...configDefaults.exclude,
            'tests'],
        // you can optionally set Nuxt-specific environment options
        // globals: true,
        // environmentOptions: {
        //   nuxt: {
        //     // rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
        //     domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
        //     // overrides: {
        //     //   // other Nuxt config you want to pass
        //     // }
        //   }
        // }
    }
})
