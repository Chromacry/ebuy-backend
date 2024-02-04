import { Builder, By, Key, until } from "selenium-webdriver";
// import { describe, it, expect } from "vitest";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("Testing Project X Cart Page", function () {
  this.timeout(100000);
  var driver; // Declare a WebDriver variable
  beforeEach(async () => {
    // Initialize a Chrome WebDriver instance
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Should click onto the Product Page and Add Product", async () => {
    await driver.get("http://localhost:5173/");
    // click on profile button
    const profileButton = await driver.findElement(By.className("profileIcon"));
    profileButton.click();
    // click on login button
    const loginButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']"))
    );
    loginButton.click();
    //enter email
    const emailInput = await driver.wait(until.elementLocated(By.id("email")));
    await emailInput.click(); // Click on the element
    await emailInput.sendKeys("admin2@gmail.com");
    //enter password
    const passwordInput = await driver.wait(
      until.elementLocated(By.id("password"))
    );
    await passwordInput.click();
    await passwordInput.sendKeys("admin");
    // click on submit button
    const submitButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']"))
    );
    submitButton.click();
    // expect all product title to displayed
    const allProducts = await driver.wait(
      until.elementLocated(By.xpath("//h2[text()='All Products']"))
    );
    expect(allProducts.isDisplayed());
    // find product with the title "aa" and click
    const product = await driver.wait(
      until.elementLocated(By.xpath("//h3[text()='aa']"))
    );
    await product.click();
    // wait until the details is displayed
    const reviews = await driver.wait(
      until.elementLocated(By.className("review-card"))
    );
    await expect(reviews.isDisplayed());
    // click on the add to cart button
    const addCartButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Add To Cart']"))
    );
    await addCartButton.click();
    // check whether the
    // click on the cart icon
    const cartIcon = await driver.findElement(By.className("cartButton"));
    cartIcon.click();
    // click on the checkout button
    const checkOutButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Check Out']"))
    );
    await checkOutButton.click();
  })
});
