const { test: base, expect } = require("@playwright/test");
const dotenv = require("dotenv");

dotenv.config();

const username = process.env.LT_USERNAME;
const accessKey = process.env.LT_ACCESS_KEY;

if (!username || !accessKey) {
  throw new Error("Missing LT_USERNAME or LT_ACCESS_KEY in .env");
}

const cloudWs = (capabilities) =>
  `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
    JSON.stringify(capabilities)
  )}`;

const buildCapabilities = (projectName, testName) => {
  const config = projectName.split("@lambdatest")[0];
  const [browserName, browserVersion, platform] = config.split(":");

  return {
    browserName: browserName || "Chrome",
    browserVersion: browserVersion || "latest",
    "LT:Options": {
      platform: platform || "Windows 10",
      build: "Playwright 101 Assignment",
      name: testName,
      user: username,
      accessKey: accessKey,
      network: true,
      video: true,
      console: true,
      visual: true,
    },
  };
};

const getErrorMessage = (obj, keys) =>
  keys.reduce((o, key) => (typeof o === "object" && o ? o[key] : undefined), obj);

const test = base.extend({
  page: async ({ playwright }, use, testInfo) => {
    const fileName = testInfo.file.split(/[/\\]/).pop();
    const isLambdaTest = testInfo.project.name.includes("@lambdatest");

    if (!isLambdaTest) {
      const browser = await playwright.chromium.launch();
      const page = await browser.newPage();
      await use(page);
      await page.close();
      await browser.close();
      return;
    }

    if (!process.env.LT_USERNAME || !process.env.LT_ACCESS_KEY) {
      throw new Error("LT_USERNAME or LT_ACCESS_KEY is missing.");
    }

    const capabilities = buildCapabilities(
      testInfo.project.name,
      `${testInfo.title} - ${fileName}`
    );

    const browser = await playwright.chromium.connect(
      `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(capabilities)
      )}`,
      { timeout: 120000 }
    );

    const page = await browser.newPage();

    try {
      await use(page);

      const testStatus = {
        action: "setTestStatus",
        arguments: {
          status: testInfo.status === "passed" ? "passed" : "failed",
          remark: getErrorMessage(testInfo, ["error", "message"]) || "",
        },
      };

      await page.evaluate(
        () => {},
        `lambdatest_action: ${JSON.stringify(testStatus)}`
      );
    } finally {
      await page.close();
      await browser.close();
    }
  },
});

module.exports = { test, expect };
