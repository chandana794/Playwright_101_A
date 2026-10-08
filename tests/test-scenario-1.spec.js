const { test, expect } = require("../lambdatest-setup");

test.describe("Simple Form Demo Validation", () => {
  test("should validate simple form message display", async ({ page }) => {
    await page.goto("https://www.testmuai.com/selenium-playground/");
    await page.getByText("Simple Form Demo").click();
       // Handle CAPTCHA/verify human check if present
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/simple-form-demo/);

    const msg = "Welcome to TestMu AI";
    await page.waitForLoadState("networkidle");
    await page.getByPlaceholder("Please enter your Message").fill(msg);
    await page.getByRole("button", { name: "Get Checked Value" }).click();
    await expect(page.locator("#message")).toHaveText(msg);
  });
});

