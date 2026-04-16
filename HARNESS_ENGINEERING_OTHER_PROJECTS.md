# 다른 프로젝트에 하네스 엔지니어링 적용 가이드

## 1. 문서 목적

이 문서는 Gorchera 스타일의 하네스 엔지니어링을 다른 프로젝트에 적용하기 위한 실무 가이드다.
목표는 다음 세 가지다.

- AI를 바로 코드에 붙이는 방식이 아니라, 상태/검증/승인/재시도를 갖춘 실행 하네스로 운영한다.
- Codex, Claude 같은 모델을 역할 기반 파이프라인 안에 배치한다.
- 다른 저장소에서도 재사용 가능한 파일 구조, 설정 방식, 운영 규칙을 한 문서로 정리한다.

이 문서는 "새 프로젝트에 무엇을 만들고", "어떻게 설정하고", "어떤 순서로 도입해야 하는지"를 설명한다.

---

## 2. 하네스 엔지니어링이란 무엇인가

하네스 엔지니어링은 AI에게 "코드를 작성해 달라"고 직접 요청하는 방식이 아니다.
대신 다음을 시스템으로 강제하는 방식이다.

- 어떤 목표를 수행하는지
- 어떤 범위까지 수정 가능한지
- 무엇이 완료 조건인지
- 어떤 검증을 통과해야 하는지
- 위험한 행동은 어디서 막아야 하는지
- 실패했을 때 어떻게 재시도할지

즉, 핵심은 모델 자체가 아니라 모델을 둘러싼 실행 통제 계층이다.

좋은 하네스는 다음 특성을 가진다.

- 상태가 남는다.
- 산출물이 남는다.
- 검증이 자동화된다.
- 사람이 개입해야 할 지점이 분리된다.
- 실패와 차단(blocked)이 구분된다.
- 동일 프로젝트에서 반복 사용 가능하다.

---

## 3. 다른 프로젝트에 적용할 때 꼭 가져가야 하는 핵심 원칙

### 3.1 완료 판정은 모델이 아니라 검증이 한다

- "완료했습니다"라는 모델 응답으로 끝내면 안 된다.
- 최소한 `build`, `test`, 필요하면 `lint`가 자동 실행되어야 한다.
- evaluator 또는 최종 검증 단계는 기계적 결과를 기반으로 통과/실패를 판단해야 한다.

### 3.2 역할을 분리한다

최소 권장 역할은 다음과 같다.

- supervisor: 작업 시작, 목표 작성, 방향 수정, 승인
- planner/director: 작업 분해와 실행 전략 수립
- executor: 실제 구현
- evaluator: 완료 판정, 회귀 확인, 계약 위반 검증

작은 프로젝트는 planner를 생략해도 되지만, executor와 evaluator는 분리하는 편이 낫다.

### 3.3 검증 조건을 문서로 고정한다

다음 항목은 매 작업마다 흔들리면 안 된다.

- In-scope
- Out-of-scope
- Invariants
- Done when
- Build/test/lint 명령

### 3.4 위험한 동작은 정책으로 막는다

프로젝트마다 다르지만 보통 아래 항목은 자동 허용하지 않는다.

- 네트워크 접근
- 배포
- 외부 시스템 변경
- 대량 삭제
- 워크스페이스 외부 쓰기
- 민감정보 접근

### 3.5 상태와 아티팩트를 저장한다

최소한 아래는 저장하는 편이 좋다.

- job 상태
- step 로그
- 실행한 명령
- 변경 파일 목록
- diff 요약
- 검증 결과
- blocked reason

---

## 4. 적용 범위별 도입 수준

### Level 1. 최소 도입

대상:

- 소규모 저장소
- AI 활용을 시작하는 팀
- 우선 실험이 필요한 경우

구성:

- Codex 또는 Claude 한 종류
- executor + evaluator 중심 운영
- build/test 자동 실행
- 간단한 프로젝트 규칙 문서

### Level 2. 표준 도입

대상:

