import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';
import { DesktopPage } from '../pages/desktop.page';

test.describe('Pulpit tests', () => { 
      // Arrange
  test.beforeEach(async ({page}) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url)  
  });
    const url = 'https://demo-bank.vercel.app/'
    const userID = loginData.userId
    const userPassword = loginData.userPassword
    const expectedUsername = 'Jan Demobankowy'
    const reciverID = '2'
    const transferAmount = '100'
    const transferTitle = 'Zwrot środków'
    const expectedtransferReciver = 'Chuck Demobankowy'

  test('Quick payment with correct data', async ({ page }) => {
    // Act
    const loginPage = new LoginPage(page);
    const desktopPage = new DesktopPage(page)
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
      
    await desktopPage.widgetTransferReceiver.selectOption(reciverID);
    await desktopPage.widgetTransferAmount.fill(transferAmount);
    await desktopPage.widgetTransferTitle.fill(transferTitle);

    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();
    // Assert  
    await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedtransferReciver} - ${transferAmount},00PLN - ${transferTitle}`);
  });

  test('Quick phone recharge with correct data', async ({ page }) => {
    // Act
    const loginPage = new LoginPage(page);
    const desktopPage = new DesktopPage(page)
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await desktopPage.widgetTopupReceiver.selectOption('502 xxx xxx');
    await desktopPage.widgetTopUpAmount.fill(transferAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    // Assert
    await expect(page.locator('#show_messages')).toHaveText(`Doładowanie wykonane! ${transferAmount},00PLN na numer 502 xxx xxx`);
  });

  test('Click to see account details', async ({ page }) => {
    // Act
    const loginPage = new LoginPage(page);
    const desktopPage = new DesktopPage(page)
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await desktopPage.accountsList.getByText('więcej').click();
    await page.locator('#owner').click();

    // Assert
    await expect(page.locator('#owner')).toHaveText(`${expectedUsername}`); 
  });

  test('Check receipts and expenses', async ({ page }) => {
    // Act
    const loginPage = new LoginPage(page);
    const desktopPage = new DesktopPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await desktopPage.financialManagerButton.selectOption('1');

    // Assert
    await expect(page.locator('form').filter({ hasText: 'manager finansowy wpływy i' })).toHaveClass(`box-white widget`);
  });

  test('Check saving account details', async ({ page }) => {
    // Act
    const loginPage = new LoginPage(page);
    const desktopPage = new DesktopPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await desktopPage.savingAccountDetails.click();

    // Assert
    await expect(page.getByText('Progress')).toHaveId(""); 
  });

  test('Log out from the desktop', async ({ page }) => {
    // Act
    const loginPage = new LoginPage(page);
    const desktopPage = new DesktopPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await desktopPage.logoutButton.click();
    await desktopPage.pageHeading.click();

    // Assert
    await expect(page.getByRole('heading', {name: 'Wersja demonstracyjna serwisu'})).toHaveText(`Wersja demonstracyjna serwisu Demobank`);
  });
  
})