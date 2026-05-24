import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/componentsShadcn/ui/tabs";
import { User, Package, Heart, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import Account from "@/pageComponents/forProfilePage/ProfileInfoSection/account/account";
import Orders from "@/pageComponents/forProfilePage/ProfileInfoSection/orders/orders";
import Wishlist from "@/pageComponents/forProfilePage/ProfileInfoSection/wishlist/wishlist";
import PersonalReviews from "@/pageComponents/forProfilePage/ProfileInfoSection/personalReviews/personalReviews";
import {
  tabsListClass,
  tabTriggerClass,
  tabContentWrapperClass,
} from "./profileTabs.styles";

const TABS = [
  {
    value: "account",
    icon: User,
    labelKey: "profile.account",
    Content: Account,
  },
  {
    value: "orders",
    icon: Package,
    labelKey: "profile.orders",
    Content: Orders,
  },
  {
    value: "wishlist",
    icon: Heart,
    labelKey: "profile.wishlist",
    Content: Wishlist,
  },
  {
    value: "reviews",
    icon: MessageSquare,
    labelKey: "profile.reviewsTab",
    Content: PersonalReviews,
  },
] as const;

const ProfileTabs = () => {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className={tabsListClass()}>
        {TABS.map(({ value, icon: Icon, labelKey }) => (
          <TabsTrigger key={value} value={value} className={tabTriggerClass()}>
            <Icon className="w-4 h-4 2xl:w-5 2xl:h-5" />
            <span className="hidden sm:inline">{t(labelKey)}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className={tabContentWrapperClass()}>
        {TABS.map(({ value, Content }) => (
          <TabsContent key={value} value={value}>
            <Content />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
