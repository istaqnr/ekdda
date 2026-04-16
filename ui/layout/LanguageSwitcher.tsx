"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const supportedLocales = ["el", "en"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

const getLocalizedPath = (pathname: string, targetLocale: SupportedLocale) => {
  const parts = pathname.split("/");
  if (parts.length > 1 && supportedLocales.includes(parts[1] as SupportedLocale)) {
    parts[1] = targetLocale;
    return parts.join("/") || `/${targetLocale}`;
  }

  return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
};

const LanguageSwitcher = () => {
  const t = useTranslations();
  const pathname = usePathname() || "/";

  const greekHref = getLocalizedPath(pathname, "el");
  const englishHref = getLocalizedPath(pathname, "en");
  const currentLocale = pathname.split("/")[1] === "en" ? "en" : "el";
  const currentFlag = currentLocale === "en" ? "🇬🇧" : "🇬🇷";
  const currentLabel =
    currentLocale === "en"
      ? t("MENU.LANGUAGE_ENGLISH")
      : t("MENU.LANGUAGE_GREEK");

  return (
    <details className="relative">
      <summary className="flex list-none cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-50">
        <span className="text-xl leading-none">{currentFlag}</span>
        <span className="hidden md:inline">{currentLabel}</span>
        <span className="text-xs text-slate-500">▼</span>
      </summary>

      <div className="absolute right-0 z-50 mt-1 min-w-[170px] overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
        <Link
          href={greekHref}
          aria-label={t("MENU.LANGUAGE_GREEK")}
          className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 ${
            currentLocale === "el" ? "bg-slate-100 font-medium" : ""
          }`}
        >
          <span className="text-2xl leading-none">🇬🇷</span>
          <span>{t("MENU.LANGUAGE_GREEK")}</span>
        </Link>
        <Link
          href={englishHref}
          aria-label={t("MENU.LANGUAGE_ENGLISH")}
          className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 ${
            currentLocale === "en" ? "bg-slate-100 font-medium" : ""
          }`}
        >
          <span className="text-2xl leading-none">🇬🇧</span>
          <span>{t("MENU.LANGUAGE_ENGLISH")}</span>
        </Link>
      </div>
    </details>
  );
};

export default LanguageSwitcher;
