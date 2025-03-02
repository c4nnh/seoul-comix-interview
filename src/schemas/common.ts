import { PAGE_LIMIT } from "@/constants/pagination";
import { ErrorCode } from "@/types/error";
import { z } from "zod";

export const NotEmptyString = z.string().trim().min(1, ErrorCode.NOT_EMPTY);

export const PaginationParamsSchema = z.object({
  page: z
    .number({
      coerce: true,
    })
    .optional()
    .default(1),
  limit: z.number({ coerce: true }).optional().default(PAGE_LIMIT),
});

export const GetListBaseSchema = PaginationParamsSchema.merge(
  z.object({
    search: z.string().optional(),
  }),
);

export const IdSchema = z.string().uuid();
