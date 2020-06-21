import { LoginPage } from './login.po';
import { browser, logging, element, by } from 'protractor';

describe('Login Page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should display Login Page title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Please Login');
  });

  it('should display username required error if username is blank', () => {
    page.navigateTo();
    page.getUsernameField().sendKeys('');
    page.getTitleElement().click();
    expect(element(by.css('#uname-required')).getText()).toEqual('Username is required');
  });

  it('should display password required error if password is blank', () => {
    page.navigateTo();
    page.getPasswordField().sendKeys('');
    page.getTitleElement().click();
    expect(element(by.css('#pass-required')).getText()).toEqual('Password is required');
  });

  it('should display min-length error if password is less than 8 chars', () => {
    page.navigateTo();
    page.getPasswordField().sendKeys('12345');
    expect(element(by.css('#pass-len')).getText()).toEqual('Password should be 8 characters long.');
  });

  it('should keep submit button disabled if form is not valid', () => {
    page.navigateTo();
    page.getUsernameField().sendKeys('user_name');
    page.getPasswordField().sendKeys('12345');
    expect(page.getSubmitButton().isEnabled()).toBeFalsy();
  });

  it('should not login and display error if user credentials are invalid', () => {
    page.navigateTo();
    page.getUsernameField().sendKeys('invalid_user');
    page.getPasswordField().sendKeys('123456789');
    page.getSubmitButton().click();
    expect(element(by.css('#invalid-creds')).getText()).toEqual('Invalid User or Password !!');
  });

  it('should Login successfully if username and password are correct', () => {
    page.navigateTo();
    page.getUsernameField().sendKeys('saurabh');
    page.getPasswordField().sendKeys('12345678');
    page.getSubmitButton().click();
    expect(page.getTitleText()).toEqual('Welcome to Dashboard Component');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
