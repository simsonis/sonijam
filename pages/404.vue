<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">페이지를 찾을 수 없습니다</h2>
      <p class="text-lg text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <NuxtLink 
        to="/" 
        class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        홈으로 돌아가기
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
});

useHead({
  title: '404 - 페이지를 찾을 수 없습니다',
  meta: [
    { name: 'description', content: '요청하신 페이지를 찾을 수 없습니다.' }
  ]
});
</script>
