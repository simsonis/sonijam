<template>
  <NuxtLayout name="post">
    <div v-if="data">
      <ContentDoc :path="data._path" />
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          포스트를 찾을 수 없습니다
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          요청하신 포스트가 존재하지 않습니다.
        </p>
        <NuxtLink 
          to="/" 
          class="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          홈으로 돌아가기
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(`content-${route.path}`, async () => {
  try {
    return await queryContent().where({ _path: route.path }).findOne()
  } catch (error) {
    console.error('Error loading post:', error)
    return null
  }
})

// 404 처리
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post Not Found'
  })
}
</script> 