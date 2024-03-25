import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
      // Arrange
      const url = 'https://demo-bank.vercel.app/'
      const login = 'AndrzejD'
      const password = 'test123@'
      const expectedUsername = 'Jan Demobankowy'
  test('Successful login with correct creditential', async ({ page }) => {

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();
    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

  test('Unsuccessful login with too short username', async ({ page }) => {
    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();
    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  })
  test('Unsuccessful login with too short password', async ({ page }) => {
    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill('12345');
    await page.getByTestId('password-input').blur();
    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  })
});