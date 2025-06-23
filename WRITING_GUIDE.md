# 📝 블로그 포스트 작성 가이드

이 문서는 Sonijam 블로그에서 고품질 포스트를 작성하기 위한 완전한 가이드입니다.

## 🚀 빠른 시작

### 1. 새 포스트 파일 생성

`content/posts/` 디렉토리에 새 마크다운 파일을 생성합니다:

```bash
# 파일명 예시
content/posts/my-awesome-post.md
content/posts/2024-javascript-tips.md
content/posts/nuxt3-deployment-guide.md
```

### 2. 기본 템플릿 사용

모든 포스트는 다음 메타데이터 구조로 시작해야 합니다:

```yaml
---
title: '포스트 제목'
description: '포스트 요약 설명 (SEO 및 공유용, 150자 내외 권장)'
publishDate: '2024-03-20'
author: 'Sonijam'
authorURL: 'https://simsonis.github.io/sonijam'
heroImage: '/assets/blog/your-image.jpg'
alt: '대표 이미지 설명'
image:
    src: '/assets/blog/your-image.jpg'
    alt: '대표 이미지 설명'
    width: 1920
    height: 1280
layout: post
tags: ['JavaScript', 'Nuxt.js', 'Frontend']
---
```

## 📊 메타데이터 필드 상세 설명

| 필드 | 필수 | 설명 | 예시 |
|------|------|------|------|
| `title` | ✅ | 포스트 제목 (SEO 최적화) | `'Nuxt 3 완벽 가이드'` |
| `description` | ✅ | 요약 설명 (150자 내외) | `'Nuxt 3의 새로운 기능과 마이그레이션 방법을 알아봅시다'` |
| `publishDate` | ✅ | 발행 날짜 (YYYY-MM-DD) | `'2024-03-20'` |
| `author` | ✅ | 작성자 이름 | `'Sonijam'` |
| `authorURL` | ✅ | 작성자 URL | `'https://simsonis.github.io/sonijam'` |
| `heroImage` | ✅ | 대표 이미지 경로 | `'/assets/blog/nuxt3-guide.jpg'` |
| `alt` | ✅ | 이미지 대체 텍스트 | `'Nuxt 3 로고와 코드'` |
| `image` | ✅ | 상세 이미지 정보 | 아래 참조 |
| `layout` | ✅ | 레이아웃 (항상 `post`) | `post` |
| `tags` | ✅ | 태그 배열 (3-5개 권장) | `['Nuxt.js', 'Vue.js', 'SSR']` |

### 이미지 정보 구조

```yaml
image:
    src: '/assets/blog/your-image.jpg'    # 이미지 경로
    alt: '이미지 설명'                      # 접근성용 대체 텍스트
    width: 1920                           # 원본 이미지 너비
    height: 1280                          # 원본 이미지 높이
```

## 🏷️ 태그 시스템

### 권장 태그 카테고리

#### 기술 스택
- `JavaScript`, `TypeScript`, `Python`, `Go`
- `Vue.js`, `React`, `Nuxt.js`, `Next.js`
- `Node.js`, `Express`, `Fastify`

#### 주제별
- `Frontend`, `Backend`, `Full-Stack`
- `DevOps`, `CI/CD`, `Docker`
- `Database`, `API`, `GraphQL`

#### 콘텐츠 유형
- `Tutorial`, `Guide`, `Tips`
- `Review`, `Opinion`, `News`
- `Project`, `Experience`, `Learning`

### 태그 작성 규칙
- **3-5개 태그** 사용 권장
- **일관된 형식** 유지 (예: `JavaScript` vs `javascript`)
- **구체적인 태그** 선호 (예: `Vue.js` > `Framework`)

## ✍️ 마크다운 작성 가이드

### 헤딩 구조

```markdown
# H1 - 포스트 제목 (메타데이터의 title과 동일)

## H2 - 주요 섹션

### H3 - 하위 섹션

#### H4 - 세부 항목
```

### 코드 블록

#### 인라인 코드
```markdown
`const variable = 'value'`와 같이 작성합니다.
```

#### 코드 블록 (언어 지정)
```markdown
\```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
\```
```

#### 코드 블록 (파일명 포함)
```markdown
\```javascript:utils/helper.js
export function formatDate(date) {
  return new Intl.DateTimeFormat('ko-KR').format(date);
}
\```
```

### 이미지 삽입

#### 기본 이미지
```markdown
![이미지 설명](/assets/blog/example.jpg)
```

#### 캡션이 있는 이미지
```markdown
![Nuxt 3 아키텍처](/assets/blog/nuxt3-architecture.png "Nuxt 3의 새로운 아키텍처")
```

### 링크

#### 외부 링크
```markdown
[Nuxt.js 공식 문서](https://nuxt.com/)
```

#### 내부 링크 (다른 포스트)
```markdown
[이전 포스트](/posts/previous-post)
```

### 인용문

```markdown
> "좋은 코드는 주석이 필요 없다."
> 
> — 클린 코드 저자
```

### 목록

#### 순서 없는 목록
```markdown
- 첫 번째 항목
- 두 번째 항목
  - 중첩된 항목
  - 또 다른 중첩 항목
- 세 번째 항목
```

