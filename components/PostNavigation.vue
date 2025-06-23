<template>
  <nav class="mt-16 border-t border-slate-200 dark:border-slate-700 pt-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 이전 포스트 -->
      <div v-if="prevPost" class="group">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
          이전 포스트
        </p>
        <NuxtLink 
          :to="prevPost._path"
          class="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors group-hover:shadow-md"
        >
          <h3 class="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {{ prevPost.title }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
            {{ prevPost.description }}
          </p>
        </NuxtLink>
      </div>

      <!-- 다음 포스트 -->
      <div v-if="nextPost" class="group md:text-right">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
          다음 포스트
        </p>
        <NuxtLink 
          :to="nextPost._path"
          class="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors group-hover:shadow-md"
        >
          <h3 class="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {{ nextPost.title }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
            {{ nextPost.description }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  currentPath: string
}

const props = defineProps<Props>()

// 모든 포스트 가져오기
const { data: posts } = await queryContent('/posts')
  .only(['title', 'description', '_path', 'publishDate'])
  .sort({ publishDate: -1 })
  .find()

// 현재 포스트의 인덱스 찾기
const currentIndex = posts.findIndex(post => post._path === props.currentPath)

// 이전/다음 포스트 계산
const prevPost = computed(() => {
  return currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
})

const nextPost = computed(() => {
  return currentIndex > 0 ? posts[currentIndex - 1] : null
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 