import { env } from "@/env";
import { log, Logger } from "@logtail/next";

const logtailSourceToken = env.LOGTAIL_SOURCE_TOKEN;

export const logger = logtailSourceToken ? log : (console as unknown as Logger);
