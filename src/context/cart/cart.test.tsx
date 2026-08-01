import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider } from ".";
import { useCartContext } from "./hooks/useCartContext";
import type { CartItem } from "./index";

/**
 * The cart is the only substantial piece of business logic in the app that is
 * not a thin wrapper over Supabase, and it is the one place where a silent bug
 * costs money — wrong quantities, lost items, a basket that empties on reload.
 */

const product = (overrides: Partial<CartItem> = {}): CartItem =>
  ({
    id: 1,
    name: "10mm Lever Belt",
    price: 99,
    quantity: 1,
    category: "lever-belts",
    created_at: "2026-01-01",
    description: "",
    image_url: [""],
    ...overrides,
  }) as CartItem;

const renderCart = () =>
  renderHook(() => useCartContext(), { wrapper: CartProvider });

describe("cart", () => {
  beforeEach(() => localStorage.clear());

  it("starts empty", () => {
    const { result } = renderCart();

    expect(result.current.cart).to.have.lengthOf(0);
  });

  it("adds an item", () => {
    const { result } = renderCart();

    act(() => result.current.addToCart(product()));

    expect(result.current.cart).to.have.lengthOf(1);
    expect(result.current.cart[0].name).to.equal("10mm Lever Belt");
  });

  it("merges quantities instead of duplicating an existing product", () => {
    const { result } = renderCart();

    act(() => result.current.addToCart(product({ quantity: 2 })));
    act(() => result.current.addToCart(product({ quantity: 3 })));

    expect(result.current.cart).to.have.lengthOf(1);
    expect(result.current.cart[0].quantity).to.equal(5);
  });

  it("keeps different products separate", () => {
    const { result } = renderCart();

    act(() => result.current.addToCart(product({ id: 1 })));
    act(() => result.current.addToCart(product({ id: 2, name: "Straps" })));

    expect(result.current.cart).to.have.lengthOf(2);
  });

  it("increments and decrements quantity", () => {
    const { result } = renderCart();
    act(() => result.current.addToCart(product({ quantity: 2 })));

    act(() => result.current.changeQuantity(1, "increment"));
    expect(result.current.cart[0].quantity).to.equal(3);

    act(() => result.current.changeQuantity(1, "decrement"));
    expect(result.current.cart[0].quantity).to.equal(2);
  });

  it("never decrements below 1 — items must be removed explicitly", () => {
    const { result } = renderCart();
    act(() => result.current.addToCart(product({ quantity: 1 })));

    act(() => result.current.changeQuantity(1, "decrement"));
    act(() => result.current.changeQuantity(1, "decrement"));

    expect(result.current.cart[0].quantity).to.equal(1);
    expect(result.current.cart).to.have.lengthOf(1);
  });

  it("removes only the requested item", () => {
    const { result } = renderCart();
    act(() => result.current.addToCart(product({ id: 1 })));
    act(() => result.current.addToCart(product({ id: 2 })));

    act(() => result.current.removeFromCart(1));

    expect(result.current.cart).to.have.lengthOf(1);
    expect(result.current.cart[0].id).to.equal(2);
  });

  it("clears everything", () => {
    const { result } = renderCart();
    act(() => result.current.addToCart(product()));

    act(() => result.current.clearCart());

    expect(result.current.cart).to.have.lengthOf(0);
  });

  describe("persistence", () => {
    it("survives a reload", () => {
      const first = renderCart();
      act(() => first.result.current.addToCart(product({ quantity: 4 })));
      first.unmount();

      // A fresh provider reads localStorage on mount, as a page load would.
      const second = renderCart();

      expect(second.result.current.cart).to.have.lengthOf(1);
      expect(second.result.current.cart[0].quantity).to.equal(4);
    });

    it("clearing empties the stored cart too", () => {
      const { result, unmount } = renderCart();
      act(() => result.current.addToCart(product()));
      act(() => result.current.clearCart());
      unmount();

      expect(renderCart().result.current.cart).to.have.lengthOf(0);
    });

    it("recovers from corrupted storage rather than crashing", () => {
      localStorage.setItem("cart", "not json{{{");

      expect(() => renderCart()).not.to.throw();
      expect(renderCart().result.current.cart).to.have.lengthOf(0);
    });
  });
});
