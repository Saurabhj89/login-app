import { browser, by, element } from 'protractor';

export class DashboardPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/dashboard') as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('#page-title')).getText() as Promise<string>;
  }

  getLogoutLinkText() {
    return element(by.css('#logout')).getText() as Promise<string>;
  }

  getLogoutButton() {
    return element(by.css('#logout'));
  }

  doLogin() {
    browser.get(browser.baseUrl + '/login');
    element(by.css('#uname')).sendKeys('saurabh');
    element(by.css('#password')).sendKeys('12345678');
    element(by.css('#submit-btn')).click();
  }


}
