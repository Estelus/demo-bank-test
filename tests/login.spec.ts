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
    // Arrange
    const incorrectUserId = 'tester'
    const expectedErrorInfo = 'identyfikator ma min. 8 znaków'
    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.fill(userPassword);
    // Assert
    await expect(loginPage.loginError).toHaveText(expectedErrorInfo);
  })
  test('Unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const incorrectUserPassword = 'test1'
    const expectedPasswordErrorInfo = 'hasło ma min. 8 znaków'
    // Act
    const loginPage = new LoginPage(page)
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(incorrectUserPassword)
    await loginPage.passwordInput.blur(); 
    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedPasswordErrorInfo);
  })
  
});