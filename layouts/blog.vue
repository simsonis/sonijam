<template>
  <div>
    <SkipContent />
    <div class="bg-white dark:bg-slate-900">
      <div
        class="max-w-4xl px-4 py-10 m-auto bg-slate-50 dark:bg-gray-800 sm:px-8 sm:shadow ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg"
      >
        <main id="main" class="max-w-none">
          <ColorModeSwitch
            class="dark:text-grey-100 hover:text-grey-700 dark:hover:text-grey-300"
          />
          <BlogSearch />
          <BlogFooter />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO 메타 태그 설정
useHead({
  title: 'Sonijam - 개인 블로그',
  meta: [
    {
      name: 'description',
      content: '개발과 일상을 기록하는 개인 블로그입니다. 프로그래밍, 기술, 생각들을 공유합니다.'
    },
    {
      name: 'keywords',
      content: '블로그, 개발, 프로그래밍, 기술, 일상, Nuxt.js, Vue.js, JavaScript'
    },
    {
      property: 'og:title',
      content: 'Sonijam - 개인 블로그'
    },
    {
      property: 'og:description',
      content: '개발과 일상을 기록하는 개인 블로그입니다. 프로그래밍, 기술, 생각들을 공유합니다.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:site_name',
      content: 'Sonijam Blog'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: 'Sonijam - 개인 블로그'
    },
    {
      name: 'twitter:description',
      content: '개발과 일상을 기록하는 개인 블로그입니다.'
    },
    {
      name: 'author',
      content: 'Sonijam'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ]
})
</script>
