import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/componentsShadcn/ui/form";
import { Textarea } from "@/componentsShadcn/ui/textarea";

const STAR_PATH =
  "M6.03954 7.77203C3.57986 8.32856 2.35002 8.60682 2.05742 9.54773C1.76482 10.4886 2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19043 14.4944 5.42868 14.773 5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694 17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62118 22.3417 7.77268 21.8115 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0248 12 20.0248C12.3469 20.0248 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273 21.8115 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306 17.2544M19.7199 13.4299C21.3968 11.4691 22.2352 10.4886 21.9426 9.54773C21.65 8.60682 20.4201 8.32856 17.9605 7.77203L17.3241 7.62805C16.6251 7.4699 16.2757 7.39083 15.9951 7.17781C15.7144 6.96479 15.5345 6.64193 15.1745 5.99623L14.8468 5.40837C13.5802 3.13612 12.9469 2 12 2C11.0531 2 10.4198 3.13613 9.15316 5.40838";

const formSchema = z.object({
  rating: z.number().min(1, { message: "Please select a rating" }),
  description: z
    .string()
    .min(40, { message: "Description must be at least 40 characters." })
    .nonempty({ message: "Description is required" }),
});

const ReviewForm: React.FC<{
  onSubmit: (values: { rating: number; description: string }) => void;
  isError: boolean;
  error: Error | null;
  isPending: boolean;
}> = ({ onSubmit, isError, error, isPending }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      description: "",
    },
  });

  const currentRating = form.watch("rating");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full dark:text-white"
      >
        {/* Rating Field */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Your Rating
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-1.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      className="p-0.5 cursor-pointer transition-transform hover:scale-110"
                    >
                      <svg
                        className={`h-8 w-8 ${
                          star <= currentRating
                            ? "fill-brand"
                            : "fill-neutral-200 dark:fill-neutral-700"
                        } transition-colors`}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d={STAR_PATH}
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  ))}
                  {currentRating > 0 && (
                    <span className="ml-2 text-sm font-bold text-neutral-900 dark:text-white">
                      {currentRating}.0
                    </span>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Your Review
                </FormLabel>
                <span className="text-xs text-neutral-400">
                  {field.value.length}/600
                </span>
              </div>
              <FormControl>
                <Textarea
                  className="min-h-32 rounded-xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 text-sm leading-relaxed resize-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  placeholder="Share your experience with this product..."
                  maxLength={600}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-brand hover:bg-brand-hover text-white font-bold text-sm uppercase tracking-wider rounded-full py-3.5 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </button>

        {isError && (
          <p className="text-red-500 text-center text-sm">
            Submission failed: {String(error)}
          </p>
        )}
      </form>
    </Form>
  );
};

export default ReviewForm;
