<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <BlogHeader />
    
    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- 브레드크럼 네비게이션 -->
      <nav class="mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <NuxtLink to="/" class="hover:text-gray-700 dark:hover:text-gray-300">
              홈
            </NuxtLink>
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ page?.title || '포스트' }}</span>
          </li>
        </ol>
      </nav>

      <!-- 포스트 헤더 -->
      <header class="mb-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {{ page?.title }}
          </h1>
          
          <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <time v-if="page?.publishDate" :datetime="page.publishDate">
              {{ formatDate(page.publishDate) }}
            </time>
            <span v-if="page?.author" class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              {{ page.author }}
            </span>
          </div>

          <p v-if="page?.description" class="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {{ page.description }}
          </p>

          <!-- 태그 표시 -->
          <div v-if="page?.tags?.length" class="flex flex-wrap justify-center gap-2 mb-8">
            <span
              v-for="tag in page.tags"
              :key="tag"
              class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full font-medium"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- 히어로 이미지 -->
          <div v-if="page?.heroImage" class="mb-8">
            <img
              :src="page.heroImage"
              :alt="page.alt || page.title || '포스트 이미지'"
              class="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
              loading="eager"
            />
          </div>
        </div>
      </header>

      <!-- 포스트 내용 -->
      <article class="prose prose-lg prose-gray dark:prose-invert max-w-none">
        <ContentDoc />
      </article>

      <!-- 소셜 공유 -->
      <div v-if="page?.title" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <SocialShare 
          :title="page.title"
          :description="page.description || ''"
        />
      </div>
    </main>

    <BlogFooter />
  </div>
</template>

<script setup lang="ts">
// 페이지 데이터 가져오기
const { page } = useContent()

// 날짜 포맷팅
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
