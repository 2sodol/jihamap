Objective:
지도 위에 지하철 역 marker placeholder 레이어를 추가해 MVP 시각화 흐름의 다음 단계를 만든다.

Why:
현재는 베이스맵만 있고 지하철 도메인 요소가 하나도 없어, 제품 방향을 실제 화면에서 검증하기 어렵다.

In-scope:
- `frontend/src/components/map-shell.tsx`
- `frontend/src/lib/map/**`
- 필요 시 `docs/IMPLEMENTATION_STATUS.md`

Out-of-scope:
- 실시간 열차 위치 계산
- 백엔드 데이터 수집 API
- 외부 데이터 저장소 설계

Invariants:
- 모바일 우선 UI 유지
- OSM/VWorld 베이스맵 전환 경로 유지
- 상태 카드 연동은 깨뜨리지 않기

Constraints:
- 새 프레임워크나 새 지도 엔진 추가 금지
- 범위 밖 리팩터링 금지

Done when:
- 역 marker placeholder 레이어가 화면에 표시된다
- 프론트엔드 `lint`와 `build`가 통과한다
- 구현 현실이 달라지면 상태 문서가 업데이트된다
