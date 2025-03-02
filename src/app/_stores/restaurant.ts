import { PAGE_LIMIT } from "@/constants/pagination";
import { GetListRestaurantSchema } from "@/schemas/restaurant";
import { z } from "zod";
import { create } from "zustand";

export type RestaurantFilter = z.infer<typeof GetListRestaurantSchema>;

type RestaurantState = {
  filter: RestaurantFilter;
  setFilter: (filter: Partial<RestaurantFilter>) => void;
  clearFilter: () => void;
};

const initFilter: RestaurantFilter = {
  page: 1,
  limit: PAGE_LIMIT,
};

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  filter: initFilter,
  setFilter: (filter) => {
    set({
      filter: {
        ...get().filter,
        ...filter,
      },
    });
  },
  clearFilter: () =>
    set({
      filter: initFilter,
    }),
}));
