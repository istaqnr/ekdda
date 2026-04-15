"use client";

import React, { useEffect, useLayoutEffect } from "react";
import { useGlobalStore } from "@/store/globalStore";
import { useAuthStore } from "@/store/authStore";
import NavMenu from "./NavMenu";
import Header from "./Header";
import { Footer } from "./Footer";
import "./globals.css";

const sideMenuWidth = 330;

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const { sidebarOpen, setWindowWidth, windowWidth } = useGlobalStore();
  const { auth } = useAuthStore();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth]);

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [setWindowWidth]);

  if (!windowWidth) return null;
  // if (!authHydrated) return null;

  const isMobile = windowWidth < 768;

  return (
    <main className="h-screen flex flex-col relative">
      {/* Continuous blue border line from top through entire layout */}
      {/* {auth && !isMobile && (
        <div
          className={`fixed top-0 bottom-0 w-[3px] bg-[#002E77] transition-[left] duration-500 ease-in-out z-200 pointer-events-none ${
            sidebarOpen ? "left-[327px]" : "left-0"
          }`}
        />
      )} */}
      <Header isMobile={isMobile} />
      <div className="flex flex-row flex-1 overflow-hidden border-t-5 border-white">
        <NavMenu isMobile={isMobile} sideMenuWidth={sideMenuWidth} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div
            id="app-scroll-container"
            className="bg-custom-white flex flex-col justify-between h-full custom-scroll overflow-y-scroll"
          >
            {/* overflow-y-scroll */}
            <div className="grow relative border-l-5 border-b-5  border-white ">
              {children}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
