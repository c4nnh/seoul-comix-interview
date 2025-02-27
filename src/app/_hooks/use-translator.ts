import { ErrorCode } from "@/types/error";

export function useTranslator() {
  // TODO: use i18next or another library for translations
  function translate(key?: string) {
    if (!key) {
      return "";
    }

    switch (key) {
      case ErrorCode.NOT_EMPTY:
        return "Please fill this field";
      case ErrorCode.INVALID_CREDENTIALS:
        return "Username or password is incorrect";
      case ErrorCode.INTERNAL_SEVERAL_ERROR:
        return "Something went wrong. Please try again later";
      default:
        return key;
    }
  }

  return { translate };
}
