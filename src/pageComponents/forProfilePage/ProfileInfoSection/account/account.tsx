import { Input } from "@/componentsShadcn/ui/input";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";

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

import { useFillProfile } from "@/reactQuery/mutations/profile";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(20, { message: "Username must not exceed 20 characters." })
    .optional()
    .or(z.literal("")),
  full_name_en: z
    .string()
    .min(2, { message: "Full Name En must be at least 2 characters." })
    .max(20, { message: "Full Name En must not exceed 20 characters." })
    .optional()
    .or(z.literal("")),
  full_name_ka: z
    .string()
    .min(2, { message: "Full Name Ka must be at least 2 characters." })
    .max(20, { message: "Full Name Ka must not exceed 20 characters." })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters." })
    .max(100, { message: "Address must not exceed 100 characters." })
    .optional()
    .or(z.literal("")),
  phone_number: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,20}$/, {
      message:
        "Phone number must be a valid format, e.g., '+1 (234) 567-8900' or '123456789'.",
    })
    .optional()
    .or(z.literal("")),
});

const Account = () => {
  const { user, profileData } = useAuthContext();

  const { mutate: fillProfileInfo } = useFillProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...profileData,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user?.id) {
      return;
    }

    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== ""),
    );

    const updatedValues = {
      ...profileData,
      ...filteredValues,
    };

    fillProfileInfo({ values: updatedValues, id: user?.id });
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
          Account Settings
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Update your personal information below.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              control={form.control}
              name="full_name_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Full Name (EN)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={profileData.full_name_en}
                      {...field}
                      className="rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="full_name_ka"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Full Name (KA)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={profileData.full_name_ka}
                      {...field}
                      className="rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={profileData.username}
                      {...field}
                      className="rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={profileData.phone_number}
                      {...field}
                      className="rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={profileData.address}
                      {...field}
                      className="rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-3 bg-brand hover:bg-brand-hover text-white font-bold text-sm uppercase tracking-wider rounded-full transition-colors duration-200 cursor-pointer"
          >
            Update Profile
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Account;