- 백엔드/프론트엔드 실서비스 저장소
- 여러 명이 동시에 변경하는 팀

구성:

- supervisor + planner + executor + evaluator
- role profile
- prompt override
- strictness, ambition, workspace mode 사용
- blocked / retry / steer 운영

### Level 3. 완전 도입

대상:

- 품질 기준이 높은 서비스
- 장기 실행 작업
- 체인 작업, 리뷰 루프, 병렬 작업이 필요한 경우

구성:

- stateful job 저장
- chain execution
- isolated workspace
- approval policy
- audit 문서
- implementation status / principles / architecture 문서 분리

---

## 5. 권장 파일 구조

다른 프로젝트에 적용할 때 권장하는 최소 파일 구조는 아래와 같다.

```text
your-project/
  README.md
  CLAUDE.md
  .mcp.json
  .gorchera/
    prompts/
      executor.md
      evaluator.md
  docs/
    INSTALL.md
    SUPERVISOR_GUIDE.md
    PRINCIPLES.md
    IMPLEMENTATION_STATUS.md
    HARNESS_ENGINEERING.md
  examples/
    role-profiles.sample.json
    goals/
      bugfix.md
      feature.md
      refactor.md
```

프로젝트가 커지면 아래 파일도 추가할 수 있다.

```text
your-project/
  docs/
    ARCHITECTURE.md
    API_REFERENCE.md
    AUDIT_REPORT.md
    RUNBOOK.md
```

---

## 6. 파일별 역할 설명

### 6.1 `README.md`

역할:

- 저장소 전체 소개
- 빠른 시작
- 문서 인덱스
- 하네스 사용법 요약

포함하면 좋은 내용:

- 프로젝트 목적
- 로컬 실행 방법
- build/test 명령
- 하네스 시작 방법
- 문서 링크

### 6.2 `CLAUDE.md`

역할:

- 에이전트가 이 저장소 안에서 따라야 할 로컬 규칙
- 직접 코딩 정책, 검증 정책, 범위 제한 등을 짧게 정리

포함하면 좋은 내용:

- build/test 필수
- 위험 작업 금지
- 문서 업데이트 규칙
- 프로젝트 특화 invariants

### 6.3 `.mcp.json`

역할:

- Codex 앱 또는 Claude Code 같은 상위 도구가 하네스에 연결하도록 하는 프로젝트 로컬 설정

### 6.4 `.gorchera/prompts/executor.md`

역할:

- executor에게 프로젝트 특화 작업 기준을 주입

예:

- 테스트 우선
- 특정 레이어를 우회하지 말 것
- DB migration 규칙
- API backward compatibility 유지

### 6.5 `.gorchera/prompts/evaluator.md`

역할:

- evaluator가 이 프로젝트에서 무엇을 실패로 간주할지 강화

예:

- public API 변경 시 하위 호환성 체크
- 로그/모니터링 누락 시 실패
- schema 변경 시 migration 없으면 실패

### 6.6 `docs/INSTALL.md`

역할:

- 사전 준비
- 환경 변수
- 실행 방식
- 개발자와 운영자가 실제로 따라야 할 절차

### 6.7 `docs/SUPERVISOR_GUIDE.md`

역할:

- 좋은 goal 작성법
- 어떤 작업에 어떤 pipeline을 써야 하는지
- invariants를 어떻게 쓰는지
- blocked/retry/steer 운영법

### 6.8 `docs/PRINCIPLES.md`

역할:

- 절대 우회하면 안 되는 원칙

예:

- build/test 통과 전 완료 처리 금지
- evaluator gate 우회 금지
- 승인 없는 deploy 금지
- 워크스페이스 외부 수정 금지

### 6.9 `docs/IMPLEMENTATION_STATUS.md`

역할:

- 이 저장소에서 하네스가 실제로 할 수 있는 일과 아직 못 하는 일을 분리

이 문서를 두는 이유:

- 스펙과 구현 현실을 분리하기 위해서다.
- 팀이 문서를 과장해서 믿는 문제를 막는다.

