Objective:
백엔드 시스템 상태 응답 생성 로직을 서비스 계층으로 분리하고 테스트를 보강한다.

Why:
현재 컨트롤러가 상태 문자열과 응답 조립을 직접 담당해 이후 실시간 지하철 기능이 붙을 때 테스트와 확장이 불편하다.

In-scope:
- `backend/src/main/java/**`
- `backend/src/test/java/**`
- 필요 시 `docs/IMPLEMENTATION_STATUS.md`

Out-of-scope:
- 새 엔드포인트 추가
- 프론트엔드 UI 변경
- 배포 설정 변경

Invariants:
- `GET /api/v1/system/status` 응답 구조 유지
- 로컬 CORS와 기본 포트 연동 유지
- Java 21 / Gradle wrapper 기준 유지

Constraints:
- 새 외부 dependency 추가 금지
- 목표 범위를 넘어 도메인 설계를 넓히지 말 것

Done when:
- 상태 응답 조립이 테스트 가능한 구조로 분리된다
- 관련 테스트가 추가되거나 기존 테스트가 보강된다
- 백엔드 `test`와 `build`가 통과한다
