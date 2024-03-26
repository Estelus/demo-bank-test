import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';

test.describe('User login to Demobank', () => {
    // Arrange
    test.beforeEach(async ({page}) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url)  
    });
    const userID = loginData.userId
    const userPassword = loginData.userPassword
    const expectedUsername = 'Jan Demobankowy'

  test('Successful login with correct creditential', async ({ page }) => {

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

  test('Unsuccessful login with too short username', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();
    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  })
  test('Unsuccessful login with too short password', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill("test1");
    await page.getByTestId('password-input').blur();
    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  })
});