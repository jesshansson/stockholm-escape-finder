import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { destinationsRepo } from "./destinations-repo";

export const destinationsQueryOptions = () =>
  queryOptions({
    queryKey: ["destinations"],
    queryFn: () => destinationsRepo.list(),
  });

export function useDestinations() {
  return useSuspenseQuery(destinationsQueryOptions());
}
