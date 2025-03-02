import { cn } from "@/app/_libs/classnames";
import { useRestaurantStore } from "@/app/_stores/restaurant";
import { getCategoryLabel } from "@/app/_utils/category";
import { RestaurantCategory } from "@prisma/client";
import { useTranslations } from "next-intl";
import { Button } from "../../ui/button";

export function CategoryFilter() {
  const t = useTranslations();
  const { filter, setFilter } = useRestaurantStore();

  return (
    <div
      className={cn(
        "no-scrollbar flex flex-row items-center gap-2 overflow-y-hidden",
        "sm:px-10",
      )}
    >
      <Button
        variant={filter.category ? "ghost" : "default"}
        onClick={() =>
          setFilter({
            category: undefined,
            page: 1,
          })
        }
        size="sm"
      >
        {t("common.all")}
      </Button>
      {Object.values(RestaurantCategory).map((category) => (
        <Button
          key={category}
          variant={filter.category === category ? "default" : "ghost"}
          onClick={() =>
            setFilter({
              category,
              page: 1,
            })
          }
          size="sm"
        >
          {getCategoryLabel(category)}
        </Button>
      ))}
    </div>
  );
}
