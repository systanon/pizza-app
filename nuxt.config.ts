// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'vuetify-nuxt-module',
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
  ],
  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      sameSite: 'lax',
    },
  },
  runtimeConfig: {
    apiInternal: process.env.GO_BACKEND_INTERNAL,
    public: {
      apiBase: process.env.API_BASE,
      apiURL: process.env.GO_BACKEND_URL,
    },
  },

  routeRules: {
    '/api/**': process.env.GO_BACKEND_URL ? { proxy: `${process.env.GO_BACKEND_URL}/**` } : {},
  },

  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
      },
    },
  },
});
