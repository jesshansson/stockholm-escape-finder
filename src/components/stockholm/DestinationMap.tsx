import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

import type { Destination } from "@/data/types";
import { STOCKHOLM_CENTER, destinationCoordinates } from "@/data/coordinates";

// Leaflet + OpenStreetMap tiles — no API key, no vendor-specific runtime
// environment variables. Leaflet itself is imported dynamically so it never
// runs during SSR (it touches `window` at module scope).

type LeafletModule = typeof import("leaflet");
type LeafletMap = import("leaflet").Map;
type LeafletMarker = import("leaflet").Marker;

type Props = {
  destinations: Destination[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

/** Small moss-coloured pin drawn in CSS — avoids bundling Leaflet's image assets. */
const PIN_HTML = `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#4d7c0f;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35)"></span>`;

export function DestinationMap({ destinations, activeId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<LeafletModule | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, LeafletMarker>>({});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Init map once, client-side only.
  useEffect(() => {
    let cancelled = false;

    import("leaflet")
      .then((mod) => {
        const L = (mod.default ?? mod) as LeafletModule;
        if (cancelled || !containerRef.current || mapRef.current) return;

        leafletRef.current = L;
        const map = L.map(containerRef.current, {
          center: [STOCKHOLM_CENTER.lat, STOCKHOLM_CENTER.lng],
          zoom: 9,
          scrollWheelZoom: true,
        });

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>-bidragsgivare',
        }).addTo(map);

        mapRef.current = map;
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setError("Kartan kunde inte laddas just nu.");
      });

    return () => {
      cancelled = true;
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};
      mapRef.current?.remove();
      mapRef.current = null;
      leafletRef.current = null;
    };
  }, []);

  // Sync markers + bounds whenever the destination list changes.
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;

    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const icon = L.divIcon({
      html: PIN_HTML,
      className: "",
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -10],
    });

    const points: Array<[number, number]> = [];

    destinations.forEach((d) => {
      const pos = destinationCoordinates[d.id];
      if (!pos) return;

      const marker = L.marker([pos.lat, pos.lng], { icon, title: d.name }).addTo(map);

      const popup = document.createElement("div");
      popup.style.maxWidth = "220px";
      popup.innerHTML = `
        <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#4d7c0f;font-weight:600;margin-bottom:4px;"></div>
        <div style="font-size:15px;font-weight:600;margin-bottom:4px;color:#27272a;"></div>
        <div style="font-size:12px;color:#71717a;margin-bottom:8px;"></div>`;
      const [catEl, nameEl, timeEl] = Array.from(popup.children) as HTMLElement[];
      catEl!.textContent = d.category;
      nameEl!.textContent = d.name;
      timeEl!.textContent = d.travelTime;

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Visa detaljer →";
      button.style.cssText =
        "font-size:12px;font-weight:600;color:#4d7c0f;background:none;border:0;padding:0;cursor:pointer;text-decoration:underline;";
      button.addEventListener("click", () => onSelectRef.current(d.id));
      popup.appendChild(button);

      marker.bindPopup(popup);
      markersRef.current[d.id] = marker;
      points.push([pos.lat, pos.lng]);
    });

    if (points.length > 1) {
      map.fitBounds(points, { padding: [60, 60] });
    } else if (points.length === 1) {
      map.setView(points[0]!, 11);
    }
  }, [destinations, ready]);

  // Pan to and open the selected destination's marker.
  useEffect(() => {
    const map = mapRef.current;
    if (!activeId || !map) return;
    const pos = destinationCoordinates[activeId];
    const marker = markersRef.current[activeId];
    if (!pos || !marker) return;
    map.panTo([pos.lat, pos.lng]);
    marker.openPopup();
  }, [activeId, ready]);

  if (error) {
    return (
      <div
        role="alert"
        className="h-full w-full flex items-center justify-center p-6 text-center bg-ink-soft text-sm text-ink-muted"
      >
        {error} Du kan fortfarande bläddra bland alla utflyktsmål på startsidan.
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" aria-label="Karta över utflyktsmål" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface text-sm text-ink-muted">
          Laddar karta…
        </div>
      )}
    </div>
  );
}
