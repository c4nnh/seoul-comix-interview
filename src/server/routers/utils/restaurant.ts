import { CTX } from "@/server/trpc";

export async function assertRestaurant(ctx: CTX, restaurantId: string) {
  ctx.logger.info("Assert restaurant", { restaurantId });
}
