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
import { ThumbsUp, MessageSquarePlus } from "lucide-react";
import ReviewForm from "./ReviewForm";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`h-4 w-4 ${filled ? "fill-brand" : "fill-neutral-300 dark:fill-neutral-600"}`}
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

const ReviewList: React.FC = () => {
  const { user } = useAuthContext();
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
      toast("Message empty");
      return;
    }
    if (!user || !user.id) {
      toast("You need to be signed in for this action!");
      return;
    }
    if (!id) {
      toast("Invalid product ID");
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
          toast.success("Review submitted successfully!");
        },
        onError: () => {
          toast.error("Failed to submit review. Please try again.");
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
    <div className="max-w-screen-lg w-full">
      {/* Review list */}
      {reviews.length > 0 ? (
        <div
          className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#404040 transparent",
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              onClick={() => setSelectedReviewId(review.id)}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <img
                  src={review.profiles.avatar_url?.toString()}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  {/* Header row */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {review.profiles.username}
                    </span>
                    <span className="text-xs text-neutral-400 flex-shrink-0">
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
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 break-all">
                    {review.comment}
                  </p>

                  {/* Helpful count */}
                  {(review.like_count ?? 0) > 0 && (
                    <div className="flex items-center gap-1.5 mt-3">
                      <ThumbsUp className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-xs text-neutral-400">
                        {review.like_count} found helpful
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
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.384l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656L40.2 36.485l1.415 1.413L60 19.514v-2.83zm0 5.657L43.03 39.313l1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.414 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.414 1.415L30 6.486l9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.142l7.07 7.07zm-2.827 2.83l1.414-1.415L30 14.97l-5.657 5.657 1.414 1.414L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            />
            <img
              src={emptyReviewsSVG}
              alt=""
              className="relative w-24 h-24 object-contain"
            />
          </div>
          <p className="text-neutral-500 text-sm font-medium">
            No reviews yet. Be the first!
          </p>
        </div>
      )}

      {/* Add review button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full flex justify-center mt-6">
          <button
            onClick={() => setOpen(true)}
            className="w-full max-w-md bg-brand hover:bg-brand-hover text-white font-bold text-sm uppercase tracking-wider rounded-full py-3.5 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            Write a Review
          </button>
        </DialogTrigger>
        <DialogContent className="rounded-3xl border-none bg-white dark:bg-neutral-950 p-0 max-w-md sm:max-w-lg overflow-hidden shadow-2xl">
          {/* Header band */}
          <div className="px-6 pt-6 pb-5 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
            <DialogHeader>
              <DialogTitle className="text-lg font-black uppercase tracking-tight text-neutral-900 dark:text-white text-center">
                Write a Review
              </DialogTitle>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Share your experience with this product
              </p>
            </DialogHeader>
          </div>
          <DialogDescription asChild>
            <div className="px-6 pb-6 pt-5">
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
                    You need to be logged in to write a review.
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
          <DialogContent className="rounded-3xl border-none bg-white dark:bg-neutral-950 p-0 max-w-md sm:max-w-lg overflow-hidden shadow-2xl">
            {selectedReview && (
              <>
                {/* Header band */}
                <div className="px-6 pt-6 pb-5 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                  <DialogHeader>
                    <DialogTitle asChild>
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedReview.profiles.avatar_url?.toString()}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="block text-base font-bold text-neutral-900 dark:text-white truncate">
                            {selectedReview.profiles.username}
                          </span>
                          <span className="block text-xs text-neutral-400 mt-0.5">
                            {formatTimestamp(selectedReview.created_at)}
                          </span>
                        </div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  {/* Rating row */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-5 w-5 ${star <= Number(selectedReview.rating || 0) ? "fill-brand" : "fill-neutral-300 dark:fill-neutral-600"}`}
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
                      ))}
                    </div>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">
                      {Number(selectedReview.rating || 0)}.0
                    </span>
                  </div>
                </div>

                {/* Body */}
                <DialogDescription asChild>
                  <div className="px-6 py-6">
                    <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                      Review
                    </span>
                    <div
                      className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed break-all overflow-y-auto max-h-64 sm:max-h-80"
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
                <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-xs text-neutral-400">
                      {selectedReview.like_count} found this helpful
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
                      className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer ${likePending ? "opacity-50 pointer-events-none" : ""}`}
                      disabled={likePending}
                    >
                      <ThumbsUp className="w-3.5 h-3.5 fill-brand text-brand" />
                      Liked
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
                      className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-brand hover:bg-brand-hover text-white transition-colors cursor-pointer ${likePending ? "opacity-50 pointer-events-none" : ""}`}
                      disabled={likePending}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Helpful
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
