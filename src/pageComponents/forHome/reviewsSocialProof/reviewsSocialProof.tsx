import { motion } from "framer-motion";
import {
  useGetTopReviews,
  useGetReviewStats,
} from "@/reactQuery/query/reviews/topReviews";
import { sectionClass, containerClass } from "./reviewsSocialProof.styles";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import { useTranslation } from "react-i18next";
import { crosshatchPattern } from "@/lib/crosshatchPattern";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`h-5 w-5 ${filled ? "fill-brand" : "fill-neutral-600"}`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.03954 7.77203C3.57986 8.32856 2.35002 8.60682 2.05742 9.54773C1.76482 10.4886 2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19043 14.4944 5.42868 14.773 5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694 17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62118 22.3417 7.77268 21.8115 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0248 12 20.0248C12.3469 20.0248 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273 21.8115 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306 17.2544M19.7199 13.4299C21.3968 11.4691 22.2352 10.4886 21.9426 9.54773C21.65 8.60682 20.4201 8.32856 17.9605 7.77203L17.3241 7.62805C16.6251 7.4699 16.2757 7.39083 15.9951 7.17781C15.7144 6.96479 15.5345 6.64193 15.1745 5.99623L14.8468 5.40837C13.5802 3.13612 12.9469 2 12 2C11.0531 2 10.4198 3.13613 9.15316 5.40838"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ReviewsSocialProof = () => {
  const { data: reviews = [] } = useGetTopReviews();
  const { data: stats } = useGetReviewStats();
  const { t } = useTranslation();

  if (reviews.length === 0) return null;

  const heroReview = reviews[0];
  const marqueeReviews = reviews.length > 1 ? reviews.slice(1) : reviews;

  return (
    <motion.section
      className={sectionClass() + " relative overflow-hidden"}
      style={{
        background:
          "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(120 15 15) 100%)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Crosshatch pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-[1]"
        style={{
          backgroundImage: crosshatchPattern,
        }}
      />

      <div className={containerClass() + " relative z-10"}>
        <SectionHeading
          text={t("reviews.whatCustomersSay")}
          className="!text-white [&_h2]:!text-white [&_span]:!text-white [&_span]:!opacity-20"
        />
        {stats && (
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="text-center">
              <span className="block text-2xl sm:text-3xl 2xl:text-4xl font-black text-white leading-none">
                {stats.totalCount}
              </span>
              <span className="text-[11px] 2xl:text-sm font-semibold uppercase tracking-widest text-white/50 mt-1 block">
                {t("reviews.reviews")}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div className="text-center">
              <span className="block text-2xl sm:text-3xl 2xl:text-4xl font-black text-white leading-none">
                {stats.averageRating}
              </span>
              <span className="text-[11px] 2xl:text-sm font-semibold uppercase tracking-widest text-white/50 mt-1 block">
                {t("reviews.avgRating")}
              </span>
            </div>
          </div>
        )}

        {/* Featured hero quote */}
        <motion.div
          className="relative max-w-3xl mx-auto mb-12 lg:mb-16 text-center px-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <blockquote className="relative z-10">
            <p className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-medium leading-relaxed text-white italic text-center max-w-2xl mx-auto break-all">
              {heroReview.comment}
            </p>
            <div className="w-12 h-[2px] bg-white/30 mx-auto mt-6 mb-6" />
            <footer className="flex justify-center">
              <div className="inline-flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-full px-5 py-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {heroReview.profiles?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-semibold text-white">
                  {heroReview.profiles?.username || "Anonymous"}
                </span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      filled={star <= Number(heroReview.rating || 0)}
                    />
                  ))}
                </div>
              </div>
            </footer>
          </blockquote>
        </motion.div>
      </div>

      {/* Infinite marquee — full width */}
      <div className="relative overflow-hidden z-10">
        {/* Fade edges — match red bg */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--color-brand)), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgb(120 15 15), transparent)",
          }}
        />

        <div className="flex gap-5 animate-marquee w-max">
          {/* Quadruple the reviews for seamless gapless loop */}
          {[
            ...marqueeReviews,
            ...marqueeReviews,
            ...marqueeReviews,
            ...marqueeReviews,
          ].map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="w-[300px] sm:w-[340px] 2xl:w-[400px] flex-shrink-0 p-5 sm:p-6 2xl:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    filled={star <= Number(review.rating || 0)}
                  />
                ))}
              </div>
              <p className="text-sm 2xl:text-base leading-relaxed text-white mb-4 line-clamp-4 flex-1">
                {review.comment}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {review.profiles?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="font-semibold text-sm 2xl:text-base text-neutral-300 tracking-wide">
                  {review.profiles?.username || "Anonymous"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ReviewsSocialProof;
