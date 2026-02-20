import { getProfileInfo, SingleProfileData } from "../../../supabase/account";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export const useGetProfileInfo = <T>(
  {
    queryOptions,
  }: {
    queryOptions?: Omit<
      UseQueryOptions<SingleProfileData, Error, T>,
      "queryKey"
    >;
  } = {},
  id: string | number | undefined,
): UseQueryResult<T, Error> => {
  return useQuery<SingleProfileData, Error, T>({
    queryKey: ["profile", id],
    queryFn: () => {
      if (!id) {
        throw new Error("User ID is undefined");
      }
      return getProfileInfo(id);
    },
    enabled: !!id,
    ...queryOptions,
  });
};
