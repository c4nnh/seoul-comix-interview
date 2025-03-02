import { AddFavoriteSchema } from "@/schemas/restaurant";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { addExtraLogData } from "@/server/utils/logger";

export const addFavoriteRouter = createTRPCRouter({
  addFavorite: protectedProcedure
    .input(AddFavoriteSchema)
    .mutation(async ({ ctx, input }) => {
      addExtraLogData(ctx, { input });
      ctx.logger.info("Add favorite");
    }),
});
