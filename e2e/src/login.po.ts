import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('#page-title')).getText() as Promise<string>;
  }

  getTitleElement() {
    return element(by.css('#page-title'));
  }

  getUsernameField() {
    return element(by.css('#uname'));
  }

  getPasswordField() {
    return element(by.css('#password'));
  }

  getSubmitButton() {
    return element(by.css('#submit-btn'));
  }
}
