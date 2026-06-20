import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { desktopData } from '../test-data/desktop.data';
import { loginData } from '../test-data/login.data';
import { DesktopPage } from '../pages/desktop.page';

test.describe('Desktop tests', () => { 

  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.fillCredentials(loginData.userId, loginData.userPassword);
    await loginPage.login();
  });

  test('Quick payment with correct data', async ({ page }) => {

    const desktopPage = new DesktopPage(page)
      
    await desktopPage.widgetTransferReceiver.selectOption(desktopData.reciverID);
    await desktopPage.widgetTransferAmount.fill(desktopData.transferAmount);
    await desktopPage.widgetTransferTitle.fill(desktopData.transferTitle);

    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${desktopData.expectedtransferReciver} - ${desktopData.transferAmount},00PLN - ${desktopData.transferTitle}`);
  });

  test('Quick phone recharge with correct data', async ({ page }) => {

    const desktopPage = new DesktopPage(page)

    await desktopPage.widgetTopupReceiver.selectOption('502 xxx xxx');
    await desktopPage.widgetTopUpAmount.fill(desktopData.transferAmount);
    await desktopPage.widgetTopupAgreementSpan.click();
    await desktopPage.buttonForTopUpPhone.click();
    await desktopPage.closeButton.click();                                               

    await expect(page.locator('#show_messages')).toHaveText(`Doładowanie wykonane! ${desktopData.transferAmount},00PLN na numer 502 xxx xxx`);
  });

  test('See account details', async ({ page }) => {
  
    const desktopPage = new DesktopPage(page)

    await desktopPage.accountsList.getByText('więcej').click();
    await desktopPage.accountOwner.click();

    await expect(page.locator('#owner')).toHaveText(`${desktopData.expectedUsername}`); 
  });

  test('Check receipts and expenses', async ({ page }) => {
  
    const desktopPage = new DesktopPage(page);

    await desktopPage.financialManagerButton.selectOption('1');

    await expect(page.locator('form').filter({ hasText: 'manager finansowy wpływy i' })).toHaveClass(`box-white widget`);
  });

  test('Check saving account details', async ({ page }) => {

    const desktopPage = new DesktopPage(page);

    await desktopPage.savingAccountDetails.click();

    await expect(page.getByText('Progress')).toHaveId(""); 
  });

  test('Log out from the desktop', async ({ page }) => {
    const desktopPage = new DesktopPage(page);

    await desktopPage.logoutButton.click();
    await desktopPage.pageHeading.click();

    await expect(page.getByRole('heading', {name: 'Wersja demonstracyjna serwisu'})).toHaveText(`Wersja demonstracyjna serwisu Demobank`);
  });
  
})