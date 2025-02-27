import { z } from "zod";
import { NotEmptyString } from "./common";

export const LoginSchema = z.object({
  username: NotEmptyString,
  password: NotEmptyString,
});
