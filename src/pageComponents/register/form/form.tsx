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
import {
  cardClass,
  headingClass,
  formClass,
  fieldsClass,
  inputClass,
  labelClass,
  submitButtonClass,
  descriptionTextClass,
  descriptionLinkClass,
} from "./form.styles";

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    register(values);
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-brand">
        <div className="lds-circle">
          <div></div>
        </div>
        <p className="font-semibold text-lg">Signing you up...</p>
      </div>
    );
  }

  return (
    <div className={cardClass()}>
      <h1 className={headingClass()}>Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={formClass()}>
          {isError && (
            <p className="text-red-500 text-sm text-center">
              Sign Up failed: {String(error)}
            </p>
          )}
          <div className={fieldsClass()}>
            <FormField
              control={form.control}
              name="fullNameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass()}>Full Name En</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      className={inputClass()}
                      {...field}
                    />
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
                  <FormLabel className={labelClass()}>Full Name Ka</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      className={inputClass()}
                      {...field}
                    />
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
                  <FormLabel className={labelClass()}>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="something@gmail.com"
                      className={inputClass()}
                      {...field}
                    />
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
                  <FormLabel className={labelClass()}>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="something"
                      className={inputClass()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className={submitButtonClass()}>
            Register
          </Button>
          <FormDescription>
            <div className="flex justify-center gap-2">
              <span className={descriptionTextClass()}>
                Already have an account?
              </span>
              <Link to="/auth/signin">
                <span className={descriptionLinkClass()}>Log In</span>
              </Link>
            </div>
          </FormDescription>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
