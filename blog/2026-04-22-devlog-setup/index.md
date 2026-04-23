---
title: Docusaurus로 기술 블로그 만들기
authors: [beankong]
tags: [Tools, Blog]
description: Docusaurus + Vercel로 개인 기술 블로그를 세팅한 과정
---

저는 기술 블로그 유목민입니다.
기술 블로그 유목민이 된 건 오래 붙잡고 있지 못하는 성격 때문입니다만 변명을 보태보자면 그동안 제 마음에 쏙 드는 블로그 플랫폼이 없었습니다.

{/* truncate */}

블로그 하는데 있어 제가 제일 중요하게 생각하는 것은 2가지!

1. 마크 다운 형식으로 글을 작성할 수 있어야 한다. 
2. 블로그 스킨을 내 마음대로 커스텀 할 수 있어야 한다.

Tistory는 블로그 스킨 커스텀이 쉬웠지만 마크 다운으로 작성한 글을 이식하거나 내보내긴 어려웠고,
Velog와 Medium은 마크다운으로 작성하기 좋았지만 스킨이 고정되어 있다보니 제 공간같이 느껴지지 않더라고요.

그래서 클로드 코드와 나만의 기술 블로그를 만들어 보기로 했습니다.

스택은 다음과 같습니다.

| 항목 | 값 |
|---|---|
| Framework | Docusaurus 3.10 |
| Hosting | Vercel + Github |

## 왜 Docusaurus인가

레퍼런스로 삼은 블로그는 올라마의 도큐먼트 사이트입니다. 
https://docs.ollama.com/

가독성 좋은 깔끔한 구성이 마음에 들었습니다.

올라마 도큐먼트 사이트는 Mintlify 프레임 워크로 만들어져있어 Mintlify를 사용할까 했지만 커스텀 부분이 아쉬웠기에,
Meta에서 오픈 소스로 공개한 Docusaurus를 사용하기로 했습니다.

Docusaurus는 노션이나 티스토리처럼 남의 플랫폼에 종속되지 않고, 코드랑 같이 버전 관리가 가능합니다.
또한 Docusaurus는 MDX 기반이라 코드 블럭 하이라이팅이 기본 지원되고, 사이드바 구성이 파일 구조 그대로 반영되어서 Notes(개발 문서) + Blog 두 가지를 한 곳에서 관리하기 좋습니다.
 
<span style={{opacity:0.5}}>※ MDX : Markdown with JSX(JavaScript XML)의 준말로 Markdown 파일 안에서 React 컴포넌트 사용이 가능합니다. </span>

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
