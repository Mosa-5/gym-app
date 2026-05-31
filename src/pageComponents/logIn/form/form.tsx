import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/componentsShadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/componentsShadcn/ui/form";
import { Input } from "@/componentsShadcn/ui/input";
import { useSignIn, useGuestSignIn } from "@/reactQuery/mutations/auth/signIn";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  cardClass,
  headingClass,
  formClass,
  fieldsClass,
  inputClass,
  labelClass,
  submitButtonClass,
  guestButtonClass,
  descriptionTextClass,
  descriptionLinkClass,
} from "./form.styles";

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
  const { t } = useTranslation();
  const location = useLocation();

  // Where the user was headed before being bounced to sign-in (set by the
  // auth guard); fall back to home when they came here directly.
  const from = location.state?.from
    ? location.state.from.pathname + location.state.from.search
    : "/dashboard/main";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isError, error, isPending } = useSignIn(from);
  const { mutate: guestLogin, isPending: isGuestPending } =
    useGuestSignIn(from);

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }

  function onGuest() {
    guestLogin();
  }

  if (isPending || isGuestPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-brand">
        <div className="lds-circle">
          <div></div>
        </div>
        <p className="font-semibold text-lg">{t("auth.signingIn")}</p>
      </div>
    );
  }

  return (
    <div className={cardClass()}>
      <h1 className={headingClass()}>{t("auth.logIn")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={formClass()}>
          {isError && (
            <p className="text-red-500 text-sm text-center">
              {t("auth.loginFailed")} {String(error)}
            </p>
          )}
          <div className={fieldsClass()}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass()}>
                    {t("auth.email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="username"
                      placeholder={t("auth.emailPlaceholder")}
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
                  <FormLabel className={labelClass()}>
                    {t("auth.password")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder={t("auth.passwordPlaceholder")}
                      className={inputClass()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" className={submitButtonClass()}>
              {t("auth.logIn")}
            </Button>
            <Button
              variant="outline"
              className={guestButtonClass()}
              onClick={(e) => {
                e.preventDefault();
                return onGuest();
              }}
            >
              {t("auth.guestAccount")}
            </Button>
          </div>
          <div className="flex justify-center gap-2">
            <span className={descriptionTextClass()}>
              {t("auth.noAccount")}
            </span>
            <Link to="/auth/register">
              <span className={descriptionLinkClass()}>
                {t("auth.register")}
              </span>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormElement;
