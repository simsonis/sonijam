// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // App configuration
  app: {
    head: {
      htmlAttrs: {
        lang: 'ko'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },

  // Site metadata
  site: {
    url: 'https://simsonis.github.io',
    name: 'Sonijam',
    description: '개인 블로그',
  },

  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl: 'https://simsonis.github.io'
    }
  },

  // Build configuration
  // Note: target: 'static' is the default in Nuxt 3

  // Generate configuration for static site generation
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/rss.xml'],
      ignore: ['/__pinceau_tokens_config.json', '/__pinceau_tokens_schema.json']
    },
    static: true,
    output: {
      dir: 'dist',
      serverDir: 'dist/_nuxt',
      publicDir: 'dist'
    },
    alias: {
      'unenv/runtime/mock/empty': 'unenv/mock/empty',
      'unenv/runtime/mock/proxy-cjs': 'unenv/mock/proxy-cjs'
    }
  },

  // For 404 fallback
  routeRules: {
    '/**': { static: true },
    '/404': { static: true }
  },

  // Ensure static files are properly handled
  experimental: {
    payloadExtraction: true
  },

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@nuxt/icon',
    '@nuxtjs/seo',
    '@nuxthq/studio'
  ],

  // Content module configuration
  content: {
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-mathjax'],
      toc: {
        depth: 3,
        searchDepth: 3
      }
    },
    documentDriven: true,
    highlight: {
      theme: {
        dark: 'github-dark',
        default: 'dracula-soft'
      }
    }
  },

  // Other configurations
  telemetry: false,
  devtools: { enabled: true },
  colorMode: {
    classSuffix: ''
  },
  image: {
    twicpics: {
      baseURL: process.env.NUXT_PUBLIC_TWICPICS_URL
    }
  }
})
