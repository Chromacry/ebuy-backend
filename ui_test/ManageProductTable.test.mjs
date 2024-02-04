import { Builder, By, Key, until } from "selenium-webdriver";
// import { describe, it, expect } from "vitest";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("Testing Project X Product Table Page", function(){
  this.timeout(100000);
  var driver; // Declare a WebDriver variable
  beforeEach(async () => {
    // Initialize a Chrome WebDriver instance
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Should click onto the Manage Store and view headers", async () => {
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
    // click on the admin product icon
    const adminProduct = await driver.findElement(
      By.xpath('.//li[@data-testid="ProductsTest"]')
    );
    adminProduct.click();
    // check whether got memberTable
    const headersElement = await driver.wait(
      until.elementLocated(By.className("memberTable"))
    );
    await expect(headersElement.isDisplayed());
  });

  it("Should Login, add a product", async () => {
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
    // click on the admin product icon
    const adminProduct = await driver.findElement(
      By.xpath('.//li[@data-testid="ProductsTest"]')
    );
    adminProduct.click();
    // check whether got find the product text field and click
    const productInput = await driver.wait(
      until.elementLocated(By.id("product_name"))
    );
    await productInput.click();
    // enter a Input
    await productInput.sendKeys("Hat");
    // check whether got find the product description text field and click
    const productDescriptionInput = await driver.wait(
      until.elementLocated(By.id("product_description"))
    );
    await productDescriptionInput.click();
    // enter a Input
    await productDescriptionInput.sendKeys("I am Happy!!");
    // check whether got find the product quantity text field and click
    const productQuantityInput = await driver.wait(
      until.elementLocated(By.id("product_quantity"))
    );
    await productQuantityInput.click();
    // enter a Input
    await productQuantityInput.sendKeys(1);

    // check whether got find the image field
    const fileInput = await driver.wait(
      until.elementLocated(By.xpath('.//input[@data-testid="file-input"]'))
    );
    // send filepath
    const imagePath = "C:/Users/65945/Pictures/cat.jpg";
    await fileInput.sendKeys(imagePath);

    // Submit the form
    const saveButton = await driver.findElement(
      By.xpath("//button[text()='Confirm']")
    );
    await saveButton.click();

    const headersElement = await driver.wait(
      until.elementLocated(By.className("memberTable"))
    );
    expect(headersElement.isDisplayed());
  });

  it("Should Login, click on a product and edit product details", async () => {
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
    // wait for page to navigate back to home page
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
    // click on the admin product icon
    const adminProduct = await driver.findElement(
      By.xpath('.//li[@data-testid="ProductsTest"]')
    );
    adminProduct.click();

    // Click on the "Edit" button for the product with the name "Har Har20"
    const productRowHarHar20 = await driver.wait(
      until.elementLocated(By.xpath(`//td[text()='Har Har20']/ancestor::tr`))
    );
    // click on edit button
    const editButtonHarHar20 = await productRowHarHar20.findElement(
      By.xpath('.//button[@data-testid="editButton"]')
    );
    await editButtonHarHar20.click();
    // Ensure that the product name is "Har Har20" before editing
    const productNameBeforeEdit = await driver.findElement(
      By.xpath('.//input[@data-testid="ProductNameTest"]')
    );
    const initialProductName = await productNameBeforeEdit.getAttribute(
      "value"
    );
    expect(initialProductName).toBe("Har Har20");

    // Update the product description
    const productDescriptionInput = await driver.findElement(
      By.xpath('.//textarea[@data-testid="ProductDescriptionTest"]')
    );
    await productDescriptionInput.clear();
    await productDescriptionInput.sendKeys("Updated Product Description");
    // Submit the form to save changes
    const saveChangesButton = await driver.findElement(
      By.xpath('.//button[text()="Save Changes"]')
    );
    await saveChangesButton.click();
  });

  it("Should Login, click on a product and delete a product", async () => {
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
    await emailInput.sendKeys("admin2@gmail.com");
    const passwordInput = await driver.wait(
      until.elementLocated(By.id("password"))
    );
    await passwordInput.click(); // Click on the element
    await passwordInput.sendKeys("admin");
    const submitButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']"))
    );
    submitButton.click();
    // wait for page to navigate back to home page
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
    // click on the admin product icon
    const adminProduct = await driver.findElement(
      By.xpath('.//li[@data-testid="ProductsTest"]')
    );
    adminProduct.click();
    // check whether got memberTable
    const headersElement = await driver.wait(
      until.elementLocated(By.className("memberTable"))
    );
    await expect(headersElement.isDisplayed());

    // await expect(headersElement.every(Boolean)).to.be.true;
    // let reviewlen = reviews.length;
    // expect the row to be displayed
    const productRowHat = await driver.wait(
      until.elementLocated(By.xpath(`//td[text()='Hat']/ancestor::tr`))
    );
    await expect(productRowHat.isDisplayed());
    // Click on the "Delete" button for the product with the name "Hat"
    const deleteButtonHat = await productRowHat.findElement(
      By.xpath('.//button[@data-testid="deleteButton"]')
    );
    await deleteButtonHat.click();
    // alert will show
    const alert = await driver.switchTo().alert();
    // Accept (click OK)
    await alert.accept();
  });
});
