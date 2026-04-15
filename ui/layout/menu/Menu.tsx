"use client";

import React, { useState } from "react";
import { useGlobalStore } from "@/store/globalStore";

import MenuOptions from "./MenuOptions";
import { getMenuOptions } from "./options";

export interface MenuItemType {
  id: any;
  type: "folder" | "link";
  label: string;
  children?: MenuItemType[];
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface Props {
  isMobile: boolean;
}
export const Menu = ({ isMobile }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { mobileMenuOpen, setMobileMenuOpen } = useGlobalStore();

  const options = getMenuOptions();

  const filterMenu = (
    menuOptions: MenuItemType[],
    keyword: string
  ): MenuItemType[] => {
    return menuOptions
      .map((option) => {
        const labelMatches = option?.label
          .toLowerCase()
          .includes(keyword.toLowerCase());

        if (option.type === "link") {
          return labelMatches ? option : null;
        }

        if (option.type === "folder") {
          // Case 1: Folder label matches → keep everything inside
          if (labelMatches) return option;

          // Case 2: Check children recursively
          const filteredChildren = filterMenu(option?.children ?? [], keyword);
          if (filteredChildren?.length > 0) {
            return { ...option, children: filteredChildren };
          }
        }

        return null;
      })
      .filter(Boolean) as MenuItemType[];
  };

  const filteredMenuOptions =
    searchKeyword.trim() === "" ? options : filterMenu(options, searchKeyword);

  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        )}
        {/* Menu Panel */}
        <div
          className={`fixed left-0 h-[calc(100vh-80px)] overflow-auto pb-5 bg-white w-full rounded-xl z-50 pt-3 flex flex-col gap-2 transition-all duration-500 select-none ${
            mobileMenuOpen ? "bottom-0" : "bottom-[-100%]"
          }`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="block md:hidden text-lg font-bold text-center">
            Μενού
          </div>
          {filteredMenuOptions?.length > 0 ? (
            <MenuOptions
              key="base"
              isMobile={isMobile}
              menuOptions={filteredMenuOptions}
              searchKeyword={searchKeyword}
              level={0}
            />
          ) : (
            <div className="text-sm px-5">Δεν βρέθηκαν επιλογές</div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-slate-100 flex flex-col z-10 h-full justify-between overflow-x-hidden overflow-y-scroll custom-scroll">
        <div className="bg-slate-100 pt-3 flex flex-col gap-2 h-full transition-all duration-500 select-none">
          {/* <div
        className="text-xl font-semibold text-primary truncate flex items-center"
        style={{ height: 35 }}
      >
        <div>Αναζήτηση Μενού</div>
      </div> */}
          {/* <InputText
        name="menuSearch"
        placeholder="Αναζήτηση στο menu"
        stateLessValue={searchKeyword}
        onChange={(nv: string) => setSearchKeyword(nv)}
        height={30}
      /> */}
          {filteredMenuOptions?.length > 0 ? (
            <MenuOptions
              key="base"
              isMobile={isMobile}
              menuOptions={filteredMenuOptions}
              searchKeyword={searchKeyword}
              level={0}
            />
          ) : (
            <div className="text-sm">Δεν βρέθηκαν επιλογές</div>
          )}
        </div>
      </div>
      <div style={{ height: 5 }} className="bg-white w-full " />
    </>
  );
};
