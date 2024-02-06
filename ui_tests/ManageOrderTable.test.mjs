import { Builder, By, Key, until } from "selenium-webdriver";
// import { describe, it, expect } from "vitest";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("Testing Project X Order Table Page", function ()  {
  this.timeout(100000);
  var driver; // Declare a WebDriver variable
  beforeEach(async () => {
    // Initialize a Chrome WebDriver instance
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Should Login, click onto the manage store and view headers", async () => {
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
    await emailInput.sendKeys("admin1@gmail.com");
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
    // click on profile icon
    const profileButton2 = await driver.findElement(
      By.className("profileIcon")
    );
    profileButton2.click();
    // click on manage store button
    const manageStoreLink = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Manage Store']"))
    );
    await manageStoreLink.click();
    // click on admin profile icon
    const adminOrder = await driver.findElement(
      By.xpath('.//li[@data-testid="OrdersTest"]')
    );
    adminOrder.click();
    // check whether got memberTable
    const headersElement = await driver.wait(
      until.elementLocated(By.className("memberTable"))
    );
    await expect(headersElement.isDisplayed());
  });

  it("Should Login, click onto the order status and edit a order status", async () => {
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
    // click on profile icon
    const profileButton2 = await driver.findElement(
      By.className("profileIcon")
    );
    profileButton2.click();
    // click on manage store button
    const manageStoreLink = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Manage Store']"))
    );
    await manageStoreLink.click();
    // click on admin profile icon
    const adminOrder = await driver.findElement(
      By.xpath('.//li[@data-testid="OrdersTest"]')
    );
    adminOrder.click();
    // check whether got memberTable
    const headersElement = await driver.wait(
      until.elementLocated(By.className("memberTable"))
    );
    await expect(headersElement.isDisplayed());
    // find row with tracking number PEEITB and wait for it to be displayed
    const statusElement = await driver.wait(
      until.elementLocated(By.xpath(`//td[text()='PEEITB']/parent::tr`))
    );
    await expect(statusElement.isDisplayed());
    // click on the option menu
    const dropdown = await driver.findElement(By.className("custom-dropdown"));
    await dropdown.click();
    // Select the option with text "Delivered"
    const optionDelivered = await dropdown.findElement(
      By.xpath("//option[text()='Delivered']")
    );
    await optionDelivered.click();
  });

  it("Should Login, click onto the order and delete a order", async () => {
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
    // click on profile icon
    const profileButton2 = await driver.findElement(
      By.className("profileIcon")
    );
    profileButton2.click();
    // click on manage store button
    const manageStoreLink = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Manage Store']"))
    );
    await manageStoreLink.click();
    // click on admin profile icon
    const adminOrder = await driver.findElement(
      By.xpath('.//li[@data-testid="OrdersTest"]')
    );
    adminOrder.click();
    // check whether got memberTable
    const headersElement = await driver.wait(
      until.elementLocated(By.className("memberTable"))
    );
    await expect(headersElement.isDisplayed());
        // expect the row with invoice to be displayed
    const orderRowInvoice = await driver.wait(
      until.elementLocated(By.xpath(`//td[text()='E87HBD']/ancestor::tr`))
    );
    await expect(orderRowInvoice.isDisplayed());
    // Click on the "Delete" button for the product with the name "Hat"
    const deleteButtonInvoice = await orderRowInvoice.findElement(
      By.xpath('.//button[@data-testid="deleteButton"]')
    );
    await deleteButtonInvoice.click()
        // alert will show
        const alert = await driver.switchTo().alert();
        // Accept (click OK)
        await alert.accept();
    // Retrieve the lastTrackingNumber from localStorage
    // const lastTrackingNumber = localStorage.getItem("lastTrackingNumber");
    // const orderRowTrackingNumber= await driver.wait(
    //   until.elementLocated(By.xpath(`[data-tracking="${lastTrackingNumber}"]/ancestor::tr`))
    // );
    // const deleteButtonTrackingNumber = await orderRowTrackingNumber.findElement(
    //   By.xpath('.//button[@data-testid="deleteButton"]')
    // );
    // await deleteButtonTrackingNumber.click();
    // Confirm the deletion in the alert
    // const confirmDeletion = await driver.switchTo().alert();
    // await confirmDeletion.accept();
  });
});
