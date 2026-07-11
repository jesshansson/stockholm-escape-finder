// Mock events happening in Stockholm. Dates are generated relative to "today"
// so the calendar always shows something to click on.

export type EventCategory =
  | "Musik"
  | "Konst"
  | "Mat & Dryck"
  | "Familj"
  | "Sport"
  | "Marknad"
  | "Scen"
  | "Uteliv";

export type StockholmEvent = {
  id: string;
  title: string;
  category: EventCategory;
  venue: string;
  neighborhood: string;
  time: string; // e.g. "19:00"
  description: string;
  priceLabel: string; // e.g. "Fri entré", "Från 250 kr"
  /** ISO date (YYYY-MM-DD) in Europe/Stockholm */
  date: string;
};

function isoDate(offsetDays: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

const seed: Omit<StockholmEvent, "date">[] = [
  {
    id: "e1",
    title: "Kvällskonsert i Berwaldhallen",
    category: "Musik",
    venue: "Berwaldhallen",
    neighborhood: "Östermalm",
    time: "19:30",
    description:
      "Sveriges Radios Symfoniorkester framför verk av Sibelius och Grieg.",
    priceLabel: "Från 295 kr",
  },
  {
    id: "e2",
    title: "Loppis på Hornstulls Marknad",
    category: "Marknad",
    venue: "Hornstulls Strand",
    neighborhood: "Södermalm",
    time: "11:00",
    description:
      "Vintage, retro och streetfood längs vattnet — en av stans mysigaste marknader.",
    priceLabel: "Fri entré",
  },
  {
    id: "e3",
    title: "Guidad visning: Moderna Museet",
    category: "Konst",
    venue: "Moderna Museet",
    neighborhood: "Skeppsholmen",
    time: "14:00",
    description:
      "Följ med på en 45-minuters tur bland höjdpunkter från 1900-talets samling.",
    priceLabel: "Fri entré",
  },
  {
    id: "e4",
    title: "Familjelördag på Tekniska museet",
    category: "Familj",
    venue: "Tekniska museet",
    neighborhood: "Gärdet",
    time: "10:00",
    description:
      "Experimentverkstad, robotshow och MegaMind — hela dagen fylld med aktiviteter för barnfamiljer.",
    priceLabel: "Vuxen 180 kr / barn fri",
  },
  {
    id: "e5",
    title: "AIK – Djurgården",
    category: "Sport",
    venue: "Strawberry Arena",
    neighborhood: "Solna",
    time: "17:30",
    description:
      "Tvillingderby i Allsvenskan. Kom i god tid — biljetterna brukar ta slut.",
    priceLabel: "Från 320 kr",
  },
  {
    id: "e6",
    title: "Stand-up på Södra Teatern",
    category: "Scen",
    venue: "Södra Teatern",
    neighborhood: "Södermalm",
    time: "20:00",
    description:
      "Öppen scen med några av Stockholms vassaste komiker och överraskningsgäster.",
    priceLabel: "220 kr",
  },
  {
    id: "e7",
    title: "Ölprovning på Nya Carnegiebryggeriet",
    category: "Mat & Dryck",
    venue: "Nya Carnegiebryggeriet",
    neighborhood: "Hammarby Sjöstad",
    time: "18:00",
    description:
      "Provning av fem nybryggda öl med bryggmästaren, inklusive tilltugg.",
    priceLabel: "395 kr",
  },
  {
    id: "e8",
    title: "Klubbkväll på Trädgården",
    category: "Uteliv",
    venue: "Trädgården",
    neighborhood: "Södermalm",
    time: "22:00",
    description:
      "Utomhusklubb under Skanstullsbron med house och disco till gryningen.",
    priceLabel: "180 kr",
  },
  {
    id: "e9",
    title: "Bondens Marknad på Katarina Bangata",
    category: "Marknad",
    venue: "Katarina Bangata",
    neighborhood: "Södermalm",
    time: "10:00",
    description:
      "Färska råvaror direkt från svenska bönder — grönsaker, kött, bröd och ost.",
    priceLabel: "Fri entré",
  },
  {
    id: "e10",
    title: "Efter-jobbet-jazz på Fasching",
    category: "Musik",
    venue: "Fasching",
    neighborhood: "Norrmalm",
    time: "17:00",
    description:
      "Lokala jazzband spelar i två set. Perfekt start på fredagskvällen.",
    priceLabel: "150 kr",
  },
  {
    id: "e11",
    title: "Stockholm Konsthall — vernissage",
    category: "Konst",
    venue: "Kulturhuset",
    neighborhood: "Norrmalm",
    time: "18:00",
    description:
      "Vernissage för en ny utställning med nordisk samtidskonst. Mingel och DJ.",
    priceLabel: "Fri entré",
  },
  {
    id: "e12",
    title: "Yoga i Rålambshovsparken",
    category: "Sport",
    venue: "Rålambshovsparken",
    neighborhood: "Kungsholmen",
    time: "09:00",
    description:
      "Drop-in-yoga i parken vid vattnet. Ta med egen matta.",
    priceLabel: "Fri entré",
  },
  {
    id: "e13",
    title: "Barnteater: Alfons Åberg",
    category: "Familj",
    venue: "Marionetteatern",
    neighborhood: "Djurgården",
    time: "13:00",
    description:
      "Klassikern på scen för barn från 3 år. Cirka 40 minuters föreställning.",
    priceLabel: "120 kr",
  },
  {
    id: "e14",
    title: "Popkonsert: nya svenska namn",
    category: "Musik",
    venue: "Nalen",
    neighborhood: "Norrmalm",
    time: "20:00",
    description:
      "Tre uppåtsträvande svenska popartister på samma kväll — nästa stora grej?",
    priceLabel: "245 kr",
  },
  {
    id: "e15",
    title: "Streetfood-festival på Rålis",
    category: "Mat & Dryck",
    venue: "Rålambshovsparken",
    neighborhood: "Kungsholmen",
    time: "12:00",
    description:
      "Fyrtio food trucks, hantverksöl och livemusik hela eftermiddagen.",
    priceLabel: "Fri entré",
  },
];

// Deterministically spread events across a ±14-day window around today so
// each day has a couple of things happening.
export const events: StockholmEvent[] = seed.map((e, i) => ({
  ...e,
  date: isoDate(((i * 5) % 21) - 10),
}));

// A few extras clustered on today so the default view is never empty.
events.push(
  {
    id: "e-today-1",
    title: "After Work på Mälarpaviljongen",
    category: "Uteliv",
    venue: "Mälarpaviljongen",
    neighborhood: "Kungsholmen",
    time: "17:00",
    description:
      "Flytande bar vid Mälaren — drinkar, snacks och solnedgång över vattnet.",
    priceLabel: "Fri entré",
    date: isoDate(0),
  },
  {
    id: "e-today-2",
    title: "Kvällsvisning: Vasamuseet",
    category: "Konst",
    venue: "Vasamuseet",
    neighborhood: "Djurgården",
    time: "18:30",
    description:
      "Museet håller öppet extra länge med guidade turer runt 1600-talsskeppet.",
    priceLabel: "190 kr",
    date: isoDate(0),
  },
  {
    id: "e-today-3",
    title: "Kvartersloppis i Vasastan",
    category: "Marknad",
    venue: "Vasaparken",
    neighborhood: "Vasastan",
    time: "11:00",
    description:
      "Grannar säljer prylar, kläder och bakverk i parken. Rent guldläge för fyndjägare.",
    priceLabel: "Fri entré",
    date: isoDate(0),
  },
);