#### 순서 있는 목록
```markdown
1. 프로젝트 설정
2. 의존성 설치
3. 개발 환경 구성
4. 첫 번째 컴포넌트 작성
```

### 표

```markdown
| 기능 | Nuxt 2 | Nuxt 3 |
|------|--------|--------|
| Vue 버전 | Vue 2 | Vue 3 |
| TypeScript | 옵션 | 기본 지원 |
| 번들러 | Webpack | Vite |
```

### 경고 및 정보 박스

```markdown
> ⚠️ **주의**: 이 방법은 프로덕션 환경에서 사용하지 마세요.

> 💡 **팁**: 성능 최적화를 위해 lazy loading을 사용하세요.

> 📝 **참고**: 자세한 내용은 공식 문서를 확인하세요.
```

## 📸 이미지 관리

### 이미지 파일 구조

```
public/assets/blog/
├── post-slug/           # 포스트별 폴더
│   ├── hero.jpg        # 대표 이미지
│   ├── diagram1.png    # 다이어그램
│   └── screenshot.jpg  # 스크린샷
└── shared/             # 공통 이미지
    ├── logo.png
    └── icons/
```

### 이미지 최적화 가이드

#### 권장 사양
- **대표 이미지**: 1920x1280px (3:2 비율)
- **인라인 이미지**: 최대 1200px 너비
- **파일 크기**: 500KB 이하 권장
- **형식**: JPG (사진), PNG (투명 배경), WebP (최적화)

#### 이미지 압축 도구
- [TinyPNG](https://tinypng.com/) - 온라인 압축
- [ImageOptim](https://imageoptim.com/) - macOS 앱
- [Squoosh](https://squoosh.app/) - 구글 웹 앱

## 🎯 SEO 최적화 팁

### 제목 작성
- **50-60자** 내외로 제한
- **주요 키워드** 앞쪽에 배치
- **액션 단어** 포함 (방법, 가이드, 팁 등)

#### 좋은 예시
```
"Nuxt 3 마이그레이션 완벽 가이드 - 단계별 실전 방법"
"JavaScript 성능 최적화 5가지 필수 기법"
```

### 설명 작성
- **120-150자** 내외
- **포스트 핵심 내용** 요약
- **액션을 유도**하는 문구 포함

#### 좋은 예시
```
"Nuxt 2에서 Nuxt 3로 마이그레이션하는 전체 과정을 단계별로 설명합니다. 주요 변경사항과 주의사항을 실제 코드 예시와 함께 알아보세요."
```

### 콘텐츠 구조화
- **목차 활용**: H2, H3 헤딩으로 구조화
- **단락 분리**: 3-4줄마다 단락 구분
- **핵심 키워드**: 자연스럽게 본문에 포함

## 📝 체크리스트

포스트 발행 전 다음 항목들을 확인하세요:

### 메타데이터
- [ ] 제목이 명확하고 SEO 친화적인가?
- [ ] 설명이 150자 내외로 작성되었는가?
- [ ] 발행 날짜가 정확한가?
- [ ] 태그가 3-5개 적절히 선택되었는가?
- [ ] 대표 이미지가 설정되었는가?

### 콘텐츠
- [ ] 헤딩 구조가 논리적인가? (H1 → H2 → H3)
- [ ] 코드 블록에 언어가 지정되었는가?
- [ ] 이미지에 대체 텍스트가 있는가?
- [ ] 외부 링크가 올바르게 작동하는가?
- [ ] 맞춤법과 문법이 정확한가?

### 기술적 확인
- [ ] 로컬에서 빌드가 성공하는가?
- [ ] 목차가 올바르게 생성되는가?
- [ ] 반응형 디자인이 잘 작동하는가?
- [ ] 소셜 공유 미리보기가 정상인가?

## 🔄 발행 프로세스

1. **로컬 테스트**
   ```bash
   pnpm dev
   # http://localhost:3000에서 확인
   ```

2. **빌드 테스트**
   ```bash
   pnpm generate
   # 빌드 에러 없이 성공하는지 확인
   ```

3. **Git 커밋 및 푸시**
   ```bash
   git add .
   git commit -m "feat: Add new post about [주제]"
   git push origin main
   ```

4. **배포 확인**
   - GitHub Actions에서 빌드 성공 확인
   - 라이브 사이트에서 포스트 확인

## 💡 고급 팁

### 시리즈 포스트 작성
연관된 여러 포스트의 경우 태그와 제목으로 시리즈임을 명시:

```yaml
title: '[Nuxt 3 시리즈 #1] 프로젝트 설정과 기본 구조'
tags: ['Nuxt.js', 'Series', 'Beginner']
```

### 코드 하이라이팅 언어 목록
지원되는 주요 언어들:
- `javascript`, `typescript`, `vue`, `html`, `css`
- `python`, `go`, `rust`, `java`, `csharp`
- `bash`, `shell`, `yaml`, `json`, `markdown`

### 수학 공식 (LaTeX)
복잡한 수식이 필요한 경우:

```markdown
인라인 수식: $E = mc^2$

블록 수식:
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$
```

---

이 가이드를 따라 작성하면 검색엔진 최적화와 사용자 경험이 모두 뛰어난 고품질 블로그 포스트를 만들 수 있습니다! 📚✨ 