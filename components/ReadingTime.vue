<template>
  <div class="flex items-center text-sm text-slate-600 dark:text-slate-400">
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>{{ readingTime }}분 읽기</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  content: string
}

const props = defineProps<Props>()

const readingTime = computed(() => {
  if (!props.content) return 0
  
  // HTML 태그 제거
  const plainText = props.content.replace(/<[^>]*>/g, '')
  
  // 단어 수 계산 (한글과 영어 모두 고려)
  const koreanWords = (plainText.match(/[가-힣]+/g) || []).join('').length
  const englishWords = (plainText.match(/[a-zA-Z]+/g) || []).length
  
  // 한글: 분당 200자, 영어: 분당 200단어 기준
  const totalReadingTime = Math.ceil((koreanWords / 200) + (englishWords / 200))
  
  return Math.max(1, totalReadingTime) // 최소 1분
})
</script> 