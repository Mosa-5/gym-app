import { Button } from "@/componentsShadcn/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../componentsShadcn/ui/sheet";
import LanguageChanger from "../language/language";
import ThemeToggle from "@/componentsShadcn/theme/themeButton/mode-toggle";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/componentsShadcn/ui/avatar";
import { Menu as MenuIcon } from "lucide-react";

const Menu = () => {
  const { user, profileData } = useAuthContext();

  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger className="p-1.5 rounded-md hover:bg-neutral-800 transition-colors">
          <MenuIcon className="w-5 h-5 text-neutral-300" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-full dark:text-white bg-neutral-950 border-neutral-800"
        >
          <SheetHeader className="mt-8">
            <SheetTitle className="text-center text-2xl font-black uppercase tracking-tight border-b border-neutral-800 pb-4">
              <span className="text-white">Gym</span>
              <span className="text-brand">Gear</span>
            </SheetTitle>

            <nav className="flex flex-col gap-1 pt-4">
              <SheetClose asChild>
                <Link
                  to="/dashboard/main"
                  className="text-base font-semibold uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-800/50 px-4 py-4 rounded-md transition-colors"
                >
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/dashboard/products"
                  className="text-base font-semibold uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-800/50 px-4 py-4 rounded-md transition-colors"
                >
                  Shop
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/dashboard/about"
                  className="text-base font-semibold uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-800/50 px-4 py-4 rounded-md transition-colors"
                >
                  About
                </Link>
              </SheetClose>
            </nav>

            <div className="border-t border-neutral-800 pt-4 mt-2">
              {user ? (
                <SheetClose asChild>
                  <Link
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-neutral-800/50 transition-colors"
                    to="/dashboard/profilePage"
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-brand/50">
                      <AvatarImage src={profileData?.avatar_url} />
                      <AvatarFallback className="bg-neutral-800 text-sm font-bold text-neutral-300">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-base font-semibold text-neutral-300">
                      My Profile
                    </span>
                  </Link>
                </SheetClose>
              ) : (
                <SheetClose asChild>
                  <Link className="w-full" to="/auth/signin">
                    <Button className="w-full text-base font-semibold uppercase tracking-wider py-6 bg-brand hover:bg-brand-hover">
                      Sign In
                    </Button>
                  </Link>
                </SheetClose>
              )}
            </div>

            <div className="flex items-center justify-between px-4 pt-4 border-t border-neutral-800 mt-2 [&_button]:scale-150">
              <LanguageChanger />
              <ThemeToggle />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Menu;
