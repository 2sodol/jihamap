# SUPERVISOR_GUIDE

이 문서는 JihaMap에서 supervisor 또는 작업 지시자가 goal을 작성할 때 쓰는 운영 기준이다. 핵심은 "요청"이 아니라 "검증 가능한 작업 계약"을 쓰는 것이다.

## 1. Default Operating Profile

처음 적용하는 기본값은 아래를 사용한다.

- provider: `codex`
- pipeline mode: `balanced`
- strictness: `normal`
- ambition: `medium`
- workspace mode: `isolated`

다음 상황에서는 조정한다.

- 작은 버그 수정: `light + normal + low`
- 사용자 영향이 큰 기능: `balanced + normal + medium`
- 리팩터링이나 회귀 위험이 큰 작업: `full + strict + high`

## 2. Goal Template

모든 작업은 아래 형식으로 시작한다.

```text
Objective:
Why:
In-scope:
Out-of-scope:
Invariants:
Constraints:
Done when:
```

## 3. JihaMap Scope Writing Rules

### Frontend-only 작업

보통 아래 범위를 적는다.

- `frontend/src/app/**`
- `frontend/src/components/**`
- `frontend/src/lib/**`

함께 적으면 좋은 invariant:

- 모바일 우선 레이아웃 유지
- `OpenLayers`와 기존 지도 셸 구조 유지
- `NEXT_PUBLIC_VWORLD_API_KEY` 미설정 시 폴백 유지

검증:

- `cd frontend && npm run lint`
- `cd frontend && npm run build`

### Backend-only 작업

보통 아래 범위를 적는다.

- `backend/src/main/**`
- `backend/src/test/**`
- `backend/src/main/resources/**`

함께 적으면 좋은 invariant:

- `/api/v1` 응답 계약 유지
- 로컬 CORS 연동 유지
- Java 21, Gradle wrapper 기준 유지

검증:

- `cd backend && ./gradlew test`
- `cd backend && ./gradlew build`

### Cross-stack 작업

범위를 명시적으로 양쪽 다 적는다.

- 프론트 소비 코드
- 백엔드 API 또는 응답 DTO
- 관련 문서

추가 invariant:

- 프론트와 백엔드 계약을 분리된 상태로 남기지 않기
- 포트 `43210`, `43211`을 임의로 바꾸지 않기

검증:

- 프론트엔드 두 명령
- 백엔드 두 명령

## 4. Done Criteria Writing

`Done when`은 결과가 아니라 판정 기준이어야 한다.

좋은 예:

- `/api/v1/system/status`가 변경된 응답 계약에 맞춰 프론트 카드에서 정상 표시된다.
- 관련 `lint/build/test` 명령이 모두 통과한다.
- 환경 변수나 운영 절차가 바뀌면 문서가 같이 갱신된다.

나쁜 예:

- 상태 카드가 더 좋아 보인다.
- 지도 기능이 자연스럽다.
- 코드를 정리했다.

## 5. Blocked / Failed / Retry / Steer

### Blocked

정책이나 정보 부족 때문에 더 진행하면 안 되는 상태다.

예:

- 외부 API 키가 없어서 실제 연동 검증을 할 수 없음
- 어떤 응답 계약이 정답인지 제품 결정이 없음

### Failed

시도는 했지만 검증에서 떨어진 상태다.

예:

- `npm run build` 실패
- `./gradlew test` 실패
- 범위를 넘는 변경이 들어감

### Retry

같은 목표를 더 나은 입력이나 수정된 가정으로 재시도한다.

예:

- 실패 원인이 누락된 fixture나 테스트 보강 부족일 때

### Steer

중간에 목표 방향을 조정한다.

예:

- 실시간 열차 위치 전체 구현 대신 먼저 역 마커 레이어만 붙이기로 범위를 축소

## 6. Approval Guidelines

아래는 supervisor가 명시적으로 승인할 때만 푼다.

- 배포
- 외부 시스템 변경
- 비밀 값 접근
- 대규모 삭제
- 워크스페이스 외부 쓰기

## 7. Good Pilot Tasks For This Repo

- 프론트 지도에 역 마커 레이어 1개 추가
- 상태 카드 에러 메시지 개선
- 백엔드 입력 검증 추가와 테스트 보강
- `VWorld` 키 미설정 상태 회귀 방지 테스트 또는 스모크 체크 추가

## 8. Sample Goal

```text
Objective:
MapShell에 지하철 역 마커용 placeholder 레이어를 추가한다.

Why:
현재는 베이스맵만 있고 노선/역 시각화가 전혀 없어 MVP 흐름을 검증하기 어렵다.

In-scope:
- frontend/src/components/map-shell.tsx
- frontend/src/lib/map/**
- 관련 문서가 필요하면 docs/IMPLEMENTATION_STATUS.md

Out-of-scope:
- 실시간 열차 위치 계산
- 백엔드 API 추가
- 외부 데이터 수집 배치

Invariants:
- 모바일 우선 레이아웃 유지
- VWorld 키가 없어도 지도는 렌더링돼야 한다
- 기존 상태 카드 동작을 깨뜨리지 않는다

Constraints:
- 새 지도 라이브러리 추가 금지
- 범위 밖 리팩터링 금지

Done when:
- 역 마커 placeholder가 지도에 렌더링된다
- npm run lint와 npm run build가 통과한다
- 문서상 구현 상태가 필요하면 함께 갱신된다
```
