// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://simsonis.github.io/sonijam',
    name: 'Sonijam',
    description: '개인 블로그',
    language: 'ko',
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/sonijam/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://simsonis.github.io/sonijam'
    }
  },
  nitro: {
    prerender: {
      routes: ['/sonijam']
    }
  },
  build: {
    target: 'static'
  },
  generate: {
    fallback: true,
    dir: '.output/public/sonijam'
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  build: {
    target: 'static'
  },
  generate: {
    fallback: true
  },
  telemetry: false,
  nitro: {
    node: true,
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/rss.xml'],
      ignore: ['/__pinceau_tokens_config.json', '/__pinceau_tokens_schema.json']
    }
  },
  extends: ['@nuxt-themes/elements'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  image: { twicpics: { baseURL: process.env.NUXT_PUBLIC_TWICPICS_URL } },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@nuxt/icon',
    '@nuxtjs/seo',
    '@nuxthq/studio'
  ],
  colorMode: {
    classSuffix: ''
  },
  content: {
    // https://content.nuxtjs.org/api/
    markdown: {
      remarkPlugins: [
        'remark-math'
      ],
      rehypePlugins: [
        'rehype-mathjax'
      ],
      toc: {
        depth: 3,
        searchDepth: 3
      }
    },
    documentDriven: true,
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: {
        dark: 'github-dark',
        default: 'dracula-soft'
      }
    }
  }
})
