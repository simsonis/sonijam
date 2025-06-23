# 🚀 배포 프로세스 가이드

이 문서는 Sonijam 블로그의 배포 프로세스와 관련된 모든 정보를 담고 있습니다.

## 📋 배포 개요

### 자동 배포 시스템
- **플랫폼**: GitHub Pages
- **자동화**: GitHub Actions
- **트리거**: `main` 브랜치 푸시
- **빌드 도구**: Nuxt.js Static Site Generation

### 배포 URL
- **프로덕션**: [https://simsonis.github.io/sonijam](https://simsonis.github.io/sonijam)
- **리포지토리**: [https://github.com/simsonis/sonijam](https://github.com/simsonis/sonijam)

## 🔧 GitHub Actions 워크플로우

### 파일 위치
```
.github/workflows/deploy.yml
```

### 워크플로우 구조

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 8.9.0
          
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Generate static site
        run: pnpm generate
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 🔄 배포 프로세스

### 1. 자동 배포 (권장)

#### 단계별 과정
1. **코드 변경 및 커밋**
   ```bash
   git add .
   git commit -m "feat: Add new feature"
   git push origin main
   ```

2. **GitHub Actions 자동 실행**
   - 코드 체크아웃
   - Node.js 및 pnpm 설정
   - 의존성 설치
   - 정적 사이트 생성 (`pnpm generate`)
   - GitHub Pages 배포

3. **배포 완료**
   - 일반적으로 2-5분 소요
   - 실시간 진행 상황은 GitHub Actions 탭에서 확인

#### 배포 상태 확인
- **GitHub Actions**: `https://github.com/simsonis/sonijam/actions`
- **배포 로그**: 각 워크플로우 실행에서 상세 로그 확인 가능

### 2. 수동 배포 (개발/테스트 목적)

#### 로컬 빌드
```bash
# 정적 사이트 생성
pnpm generate

# 생성된 파일 확인
ls -la dist/

# 로컬에서 미리보기
pnpm preview
```

#### 수동 GitHub Pages 배포
일반적으로 필요하지 않지만, 응급 상황에서 사용:

```bash
# dist 폴더를 gh-pages 브랜치에 배포
npx gh-pages -d dist
```

## 🛠️ 환경 설정

### GitHub Pages 설정

1. **GitHub 저장소 설정**
   - Settings → Pages
   - Source: "GitHub Actions" 선택
   - Custom domain (선택사항)

2. **필요한 권한**
   - Repository: Write 권한
   - Pages: Write 권한 (자동 설정됨)

### 환경 변수

#### Nuxt.js 설정 (`nuxt.config.ts`)
```typescript
export default defineNuxtConfig({
  site: {
    url: 'https://simsonis.github.io',
    name: 'Sonijam',
    description: '개인 블로그',
  },
  
  runtimeConfig: {
    public: {
      siteUrl: 'https://simsonis.github.io'
    }
  },
  
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/rss.xml']
    }
  }
})
```

## 🔍 트러블슈팅

### 일반적인 배포 오류

#### 1. 빌드 실패
**증상**: GitHub Actions에서 빌드 단계 실패

**해결 방법**:
```bash
# 로컬에서 빌드 테스트
pnpm install
pnpm generate

# 오류 확인 후 수정
git add .
git commit -m "fix: Resolve build errors"
git push origin main
```

#### 2. 의존성 오류
**증상**: `pnpm install` 단계에서 실패

**해결 방법**:
- `package.json` 및 `pnpm-lock.yaml` 확인
- 로컬에서 의존성 재설치 후 테스트

#### 3. Prerender 오류
**증상**: 정적 사이트 생성 중 오류

**해결 방법**:
- 문제가 되는 페이지 확인
- 이미지 경로 및 메타데이터 검증
- OG 이미지 생성 관련 설정 확인

#### 4. GitHub Actions 권한 오류
**증상**: 배포 단계에서 권한 관련 오류

**해결 방법**:
1. Repository Settings → Actions → General
2. "Workflow permissions"에서 "Read and write permissions" 선택
3. "Allow GitHub Actions to create and approve pull requests" 체크

### 배포 상태 확인 명령어

#### GitHub CLI 사용
```bash
# 최근 워크플로우 실행 확인
gh run list

# 특정 실행 상세 정보
gh run view [RUN_ID]

# 실시간 로그 확인
gh run watch
```

#### curl을 이용한 사이트 상태 확인
```bash
# 사이트 접속 가능 여부 확인
curl -I https://simsonis.github.io/sonijam

# 특정 페이지 확인
curl -I https://simsonis.github.io/sonijam/posts/hello-world
```

## 📊 배포 모니터링

### 성능 지표 확인

#### 1. Google PageSpeed Insights
- URL: `https://pagespeed.web.dev/`
- 테스트 URL: `https://simsonis.github.io/sonijam`

#### 2. Lighthouse 점수
로컬에서 Lighthouse 감사 실행:
```bash
# Chrome DevTools 또는
npx lighthouse https://simsonis.github.io/sonijam
```

#### 3. 사이트 상태 모니터링
- **Uptime 모니터링**: UptimeRobot, Pingdom 등 활용
- **Error 트래킹**: 필요시 Sentry 등 도구 연동

### SEO 및 검색엔진 등록

#### 1. Google Search Console
- 사이트 등록: `https://search.google.com/search-console`
- Sitemap 제출: `https://simsonis.github.io/sonijam/sitemap.xml`

#### 2. Bing Webmaster Tools
- 사이트 등록: `https://www.bing.com/webmasters`

## 🔄 정기 유지보수

### 의존성 업데이트

#### 월간 업데이트 체크리스트
```bash
# 1. 의존성 버전 확인
pnpm outdated

# 2. 보안 취약점 확인
pnpm audit

# 3. 패치 버전 업데이트
pnpm update

# 4. 메이저 버전 업데이트 (주의깊게)
pnpm add nuxt@latest

# 5. 테스트 및 배포
pnpm dev  # 로컬 테스트
pnpm generate  # 빌드 테스트
git add . && git commit -m "chore: Update dependencies"
git push origin main
```

#### GitHub Dependabot 설정
`.github/dependabot.yml` 파일로 자동 의존성 업데이트:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    reviewers:
      - "simsonis"
    assignees:
      - "simsonis"
```

### 백업 및 복구

#### 1. 저장소 백업
- GitHub에서 자동 백업됨
- 추가 백업 필요시 다른 Git 호스팅 서비스에 미러링

#### 2. 콘텐츠 백업
```bash
# 마크다운 파일 별도 백업
tar -czf content-backup-$(date +%Y%m%d).tar.gz content/
```

#### 3. 복구 프로세스
1. 새로운 저장소 생성
2. 백업된 코드 복원
3. GitHub Pages 설정 재구성
4. DNS 설정 (커스텀 도메인 사용시)

## 📈 성능 최적화

### 빌드 시간 단축

#### 1. 의존성 캐싱
GitHub Actions에서 Node.js 캐시 활용:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'pnpm'  # 이 부분이 캐싱 활성화
```

#### 2. 점진적 빌드
```bash
# 변경된 파일만 처리하도록 최적화
# Nuxt.js에서는 자동으로 최적화됨
```

### 배포 시간 단축

#### 1. 병렬 처리
- 빌드와 테스트를 병렬로 실행
- 이미지 최적화를 별도 작업으로 분리

#### 2. CDN 활용
- GitHub Pages는 기본적으로 CDN 제공
- 추가 CDN 필요시 Cloudflare 등 활용

## 🚨 응급 대응

### 긴급 롤백

#### 1. 이전 버전으로 롤백
```bash
# 이전 커밋으로 되돌리기
git revert HEAD
git push origin main

# 또는 특정 커밋으로 리셋
git reset --hard [COMMIT_HASH]
git push --force origin main
```

#### 2. 핫픽스 배포
```bash
# 긴급 수정
git checkout -b hotfix/critical-fix
# 수정 작업 수행
git add .
git commit -m "hotfix: Critical issue fix"
git checkout main
git merge hotfix/critical-fix
git push origin main
```

### 장애 대응

#### 1. 사이트 다운시
1. GitHub Pages 상태 확인: `https://www.githubstatus.com/`
2. DNS 이슈 확인
3. 임시 대체 페이지 준비

#### 2. 배포 실패시
1. GitHub Actions 로그 확인
2. 로컬에서 동일 환경 재현
3. 단계별 디버깅

---

이 문서를 통해 Sonijam 블로그의 배포 프로세스를 완전히 이해하고 관리할 수 있습니다. 추가 질문이나 문제가 발생하면 GitHub Issues를 통해 문의해 주세요! 🚀 