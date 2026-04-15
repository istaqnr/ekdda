import Image from "next/image";
import Link from "next/link";
import { useGlobalStore } from "@/store/globalStore";
import { useAuthStore } from "@/store/authStore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { AppToolbarIcons } from "./AppToolbarIcons";
import { useState } from "react";

interface Props {
  isMobile: boolean;
}

const Header = ({ isMobile }: Props) => {
  const { sidebarOpen, setSidebarOpen } = useGlobalStore();
  const { auth } = useAuthStore();
  const [isHoveredToggleIcon, setIsHoveredToggleIcon] = useState(false);
  return (
    <div
      style={{ height: 80, minHeight: 80, maxHeight: 80, zIndex: 100 }}
      className="flex flex-1 justify-between z-50  bg-gray-100  md:pr-8 items-center relative w-full"
    >
      <div
        className={`relative w-[335px] flex h-20  items-center justify-center md:px-0 duration-500 transition-all ${
          sidebarOpen ? "border-white border-r-5" : "border-none"
        }`}
      >
        <div
          role="button"
          tabIndex={0}
          style={{
            width: 48,
            height: 48,
            top: 16,
            left: sidebarOpen ? 335 : 0,
            zIndex: 101,
            transition: "left 0.5s ease",
          }}
          className="absolute bg-gray-700 backdrop-blur-sm cursor-pointer text-white rounded-r-xl group hidden md:flex items-center justify-center border-l-2 border-gray-700 shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-500"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          onMouseEnter={() => setIsHoveredToggleIcon(true)}
          onMouseLeave={() => setIsHoveredToggleIcon(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSidebarOpen(!sidebarOpen);
            }
          }}
        >
          <KeyboardDoubleArrowLeftIcon
            style={{
              fontSize: "24px",
              transform: sidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
            }}
            className="duration-500 transition-all group-hover:scale-110"
          />
        </div>

        <Link href="https://www.qnr.com.gr/" target="_blank">
          <Image
            className="duration-500 transition-all hover:scale-110"
            width={80}
            height={100}
            src="/el/OSE-Logo.svg"
            alt="QnR logo"
            unoptimized
          />
        </Link>

        {!isMobile && auth && (
          <div
            style={{ width: 5 }}
            className={`${
              sidebarOpen
                ? isHoveredToggleIcon
                  ? "bg-secondary"
                  : "bg-white"
                : "bg-secondary"
            } md:block hidden cursor-pointer hover:bg-secondary duration-500`}
          />
        )}
      </div>

      <AppToolbarIcons isMobile={!!isMobile} />
    </div>
  );
};

export default Header;
