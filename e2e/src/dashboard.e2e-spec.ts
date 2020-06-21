import { DashboardPage } from './dashboard.po';
import { browser, logging, element, by } from 'protractor';

describe('Dashboard Page', () => {
  let page: DashboardPage;


  beforeAll(() => {
    page = new DashboardPage();
    page.doLogin();
  });

  beforeEach(() => {
    page = new DashboardPage();
  });

  it('should display Dashboard Page Title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to Dashboard Component');
  });

  it('should display a logout Link', () => {
    page.navigateTo();
    expect(page.getLogoutLinkText()).toEqual('Logout');
  });

  it('should logout on click of logout link', () => {
    page.navigateTo();
    page.getLogoutButton().click();
    expect(page.getTitleText()).toEqual('Please Login');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
