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

const Profile = () => {
  return (
    <>
      <ProfileHero />

      <div className="flex justify-center p-2 pb-20 min-h-96">
        <Tabs defaultValue="account" className="w-full max-w-screen-lg">
          <TabsList className="flex *:text-base *:p-3 flex-col gap-1 border-2 dark:border-neutral-800 *:w-full w-full h-fit sm:*:p-1 sm:p-1 sm:flex-row">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
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
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
