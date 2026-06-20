import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { desktopData } from '../test-data/desktop.data';
import { loginData } from '../test-data/login.data';

test.describe('User login to Demobank', () => {
    test.beforeEach(async ({page}) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url)  
    });

  test('Successful login with correct creditential', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.login(loginData.userId, loginData.userPassword);

    await expect(page.getByTestId('user-name')).toHaveText(desktopData.expectedUsername);
  });

  test('Unsuccessful login with too short userID', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(loginData.toShortUserId, loginData.userPassword);
    
    await expect(loginPage.errorToShortLogin).toHaveText(loginData.toShortUserId);
  })

  test('Unsuccessful login with too short password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(loginData.toShortUserId, loginData.userPassword);
    
    await expect(loginPage.errorToShortPassword).toHaveText(loginData.ToShortPassword);
  })
  
});