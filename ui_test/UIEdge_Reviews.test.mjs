import { Builder, By, Key, until } from "selenium-webdriver";
import { describe, it } from "mocha";
import { expect } from "chai";

const capabilities = {
  browserName: "MicrosoftEdge",
  acceptInsecureCerts: true,
  "ms:edgeOptions": {
    args: ["test-type", "--no-sandbox", "--disable-dev-shm-usage", "--guest"],
    excludeSwitches: ["enable-automation", "no-default-browser-check"],
  },
};
describe("Testing Project X Review functions", () => {
  var driver; // Declare a WebDriver variable
  beforeEach(async () => {
    // Initialize a Chrome WebDriver instance
    driver = await new Builder()
      .forBrowser("MicrosoftEdge")
      .withCapabilities(capabilities)
      .build();
  });

  it("Should click onto a product and view reviews", async () => {
    await driver.get("http://localhost:5173/");
    const product = await driver.wait(
      until.elementLocated(By.xpath("//h3[text()='aa']"))
    );
    await product.click();

    const reviews = await driver.wait(
      until.elementLocated(By.className("review-card"))
    );
    await expect(reviews.isDisplayed());
    await driver.quit();
  }).timeout(100000);

  it("Should Login, click on a product and add a review", async () => {
    await driver.get("http://localhost:5173/");
    const profileButton = await driver.findElement(By.className("profileIcon"));
    profileButton.click();
    const loginButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']"))
    );
    loginButton.click();
    const emailInput = await driver.wait(until.elementLocated(By.id("email")));
    await emailInput.click(); // Click on the element
    await emailInput.sendKeys("admin1@gmail.com");
    const passwordInput = await driver.wait(
      until.elementLocated(By.id("password"))
    );
    await passwordInput.click(); // Click on the element
    await passwordInput.sendKeys("admin");
    const submitButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']"))
    );
    submitButton.click();

    const allProducts = await driver.wait(
      until.elementLocated(By.xpath("//h2[text()='All Products']"))
    );
    expect(allProducts.isDisplayed());

    const product = await driver.wait(
      until.elementLocated(By.xpath("//h3[text()='aa']"))
    );
    await product.click();

    const reviews = await driver.wait(
      until.elementLocated(By.className("review-card"))
    );
    await expect(reviews.isDisplayed());

    const addReviewButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Add Review']"))
    );
    await addReviewButton.click();

    const star1 = await driver.wait(until.elementLocated(By.id("star-1")));
    await star1.click();

    const textArea = await driver.findElement(By.className("content-area"));
    await textArea.click();
    await textArea.sendKeys("test review");

    const productName = await driver.wait(
      until.elementLocated(By.xpath("//h3[text()='aa']"))
    );
    expect(productName.isDisplayed());
    const submitReviewButton = await driver.findElement(
      By.className("submit-button")
    );
    await submitReviewButton.click();

    await expect(reviews.isDisplayed());
    const testContent = await driver.wait(
      until.elementLocated(By.xpath("//h3[text()='test review']"))
    );
    expect(testContent.isDisplayed());
    await driver.quit();
  }).timeout(100000);

  it("Should Login, click on a product and edit a review", async () => {
    await driver.get("http://localhost:5173/");
    // Login process
    const profileButton = await driver.findElement(By.className("profileIcon"));
    profileButton.click();
    const loginButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']"))
    );
    loginButton.click();
    const emailInput = await driver.wait(until.elementLocated(By.id("email")));
    await emailInput.click(); // Click on the element
    await emailInput.sendKeys("admin1@gmail.com");
    const passwordInput = await driver.wait(
      until.elementLocated(By.id("password"))
    );
    await passwordInput.click(); // Click on the element
    await passwordInput.sendKeys("admin");
    const submitButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']"))
    );
    submitButton.click();
    ///
    // wait for page to navigate back to home page
    const allProducts = await driver.wait(
      until.elementLocated(By.xpath("//h2[text()='All Products']"))
    );
    expect(allProducts.isDisplayed());

    const product = await driver.wait(
      until.elementLocated(By.xpath("//h3[text()='aa']"))
    );
    await product.click();

    const reviews = await driver.wait(
      until.elementLocated(By.className("review-card"))
    );
    await expect(reviews.isDisplayed());
    // find review-card element that was added in add review testing
    const reviewCard = await driver.findElement(
      By.xpath(
        '//div[@class="review-card" and .//h3[@class="review-content-text" and contains(text(), "test review")]]'
      )
    );

    const editButton = await reviewCard.findElement(
      By.xpath('.//button[@data-testid="editButton"]')
    );

    await editButton.click();
    // wait for product name to be on screen to ensure review has been loaded in
    const productName = await driver.wait(
      until.elementLocated(By.xpath("//h3[text()='aa']"))
    );
    expect(productName.isDisplayed());
    // select 5th star and click on star to set rating to 5
    const star5 = await driver.wait(until.elementLocated(By.id("star-5")));
    await star5.click();
    // get review content area and add 'edit review' as content
    const textArea = await driver.findElement(By.className("content-area"));
    await textArea.click();
    await textArea.clear();
    await textArea.sendKeys("edit review");

    const submitReviewButton = await driver.findElement(
      By.id("edit-review-submit")
    );
    await submitReviewButton.click();
    const reviewsAfter = await driver.wait(
      until.elementLocated(By.className("review-card"))
    );
    await expect(reviewsAfter.isDisplayed());
    const editedCard = await driver.findElement(
      By.xpath(
        '//div[@class="review-card" and .//h3[@class="review-content-text" and contains(text(), "edit review")]]'
      )
    );
    await expect(editedCard.isDisplayed());
    await driver.quit();
  }).timeout(100000);

  it("Should Login, click on a product and delete a review", async () => {
    await driver.get("http://localhost:5173/");
    // Login process
    const profileButton = await driver.findElement(By.className("profileIcon"));
    profileButton.click();
    const loginButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']"))
    );
    loginButton.click();
    const emailInput = await driver.wait(until.elementLocated(By.id("email")));
    await emailInput.click(); // Click on the element
    await emailInput.sendKeys("admin1@gmail.com");
    const passwordInput = await driver.wait(
      until.elementLocated(By.id("password"))
    );
    await passwordInput.click(); // Click on the element
    await passwordInput.sendKeys("admin");
    const submitButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']"))
    );
    submitButton.click();
    ///
    // wait for page to navigate back to home page
    const allProducts = await driver.wait(
      until.elementLocated(By.xpath("//h2[text()='All Products']"))
    );
    expect(allProducts.isDisplayed());

    const product = driver.wait(
      until.elementLocated(By.xpath("//h3[text()='aa']"))
    );
    await product.click();

    const reviews = await driver.wait(
      until.elementsLocated(By.className("review-card"))
    );
    const allReviewsDisplayed = await Promise.all(
      reviews.map(async (review) => await review.isDisplayed())
    );

    await expect(allReviewsDisplayed.every(Boolean)).to.be.true;
    let reviewlen = reviews.length;

    // find review-card element that was edited in edit review testing
    const editedCard = await driver.findElement(
      By.xpath(
        '//div[@class="review-card" and .//h3[@class="review-content-text" and contains(text(), "edit review")]]'
      )
    );
    await expect(editedCard.isDisplayed());
    const deleteButton = await editedCard.findElement(
      By.xpath('.//button[@data-uitestid="deleteButton"]')
    );
    await deleteButton.click();
    const alert = await driver.switchTo().alert();
    // Accept (click OK)
    await alert.accept();

    await driver.wait(until.stalenessOf(editedCard));
    const reviewsAfter = await driver.wait(
      until.elementsLocated(By.className("review-card"))
    );
    await expect(reviewlen - 1).to.equal(reviewsAfter.length);
    await driver.quit();
  }).timeout(100000);
});
