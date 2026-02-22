import { getDistinctCategories } from "@/supabase/products/categories";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDistinctCategories = (): UseQueryResult<string[], Error> => {
  return useQuery<string[], Error>({
    queryKey: ["distinctCategories"],
    queryFn: getDistinctCategories,
    staleTime: 5 * 60 * 1000,
  });
};
