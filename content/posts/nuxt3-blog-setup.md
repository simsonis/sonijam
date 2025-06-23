---
title: 'Nuxt 3로 개인 블로그 만들기'
description: 'Nuxt 3와 GitHub Pages를 활용해서 무료로 개인 블로그를 구축하는 방법을 알아봅시다.'
publishDate: '2024-03-21'
author: 'Sonijam'
authorURL: 'https://simsonis.github.io/sonijam'
heroImage: '/assets/blog/img1.jpg'
alt: 'Nuxt 3 블로그 구축'
image:
    src: '/assets/blog/img1.jpg'
    alt: 'Nuxt 3 블로그 구축'
    width: 1920
    height: 1280
layout: post
tags: ['Nuxt.js', 'Vue.js', 'Blog', 'GitHub Pages', 'Tutorial']
---

# Nuxt 3로 개인 블로그 만들기

개발자라면 누구나 한번쯤은 개인 블로그를 만들어보고 싶어합니다. 이번 포스트에서는 Nuxt 3를 사용해서 현대적이고 빠른 개인 블로그를 구축하는 방법을 알아보겠습니다.

## 왜 Nuxt 3인가?

Nuxt 3는 Vue.js 기반의 풀스택 프레임워크로, 다음과 같은 장점들을 제공합니다:

### 🚀 성능
- **정적 사이트 생성**: `nuxt generate`로 초고속 정적 사이트 생성
- **자동 코드 분할**: 필요한 코드만 로드하여 빠른 로딩
- **이미지 최적화**: Nuxt Image로 자동 이미지 최적화

### 🔍 SEO 친화적
- **서버 사이드 렌더링**: 검색엔진 최적화
- **메타 태그 관리**: `useHead()`로 쉬운 SEO 설정
- **구조화된 데이터**: JSON-LD 지원

### 🛠️ 개발자 경험
- **TypeScript 기본 지원**: 타입 안전성
- **Hot Module Replacement**: 빠른 개발 사이클
- **자동 임포트**: 편리한 개발 환경

## 프로젝트 설정

### 1. 프로젝트 생성

```bash
npx nuxi@latest init my-blog
cd my-blog
npm install
```

### 2. 필수 모듈 설치

```bash
npm install @nuxt/content @nuxtjs/tailwindcss
```

### 3. nuxt.config.ts 설정

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    highlight: {
      theme: 'github-dark'
    }
  }
})
```

## 블로그 구조 만들기

### 콘텐츠 디렉토리 구성

```
content/
├── posts/
│   ├── hello-world.md
│   └── nuxt3-tutorial.md
└── index.md
```

### 마크다운 포스트 작성

```yaml
---
title: '포스트 제목'
description: '포스트 설명'
publishDate: '2024-03-21'
author: '작성자'
tags: ['tag1', 'tag2']
---

# 포스트 내용

여기에 마크다운으로 내용을 작성합니다.
```

## GitHub Pages 배포

### 1. GitHub Actions 설정

`.github/workflows/deploy.yml` 파일을 생성합니다:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Generate static site
        run: npm run generate
        
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
        with:
          path: ./dist
```

### 2. GitHub 저장소 설정

1. GitHub에서 새 저장소 생성
2. Settings → Pages → Source를 "GitHub Actions"로 설정
3. 코드를 푸시하면 자동 배포!

## 추가 기능 구현

### 검색 기능

```vue
<template>
  <div>
    <input 
      v-model="searchQuery" 
      placeholder="포스트 검색..."
      class="w-full p-2 border rounded"
    >
    <div v-for="post in filteredPosts" :key="post._path">
      <NuxtLink :to="post._path">
        {{ post.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('')
const { data: posts } = await queryContent('/posts').find()

const filteredPosts = computed(() => {
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
```

### 다크 모드

```bash
npm install @nuxtjs/color-mode
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: ''
  }
})
```

## 성능 최적화 팁

### 1. 이미지 최적화

```vue
<nuxt-img
  src="/blog/hero.jpg"
  alt="Hero image"
  width="800"
  height="400"
  loading="lazy"
/>
```

### 2. 메타 태그 최적화

```vue
<script setup>
useHead({
  title: '블로그 제목',
  meta: [
    { name: 'description', content: '블로그 설명' },
    { property: 'og:title', content: '블로그 제목' },
    { property: 'og:description', content: '블로그 설명' }
  ]
})
</script>
```

## 마무리

Nuxt 3로 블로그를 만드는 것은 생각보다 간단합니다. 강력한 기능들을 기본으로 제공하면서도 커스터마이징이 자유롭기 때문에, 개발자들에게 최적의 블로그 플랫폼이라고 할 수 있습니다.

다음 포스트에서는 더 고급 기능들을 다뤄보겠습니다. 궁금한 점이 있으시면 댓글로 남겨주세요!

## 참고 자료

- [Nuxt 3 공식 문서](https://nuxt.com/)
- [Nuxt Content 문서](https://content.nuxt.com/)
- [GitHub Pages 문서](https://docs.github.com/en/pages) 