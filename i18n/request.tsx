import { getRequestConfig } from "next-intl/server";
import { IntlErrorCode } from "next-intl";
import { notFound } from "next/navigation";

const locales = ["en", "el"];

export async function getMessages(locale: string) {
  try {
    const messages = (await import(`@/locales/${locale}.json`)).default;
    return messages;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}`, error);
    return {};
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? "el";

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return {
    locale,
    messages,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.error(error);
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter(Boolean).join(".");
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return `${path} is not translated`;
      } else {
        return `Dear developer, please fix this message: ${path}`;
      }
    },
  };
});
