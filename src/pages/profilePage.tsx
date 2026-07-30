import ProfileHero from "@/pageComponents/forProfilePage/profileHero/profileHero";
import ProfileTabs from "@/pageComponents/forProfilePage/profileTabs/profileTabs";
import { useTranslation } from "react-i18next";
import { useDocumentMeta } from "@/convenienceTools/useDocumentMeta";

const Profile = () => {
  const { t } = useTranslation();

  // Auth-guarded and personal — keep it out of search results.
  useDocumentMeta({ title: t("seo.profileTitle"), noindex: true });

  return (
    <>
      <ProfileHero />

      <div className="max-w-screen-lg 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 2xl:px-8 py-8 2xl:py-12 pb-20 2xl:pb-28 min-h-96">
        <ProfileTabs />
      </div>
    </>
  );
};

export default Profile;
