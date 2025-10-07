// @ts-check
import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true })

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0, // NOTE: disable retries for immediate feedback on CI failures
  workers: 1, // NOTE: single worker to avoid Cloudflare rate limiting
  reporter: [['list'], ['html', { open: 'never', outputFolder: './playwright-report/html/local' }]],
  use: {
    baseURL: process.env.PW_BASE_URL || 'https://automationexercise.com',
    testIdAttribute: 'data-qa',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    acceptDownloads: true
  },

  projects: [
    { name: 'api', testDir: 'tests/api', testMatch: '**/*.spec.ts' },
    { name: 'ui-chromium', testDir: 'tests/ui', testMatch: '**/*.spec.ts', use: { ...devices['Desktop Chrome'] } }
  ]
})
