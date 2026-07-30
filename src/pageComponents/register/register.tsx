import RegisterForm from "./form/form";
import { useTranslation } from "react-i18next";
import { useDocumentMeta } from "@/convenienceTools/useDocumentMeta";

const Register = () => {
  const { t } = useTranslation();

  // Nothing here for search to index.
  useDocumentMeta({ title: t("seo.registerTitle"), noindex: true });

  return (
    <div className="px-6">
      <RegisterForm />
    </div>
  );
};

export default Register;
