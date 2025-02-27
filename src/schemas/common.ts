import { ErrorCode } from "@/types/error";
import { z } from "zod";

export const NotEmptyString = z.string().trim().min(1, ErrorCode.NOT_EMPTY);
