import React, { createContext, useState, useEffect, useMemo } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number | string;
  quantity: number;
  category: string;
  created_at: string;
  description: string;
  image_url: string[];
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  changeQuantity: (id: string, action: "increment" | "decrement") => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // localStorage may be full or unavailable
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        );
      }
      // Add new item to cart
      return [...prevCart, item];
    });
  };

  const changeQuantity = (id: string, action: "increment" | "decrement") => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === Number(id)
          ? {
              ...item,
              quantity:
                action === "increment"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1), // Ensure quantity doesn't go below 1
            }
          : item,
      ),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== Number(id)));
  };

  const clearCart = () => {
    setCart([]); // Clear cart state
    localStorage.removeItem("cart"); // Remove cart from localStorage
  };

  const contextValue = useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart, changeQuantity }),
    [cart],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
