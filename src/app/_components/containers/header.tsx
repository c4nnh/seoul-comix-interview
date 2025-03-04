"use client";

import { useRestaurantStore } from "@/app/_stores/restaurant";
import { trpc } from "@/trpc/client";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
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
import { LanguageSelector } from "./language-selector";
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
            className="px-0 text-sm font-bold text-white hover:bg-transparent hover:text-white sm:text-base"
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
  const trpcUtils = trpc.useUtils();
  const { filter } = useRestaurantStore();

  async function handleLogout() {
    await signOut();
    trpcUtils.restaurant.getRestaurants.invalidate(filter);
  }

  return (
    <Dialog>
      <DialogTrigger className="text-sm font-bold text-white hover:text-white sm:text-base">
        {t("auth.logout")}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("auth.confirmLogout")}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-4 !justify-between">
          <DialogClose asChild>
            <Button variant="outline">{t("common.cancel")}</Button>
          </DialogClose>
          <Button onClick={handleLogout}>{t("auth.logout")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
