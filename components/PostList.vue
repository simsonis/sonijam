<template>
  <div class="space-y-8">
    <article v-for="post in posts" :key="post._path" class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-2xl font-bold mb-2">
        <NuxtLink :to="post._path" class="text-gray-900 hover:text-blue-600">
          {{ post.title }}
        </NuxtLink>
      </h2>
      <div class="text-gray-500 mb-4">
        {{ new Date(post.publishDate).toLocaleDateString('ko-KR') }}
      </div>
      <p class="text-gray-600 mb-4">{{ post.description }}</p>
      <div class="flex gap-2">
        <span v-for="tag in post.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
          {{ tag }}
        </span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () =>
  queryContent('/posts').sort({ publishDate: -1 }).find()
)
</script> 