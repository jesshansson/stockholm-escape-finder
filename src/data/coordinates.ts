// Geographic coordinates for destinations. Kept in a separate file so the
// main destinations dataset stays focused on content.

export type LatLng = { lat: number; lng: number };

export const STOCKHOLM_CENTER: LatLng = { lat: 59.3293, lng: 18.0686 };

export const destinationCoordinates: Record<string, LatLng> = {
  vaxholm: { lat: 59.4036, lng: 18.3503 },
  fjaderholmarna: { lat: 59.3208, lng: 18.1681 },
  artipelag: { lat: 59.3186, lng: 18.2922 },
  tyresta: { lat: 59.1683, lng: 18.2842 },
  drottningholm: { lat: 59.3216, lng: 17.8865 },
  hellasgarden: { lat: 59.2900, lng: 18.1631 },
  millesgarden: { lat: 59.3631, lng: 18.1156 },
  sigtuna: { lat: 59.6175, lng: 17.7236 },
  grinda: { lat: 59.3947, lng: 18.5856 },
  sandhamn: { lat: 59.2872, lng: 18.9183 },
  nackareservatet: { lat: 59.2950, lng: 18.1900 },
  "rosendals-tradgard": { lat: 59.3267, lng: 18.1106 },
  mariefred: { lat: 59.2586, lng: 17.2261 },
  uto: { lat: 58.9667, lng: 18.3000 },
  birka: { lat: 59.3361, lng: 17.5419 },
  "tyreso-slott": { lat: 59.2342, lng: 18.2625 },
  bjorno: { lat: 59.2772, lng: 18.5083 },
  saltsjobaden: { lat: 59.2833, lng: 18.3000 },
  skansen: { lat: 59.3258, lng: 18.1036 },
  vasamuseet: { lat: 59.3280, lng: 18.0917 },
  skogskyrkogarden: { lat: 59.2674, lng: 18.1086 },
  waldemarsudde: { lat: 59.3225, lng: 18.1167 },
  "thielska-galleriet": { lat: 59.3349, lng: 18.1255 },
  hagaparken: { lat: 59.3622, lng: 18.0353 },
  "skokloster-slott": { lat: 59.6967, lng: 17.6122 },
  "steninge-slott": { lat: 59.5294, lng: 17.8167 },
  "rosersberg-slott": { lat: 59.5083, lng: 17.9119 },
  moja: { lat: 59.4333, lng: 18.9167 },
  orno: { lat: 59.0500, lng: 18.4000 },
  dalaro: { lat: 59.1397, lng: 18.4067 },
  trosa: { lat: 58.9039, lng: 17.5556 },
  norrtalje: { lat: 59.7581, lng: 18.7011 },
  nynashamn: { lat: 58.9042, lng: 17.9469 },
  gustavsberg: { lat: 59.3303, lng: 18.3886 },
  langholmen: { lat: 59.3208, lng: 18.0292 },
  monteliusvagen: { lat: 59.3186, lng: 18.0683 },
  bogesund: { lat: 59.4014, lng: 18.3306 },
  skinnarviksberget: { lat: 59.3169, lng: 18.0394 },
};
