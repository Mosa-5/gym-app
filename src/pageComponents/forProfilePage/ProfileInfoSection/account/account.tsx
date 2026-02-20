import { Button } from "@/componentsShadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/componentsShadcn/ui/card";
import { Input } from "@/componentsShadcn/ui/input";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
// import { useGetProfileInfo } from "@/reactQuery/query/profile";
// import { mapProfileTableData } from "@/supabase/account";
// import { FillProfileInfoPayload } from "@/supabase/account/index.types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  // FormDescription,
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
  avatar_url: z
    .string()
    .url({ message: "Invalid URL format for Picture URL." })
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

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...profileData,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user?.id) {
      return;
    }

    // Filter out empty values
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== ""),
    );

    const updatedValues = {
      ...profileData, // Use the original profile data as defaults
      ...filteredValues, // Overwrite with submitted values that are not empty
    };

    fillProfileInfo({ values: updatedValues, id: user?.id });
  }

  return (
    <Card className="border-none shadow-none bg-transparent dark:bg-transparent dark:border-neutral-800 text-center sm:text-start flex flex-col *:w-full items-center sm:items-start">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:flex-nowrap w-full sm:gap-20">
              <div className="space-y-1 w-full min-w-sm max-w-sm">
                <FormField
                  control={form.control}
                  name="full_name_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name En</FormLabel>
                      <FormControl>
                        <Input
                          id="Full_Name_En"
                          placeholder={profileData.full_name_en}
                          {...field}
                          className="bg-white dark:bg-neutral-950"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1 w-full max-w-sm">
                <FormField
                  control={form.control}
                  name="full_name_ka"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name Ka</FormLabel>
                      <FormControl>
                        <Input
                          id="Full_Name_Ka"
                          placeholder={profileData.full_name_ka}
                          {...field}
                          className="bg-white dark:bg-neutral-950"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:flex-nowrap w-full sm:gap-20">
              <div className="space-y-1 max-w-sm w-full">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder={profileData.username}
                          {...field}
                          className="bg-white dark:bg-neutral-950"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1 max-w-sm w-full">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          id="phone_number"
                          placeholder={profileData.phone_number}
                          {...field}
                          className="bg-white dark:bg-neutral-950"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:flex-nowrap w-full sm:gap-20">
              <div className="space-y-1 max-w-sm w-full">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          id="address"
                          placeholder={profileData.address}
                          {...field}
                          className="bg-white dark:bg-neutral-950"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1 max-w-sm w-full">
                <FormField
                  control={form.control}
                  name="avatar_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar URL</FormLabel>
                      <FormControl>
                        <Input
                          id="avatar_url"
                          placeholder={profileData.avatar_url}
                          {...field}
                          className="bg-white dark:bg-neutral-950"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="max-w-sm m-auto sm:m-0 w-full sm:max-w-40"
            >
              Update Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Account;
