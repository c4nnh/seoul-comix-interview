import { GetListRestaurantSchema } from "@/schemas/restaurant";
import { addExtraLogData } from "@/server/utils/logger";
import {
  transformPaginationData,
  transformPaginationParams,
} from "@/server/utils/pagination";
import { Prisma } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const getRestaurantsRouter = createTRPCRouter({
  getRestaurants: publicProcedure
    .input(GetListRestaurantSchema)
    .query(async ({ ctx, input }) => {
      addExtraLogData(ctx, { input });
      ctx.logger.info("Get restaurants");

      const conditions: Prisma.RestaurantWhereInput = {};

      if (input.search) {
        conditions.name = {
          contains: input.search.trim(),
          mode: "insensitive",
        };
      }

      if (input.category) {
        conditions.category = input.category;
      }

      const { skip, take, page, limit } = transformPaginationParams(input);

      const [restaurants, total] = await Promise.all([
        ctx.db.restaurant.findMany({
          where: conditions,
          skip,
          take,
          include: {
            savedRestaurants: {
              where: {
                userId: ctx.session?.user.id,
              },
            },
          },
        }),
        ctx.db.restaurant.count({ where: conditions }),
      ]);

      return {
        restaurants: restaurants.map(({ savedRestaurants, ...restaurant }) => ({
          ...restaurant,
          isFavorite: !!savedRestaurants.length,
        })),
        pagination: transformPaginationData({ page, limit, total }),
      };
    }),
});
