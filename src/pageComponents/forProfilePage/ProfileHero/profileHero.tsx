import { Avatar, AvatarFallback } from "@/componentsShadcn/ui/avatar";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useSignOut } from "@/reactQuery/mutations/auth/signOut";
import { useUploadAvatar } from "@/reactQuery/mutations/profile";
import { AvatarImage } from "@/componentsShadcn/ui/avatar";
import { LogOut, Camera, MapPin } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ProfileHero = () => {
  const { t } = useTranslation();
  const { user, profileData } = useAuthContext();
  const { mutate: logout } = useSignOut();
  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    if (!file.type.startsWith("image/")) {
      toast.error(t("profile.selectImage"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("profile.imageTooLarge"));
      return;
    }

    uploadAvatar(
      { userId: user.id, file },
      {
        onSuccess: () => toast.success(t("profile.avatarUpdated")),
        onError: () => toast.error(t("profile.avatarFailed")),
      },
    );

    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="relative bg-neutral-950 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />
      {/* Crosshatch pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.384l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656L40.2 36.485l1.415 1.413L60 19.514v-2.83zm0 5.657L43.03 39.313l1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.414 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.414 1.415L30 6.486l9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.142l7.07 7.07zm-2.827 2.83l1.414-1.415L30 14.97l-5.657 5.657 1.414 1.414L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-screen-lg 2xl:max-w-[1400px] mx-auto px-6 sm:px-10 2xl:px-16 py-12 sm:py-16 2xl:py-20">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 2xl:gap-12">
          {/* Avatar with edit overlay */}
          <div className="relative group">
            <Avatar className="w-28 h-28 sm:w-32 sm:h-32 2xl:w-44 2xl:h-44 ring-4 ring-neutral-800 group-hover:ring-brand/50 transition-all duration-300">
              <AvatarImage
                src={profileData?.avatar_url}
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="bg-neutral-800 text-white text-3xl 2xl:text-5xl font-bold">
                {profileData?.full_name_en?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            {/* Edit overlay */}
            <button
              onClick={handleAvatarClick}
              disabled={isUploading}
              className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1">
                <Camera className="w-5 h-5 2xl:w-7 2xl:h-7 text-white" />
                <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
                  {isUploading ? t("profile.uploading") : t("profile.edit")}
                </span>
              </div>
            </button>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-black uppercase tracking-tight">
              {profileData?.full_name_en || "User"}
            </h1>
            {profileData?.username && (
              <p className="text-neutral-500 text-sm 2xl:text-base mt-1">
                @{profileData.username}
              </p>
            )}
            {profileData?.address && (
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-neutral-500" />
                <span className="text-sm 2xl:text-base text-neutral-400">
                  {profileData.address}
                </span>
              </div>
            )}
          </div>

          {/* Sign out */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 2xl:px-8 py-2.5 2xl:py-3 rounded-full bg-surface border border-neutral-700 text-sm 2xl:text-base font-semibold text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 2xl:w-5 2xl:h-5" />
            {t("nav.signOut")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
