import { Builder, By, Key, until } from 'selenium-webdriver';
import { describe, it }from 'mocha';
import { expect }from 'chai';
describe('Testing Manage Product Page', () => {
  let driver; // Declare a WebDriver variable
  beforeEach(async () => {
    //* Initialize a Chrome WebDriver instance
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('Should show title: Project X', async () => {
    await driver.get('http://localhost:5173/'); //* Navigate Sauce Demo
    const title = await driver.getTitle(); //* Get the title of the web page
    expect(title).to.equal("Project X"); //* Assert that title matches "Swag Labs"
  });
});