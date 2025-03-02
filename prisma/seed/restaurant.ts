import { prisma } from "@/server/database";
import {
  Prisma,
  RestaurantCategory,
  RestaurantFeaturedIcon,
} from "@prisma/client";
import restaurants from "./data/restaurant.json";

export async function seedRestaurants() {
  console.info("Inserting restaurants...");

  const response = await prisma.restaurant.createMany({
    data: restaurants.map(transformRestaurant),
  });

  console.log(`Inserted ${response.count}.`);
}

type RawRestaurant = (typeof restaurants)[number];

function transformRestaurant(
  data: RawRestaurant,
): Prisma.RestaurantCreateInput {
  const { from: priceFrom, to: priceTo } = transformPriceRange(
    data.price_range,
  );

  return {
    id: data.id,
    name: data.name,
    description: data.desc,
    category: data.category as RestaurantCategory,
    images: data.images || [],
    rating: data.rating,
    ratingCount: data.rating_count,
    city: data.city,
    priceFrom,
    priceTo,
    featuredText: data.featured.text,
    featuredIcon:
      featuredIconMap[data.featured.icon] || RestaurantFeaturedIcon.STARS_02,
  };
}

function transformPriceRange(raw: string) {
  try {
    const parts = raw?.split("~");

    return {
      from: Number(parts[0]),
      to: Number(parts[1]),
    };
  } catch (error) {
    console.error("Error while transforming price range", {
      error,
      raw,
    });
    return {
      from: 0,
      to: 0,
    };
  }
}

const featuredIconMap: Record<
  RawRestaurant["featured"]["icon"],
  RestaurantFeaturedIcon
> = {
  "stars-02": RestaurantFeaturedIcon.STARS_02,
};
