<template>
  <section class="mt-16 border-t border-slate-200 dark:border-slate-700 pt-8">
    <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
      <div class="flex items-start space-x-4">
        <div class="flex-shrink-0">
          <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-xl">
              {{ authorInitial }}
            </span>
          </div>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {{ author }}
          </h3>
          <p class="text-slate-600 dark:text-slate-400 mt-1">
            {{ bio }}
          </p>
          <div class="flex items-center space-x-4 mt-4">
            <a 
              v-if="authorURL" 
              :href="authorURL"
              class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="flex items-center text-sm">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                웹사이트 방문
              </span>
            </a>
            <span class="text-slate-400 dark:text-slate-500">•</span>
            <span class="text-sm text-slate-500 dark:text-slate-400">
              {{ postCount }}개의 포스트 작성
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  author: string
  authorURL?: string
  bio?: string
}

const props = withDefaults(defineProps<Props>(), {
  bio: '개발과 기술에 대한 이야기를 나누는 것을 좋아하는 블로거입니다.'
})

// 작성자 이니셜 생성
const authorInitial = computed(() => {
  return props.author.charAt(0).toUpperCase()
})

// 해당 작성자의 포스트 수 계산
const { data: authorPosts } = await queryContent('/posts')
  .where({ author: props.author })
  .only(['_path'])
  .find()

const postCount = computed(() => authorPosts.length)
</script> 