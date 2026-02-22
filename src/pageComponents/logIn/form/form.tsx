import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/componentsShadcn/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/componentsShadcn/ui/form";
import { Input } from "@/componentsShadcn/ui/input";
import { useSignIn } from "@/reactQuery/mutations/auth/signIn";
import { Link } from "react-router-dom";
import { useGuestSignIn } from "@/reactQuery/mutations/auth/signIn";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .nonempty({ message: "Password is required" }),
});

const FormElement = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isError, error, isPending } = useSignIn();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }
  const { mutate: guestLogin, isPending: isGuestPending } = useGuestSignIn();

  function onGuest() {
    guestLogin();
  }

  if (isPending || isGuestPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-brand">
        <div className="lds-circle">
          <div></div>
        </div>
        <p className="font-semibold text-lg">Signing you in...</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm m-auto rounded-2xl p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col items-center w-full">
      <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-6">
        Log In
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-6 max-w-xs *:w-full px-2 w-full dark:text-white"
        >
          {isError && (
            <p className="text-red-500 text-sm text-center">
              Login failed: {String(error)}
            </p>
          )}
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="something@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="something" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="bg-brand hover:bg-brand-hover text-white font-bold uppercase tracking-wider rounded-full"
            >
              Log In
            </Button>
            <Button
              variant="outline"
              className="rounded-full font-semibold"
              onClick={(e) => {
                e.preventDefault();
                return onGuest();
              }}
            >
              Guest Account
            </Button>
          </div>
          <FormDescription>
            <div className="flex justify-center gap-2">
              <h1 className="text-sm text-gray-600 dark:text-gray-500">
                Don't have an account?
              </h1>
              <Link to={"/auth/register"}>
                <h1 className="text-sm text-brand font-semibold hover:underline cursor-pointer">
                  Register
                </h1>
              </Link>
            </div>
          </FormDescription>
        </form>
      </Form>
    </div>
  );
};

export default FormElement;
