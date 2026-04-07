"use client";

import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls } from "ol/control/defaults";
import { fromLonLat } from "ol/proj";
import { createBaseLayer } from "@/lib/map/create-base-layer";

const SEOUL_CENTER = [126.9784, 37.5665] as const;
const VWORLD_API_KEY = process.env.NEXT_PUBLIC_VWORLD_API_KEY;

export function MapShell() {
  const mapElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapElementRef.current) {
      return undefined;
    }

    const baseLayer = createBaseLayer(VWORLD_API_KEY);

    const map = new Map({
      target: mapElementRef.current,
      layers: [baseLayer.layer],
      controls: defaultControls({ attribution: false, rotate: false }),
      view: new View({
        center: fromLonLat([...SEOUL_CENTER]),
        zoom: 11.6,
        minZoom: 9,
        maxZoom: 19,
      }),
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <section className="glass-panel overflow-hidden rounded-[30px]">
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]">
            Live Map
          </p>
          <h2 className="mt-1 text-lg font-semibold">실시간 노선 지도 베이스</h2>
        </div>
        <div className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
          Seoul
        </div>
      </div>

      <div className="relative">
        <div ref={mapElementRef} className="h-[56vh] min-h-[420px] w-full" />

        <div className="pointer-events-none absolute left-4 top-4 max-w-[15rem] rounded-2xl bg-[var(--surface-strong)] px-3 py-3 text-xs leading-5 text-[var(--ink-soft)] shadow-lg">
          현재는 기본 지도와 MVP 안내 패널만 연결한 상태다. 다음 단계에서
          지하철 노선 GeoJSON, 역 마커, 열차 위치 레이어를 순차적으로 붙이면
          된다.
        </div>

        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-col gap-2">
          <div className="rounded-2xl bg-[#112127] px-4 py-3 text-sm text-white shadow-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
              Layer Plan
            </p>
            <p className="mt-1 font-medium">
              VWorld base, route line, station marker, realtime train marker
            </p>
          </div>
          {!VWORLD_API_KEY ? (
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-xs leading-5 text-[var(--ink-soft)]">
              `NEXT_PUBLIC_VWORLD_API_KEY`가 없어서 개발용 OSM 베이스맵으로
              표시 중이다. 키를 넣으면 VWorld 타일로 전환된다.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
