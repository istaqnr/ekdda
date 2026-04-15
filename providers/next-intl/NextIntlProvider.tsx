"use client";

import { NextIntlClientProvider, IntlErrorCode, IntlError } from "next-intl";
import { ReactNode } from "react";
import { i18nConfig } from "./config";

interface Props {
   locale: string;
   messages: Record<string, any>;
   children: ReactNode;
}

export default function NextIntlProvider({ locale, messages, children }: Props) {
   const onError = (error: IntlError) => {
      if (error.code !== IntlErrorCode.MISSING_MESSAGE) {
         // You can integrate error tracking here
         console.error("Intl error:", error);
      }
   };

   const getMessageFallback = ({ namespace, key, error }: any) => {
      const path = [namespace, key].filter(Boolean).join(".");
      return error.code === IntlErrorCode.MISSING_MESSAGE
         ? `${path} is not yet translated`
         : `Fix this message: ${path}`;
   };

   return (
      <NextIntlClientProvider
         messages={messages}
         locale={locale}
         onError={onError}
         getMessageFallback={getMessageFallback}
         timeZone={i18nConfig.timeZone}
      >
         {children}
      </NextIntlClientProvider>
   );
}
