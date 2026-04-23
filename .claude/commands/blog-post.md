Write a new blog post for this Docusaurus blog.

## Blog structure

- Posts live in `blog/YYYY-MM-DD-slug/index.md`
- Today's date: use the `currentDate` from context if available, otherwise ask the user
- Available tags: UnrealEngine, C++, Graphics, Tools, AI, Profiling, VFX, LLM, Memory, Blog — pick the most relevant ones
- Author is always `[beankong]`

## Frontmatter template

```md
---
title: 제목
authors: [beankong]
tags: [Tag1, Tag2]
description: 한 줄 요약 (홈페이지 카드에 표시됨)
---
```

## Writing rules

1. Start with 2–3 sentences of personal context or motivation (why this topic matters to the author — written in first person, casual Korean). This becomes the preview shown before `{/* truncate */}`.
2. Place `{/* truncate */}` after the intro paragraph. NEVER use `<!-- truncate -->` — the project uses `future.v4: true` which parses `.md` as MDX, making HTML comments invalid.
3. Write the full post body after the truncate marker.
4. Use `##` and `###` headings to structure the content.
5. Include at least one code block if the topic is technical.
6. Keep the tone conversational but technically precise — the author is an Unreal Engine client developer at Nexon.
7. Write entirely in Korean except for technical terms, code identifiers, and proper nouns.

## What to do

$ARGUMENTS 가 있으면 그것을 주제로 블로그 글을 작성하세요.
$ARGUMENTS 가 없으면 사용자에게 주제를 물어보세요.

글 작성 후:
1. 오늘 날짜 기준으로 `blog/YYYY-MM-DD-slug/index.md` 경로에 파일을 생성합니다.
2. slug는 제목을 영어로 짧게 변환합니다 (예: "스마트 포인터" → `cpp-smart-pointer`).
3. 파일 생성 후 git add & commit 여부를 사용자에게 확인합니다.
