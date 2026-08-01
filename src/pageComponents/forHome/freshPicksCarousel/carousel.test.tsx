import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import FreshPicksCarousel from "./carousel";

/**
 * Regression test for a real bug: `data` defaults to `[]` in the query hooks, so
 * `if (total === 0) return null` fired *while the request was in flight*, not
 * only when the catalogue was genuinely empty. The section — which has a red
 * gradient background — did not exist in the DOM until Supabase replied, so the
 * page showed a white gap below the hero that then popped into place.
 *
 * The distinction this pins down is loading-vs-empty. Both produce zero
 * products; only one should render nothing.
 */

const products = vi.hoisted(() => ({ current: [] as unknown[] }));
const pending = vi.hoisted(() => ({ current: true }));

vi.mock("@/reactQuery/query/products", () => {
  const state = () => ({
    data: products.current,
    isPending: pending.current,
  });
  return {
    useGetProductListWithWorstSelling: state,
    useGetProductListWithBestSelling: state,
    useGetProductListWithCategory: state,
  };
});

const renderCarousel = () =>
  render(
    <MemoryRouter>
      <QueryClientProvider client={new QueryClient()}>
        <FreshPicksCarousel
          headerText="Fresh Picks"
          carouselType="worstSelling"
        />
      </QueryClientProvider>
    </MemoryRouter>,
  );

describe("FreshPicksCarousel", () => {
  beforeEach(() => {
    products.current = [];
    pending.current = true;
  });

  it("renders the section shell while the query is pending", () => {
    renderCarousel();

    // By role, not by text: SectionHeading renders the string twice — the real
    // <h2> and an aria-hidden decorative shadow layer behind it. Only the
    // former is in the accessibility tree, which is also what we care about.
    expect(
      screen.getByRole("heading", { name: "Fresh Picks" }),
    ).toBeInTheDocument();
  });

  it("marks the pending shell as busy", () => {
    const { container } = renderCarousel();

    expect(container.querySelector('[aria-busy="true"]')).not.to.equal(null);
  });

  it("reserves height for the carousel AND the controls row", () => {
    const { container } = renderCarousel();

    // Reserving only the scene left the section ~80px short, so it still grew
    // when data landed — a measured 0.002 CLS.
    expect(container.querySelector(".h-\\[240px\\]")).not.to.equal(null);
    expect(container.querySelector(".h-12")).not.to.equal(null);
  });

  it("renders nothing once the query resolves genuinely empty", () => {
    pending.current = false;

    const { container } = renderCarousel();

    expect(container).toBeEmptyDOMElement();
  });
});
