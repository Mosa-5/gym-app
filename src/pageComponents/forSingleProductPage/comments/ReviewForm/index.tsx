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
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
        className="flex flex-col gap-6 2xl:gap-8 w-full dark:text-white"
      >
        {/* Rating Field */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm 2xl:text-base font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {t("common.yourRating")}
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
                      <Star
                        className={`h-8 w-8 2xl:h-10 2xl:w-10 transition-colors ${
                          star <= currentRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-neutral-300 text-neutral-300 dark:fill-neutral-600 dark:text-neutral-600"
                        }`}
                      />
                    </button>
                  ))}
                  {currentRating > 0 && (
                    <span className="ml-2 text-sm 2xl:text-base font-bold text-neutral-900 dark:text-white">
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
                  {t("common.yourReview")}
                </FormLabel>
                <span className="text-xs 2xl:text-sm text-neutral-400">
                  {field.value.length}/600
                </span>
              </div>
              <FormControl>
                <Textarea
                  className="min-h-32 2xl:min-h-48 rounded-xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 text-sm 2xl:text-base leading-relaxed resize-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  placeholder={t("common.reviewPlaceholder")}
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
          className="w-full bg-brand hover:bg-brand-hover text-white font-bold text-sm 2xl:text-base uppercase tracking-wider rounded-full py-3.5 2xl:py-5 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? t("common.submitting") : t("common.submitReview")}
        </button>

        {isError && (
          <p className="text-red-500 text-center text-sm">
            {t("common.submissionFailed")} {String(error)}
          </p>
        )}
      </form>
    </Form>
  );
};

export default ReviewForm;
