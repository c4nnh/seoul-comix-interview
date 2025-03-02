import { cn } from "@/app/_libs/classnames";
import { useTranslations } from "next-intl";
import { IconFilledHeart } from "../../icons/filled-heart";
import { IconHeart } from "../../icons/heart";
import { Button } from "../../ui/button";

type Props = {
  restaurantId: string;
  isFavorite: boolean;
};

export function AddFavorite({ restaurantId, isFavorite }: Props) {
  const t = useTranslations();

  return (
    <Button
      className={cn(
        "absolute right-2 top-2 z-[1000] flex h-8 w-8 items-center justify-center rounded-full bg-black/50 p-2 text-white",
      )}
      variant="ghost"
      title={isFavorite ? t("favorite.remove") : t("favorite.add")}
    >
      {isFavorite ? <IconFilledHeart /> : <IconHeart />}
    </Button>
  );
}
