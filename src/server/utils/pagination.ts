import { PAGE_LIMIT } from "@/constants/pagination";
import { PaginationParamsSchema } from "@/schemas/common";
import { z } from "zod";

export function transformPaginationParams({
  page = 1,
  limit = PAGE_LIMIT,
}: z.infer<typeof PaginationParamsSchema>) {
  const skip = (page - 1) * limit;

  return {
    take: limit,
    skip,
    page,
    limit,
  };
}

export function transformPaginationData({
  page = 1,
  limit = PAGE_LIMIT,
  total,
}: z.infer<typeof PaginationParamsSchema> & { total: number }) {
  return {
    total,
    totalPage: Math.ceil(total / limit),
    page,
    limit,
  };
}
