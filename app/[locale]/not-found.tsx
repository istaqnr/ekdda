import React from "react";

import { AbstractIntlMessages } from "next-intl";
import { getMessages } from "@/i18n/request";

interface CustomMessages extends AbstractIntlMessages {
  INDEX: {
    PAGE_NOT_FOUND: string;
  };
}
const NotFound = async () => {
  const messages = (await getMessages("el")) as CustomMessages;
  const notFoundLabel =
    messages?.INDEX?.PAGE_NOT_FOUND ||
    "The content you are looking for does not exist.";

  return (
    <div className="min-h-[400px] h-full flex items-center justify-center bg-white font-sans p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center max-w-lg w-full transform transition-all duration-300 hover:scale-105">
        {/* Page Not Found Header */}
        <h2 className="text-6xl font-extrabold text-slate-700 leading-none mb-4">
          404
        </h2>
        <div className="text-3xl sm:text-3xl font-bold text-slate-500  mb-6">
          Page Not Found
        </div>
        {/* Description */}
        <p className="text-sm text-slate-700  mb-8 leading-relaxed">
          {notFoundLabel}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
