import { useRef, useState, useEffect } from "react";
import { Button } from "@/componentsShadcn/ui/button";
import { wrapper } from "./carousel.styles";
import {
  useGetProductListWithBestSelling,
  useGetProductListWithCategory,
  useGetProductListWithWorstSelling,
} from "@/reactQuery/query/products";
import { mapProductTableData } from "@/supabase/products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import { crosshatchPattern } from "@/lib/crosshatchPattern";

interface CarouselProps {
  productType?: string;
  headerText: string;
  carouselType: "bestSelling" | "category" | "worstSelling";
}

type SlotStyle = {
  x: number;
  y: number;
  scale: number;
  zIndex: number;
  opacity: number;
};

// Arranged in a circle: center → right → back-right → back-left → left → center
const RING: SlotStyle[] = [
  { x: 0, y: 20, scale: 1.15, zIndex: 10, opacity: 1 }, // 0: center (front)
  { x: 130, y: 10, scale: 0.8, zIndex: 8, opacity: 0.6 }, // 1: right
  { x: 70, y: -15, scale: 0.55, zIndex: 3, opacity: 0.3 }, // 2: back-right
  { x: -70, y: -15, scale: 0.55, zIndex: 3, opacity: 0.3 }, // 3: back-left
  { x: -130, y: 10, scale: 0.8, zIndex: 8, opacity: 0.6 }, // 4: left
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpSlot(a: SlotStyle, b: SlotStyle, t: number): SlotStyle {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    scale: lerp(a.scale, b.scale, t),
    zIndex: Math.round(lerp(a.zIndex, b.zIndex, t)),
    opacity: lerp(a.opacity, b.opacity, t),
  };
}

const DRAG_SENSITIVITY = 200;

