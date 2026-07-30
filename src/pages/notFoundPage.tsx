import { useTranslation } from "react-i18next";
import { useDocumentMeta } from "@/convenienceTools/useDocumentMeta";

const NotFound = () => {
  const { t } = useTranslation();

  // A 404 must never be indexed, whatever URL it was reached through.
  useDocumentMeta({ title: t("seo.notFoundTitle"), noindex: true });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-6 bg-white dark:bg-neutral-950">
      <h1 className="text-7xl 2xl:text-9xl max-w-fit font-semibold text-neutral-900 dark:text-white">
        404
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm 2xl:text-lg">
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/dashboard/main"
        className="px-6 2xl:px-10 py-2.5 2xl:py-4 bg-brand text-white text-sm 2xl:text-base font-semibold rounded-full hover:bg-brand-hover transition-colors"
      >
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
