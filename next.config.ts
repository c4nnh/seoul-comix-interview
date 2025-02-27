import type { NextConfig } from "next";
import { withLogtail } from "@logtail/next";
import "./src/env";

const nextConfig: NextConfig = withLogtail({
  /* config options here */
});

export default nextConfig;
