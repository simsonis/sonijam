<script setup lang="ts">
const { toc } = useContent()
const activeId = ref('')

// 스크롤 시 활성 헤딩 추적
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-80px 0px -80% 0px'
    }
  )

  // 모든 헤딩 요소 관찰
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    observer.observe(heading)
  })

  onUnmounted(() => {
    observer.disconnect()
  })
})

// 부드러운 스크롤
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<template>
  <div v-if="toc && toc.links && toc.links.length" class="not-prose mb-8">
    <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
        </svg>
        목차
      </h2>
      <nav>
        <ul class="space-y-1">
          <li v-for="link in toc.links" :key="link.id">
            <a
              :href="`#${link.id}`"
              :class="[
                'block py-1 px-2 text-sm rounded transition-colors duration-200',
                activeId === link.id
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
              ]"
              @click.prevent="scrollToHeading(link.id)"
            >
              {{ link.text }}
            </a>
            <!-- 중첩 목차 -->
            <ul v-if="link.children" class="ml-4 mt-1 space-y-1">
              <li v-for="child in link.children" :key="child.id">
                <a
                  :href="`#${child.id}`"
                  :class="[
                    'block py-1 px-2 text-xs rounded transition-colors duration-200',
                    activeId === child.id
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-medium'
                      : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  ]"
                  @click.prevent="scrollToHeading(child.id)"
                >
                  {{ child.text }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
