import { createHash } from "crypto";

export function hashPassword(password: string) {
  const firstHash = createHash("md5").update(password).digest("hex");
  return createHash("md5").update(firstHash).digest("hex");
}
