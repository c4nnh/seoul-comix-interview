"use client";

import { cn } from "@/app/_libs/classnames";
import { useRestaurantStore } from "@/app/_stores/restaurant";
import { trpc } from "@/trpc/client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useState } from "react";
import { IconFilledHeart } from "../../icons/filled-heart";
import { IconHeart } from "../../icons/heart";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

type Props = {
  restaurantId: string;
  isFavorite: boolean;
};

export function AddFavorite({ restaurantId, isFavorite }: Props) {
  const t = useTranslations();
  const trpcUtils = trpc.useUtils();
  const { data: session } = useSession();
  const { filter } = useRestaurantStore();
  const [open, setOpen] = useState(false);
  const addFavoriteMutation = trpc.restaurant.addFavorite.useMutation({
    onSuccess: async () => {
      await trpcUtils.restaurant.getRestaurants.invalidate(filter);
    },
  });
  const removeFavoriteMutation = trpc.restaurant.removeFavorite.useMutation({
    onSuccess: async () => {
      await trpcUtils.restaurant.getRestaurants.invalidate(filter);
    },
  });

  function handleAddFavorite() {
    if (!session) {
      setOpen(true);
      return;
    }

    if (removeFavoriteMutation.isPending || addFavoriteMutation.isPending) {
      return;
    }

    if (isFavorite) {
      removeFavoriteMutation.mutate({
        restaurantId,
      });
    } else {
      addFavoriteMutation.mutate({
        restaurantId,
      });
    }
  }

  return (
    <>
      <Button
        className={cn(
          "absolute right-2 top-2 z-[1000] flex h-8 w-8 items-center justify-center rounded-full p-2 text-white",
          isFavorite ? "bg-white" : "bg-black/50",
        )}
        variant="ghost"
        title={isFavorite ? t("favorite.remove") : t("favorite.add")}
        onClick={handleAddFavorite}
        disabled={
          removeFavoriteMutation.isPending || addFavoriteMutation.isPending
        }
      >
        {isFavorite ? (
          <IconFilledHeart className="text-primary" />
        ) : (
          <IconHeart />
        )}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("auth.confirmLogin")}</DialogTitle>
          </DialogHeader>
          <DialogFooter className="mt-4 !justify-between">
            <DialogClose asChild>
              <Button variant="outline">{t("common.cancel")}</Button>
            </DialogClose>
            <Button onClick={() => redirect("/login")}>
              {t("auth.login")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
