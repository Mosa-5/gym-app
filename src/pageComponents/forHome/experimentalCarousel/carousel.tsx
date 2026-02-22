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
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";

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

const ExperimentalCarousel: React.FC<CarouselProps> = ({
  productType,
  headerText,
  carouselType,
}) => {
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

    const onMove = (ev: PointerEvent) => {
      const delta = ev.clientX - startX;
      if (Math.abs(delta) > 5) isDragging.current = true;
      setRotation(startRotation - delta / DRAG_SENSITIVITY);
    };

    const onUp = (ev: PointerEvent) => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.releasePointerCapture(ev.pointerId);

      const current = startRotation - (ev.clientX - startX) / DRAG_SENSITIVITY;
      const snapped = Math.round(current);
      targetRotation.current = snapped;
      animateTo(snapped);

      setTimeout(() => {
        isDragging.current = false;
      }, 50);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.384l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656L40.2 36.485l1.415 1.413L60 19.514v-2.83zm0 5.657L43.03 39.313l1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.414 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.414 1.415L30 6.486l9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.142l7.07 7.07zm-2.827 2.83l1.414-1.415L30 14.97l-5.657 5.657 1.414 1.414L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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

        <div className="w-full max-w-3xl mx-auto">
          {/* Carousel scene */}
          <div
            className="relative w-full select-none touch-none"
            style={{ height: "340px", cursor: "grab" }}
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
                  }}
                >
                  <Link
                    to={`/dashboard/productDetail/${product.id}`}
                    onClick={handleClick}
                    onPointerDown={(e) => e.stopPropagation()}
                    draggable={false}
                    className="relative block h-64 w-64 rounded-full hover:brightness-105 hover:translate-y-[-4px] transition-all duration-200"
                    style={{ pointerEvents: style.zIndex >= 10 ? "auto" : "none" }}
                  >
                    {/* Solid backing to block pattern bleed-through */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgb(var(--color-brand))" }}
                    />
                    <img
                      src={product.image_url[0]}
                      alt={product.name}
                      className="relative h-64 w-64 object-cover rounded-full shadow-lg"
                      style={{ opacity: style.opacity }}
                      draggable={false}
                    />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Buttons below */}
          <div className="flex justify-center gap-6 mt-8 bg-black/20 backdrop-blur-sm w-fit mx-auto rounded-full">
            <Button
              onClick={goPrev}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/15 text-white hover:bg-white/25 hover:text-white border-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="flex items-center text-sm font-medium text-white min-w-[120px] justify-center text-center">
              {products[((Math.round(rotation) % total) + total) % total]?.name}
            </span>
            <Button
              onClick={goNext}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/15 text-white hover:bg-white/25 hover:text-white border-white/20"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperimentalCarousel;
