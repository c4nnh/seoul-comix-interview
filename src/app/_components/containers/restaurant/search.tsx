"use client";

import { cn } from "@/app/_libs/classnames";
import { useRestaurantStore } from "@/app/_stores/restaurant";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IconSearch } from "../../icons/search";
import { InputWithIcon, InputWithIconProps } from "../../ui/input";

type Props = InputWithIconProps;

export function RestaurantSearch({
  containerClassName,
  className,
  ...props
}: Props) {
  const t = useTranslations();
  const { filter, setFilter } = useRestaurantStore();
  const [searchTerm, setSearchTerm] = useState(filter.search || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter({ search: searchTerm, page: 1 });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, setFilter]);

  return (
    <InputWithIcon
      icon={<IconSearch className="text-input" />}
      containerClassName={cn("rounded-2xl", containerClassName)}
      className={cn("rounded-2xl", className)}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value || "")}
      placeholder={`${t("common.search")}...`}
      {...props}
    />
  );
}
