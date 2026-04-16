import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useGlobalStore } from "@/store/globalStore";
import UserProfileInfo from "@/ui/layout/Profile";
import HelpCommunication from "@/ui/layout/HelpCommunication";
import LanguageSwitcher from "@/ui/layout/LanguageSwitcher";

interface Props {
  isMobile: boolean;
}

export const AppToolbarIcons = ({ isMobile }: Props) => {
  const { mobileMenuOpen, setMobileMenuOpen } = useGlobalStore();
  return (
    <div className="flex gap-4">
      <LanguageSwitcher />
      <HelpCommunication />
      <UserProfileInfo />

      {isMobile && (
        <MenuIcon
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white text-3xl! cursor-pointer md:hidden mr-3"
        />
      )}
    </div>
  );
};
