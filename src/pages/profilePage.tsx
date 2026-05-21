import ProfileHero from "@/pageComponents/forProfilePage/ProfileHero/profileHero";
import ProfileTabs from "@/pageComponents/forProfilePage/profileTabs/profileTabs";

const Profile = () => {
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
