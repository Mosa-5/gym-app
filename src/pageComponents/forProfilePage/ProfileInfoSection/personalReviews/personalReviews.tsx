import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/componentsShadcn/ui/card";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useGetUserReviews } from "@/reactQuery/query/reviews";
import { Link } from "react-router-dom";
import noReviewsSVG from "@/assets/undraw_reviews_ukai.svg";
import { mapUserReviewsData } from "@/supabase/reviews";
import { Button } from "@/componentsShadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/componentsShadcn/ui/dialog";
import { useDeleteReview } from "@/reactQuery/mutations/reviews";
import { toast } from "sonner";

const PersonalReviews = () => {
  const { user } = useAuthContext();

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
    deleteReviewFn({
      userId: userId,
      reviewId: reviewId,
      productId: productId,
    });
    toast("Review Deleted");
  };

  const formatTimestamp = (isoString: string) =>
    new Date(isoString).toLocaleString();

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <Card className="border-none shadow-none bg-transparent dark:bg-transparent dark:border-neutral-800">
          <CardHeader>
            <CardTitle className="text-center">
              {userReviews.length}{" "}
              {userReviews.length !== 1 ? "Reviews" : "Review"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            {userReviews.length === 0 ? (
              <img
                src={noReviewsSVG}
                alt="No reviews"
                className="max-w-72 m-auto"
              />
            ) : (
              userReviews.map((comment) => {
                return (
                  <Dialog>
                    <DialogTrigger>
                      <div className="group mb-3 flex flex-col bg-white dark:bg-neutral-950 gap-5 sm:flex-row border-2 px-5 rounded-md dark:border-neutral-800 p-3 justify-between items-center hover:border-black dark:hover:border-white hover:-translate-y-2 transition-all duration-200">
                        <div className="flex items-center gap-3 ">
                          <img
                            className="w-20 h-20 rounded-full"
                            src={comment.product.image_url[0]}
                            alt={comment.product.name}
                          />
                          <h1 className="text-lg sm:text-xl font-semibold">
                            {comment.product.name}
                          </h1>
                        </div>
                        <p className="text-neutral-500 dark:text-neutral-400">
                          {comment.like_count} people found this review helpful
                        </p>

                        <h1>{formatTimestamp(comment.created_at)}</h1>
                        <Button
                          onClick={(e) =>
                            deleteReview(
                              comment.user_id,
                              comment.id,
                              comment.product_id.toString(),
                              e,
                            )
                          }
                          variant={"destructive"}
                          className="bg-destructive hover:bg-destructive-hover"
                        >
                          Delete Post
                        </Button>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="rounded-2xl max-w-md sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg border-2 border-brand dark:border-brand">
                      <DialogHeader>
                        <DialogTitle className="text-3xl dark:text-neutral-400 text-center">
                          <div>
                            <div className="flex justify-center items-center gap-2">
                              <img
                                src={comment.product.image_url[0]?.toString()}
                                alt=""
                                className="w-10 h-10 rounded-md"
                              />
                              <span>{comment.product.name} Review</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatTimestamp(comment.created_at)}
                            </span>
                          </div>
                        </DialogTitle>
                        <DialogDescription className="w-full">
                          <div className="w-full text-lg text-center mt-10 text-black dark:text-gray-400">
                            <div className="break-words break-all overflow-hidden">
                              <span>{comment.comment}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-10">
                              <div className="flex flex-col">
                                <div className="flex items-center justify-center gap-1 dark:text-white">
                                  <h1 className="font-semibold">
                                    Product Rating:
                                  </h1>
                                  <h1 className="text-lg font-semibold">
                                    {comment.rating}
                                  </h1>
                                  <svg
                                    className="h-5 w-5 fill-rating"
                                    viewBox="0 0 24 24"
                                    fill=""
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      strokeWidth="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <path
                                        d="M6.03954 7.77203C3.57986 8.32856 2.35002 8.60682 2.05742 9.54773C1.76482 10.4886 2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19043 14.4944 5.42868 14.773 5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694 17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62118 22.3417 7.77268 21.8115 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0248 12 20.0248C12.3469 20.0248 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273 21.8115 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306 17.2544M19.7199 13.4299C21.3968 11.4691 22.2352 10.4886 21.9426 9.54773C21.65 8.60682 20.4201 8.32856 17.9605 7.77203L17.3241 7.62805C16.6251 7.4699 16.2757 7.39083 15.9951 7.17781C15.7144 6.96479 15.5345 6.64193 15.1745 5.99623L14.8468 5.40837C13.5802 3.13612 12.9469 2 12 2C11.0531 2 10.4198 3.13613 9.15316 5.40838"
                                        stroke="#1C274C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                      ></path>{" "}
                                    </g>
                                  </svg>
                                </div>
                                <div className="text-base font-semibold text-gray-600">
                                  {comment.like_count}50 people found this
                                  review helpful
                                </div>
                              </div>
                              <div className="flex flex-col items-center gap-2 self-end">
                                <Link
                                  className="text-base underline"
                                  to={`/dashboard/productDetail/${comment.product_id}`}
                                >
                                  <Button>View the post</Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                );
              })
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PersonalReviews;
