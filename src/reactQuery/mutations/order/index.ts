import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { placeOrder } from "@/supabase/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePlaceOrder = () => {
  const { clearCart } = useCartContext();
  const queryClient = useQueryClient();

  return useMutation<
    void, // Updated to reflect the `void` return type of `mutationFn`
    Error,
    {
      userId: string | undefined;
      items: {
        productId: number;
        name: string;
        price: number | string;
        quantity: number;
        category: string;
        created_at: string;
        description: string;
        image_url: string[];
      }[];
      totalPrice: number;
    }
  >({
    mutationKey: ["placeOrder"],
    mutationFn: placeOrder,

    // Updated to use the void-returning function
    onSuccess: (_, { userId }) => {
      clearCart();
      queryClient.invalidateQueries({
        queryKey: ["Orders", userId],
        exact: true, // Ensures only the exact query is invalidated
      });
    },
    onError: () => {},
  });
};
