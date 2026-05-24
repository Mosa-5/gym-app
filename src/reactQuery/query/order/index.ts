import { getUserOrders, getUserSingleOrder, Order } from "@/supabase/order";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export const useGetUserOrders = <T>(
  {
    queryOptions,
  }: {
    queryOptions?: Omit<UseQueryOptions<Order[], Error, T>, "queryKey">;
  } = {},
  id: string | undefined,
): UseQueryResult<T, Error> => {
  return useQuery<Order[], Error, T>({
    queryKey: ["orders", id],
    queryFn: () => {
      return getUserOrders(id);
    },
    staleTime: 60 * 1000, // Cache for 6 min
    ...queryOptions,
  });
};

export const useGetUserSingleOrder = <T>(
  {
    queryOptions,
  }: {
    queryOptions?: Omit<UseQueryOptions<Order, Error, T>, "queryKey">;
  } = {},
  id: string | undefined,
): UseQueryResult<T, Error> => {
  return useQuery<Order, Error, T>({
    queryKey: ["singleOrder", id],
    queryFn: () => {
      return getUserSingleOrder(id);
    },
    staleTime: 60 * 1000, // Cache for 6 min
    ...queryOptions,
  });
};

// export const fetchUserOrders = async (userId: string) => {
//         const { data, error } = await supabase
//           .from('orders')
//           .select('*')
//           .eq('user_id', userId)
//           .order('created_at', { ascending: false });

//         if (error) {
//           console.error('Error fetching orders:', error.message);
//           return null;
//         }

//         return data;
//       };