### 6.10 `examples/role-profiles.sample.json`

역할:

- 팀이 바로 복사해서 쓸 수 있는 운영 프리셋

예:

- fast
- balanced
- production
- refactor-safe

---

## 7. 다른 프로젝트에 적용하기 전 체크해야 할 전제 조건

다음 항목이 준비되지 않으면 하네스는 바로 흔들린다.

### 7.1 기계적 검증 명령이 있어야 한다

최소 하나 이상 필요하다.

- build
- test
- lint
- smoke test

예시:

- Go: `go build ./...`, `go test ./...`
- Node: `npm run build`, `npm test`
- Python: `pytest`
- Rust: `cargo build`, `cargo test`

### 7.2 프로젝트 경계가 있어야 한다

다음이 모호하면 AI가 과하게 수정한다.

- 어떤 디렉터리까지 수정 가능한가
- 어떤 모듈은 건드리면 안 되는가
- public API는 어떻게 다뤄야 하는가
- migration, infra, deploy는 누구 승인 하에 가능한가

### 7.3 목표 서술 형식이 있어야 한다

자연어 목표만 던지면 품질이 흔들린다.
최소한 다음 템플릿을 쓰는 편이 좋다.

```text
Objective:
Why:
In-scope:
Out-of-scope:
Invariants:
Constraints:
Done when:
```

### 7.4 테스트가 약한 저장소라면 먼저 보강해야 한다

테스트가 전혀 없는 저장소에서 곧바로 "대규모 기능 구현"을 시키면 결과 판단이 약해진다.
이 경우 첫 번째 하네스 작업은 아래 중 하나가 더 낫다.

- smoke test 추가
- 핵심 경로 unit test 추가
- build/lint 자동화 정리
- migration/seed/fixture 정비

---

## 8. 기본 도입 순서

### 8.1 1단계: 프로젝트 규칙 문서화

먼저 아래 네 문서부터 만든다.

- `CLAUDE.md`
- `docs/INSTALL.md`
- `docs/SUPERVISOR_GUIDE.md`
- `docs/PRINCIPLES.md`

### 8.2 2단계: 검증 명령 확정

프로젝트별로 아래를 결정한다.

- `pre_build_commands`
- `engine_build_cmd`
- `engine_test_cmd`

### 8.3 3단계: 프로파일 샘플 작성

최소 아래 3개 프로파일을 둔다.

- fast
- balanced
- production

### 8.4 4단계: pilot 작업 1개 실행

처음부터 큰 기능을 넣지 말고, 한 번에 검증 가능한 작업으로 시작한다.

좋은 예:

- API 입력 검증 추가
- 특정 에러 메시지 개선
- race condition 1건 수정
- 테스트 누락 1건 보강

나쁜 예:

- 인증 시스템 전면 재설계
- 모놀리스를 마이크로서비스로 분리
- 프론트/백엔드 동시 전면 개편

### 8.5 5단계: blocked / retry / steer 운영 정착

하네스는 한 번 성공하는 것보다, 실패했을 때 통제 가능해야 한다.
따라서 아래 흐름을 팀이 이해해야 한다.

- blocked는 실패와 다르다.
- retry는 동일 목표의 재도전이다.
- steer는 중간 방향 수정이다.
- approve는 정책상 막힌 작업만 푼다.

---

## 9. 권장 설정 방식

### 9.1 환경 변수

Codex 중심 적용 시 보통 다음이 필요하다.

```bash
export OPENAI_API_KEY=YOUR_API_KEY
```

Claude도 같이 쓸 경우:

```bash
export ANTHROPIC_API_KEY=YOUR_API_KEY
```

필요하면 하네스 바이너리 경로도 고정한다.

```bash
export GORECHERA_CODEX_BIN=/usr/local/bin/codex
export GORECHERA_CLAUDE_BIN=/usr/local/bin/claude
```

### 9.2 워크스페이스 모드

초기 도입에는 `isolated`를 권장한다.

