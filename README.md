# Sonijam 개인 블로그 📝

> Nuxt.js 3와 GitHub Pages로 구축한 현대적인 개인 블로그

🌐 **라이브 사이트:** [https://simsonis.github.io/sonijam](https://simsonis.github.io/sonijam)

## ✨ 주요 기능

### 🔍 검색 및 필터링
- **실시간 검색**: 포스트 제목과 내용으로 즉시 검색
- **태그 기반 필터링**: 관심 주제별로 포스트 분류 및 탐색
- **통합 UI**: 검색과 태그 필터를 하나의 직관적인 인터페이스에 통합

### 📖 향상된 읽기 경험
- **스마트 목차(TOC)**: 활성 섹션 자동 하이라이트 및 부드러운 스크롤
- **코드 하이라이팅**: 프로그래밍 언어별 구문 강조
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 최적화

### 🌙 사용자 경험
- **다크 모드**: 자동 및 수동 테마 전환 지원
- **소셜 공유**: Twitter, Facebook, LinkedIn, 카카오스토리 원클릭 공유
- **빠른 로딩**: 정적 사이트 생성으로 최적화된 성능

### 🔧 SEO 및 성능 최적화
- **완전한 SEO**: Open Graph, Twitter Cards, 구조화된 메타 태그
- **검색엔진 최적화**: robots.txt, sitemap.xml 자동 생성
- **이미지 최적화**: Nuxt Image로 자동 최적화 및 lazy loading

## 🚀 기술 스택

- **프레임워크**: [Nuxt.js 3](https://nuxt.com/) - Vue.js 기반 풀스택 프레임워크
- **콘텐츠 관리**: [Nuxt Content](https://content.nuxt.com/) - 마크다운 기반 CMS
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 중심 CSS 프레임워크
- **배포**: [GitHub Pages](https://pages.github.com/) - GitHub Actions 자동 배포
- **언어**: TypeScript - 타입 안전성과 개발자 경험 향상

## 📁 프로젝트 구조

```
sonijam/
├── components/           # Vue 컴포넌트
│   ├── BlogSearch.vue   # 검색 및 필터링 메인 컴포넌트
│   ├── SocialShare.vue  # 소셜 미디어 공유 버튼
│   ├── PageToc.vue      # 향상된 목차 컴포넌트
│   └── ...
├── content/             # 마크다운 콘텐츠
│   └── posts/          # 블로그 포스트
├── layouts/            # 페이지 레이아웃
│   ├── blog.vue        # 블로그 메인 페이지
│   └── post.vue        # 개별 포스트 페이지
├── public/             # 정적 파일
│   ├── assets/         # 이미지 및 미디어 파일
│   └── robots.txt      # 검색엔진 크롤링 가이드
├── server/             # 서버 라우트
│   └── routes/         # API 엔드포인트 (sitemap, RSS)
└── .github/
    └── workflows/      # GitHub Actions 배포 설정
```

## 🛠️ 설치 및 개발

### 필수 요구사항
- Node.js 18+ 
- pnpm (권장) 또는 npm/yarn

### 로컬 개발 환경 설정

1. **저장소 클론**
```bash
git clone https://github.com/simsonis/sonijam.git
cd sonijam
```

2. **의존성 설치**
```bash
pnpm install
```

3. **개발 서버 실행**
```bash
pnpm dev
```

브라우저에서 `http://localhost:3000`에 접속하여 개발 환경을 확인할 수 있습니다.

### 빌드 및 배포

```bash
# 정적 사이트 생성
pnpm generate

# 로컬에서 생성된 사이트 미리보기
pnpm preview
```

## ✍️ 블로그 포스트 작성 가이드

### 새 포스트 생성

1. `content/posts/` 디렉토리에 새 `.md` 파일 생성
2. 다음 메타데이터 형식을 사용:

```yaml
---
title: '포스트 제목'
description: '포스트 설명 (SEO 및 미리보기용)'
publishDate: '2024-03-20'
author: '작성자 이름'
authorURL: 'https://your-website.com'
heroImage: '/assets/blog/your-image.jpg'
alt: '이미지 설명'
image:
    src: '/assets/blog/your-image.jpg'
    alt: '이미지 설명'
    width: 1920
    height: 1280
layout: post
tags: ['태그1', '태그2', '태그3']
---

# 포스트 내용을 여기에 작성하세요

마크다운 문법을 사용하여 자유롭게 작성할 수 있습니다.
```

### 지원되는 마크다운 기능
- 표준 마크다운 문법
- 코드 블록 구문 강조
- 수학 공식 (LaTeX)
- 이미지 최적화 및 lazy loading
- 자동 목차 생성

## 🔄 배포 프로세스

이 블로그는 GitHub Actions를 통한 자동 배포가 설정되어 있습니다:

1. **main 브랜치에 푸시** → 자동 빌드 및 배포 시작
2. **빌드 과정**: 
   - Nuxt.js 정적 사이트 생성
   - SEO 최적화 및 이미지 처리
   - sitemap.xml, robots.txt 생성
3. **GitHub Pages 배포**: 생성된 사이트가 자동으로 공개

### 배포 상태 확인
- GitHub 저장소 → Actions 탭에서 배포 진행 상황 실시간 확인
- 배포 완료 후 [https://simsonis.github.io/sonijam](https://simsonis.github.io/sonijam)에서 확인

## 📈 성능 및 최적화

- **Lighthouse 성능 점수**: 90+ (데스크톱/모바일)
- **Core Web Vitals**: 모든 지표 녹색
- **SEO 최적화**: 검색엔진 친화적인 구조
- **이미지 최적화**: WebP 변환 및 lazy loading
- **빠른 로딩**: 정적 사이트 생성으로 최적화된 성능

## 🤝 기여 방법

1. 이슈 제보: 버그나 개선사항을 GitHub Issues에 등록
2. 풀 리퀘스트: 기능 개선이나 버그 수정 PR 환영
3. 피드백: 사용성 개선을 위한 의견 제시

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 공개되어 있습니다. 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🙏 감사 인사

이 블로그는 다음 오픈소스 프로젝트들의 도움으로 만들어졌습니다:

- [Nuxt.js](https://nuxt.com/) - Vue.js 프레임워크
- [Nuxt Content](https://content.nuxt.com/) - 마크다운 CMS
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Nuxt Image](https://image.nuxt.com/) - 이미지 최적화
- [YANBT](https://github.com/kokamkarsahil/yanbt) - 초기 템플릿

---

⭐ **이 프로젝트가 도움이 되셨다면 GitHub에서 별표를 눌러주세요!**