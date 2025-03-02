"use client";

import { trpc } from "@/trpc/client";
import { Pagination } from "./_components/composites/pagination";
import { CategoryFilter } from "./_components/containers/restaurant/category-filter";
import { RestaurantListItem } from "./_components/containers/restaurant/list-item";
import { cn } from "./_libs/classnames";
import { useRestaurantStore } from "./_stores/restaurant";

export default function HomePage() {
  const { filter, setFilter } = useRestaurantStore();
  const { data: restaurantData } =
    trpc.restaurant.getRestaurants.useQuery(filter);

  return (
    <div className="flex flex-col gap-4 p-4">
      <CategoryFilter />
      <div
        className={cn(
          "flex",
          "flex-col sm:flex-row sm:flex-wrap sm:justify-center",
          "gap-4 sm:gap-12",
        )}
      >
        {restaurantData?.restaurants.map((restaurant) => (
          <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      <Pagination
        currentPage={filter.page}
        totalPage={restaurantData?.pagination?.totalPage || 0}
        onPageChange={(page) => setFilter({ page })}
      />
    </div>
  );
}
