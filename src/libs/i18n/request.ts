import { getLocale } from "@/services/locale";
import { Todo } from "@/types/common";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = await getLocale();

  return {
    locale,
    messages: ((await import(`./locales/${locale}.json`)) as { default: Todo })
      .default,
  };
});
