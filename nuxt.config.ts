// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  optimization: {
    splitChunks: {
      maxSize: 300000
    }
  },

  runtimeConfig: {
    public: {
      frontUrl: process.env.FRONT_URL ? process.env.FRONT_URL : '',
      apiUrl: process.env.API_URL ? process.env.API_URL + '/api' :  "",
      apiUrlForImg: process.env.API_URL ? process.env.API_URL + '/storage/' : "",
    }
  },
  
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: false,
      routes: ['sitemap.xml'],
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'UPTOWIN',
      meta: [
        { charset: 'utf-8' },
        { name: 'robots', content: '' },
        { name: "theme-color" },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: ' 512x512 192x192 64x64 32x32 24x24 16x16' },
      ],
    },
  },

  modules: [
    '@nuxt/image',
    '@nuxtjs/robots',
    '@pinia/nuxt',
    'nuxt-simple-sitemap',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Geologica': true,
    }
  },

  robots: {
    rules: {
      UserAgent: '*',
      Disallow:  process.env.IS_DEV ? '/' : '',
      Sitemap: process.env.FRONT_URL ? process.env.FRONT_URL + '/sitemap.xml' : '/sitemap.xml'
    }
  },

  imports: {
    dirs: ['./store'],
  },

  components: {
    global: true,
    dirs: ['~/components']
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },

  css: [
    '@/assets/styles/index.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        // scss: {
        //   additionalData: '@use "@/assets/styles/_vars.scss" as *;'
        // }
      }
    }
  },

  site: {
    url: process.env.FRONT_URL ? process.env.FRONT_URL : "",
  },

  sitemap: {
    autoLastmod: false,
    siteUrl: process.env.FRONT_URL ? process.env.FRONT_URL : "",
    cacheTime: 1000 * 60 * 10,
    defaults: {
      priority: process.env.SITEMAP_PRIORITY ? process.env.SITEMAP_PRIORITY : 0.8,
    },
  },
})
