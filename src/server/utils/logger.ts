import { CTX } from "../trpc";

export function addExtraLogData(ctx: CTX, data: object) {
  const newLogger = ctx.logger.with(data);

  ctx.logger = newLogger;
}
