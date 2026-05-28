// Repository pattern — single point of swap for the data source.
//
// To switch the app to a different backend later, replace `destinationsRepo`
// with a new implementation of `DestinationsRepository`. No UI changes required.
//
// Future implementations (not built in v1):
//   - supabaseRepository: read from a `destinations` table via Supabase
//   - cmsRepository: map a CMS (Sanity/Contentful) response → Destination
//   - jsonRepository: fetch a JSON file from /public or a CDN
//   - placesApiRepository: wrap Google/Foursquare Places + cache

import { localDestinations } from "@/data/destinations";
import type { Destination } from "@/data/types";

export interface DestinationsRepository {
  list(): Promise<Destination[]>;
  getById(id: string): Promise<Destination | null>;
}

export const localRepository: DestinationsRepository = {
  async list() {
    return localDestinations;
  },
  async getById(id) {
    return localDestinations.find((d) => d.id === id) ?? null;
  },
};

// Active repository. Swap this single line to change data source.
export const destinationsRepo: DestinationsRepository = localRepository;
