const { test, expect } = require("../lambdatest-setup");

test.describe("Input Form Submit", () => {
  test("should validate form submission with all fields", async ({ page }) => {
    await page.goto("https://www.testmuai.com/selenium-playground/");
    await page.getByText("Input Form Submit").click();
    await page.getByRole("button", { name: "Submit" }).click();

    const msg = page.locator("#name");
    await expect(msg).toHaveAttribute("required", "");
    await page.waitForLoadState("networkidle");

    await page.locator("#name").fill("Steve");
    await page.getByLabel("Email").fill("Steve46@email.com");
    await page.getByPlaceholder("Password").fill("Secure123!");
    await page.getByPlaceholder("Company").fill("TestMu AI Corp");
    await page.getByPlaceholder("Website").fill("https://www.testmuai.com");
    await page.locator('select[name="country"]').selectOption({ label: "United States" });
    await page.getByPlaceholder("City").fill("New York");
    await page.locator("#inputAddress1").fill("Wall Street");
    await page.getByPlaceholder("Address 2").fill("Dno:10-105");
    await page.locator('input[id="inputState"]').fill("NY");
    await page.getByPlaceholder("Zip code").fill("3456");
    await page.getByRole("button", { name: "Submit" }).click();

    const successMessage = page.locator(".success-msg");
    await expect(successMessage).toContainText("Thanks for contacting us, we will get back to you shortly.");
  });
});
