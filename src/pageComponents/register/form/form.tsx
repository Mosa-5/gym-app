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
import { useRegister } from "@/reactQuery/mutations/auth/register";
import { Link } from "react-router-dom";

const formSchema = z.object({
  fullNameEn: z.string().nonempty({ message: "First Name is required" }),
  fullNameKa: z.string().nonempty({ message: "Last Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .nonempty({ message: "Password is required" }),
});

const RegisterForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullNameEn: "",
      fullNameKa: "",
      email: "",
      password: "",
    },
  });

  const { mutate: register, isError, error, isPending } = useRegister();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    register(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col items-center space-y-6 max-w-xs *:w-full px-2 w-full dark:text-white"
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="fullNameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name En</FormLabel>
                  <FormControl>
                    <Input placeholder="rando1" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullNameKa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name Ka</FormLabel>
                  <FormControl>
                    <Input placeholder="randomadze" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
          <Button className="" type="submit">
            Register
          </Button>
          <FormDescription>
            <div className="flex justify-center gap-2">
              <h1 className="text-sm text-gray-600 dark:text-gray-500">
                Already have an account?
              </h1>
              <Link to="/auth/signin">
                <h1 className="text-sm text-brand font-semibold hover:underline cursor-pointer">
                  Log In
                </h1>
              </Link>
            </div>
          </FormDescription>
        </form>
      </Form>

      <div className="absolute top-2 w-full">
        {isError && (
          <p className="text-red-500">Sign Up failed: {String(error)}</p>
        )}
        {isPending && (
          <h1 className="m-auto text-brand font-semibold text-center text-lg">
            Signing you up...
          </h1>
        )}
      </div>
    </>
  );
};

export default RegisterForm;
