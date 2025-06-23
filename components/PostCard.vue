<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { path: '/posts', sort: { _id: -1, $numeric: true }, without: ['body'] }
</script>

<template>
  <main class="max-w-none">
    <ContentList v-slot="{ list }" :query="query">
      <div v-for="post in list" :key="post._id">
        <hr class="py-2 mt-8 border-t-2 w-20 mx-auto">
        <article
          class="flex bg-white transition hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-800/25"
        >
          <div class="rotate-180 p-2 [writing-mode:_vertical-lr]">
            <time
              datetime="{{ post.publishDate }}"
              class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900 dark:text-white"
            >
              <span>{{ post.publishDate.slice(7, 11) }}</span>
              <span class="w-px flex-1 bg-gray-900/10 dark:bg-white/10" />
              <span>{{ post.publishDate.slice(0, 6) }}</span>
            </time>
          </div>

          <div class="hidden sm:block sm:basis-56">
            <nuxt-img
              :alt="post.alt"
              :src="post.heroImage"
              :width="post.image.width"
              :height="post.image.height"
              class="aspect-auto h-full w-full object-cover"
            />
          </div>

          <div class="flex flex-1 flex-col justify-between">
            <div
              class="border-l border-gray-900/10 p-4 dark:border-white/10 sm:!border-l-transparent sm:p-6"
            >
              <NuxtLink :to="post._path" class="group">
                <h3 class="font-bold uppercase text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
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
            </div>

            <div class="sm:flex sm:items-end sm:justify-end">
              <NuxtLink
                :to="post._path"
                class="group block bg-yellow-400 hover:bg-yellow-500 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition-all duration-200 rounded-md shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
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
    </ContentList>
  </main>
</template>
