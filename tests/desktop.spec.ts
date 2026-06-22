import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { desktopData } from '../test-data/desktop.data';
import { loginData } from '../test-data/login.data';
import { DesktopPage } from '../pages/desktop.page';

test.describe('Desktop tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.fillCredentials(loginData.userId, loginData.userPassword);
    await loginPage.login();
  });

  test('Quick payment with correct data', async ({ page }) => {
    const desktopPage = new DesktopPage(page);

    await desktopPage.quickPayment(
      desktopData.receiverID,
      desktopData.transferAmount,
      desktopData.transferTitle,
    );

    await expect(desktopPage.transferMessage).toHaveText(desktopData.sucessfulTransferMessage);
  });

    test('Quick payment with incorrect data- no transfer receiver', async ({ page }) => {
    const desktopPage = new DesktopPage(page);

    await desktopPage.quickPaymentNoReceiver(
      desktopData.transferAmount,
      desktopData.transferTitle
    );

    await expect(desktopPage.errorMessageTransferReceiver).toBeVisible();
  });

  test('Quick phone recharge with correct data', async ({ page }) => {
    const desktopPage = new DesktopPage(page);

    await desktopPage.quickPhoneTopUp(desktopData.receiverID, desktopData.transferAmount);

    await expect(desktopPage.transferMessage).toHaveText(desktopData.errorMessageTransfer);
  });

  test('See account details', async ({ page }) => {
    const desktopPage = new DesktopPage(page);

    await desktopPage.accountsList.getByText('więcej').click();
    await desktopPage.accountOwner.click();

    await expect(page.locator('#owner')).toHaveText(`${desktopData.expectedUsername}`);
  });

  test('Check receipts and expenses', async ({ page }) => {
    const desktopPage = new DesktopPage(page);

    await desktopPage.financialManagerButton.selectOption('1');

    await expect(
      page.locator('form').filter({ hasText: 'manager finansowy wpływy i' }),
    ).toHaveClass(`box-white widget`);
  });

  test('Check saving account details', async ({ page }) => {
    const desktopPage = new DesktopPage(page);

    await desktopPage.savingAccountDetails.click();

    await expect(page.getByText('Progress')).toHaveId('');
  });

  test('Log out from the desktop', async ({ page }) => {
    const desktopPage = new DesktopPage(page);

    await desktopPage.logoutButton.click();
    await desktopPage.pageHeading.click();

    await expect(page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu' })).toHaveText(
      `Wersja demonstracyjna serwisu Demobank`,
    );
  });
});
