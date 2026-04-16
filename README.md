# JihaMap

서울권 지하철 운행 정보를 모바일 웹 지도 위에 시각화하는 프로젝트다. 현재 저장소는 `Next.js` 프론트엔드와 `Spring Boot` 백엔드로 분리되어 있으며, MVP의 출발점으로 지도 베이스 화면과 상태 확인 API를 먼저 갖춘 상태다.

## Repository Layout

- `frontend/`: Next.js 16, React 19, OpenLayers 기반 모바일 웹 클라이언트
- `backend/`: Java 21, Spring Boot 3 기반 API 서버
- `docs/`: 하네스 엔지니어링 운영 문서와 설치/상태 문서
- `.gorchera/prompts/`: executor/evaluator 프로젝트 오버라이드
- `examples/`: role profile 샘플과 goal 템플릿

## Quick Start

### Prerequisites

- `Node.js 20+`
- `npm 10+`
- `Java 21`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

기본 개발 주소는 `http://localhost:43210`이다.

선택 환경 변수:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:43211
NEXT_PUBLIC_VWORLD_API_KEY=your_vworld_key
```

`NEXT_PUBLIC_VWORLD_API_KEY`가 없으면 개발용 `OSM` 베이스맵으로 폴백한다.

### Backend

```bash
cd backend
./gradlew bootRun
```

기본 개발 주소는 `http://localhost:43211`이다. 현재 추적 중인 설정 기준으로 백엔드 필수 비밀 값은 없다.

## Verification

하네스 기준 검증 명령은 스택별로 고정한다.

- 프론트엔드 변경: `cd frontend && npm run lint` 후 `cd frontend && npm run build`
- 백엔드 변경: `cd backend && ./gradlew test` 후 `cd backend && ./gradlew build`
- 프론트/백엔드 동시 변경: 위 네 명령 모두 실행

현재 프론트엔드 자동 테스트는 없으므로 `lint + build`가 최소 게이트다. 변경 동작이 복잡해지면 테스트 추가를 우선 과제로 잡는 것이 원칙이다.

## Harness Engineering

이 저장소는 [HARNESS_ENGINEERING_OTHER_PROJECTS.md](/Users/wooseok/Desktop/jihamap/HARNESS_ENGINEERING_OTHER_PROJECTS.md)를 기준으로, JihaMap 전용 하네스 문서 구조를 루트에 적용했다. 기본 운영 시작값은 다음과 같다.

- provider: `codex`
- pipeline mode: `balanced`
- strictness: `normal`
- ambition: `medium`
- workspace mode: `isolated`

문서 인덱스:

- [AGENTS.md](/Users/wooseok/Desktop/jihamap/AGENTS.md)
- [docs/HARNESS_ENGINEERING.md](/Users/wooseok/Desktop/jihamap/docs/HARNESS_ENGINEERING.md)
- [docs/INSTALL.md](/Users/wooseok/Desktop/jihamap/docs/INSTALL.md)
- [docs/SUPERVISOR_GUIDE.md](/Users/wooseok/Desktop/jihamap/docs/SUPERVISOR_GUIDE.md)
- [docs/PRINCIPLES.md](/Users/wooseok/Desktop/jihamap/docs/PRINCIPLES.md)
- [docs/IMPLEMENTATION_STATUS.md](/Users/wooseok/Desktop/jihamap/docs/IMPLEMENTATION_STATUS.md)
- [examples/role-profiles.sample.json](/Users/wooseok/Desktop/jihamap/examples/role-profiles.sample.json)
- [examples/goals/bugfix.md](/Users/wooseok/Desktop/jihamap/examples/goals/bugfix.md)
- [examples/goals/feature.md](/Users/wooseok/Desktop/jihamap/examples/goals/feature.md)
- [examples/goals/refactor.md](/Users/wooseok/Desktop/jihamap/examples/goals/refactor.md)

## Product Direction

JihaMap MVP의 핵심 목표는 다음 세 가지다.

- `VWorld` 기반 지도 위에 지하철 노선과 역, 열차 상태를 올린다.
- `recptnDt`를 이용해 데이터 지연을 보정한 추정 열차 위치를 제공한다.
- 사용자가 열차를 눌렀을 때 다음 역 ETA와 기본 상태를 직관적으로 읽을 수 있게 한다.

현재 실제 구현 범위는 [docs/IMPLEMENTATION_STATUS.md](/Users/wooseok/Desktop/jihamap/docs/IMPLEMENTATION_STATUS.md)에 분리해 기록한다. 문서와 구현 현실을 혼동하지 않기 위해, 저장소 소개와 구현 상태는 의도적으로 나눠 관리한다.
