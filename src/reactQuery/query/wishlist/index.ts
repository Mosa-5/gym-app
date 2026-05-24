import { getWishlistedProducts, WishlistItem } from "@/supabase/wishlist";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export const useGetWishlistedProducts = <T>(
  {
    queryOptions,
  }: {
    queryOptions?: Omit<UseQueryOptions<WishlistItem[], Error, T>, "queryKey">;
  } = {},
  id: string | undefined,
): UseQueryResult<T, Error> => {
  return useQuery<WishlistItem[], Error, T>({
    queryKey: ["wishlist", id],
    queryFn: () => {
      return getWishlistedProducts(id);
    },
    staleTime: 60 * 1000,
    enabled: !!id,
    ...queryOptions,
  });
};
