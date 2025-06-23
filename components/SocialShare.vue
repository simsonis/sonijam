<script setup lang="ts">
interface Props {
  title: string
  description: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: ''
})

// 현재 페이지 URL 가져오기
const route = useRoute()
const config = useRuntimeConfig()
const currentUrl = computed(() => {
  return props.url || `${config.public.siteUrl}${route.path}`
})

// 소셜 미디어 공유 URL 생성
const shareUrls = computed(() => ({
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(props.title)}&url=${encodeURIComponent(currentUrl.value)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`,
  kakao: `https://story.kakao.com/share?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(props.title)}`
}))

// 링크 복사 기능
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    // 간단한 피드백 (토스트 메시지 등으로 확장 가능)
    alert('링크가 복사되었습니다!')
  } catch (err) {
    console.error('링크 복사 실패:', err)
  }
}

// 새 창에서 공유 링크 열기
const openShare = (url: string) => {
  window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
      </svg>
      이 포스트 공유하기
    </h3>
    
    <div class="flex flex-wrap gap-3">
      <!-- Twitter -->
      <button
        @click="openShare(shareUrls.twitter)"
        class="flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
        title="Twitter에서 공유"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
        <span class="ml-2 hidden sm:inline">Twitter</span>
      </button>

      <!-- Facebook -->
      <button
        @click="openShare(shareUrls.facebook)"
        class="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        title="Facebook에서 공유"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span class="ml-2 hidden sm:inline">Facebook</span>
      </button>

      <!-- LinkedIn -->
      <button
        @click="openShare(shareUrls.linkedin)"
        class="flex items-center justify-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors duration-200"
        title="LinkedIn에서 공유"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <span class="ml-2 hidden sm:inline">LinkedIn</span>
      </button>

      <!-- 카카오스토리 -->
      <button
        @click="openShare(shareUrls.kakao)"
        class="flex items-center justify-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors duration-200"
        title="카카오스토리에서 공유"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222v2.557a.472.472 0 0 0 .944 0v-1.544l.691-.668 1.237 2.212a.472.472 0 0 0 .828-.472l-1.642-2.938zm-2.443.876a.472.472 0 0 0 .944 0V9.282a.472.472 0 0 0-.944 0v2.654zm-1.414 0a.472.472 0 0 0 .943 0V9.282a.472.472 0 0 0-.943 0v2.654zm-1.415 0a.472.472 0 0 0 .944 0V9.282a.472.472 0 0 0-.944 0v2.654zm-1.414 0a.472.472 0 0 0 .943 0V9.282a.472.472 0 0 0-.943 0v2.654zm-1.414 0a.472.472 0 0 0 .943 0V9.282a.472.472 0 0 0-.943 0v2.654z"/>
        </svg>
        <span class="ml-2 hidden sm:inline">카카오</span>
      </button>

      <!-- 링크 복사 -->
      <button
        @click="copyToClipboard"
        class="flex items-center justify-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
        title="링크 복사"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span class="ml-2 hidden sm:inline">복사</span>
      </button>
    </div>
  </div>
</template> 