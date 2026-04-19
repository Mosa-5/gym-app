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
import { useRegister } from "@/reactQuery/mutations/auth/register";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
        <p className="font-semibold text-lg">{t("auth.signingUp")}</p>
      </div>
    );
  }

  return (
    <div className={cardClass()}>
      <h1 className={headingClass()}>{t("auth.register")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={formClass()}>
          {isError && (
            <p className="text-red-500 text-sm text-center">
              {t("auth.signUpFailed")} {String(error)}
            </p>
          )}
          <div className={fieldsClass()}>
            <FormField
              control={form.control}
              name="fullNameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass()}>
                    {t("auth.fullNameEn")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("auth.fullNameEnPlaceholder")}
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
                  <FormLabel className={labelClass()}>
                    {t("auth.fullNameKa")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("auth.fullNameKaPlaceholder")}
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
                      autoComplete="new-password"
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
          <Button type="submit" className={submitButtonClass()}>
            {t("auth.register")}
          </Button>
          <div className="flex justify-center gap-2">
            <span className={descriptionTextClass()}>
              {t("auth.haveAccount")}
            </span>
            <Link to="/auth/signin">
              <span className={descriptionLinkClass()}>{t("auth.logIn")}</span>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
