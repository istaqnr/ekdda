import React from "react";
import Link from "next/link";
import { useGlobalStore } from "@/store/globalStore";
import { useLocalStore } from "@/store/localStore";
import { getCurrentApp, getTargetApp } from "./utils";

const CrossAppLink = ({
  href,
  children,
  disabled = false,
  hasApplication = false,
  isMobile = false,
  updateMenuHref = true,
}: {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
  hasApplication?: boolean;
  isMobile?: boolean;
  updateMenuHref?: boolean;
}) => {
  const { setMobileMenuOpen } = useGlobalStore();
  const { menuHref, setApplication, setMenuHref } = useLocalStore();

  const currentApp = getCurrentApp();
  const targetApp = getTargetApp({ href });
  // If navigating to a different app, use window.open for full page reload
  const isCrossApp = currentApp !== targetApp;

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    hasApplication && setApplication(targetApp);

    if (href) {
      window.open(href, "_self");
    }
  };
  const handleClick = ({ href }: { href: string }) => {
    if (updateMenuHref) {
      setMenuHref(href);
    }

    if (disabled) return;
    if (isMobile) setMobileMenuOpen(false);
  };
  const isActiveHref = updateMenuHref && menuHref === href;

  return (
    <div onClick={() => handleClick({ href })}>
      {disabled ? (
        children
      ) : isCrossApp ? (
        <a
          href={href}
          onClick={handleLinkClick}
          className={`flex items-center min-w-0 cursor-pointer rounded-full ${
            isActiveHref ? "bg-slate-200" : ""
          }`}
        >
          {children}
        </a>
      ) : (
        <Link
          href={`${href}`}
          className={`flex items-center min-w-0 rounded-full ${
            isActiveHref ? "bg-slate-200" : ""
          }`}
        >
          {children}
        </Link>
      )}
    </div>
  );
};

export default CrossAppLink;
