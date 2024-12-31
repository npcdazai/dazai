import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any general Next.js configuration options here
  eslint: {
    ignoreDuringBuilds: true, // Suppresses ESLint errors during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Suppresses TypeScript errors during builds
  },
};

const sentryWebpackPluginOptions = {
  // Suppresses source map uploading logs during build
  silent: true,
  org: "javascript-mastery",
  project: "javascript-nextjs",
};

const sentryOptions = {
  // Uploads a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers
  // This can increase your server load as well as your hosting bill
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shakes Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

// Use `withSentryConfig` to wrap your Next.js configuration
const configWithSentry = withSentryConfig(
  nextConfig,
  sentryWebpackPluginOptions,
  sentryOptions
);

export default configWithSentry;
