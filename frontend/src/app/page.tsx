import { MapShell } from "@/components/map-shell";
import { SystemStatusCard } from "@/components/system-status-card";

export default function Home() {
  const highlights = [
    "VWorld 기반 배경지도와 지하철 노선 레이어",
    "recptnDt 기준 열차 위치 보정 로직",
    "열차 클릭 시 다음 역 ETA와 상세 상태 표출",
  ];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-4 px-4 py-5 sm:max-w-lg">
      <section className="glass-panel rounded-[30px] px-5 py-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--ink-soft)]">
              JihaMap MVP
            </p>
            <h1 className="mt-2 text-[2rem] font-semibold leading-tight">
              지하철 흐름을
              <br />
              지도 위에서 바로 읽는 앱
            </h1>
          </div>
          <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
            Mobile First
          </div>
        </div>
        <p className="text-sm leading-6 text-[var(--ink-soft)]">
          서울권 지하철의 실시간 열차 위치를 지도에 올리고, 데이터 지연을
          보정해 더 자연스러운 이동 흐름을 보여주는 모바일 웹 시작점이다.
        </p>
        <ul className="mt-5 flex flex-col gap-2 text-sm text-[var(--foreground)]">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-2xl border border-[var(--border)] bg-white/65 px-3 py-3"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <MapShell />

      <SystemStatusCard />
    </main>
  );
}
