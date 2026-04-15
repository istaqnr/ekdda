import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import NextIntlProvider from "@/providers/next-intl/NextIntlProvider";
import ThemeClientProvider from "@/providers/theme";
import ReactQueryProvider from "@/providers/react-query/ReactQueryProvider";
import MuiEmotionProvider from "@/providers/mui-emotion";
import { notFound } from "next/navigation";
import { i18nConfig } from "@/providers/next-intl/config";
import ClientLayout from "./ClientLayout";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import { getMessages } from "next-intl/server";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  if (locale === "el") {
    return {
      title: `ΟΣΕ`,
      description: "ΟΣΕ",
    };
  }
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientSessionProvider>
          <ReactQueryProvider>
            <MuiEmotionProvider>
              <ThemeClientProvider>
                <NextIntlProvider locale={locale} messages={messages}>
                  <ClientLayout>{children}</ClientLayout>
                </NextIntlProvider>
              </ThemeClientProvider>
            </MuiEmotionProvider>
          </ReactQueryProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
