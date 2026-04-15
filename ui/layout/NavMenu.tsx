"use client";

import Image from "next/image";
import Link from "next/link";

import { useGlobalStore } from "@/store/globalStore";
import { useAuthStore } from "@/store/authStore";
import { Menu } from "./menu/Menu";

interface Props {
  isMobile: boolean;
  sideMenuWidth: number;
}

const NavMenu = ({ isMobile, sideMenuWidth }: Props) => {
  const { sidebarOpen } = useGlobalStore();
  const { auth } = useAuthStore();

  // On mobile, render the mobile menu separately
  if (isMobile) {
    return auth ? <Menu isMobile={isMobile} /> : null;
  }

  // Desktop sidebar
  return (
    <div style={{ zIndex: 50 }} className="flex relative h-full">
      {auth && (
        <div
          style={{
            width: auth && sidebarOpen ? `${sideMenuWidth}px` : 0,
            opacity: auth && sidebarOpen ? 1 : 0,
          }}
          className="overflow-hidden transition-all duration-500 flex flex-col justify-start bg-white relative h-full"
        >
          <Menu isMobile={false} />
          <div className="h-[80px] min-h-[80px] hidden md:flex items-center bg-gray-100 justify-center relative w-[330px]">
            <Link href="https://www.era.europa.eu/" target="_blank">
              {/* <h3 className="font-serif text-white text-2xl"> OSE logo here</h3> */}
              <Image
                style={{ width: 100 }}
                className="duration-500 transition-all hover:scale-110"
                src="/el/QNR.png"
                alt="QnR logo"
                width={100}
                height={50}
                unoptimized
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMenu;
