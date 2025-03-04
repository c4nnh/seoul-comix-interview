"use client";

import { trpc } from "@/trpc/client";
import { Loading } from "./_components/composites/loading";
import { NoData } from "./_components/composites/no-data";
import { Pagination } from "./_components/composites/pagination";
import { RestaurantCategoryFilter } from "./_components/containers/restaurant/category-filter";
import { RestaurantListItem } from "./_components/containers/restaurant/list-item";
import { RestaurantSearch } from "./_components/containers/restaurant/search";
import { cn } from "./_libs/classnames";
import { useRestaurantStore } from "./_stores/restaurant";

export default function HomePage() {
  const { filter, setFilter } = useRestaurantStore();
  const { data: restaurantData, isLoading } =
    trpc.restaurant.getRestaurants.useQuery(filter);

  return (
    <div className="flex flex-col gap-4 p-4">
      <RestaurantSearch containerClassName="sm:hidden" />
      <RestaurantCategoryFilter />
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
      <Loading className={cn(isLoading ? "" : "hidden")} />
      <NoData
        className={cn(
          restaurantData?.pagination?.total === 0 && !isLoading ? "" : "hidden",
        )}
      />
      <Pagination
        currentPage={filter.page}
        totalPage={restaurantData?.pagination?.totalPage || 0}
        onPageChange={(page) => setFilter({ page })}
      />
    </div>
  );
}
