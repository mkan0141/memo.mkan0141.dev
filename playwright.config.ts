import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const PORT = process.env.PORT || 3000;

const baseURL = `http://localhost:${PORT}`;

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  outputDir: 'test-results/',
  webServer: {
    command: 'yarn dev',
    url: baseURL,
    timeout: 12000,
    reuseExistingServer: true,
  },
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
};

export default config;
