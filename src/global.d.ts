import en from "./libs/i18n/locales/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
