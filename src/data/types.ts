// Domain model for destinations. Kept independent from any data source
// (local array, Supabase, CMS, JSON file, external Places API) so the rest
// of the app can stay unchanged when the source is swapped.

export type Category =
  | "Natur"
  | "Kultur"
  | "Skärgårdsö"
  | "Museum"
  | "Slott / historisk plats"
  | "Utsiktsplats"
  | "Vandringsled"
  | "Badplats"
  | "Café"
  | "Restaurang"
  | "Småstad / by";

export type DistanceRange = "0-30" | "30-60" | "60-120" | "120+";

export type IndoorOutdoor = "Inomhus" | "Utomhus" | "Både och";

export type MoodTag =
  | "Lugn & vacker"
  | "Mysig"
  | "Romantisk"
  | "Barnvänlig"
  | "Aktiv"
  | "Regnig dag"
  | "Solig dag"
  | "Budgetvänlig"
  | "Lite lyxigt"
  | "Fotovänlig";

export type PracticalTag =
  | "Inomhus"
  | "Utomhus"
  | "Lätt med kollektivtrafik"
  | "Mat finns"
  | "Café i närheten"
  | "Hundvänligt"
  | "Barnvänligt"
  | "Bra på vintern"
  | "Bra på sommaren";

export type SeasonTag = "Vår" | "Sommar" | "Höst" | "Vinter" | "Året runt";

export type Duration = "1-2 timmar" | "Halvdag" | "Heldag";

export type CostLevel = 1 | 2 | 3;

export type Destination = {
  id: string;
  name: string;
  category: Category;
  description: string;

  // Travel
  travelTime: string; // human readable, e.g. "ca 25 min med bil"
  travelMinutes: number; // canonical, used for sorting & filtering
  distanceRange: DistanceRange;

  // Tags
  indoorOutdoor: IndoorOutdoor;
  moodTags: MoodTag[];
  practicalTags: PracticalTag[];
  seasonTags: SeasonTag[];

  // Quick facts
  foodAvailable: boolean;
  cafeAvailable: boolean;
  publicTransport: boolean;
  island: boolean;
  costLevel: CostLevel;
  duration: Duration;

  // Detail view
  bestFor: string[];
  howToGetThere: string;
  goodToKnow: string;
  whyGo: string;
  whatToDo: string;
  eatAndCoffee: string;
  bestSeason: string;

  // Media (URL string — works equally for local imports and remote sources)
  image: string;

  // Optional attribution for the image. Required when using CC-licensed
  // photos from e.g. Wikimedia Commons; omit for own/AI-generated art.
  imageCredit?: {
    author: string;
    source:
      | "Wikimedia Commons"
      | "Unsplash"
      | "Pexels"
      | "Flickr"
      | "Egen";
    sourceUrl: string;
    license: string;
    licenseUrl?: string;
  };
};