- `shared`: 실제 저장소를 직접 수정
- `isolated`: 분리된 worktree 또는 격리된 작업공간에서 작업

권장:

- pilot / 위험 작업 / 대규모 리팩터링: `isolated`
- 일상적 작은 수정: `shared`도 가능

### 9.3 strictness

- `lenient`: 간단한 수정, 낮은 비용
- `normal`: 일반 권장값
- `strict`: 운영 품질, 회귀 리스크가 높은 작업

### 9.4 ambition

- `low`: 최소 수정
- `medium`: 기본 권장값
- `high`: 구조 개선 허용
- `extreme`: production-grade 요구
- `custom`: 프로젝트 특화 지침

### 9.5 pipeline mode

- `light`: 빠르고 저렴함
- `balanced`: 일반 권장값
- `full`: 고품질, 반복 수정과 검증에 적합

권장 기본값:

- 작은 팀 일반 개발: `balanced + normal + medium`
- 위험 작업: `full + strict + high`
- 단순 버그 수정: `light + normal + low`

---

## 10. 추천 파일 템플릿

### 10.1 `CLAUDE.md` 템플릿

````md
# CLAUDE.md

## Build And Verify

```bash
npm run build
npm test
```

## Core Rules

- Do not mark work complete before build/test pass.
- Do not change files outside the requested scope.
- Do not deploy, push, or access external credentials without approval.
- Prefer minimal safe changes before broad refactors.
- Update docs when behavior or operator workflow changes.

## Project Invariants

- Public API responses must remain backward-compatible unless the goal explicitly allows breaking changes.
- Database schema changes require a migration file.
- Logging and error handling must remain consistent with existing patterns.
```
````

### 10.2 `.mcp.json` 템플릿

```json
{
  "mcpServers": {
    "gorchera": {
      "type": "stdio",
      "command": "go",
      "args": ["run", "./cmd/gorchera", "mcp"]
    }
  }
}
```

배포형 환경에서는 바이너리 경로를 고정할 수 있다.

```json
{
  "mcpServers": {
    "gorchera": {
      "type": "stdio",
      "command": "/opt/tools/gorchera",
      "args": ["mcp", "-recover"]
    }
  }
}
```

### 10.3 `examples/role-profiles.sample.json` 템플릿

```json
{
  "fast": {
    "provider": "codex",
    "pipeline_mode": "light",
    "strictness_level": "normal",
    "ambition_level": "low",
    "role_overrides": {}
  },
  "balanced": {
    "provider": "codex",
    "pipeline_mode": "balanced",
    "strictness_level": "normal",
    "ambition_level": "medium",
    "role_overrides": {}
  },
  "production": {
    "provider": "codex",
    "pipeline_mode": "full",
    "strictness_level": "strict",
    "ambition_level": "high",
    "role_overrides": {}
  }
}
```

### 10.4 `.gorchera/prompts/executor.md` 템플릿

```md
Follow the existing project structure and naming patterns.
Prefer focused edits over broad rewrites.
If schema or API shape changes, update tests in the same task.
Do not introduce new dependencies unless the goal explicitly requires them.
```

### 10.5 `.gorchera/prompts/evaluator.md` 템플릿

```md
Reject changes that pass tests but violate backward compatibility, migration policy,
or documented invariants. Treat missing tests for changed behavior as a defect unless
the goal explicitly allows test omission.
```

### 10.6 Goal 템플릿

```md
Objective:
사용자 프로필 업데이트 API에 입력 검증과 에러 응답 표준화를 추가한다.

Why:
빈 문자열, 잘못된 이메일 형식, 과도한 nickname 길이가 그대로 저장되고 있다.

In-scope:
- profile update handler
- request validation
- related tests

Out-of-scope:
- 인증 체계 변경
- DB schema 변경
- 관리자 화면 수정

Invariants:
- 기존 성공 응답 구조 유지
- 인증 미들웨어 동작 변경 금지
- 에러 응답 포맷은 공통 헬퍼 사용

