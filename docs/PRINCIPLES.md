# PRINCIPLES

JihaMap 하네스에서 절대 우회하지 않는 운영 원칙이다.

## 1. Validation Gates Decide Completion

- 모델 응답이 아니라 검증 명령이 완료를 판정한다.
- 프론트엔드 변경은 `lint + build`, 백엔드 변경은 `test + build`를 통과해야 한다.
- 검증이 누락되면 완료가 아니라 미검증 상태다.

## 2. Scope Boundaries Are Real

- 목표 문서에 없는 디렉터리나 스택은 수정하지 않는다.
- 프론트 작업을 핑계로 백엔드 계약을 바꾸지 않는다.
- 백엔드 작업을 핑계로 프론트 소비 코드를 방치하지 않는다.

## 3. Approval-only Actions Stay Approval-only

- 배포
- 외부 시스템 변경
- 민감정보 접근
- 워크스페이스 외부 쓰기
- 대량 삭제

위 항목은 goal에 있더라도 승인 없이는 실행하지 않는다.

## 4. Contract And Compatibility First

- `/api/v1` 계약 변경은 명시적 범위와 소비 코드 업데이트가 함께 있어야 한다.
- 로컬 개발 포트와 CORS 연동은 합의 없이 깨뜨리지 않는다.
- `VWorld` 키가 없을 때도 개발자가 지도 셸을 띄울 수 있어야 한다.

## 5. Documentation Must Track Reality

- 구현되지 않은 기능을 문서에 구현된 것처럼 적지 않는다.
- 환경 변수, 실행 절차, 검증 명령이 바뀌면 문서를 같은 작업 안에서 고친다.
- 구현 현실은 `docs/IMPLEMENTATION_STATUS.md`에 기준을 둔다.

## 6. Blocked Is Not Failure

- 정보 부족, 정책 차단, 승인 대기 상태는 `blocked`로 다룬다.
- 검증 실패, 범위 위반, 회귀는 `failed`로 다룬다.
- 둘을 섞으면 운영 이력이 왜곡된다.

## 7. Minimal Safe Change Beats Broad Rewrite

- 작은 범위에서 검증 가능한 변경을 우선한다.
- 지금 저장소에 아직 실시간 지하철 핵심 기능이 없으므로, 큰 설계 개편보다 테스트 가능 단위를 먼저 쌓는다.
- 리팩터링은 사용자 가치나 검증 품질을 높일 때만 허용한다.
