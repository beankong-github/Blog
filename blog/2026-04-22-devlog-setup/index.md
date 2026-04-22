---
title: Docusaurus로 기술 블로그 만들기
authors: [beankong]
tags: [Tools, Blog]
description: Docusaurus + Vercel로 개인 기술 블로그를 세팅한 과정. 커스텀 홈페이지, 다크 테마, 태그 ticker까지.
---

개인 기술 블로그를 만들면서 겪은 과정을 정리했습니다. 스택은 **Docusaurus 3.10 + Vercel + GitHub** 조합입니다.

<!-- truncate -->

## 왜 Docusaurus인가

노션이나 티스토리처럼 남의 플랫폼에 종속되지 않고, 코드랑 같이 버전 관리가 되는 형태를 원했어요. Docusaurus는 MDX 기반이라 코드 블럭 하이라이팅이 기본 지원되고, 사이드바 구성이 파일 구조 그대로 반영되어서 Notes(개발 문서) + Blog 두 가지를 한 곳에서 관리하기 좋습니다.

## 배포 구성

```
GitHub (beankong-github/Blog)
  └── Vercel 자동 배포
        └── https://bkdevlog.vercel.app
```

`main` 브랜치에 푸시하면 Vercel이 자동으로 빌드 & 배포합니다.

## 홈페이지 커스터마이징

기본 Docusaurus 홈페이지는 거의 비어 있어서 전부 새로 만들었어요.

### 2섹션 레이아웃

- **Section 1**: 히어로 이미지 + Notes/Blog 탭 전환 + 카테고리/태그 버튼
- **Section 2**: 선택된 탭에 따라 노트 갤러리 or 블로그 갤러리

### 무한 스크롤 태그 ticker

Blog 탭에서 태그 필터를 ticker 형태로 구현했습니다. "전체" 버튼은 왼쪽에 고정하고, 나머지 태그들만 오른쪽 영역에서 자동으로 흘러가게 했어요. 마우스를 올리면 멈춥니다.

```css
@keyframes tickerScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-33.3333%); }
}
```

태그 배열을 3벌 복사해서 무한히 이어지는 느낌을 만들고, `-33.33%` 이동 후 처음으로 돌아가는 방식입니다.

## 커스텀 플러그인

Docusaurus 3.x 블로그 플러그인은 `globalData`로 포스트 목록을 노출하지 않아서, 직접 `blog/` 디렉토리를 읽는 플러그인을 작성했어요.

```js
// plugins/blog-metadata.js
async loadContent() {
  // blog/ 폴더 직접 순회 → 프론트매터 파싱
  // posts 배열 + tags 빈도 맵 반환
},
async contentLoaded({ content, actions }) {
  actions.setGlobalData({ blogPosts: content.posts, blogTags: content.tags });
},
```

홈페이지에서는 `usePluginData('blog-metadata-plugin')` 으로 데이터를 받아씁니다.

## 테마 설정

| 항목 | 값 |
|---|---|
| 기본 배경 | `#1a1a1a` |
| 서피스 | `#222222` |
| 포인트 컬러 | `#A5C5B0` |
| 기본 폰트 | NanumSquareRound |
| 코딩 폰트 | D2Coding |
| 제목 폰트 | YeogiOttaeJalnanGothic |

우측 TOC와 breadcrumb는 숨겼고, 사이드바는 항상 펼친 상태로 고정했어요.

## 카테고리 구성

현재 Notes는 5개 카테고리로 구성되어 있습니다.

- 🎮 Unreal Engine
- ⚙️ C++
- 🎨 Graphics
- 🔧 Tools
- 🤖 AI
