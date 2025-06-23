<script setup lang="ts">
interface Post {
  _path: string
  title: string
  description: string
  tags?: string[]
  publishDate: string
  author: string
  heroImage: string
  alt: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
}

const searchQuery = ref('')
const selectedTag = ref('')
const allTags = ref<string[]>([])

// 모든 포스트 가져오기
const { data: posts } = await useAsyncData('posts', () => 
  queryContent<Post>('/posts')
    .sort({ _id: -1, $numeric: true })
    .without(['body'])
    .find()
)

// 모든 태그 수집
if (posts.value) {
  const tagSet = new Set<string>()
  posts.value.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag))
    }
  })
  allTags.value = Array.from(tagSet).sort()
}

// 필터링된 포스트
const filteredPosts = computed(() => {
  if (!posts.value) return []
  
  return posts.value.filter(post => {
    const matchesSearch = !searchQuery.value || 
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesTag = !selectedTag.value || 
      (post.tags && post.tags.includes(selectedTag.value))
    
    return matchesSearch && matchesTag
  })
})

// 검색 및 태그 초기화
const clearFilters = () => {
  searchQuery.value = ''
  selectedTag.value = ''
}
</script>

<template>
  <div class="space-y-6">
    <!-- 검색 및 필터 섹션 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <!-- 검색 입력 -->
      <div class="mb-4">
        <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          포스트 검색
        </label>
        <div class="relative">
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="제목이나 내용으로 검색..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
          <svg
            class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- 태그 필터 -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          태그로 필터링
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              !selectedTag
                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
            @click="selectedTag = ''"
          >
            전체
          </button>
          <button
            v-for="tag in allTags"
            :key="tag"
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              selectedTag === tag
                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
            @click="selectedTag = tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- 필터 초기화 버튼 -->
      <div v-if="searchQuery || selectedTag" class="flex justify-between items-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ filteredPosts.length }}개의 포스트가 발견되었습니다
        </p>
        <button
          @click="clearFilters"
          class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
        >
          필터 초기화
        </button>
      </div>
    </div>

    <!-- 포스트 목록 -->
    <div v-if="filteredPosts.length === 0" class="text-center py-12">
      <div class="text-gray-500 dark:text-gray-400">
        <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-lg font-medium">검색 결과가 없습니다</p>
        <p class="mt-1">다른 키워드로 검색해보세요</p>
      </div>
    </div>

    <div v-else>
      <div v-for="post in filteredPosts" :key="post._path">
        <hr class="py-2 mt-8 border-t-2 w-20 mx-auto">
        <article
          class="flex flex-col sm:flex-row bg-white transition hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-800/25 rounded-lg overflow-hidden"
        >
          <!-- 날짜 표시 - 모바일에서는 상단, 데스크톱에서는 세로 -->
          <div class="flex sm:rotate-180 p-2 sm:[writing-mode:_vertical-lr] justify-center sm:justify-start">
            <time
              :datetime="post.publishDate"
              class="flex flex-row sm:flex-col items-center justify-between gap-2 sm:gap-4 text-xs font-bold uppercase text-gray-900 dark:text-white"
            >
              <span>{{ post.publishDate.slice(7, 11) }}</span>
              <span class="w-px sm:w-auto sm:h-px flex-1 bg-gray-900/10 dark:bg-white/10" />
              <span>{{ post.publishDate.slice(0, 6) }}</span>
            </time>
          </div>

          <!-- 이미지 - 모바일에서는 전체 너비, 태블릿 이상에서는 고정 너비 -->
          <div class="w-full sm:w-56 sm:basis-56">
            <nuxt-img
              :alt="post.alt"
              :src="post.heroImage"
              :width="post.image.width"
              :height="post.image.height"
              class="aspect-video sm:aspect-auto h-48 sm:h-full w-full object-cover"
            />
          </div>

          <div class="flex flex-1 flex-col justify-between">
            <div
              class="border-t sm:border-t-0 sm:border-l border-gray-900/10 p-4 dark:border-white/10 sm:!border-l-transparent sm:p-6"
            >
              <NuxtLink :to="post._path" class="group">
                <h3 class="font-bold text-lg sm:text-xl uppercase text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  {{ post.title }}
                  <svg 
                    class="inline-block ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </h3>
              </NuxtLink>

              <p
                class="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3 dark:text-gray-200"
              >
                {{ post.description }}
              </p>

              <!-- 태그 표시 - 모바일에서는 작게, 데스크톱에서는 기본 크기 -->
              <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-1 mt-3">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full font-medium"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- 읽기 버튼 - 모바일에서는 전체 너비 -->
            <div class="sm:flex sm:items-end sm:justify-end p-4 sm:p-0">
              <NuxtLink
                :to="post._path"
                class="group block w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition-all duration-200 rounded-md shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                :aria-label="`${post.title} 포스트 읽기`"
              >
                <span class="flex items-center justify-center">
                  Read Blog
                  <svg 
                    class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template> 