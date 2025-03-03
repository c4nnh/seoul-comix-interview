import { CTX } from "@/server/trpc";
import { ErrorCode } from "@/types/error";
import { TRPCError } from "@trpc/server";

export async function assertRestaurant(ctx: CTX, restaurantId: string) {
  ctx.logger.info("Assert restaurant", { restaurantId });

  const restaurant = await ctx.db.restaurant.findUnique({
    where: { id: restaurantId },
    include: {
      savedRestaurants: {
        where: {
          userId: ctx.session?.user.id,
        },
        select: {
          userId: true,
        },
      },
    },
  });

  if (!restaurant) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: ErrorCode.RESTAURANT_NOT_FOUND,
    });
  }

  const { savedRestaurants, ...data } = restaurant;

  return {
    ...data,
    isFavorite: savedRestaurants.some(
      (item) => item.userId === ctx.session?.user.id,
    ),
  };
}
