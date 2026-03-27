import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/componentsShadcn/ui/tabs";
import ProfileHero from "@/pageComponents/forProfilePage/ProfileHero/profileHero";
import Account from "@/pageComponents/forProfilePage/ProfileInfoSection/account/account";
import Orders from "@/pageComponents/forProfilePage/ProfileInfoSection/orders/orders";
import Wishlist from "@/pageComponents/forProfilePage/ProfileInfoSection/whishlist/whishlist";
import PersonalReviews from "@/pageComponents/forProfilePage/ProfileInfoSection/personalReviews/personalReviews";
import { User, Package, Heart, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  return (
    <>
      <ProfileHero />

      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8 pb-20 min-h-96">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="flex w-full h-auto p-1 bg-neutral-100 dark:bg-neutral-900 rounded-full gap-1">
            <TabsTrigger
              value="account"
              className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm transition-all cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{t("profile.account")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm transition-all cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">{t("profile.orders")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">{t("profile.wishlist")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">
                {t("profile.reviewsTab")}
              </span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 min-h-[500px]">
            <TabsContent value="account">
              <Account />
            </TabsContent>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="wishlist">
              <Wishlist />
            </TabsContent>
            <TabsContent value="reviews">
              <PersonalReviews />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
