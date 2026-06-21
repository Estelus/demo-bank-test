import { expect, test } from '@playwright/test';
import { desktopData } from '../test-data/desktop.data';
import { LoginPage } from '../pages/login.page';
import { DesktopPage } from '../pages/desktop.page';
import { loginData } from '../test-data/login.data';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Successful login with correct creditential', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const desktopPage = new DesktopPage(page);

    await loginPage.fillCredentials(loginData.userId, loginData.userPassword);
    await loginPage.login();

    await expect(desktopPage.headerUserName).toHaveText(
      desktopData.expectedUsername,
    );
  });

  test('Unsuccessful login with too short userID', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillCredentials(
      loginData.toShortUserId,
      loginData.userPassword,
    );

    await expect(loginPage.errorToShortLogin).toHaveText(
      loginData.errorToShortUserId,
    );
  });

  test('Unsuccessful login with too short password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillCredentials(
      loginData.userId,
      loginData.toShortPassword,
    );

    await expect(loginPage.errorToShortPassword).toHaveText(
      loginData.errorToShortPassword,
    );
  });

  test('Unsuccessful login with no userID', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginWithoutUsername(loginData.userPassword);

    await expect(loginPage.errorToShortLogin).toHaveText(
      loginData.errorNoUserId,
    );
  });

  test('Unsuccessful login with no password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginWithoutPassword(loginData.userId);

    await expect(loginPage.errorToShortPassword).toHaveText(
      loginData.errorNoPassword,
    );
  });
});
