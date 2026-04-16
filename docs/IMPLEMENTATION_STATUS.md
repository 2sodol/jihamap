# IMPLEMENTATION_STATUS

기준일: `2026-04-17`

이 문서는 JihaMap 저장소에 실제로 구현된 것과 아직 아닌 것을 구분하기 위한 상태 문서다. 제품 비전과 운영 문서를 그대로 믿지 않도록, 구현 현실만 따로 분리해 적는다.

## 1. Product Status

### Implemented

- 프론트엔드 메인 페이지가 모바일 우선 레이아웃으로 렌더링된다.
- `OpenLayers` 기반 지도 셸이 존재한다.
- `NEXT_PUBLIC_VWORLD_API_KEY`가 있으면 `VWorld` 타일, 없으면 `OSM` 베이스맵을 사용한다.
- 프론트엔드 상태 카드가 `GET /api/v1/system/status`를 조회한다.
- 백엔드 `SystemController`가 서비스 이름, 버전, 생성 시각, capability 목록을 반환한다.
- 백엔드 CORS가 로컬 프론트엔드 오리진을 허용한다.

### Partial

- 지도 UI에 "노선 레이어", "역 마커", "실시간 열차 마커" 계획이 표시되지만 실제 레이어는 아직 구현되지 않았다.
- 백엔드 capability 문자열은 준비 상태 안내 수준이며, 실제 실시간 지하철 수집/보정 파이프라인과 연결되어 있지 않다.
- 테스트 체계는 존재하지만 범위가 매우 얕다.

### Not Implemented

- 서울시 실시간 열차 위치 데이터 수집
- `recptnDt` 기반 위치 보정 로직
- 역/노선 `GeoJSON` 로딩과 렌더링
- 열차 선택 상세 UI와 다음 역 ETA 계산
- 사용자 현재 위치 기반 도보 ETA
- 외부 API 키를 이용한 실제 통합 플로우

## 2. Verification Status

### Implemented

- 프론트엔드 `lint` 명령 존재
- 프론트엔드 `build` 명령 존재
- 백엔드 `test` 명령 존재
- 백엔드 `build` 명령 존재

### Partial

- 백엔드 테스트는 현재 `contextLoads()` 수준이다.
- 프론트엔드는 별도 자동 테스트가 없다.

### Not Implemented

- 프론트엔드 통합 테스트
- 지도 렌더링 회귀 테스트
- 프론트/백엔드 계약 테스트
- 외부 API 스모크 테스트

## 3. Harness Status

### Implemented

- 루트 `AGENTS.md`
- `docs/INSTALL.md`
- `docs/SUPERVISOR_GUIDE.md`
- `docs/PRINCIPLES.md`
- `docs/HARNESS_ENGINEERING.md`
- `examples/role-profiles.sample.json`
- `examples/goals/*.md`
- executor/evaluator prompt override 파일

### Partial

- `.mcp.json`은 구조만 잡혀 있고 실제 MCP 서버 연결은 비어 있다.
- 하네스 운영 규칙은 문서화됐지만 자동 상태 저장이나 job orchestrator는 없다.

### Not Implemented

- stateful job 저장
- blocked / retry / steer 자동 워크플로우
- isolated workspace 자동 생성
- approval policy를 강제하는 실행기
- evaluator 자동 판정 파이프라인

## 4. Update Rule

다음 항목 중 하나가 실제로 구현되면 이 문서를 먼저 갱신한다.

- 실시간 지하철 도메인 기능 추가
- 검증 명령 변경
- 환경 변수 추가
- 하네스 자동화 기능 도입
