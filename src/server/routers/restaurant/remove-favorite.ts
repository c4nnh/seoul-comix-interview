import { RemoveFavoriteSchema } from "@/schemas/restaurant";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { addExtraLogData } from "@/server/utils/logger";

export const removeFavoriteRouter = createTRPCRouter({
  removeFavorite: protectedProcedure
    .input(RemoveFavoriteSchema)
    .mutation(async ({ ctx, input }) => {
      addExtraLogData(ctx, { input });
      ctx.logger.info("Remove favorite");

      await ctx.db.savedRestaurant.delete({
        where: {
          userId_restaurantId: {
            userId: ctx.session.user.id,
            restaurantId: input.restaurantId,
          },
        },
      });

      return {
        success: true,
      };
    }),
});
