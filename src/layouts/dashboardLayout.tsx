import Footer from "@/pageComponents/footer/footer";
import Header from "@/pageComponents/header/header";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="relative bg-neutral-100 dark:bg-[#222222] w-full max-w-full overflow-x-hidden min-h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-0 left-8 md:left-16 w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-300 to-transparent dark:via-neutral-800/40" />
        <div className="absolute top-0 right-8 md:right-16 w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-300 to-transparent dark:via-neutral-800/40" />
        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-200 to-transparent dark:via-neutral-800/20 hidden lg:block" />
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-200 to-transparent dark:via-neutral-800/20 hidden lg:block" />

        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand/[0.04] rounded-full blur-3xl dark:bg-brand/[0.03]" />
      </div>

      <Header />

      <div className="relative mt-[65px] min-h-screen z-10">
        <Outlet />
      </div>
      <div className="relative">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
