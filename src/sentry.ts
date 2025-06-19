import * as Sentry from "@sentry/react";

const sentryDSN: string = import.meta?.env?.VITE_API_BASE_URL;

Sentry.init({
  dsn: sentryDSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0, // Adjust in production
  replaysSessionSampleRate: 0.1, // Adjust in production
  replaysOnErrorSampleRate: 1.0, // Adjust in production
  environment: import.meta.env.MODE,
});
