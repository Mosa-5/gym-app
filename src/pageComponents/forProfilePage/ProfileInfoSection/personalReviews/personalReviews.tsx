import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useGetUserReviews } from "@/reactQuery/query/reviews";
import { Link } from "react-router-dom";
import noReviewsSVG from "@/assets/undraw_reviews_ukai.svg";
import { mapUserReviewsData } from "@/supabase/reviews";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/componentsShadcn/ui/dialog";
import { useDeleteReview } from "@/reactQuery/mutations/reviews";
import { notify } from "@/lib/notify";
import { ThumbsUp, Trash2, ExternalLink, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { crosshatchPattern } from "@/lib/crosshatchPattern";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <Star
    className={`h-4 w-4 2xl:h-5 2xl:w-5 ${
      filled
        ? "fill-yellow-400 text-yellow-400"
        : "fill-neutral-300 text-neutral-300 dark:fill-neutral-600 dark:text-neutral-600"
    }`}
  />
);

const PersonalReviews = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();

  const { data: userReviews = [], isLoading } = useGetUserReviews({
    queryOptions: { select: mapUserReviewsData },
    userId: user?.id,
  });

  const { mutate: deleteReviewFn } = useDeleteReview();

  const deleteReview = (
    userId: string,
    reviewId: number,
    productId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    deleteReviewFn({
      userId: userId,
      reviewId: reviewId,
      productId: productId,
    });
    notify.message("Review deleted");
  };

  const formatTimestamp = (isoString: string) =>
    new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (isLoading) return null;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl 2xl:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
          {t("personalReviews.yourReviews")}
        </h2>
        <p className="text-sm 2xl:text-base text-neutral-500 mt-1">
          {userReviews.length}{" "}
          {userReviews.length !== 1
            ? t("personalReviews.reviews")
            : t("personalReviews.review")}{" "}
          {t("personalReviews.written")}
        </p>
      </div>

      {userReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-5">
          <div
            className="relative w-44 h-44 2xl:w-64 2xl:h-64 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(120 15 15) 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: crosshatchPattern,
              }}
            />
            <img
              src={noReviewsSVG}
              alt=""
              className="relative w-24 h-24 2xl:w-36 2xl:h-36 object-contain"
            />
          </div>
          <p className="text-neutral-500 text-sm 2xl:text-base font-medium">
            {t("personalReviews.noReviews")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {userReviews.map((comment) => (
            <Dialog key={comment.id}>
              <DialogTrigger asChild>
                <div className="flex items-center gap-4 2xl:gap-6 p-4 2xl:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer group">
                  {/* Product image */}
                  <img
                    className="w-14 h-14 2xl:w-20 2xl:h-20 rounded-xl object-cover flex-shrink-0"
                    src={comment.product.image_url[0]}
                    alt={comment.product.name}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm 2xl:text-base font-bold text-neutral-900 dark:text-white truncate">
                        {comment.product.name}
                      </span>
                      <span className="text-xs 2xl:text-sm text-neutral-400">
                        {formatTimestamp(comment.created_at)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      {/* Stars */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            filled={star <= Number(comment.rating || 0)}
                          />
                        ))}
                      </div>

                      {comment.like_count > 0 && (
                        <div className="flex items-center gap-1 ml-2">
                          <ThumbsUp className="w-3 h-3 text-neutral-400" />
                          <span className="text-xs text-neutral-400">
                            {comment.like_count}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) =>
                      deleteReview(
                        comment.user_id,
                        comment.id,
                        comment.product_id.toString(),
                        e,
                      )
                    }
                    className="p-2 rounded-full text-neutral-400 hover:text-brand hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4 2xl:w-5 2xl:h-5" />
                  </button>
                </div>
              </DialogTrigger>

              <DialogContent className="rounded-3xl border-none bg-white dark:bg-neutral-950 p-0 max-w-md sm:max-w-lg 2xl:max-w-2xl overflow-hidden shadow-2xl">
                {/* Header band */}
                <div className="px-6 2xl:px-8 pt-6 2xl:pt-8 pb-5 2xl:pb-6 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                  <DialogHeader>
                    <DialogTitle asChild>
                      <div className="flex items-center gap-4 2xl:gap-6">
                        <img
                          src={comment.product.image_url[0]}
                          alt=""
                          className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="block text-base 2xl:text-lg font-bold text-neutral-900 dark:text-white truncate">
                            {comment.product.name}
                          </span>
                          <span className="block text-xs 2xl:text-sm text-neutral-400 mt-0.5">
                            {formatTimestamp(comment.created_at)}
                          </span>
                        </div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  {/* Rating row */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 2xl:h-6 2xl:w-6 ${
                            star <= Number(comment.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-neutral-300 text-neutral-300 dark:fill-neutral-600 dark:text-neutral-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm 2xl:text-base font-bold text-neutral-900 dark:text-white">
                      {Number(comment.rating || 0)}.0
                    </span>
                  </div>
                </div>

                {/* Body */}
                <DialogDescription asChild>
                  <div className="px-6 2xl:px-8 py-6 2xl:py-8">
                    <span className="block text-[11px] 2xl:text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                      {t("personalReviews.yourReview")}
                    </span>
                    <div className="text-sm 2xl:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed break-all">
                      {comment.comment}
                    </div>
                  </div>
                </DialogDescription>

                {/* Footer */}
                <div className="px-6 2xl:px-8 py-4 2xl:py-5 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-neutral-400" />
                    <span className="text-xs 2xl:text-sm text-neutral-400">
                      {comment.like_count} {t("personalReviews.foundHelpful")}
                    </span>
                  </div>

                  <Link
                    to={`/dashboard/productDetail/${comment.product_id}`}
                    className="flex items-center gap-1.5 px-5 2xl:px-7 py-2.5 2xl:py-3 rounded-full text-xs 2xl:text-sm font-semibold bg-brand hover:bg-brand-hover text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    {t("personalReviews.viewProduct")}
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalReviews;
