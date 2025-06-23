<template>
  <div>
    <SkipContent />
    <main id="main" class="bg-slate-50 dark:bg-slate-900">
      <BackButton />
      
      <!-- 브레드크럼 네비게이션 -->
      <nav class="px-6 sm:px-8 py-4 border-b border-slate-200 dark:border-slate-700">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink to="/" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              홈
            </NuxtLink>
          </li>
          <li class="text-slate-400">/</li>
          <li>
            <NuxtLink to="/posts" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              포스트
            </NuxtLink>
          </li>
          <li class="text-slate-400">/</li>
          <li class="text-slate-600 dark:text-slate-400 truncate">{{ page.title }}</li>
        </ol>
      </nav>

      <article class="py-16 px-6 sm:px-8">
        <header class="flex flex-col items-center max-w-4xl mx-auto">
          <div class="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <time>{{ formatDate(page.publishDate) }}</time>
            <span>•</span>
            <ReadingTime :content="page.body?.children?.[0]?.children?.[0]?.value || ''" />
            <span>•</span>
            <span>{{ page.author }}</span>
          </div>
          
          <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl text-center">
            {{ page.title }}
          </h1>
          
          <p v-if="page.description" class="mt-4 text-lg text-slate-600 dark:text-slate-400 text-center max-w-2xl">
            {{ page.description }}
          </p>

          <!-- 태그 표시 -->
          <div v-if="page.tags?.length" class="flex flex-wrap gap-2 mt-6">
            <span 
              v-for="tag in page.tags" 
              :key="tag"
              class="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full"
            >
              #{{ tag }}
            </span>
          </div>

          <hr class="mt-8 border-t-2 w-20 mx-auto">
          
          <div v-if="page.heroImage" class="mt-8 w-full max-w-4xl">
            <nuxt-img
              provider="twicpics"
              class="object-cover rounded-2xl shadow-lg w-full"
              :src="page.heroImage"
              :alt="page.alt"
              loading="lazy"
            />
          </div>
        </header>
        
        <div class="mt-12 prose prose-slate mx-auto lg:prose-lg dark:prose-invert prose-img:rounded-2xl prose-img:shadow-md max-w-4xl">
          <PageToc />
          <ContentRenderer :key="page._id" :value="page" />
          
          <!-- 소셜 공유 버튼 -->
          <div class="mt-12 not-prose">
            <SocialShare 
              :title="page.title" 
              :description="page.description" 
            />
          </div>
        </div>

        <!-- 작성자 정보 -->
        <div class="max-w-4xl mx-auto">
          <AuthorBio 
            :author="page.author"
            :authorURL="page.authorURL"
          />
        </div>

        <!-- 이전/다음 포스트 네비게이션 -->
        <div class="max-w-4xl mx-auto">
          <PostNavigation :currentPath="page._path" />
        </div>

        <!-- 관련 포스트 -->
        <div class="max-w-6xl mx-auto">
          <RelatedPosts 
            :currentTags="page.tags || []"
            :currentPath="page._path"
          />
        </div>
      </article>
      
      <NavContent />
      <BlogFooter />
    </main>
  </div>
</template>

<script setup lang="ts">
const { page } = useContent()

// 날짜 포맷팅
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO 메타 태그 설정
useHead({
  title: page.value?.title,
  meta: [
    {
      name: 'description',
      content: page.value?.description
    },
    {
      name: 'keywords',
      content: page.value?.tags?.join(', ')
    },
    {
      property: 'og:title',
      content: page.value?.title
    },
    {
      property: 'og:description',
      content: page.value?.description
    },
    {
      property: 'og:image',
      content: page.value?.heroImage
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'article:author',
      content: page.value?.author
    },
    {
      property: 'article:published_time',
      content: page.value?.publishDate
    },
    {
      property: 'article:tag',
      content: page.value?.tags?.join(', ')
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: page.value?.title
    },
    {
      name: 'twitter:description',
      content: page.value?.description
    },
    {
      name: 'twitter:image',
      content: page.value?.heroImage
    }
  ]
})

// 구조화된 데이터 (JSON-LD)
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: page.value?.title,
  description: page.value?.description,
  image: page.value?.heroImage,
  author: {
    '@type': 'Person',
    name: page.value?.author,
    url: page.value?.authorURL
  },
  publisher: {
    '@type': 'Organization',
    name: 'Sonijam',
    url: 'https://simsonis.github.io/sonijam'
  },
  datePublished: page.value?.publishDate,
  keywords: page.value?.tags?.join(', ')
})
</script>
