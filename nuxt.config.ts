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
      ignore: ['/__pinceau_tokens_config.json', '/__pinceau_tokens_schema.json'],
      failOnError: false
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
  
  // Image configuration - 기본 provider 사용 (GitHub Pages 정적 배포용)
  image: {
    quality: 80,
    format: ['webp', 'jpg', 'png'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  }
})
