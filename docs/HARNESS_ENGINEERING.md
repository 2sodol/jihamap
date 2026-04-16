# HARNESS_ENGINEERING

JihaMap 저장소에서 하네스 엔지니어링을 어떻게 적용할지 정리한 로컬 운영 문서다. 기준 문서는 [HARNESS_ENGINEERING_OTHER_PROJECTS.md](/Users/wooseok/Desktop/jihamap/HARNESS_ENGINEERING_OTHER_PROJECTS.md)이며, 여기서는 그 원칙을 현재 저장소 구조와 구현 현실에 맞게 구체화한다.

## 1. Why JihaMap Needs A Harness

JihaMap은 지도 UI, 외부 데이터 연동, 위치 추정 로직, API 계약이 함께 얽히는 프로젝트다. 이 구조에서 모델에게 직접 구현만 지시하면 다음 문제가 쉽게 생긴다.

- 아직 없는 기능을 있다고 가정하고 과도하게 구현함
- 프론트/백엔드 계약을 한쪽만 바꾸고 끝냄
- 외부 API 키나 배포를 암묵적으로 요구함
- 검증 없이 "완료"를 선언함

그래서 JihaMap에서는 모델보다 실행 규칙을 먼저 고정한다.

## 2. Core Policy

- 완료 판정은 검증 명령이 한다.
- 범위는 goal 문서로 고정한다.
- 위험 작업은 승인 대상으로 남긴다.
- 구현 상태와 비전 문서를 분리한다.
- 큰 기능보다 검증 가능한 작은 단위를 우선한다.

## 3. Roles

### Supervisor

- goal 작성
- scope, invariants, done criteria 확정
- 승인 필요한 작업만 승인

### Planner / Director

- 작업 분해
- 스택 경계 확인
- 검증 명령 결정

### Executor

- 실제 코드와 문서 수정
- 필요한 검증 수행

### Evaluator

- 통과/실패 판정
- 회귀, 범위 위반, 문서 누락 확인

작은 작업에서는 planner를 생략해도 되지만 executor와 evaluator 관점은 분리해서 유지한다.

## 4. Repository-specific Boundaries

### Editable Areas

- `frontend/`: 지도 UI, 상태 카드, 클라이언트 환경 변수 소비
- `backend/`: API, 설정, 테스트, 리소스 설정
- `docs/`, `.gorchera/`, `examples/`: 하네스 문서와 운영 템플릿

### Approval-only Areas

- 배포 파이프라인
- 외부 API 실계정/실비밀 값
- 워크스페이스 밖 파일 시스템
- 외부 시스템 상태를 바꾸는 네트워크 작업

## 5. Validation Matrix

### Frontend tasks

```bash
cd frontend
npm run lint
npm run build
```

### Backend tasks

```bash
cd backend
./gradlew test
./gradlew build
```

### Cross-stack tasks

위 네 명령을 모두 실행한다.

메모:

- 프론트엔드에는 아직 자동 테스트가 없으므로 `lint + build`를 최소 게이트로 사용한다.
- 변경한 동작에 대한 테스트 부재가 반복되면, 다음 우선 작업은 테스트 보강이어야 한다.

## 6. Default Operating Values

현재 저장소의 기본 시작값은 아래 조합이다.

- provider: `codex`
- pipeline mode: `balanced`
- strictness: `normal`
- ambition: `medium`
- workspace mode: `isolated`

권장 전환:

- 단순 버그 수정: `light + normal + low`
- 사용자 영향 있는 기능: `balanced + normal + medium`
- 고위험 변경 또는 리팩터링: `full + strict + high`

## 7. Invariants For This Repo

- 모바일 우선 레이아웃을 유지한다.
- `NEXT_PUBLIC_VWORLD_API_KEY`가 없어도 지도 베이스는 보여야 한다.
- 백엔드 공개 엔드포인트는 기본적으로 `/api/v1` 아래에 둔다.
- 로컬 프론트엔드와 백엔드의 기본 포트 연동을 깨뜨리지 않는다.
- API 계약을 바꾸면 소비 코드와 문서를 함께 바꾼다.
- 구현되지 않은 실시간 지하철 기능을 완료된 것처럼 문서화하지 않는다.

## 8. Artifacts Expected From Each Job

최소한 아래 정보가 남아야 한다.

- 목표 문서 또는 goal 텍스트
- 실제 수정 파일 목록
- 실행한 검증 명령
- 통과/실패 결과
- blocked reason 또는 failure reason
- 구현 상태가 달라졌다면 `docs/IMPLEMENTATION_STATUS.md` 갱신 여부

## 9. File Map

이 저장소에서 하네스 문서는 아래처럼 나눈다.

- [AGENTS.md](/Users/wooseok/Desktop/jihamap/AGENTS.md): 저장소 전역 로컬 작업 규칙
- [docs/INSTALL.md](/Users/wooseok/Desktop/jihamap/docs/INSTALL.md): 환경 준비와 실행 절차
- [docs/SUPERVISOR_GUIDE.md](/Users/wooseok/Desktop/jihamap/docs/SUPERVISOR_GUIDE.md): goal 작성법과 운영 규칙
- [docs/PRINCIPLES.md](/Users/wooseok/Desktop/jihamap/docs/PRINCIPLES.md): 우회 금지 원칙
- [docs/IMPLEMENTATION_STATUS.md](/Users/wooseok/Desktop/jihamap/docs/IMPLEMENTATION_STATUS.md): 구현 현실 문서
- `.gorchera/prompts/*.md`: executor/evaluator 오버라이드
- `examples/`: role profile과 goal 샘플

## 10. Current Adoption Level

JihaMap은 현재 문서 중심의 `Level 1`과 일부 `Level 2` 사이에 있다.

이미 갖춘 것:

- 프로젝트 규칙 문서
- 검증 명령 고정
- executor/evaluator 오버라이드
- role profile 샘플
- goal 샘플

아직 없는 것:

- stateful job 저장
- 자동 evaluator 파이프라인
- isolated workspace 자동 관리
- 승인/재시도/차단 자동 흐름

## 11. Recommended Next Steps

하네스를 실제 개발 루프로 정착시키려면 다음 순서가 적절하다.

1. 프론트엔드 또는 백엔드 중 한 스택에 스모크 테스트 1개를 추가한다.
2. `examples/goals/` 템플릿을 사용해 파일럿 작업을 한 번 수행한다.
3. 작업 결과를 `docs/IMPLEMENTATION_STATUS.md`와 연결해 운영 습관을 만든다.
4. 필요하면 이후에 MCP 연결과 job 상태 저장을 도입한다.
