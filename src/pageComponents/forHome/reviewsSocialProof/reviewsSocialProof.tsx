import { motion } from "framer-motion";
import {
  useGetTopReviews,
  useGetReviewStats,
} from "@/reactQuery/query/reviews/topReviews";
import {
  sectionClass,
  containerClass,
} from "./reviewsSocialProof.styles";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`h-5 w-5 ${filled ? "fill-rating" : "fill-neutral-600"}`}
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

  if (reviews.length === 0) return null;

  const heroReview = reviews[0];
  const marqueeReviews = reviews.length > 1 ? reviews.slice(1) : reviews;

  return (
    <motion.section
      className={sectionClass() + " relative overflow-hidden"}
      style={{
        background: "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(120 15 15) 100%)",
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.384l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656L40.2 36.485l1.415 1.413L60 19.514v-2.83zm0 5.657L43.03 39.313l1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.414 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.414 1.415L30 6.486l9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.142l7.07 7.07zm-2.827 2.83l1.414-1.415L30 14.97l-5.657 5.657 1.414 1.414L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className={containerClass() + " relative z-10"}>
        <SectionHeading text="What Our Customers Say" className="!text-white [&_h2]:!text-white [&_span]:!text-white [&_span]:!opacity-20" />
        {stats && (
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="text-center">
              <span className="block text-2xl sm:text-3xl font-black text-white leading-none">{stats.totalCount}</span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mt-1 block">Reviews</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div className="text-center">
              <span className="block text-2xl sm:text-3xl font-black text-white leading-none">{stats.averageRating}</span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mt-1 block">Avg Rating</span>
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
            <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-white italic text-center max-w-2xl mx-auto break-words">
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
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgb(var(--color-brand)), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, rgb(120 15 15), transparent)" }} />

        <div className="flex gap-5 animate-marquee w-max">
          {/* Quadruple the reviews for seamless gapless loop */}
          {[...marqueeReviews, ...marqueeReviews, ...marqueeReviews, ...marqueeReviews].map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="w-[300px] sm:w-[340px] flex-shrink-0 p-5 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    filled={star <= Number(review.rating || 0)}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-white mb-4 line-clamp-4 flex-1">{review.comment}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {review.profiles?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="font-semibold text-sm text-neutral-300 tracking-wide">
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
