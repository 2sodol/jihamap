"use client";

import { useQuery } from "@tanstack/react-query";

type SystemStatus = {
  serviceName: string;
  version: string;
  generatedAt: string;
  capabilities: string[];
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:43211";

async function fetchSystemStatus(): Promise<SystemStatus> {
  const response = await fetch(`${API_BASE_URL}/api/v1/system/status`);

  if (!response.ok) {
    throw new Error("Backend status request failed");
  }

  return response.json();
}

export function SystemStatusCard() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["system-status"],
    queryFn: fetchSystemStatus,
    staleTime: 60_000,
  });

  return (
    <section className="glass-panel rounded-[30px] px-5 py-5">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]">
        Backend Probe
      </p>
      <div className="mt-3 space-y-3">
        <div className="rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-4">
          <p className="text-xs text-[var(--ink-soft)]">API Base URL</p>
          <p className="mt-1 font-mono text-sm">{API_BASE_URL}</p>
        </div>

        {isLoading ? (
          <div className="rounded-2xl bg-[#112127] px-4 py-4 text-sm text-white">
            백엔드 상태를 확인하는 중이다.
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
            `GET /api/v1/system/status`에 아직 연결되지 않았다. Spring Boot
            서버를 `localhost:43211` 또는 `NEXT_PUBLIC_API_BASE_URL`에 맞춰
            실행하면 이 카드가 실시간 상태로 바뀐다.
          </div>
        ) : null}

        {data ? (
          <div className="space-y-3">
            <div className="rounded-2xl bg-[#112127] px-4 py-4 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Connected
              </p>
              <p className="mt-1 text-lg font-semibold">{data.serviceName}</p>
              <p className="mt-1 text-sm text-white/72">
                version {data.version} · updated {data.generatedAt}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {data.capabilities.map((capability) => (
                <div
                  key={capability}
                  className="rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm"
                >
                  {capability}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
