Write a new note (reference doc) for this Docusaurus blog.

## Notes structure

Notes live under `docs/` and are organized by category:

| Category | Directory | Topics |
|---|---|---|
| Unreal Engine | `docs/unreal-engine/` | Blueprint, C++ API, Gameplay Framework, Animation, Networking |
| C++ | `docs/cpp/` | Modern C++, 템플릿, 메모리 관리, 디자인 패턴 |
| Graphics | `docs/graphics/` | Materials, HLSL Shaders, Niagara, Lumen / Nanite |
| Tools | `docs/tools/` | Git, Build System, Profiling, Editor Tools |
| AI | `docs/ai/` | LLM, Prompt Engineering, Local AI, AI in Game |

Each category already has an `intro.md` file — do NOT overwrite it.

## Frontmatter template

```md
---
sidebar_position: N
title: 제목
---
```

`sidebar_position` 은 같은 디렉토리 내 기존 파일 수 + 1로 설정합니다.

## Writing rules

1. **레퍼런스 스타일**: 나중에 다시 찾아볼 수 있도록 정확하고 간결하게.
2. 개인적인 감상이나 경험담은 최소화 — 그건 Blog.
3. 헤딩은 `##` 부터 사용 (title이 `#` 역할을 함).
4. 코드 예시는 가능한 한 실제로 동작하는 형태로.
5. 표, 목록, 코드 블럭을 적극 활용해 스캔하기 쉽게.
6. 한국어로 작성, 기술 용어·식별자·고유명사는 영어 그대로.

## What to do

$ARGUMENTS 가 있으면 그것을 주제로 노트를 작성하세요.
$ARGUMENTS 가 없으면 사용자에게 주제와 카테고리를 물어보세요.

주제가 주어지면:
1. 어느 카테고리(`docs/` 하위 디렉토리)에 넣을지 판단합니다. 불명확하면 사용자에게 확인합니다.
2. 해당 디렉토리의 기존 파일 목록을 확인해 `sidebar_position` 을 결정합니다.
3. 파일명은 영어 소문자 kebab-case로 합니다 (예: `gameplay-ability-system.md`).
4. 파일 생성 후 git add & commit 여부를 사용자에게 확인합니다.
