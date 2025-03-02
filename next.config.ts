import { withLogtail } from "@logtail/next";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import "./src/env";

const withNextIntl = createNextIntlPlugin("./src/libs/i18n/request.ts");

const configWithLogtail = withLogtail({
  experimental: {
    nodeMiddleware: true,
  },
} as NextConfig);

const configWithNextIntl = withNextIntl(configWithLogtail);

export default configWithNextIntl;
