import FormElement from "./form/form";
import { useTranslation } from "react-i18next";
import { useDocumentMeta } from "@/convenienceTools/useDocumentMeta";

const LogIn = () => {
  const { t } = useTranslation();

  // Nothing here for search to index.
  useDocumentMeta({ title: t("seo.signInTitle"), noindex: true });

  return (
    <div className="px-6">
      <FormElement />
    </div>
  );
};

export default LogIn;
