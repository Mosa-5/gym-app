import { supabase } from "../supabase";

export const placeOrder = async ({
  userId,
  items,
  totalPrice,
}: {
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
}): Promise<void> => {
  if (!userId || !items || items.length === 0 || !totalPrice) {
    throw new Error(
      "User ID, items, and total price are required to place an order.",
    );
  }

  const { error } = await supabase.from("orders").insert([
    {
      user_id: userId,
      item: items, // JSON array of cart items
      total_price: totalPrice,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
};

export const getUserOrders = async (
  userId: string | undefined,
): Promise<Order[]> => {
  if (userId === undefined) {
    throw new Error("User ID is required to fetch orders.");
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as Order[]) || [];
};

export const getUserSingleOrder = async (
  orderId: string | undefined,
): Promise<Order> => {
  if (orderId === undefined) {
    throw new Error("Order ID is required to fetch order details.");
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", Number(orderId))
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Order;
};

export type Order = {
  created_at: string;
  id: number;
  status: string | null;
  total_price: number | null;
  updated_at: string | null;
  user_id: string | null;
  item: {
    productId: number;
    name: string;
    price: number | string;
    quantity: number;
    category: string;
    created_at: string;
    description: string;
    image_url: string[];
  }[];
};

export const mapOrdersData = (datalist: Order[]) => {
  return datalist.map((data) => ({
    status: data.status || "",
    created_at: data.created_at || "",
    total_price: data.total_price ?? 0,
    updated_at: data.updated_at || "",
    user_id: data.user_id || "",
    id: data.id,
    item: data.item || [],
  }));
};

export const mapSingleOrdersData = (data: Order) => {
  return {
    status: data.status || "",
    created_at: data.created_at || "",
    total_price: data.total_price ?? 0,
    updated_at: data.updated_at || "",
    user_id: data.user_id || "",
    id: data.id,
    item: data.item || [],
  };
};

// export const fetchOrderDetails = async (orderId: number) => {
//     const { data: order, error } = await supabase
//       .from('orders')
//       .select('id, created_at, total_price, user_id, item')
//       .eq('id', orderId)
//       .single();
//     console.log(order)

//     if (error) {
//       console.error('Error fetching order details:', error.message);
//       return null;
//     }

//     const productIds = order?.item.map((item: any) => item.productId);

//     const { data: products, error: productsError } = await supabase
//       .from('product')
//       .select('id, name, price, image_url')
//       .in('id', productIds);

//     if (productsError) {
//       console.error('Error fetching product details:', productsError.message);
//       return { order, products };
//     }

//     return { order, products };
//   };
