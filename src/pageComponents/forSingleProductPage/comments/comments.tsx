import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useToggleLike, useWriteReview } from "@/reactQuery/mutations/reviews";
import {
  useGetLikedByUser,
  useGetProductReviews,
} from "@/reactQuery/query/reviews";
import { useState } from "react";
import { useParams } from "react-router-dom";
import emptyReviewsSVG from "@/assets/undraw_add-notes_9xls.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/componentsShadcn/ui/dialog";
import { toast } from "sonner";
import { ThumbsUp, MessageSquarePlus, Star } from "lucide-react";
import ReviewForm from "./ReviewForm";
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

const ReviewList: React.FC = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const { mutate: writeReview, isError, error, isPending } = useWriteReview();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  const { data: likeDataQ, isLoading } = useGetLikedByUser({
    reviewId: selectedReviewId || undefined,
    userId: user?.id,
  });

  const { mutate: likefn, isPending: likePending } = useToggleLike();

  const helpfulReview = (
    userId: string,
    reviewId: number,
    productId: string,
  ) => {
    return likefn({ reviewId, userId, productId });
  };

  const { data: reviews = [] } = useGetProductReviews({
    productId: id,
  });

  const selectedReview = selectedReviewId
    ? reviews.find((review) => review.id === selectedReviewId)
    : null;

  const onSubmit = (values: { rating: number; description: string }) => {
    if (values.description.trim() === "") {
      toast(t("reviews.messageEmpty"));
      return;
    }
    if (!user || !user.id) {
      toast(t("reviews.needSignIn"));
      return;
    }
    if (!id) {
      toast(t("reviews.invalidProductId"));
      return;
    }

    writeReview(
      {
        userId: user.id,
        rating: values.rating,
        comment: values.description,
        productId: id,
      },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success(t("reviews.submitSuccess"));
        },
        onError: () => {
          toast.error(t("reviews.submitFailed"));
        },
      },
    );
  };

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-screen-lg 2xl:max-w-[1400px] w-full">
      {/* Review list */}
      {reviews.length > 0 ? (
        <div
          className="flex flex-col gap-4 2xl:gap-6 max-h-[500px] 2xl:max-h-[700px] overflow-y-auto pr-2 2xl:pr-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#404040 transparent",
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 2xl:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              onClick={() => setSelectedReviewId(review.id)}
            >
              <div className="flex items-start gap-4 2xl:gap-6">
                {/* Avatar */}
                <img
                  src={review.profiles.avatar_url?.toString()}
                  alt=""
                  className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  {/* Header row */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm 2xl:text-base font-semibold text-neutral-900 dark:text-white">
                      {review.profiles.username}
                    </span>
                    <span className="text-xs 2xl:text-sm text-neutral-400 flex-shrink-0">
                      {formatTimestamp(review.created_at)}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        filled={star <= Number(review.rating || 0)}
                      />
                    ))}
                  </div>

                  {/* Comment preview */}
                  <p className="text-sm 2xl:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 break-all">
                    {review.comment}
                  </p>

                  {/* Helpful count */}
                  {(review.review_likes?.length ?? 0) > 0 && (
                    <div className="flex items-center gap-1.5 mt-3">
                      <ThumbsUp className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-neutral-400" />
                      <span className="text-xs 2xl:text-sm text-neutral-400">
                        {review.review_likes?.length}{" "}
                        {t("reviews.foundHelpful")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 gap-5">
          <div
            className="relative w-44 h-44 rounded-full flex items-center justify-center overflow-hidden"
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
              src={emptyReviewsSVG}
              alt=""
              className="relative w-24 h-24 object-contain"
            />
          </div>
          <p className="text-neutral-500 text-sm font-medium">
            {t("reviews.noReviews")}
          </p>
        </div>
      )}

      {/* Add review button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="w-full max-w-md 2xl:max-w-xl mt-6 mx-auto bg-brand hover:bg-brand-hover text-white font-bold text-sm 2xl:text-base uppercase tracking-wider rounded-full py-3.5 2xl:py-5 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2">
            <MessageSquarePlus className="w-4 h-4 2xl:w-5 2xl:h-5" />
            {t("reviews.writeReview")}
          </button>
        </DialogTrigger>
        <DialogContent className="rounded-3xl border-none bg-white dark:bg-neutral-950 p-0 max-w-md sm:max-w-lg 2xl:max-w-2xl overflow-hidden shadow-2xl">
          {/* Header band */}
          <div className="px-6 pt-6 pb-5 2xl:px-8 2xl:pt-8 2xl:pb-6 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
            <DialogHeader>
              <DialogTitle className="text-lg 2xl:text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white text-center">
                {t("reviews.writeReview")}
              </DialogTitle>
              <p className="text-xs 2xl:text-sm text-neutral-400 text-center mt-1">
                {t("reviews.shareExperience")}
              </p>
            </DialogHeader>
          </div>
          <DialogDescription asChild>
            <div className="px-6 pb-6 pt-5 2xl:px-8 2xl:pb-8 2xl:pt-6">
              {user ? (
                <ReviewForm
                  onSubmit={onSubmit}
                  isError={isError}
                  error={error}
                  isPending={isPending}
                />
              ) : (
                <div className="py-8 text-center">
                  <p className="text-neutral-500 text-sm">
                    {t("reviews.needLogIn")}
                  </p>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Review detail dialog */}
      {!isLoading && (
        <Dialog
          open={selectedReviewId !== null}
          onOpenChange={(open) => !open && setSelectedReviewId(null)}
        >
          <DialogContent className="rounded-3xl border-none bg-white dark:bg-neutral-950 p-0 max-w-md sm:max-w-lg 2xl:max-w-2xl overflow-hidden shadow-2xl">
            {selectedReview && (
              <>
                {/* Header band */}
                <div className="px-6 pt-6 pb-5 2xl:px-8 2xl:pt-8 2xl:pb-6 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                  <DialogHeader>
                    <DialogTitle asChild>
                      <div className="flex items-center gap-4 2xl:gap-5">
                        <img
                          src={selectedReview.profiles.avatar_url?.toString()}
                          alt=""
                          className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="block text-base 2xl:text-lg font-bold text-neutral-900 dark:text-white truncate">
                            {selectedReview.profiles.username}
                          </span>
                          <span className="block text-xs 2xl:text-sm text-neutral-400 mt-0.5">
                            {formatTimestamp(selectedReview.created_at)}
                          </span>
                        </div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  {/* Rating row */}
                  <div className="flex items-center gap-2 2xl:gap-3 mt-4 2xl:mt-6">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 2xl:h-6 2xl:w-6 ${
                            star <= Number(selectedReview.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-neutral-300 text-neutral-300 dark:fill-neutral-600 dark:text-neutral-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm 2xl:text-base font-bold text-neutral-900 dark:text-white">
                      {Number(selectedReview.rating || 0)}.0
                    </span>
                  </div>
                </div>

                {/* Body */}
                <DialogDescription asChild>
                  <div className="px-6 py-6 2xl:px-8 2xl:py-8">
                    <span className="block text-[11px] 2xl:text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3 2xl:mb-4">
                      {t("reviews.review")}
                    </span>
                    <div
                      className="text-sm 2xl:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed break-all overflow-y-auto max-h-64 sm:max-h-80 2xl:max-h-96"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#404040 transparent",
                      }}
                    >
                      {selectedReview.comment}
                    </div>
                  </div>
                </DialogDescription>

                {/* Footer */}
                <div className="px-6 py-4 2xl:px-8 2xl:py-6 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-neutral-400" />
                    <span className="text-xs 2xl:text-sm text-neutral-400">
                      {selectedReview.review_likes?.length ?? 0}{" "}
                      {t("reviews.foundHelpful")}
                    </span>
                  </div>

                  {likeDataQ?.liked ? (
                    <button
                      onClick={() =>
                        helpfulReview(
                          user?.id || "",
                          selectedReview.id,
                          selectedReview.product_id?.toString() || "",
                        )
                      }
                      className={`flex items-center gap-1.5 px-5 py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs 2xl:text-sm font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer ${likePending ? "opacity-50 pointer-events-none" : ""}`}
                      disabled={likePending}
                    >
                      <ThumbsUp className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 fill-brand text-brand" />
                      {t("reviews.liked")}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        helpfulReview(
                          user?.id || "",
                          selectedReview.id,
                          selectedReview.product_id?.toString() || "",
                        )
                      }
                      className={`flex items-center gap-1.5 px-5 py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs 2xl:text-sm font-semibold bg-brand hover:bg-brand-hover text-white transition-colors cursor-pointer ${likePending ? "opacity-50 pointer-events-none" : ""}`}
                      disabled={likePending}
                    >
                      <ThumbsUp className="w-3.5 h-3.5 2xl:w-5 2xl:h-5" />
                      {t("reviews.helpful")}
                    </button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReviewList;
