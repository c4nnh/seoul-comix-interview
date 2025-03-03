"use client";

import { setLocale } from "@/services/locale";
import { Locale } from "@/types/locale";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { IconLogo } from "../icons/logo";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Image } from "../ui/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RestaurantSearch } from "./restaurant/search";

export function Header() {
  const t = useTranslations();
  const { data: session } = useSession();

  return (
    <div className="fixed left-0 top-0 z-[10000] flex h-12 w-full flex-row items-center justify-between gap-2 bg-primary px-4 sm:h-14">
      <div className="flex flex-row items-center gap-4">
        <IconLogo className="h-8 w-8 sm:h-10 sm:w-10" />
        <RestaurantSearch
          containerClassName="hidden sm:flex h-10 w-[400px]"
          className="h-9"
        />
      </div>
      <div className="flex flex-row items-center gap-4">
        <LanguageSelector />
        {session ? (
          <Logout />
        ) : (
          <Button
            variant="ghost"
            className="text-sm font-bold text-white hover:bg-transparent hover:text-white sm:text-base"
            onClick={() => redirect("/login")}
          >
            {t("auth.login")}
          </Button>
        )}
      </div>
    </div>
  );
}

function Logout() {
  const t = useTranslations();

  async function handleLogout() {
    await signOut();
  }

  return (
    <Dialog>
      <DialogTrigger className="text-sm font-bold text-white hover:text-white sm:text-base">
        {t("auth.logout")}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure that you want to logout?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-4 !justify-between">
          <DialogClose>
            <Button variant="outline" className="px-0">
              {t("common.cancel")}
            </Button>
          </DialogClose>
          <Button onClick={handleLogout}>{t("auth.logout")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LanguageSelector() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <Select value={locale} onValueChange={setLocale}>
      <SelectTrigger className="w-fit gap-1 border-none px-0 focus:border-none">
        <SelectValue placeholder={t("language.select")}>
          <Image
            src={getFlagUrlByLocale(locale as Locale)}
            className="h-4 w-6 sm:h-6 sm:w-8"
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
