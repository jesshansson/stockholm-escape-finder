import { useEffect, useRef, useState } from "react";
import type { Destination } from "@/data/types";
import { STOCKHOLM_CENTER, destinationCoordinates } from "@/data/coordinates";

const SCRIPT_ID = "google-maps-js";

type GoogleNS = typeof globalThis & {
  google?: any;
  __initStockholmMap?: () => void;
};

function loadGoogleMaps(): Promise<any> {
  const w = window as GoogleNS;
  if (w.google?.maps) return Promise.resolve(w.google);

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const prevCb = w.__initStockholmMap;
    w.__initStockholmMap = () => {
      prevCb?.();
      resolve((window as GoogleNS).google);
    };
    if (existing) return; // callback above will fire

    const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
    if (!key) {
      reject(new Error("Google Maps browser key saknas"));
      return;
    }
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__initStockholmMap${
      channel ? `&channel=${channel}` : ""
    }`;
    s.onerror = () => reject(new Error("Kunde inte ladda Google Maps"));
    document.head.appendChild(s);
  });
}

type Props = {
  destinations: Destination[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export function DestinationMap({ destinations, activeId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const infoRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Init map once
  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return;
        mapRef.current = new google.maps.Map(containerRef.current, {
          center: STOCKHOLM_CENTER,
          zoom: 9,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            { featureType: "poi.business", stylers: [{ visibility: "off" }] },
            { featureType: "transit", stylers: [{ visibility: "simplified" }] },
          ],
        });
        infoRef.current = new google.maps.InfoWindow();
      })
      .catch((e) => setError(e.message ?? "Kartan kunde inte laddas"));
    return () => {
      cancelled = true;
    };
  }, []);

  // Sync markers when destinations change
  useEffect(() => {
    const google = (window as GoogleNS).google;
    if (!google || !mapRef.current) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((m: any) => m.setMap(null));
    markersRef.current = {};

    const bounds = new google.maps.LatLngBounds();
    destinations.forEach((d) => {
      const pos = destinationCoordinates[d.id];
      if (!pos) return;
      const marker = new google.maps.Marker({
        position: pos,
        map: mapRef.current,
        title: d.name,
      });
      marker.addListener("click", () => {
        infoRef.current?.setContent(
          `<div style="font-family: 'Instrument Sans', system-ui, sans-serif; max-width: 220px;">
            <div style="font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:#4d7c0f; font-weight:600; margin-bottom:4px;">${d.category}</div>
            <div style="font-size:15px; font-weight:600; margin-bottom:4px; color:#27272a;">${d.name}</div>
            <div style="font-size:12px; color:#71717a; margin-bottom:8px;">${d.travelTime}</div>
            <button id="open-dest-${d.id}" style="font-size:12px; font-weight:600; color:#4d7c0f; background:none; border:0; padding:0; cursor:pointer;">Visa detaljer →</button>
          </div>`,
        );
        infoRef.current?.open({ map: mapRef.current, anchor: marker });
        setTimeout(() => {
          const btn = document.getElementById(`open-dest-${d.id}`);
          btn?.addEventListener("click", () => onSelect(d.id));
        }, 0);
      });
      markersRef.current[d.id] = marker;
      bounds.extend(pos);
    });

    if (destinations.length > 1) {
      mapRef.current.fitBounds(bounds, 60);
    } else if (destinations.length === 1) {
      const only = destinationCoordinates[destinations[0].id];
      if (only) {
        mapRef.current.setCenter(only);
        mapRef.current.setZoom(11);
      }
    }
  }, [destinations, onSelect]);

  // Pan to active marker
  useEffect(() => {
    if (!activeId || !mapRef.current) return;
    const g = (window as GoogleNS).google;
    const pos = destinationCoordinates[activeId];
    const marker = markersRef.current[activeId];
    if (!pos || !marker || !g) return;
    mapRef.current.panTo(pos);
    g.maps.event.trigger(marker, "click");
  }, [activeId]);

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-ink-soft text-sm text-ink-muted">
        {error}
      </div>
    );
  }

  return <div ref={containerRef} className="h-full w-full" />;
}