Constraints:
- 새 dependency 추가 금지
- ASCII only comments

Done when:
- invalid input이 400으로 거절된다
- build/test 통과
- 관련 테스트가 추가되거나 기존 테스트가 보강된다
```

---

## 11. 스택별 적용 예시

### 11.1 Go 프로젝트

권장값:

```json
{
  "pre_build_commands": ["go mod tidy"],
  "engine_build_cmd": "go build ./...",
  "engine_test_cmd": "go test ./..."
}
```

적합한 작업 예:

- race condition 수정
- handler validation 추가
- repository layer bug fix

주의:

- `go mod tidy`가 의존성 변화를 유발할 수 있으므로 scope와 dependency 정책을 명시하는 편이 좋다.

### 11.2 Node.js 프로젝트

권장값:

```json
{
  "pre_build_commands": ["npm install"],
  "engine_build_cmd": "npm run build",
  "engine_test_cmd": "npm test"
}
```

프론트엔드 프로젝트라면 evaluator 규칙에 아래를 넣는 편이 좋다.

- typecheck 실패 시 실패
- responsive regression 주의
- accessibility regression 주의
- loading/error/empty states 확인

### 11.3 Python 프로젝트

권장값:

```json
{
  "pre_build_commands": ["pip install -r requirements.txt"],
  "engine_build_cmd": "python -m compileall .",
  "engine_test_cmd": "pytest"
}
```

주의:

- 가상환경 위치와 Python 버전이 문서에 고정되어야 한다.
- migration, seed, settings override 규칙을 명확히 적는 편이 좋다.

### 11.4 Rust 프로젝트

권장값:

```json
{
  "pre_build_commands": ["cargo fetch"],
  "engine_build_cmd": "cargo build",
  "engine_test_cmd": "cargo test"
}
```

### 11.5 Monorepo 프로젝트

권장값:

- worktree 또는 target workspace를 명시한다.
- 서비스별 명령을 분리한다.
- 전역 빌드 대신 변경 범위 기반 build/test를 쓰는 편이 낫다.

예:

```json
{
  "pre_build_commands": ["pnpm install"],
  "engine_build_cmd": "pnpm --filter @acme/web build",
  "engine_test_cmd": "pnpm --filter @acme/web test"
}
```

monorepo에서는 특히 다음을 문서화해야 한다.

- 어떤 package만 수정 가능한가
- lockfile 정책은 무엇인가
- 공통 라이브러리 변경 시 영향 범위는 어떻게 검증하는가

---

## 12. 운영 흐름 예시

### 12.1 파일럿 단계 운영

1. supervisor가 goal을 작성한다.
2. role profile을 선택한다.
3. workspace mode를 `isolated`로 둔다.
4. job을 시작한다.
5. status와 artifacts를 확인한다.
6. blocked면 reason을 보고 정책/정보를 보완한다.
7. evaluator가 실패시키면 failure reason을 바탕으로 retry 또는 steer 한다.

### 12.2 안정화 이후 운영

정착 후에는 아래 패턴이 일반적이다.

- 작은 버그 수정: fast 또는 balanced
- 사용자 영향 있는 기능: balanced 또는 production
- 리팩터링/고위험 변경: production + isolated

---

## 13. 추천 운영 규칙

### 13.1 supervisor 규칙

- 직접 코드를 고치지 않는다.
- goal, scope, invariants, done criteria를 명확히 쓴다.
- blocked와 failed를 구분해서 다룬다.
- 승인 필요한 작업만 approve 한다.

### 13.2 executor 규칙

- 명시된 scope를 넘지 않는다.
- 검증 가능한 변경을 우선한다.
- 필요한 테스트를 같이 수정한다.
- 무의미한 구조 변경을 피한다.

### 13.3 evaluator 규칙

- 테스트 통과만으로 완료 처리하지 않는다.
- 회귀 가능성, 범위 위반, invariant 위반을 본다.
- 변경 규모에 비해 테스트가 빈약하면 실패로 돌릴 수 있어야 한다.

---

## 14. 다른 프로젝트에 적용할 때 자주 발생하는 실패 패턴

### 14.1 goal이 너무 짧다

문제:

- executor가 과도하게 추론하거나 과소 구현한다.

대응:

- Objective/Why/In-scope/Out-of-scope/Done when을 반드시 적는다.

### 14.2 검증 명령이 부정확하다

문제:

- 실제로는 깨졌는데 job이 통과한다.

대응:

- build/test/lint를 프로젝트에 맞게 정확히 고정한다.
- 필요하면 여러 명령으로 분리한다.

### 14.3 evaluator 기준이 약하다

문제:

- 코드가 돌아가도 운영상 위험한 변경이 통과한다.

대응:

- evaluator prompt override에 프로젝트 규칙을 넣는다.
- strictness를 올린다.

### 14.4 shared workspace를 너무 빨리 쓴다

문제:

- 실수한 변경이 바로 주 저장소에 반영된다.

대응:

- 초기에는 `isolated`를 기본으로 한다.

### 14.5 문서가 구현보다 앞서간다

문제:

- 팀이 실제로 없는 기능을 있다고 믿는다.

대응:

- `IMPLEMENTATION_STATUS.md`에 implemented / partial / not implemented를 분리한다.

---

## 15. 권장 도입 체크리스트

프로젝트에 처음 적용할 때 아래 항목을 순서대로 확인한다.

### 필수

- [ ] build 명령이 있다
- [ ] test 명령이 있다
- [ ] 최소 문서 4종이 있다 (`CLAUDE.md`, `INSTALL.md`, `SUPERVISOR_GUIDE.md`, `PRINCIPLES.md`)
- [ ] goal 템플릿이 있다
- [ ] 위험 작업 정책이 있다
- [ ] role profile 샘플이 있다

### 강력 권장

- [ ] `workspace_mode=isolated`를 쓸 수 있다
- [ ] evaluator prompt override가 있다
- [ ] implementation status 문서가 있다
- [ ] examples/goals 디렉터리에 샘플 목표가 있다

### 성숙 단계

- [ ] architecture 문서가 있다
- [ ] audit 문서가 있다
- [ ] chain 작업이 가능하다
- [ ] 승인/재시도/차단 운영이 정착됐다

---

## 16. 권장 시작값 요약

처음 적용하는 팀이라면 아래 조합이 가장 무난하다.

### 일반 웹/백엔드 프로젝트

- provider: `codex`
- pipeline_mode: `balanced`
- strictness_level: `normal`
- ambition_level: `medium`
- workspace_mode: `isolated`

### 운영 영향이 큰 변경

- provider: `codex`
- pipeline_mode: `full`
- strictness_level: `strict`
- ambition_level: `high`
- workspace_mode: `isolated`

### 단순 버그 수정

- provider: `codex`
- pipeline_mode: `light`
- strictness_level: `normal`
- ambition_level: `low`

---

## 17. 최종 정리

다른 프로젝트에 하네스 엔지니어링을 적용할 때 가장 중요한 것은 "AI를 붙이는 것"이 아니라 "실행 규칙을 먼저 붙이는 것"이다.

반드시 먼저 정해야 하는 것은 다음이다.

- 어떤 목표 형식을 쓸 것인가
- 어떤 검증 명령을 통과해야 하는가
- 어떤 범위까지 수정 가능한가
- 어떤 행동은 승인 대상인가
- 실패했을 때 어떻게 재시도할 것인가

즉, 다른 프로젝트 적용의 본질은 다음 순서다.

1. 프로젝트 규칙 문서화
2. build/test/lint 고정
3. 역할 분리
4. prompt/role profile 현지화
5. isolated pilot 실행
6. blocked/retry/steer 운영 정착

이 여섯 단계를 밟으면, Codex나 Claude를 단순 채팅 도구가 아니라 반복 가능한 하네스 안의 실행 엔진으로 운영할 수 있다.
