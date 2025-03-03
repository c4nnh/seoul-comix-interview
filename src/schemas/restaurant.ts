import { RestaurantCategory } from "@prisma/client";
import { z } from "zod";
import { GetListBaseSchema } from "./common";

export const GetListRestaurantSchema = GetListBaseSchema.merge(
  z.object({
    category: z
      .enum([
        RestaurantCategory.SUSHI,
        RestaurantCategory.UNAGI,
        RestaurantCategory.TEMPURA,
        RestaurantCategory.TONKATSU,
        RestaurantCategory.YAKITORI,
        RestaurantCategory.SUKIYAKI,
        RestaurantCategory.SOBA,
        RestaurantCategory.RAMEN,
        RestaurantCategory.YAKISOBA,
        RestaurantCategory.OKONOMIYAKI,
        RestaurantCategory.DONBURI,
        RestaurantCategory.ODEN,
        RestaurantCategory.KAISEKI,
        RestaurantCategory.HAMBAGU,
        RestaurantCategory.TEPPANYAKI,
        RestaurantCategory.CURRY,
        RestaurantCategory.YAKINIKU,
        RestaurantCategory.NABE,
        RestaurantCategory.CAFE,
        RestaurantCategory.IZAKAYA,
        RestaurantCategory.OTHER,
      ])
      .optional(),
  }),
);

export const AddFavoriteSchema = z.object({
  restaurantId: z.string(),
});

export const RemoveFavoriteSchema = z.object({
  restaurantId: z.string(),
});
