# INSTALL

JihaMap 로컬 개발 환경과 하네스 검증 환경을 맞추기 위한 설치 문서다.

## 1. Prerequisites

- `Node.js 20+`
- `npm 10+`
- `Java 21`
- macOS, Linux, 또는 `WSL` 환경

## 2. Repository Structure

- `frontend/`: 사용자 지도 UI와 상태 카드
- `backend/`: 상태 API와 추후 실시간 지하철 도메인 로직
- `docs/`: 하네스 운영 문서

## 3. Frontend Setup

```bash
cd frontend
npm install
```

선택 환경 변수:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:43211
NEXT_PUBLIC_VWORLD_API_KEY=your_vworld_key
```

실행:

```bash
cd frontend
npm run dev
```

개발 서버 기본 주소는 `http://localhost:43210`이다.

메모:

- `NEXT_PUBLIC_VWORLD_API_KEY`가 없으면 `OSM` 베이스맵으로 표시한다.
- 프론트엔드는 `React Query`를 사용해 백엔드 상태 카드를 조회한다.

## 4. Backend Setup

실행:

```bash
cd backend
./gradlew bootRun
```

API 기본 주소는 `http://localhost:43211`이다.

현재 추적 중인 설정 기준:

- 필수 환경 변수 없음
- 로컬 CORS 허용 오리진: `http://localhost:43210`, `http://127.0.0.1:43210`
- 상태 확인 엔드포인트: `GET /api/v1/system/status`

Windows에서는 `gradlew.bat`를 사용한다.

## 5. Local Verification Commands

하네스 완료 판정에 쓰는 명령은 아래로 고정한다.

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

### Backend

```bash
cd backend
./gradlew test
./gradlew build
```

### Cross-stack

프론트엔드와 백엔드를 함께 바꾸면 네 명령을 모두 실행한다.

## 6. Recommended Local Workflow

1. `backend`를 먼저 실행한다.
2. `frontend`를 실행한다.
3. 브라우저에서 `http://localhost:43210`을 연다.
4. 지도 베이스가 열리는지 확인한다.
5. 상태 카드가 `GET /api/v1/system/status`에 연결되는지 확인한다.

## 7. Troubleshooting

- 프론트엔드 상태 카드가 실패하면 `NEXT_PUBLIC_API_BASE_URL`과 백엔드 포트 `43211`을 먼저 확인한다.
- 브라우저에서 CORS 오류가 보이면 백엔드 `jihamap.cors.allowed-origins` 값과 실제 접속 주소를 비교한다.
- `VWorld` 키가 없을 때 지도 자체가 안 뜨면 폴백 경로가 깨진 것이므로 회귀로 취급한다.
- Java 버전이 맞지 않으면 Gradle toolchain이 실패할 수 있으므로 `Java 21`을 확인한다.

## 8. Future Environment Work

아직 문서화되지 않은 외부 API 키 또는 데이터 수집 배치는 구현되지 않은 상태로 간주한다. 앞으로 서울시 실시간 데이터, `TMAP`, `VWorld` 연동이 실제 도입되면 이 문서에 환경 변수와 실행 절차를 먼저 추가해야 한다.
