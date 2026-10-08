const { test, expect } = require("../lambdatest-setup");

test.describe("Drag & Drop Sliders", () => {
  test("should drag slider from default 15 to 95", async ({ page }) => {
    await page.goto("https://www.testmuai.com/selenium-playground/");
    await page.getByText("Drag & Drop Sliders").click();

    const sliderContainer = page.locator("//h4[contains(text(),'Default value 15')]/following-sibling::div");
    const slider = sliderContainer.locator("input[type='range']");
    const rangeValue = sliderContainer.locator("output");

    await expect(rangeValue).toHaveText("15");

    const sliderBoundingBox = await slider.boundingBox();
    if (!sliderBoundingBox) throw new Error("Slider bounding box not found");

    const { x, y, width, height } = sliderBoundingBox;
    const startX = x + width * 0.15;
    const targetX = x + width * 0.95;
    const centerY = y + height / 2;

    await page.mouse.click(startX, centerY);
    await page.mouse.down();
    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      const currentX = startX + ((targetX - startX) * i) / steps;
      await page.mouse.move(currentX, centerY);
    }
    await page.mouse.up();

    let currentValue = parseInt((await rangeValue.textContent()) || "0");
    const maxAttempts = 100;
    let attempts = 0;

    while (currentValue !== 95 && attempts < maxAttempts) {
      await slider.focus();
      if (currentValue < 95) {
        await page.keyboard.press("ArrowRight");
      } else {
        await page.keyboard.press("ArrowLeft");
      }
      currentValue = parseInt((await rangeValue.textContent()) || "0");
      attempts++;
    }

    await expect(rangeValue).toHaveText("95");
  });
});
