import { AddFavoriteSchema } from "@/schemas/restaurant";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { addExtraLogData } from "@/server/utils/logger";
import { assertRestaurant } from "../utils/restaurant";

export const addFavoriteRouter = createTRPCRouter({
  addFavorite: protectedProcedure
    .input(AddFavoriteSchema)
    .mutation(async ({ ctx, input }) => {
      addExtraLogData(ctx, { input });
      ctx.logger.info("Add favorite");

      await assertRestaurant(ctx, input.restaurantId);

      await ctx.db.savedRestaurant.upsert({
        where: {
          userId_restaurantId: {
            userId: ctx.session.user.id,
            restaurantId: input.restaurantId,
          },
        },
        create: {
          userId: ctx.session.user.id,
          restaurantId: input.restaurantId,
        },
        update: {
          userId: ctx.session.user.id,
          restaurantId: input.restaurantId,
        },
      });

      return {
        success: true,
      };
    }),
});
