import { Avatar, AvatarFallback } from "@/componentsShadcn/ui/avatar";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useSignOut } from "@/reactQuery/mutations/auth/signOut";
import { useUploadAvatar } from "@/reactQuery/mutations/profile";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, Camera, MapPin } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

const ProfileHero = () => {
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
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    uploadAvatar(
      { userId: user.id, file },
      {
        onSuccess: () => toast.success("Avatar updated!"),
        onError: () => toast.error("Failed to upload avatar"),
      },
    );

    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="relative bg-neutral-950 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />

      <div className="relative max-w-screen-lg mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* Avatar with edit overlay */}
          <div className="relative group">
            <Avatar className="w-28 h-28 sm:w-32 sm:h-32 ring-4 ring-neutral-800 group-hover:ring-brand/50 transition-all duration-300">
              <AvatarImage
                src={profileData?.avatar_url}
                className="object-cover"
              />
              <AvatarFallback className="bg-neutral-800 text-white text-3xl font-bold">
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
                <Camera className="w-5 h-5 text-white" />
                <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
                  {isUploading ? "Uploading..." : "Edit"}
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
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight">
              {profileData?.full_name_en || "User"}
            </h1>
            {profileData?.username && (
              <p className="text-neutral-500 text-sm mt-1">
                @{profileData.username}
              </p>
            )}
            {profileData?.address && (
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span className="text-sm text-neutral-400">
                  {profileData.address}
                </span>
              </div>
            )}
          </div>

          {/* Sign out */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-700 text-sm font-semibold text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
