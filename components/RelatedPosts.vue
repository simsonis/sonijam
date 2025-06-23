<template>
  <section v-if="relatedPosts.length > 0" class="mt-16 border-t border-slate-200 dark:border-slate-700 pt-8">
    <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
      관련 포스트
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article 
        v-for="post in relatedPosts" 
        :key="post._path"
        class="group bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <NuxtLink :to="post._path" class="block">
          <div v-if="post.heroImage" class="aspect-video overflow-hidden">
            <nuxt-img
              :src="post.heroImage"
              :alt="post.alt || post.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div class="p-4">
            <div class="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
              <time>{{ formatDate(post.publishDate) }}</time>
              <span class="mx-2">•</span>
              <ReadingTime :content="post.body?.children?.[0]?.children?.[0]?.value || ''" />
            </div>
            <h3 class="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
              {{ post.title }}
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
              {{ post.description }}
            </p>
            <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mt-3">
              <span 
                v-for="tag in post.tags.slice(0, 3)" 
                :key="tag"
                class="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  currentTags: string[]
  currentPath: string
}

const props = defineProps<Props>()

// 관련 포스트 찾기 (같은 태그를 가진 포스트들)
const { data: allPosts } = await queryContent('/posts')
  .only(['title', 'description', '_path', 'publishDate', 'tags', 'heroImage', 'alt', 'body'])
  .sort({ publishDate: -1 })
  .find()

const relatedPosts = computed(() => {
  if (!props.currentTags?.length || !allPosts?.value) return []
  
  return allPosts.value
    .filter(post => {
      // 현재 포스트 제외
      if (post._path === props.currentPath) return false
      
      // 공통 태그가 있는 포스트들
      return post.tags?.some(tag => props.currentTags.includes(tag))
    })
    .sort((a, b) => {
      // 공통 태그 수로 정렬
      const aCommonTags = a.tags?.filter(tag => props.currentTags.includes(tag)).length || 0
      const bCommonTags = b.tags?.filter(tag => props.currentTags.includes(tag)).length || 0
      return bCommonTags - aCommonTags
    })
    .slice(0, 3) // 최대 3개만 표시
})

// 날짜 포맷팅
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 