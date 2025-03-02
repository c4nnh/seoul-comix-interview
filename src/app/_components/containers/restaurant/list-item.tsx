"use client";

import { getCategoryLabel } from "@/app/_utils/category";
import { Restaurant } from "@/types/restaurant";
import { useTranslations } from "next-intl";
import { ImageSlider } from "../../composites/image-slider";
import { IconFilledStar } from "../../icons/filled-star";
import { IconSparkles } from "../../icons/sparkles";
import { EllipsisText } from "../../ui/ellipsis-text";
import { AddFavorite } from "./add-favorite";

type Props = {
  restaurant: Restaurant;
};

export function RestaurantListItem({ restaurant }: Props) {
  const t = useTranslations();

  return (
    <div className="relative flex w-full flex-col sm:w-96 sm:rounded-b-2xl sm:shadow-lg">
      <AddFavorite
        restaurantId={restaurant.id}
        isFavorite={restaurant.isFavorite}
      />
      <ImageSlider
        images={restaurant.images}
        imageClassName="h-60"
        className="rounded-2xl sm:rounded-b-none"
      />
      <div className="flex flex-col sm:px-3 sm:pb-3">
        <div className="mt-3" />
        <span className="flex flex-row items-center gap-0.5 text-xs text-[#FF692E]">
          <IconSparkles /> {restaurant.featuredText}
        </span>
        <div className="mt-1" />
        <div className="flex flex-row items-center justify-between gap-2">
          <EllipsisText
            content={restaurant.name}
            className="truncate font-semibold text-[##344054]"
          />
          <span className="flex flex-row items-center gap-0.5 text-sm text-[#344054]">
            <IconFilledStar className="h-4 w-4 text-[#FDB022]" />
            {restaurant.rating || "-"}({restaurant.ratingCount})
          </span>
        </div>
        <div className="mt-1" />
        <EllipsisText
          content={restaurant.description}
          className="truncate text-sm text-[#475467]"
        />
        <div className="mt-1" />
        <span className="text-sm text-[#475467]">
          {getCategoryLabel(restaurant.category)} · {restaurant.priceFrom}~
          {restaurant.priceTo} {t("common.southKoreanWon")}
        </span>
      </div>
    </div>
  );
}
