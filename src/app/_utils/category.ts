import { RestaurantCategory } from "@prisma/client";
import { useTranslations } from "next-intl";

export function getCategoryLabel(category: RestaurantCategory) {
  const t = useTranslations();

  switch (category) {
    case RestaurantCategory.SUSHI:
      return t("restaurant.category.sushi");
    case RestaurantCategory.UNAGI:
      return t("restaurant.category.unagi");
    case RestaurantCategory.TEMPURA:
      return t("restaurant.category.tempura");
    case RestaurantCategory.TONKATSU:
      return t("restaurant.category.tonkatsu");
    case RestaurantCategory.YAKITORI:
      return t("restaurant.category.yakitori");
    case RestaurantCategory.SUKIYAKI:
      return t("restaurant.category.sukiyaki");
    case RestaurantCategory.SOBA:
      return t("restaurant.category.soba");
    case RestaurantCategory.RAMEN:
      return t("restaurant.category.ramen");
    case RestaurantCategory.YAKISOBA:
      return t("restaurant.category.yakisoba");
    case RestaurantCategory.OKONOMIYAKI:
      return t("restaurant.category.okonomiyaki");
    case RestaurantCategory.DONBURI:
      return t("restaurant.category.donburi");
    case RestaurantCategory.ODEN:
      return t("restaurant.category.oden");
    case RestaurantCategory.KAISEKI:
      return t("restaurant.category.kaiseki");
    case RestaurantCategory.HAMBAGU:
      return t("restaurant.category.hambagu");
    case RestaurantCategory.TEPPANYAKI:
      return t("restaurant.category.teppanyaki");
    case RestaurantCategory.CURRY:
      return t("restaurant.category.curry");
    case RestaurantCategory.YAKINIKU:
      return t("restaurant.category.yakiniku");
    case RestaurantCategory.NABE:
      return t("restaurant.category.nabe");
    case RestaurantCategory.CAFE:
      return t("restaurant.category.cafe");
    case RestaurantCategory.IZAKAYA:
      return t("restaurant.category.izakaya");
    case RestaurantCategory.OTHER:
      return t("restaurant.category.other");
    default:
      return category;
  }
}
