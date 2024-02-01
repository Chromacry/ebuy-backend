import { Builder, By, until } from 'selenium-webdriver';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

const expect = chai.expect;
chai.use(chaiAsPromised);



describe("User Related Functions Test", function() {
  let driver;
    this.timeout(100000);

  before(async function() {
    // Adjust forBrowser argument for your testing browser
    driver = await new Builder().forBrowser("MicrosoftEdge").build();
  });

  after(async function() {
    await driver.quit();
  });

  const User = {
    username: "normaluser",
    email: "normaluser@gmail.com",
    password: "normaluser",
  };

  let accessToken;

  it("Should display SellerRegistration if user is not logged in", async function() {
    await driver.get("http://localhost:5173/"); // Adjust URL as needed.
    await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(null));");
    await driver.navigate().refresh();
    await driver.wait(until.elementLocated(By.className("body")));

    let sellerRegistration = await driver.wait(until.elementLocated(By.className("sellerRegistrationContainer")));
    expect(await sellerRegistration.isDisplayed()).to.be.true;
    
  });

  it("Registers a new user", async function() {
    await driver.get("http://localhost:5173/register");
    await driver.findElement(By.id("username")).sendKeys(User.username);
    await driver.findElement(By.id("email")).sendKeys(User.email);
    await driver.findElement(By.id("password")).sendKeys(User.password);
    await driver.findElement(By.className("togglePassword")).click();
    await driver.findElement(By.className("togglePassword")).click();

    const submitButton = await driver.findElement(By.xpath("//button[text()='Register']"));
    submitButton.click();

    let successMessage = await driver.wait(until.elementLocated(By.className("formMessage")));
    let messageText = await successMessage.getText();
    expect(messageText).to.include("Registration successful!");
  });

  it("Logs in a user", async function () {
    await driver.get("http://localhost:5173/login");
    await driver.findElement(By.id("email")).sendKeys(User.email);
    await driver.findElement(By.id("password")).sendKeys(User.password);

    const submitButton = await driver.findElement(By.xpath("//button[text()='Login']"));
    submitButton.click();

    let successMessage = await driver.wait(until.elementLocated(By.className("formMessage")));
    let messageText = await successMessage.getText();
    expect(messageText).to.include('Login successful!');

    accessToken = await driver.executeScript("return localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).accessToken;");
  });

  it("Should display SellerRegistration if is logged in but not a seller", async function () {
    await driver.get("http://localhost:5173/");
    await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify({ email: 'user@example.com', username: 'user', is_seller: 0 }));");
    await driver.navigate().refresh();

    let sellerRegistration = await driver.findElement(By.className("sellerRegistrationContainer"));
    expect(await sellerRegistration.isDisplayed()).to.be.true;
  });

  it("Inserts userInfo and clicks the 'Apply' button for redirection to '/seller'", async function () {
    const mockUserInfo = {
      email: User.email,
      username: User.username,
      accessToken: accessToken
    };

    await driver.get("http://localhost:5173/");
    await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);
    await driver.navigate().refresh();

    const applyButton = await driver.wait(until.elementLocated(By.id("applyButtonId")), 10000);



    applyButton.click();

    await driver.wait(until.urlContains('/seller'));
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal("http://localhost:5173/seller");
  });

it("Apply user as seller", async function () {
    const mockUserInfo = {
      email: User.email,
      username: User.username,
      accessToken: accessToken
    };

    
    await driver.get("http://localhost:5173/");
    // Make sure to pass mockUserInfo correctly and wait for the script to execute
    await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);

    // Refreshing the page to make sure localStorage is persisted
    await driver.navigate().refresh();

    // Logging the userInfo from localStorage to verify it's set correctly
    await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);


    // Now navigate to the /seller page
    await driver.get("http://localhost:5173/seller");
    await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);


    // Wait for the Apply button to be present before attempting to click
    const applyButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Apply']")), 20000);
    applyButton.click();

    // Handling the alert
    await driver.wait(until.alertIsPresent(), 10000); // Increased wait time for alert to ensure it's detected
    let alert = await driver.switchTo().alert();
    expect(await alert.getText()).to.equal("Successly applied as a seller");
    alert.accept();
});


  it("SellerRegistration should not display if user is already a seller", async function () {
    const mockUserInfo = {
      email: User.email,
      username: User.username,
      is_seller: 1,
      accessToken: accessToken
    };

    await driver.get("http://localhost:5173/");
    await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);
    await driver.navigate().refresh();
    await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);
    const userInfoFromLocalStorage = await driver.executeScript("return localStorage.getItem('userInfo');");
    await driver.wait(until.elementLocated(By.className("arrowBox")), 50000);

    console.log("userfrom local storage:", userInfoFromLocalStorage);
 

    let sellerRegistrationElements = await driver.findElements(By.className("sellerRegistrationContainer"));
    expect(sellerRegistrationElements.length).to.equal(0);
  });

  it('should allow seller to delete account', async function() {
    const mockUserInfo = {
      email: User.email,
      username: User.username,
      is_seller: 1,
      accessToken: accessToken
    };

    await driver.get('http://localhost:5173/admin');
    await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);

    const deleteButton = await driver.findElement(By.xpath("//button[text()='Delete Account']"));
    deleteButton.click();

    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    expect(await alert.getText()).to.equal('Are you sure to delete your account?');
    alert.accept();

    await driver.wait(until.alertIsPresent(), 10000);
    alert = await driver.switchTo().alert();
    expect(await alert.getText()).to.equal('Deleted Successfully!');
    alert.accept();

    await driver.wait(until.urlIs('http://localhost:5173/'));
  });
});
