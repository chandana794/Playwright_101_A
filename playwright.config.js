require('dotenv').config()
const { defineConfig } = require("@playwright/test");
const dotenv = require("dotenv");

dotenv.config();

const username = process.env.LT_USERNAME;
const accessKey = process.env.LT_ACCESS_KEY;

if (!username || !accessKey) {
  throw new Error("Missing LT_USERNAME or LT_ACCESS_KEY in .env")
}
git 
const cloudWs = (capabilities) =>
  `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
    JSON.stringify(capabilities)
  )}`;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 240_000,
  use: {
    navigationTimeout: 60000,
    actionTimeout: 30000,
  },
  expect: { timeout: 15_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  projects: [
    // {
    //   name: "Chrome:latest:Windows 10@lambdatest",
    //   use: {
    //     viewport: { width: 1920, height: 1080 },
    //     connectOptions: {
    //       wsEndpoint: cloudWs({
    //         browserName: "Chrome",
    //         browserVersion: "latest",
    //         "LT:Options": {
    //           platform: "Windows 10",
    //           build: "playwright-101-assignment",
    //           name: "Chrome Windows test",
    //           user: username,
    //           accessKey: accessKey,
    //         },
    //       }),
    //     },
    //   },
    // },
    {
      name: "Chrome:latest:macOS Sequoia@lambdatest",
      use: {
        viewport: { width: 1920, height: 1080 },
        connectOptions: {
          wsEndpoint: cloudWs({
            browserName: "chrome",
            browserVersion: "latest",
            "LT:Options": {
              platform: "macOS Sequoia",
              build: "playwright-101-assignment",
              name: "Chrome macOS test",
              user: username,
              accessKey: accessKey,
            },
          }),
        },
      },
    },
    // {
    //   name: "local",
    //   use: {
    //     browserName: "chromium",
    //     headless: false,
    //     viewport: { width: 1920, height: 1080 }
    //   }
    // }
  ],
});
