import { ErrorCode } from "@/types/error";
import { Logger } from "@logtail/next";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";
import { getServerAuthSession } from "./auth/config";
import { prisma } from "./database";

export const createTRPCContext = cache(async (opts: { headers: Headers }) => {
  const session = await getServerAuthSession();
  const logger = new Logger();

  return {
    db: prisma,
    session,
    logger,
    ...opts,
  };
});

export type CTX = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error, ctx, path, input }) {
    ctx?.logger.error(`Error while executing query`, {
      path,
      input,
      error: error.message,
    });

    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const createTRPCRouter = t.router;

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

// Implement logger
const procedureWithLogger = t.procedure.use(async ({ ctx, path, next }) => {
  const requestId = uuidv4();
  const startTime = Date.now();

  const response = await next({
    ctx: {
      logger: new Logger({
        requestId,
        userId: ctx.session?.user?.id,
        path,
      }),
    },
  });

  const duration = Date.now() - startTime;
  ctx.logger.info("Request duration", { duration, requestId });

  return response;
});

export const publicProcedure = procedureWithLogger;

export const protectedProcedure = procedureWithLogger.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: ErrorCode.UNAUTHORIZED,
    });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
