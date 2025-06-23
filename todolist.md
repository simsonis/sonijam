# 개인 블로그 구축을 위한 Todo List

## 현재 서버 구성 분석
현재 프로젝트는 Nuxt.js 기반의 웹 애플리케이션으로 구성되어 있습니다:
- Nuxt.js 3.x 버전 사용
- TypeScript 지원
- Tailwind CSS 스타일링
- pnpm 패키지 매니저 사용
- ESLint 코드 품질 관리

## GitHub Pages 호스팅을 위한 단계별 가이드

### 1. 블로그 기본 설정
- [x] `content/` 디렉토리에 블로그 포스트 작성 시스템 구축
- [x] 마크다운 포스트 작성을 위한 기본 템플릿 생성
- [x] 블로그 메인 페이지 디자인
- [x] 블로그 포스트 목록 페이지 구현
- [x] 개별 포스트 페이지 구현

### 2. GitHub Pages 배포 설정
- [x] GitHub 저장소 생성 (이미 완료됨)
- [x] GitHub Actions 워크플로우 파일 생성
  - `/.github/workflows/deploy.yml` 파일 생성 완료
  - Nuxt.js 빌드 및 GitHub Pages 배포 자동화 설정 완료
- [x] GitHub 저장소 설정에서 Pages 활성화
  - Settings > Pages > Source를 GitHub Actions로 설정 완료

### 3. 블로그 기능 구현
- [x] 블로그 포스트 메타데이터 설정 (제목, 날짜, 태그 등)
- [x] 블로그 포스트 검색 기능 구현
- [x] 태그 기반 포스트 필터링 구현
- [x] 블로그 포스트 목차(TOC) 구현
- [x] 코드 하이라이팅 설정

### 4. SEO 및 성능 최적화
- [x] 메타 태그 설정
- [x] sitemap.xml 생성
- [x] robots.txt 설정
- [ ] 이미지 최적화
- [x] 페이지 로딩 성능 개선

### 5. 추가 기능 구현
- [ ] 댓글 시스템 통합 (예: Giscus, Utterances)
- [x] 소셜 미디어 공유 버튼 추가
- [x] 다크 모드 지원
- [x] 반응형 디자인 최적화
- [ ] 구글 애널리틱스 통합

### 6. 문서화 및 유지보수
- [ ] README.md 업데이트
- [ ] 블로그 포스트 작성 가이드 작성
- [ ] 배포 프로세스 문서화
- [ ] 정기적인 의존성 업데이트 계획 수립

## 참고사항
- 모든 변경사항은 로컬에서 테스트 후 GitHub에 푸시
- 커밋 메시지는 명확하고 설명적으로 작성
- 정기적인 백업 수행
- GitHub Pages의 무료 호스팅 한계 고려 (저장소 크기, 대역폭 등)

## 유용한 리소스
- [Nuxt.js 공식 문서](https://nuxt.com/docs)
- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [Markdown 가이드](https://www.markdownguide.org/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs) 