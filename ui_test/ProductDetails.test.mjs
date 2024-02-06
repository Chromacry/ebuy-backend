import { Builder, By, Key, until } from "selenium-webdriver";
// import { describe, it, expect } from "vitest";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("Testing Project X Product Table Page", function() {
  this.timeout(100000);
  var driver; // Declare a WebDriver variable
  beforeEach(async () => {
    // Initialize a Chrome WebDriver instance
    driver = await new Builder().forBrowser("chrome").build();
  });
  
  it("Should view products", async () => {
    await driver.get("http://localhost:5173/");
    const product = await driver.wait(
      until.elementLocated(By.xpath("//h3[text()='aa']"))
    );
    await expect(product.isDisplayed());
  });

  it("Should click onto the product and view headers", async () => {
    await driver.get("http://localhost:5173/");
    const product = await driver.wait(
      until.elementLocated(By.xpath("//h3[text()='aa']"))
    );
    await product.click();
    const content = await driver.wait(
      until.elementLocated(By.className("product-content"))
    );
    await expect(content.isDisplayed());
  });
});