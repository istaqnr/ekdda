"use client";

import React, { useState } from "react";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import MenuOptions from "./MenuOptions";
import { MenuItemType } from "./Menu";
import { useLocalStore } from "@/store/localStore";
import { useGlobalStore } from "@/store/globalStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  menuItem: MenuItemType;
  level: number;
  searchKeyword: string;
  isMobile: boolean;
}

const MenuItem = ({ menuItem, level, searchKeyword, isMobile }: Props) => {
  const { menuHref, setMenuHref } = useLocalStore();
  const { setMobileMenuOpen } = useGlobalStore();
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = menuItem.type === "folder";
  const router = useRouter();
  const openMenuItem = (href: string) => {
    setMenuHref(href);
    if (isFolder && menuItem.children?.length) {
      setIsOpen((prev) => !prev);
      href && href !== window.location.href && router.push(href);
    } else if (isMobile) {
      // Close mobile menu when clicking on a link
      setMobileMenuOpen(false);
    }
  };
  const isActiveHref = menuHref === `${menuItem.href}`;

  const MenuItemContent = () => (
    <div
      style={{ paddingLeft: `${level * 20 + 20}px` }}
      className={`flex items-center gap-1 min-w-0 w-full h-[40px] group ${
        isMobile ? "hover:bg-slate-100" : "hover:bg-custom-white"
      } ${isActiveHref ? "bg-slate-200" : ""}`}
      onClick={() => openMenuItem(menuItem?.href || "")}
    >
      <div
        style={{ width: 24, height: 24 }}
        className="flex items-center justify-center flex-shrink-0"
      >
        {menuItem.icon && (
          <menuItem.icon className="transition-transform group-hover:scale-110 text-[16px] duration-200" />
        )}
      </div>
      <div
        className={`truncate flex-grow min-w-0 ${
          level === 0 ? "font-bold" : ""
        }`}
      >
        {menuItem.label}
      </div>
      <div
        style={{ width: 24, height: 24 }}
        className="flex items-center justify-center shrink-0"
      >
        {isFolder &&
          (isOpen ? (
            <KeyboardArrowDownIcon className="cursor-pointer transition-transform group-hover:scale-110 duration-200" />
          ) : (
            <KeyboardArrowLeftIcon className="cursor-pointer transition-transform group-hover:scale-110 duration-200" />
          ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* <ConditionalHtmlTooltipWrapper
        placement="right"
        tooltip={
          isMobile ? null : <div className="text-base">{menuItem.label}</div>
        }
      > */}
      {isFolder ? (
        React.createElement(MenuItemContent)
      ) : (
        <Link href={menuItem.href}>{React.createElement(MenuItemContent)}</Link>
      )}
      {/* </ConditionalHtmlTooltipWrapper> */}

      {/* Render children for folders */}
      {isFolder && (
        <div
          className={`transition-all z-0 duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[1000px]" : "max-h-0"
          } ${!isFolder && isActiveHref ? "bg-gray-200" : ""}`}
        >
          <MenuOptions
            menuOptions={menuItem.children || []}
            level={level + 1}
            searchKeyword={searchKeyword}
            isMobile={isMobile}
          />
        </div>
      )}
    </div>
  );
};

export default MenuItem;
