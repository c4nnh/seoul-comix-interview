import { setLocale } from "@/services/locale";
import { Locale } from "@/types/locale";
import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function LanguageSelector() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <Select value={locale} onValueChange={setLocale}>
      <SelectTrigger className="w-fit gap-1 border-none px-0 shadow-none focus:border-none">
        <SelectValue placeholder={t("language.select")}>
          <img
            src={getFlagUrlByLocale(locale as Locale)}
            className="h-4 w-7 sm:h-6 sm:w-9"
            alt={locale}
          />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t("language.english")}</SelectItem>
        <SelectItem value="ko">{t("language.korean")}</SelectItem>
      </SelectContent>
    </Select>
  );
}

function getFlagUrlByLocale(language: Locale) {
  switch (language) {
    case "en": {
      return "/images/flags/united-kingdom.png";
    }
    case "ko": {
      return "/images/flags/korean.png";
    }
  }
}
