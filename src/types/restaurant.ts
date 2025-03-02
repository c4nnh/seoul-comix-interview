import { Restaurant as PRestaurant } from "@prisma/client";

export type Restaurant = PRestaurant & {
  isFavorite: boolean;
};
