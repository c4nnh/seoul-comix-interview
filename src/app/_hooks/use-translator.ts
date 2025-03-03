import { ErrorCode } from "@/types/error";
import { useTranslations } from "next-intl";

export function useTranslator() {
  const t = useTranslations();

  function translate(key?: string) {
    if (!key) {
      return "";
    }

    switch (key) {
      case ErrorCode.NOT_EMPTY:
        return t("error.notEmpty");
      case ErrorCode.INVALID_CREDENTIALS:
        return t("error.invalidCredentials");
      case ErrorCode.INTERNAL_SEVER_ERROR:
        return t("error.internalServerError");
      default:
        return key;
    }
  }

  return { translate };
}
