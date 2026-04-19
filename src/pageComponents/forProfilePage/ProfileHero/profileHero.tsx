import { Avatar, AvatarFallback } from "@/componentsShadcn/ui/avatar";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useSignOut } from "@/reactQuery/mutations/auth/signOut";
import { useUploadAvatar } from "@/reactQuery/mutations/profile";
import { AvatarImage } from "@/componentsShadcn/ui/avatar";
import { LogOut, Camera, MapPin } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { crosshatchPattern } from '@/lib/crosshatchPattern';

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
          backgroundImage: crosshatchPattern,
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
