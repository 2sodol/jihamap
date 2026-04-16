Objective:
`NEXT_PUBLIC_VWORLD_API_KEY`가 없는 로컬 개발 환경에서도 MapShell이 안정적으로 렌더링되도록 폴백 경로를 보강한다.

Why:
지도 베이스맵이 외부 키 설정에 과도하게 의존하면 로컬 개발과 회귀 확인이 불안정해진다.

In-scope:
- `frontend/src/lib/map/create-base-layer.ts`
- `frontend/src/components/map-shell.tsx`

Out-of-scope:
- 지하철 노선/역/열차 레이어 구현
- 백엔드 API 변경
- 새 지도 라이브러리 도입

Invariants:
- 모바일 우선 레이아웃 유지
- VWorld 키가 있으면 기존처럼 VWorld 타일 사용
- VWorld 키가 없어도 지도 렌더링 가능

Constraints:
- 새 dependency 추가 금지
- 문구 변경만으로 문제를 덮지 말 것

Done when:
- 키 미설정 상태에서 OSM 폴백으로 지도 렌더링이 유지된다
- 프론트엔드 `lint`와 `build`가 통과한다
- 구현 상태가 달라졌다면 `docs/IMPLEMENTATION_STATUS.md`가 갱신된다