const FreshPicksCarousel: React.FC<CarouselProps> = ({
  productType,
  headerText,
  carouselType,
}) => {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0); // always holds the latest rotation value
  const targetRotation = useRef(0);
  const animRef = useRef<number>(0);
  const isDragging = useRef(false);

  // Keep ref in sync with state
  rotationRef.current = rotation;

  const { data: productWithCategory = [] } = useGetProductListWithCategory(
    { queryOptions: { select: mapProductTableData } },
    productType,
  );

  const { data: productBestSelling = [] } = useGetProductListWithBestSelling({
    queryOptions: { select: mapProductTableData },
  });

  const { data: productWorstSelling = [] } = useGetProductListWithWorstSelling({
    queryOptions: { select: mapProductTableData },
  });

  const products = (() => {
    switch (carouselType) {
      case "bestSelling":
        return productBestSelling;
      case "worstSelling":
        return productWorstSelling;
      case "category":
      default:
        return productWithCategory;
    }
  })();

  const total = products.length;
  const ringSize = Math.min(total, RING.length);

  // Animate rotation toward target over a fixed duration
  const animateTo = (target: number) => {
    targetRotation.current = target;
    cancelAnimationFrame(animRef.current);

    const startValue = rotationRef.current;
    const startTime = performance.now();
    const duration = 800; // ms — adjust this to control speed

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = startValue + (targetRotation.current - startValue) * eased;

      setRotation(value);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const goNext = () => animateTo(targetRotation.current + 1);
  const goPrev = () => animateTo(targetRotation.current - 1);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(animRef.current);
    isDragging.current = false;
    const startX = e.clientX;
    const startRotation = rotation;
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);

    const controller = new AbortController();
    const { signal } = controller;

    const settle = (clientX: number) => {
      const current = startRotation - (clientX - startX) / DRAG_SENSITIVITY;
      const snapped = Math.round(current);
      targetRotation.current = snapped;
      animateTo(snapped);
      setTimeout(() => {
        isDragging.current = false;
      }, 50);
    };

    el.addEventListener(
      "pointermove",
      (ev: PointerEvent) => {
        const delta = ev.clientX - startX;
        if (Math.abs(delta) > 5) isDragging.current = true;
        setRotation(startRotation - delta / DRAG_SENSITIVITY);
      },
      { signal },
    );

    el.addEventListener(
      "pointerup",
      (ev: PointerEvent) => {
        controller.abort();
        el.releasePointerCapture(ev.pointerId);
        settle(ev.clientX);
      },
      { signal },
    );

    // Browser fires this when it takes over for vertical page scroll
    // (touch-action: pan-y); snap back to start since no horizontal drag happened.
    el.addEventListener(
      "pointercancel",
      () => {
        controller.abort();
        settle(startX);
      },
      { signal },
    );
  };

  const getItemStyle = (index: number): SlotStyle => {
    let pos = ((index - rotation) % ringSize) + ringSize;
    pos = pos % ringSize;

    const slotA = Math.floor(pos) % ringSize;
    const slotB = (slotA + 1) % ringSize;
    const frac = pos - Math.floor(pos);

    return lerpSlot(RING[slotA], RING[slotB], frac);
  };

  if (total === 0) return null;

  return (
    <div
      className={wrapper()}
      style={{
        background:
          "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(120 15 15) 100%)",
        borderBottom: "1px solid rgb(var(--color-brand))",
      }}
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-[1]"
        style={{
          backgroundImage: crosshatchPattern,
        }}
      />

      <motion.div
        className="relative z-10 w-full flex flex-col items-center gap-7"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <SectionHeading
          text={headerText}
          className="!text-white [&_h2]:!text-white [&_span]:!text-white [&_span]:!opacity-20"
        />

        <div className="w-full max-w-3xl 2xl:max-w-5xl mx-auto">
          {/* Carousel scene */}
          <div
            className="relative w-full select-none touch-pan-y h-[240px] sm:h-[340px] 2xl:h-[420px]"
            style={{ cursor: "grab" }}
            onPointerDown={handlePointerDown}
          >
            {products.map((product, index) => {
              const style = getItemStyle(index);

              return (
                <div
                  key={product.id}
                  className="absolute left-1/2 top-0"
                  style={{
                    transform: `translateX(calc(-50% + ${style.x}%)) translateY(${style.y}%) scale(${style.scale})`,
                    zIndex: style.zIndex,
                    pointerEvents: "none",
                  }}
                >
                  <div className="relative h-44 w-44 sm:h-64 sm:w-64 2xl:h-80 2xl:w-80 rounded-full">
                    {/* Solid backing to block pattern bleed-through */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgb(var(--color-brand))" }}
                    />
                    <img
                      src={product.image_url[0]}
                      alt={product.name}
                      loading="lazy"
                      className="relative h-44 w-44 sm:h-64 sm:w-64 2xl:h-80 2xl:w-80 object-cover rounded-full shadow-lg"
                      style={{ opacity: style.opacity }}
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Buttons below */}
          <div className="flex justify-center gap-6 2xl:gap-5 mt-8 2xl:mt-10 bg-black/20 backdrop-blur-sm w-fit mx-auto rounded-full">
            <Button
              onClick={goPrev}
              aria-label={t("a11y.previousProduct")}
              variant="outline"
              size="icon"
              className="h-12 w-12 2xl:h-16 2xl:w-16 rounded-full bg-white/15 text-white hover:bg-white/25 hover:text-white border-white/20"
            >
              <ArrowLeft className="h-5 w-5 2xl:h-7 2xl:w-7" />
            </Button>
            <Link
              to={`/dashboard/productDetail/${products[((Math.round(rotation) % total) + total) % total]?.id}`}
              className="flex items-center gap-2 text-sm 2xl:text-lg font-bold text-white w-[220px] 2xl:w-[320px] justify-center text-center uppercase tracking-wider hover:underline underline-offset-4 transition-all truncate"
            >
              {products[((Math.round(rotation) % total) + total) % total]?.name}
              <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60" />
            </Link>
            <Button
              onClick={goNext}
              aria-label={t("a11y.nextProduct")}
              variant="outline"
              size="icon"
              className="h-12 w-12 2xl:h-16 2xl:w-16 rounded-full bg-white/15 text-white hover:bg-white/25 hover:text-white border-white/20"
            >
              <ArrowRight className="h-5 w-5 2xl:h-7 2xl:w-7" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FreshPicksCarousel;
